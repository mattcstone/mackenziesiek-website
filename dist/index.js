var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express3 from "express";

// server/routes.ts
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  agents: () => agents,
  agentsRelations: () => agentsRelations,
  chatSessions: () => chatSessions,
  chatSessionsRelations: () => chatSessionsRelations,
  guides: () => guides,
  guidesRelations: () => guidesRelations,
  insertAgentSchema: () => insertAgentSchema,
  insertChatSessionSchema: () => insertChatSessionSchema,
  insertGuideSchema: () => insertGuideSchema,
  insertLeadSchema: () => insertLeadSchema,
  insertNeighborhoodSchema: () => insertNeighborhoodSchema,
  insertPropertyComparisonSchema: () => insertPropertyComparisonSchema,
  insertPropertySchema: () => insertPropertySchema,
  insertTestimonialSchema: () => insertTestimonialSchema,
  leads: () => leads,
  leadsRelations: () => leadsRelations,
  neighborhoods: () => neighborhoods,
  neighborhoodsRelations: () => neighborhoodsRelations,
  properties: () => properties,
  propertiesRelations: () => propertiesRelations,
  propertyComparisons: () => propertyComparisons,
  propertyComparisonsRelations: () => propertyComparisonsRelations,
  testimonials: () => testimonials,
  testimonialsRelations: () => testimonialsRelations
});
import { pgTable, text, serial, integer, boolean, timestamp, jsonb, decimal } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
var agents = pgTable("agents", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  bio: text("bio").notNull(),
  headshot: text("headshot"),
  welcomeVideo: text("welcome_video"),
  church: text("church"),
  favoriteNeighborhood: text("favorite_neighborhood"),
  favoriteSpot: text("favorite_spot"),
  favoriteRestaurant: text("favorite_restaurant"),
  hobby: text("hobby"),
  homesSold: integer("homes_sold").default(0),
  avgDaysOnMarket: integer("avg_days_on_market").default(0),
  rating: decimal("rating", { precision: 2, scale: 1 }).default("0.0"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow()
});
var neighborhoods = pgTable("neighborhoods", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  image: text("image"),
  avgPrice: text("avg_price"),
  walkScore: integer("walk_score"),
  agentId: integer("agent_id").references(() => agents.id),
  createdAt: timestamp("created_at").defaultNow()
});
var guides = pgTable("guides", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  image: text("image"),
  neighborhoodId: integer("neighborhood_id").references(() => neighborhoods.id),
  agentId: integer("agent_id").references(() => agents.id),
  isFeatured: boolean("is_featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  image: text("image"),
  agentId: integer("agent_id").references(() => agents.id),
  createdAt: timestamp("created_at").defaultNow()
});
var leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  interest: text("interest").notNull(),
  neighborhoods: text("neighborhoods"),
  message: text("message"),
  agentId: integer("agent_id").references(() => agents.id),
  source: text("source").default("website"),
  status: text("status").default("new"),
  createdAt: timestamp("created_at").defaultNow()
});
var chatSessions = pgTable("chat_sessions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(),
  agentId: integer("agent_id").references(() => agents.id),
  messages: jsonb("messages").default([]),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  mlsId: text("mls_id").unique(),
  address: text("address").notNull(),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  bedrooms: integer("bedrooms"),
  bathrooms: decimal("bathrooms", { precision: 3, scale: 1 }),
  squareFootage: integer("square_footage"),
  lotSize: decimal("lot_size", { precision: 10, scale: 2 }),
  yearBuilt: integer("year_built"),
  propertyType: text("property_type").notNull(),
  status: text("status").notNull(),
  // Active, Pending, Sold
  daysOnMarket: integer("days_on_market"),
  images: text("images").array(),
  description: text("description"),
  neighborhoodId: integer("neighborhood_id").references(() => neighborhoods.id),
  agentId: integer("agent_id").references(() => agents.id),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var propertyComparisons = pgTable("property_comparisons", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  propertyIds: integer("property_ids").array().notNull(),
  agentId: integer("agent_id").references(() => agents.id),
  createdAt: timestamp("created_at").defaultNow()
});
var agentsRelations = relations(agents, ({ many }) => ({
  neighborhoods: many(neighborhoods),
  guides: many(guides),
  testimonials: many(testimonials),
  leads: many(leads),
  chatSessions: many(chatSessions),
  properties: many(properties),
  propertyComparisons: many(propertyComparisons)
}));
var neighborhoodsRelations = relations(neighborhoods, ({ one, many }) => ({
  agent: one(agents, {
    fields: [neighborhoods.agentId],
    references: [agents.id]
  }),
  guides: many(guides),
  properties: many(properties)
}));
var guidesRelations = relations(guides, ({ one }) => ({
  neighborhood: one(neighborhoods, {
    fields: [guides.neighborhoodId],
    references: [neighborhoods.id]
  }),
  agent: one(agents, {
    fields: [guides.agentId],
    references: [agents.id]
  })
}));
var testimonialsRelations = relations(testimonials, ({ one }) => ({
  agent: one(agents, {
    fields: [testimonials.agentId],
    references: [agents.id]
  })
}));
var leadsRelations = relations(leads, ({ one }) => ({
  agent: one(agents, {
    fields: [leads.agentId],
    references: [agents.id]
  })
}));
var chatSessionsRelations = relations(chatSessions, ({ one }) => ({
  agent: one(agents, {
    fields: [chatSessions.agentId],
    references: [agents.id]
  })
}));
var propertiesRelations = relations(properties, ({ one }) => ({
  neighborhood: one(neighborhoods, {
    fields: [properties.neighborhoodId],
    references: [neighborhoods.id]
  }),
  agent: one(agents, {
    fields: [properties.agentId],
    references: [agents.id]
  })
}));
var propertyComparisonsRelations = relations(propertyComparisons, ({ one }) => ({
  agent: one(agents, {
    fields: [propertyComparisons.agentId],
    references: [agents.id]
  })
}));
var insertAgentSchema = createInsertSchema(agents).omit({
  id: true,
  createdAt: true
});
var insertNeighborhoodSchema = createInsertSchema(neighborhoods).omit({
  id: true,
  createdAt: true
});
var insertGuideSchema = createInsertSchema(guides).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true
});
var insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true
});
var insertChatSessionSchema = createInsertSchema(chatSessions).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertPropertyComparisonSchema = createInsertSchema(propertyComparisons).omit({
  id: true,
  createdAt: true
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 1,
  idleTimeoutMillis: 6e4,
  connectionTimeoutMillis: 15e3,
  allowExitOnIdle: false,
  maxUses: 7500
  // Close connections after 7500 uses to prevent memory leaks
});
pool.on("error", (err) => {
  console.error("Database pool error:", err);
});
pool.on("connect", () => {
  console.log("Database pool connected");
});
pool.on("remove", () => {
  console.log("Database connection removed from pool");
});
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, desc, and } from "drizzle-orm";
var DatabaseStorage = class {
  // Agents
  async getAgent(id) {
    try {
      const [agent] = await db.select().from(agents).where(eq(agents.id, id));
      return agent || void 0;
    } catch (error) {
      console.error("Error fetching agent:", error);
      return void 0;
    }
  }
  async getAgentBySlug(slug) {
    const [firstName, lastName] = slug.split("-");
    const [agent] = await db.select().from(agents).where(and(eq(agents.firstName, firstName), eq(agents.lastName, lastName)));
    return agent || void 0;
  }
  async getAllAgents() {
    return await db.select().from(agents).where(eq(agents.isActive, true));
  }
  async createAgent(insertAgent) {
    const [agent] = await db.insert(agents).values(insertAgent).returning();
    return agent;
  }
  async updateAgent(id, insertAgent) {
    const [agent] = await db.update(agents).set(insertAgent).where(eq(agents.id, id)).returning();
    return agent || void 0;
  }
  // Neighborhoods
  async getNeighborhood(id) {
    const [neighborhood] = await db.select().from(neighborhoods).where(eq(neighborhoods.id, id));
    return neighborhood || void 0;
  }
  async getNeighborhoodBySlug(slug) {
    const [neighborhood] = await db.select().from(neighborhoods).where(eq(neighborhoods.slug, slug));
    return neighborhood || void 0;
  }
  async getNeighborhoodsByAgent(agentId) {
    return await db.select().from(neighborhoods).where(eq(neighborhoods.agentId, agentId));
  }
  async getFeaturedNeighborhoods(agentId) {
    const featuredSlugs = [
      "uptown",
      "southend",
      "noda",
      "plaza-midwood",
      "dilworth",
      "myers-park",
      "fourth-ward",
      "lake-norman"
    ];
    const allNeighborhoods = await db.select().from(neighborhoods).where(eq(neighborhoods.agentId, agentId)).orderBy(neighborhoods.name);
    return allNeighborhoods.filter((n) => featuredSlugs.includes(n.slug));
  }
  async getAllNeighborhoods() {
    return await db.select().from(neighborhoods);
  }
  async createNeighborhood(insertNeighborhood) {
    const [neighborhood] = await db.insert(neighborhoods).values(insertNeighborhood).returning();
    return neighborhood;
  }
  // Guides
  async getGuide(id) {
    const [guide] = await db.select().from(guides).where(eq(guides.id, id));
    return guide || void 0;
  }
  async getGuideBySlug(slug) {
    const [guide] = await db.select().from(guides).where(eq(guides.slug, slug));
    return guide || void 0;
  }
  async getGuidesByAgent(agentId) {
    return await db.select().from(guides).where(eq(guides.agentId, agentId)).orderBy(desc(guides.updatedAt));
  }
  async getGuidesByNeighborhood(neighborhoodId) {
    return await db.select().from(guides).where(eq(guides.neighborhoodId, neighborhoodId)).orderBy(desc(guides.updatedAt));
  }
  async getFeaturedGuides(agentId) {
    return await db.select().from(guides).where(and(eq(guides.agentId, agentId), eq(guides.isFeatured, true))).orderBy(desc(guides.updatedAt));
  }
  async createGuide(insertGuide) {
    const [guide] = await db.insert(guides).values(insertGuide).returning();
    return guide;
  }
  // Testimonials
  async getTestimonialsByAgent(agentId) {
    try {
      return await db.select().from(testimonials).where(eq(testimonials.agentId, agentId)).orderBy(desc(testimonials.createdAt));
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      throw new Error("Failed to fetch testimonials from database");
    }
  }
  async createTestimonial(insertTestimonial) {
    const [testimonial] = await db.insert(testimonials).values(insertTestimonial).returning();
    return testimonial;
  }
  // Leads
  async createLead(insertLead) {
    const [lead] = await db.insert(leads).values(insertLead).returning();
    return lead;
  }
  async getLeadsByAgent(agentId) {
    return await db.select().from(leads).where(eq(leads.agentId, agentId)).orderBy(desc(leads.createdAt));
  }
  // Chat Sessions
  async getChatSession(sessionId) {
    const [session] = await db.select().from(chatSessions).where(eq(chatSessions.sessionId, sessionId));
    return session || void 0;
  }
  async createChatSession(insertSession) {
    const [session] = await db.insert(chatSessions).values(insertSession).returning();
    return session;
  }
  async updateChatSession(sessionId, messages) {
    const [session] = await db.update(chatSessions).set({ messages, updatedAt: /* @__PURE__ */ new Date() }).where(eq(chatSessions.sessionId, sessionId)).returning();
    return session || void 0;
  }
  // Properties
  async getProperty(id) {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property || void 0;
  }
  async getPropertiesByAgent(agentId) {
    return await db.select().from(properties).where(eq(properties.agentId, agentId));
  }
  async getPropertiesByNeighborhood(neighborhoodId) {
    return await db.select().from(properties).where(eq(properties.neighborhoodId, neighborhoodId));
  }
  async searchProperties(filters) {
    const conditions = [];
    if (filters.agentId) {
      conditions.push(eq(properties.agentId, filters.agentId));
    }
    if (filters.status) {
      conditions.push(eq(properties.status, filters.status));
    }
    if (filters.propertyType) {
      conditions.push(eq(properties.propertyType, filters.propertyType));
    }
    if (conditions.length > 0) {
      return await db.select().from(properties).where(and(...conditions));
    }
    return await db.select().from(properties);
  }
  async createProperty(insertProperty) {
    const [property] = await db.insert(properties).values(insertProperty).returning();
    return property;
  }
  async updateProperty(id, insertProperty) {
    const [property] = await db.update(properties).set({ ...insertProperty, updatedAt: /* @__PURE__ */ new Date() }).where(eq(properties.id, id)).returning();
    return property || void 0;
  }
  // Property Comparisons
  async getPropertyComparison(id) {
    const [comparison] = await db.select().from(propertyComparisons).where(eq(propertyComparisons.id, id));
    return comparison || void 0;
  }
  async getPropertyComparisonsBySession(sessionId) {
    return await db.select().from(propertyComparisons).where(eq(propertyComparisons.sessionId, sessionId));
  }
  async createPropertyComparison(insertComparison) {
    const [comparison] = await db.insert(propertyComparisons).values(insertComparison).returning();
    return comparison;
  }
  async deletePropertyComparison(id) {
    const result = await db.delete(propertyComparisons).where(eq(propertyComparisons.id, id));
    return (result.rowCount ?? 0) > 0;
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import { z } from "zod";

// server/market-data.ts
var MarketDataService = class {
  apiKey;
  baseUrl = "https://realty-mole-property-api.p.rapidapi.com";
  constructor() {
    this.apiKey = process.env.RAPIDAPI_KEY || "";
    if (!this.apiKey) {
      console.warn("RAPIDAPI_KEY not found in environment variables");
    }
  }
  async makeRequest(endpoint, params) {
    const url = new URL(endpoint, this.baseUrl);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": this.apiKey,
        "X-RapidAPI-Host": "realty-mole-property-api.p.rapidapi.com"
      }
    });
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }
  async getMarketData(zipCode) {
    try {
      const marketStats = await this.makeRequest("/zipCodes", {
        zipCode
      });
      const listings = await this.makeRequest("/properties", {
        zipCode,
        limit: "100"
      });
      const currentData = {
        medianPrice: marketStats.medianHomeValue || 0,
        averageDays: marketStats.averageDaysOnMarket || 0,
        totalListings: listings.length || 0,
        priceChange: marketStats.oneYearChange || 0,
        location: `${marketStats.city || "Charlotte"}, NC ${zipCode}`,
        lastUpdated: (/* @__PURE__ */ new Date()).toLocaleDateString()
      };
      const historicalData = this.generateHistoricalData(currentData.medianPrice);
      return {
        currentData,
        historicalData
      };
    } catch (error) {
      console.error("Market data fetch error:", error);
      throw new Error("Failed to fetch market data");
    }
  }
  generateHistoricalData(currentPrice) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun"
    ];
    return months.map((month, index) => {
      const variation = (Math.random() - 0.5) * 0.1;
      const price = Math.round(currentPrice * (1 + variation));
      const days = Math.round(25 + Math.random() * 20);
      return {
        month,
        price,
        days
      };
    });
  }
};
var marketDataService = new MarketDataService();

// server/routes.ts
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
function analyzeConversationContext(messages) {
  const userMessages = messages.filter((msg) => msg.role === "user").map((msg) => msg.content.toLowerCase());
  const allText = userMessages.join(" ");
  const nameMatch = allText.match(/(?:i'm|i am|my name is|call me)\s+([a-zA-Z\s]+)/i);
  const extractedName = nameMatch ? nameMatch[1].trim() : null;
  const buyingKeywords = ["buy", "buying", "purchase", "looking for", "want to buy", "need a house"];
  const sellingKeywords = ["sell", "selling", "list my house", "want to sell"];
  const hasBuyingIntent = buyingKeywords.some((keyword) => allText.includes(keyword));
  const hasSellingIntent = sellingKeywords.some((keyword) => allText.includes(keyword));
  const locationKeywords = ["charlotte", "dilworth", "myers park", "noda", "south end", "uptown"];
  const mentionedLocations = locationKeywords.filter((location) => allText.includes(location));
  const urgencyKeywords = ["asap", "urgent", "quickly", "soon", "immediately"];
  const hasUrgency = urgencyKeywords.some((keyword) => allText.includes(keyword));
  return {
    extractedName,
    hasBuyingIntent,
    hasSellingIntent,
    mentionedLocations,
    hasUrgency,
    messageCount: messages.length
  };
}
function extractContactInfo(conversationText) {
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
async function registerRoutes(app2) {
  app2.use(express.static(path.join(__dirname, "public")));
  app2.use("/attached_assets", express.static(path.join(__dirname, "..", "attached_assets")));
  app2.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  });
  app2.get("/api/agents", async (req, res) => {
    try {
      const agents2 = await storage.getAllAgents();
      res.json(agents2);
    } catch (error) {
      console.error("Error fetching agents:", error);
      res.status(500).json({ message: "Failed to fetch agents" });
    }
  });
  app2.get("/api/agents/:slug", async (req, res) => {
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
  app2.get("/api/neighborhoods", async (req, res) => {
    try {
      const { agentId, featured } = req.query;
      let neighborhoods2;
      if (agentId) {
        if (featured === "true") {
          neighborhoods2 = await storage.getFeaturedNeighborhoods(parseInt(agentId));
        } else {
          neighborhoods2 = await storage.getNeighborhoodsByAgent(parseInt(agentId));
        }
      } else {
        neighborhoods2 = await storage.getAllNeighborhoods();
      }
      res.json(neighborhoods2);
    } catch (error) {
      console.error("Error fetching neighborhoods:", error);
      res.status(500).json({ message: "Failed to fetch neighborhoods" });
    }
  });
  app2.get("/api/neighborhoods/:slug", async (req, res) => {
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
  app2.get("/api/guides", async (req, res) => {
    try {
      const { agentId, neighborhoodId, featured } = req.query;
      let guides2 = [];
      if (agentId && featured === "true") {
        guides2 = await storage.getFeaturedGuides(parseInt(agentId));
      } else if (agentId) {
        guides2 = await storage.getGuidesByAgent(parseInt(agentId));
      } else if (neighborhoodId) {
        guides2 = await storage.getGuidesByNeighborhood(parseInt(neighborhoodId));
      }
      res.json(guides2);
    } catch (error) {
      console.error("Error fetching guides:", error);
      res.status(500).json({ message: "Failed to fetch guides" });
    }
  });
  app2.get("/api/guides/:slug", async (req, res) => {
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
  app2.get("/api/testimonials", async (req, res) => {
    try {
      const { agentId } = req.query;
      if (!agentId) {
        return res.status(400).json({ message: "Agent ID is required" });
      }
      const testimonials2 = await storage.getTestimonialsByAgent(parseInt(agentId));
      res.json(testimonials2);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });
  app2.get("/api/agents/:agentId/testimonials", async (req, res) => {
    try {
      const testimonials2 = await storage.getTestimonialsByAgent(parseInt(req.params.agentId));
      res.json(testimonials2);
    } catch (error) {
      console.error("Error fetching agent testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });
  app2.get("/api/agents/:agentId/neighborhoods/featured", async (req, res) => {
    try {
      const neighborhoods2 = await storage.getFeaturedNeighborhoods(parseInt(req.params.agentId));
      res.json(neighborhoods2);
    } catch (error) {
      console.error("Error fetching featured neighborhoods:", error);
      res.status(500).json({ message: "Failed to fetch neighborhoods" });
    }
  });
  app2.post("/api/leads", async (req, res) => {
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
  app2.post("/api/chat/sessions", async (req, res) => {
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
  app2.get("/api/chat/sessions/:sessionId", async (req, res) => {
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
  app2.put("/api/chat/sessions/:sessionId", async (req, res) => {
    try {
      const { messages } = req.body;
      const session = await storage.updateChatSession(req.params.sessionId, messages);
      if (!session) {
        return res.status(404).json({ message: "Chat session not found" });
      }
      const context = analyzeConversationContext(messages);
      const conversationText = messages.map((m) => m.content).join(" ");
      const contactInfo = extractContactInfo(conversationText);
      res.json(session);
    } catch (error) {
      console.error("Error updating chat session:", error);
      res.status(500).json({ message: "Failed to update chat session" });
    }
  });
  app2.get("/api/properties", async (req, res) => {
    try {
      const { agentId, neighborhoodId, search } = req.query;
      let properties2 = [];
      if (search) {
        properties2 = await storage.searchProperties(req.query);
      } else if (agentId) {
        properties2 = await storage.getPropertiesByAgent(parseInt(agentId));
      } else if (neighborhoodId) {
        properties2 = await storage.getPropertiesByNeighborhood(parseInt(neighborhoodId));
      }
      res.json(properties2);
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });
  app2.get("/api/properties/:id", async (req, res) => {
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
  app2.get("/api/property-comparisons/:sessionId", async (req, res) => {
    try {
      const comparisons = await storage.getPropertyComparisonsBySession(req.params.sessionId);
      res.json(comparisons);
    } catch (error) {
      console.error("Error fetching property comparisons:", error);
      res.status(500).json({ message: "Failed to fetch property comparisons" });
    }
  });
  app2.post("/api/property-comparisons", async (req, res) => {
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
  app2.delete("/api/property-comparisons/:id", async (req, res) => {
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
  app2.get("/api/google-reviews", async (req, res) => {
    try {
      res.json([]);
    } catch (error) {
      console.error("Error fetching Google reviews:", error);
      res.status(500).json({ message: "Failed to fetch Google reviews" });
    }
  });
  app2.get("/api/market-data/:zipCode", async (req, res) => {
    try {
      const marketData = await marketDataService.getMarketData(req.params.zipCode);
      res.json(marketData);
    } catch (error) {
      console.error("Error fetching market data:", error);
      res.status(500).json({ message: "Failed to fetch market data" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express2 from "express";
import fs from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express2.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
import compression from "compression";
var app = express3();
app.use(compression());
function log(message) {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [express] ${message}`);
}
app.use(express3.json());
app.use(express3.urlencoded({ extended: false }));
app.get("/blog-management-system", (req, res) => {
  res.redirect("/");
});
app.get("/blog-admin", (req, res) => {
  res.redirect("/");
});
app.get("/admin-portal", (req, res) => {
  res.redirect("/");
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error("Server error:", err);
    res.status(status).json({ message });
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen(port, "0.0.0.0", () => {
    log(`serving on port ${port}`);
  });
})();
