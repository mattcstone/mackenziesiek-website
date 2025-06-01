import { pgTable, text, serial, integer, boolean, timestamp, jsonb, decimal } from "drizzle-orm/pg-core";
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

// Relations
export const agentsRelations = relations(agents, ({ many }) => ({
  neighborhoods: many(neighborhoods),
  guides: many(guides),
  testimonials: many(testimonials),
  leads: many(leads),
  chatSessions: many(chatSessions),
}));

export const neighborhoodsRelations = relations(neighborhoods, ({ one, many }) => ({
  agent: one(agents, {
    fields: [neighborhoods.agentId],
    references: [agents.id],
  }),
  guides: many(guides),
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
