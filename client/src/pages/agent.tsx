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
    bio: "Meet Mackenzie Siek — Charlotte native, real estate matchmaker, and former competitive equestrian (yes, really!). Mackenzie was practically raised around open houses, tagging along with her dad, a local builder, and falling in love with everything from floorplans to finishes. With a finance degree from UNC Charlotte and a sharp eye for design, she brings both heart and strategy to the home buying and selling process.",
    headshot: "/assets/mackenzie-headshot.jpg",
    welcomeVideo: "https://example.com/welcome-video.mp4",
    church: null,
    favoriteNeighborhood: "In-town Charlotte",
    favoriteSpot: "Farmers markets & the Rail Trail",
    favoriteRestaurant: "300 East",
    hobby: "Interior design & traveling",
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
