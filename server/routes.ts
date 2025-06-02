import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertChatSessionSchema, insertPropertySchema, insertPropertyComparisonSchema } from "@shared/schema";
import { z } from "zod";
import { googleOAuthReviewsService } from "./google-oauth-reviews";

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
          clientName: review.reviewer.displayName,
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
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Lead routes
  app.post("/api/leads", async (req, res) => {
    try {
      const leadData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(leadData);
      
      // TODO: Integration with Follow Up Boss CRM
      // This would send the lead to Follow Up Boss API
      
      res.status(201).json(lead);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid lead data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create lead" });
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

  // Chat routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { sessionId, agentId, message } = req.body;
      
      let session = await storage.getChatSession(sessionId);
      
      // Get agent info for personalized responses
      const agent = await storage.getAgent(agentId);
      const agentName = agent ? `${agent.firstName} ${agent.lastName}` : "the agent";
      
      let messages: any[];
      
      if (!session) {
        messages = [{ role: "user", content: message, timestamp: new Date() }];
      } else {
        messages = Array.isArray(session.messages) ? session.messages : [];
        messages.push({ role: "user", content: message, timestamp: new Date() });
      }
      
      // Generate AI response using OpenAI with realistic delay
      const { generateChatResponse } = await import("./openai");
      const conversationHistory = messages
        .filter(msg => msg.role === "user" || msg.role === "assistant")
        .map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        }));
      
      // Add realistic delay based on response length (simulate typing time)
      const baseDelay = 1500; // Base 1.5 seconds
      const messageLength = message.length;
      const typingDelay = Math.min(baseDelay + (messageLength * 30), 4000); // Max 4 seconds
      
      await new Promise(resolve => setTimeout(resolve, typingDelay));
      
      const aiResponse = await generateChatResponse(message, agentName, conversationHistory);
      
      const botResponse = {
        role: "assistant",
        content: aiResponse,
        timestamp: new Date()
      };
      messages.push(botResponse);
      
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
      res.status(500).json({ message: "Failed to process chat message" });
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

  const httpServer = createServer(app);
  return httpServer;
}
