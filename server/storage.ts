import { 
  agents, neighborhoods, guides, testimonials, leads, chatSessions, properties, propertyComparisons,
  type Agent, type InsertAgent,
  type Neighborhood, type InsertNeighborhood,
  type Guide, type InsertGuide,
  type Testimonial, type InsertTestimonial,
  type Lead, type InsertLead,
  type ChatSession, type InsertChatSession,
  type Property, type InsertProperty,
  type PropertyComparison, type InsertPropertyComparison
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // Agents
  getAgent(id: number): Promise<Agent | undefined>;
  getAgentBySlug(slug: string): Promise<Agent | undefined>;
  getAllAgents(): Promise<Agent[]>;
  createAgent(agent: InsertAgent): Promise<Agent>;
  updateAgent(id: number, agent: Partial<InsertAgent>): Promise<Agent | undefined>;

  // Neighborhoods
  getNeighborhood(id: number): Promise<Neighborhood | undefined>;
  getNeighborhoodBySlug(slug: string): Promise<Neighborhood | undefined>;
  getNeighborhoodsByAgent(agentId: number): Promise<Neighborhood[]>;
  createNeighborhood(neighborhood: InsertNeighborhood): Promise<Neighborhood>;
  
  // Guides
  getGuide(id: number): Promise<Guide | undefined>;
  getGuideBySlug(slug: string): Promise<Guide | undefined>;
  getGuidesByAgent(agentId: number): Promise<Guide[]>;
  getGuidesByNeighborhood(neighborhoodId: number): Promise<Guide[]>;
  getFeaturedGuides(agentId: number): Promise<Guide[]>;
  createGuide(guide: InsertGuide): Promise<Guide>;
  
  // Testimonials
  getTestimonialsByAgent(agentId: number): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Leads
  createLead(lead: InsertLead): Promise<Lead>;
  getLeadsByAgent(agentId: number): Promise<Lead[]>;
  
  // Chat Sessions
  getChatSession(sessionId: string): Promise<ChatSession | undefined>;
  createChatSession(session: InsertChatSession): Promise<ChatSession>;
  updateChatSession(sessionId: string, messages: any[]): Promise<ChatSession | undefined>;
  
  // Properties
  getProperty(id: number): Promise<Property | undefined>;
  getPropertiesByAgent(agentId: number): Promise<Property[]>;
  getPropertiesByNeighborhood(neighborhoodId: number): Promise<Property[]>;
  searchProperties(filters: any): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined>;
  
  // Property Comparisons
  getPropertyComparison(id: number): Promise<PropertyComparison | undefined>;
  getPropertyComparisonsBySession(sessionId: string): Promise<PropertyComparison[]>;
  createPropertyComparison(comparison: InsertPropertyComparison): Promise<PropertyComparison>;
  deletePropertyComparison(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // Agents
  async getAgent(id: number): Promise<Agent | undefined> {
    const [agent] = await db.select().from(agents).where(eq(agents.id, id));
    return agent || undefined;
  }

  async getAgentBySlug(slug: string): Promise<Agent | undefined> {
    // For now, we'll use firstName-lastName as slug logic
    const [firstName, lastName] = slug.split('-');
    const [agent] = await db.select().from(agents)
      .where(and(eq(agents.firstName, firstName), eq(agents.lastName, lastName)));
    return agent || undefined;
  }

  async getAllAgents(): Promise<Agent[]> {
    return await db.select().from(agents).where(eq(agents.isActive, true));
  }

  async createAgent(insertAgent: InsertAgent): Promise<Agent> {
    const [agent] = await db.insert(agents).values(insertAgent).returning();
    return agent;
  }

  async updateAgent(id: number, insertAgent: Partial<InsertAgent>): Promise<Agent | undefined> {
    const [agent] = await db.update(agents)
      .set(insertAgent)
      .where(eq(agents.id, id))
      .returning();
    return agent || undefined;
  }

  // Neighborhoods
  async getNeighborhood(id: number): Promise<Neighborhood | undefined> {
    const [neighborhood] = await db.select().from(neighborhoods).where(eq(neighborhoods.id, id));
    return neighborhood || undefined;
  }

  async getNeighborhoodBySlug(slug: string): Promise<Neighborhood | undefined> {
    const [neighborhood] = await db.select().from(neighborhoods).where(eq(neighborhoods.slug, slug));
    return neighborhood || undefined;
  }

  async getNeighborhoodsByAgent(agentId: number): Promise<Neighborhood[]> {
    return await db.select().from(neighborhoods).where(eq(neighborhoods.agentId, agentId));
  }

  async createNeighborhood(insertNeighborhood: InsertNeighborhood): Promise<Neighborhood> {
    const [neighborhood] = await db.insert(neighborhoods).values(insertNeighborhood).returning();
    return neighborhood;
  }

  // Guides
  async getGuide(id: number): Promise<Guide | undefined> {
    const [guide] = await db.select().from(guides).where(eq(guides.id, id));
    return guide || undefined;
  }

  async getGuideBySlug(slug: string): Promise<Guide | undefined> {
    const [guide] = await db.select().from(guides).where(eq(guides.slug, slug));
    return guide || undefined;
  }

  async getGuidesByAgent(agentId: number): Promise<Guide[]> {
    return await db.select().from(guides)
      .where(eq(guides.agentId, agentId))
      .orderBy(desc(guides.updatedAt));
  }

  async getGuidesByNeighborhood(neighborhoodId: number): Promise<Guide[]> {
    return await db.select().from(guides)
      .where(eq(guides.neighborhoodId, neighborhoodId))
      .orderBy(desc(guides.updatedAt));
  }

  async getFeaturedGuides(agentId: number): Promise<Guide[]> {
    return await db.select().from(guides)
      .where(and(eq(guides.agentId, agentId), eq(guides.isFeatured, true)))
      .orderBy(desc(guides.updatedAt));
  }

  async createGuide(insertGuide: InsertGuide): Promise<Guide> {
    const [guide] = await db.insert(guides).values(insertGuide).returning();
    return guide;
  }

  // Testimonials
  async getTestimonialsByAgent(agentId: number): Promise<Testimonial[]> {
    return await db.select().from(testimonials)
      .where(eq(testimonials.agentId, agentId))
      .orderBy(desc(testimonials.createdAt));
  }

  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const [testimonial] = await db.insert(testimonials).values(insertTestimonial).returning();
    return testimonial;
  }

  // Leads
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db.insert(leads).values(insertLead).returning();
    return lead;
  }

  async getLeadsByAgent(agentId: number): Promise<Lead[]> {
    return await db.select().from(leads)
      .where(eq(leads.agentId, agentId))
      .orderBy(desc(leads.createdAt));
  }

  // Chat Sessions
  async getChatSession(sessionId: string): Promise<ChatSession | undefined> {
    const [session] = await db.select().from(chatSessions).where(eq(chatSessions.sessionId, sessionId));
    return session || undefined;
  }

  async createChatSession(insertSession: InsertChatSession): Promise<ChatSession> {
    const [session] = await db.insert(chatSessions).values(insertSession).returning();
    return session;
  }

  async updateChatSession(sessionId: string, messages: any[]): Promise<ChatSession | undefined> {
    const [session] = await db.update(chatSessions)
      .set({ messages, updatedAt: new Date() })
      .where(eq(chatSessions.sessionId, sessionId))
      .returning();
    return session || undefined;
  }

  // Properties
  async getProperty(id: number): Promise<Property | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property || undefined;
  }

  async getPropertiesByAgent(agentId: number): Promise<Property[]> {
    return await db.select().from(properties).where(eq(properties.agentId, agentId));
  }

  async getPropertiesByNeighborhood(neighborhoodId: number): Promise<Property[]> {
    return await db.select().from(properties).where(eq(properties.neighborhoodId, neighborhoodId));
  }

  async searchProperties(filters: any): Promise<Property[]> {
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

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const [property] = await db.insert(properties).values(insertProperty).returning();
    return property;
  }

  async updateProperty(id: number, insertProperty: Partial<InsertProperty>): Promise<Property | undefined> {
    const [property] = await db.update(properties)
      .set({ ...insertProperty, updatedAt: new Date() })
      .where(eq(properties.id, id))
      .returning();
    return property || undefined;
  }

  // Property Comparisons
  async getPropertyComparison(id: number): Promise<PropertyComparison | undefined> {
    const [comparison] = await db.select().from(propertyComparisons).where(eq(propertyComparisons.id, id));
    return comparison || undefined;
  }

  async getPropertyComparisonsBySession(sessionId: string): Promise<PropertyComparison[]> {
    return await db.select().from(propertyComparisons).where(eq(propertyComparisons.sessionId, sessionId));
  }

  async createPropertyComparison(insertComparison: InsertPropertyComparison): Promise<PropertyComparison> {
    const [comparison] = await db.insert(propertyComparisons).values(insertComparison).returning();
    return comparison;
  }

  async deletePropertyComparison(id: number): Promise<boolean> {
    const result = await db.delete(propertyComparisons).where(eq(propertyComparisons.id, id));
    return (result.rowCount ?? 0) > 0;
  }
}

export const storage = new DatabaseStorage();
