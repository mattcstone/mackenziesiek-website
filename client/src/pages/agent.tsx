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
    firstName: "Mackenzie",
    lastName: "Siek",
    email: "mackenzie@mattstoneteam.com",
    phone: "(704) 555-0123",
    bio: "Hey! I'm Mackenzie Siek, and I specialize in helping young professionals and first-time buyers find their perfect home in Charlotte's most vibrant neighborhoods. From SouthEnd's high-rises to NoDa's artsy scene, I know what makes each area special for the modern lifestyle.",
    headshot: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
    welcomeVideo: "https://example.com/welcome-video.mp4",
    church: null,
    favoriteNeighborhood: "SouthEnd & NoDa",
    favoriteSpot: "Not Just Coffee",
    favoriteRestaurant: "Superica",
    hobby: "Exploring Charlotte's food scene",
    homesSold: 100,
    avgDaysOnMarket: 15,
    rating: "5.0",
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
