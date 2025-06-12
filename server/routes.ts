import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertChatSessionSchema, insertPropertySchema, insertPropertyComparisonSchema, insertBlogPostSchema, insertMediaUploadSchema, adminUsers } from "@shared/schema";
import { z } from "zod";
import { googleOAuthReviewsService } from "./google-oauth-reviews";
import { followUpBossService } from "./followup-boss";
import { marketDataService } from "./market-data";
import { setupSession, createDefaultAdmin, requireAdminAuth, verifyPassword } from "./auth";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Helper function to analyze conversation context for better chat intelligence
function analyzeConversationContext(messages: any[]) {
  const userMessages = messages.filter(msg => msg.role === 'user').map(msg => msg.content.toLowerCase());
  const allText = userMessages.join(' ');
  
  // Check if name was provided
  const hasName = /my name is|i'm |call me |this is /i.test(allText);
  
  // Calculate lead score based on keywords and engagement
  let leadScore = 0;
  const highValueKeywords = ['selling', 'listing', 'buying', 'moving', 'relocating', 'looking to buy', 'want to sell'];
  const mediumValueKeywords = ['interested', 'considering', 'thinking about', 'timeline', 'price range'];
  const engagementKeywords = ['thank you', 'that helps', 'great', 'perfect', 'sounds good'];
  
  highValueKeywords.forEach(keyword => {
    if (allText.includes(keyword)) leadScore += 3;
  });
  
  mediumValueKeywords.forEach(keyword => {
    if (allText.includes(keyword)) leadScore += 2;
  });
  
  engagementKeywords.forEach(keyword => {
    if (allText.includes(keyword)) leadScore += 1;
  });
  
  // Determine conversation stage
  let stage = 'greeting';
  if (leadScore >= 6) stage = 'qualification';
  else if (leadScore >= 3 || userMessages.length >= 3) stage = 'rapport';
  
  // Extract topics mentioned
  const topics = [];
  if (allText.includes('neighborhood') || allText.includes('area')) topics.push('neighborhoods');
  if (allText.includes('price') || allText.includes('cost')) topics.push('pricing');
  if (allText.includes('market') || allText.includes('trend')) topics.push('market');
  if (allText.includes('timeline') || allText.includes('when')) topics.push('timeline');
  
  return { hasName, leadScore, stage, topics };
}

// Helper function to extract contact information from chat conversation
function extractContactInfo(conversationText: string) {
  const text = conversationText.toLowerCase();
  
  // Extract phone numbers (various formats)
  const phoneRegex = /(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/g;
  const phoneMatches = conversationText.match(phoneRegex);
  const phone = phoneMatches ? phoneMatches[phoneMatches.length - 1] : '';
  
  // Extract email addresses
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const emailMatches = conversationText.match(emailRegex);
  const email = emailMatches ? emailMatches[emailMatches.length - 1] : '';
  
  // Extract names (looking for "my name is" or "I'm" patterns)
  let firstName = '';
  let lastName = '';
  
  const namePatterns = [
    /(?:my name is|i'm|i am|this is)\s+([a-z]+)(?:\s+([a-z]+))?/i,
    /([a-z]+)\s+([a-z]+).*(?:phone|number|call)/i
  ];
  
  for (const pattern of namePatterns) {
    const nameMatch = conversationText.match(pattern);
    if (nameMatch) {
      firstName = nameMatch[1] || '';
      lastName = nameMatch[2] || '';
      break;
    }
  }
  
  // Determine interest type based on conversation
  let interest = 'General Inquiry';
  if (text.includes('sell') || text.includes('selling') || text.includes('list')) {
    interest = 'Selling';
  } else if (text.includes('buy') || text.includes('buying') || text.includes('purchase') || text.includes('looking for')) {
    interest = 'Buying';
  } else if (text.includes('move') || text.includes('moving') || text.includes('relocat')) {
    interest = 'Relocation';
  }
  
  // Check if we have enough contact info to create a lead
  const hasValidContact = (phone && phone.length >= 10) || (email && email.includes('@'));
  
  return {
    hasValidContact,
    firstName: firstName || '',
    lastName: lastName || '',
    phone: phone || '',
    email: email || '',
    interest
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Google OAuth routes for business reviews
  app.get("/auth/google", async (req, res) => {
    try {
      const authUrl = googleOAuthReviewsService.getAuthUrl();
      res.redirect(authUrl);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate auth URL" });
    }
  });

  app.get("/auth/google/callback", async (req, res) => {
    try {
      const { code } = req.query;
      if (code) {
        await googleOAuthReviewsService.setCredentials(code as string);
        res.send(`
          <html>
            <body>
              <h2>Google Business Profile Access Authorized!</h2>
              <p>You can now close this window and return to your website.</p>
              <p>The system can now access your authentic Google Business reviews.</p>
              <script>setTimeout(() => window.close(), 3000);</script>
            </body>
          </html>
        `);
      } else {
        res.status(400).json({ message: "No authorization code received" });
      }
    } catch (error) {
      res.status(500).json({ message: "Failed to process authorization" });
    }
  });

  // Agent routes
  app.get("/api/agents", async (req, res) => {
    try {
      const agents = await storage.getAllAgents();
      res.json(agents);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch agents" });
    }
  });

  app.get("/api/agents/:slug", async (req, res) => {
    try {
      const agent = await storage.getAgentBySlug(req.params.slug);
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      res.json(agent);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch agent" });
    }
  });

  // Neighborhood routes
  app.get("/api/agents/:agentId/neighborhoods", async (req, res) => {
    try {
      const agentId = parseInt(req.params.agentId);
      const neighborhoods = await storage.getNeighborhoodsByAgent(agentId);
      res.json(neighborhoods);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch neighborhoods" });
    }
  });

  app.get("/api/agents/:agentId/neighborhoods/featured", async (req, res) => {
    try {
      const agentId = parseInt(req.params.agentId);
      const neighborhoods = await storage.getFeaturedNeighborhoods(agentId);
      res.json(neighborhoods);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured neighborhoods" });
    }
  });

  app.get("/api/neighborhoods/all", async (req, res) => {
    try {
      const neighborhoods = await storage.getAllNeighborhoods();
      res.json(neighborhoods);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch all neighborhoods" });
    }
  });

  app.get("/api/neighborhoods/:slug", async (req, res) => {
    try {
      const neighborhood = await storage.getNeighborhoodBySlug(req.params.slug);
      if (!neighborhood) {
        return res.status(404).json({ message: "Neighborhood not found" });
      }
      res.json(neighborhood);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch neighborhood" });
    }
  });

  // Guide routes
  app.get("/api/agents/:agentId/guides", async (req, res) => {
    try {
      const agentId = parseInt(req.params.agentId);
      const guides = await storage.getGuidesByAgent(agentId);
      res.json(guides);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch guides" });
    }
  });

  app.get("/api/agents/:agentId/guides/featured", async (req, res) => {
    try {
      const agentId = parseInt(req.params.agentId);
      const guides = await storage.getFeaturedGuides(agentId);
      res.json(guides);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured guides" });
    }
  });

  app.get("/api/guides/:slug", async (req, res) => {
    try {
      const guide = await storage.getGuideBySlug(req.params.slug);
      if (!guide) {
        return res.status(404).json({ message: "Guide not found" });
      }
      res.json(guide);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch guide" });
    }
  });

  // Testimonial routes (includes Google reviews)
  app.get("/api/agents/:agentId/testimonials", async (req, res) => {
    try {
      const agentId = parseInt(req.params.agentId);
      
      // Get stored testimonials
      const storedTestimonials = await storage.getTestimonialsByAgent(agentId);
      
      // Get agent info to determine name for Google review filtering
      const agent = await storage.getAgent(agentId);
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      
      // Try to fetch Google reviews mentioning the agent
      let googleReviews: any[] = [];
      try {
        const profileId = "17917789645435239761"; // Stone Realty Group profile ID
        const reviews = await googleOAuthReviewsService.getReviewsMentioningAgent(agent.firstName);
        
        // Convert Google reviews to testimonial format
        googleReviews = reviews.map(review => ({
          id: `google-${review.reviewId}`,
          agentId: agentId,
          name: review.reviewer.displayName,
          content: review.comment,
          rating: review.starRating === 'FIVE' ? 5 : 
                  review.starRating === 'FOUR' ? 4 :
                  review.starRating === 'THREE' ? 3 :
                  review.starRating === 'TWO' ? 2 : 1,
          date: review.createTime,
          source: 'google',
          profilePhotoUrl: review.reviewer.profilePhotoUrl
        }));
      } catch (error) {
        console.error("Failed to fetch Google reviews:", error);
        // Continue with stored testimonials only
      }
      
      // Combine stored testimonials and Google reviews
      const allTestimonials = [...storedTestimonials, ...googleReviews];
      
      res.json(allTestimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      // Return empty array to prevent frontend crashes
      res.status(200).json([]);
    }
  });

  // Lead routes
  app.post("/api/leads", async (req, res) => {
    try {
      const leadData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(leadData);
      
      // Send to Follow up Boss CRM 
      if (leadData.agentId) {
        const agent = await storage.getAgent(leadData.agentId);
        if (agent) {
          try {
            await followUpBossService.createContactFormLead({
              firstName: leadData.firstName,
              lastName: leadData.lastName,
              email: leadData.email,
              phone: leadData.phone || '',
              interest: leadData.interest || '',
              neighborhoods: leadData.neighborhoods || '',
              message: leadData.message || '',
              agentName: `${agent.firstName} ${agent.lastName}`
            });
          } catch (error) {
            console.error('Follow up Boss integration error:', error);
          }
        }
      }
      
      res.status(201).json(lead);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid lead data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create lead" });
    }
  });

  // Seller's guide lead capture
  app.post("/api/seller-leads", async (req, res) => {
    try {
      const sellerLeadSchema = z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().min(1),
        address: z.string().optional().default(''),
        agentId: z.number()
      });
      
      const sellerData = sellerLeadSchema.parse(req.body);
      
      // Create lead in local database
      const leadData = {
        agentId: sellerData.agentId,
        firstName: sellerData.firstName,
        lastName: sellerData.lastName,
        email: sellerData.email,
        phone: sellerData.phone,
        interest: 'Selling',
        neighborhoods: '',
        message: `Downloaded Seller's Guide. Property Address: ${sellerData.address}`
      };
      
      const lead = await storage.createLead(leadData);
      
      // Send to Follow up Boss CRM
      const agent = await storage.getAgent(sellerData.agentId);
      if (agent) {
        try {
          await followUpBossService.createSellerGuideLead({
            firstName: sellerData.firstName,
            lastName: sellerData.lastName,
            email: sellerData.email,
            phone: sellerData.phone,
            address: sellerData.address,
            agentName: `${agent.firstName} ${agent.lastName}`
          });
        } catch (error) {
          console.error('Follow up Boss integration error:', error);
        }
      }
      
      res.status(201).json(lead);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid seller lead data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create seller lead" });
    }
  });

  app.get("/api/agents/:agentId/leads", async (req, res) => {
    try {
      const agentId = parseInt(req.params.agentId);
      const leads = await storage.getLeadsByAgent(agentId);
      res.json(leads);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch leads" });
    }
  });

  // Market data route
  app.post("/api/market-data", async (req, res) => {
    try {
      const { zipCode } = req.body;
      
      if (!zipCode) {
        return res.status(400).json({ message: "Zip code is required" });
      }
      
      const marketData = await marketDataService.getMarketData(zipCode);
      res.json(marketData);
    } catch (error) {
      console.error('Market data API error:', error);
      res.status(500).json({ message: "Failed to fetch market data" });
    }
  });

  // Chat routes with enhanced conversation intelligence
  app.post("/api/chat", async (req, res) => {
    try {
      const { sessionId, agentId, message } = req.body;
      
      let session = await storage.getChatSession(sessionId);
      
      // Get agent info for personalized responses
      const agent = await storage.getAgent(agentId);
      const agentName = agent ? `${agent.firstName} ${agent.lastName}` : "the agent";
      
      let messages: any[];
      let conversationContext = {
        hasName: false,
        leadScore: 0,
        stage: 'greeting', // greeting, rapport, qualification, closing
        topics: [] as string[]
      };
      
      if (!session) {
        messages = [{ role: "user", content: message, timestamp: new Date() }];
      } else {
        messages = Array.isArray(session.messages) ? session.messages : [];
        messages.push({ role: "user", content: message, timestamp: new Date() });
        
        // Analyze conversation context
        conversationContext = analyzeConversationContext(messages);
      }
      
      // Generate AI response using OpenAI with realistic delay
      const { generateChatResponse } = await import("./openai");
      const conversationHistory = messages
        .filter(msg => msg.role === "user" || msg.role === "assistant")
        .map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        }));
      
      // Add realistic human-like delay based on message complexity
      const messageLength = message.length;
      const wordCount = message.split(' ').length;
      
      // Base reading time: 200-300 words per minute (human reading speed)
      const readingTime = (wordCount / 250) * 60 * 1000; // milliseconds
      
      // Thinking time: varies based on message complexity
      const thinkingTime = Math.random() * 2000 + 1000; // 1-3 seconds random thinking
      
      // Typing simulation: average 40 WPM with variation
      const expectedResponseLength = Math.min(messageLength * 0.8 + 50, 150); // estimate response length
      const typingTime = (expectedResponseLength / 5) * (60000 / 40); // 40 WPM typing speed
      
      // Total delay with human variation
      const totalDelay = Math.min(
        readingTime + thinkingTime + (typingTime * 0.3), // Only 30% of full typing time
        6000 // Max 6 seconds to keep conversation flowing
      );
      
      // Minimum delay to feel natural (even for short messages)
      const finalDelay = Math.max(totalDelay, 2000);
      
      await new Promise(resolve => setTimeout(resolve, finalDelay));
      
      const aiResponse = await generateChatResponse(message, agentName, conversationHistory);
      
      const botResponse = {
        role: "assistant",
        content: aiResponse,
        timestamp: new Date()
      };
      messages.push(botResponse);

      // Check if this conversation contains contact information and create FUB lead
      const fullConversation = messages.map(m => m.content).join(' ');
      const contactInfo = extractContactInfo(fullConversation);
      
      if (contactInfo.hasValidContact && agent) {
        try {
          // Create lead in local database
          const leadData = {
            agentId,
            firstName: contactInfo.firstName || 'Chat',
            lastName: contactInfo.lastName || 'Lead',
            email: contactInfo.email || '',
            phone: contactInfo.phone || '',
            interest: contactInfo.interest || 'General Inquiry',
            neighborhoods: '',
            message: `Chat conversation lead. Summary: ${fullConversation.slice(-500)}`
          };
          
          await storage.createLead(leadData);
          
          // Send to Follow up Boss CRM
          await followUpBossService.createContactFormLead({
            firstName: contactInfo.firstName || 'Chat',
            lastName: contactInfo.lastName || 'Lead', 
            email: contactInfo.email || '',
            phone: contactInfo.phone || '',
            interest: contactInfo.interest || 'General Inquiry',
            neighborhoods: '',
            message: `Chat Lead - ${fullConversation.slice(-300)}`,
            agentName: `${agent.firstName} ${agent.lastName}`
          });
        } catch (error) {
          console.error('Chat lead creation error:', error);
        }
      }
      
      if (!session) {
        const sessionData = insertChatSessionSchema.parse({
          sessionId,
          agentId,
          messages
        });
        session = await storage.createChatSession(sessionData);
      } else {
        session = await storage.updateChatSession(sessionId, messages);
      }
      
      res.json(session);
    } catch (error) {
      console.error('Chat API error:', error);
      res.status(500).json({ 
        message: "Failed to process chat message",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Property search integration (YLOPO)
  app.get("/api/properties/search", async (req, res) => {
    try {
      // TODO: Integration with YLOPO API
      // This would call YLOPO's search API with the query parameters
      const { location, propertyType, priceRange, bedrooms } = req.query;
      
      // Mock response for now
      res.json({
        properties: [],
        total: 0,
        message: "YLOPO integration coming soon"
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to search properties" });
    }
  });

  // Unsplash photos route
  app.get("/api/photos/charlotte/:neighborhood", async (req, res) => {
    try {
      const { neighborhood } = req.params;
      const accessKey = process.env.UNSPLASH_ACCESS_KEY;
      
      if (!accessKey) {
        return res.status(500).json({ message: "Unsplash API key not configured" });
      }
      
      const searchQuery = `Charlotte North Carolina ${neighborhood} neighborhood`;
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=5&orientation=landscape`, {
        headers: {
          'Authorization': `Client-ID ${accessKey}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Unsplash API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Filter for more relevant results (exclude animal photos)
      const filteredResults = data.results.filter(photo => {
        const description = (photo.description || '').toLowerCase();
        const altDescription = (photo.alt_description || '').toLowerCase();
        const tags = photo.tags ? photo.tags.map(tag => tag.title.toLowerCase()).join(' ') : '';
        
        // Exclude animal-related photos
        const animalKeywords = ['animal', 'lemur', 'zoo', 'pet', 'dog', 'cat', 'bird', 'wildlife'];
        const hasAnimalKeywords = animalKeywords.some(keyword => 
          description.includes(keyword) || altDescription.includes(keyword) || tags.includes(keyword)
        );
        
        return !hasAnimalKeywords;
      });
      
      res.json(filteredResults.length > 0 ? filteredResults : data.results);
    } catch (error) {
      console.log(`Error fetching Unsplash photos: ${error}`);
      res.status(500).json({ message: "Failed to fetch photos" });
    }
  });

  // Property routes
  app.get("/api/properties", async (req, res) => {
    try {
      const filters = req.query;
      const properties = await storage.searchProperties(filters);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });

  app.get("/api/agents/:agentId/properties", async (req, res) => {
    try {
      const agentId = parseInt(req.params.agentId);
      const properties = await storage.getPropertiesByAgent(agentId);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch agent properties" });
    }
  });

  app.get("/api/properties/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const property = await storage.getProperty(id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch property" });
    }
  });

  app.post("/api/properties", async (req, res) => {
    try {
      const validatedProperty = insertPropertySchema.parse(req.body);
      const property = await storage.createProperty(validatedProperty);
      res.status(201).json(property);
    } catch (error) {
      res.status(400).json({ message: "Invalid property data" });
    }
  });

  // Property comparison routes
  app.get("/api/property-comparisons/:sessionId", async (req, res) => {
    try {
      const sessionId = req.params.sessionId;
      const comparisons = await storage.getPropertyComparisonsBySession(sessionId);
      res.json(comparisons);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch comparisons" });
    }
  });

  app.post("/api/property-comparisons", async (req, res) => {
    try {
      const validatedComparison = insertPropertyComparisonSchema.parse(req.body);
      const comparison = await storage.createPropertyComparison(validatedComparison);
      res.status(201).json(comparison);
    } catch (error) {
      res.status(400).json({ message: "Invalid comparison data" });
    }
  });

  app.delete("/api/property-comparisons/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deletePropertyComparison(id);
      if (!deleted) {
        return res.status(404).json({ message: "Comparison not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete comparison" });
    }
  });

  app.post("/api/properties/valuation", async (req, res) => {
    try {
      // TODO: Integration with YLOPO home valuation API
      const { address, email, phone } = req.body;
      
      // Mock response for now
      res.json({
        estimatedValue: null,
        message: "YLOPO home valuation integration coming soon"
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to get home valuation" });
    }
  });

  // Blog routes
  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getPublishedBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });

  app.get("/api/agents/:agentId/blog", async (req, res) => {
    try {
      const agentId = parseInt(req.params.agentId);
      const status = req.query.status as string;
      const posts = await storage.getBlogPostsByAgent(agentId, status);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch agent blog posts" });
    }
  });

  app.post("/api/blog", async (req, res) => {
    try {
      const validatedPost = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validatedPost);
      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: "Invalid blog post data" });
    }
  });

  app.put("/api/blog/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedPost = insertBlogPostSchema.partial().parse(req.body);
      const post = await storage.updateBlogPost(id, validatedPost);
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(400).json({ message: "Invalid blog post data" });
    }
  });

  app.delete("/api/blog/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteBlogPost(id);
      if (!deleted) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete blog post" });
    }
  });

  // Media upload routes
  app.get("/api/agents/:agentId/media", async (req, res) => {
    try {
      const agentId = parseInt(req.params.agentId);
      const media = await storage.getMediaUploadsByAgent(agentId);
      res.json(media);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch media uploads" });
    }
  });

  app.post("/api/media/upload", async (req, res) => {
    try {
      const validatedUpload = insertMediaUploadSchema.parse(req.body);
      const upload = await storage.createMediaUpload(validatedUpload);
      res.status(201).json(upload);
    } catch (error) {
      res.status(400).json({ message: "Invalid media upload data" });
    }
  });

  app.delete("/api/media/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteMediaUpload(id);
      if (!deleted) {
        return res.status(404).json({ message: "Media upload not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete media upload" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
