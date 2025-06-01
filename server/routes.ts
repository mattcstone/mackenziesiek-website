import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, insertChatSessionSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
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

  // Testimonial routes
  app.get("/api/agents/:agentId/testimonials", async (req, res) => {
    try {
      const agentId = parseInt(req.params.agentId);
      const testimonials = await storage.getTestimonialsByAgent(agentId);
      res.json(testimonials);
    } catch (error) {
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
      
      if (!session) {
        const sessionData = insertChatSessionSchema.parse({
          sessionId,
          agentId,
          messages: [{ role: "user", content: message, timestamp: new Date() }]
        });
        session = await storage.createChatSession(sessionData);
      } else {
        const messages = Array.isArray(session.messages) ? session.messages : [];
        messages.push({ role: "user", content: message, timestamp: new Date() });
        
        // TODO: Integration with GPT API for intelligent responses
        // For now, return a simple response
        const botResponse = {
          role: "assistant",
          content: "Thank you for your message! I'm Sarah's AI assistant. For immediate assistance, please call me at (704) 555-0123 or fill out the contact form.",
          timestamp: new Date()
        };
        messages.push(botResponse);
        
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
