import { pgTable, text, serial, integer, boolean, timestamp, jsonb, decimal, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const agents = pgTable("agents", {
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
  createdAt: timestamp("created_at").defaultNow(),
});

export const neighborhoods = pgTable("neighborhoods", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  image: text("image"),
  avgPrice: text("avg_price"),
  walkScore: integer("walk_score"),
  agentId: integer("agent_id").references(() => agents.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const guides = pgTable("guides", {
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
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  content: text("content").notNull(),
  rating: integer("rating").notNull(),
  image: text("image"),
  agentId: integer("agent_id").references(() => agents.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const leads = pgTable("leads", {
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
  createdAt: timestamp("created_at").defaultNow(),
});

export const chatSessions = pgTable("chat_sessions", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().unique(),
  agentId: integer("agent_id").references(() => agents.id),
  messages: jsonb("messages").default([]),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const properties = pgTable("properties", {
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
  status: text("status").notNull(), // Active, Pending, Sold
  daysOnMarket: integer("days_on_market"),
  images: text("images").array(),
  description: text("description"),
  neighborhoodId: integer("neighborhood_id").references(() => neighborhoods.id),
  agentId: integer("agent_id").references(() => agents.id),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const propertyComparisons = pgTable("property_comparisons", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  propertyIds: integer("property_ids").array().notNull(),
  agentId: integer("agent_id").references(() => agents.id),
  createdAt: timestamp("created_at").defaultNow(),
});



// Relations
export const agentsRelations = relations(agents, ({ many }) => ({
  neighborhoods: many(neighborhoods),
  guides: many(guides),
  testimonials: many(testimonials),
  leads: many(leads),
  chatSessions: many(chatSessions),
  properties: many(properties),
  propertyComparisons: many(propertyComparisons),

}));

export const neighborhoodsRelations = relations(neighborhoods, ({ one, many }) => ({
  agent: one(agents, {
    fields: [neighborhoods.agentId],
    references: [agents.id],
  }),
  guides: many(guides),
  properties: many(properties),
}));

export const guidesRelations = relations(guides, ({ one }) => ({
  neighborhood: one(neighborhoods, {
    fields: [guides.neighborhoodId],
    references: [neighborhoods.id],
  }),
  agent: one(agents, {
    fields: [guides.agentId],
    references: [agents.id],
  }),
}));

export const testimonialsRelations = relations(testimonials, ({ one }) => ({
  agent: one(agents, {
    fields: [testimonials.agentId],
    references: [agents.id],
  }),
}));

export const leadsRelations = relations(leads, ({ one }) => ({
  agent: one(agents, {
    fields: [leads.agentId],
    references: [agents.id],
  }),
}));

export const chatSessionsRelations = relations(chatSessions, ({ one }) => ({
  agent: one(agents, {
    fields: [chatSessions.agentId],
    references: [agents.id],
  }),
}));

export const propertiesRelations = relations(properties, ({ one }) => ({
  neighborhood: one(neighborhoods, {
    fields: [properties.neighborhoodId],
    references: [neighborhoods.id],
  }),
  agent: one(agents, {
    fields: [properties.agentId],
    references: [agents.id],
  }),
}));

export const propertyComparisonsRelations = relations(propertyComparisons, ({ one }) => ({
  agent: one(agents, {
    fields: [propertyComparisons.agentId],
    references: [agents.id],
  }),
}));





// Insert schemas
export const insertAgentSchema = createInsertSchema(agents).omit({
  id: true,
  createdAt: true,
});

export const insertNeighborhoodSchema = createInsertSchema(neighborhoods).omit({
  id: true,
  createdAt: true,
});

export const insertGuideSchema = createInsertSchema(guides).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
});

export const insertChatSessionSchema = createInsertSchema(chatSessions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPropertyComparisonSchema = createInsertSchema(propertyComparisons).omit({
  id: true,
  createdAt: true,
});



// Types
export type Agent = typeof agents.$inferSelect;
export type InsertAgent = z.infer<typeof insertAgentSchema>;
export type Neighborhood = typeof neighborhoods.$inferSelect;
export type InsertNeighborhood = z.infer<typeof insertNeighborhoodSchema>;
export type Guide = typeof guides.$inferSelect;
export type InsertGuide = z.infer<typeof insertGuideSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Lead = typeof leads.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type ChatSession = typeof chatSessions.$inferSelect;
export type InsertChatSession = z.infer<typeof insertChatSessionSchema>;
export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type PropertyComparison = typeof propertyComparisons.$inferSelect;
export type InsertPropertyComparison = z.infer<typeof insertPropertyComparisonSchema>;

