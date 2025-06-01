import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PersonalStorySection from "@/components/PersonalStorySection";
import NeighborhoodExpertise from "@/components/NeighborhoodExpertise";
import PropertySearchSection from "@/components/PropertySearchSection";
import LocalGuidesSection from "@/components/LocalGuidesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import type { Agent } from "@shared/schema";

export default function AgentPage() {
  const { slug } = useParams();
  
  // Default agent for demonstration (would normally come from database)
  const defaultAgent: Agent = {
    id: 1,
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah@mattstoneteam.com",
    phone: "(704) 555-0123",
    bio: "Hi! I'm Sarah Johnson, and I've been helping families find their perfect home in Charlotte for over 8 years. From Myers Park to NoDa, I know every neighborhood like the back of my hand.",
    headshot: "https://images.unsplash.com/photo-1494790108755-2616b612b47b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
    welcomeVideo: "https://example.com/welcome-video.mp4",
    church: "Myers Park Methodist Church",
    favoriteNeighborhood: "Myers Park & Dilworth",
    favoriteSpot: "Undercurrent Coffee",
    favoriteRestaurant: "The Optimist",
    hobby: "Trail Running",
    homesSold: 127,
    avgDaysOnMarket: 18,
    rating: "4.9",
    isActive: true,
    createdAt: new Date(),
  };

  const { data: agent } = useQuery<Agent>({
    queryKey: slug ? [`/api/agents/${slug}`] : [],
    enabled: !!slug,
  });

  const displayAgent = agent || defaultAgent;

  return (
    <div className="min-h-screen">
      <Header agentName={`${displayAgent.firstName} ${displayAgent.lastName}`} />
      <HeroSection agent={displayAgent} />
      <PersonalStorySection agent={displayAgent} />
      <NeighborhoodExpertise agentId={displayAgent.id} />
      <PropertySearchSection />
      <LocalGuidesSection agentId={displayAgent.id} />
      <TestimonialsSection agentId={displayAgent.id} />
      <ContactSection agent={displayAgent} />
      <Footer agent={displayAgent} />
      <ChatBot agentName={displayAgent.firstName} agentId={displayAgent.id} />
    </div>
  );
}
