import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { storage } from "./storage";
import { insertLeadSchema, insertChatSessionSchema, insertPropertySchema, insertPropertyComparisonSchema } from "@shared/schema";
import { z } from "zod";
import { googleOAuthReviewsService } from "./google-oauth-reviews";
import { marketDataService } from "./market-data";
import { db } from "./db";
import { eq } from "drizzle-orm";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to analyze conversation context for better chat intelligence
function analyzeConversationContext(messages: any[]) {
  const userMessages = messages.filter(msg => msg.role === 'user').map(msg => msg.content.toLowerCase());
  const allText = userMessages.join(' ');
  
  // Check if name was provided
  const nameMatch = allText.match(/(?:i'm|i am|my name is|call me)\s+([a-zA-Z\s]+)/i);
  const extractedName = nameMatch ? nameMatch[1].trim() : null;
  
  // Check for buying/selling intent
  const buyingKeywords = ['buy', 'buying', 'purchase', 'looking for', 'want to buy', 'need a house'];
  const sellingKeywords = ['sell', 'selling', 'list my house', 'want to sell'];
  
  const hasBuyingIntent = buyingKeywords.some(keyword => allText.includes(keyword));
  const hasSellingIntent = sellingKeywords.some(keyword => allText.includes(keyword));
  
  // Check for location mentions
  const locationKeywords = ['charlotte', 'dilworth', 'myers park', 'noda', 'south end', 'uptown'];
  const mentionedLocations = locationKeywords.filter(location => allText.includes(location));
  
  // Check for urgency
  const urgencyKeywords = ['asap', 'urgent', 'quickly', 'soon', 'immediately'];
  const hasUrgency = urgencyKeywords.some(keyword => allText.includes(keyword));
  
  return {
    extractedName,
    hasBuyingIntent,
    hasSellingIntent,
    mentionedLocations,
    hasUrgency,
    messageCount: messages.length
  };
}

// Helper function to extract contact information
function extractContactInfo(conversationText: string) {
  const phoneRegex = /(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/g;
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
  
  const phoneMatches = conversationText.match(phoneRegex);
  const emailMatches = conversationText.match(emailRegex);
  
  const phones = phoneMatches ? phoneMatches.filter((phone, index) => phoneMatches.indexOf(phone) === index) : [];
  const emails = emailMatches ? emailMatches.filter((email, index) => emailMatches.indexOf(email) === index) : [];
  
  return {
    phones,
    emails
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static files from public directory
  app.use(express.static(path.join(__dirname, 'public')));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Agent routes
  app.get('/api/agents', async (req, res) => {
    try {
      const agents = await storage.getAllAgents();
      res.json(agents);
    } catch (error) {
      console.error("Error fetching agents:", error);
      res.status(500).json({ message: "Failed to fetch agents" });
    }
  });

  app.get('/api/agents/:slug', async (req, res) => {
    try {
      const agent = await storage.getAgentBySlug(req.params.slug);
      if (!agent) {
        return res.status(404).json({ message: "Agent not found" });
      }
      res.json(agent);
    } catch (error) {
      console.error("Error fetching agent:", error);
      res.status(500).json({ message: "Failed to fetch agent" });
    }
  });

  // Neighborhood routes
  app.get('/api/neighborhoods', async (req, res) => {
    try {
      const { agentId, featured } = req.query;
      let neighborhoods;
      
      if (agentId) {
        if (featured === 'true') {
          neighborhoods = await storage.getFeaturedNeighborhoods(parseInt(agentId as string));
        } else {
          neighborhoods = await storage.getNeighborhoodsByAgent(parseInt(agentId as string));
        }
      } else {
        neighborhoods = await storage.getAllNeighborhoods();
      }
      
      res.json(neighborhoods);
    } catch (error) {
      console.error("Error fetching neighborhoods:", error);
      res.status(500).json({ message: "Failed to fetch neighborhoods" });
    }
  });

  app.get('/api/neighborhoods/:slug', async (req, res) => {
    try {
      const neighborhood = await storage.getNeighborhoodBySlug(req.params.slug);
      if (!neighborhood) {
        return res.status(404).json({ message: "Neighborhood not found" });
      }
      res.json(neighborhood);
    } catch (error) {
      console.error("Error fetching neighborhood:", error);
      res.status(500).json({ message: "Failed to fetch neighborhood" });
    }
  });

  // Guide routes
  app.get('/api/guides', async (req, res) => {
    try {
      const { agentId, neighborhoodId, featured } = req.query;
      let guides: any[] = [];
      
      if (agentId && featured === 'true') {
        guides = await storage.getFeaturedGuides(parseInt(agentId as string));
      } else if (agentId) {
        guides = await storage.getGuidesByAgent(parseInt(agentId as string));
      } else if (neighborhoodId) {
        guides = await storage.getGuidesByNeighborhood(parseInt(neighborhoodId as string));
      }
      
      res.json(guides);
    } catch (error) {
      console.error("Error fetching guides:", error);
      res.status(500).json({ message: "Failed to fetch guides" });
    }
  });

  app.get('/api/guides/:slug', async (req, res) => {
    try {
      const guide = await storage.getGuideBySlug(req.params.slug);
      if (!guide) {
        return res.status(404).json({ message: "Guide not found" });
      }
      res.json(guide);
    } catch (error) {
      console.error("Error fetching guide:", error);
      res.status(500).json({ message: "Failed to fetch guide" });
    }
  });

  // Testimonial routes
  app.get('/api/testimonials', async (req, res) => {
    try {
      const { agentId } = req.query;
      if (!agentId) {
        return res.status(400).json({ message: "Agent ID is required" });
      }
      
      const testimonials = await storage.getTestimonialsByAgent(parseInt(agentId as string));
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.get('/api/agents/:agentId/testimonials', async (req, res) => {
    try {
      const testimonials = await storage.getTestimonialsByAgent(parseInt(req.params.agentId));
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching agent testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  app.get('/api/agents/:agentId/neighborhoods/featured', async (req, res) => {
    try {
      const neighborhoods = await storage.getFeaturedNeighborhoods(parseInt(req.params.agentId));
      res.json(neighborhoods);
    } catch (error) {
      console.error("Error fetching featured neighborhoods:", error);
      res.status(500).json({ message: "Failed to fetch neighborhoods" });
    }
  });

  // Lead capture
  app.post('/api/leads', async (req, res) => {
    try {
      const leadData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(leadData);
      res.status(201).json(lead);
    } catch (error) {
      console.error("Error creating lead:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid lead data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create lead" });
    }
  });

  // Chat session routes
  app.post('/api/chat/sessions', async (req, res) => {
    try {
      const sessionData = insertChatSessionSchema.parse(req.body);
      const session = await storage.createChatSession(sessionData);
      res.status(201).json(session);
    } catch (error) {
      console.error("Error creating chat session:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid session data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create chat session" });
    }
  });

  app.get('/api/chat/sessions/:sessionId', async (req, res) => {
    try {
      const session = await storage.getChatSession(req.params.sessionId);
      if (!session) {
        return res.status(404).json({ message: "Chat session not found" });
      }
      res.json(session);
    } catch (error) {
      console.error("Error fetching chat session:", error);
      res.status(500).json({ message: "Failed to fetch chat session" });
    }
  });

  app.put('/api/chat/sessions/:sessionId', async (req, res) => {
    try {
      const { messages } = req.body;
      const session = await storage.updateChatSession(req.params.sessionId, messages);
      if (!session) {
        return res.status(404).json({ message: "Chat session not found" });
      }
      
      // Analyze conversation for lead capture opportunities
      const context = analyzeConversationContext(messages);
      const conversationText = messages.map((m: any) => m.content).join(' ');
      const contactInfo = extractContactInfo(conversationText);
      
      // Conversation analyzed for future lead capture improvements
      
      res.json(session);
    } catch (error) {
      console.error("Error updating chat session:", error);
      res.status(500).json({ message: "Failed to update chat session" });
    }
  });

  // Property routes
  app.get('/api/properties', async (req, res) => {
    try {
      const { agentId, neighborhoodId, search } = req.query;
      let properties: any[] = [];
      
      if (search) {
        properties = await storage.searchProperties(req.query);
      } else if (agentId) {
        properties = await storage.getPropertiesByAgent(parseInt(agentId as string));
      } else if (neighborhoodId) {
        properties = await storage.getPropertiesByNeighborhood(parseInt(neighborhoodId as string));
      }
      
      res.json(properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });

  app.get('/api/properties/:id', async (req, res) => {
    try {
      const property = await storage.getProperty(parseInt(req.params.id));
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.json(property);
    } catch (error) {
      console.error("Error fetching property:", error);
      res.status(500).json({ message: "Failed to fetch property" });
    }
  });

  // Property comparison routes
  app.get('/api/property-comparisons/:sessionId', async (req, res) => {
    try {
      const comparisons = await storage.getPropertyComparisonsBySession(req.params.sessionId);
      res.json(comparisons);
    } catch (error) {
      console.error("Error fetching property comparisons:", error);
      res.status(500).json({ message: "Failed to fetch property comparisons" });
    }
  });

  app.post('/api/property-comparisons', async (req, res) => {
    try {
      const comparisonData = insertPropertyComparisonSchema.parse(req.body);
      const comparison = await storage.createPropertyComparison(comparisonData);
      res.status(201).json(comparison);
    } catch (error) {
      console.error("Error creating property comparison:", error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid comparison data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create property comparison" });
    }
  });

  app.delete('/api/property-comparisons/:id', async (req, res) => {
    try {
      const success = await storage.deletePropertyComparison(parseInt(req.params.id));
      if (!success) {
        return res.status(404).json({ message: "Property comparison not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting property comparison:", error);
      res.status(500).json({ message: "Failed to delete property comparison" });
    }
  });

  // Google Reviews routes
  app.get('/api/google-reviews', async (req, res) => {
    try {
      res.json([]);
    } catch (error) {
      console.error("Error fetching Google reviews:", error);
      res.status(500).json({ message: "Failed to fetch Google reviews" });
    }
  });

  // Market data routes
  app.get('/api/market-data/:zipCode', async (req, res) => {
    try {
      const marketData = await marketDataService.getMarketData(req.params.zipCode);
      res.json(marketData);
    } catch (error) {
      console.error("Error fetching market data:", error);
      res.status(500).json({ message: "Failed to fetch market data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}