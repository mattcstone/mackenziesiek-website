import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhyStoneRealtySection from "@/components/WhyStoneRealtySection";
import PersonalStorySection from "@/components/PersonalStorySection";
import NeighborhoodExpertise from "@/components/NeighborhoodExpertise";
import PropertySearchSection from "@/components/PropertySearchSection";
import LocalGuidesSection from "@/components/LocalGuidesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import BackToTop from "@/components/BackToTop";
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
    bio: "Meet Mackenzie Siek — your trusted Charlotte real estate expert with deep local roots and an unmatched passion for helping clients find their perfect home. Growing up in Charlotte with a builder father, Mackenzie developed an early appreciation for quality construction and thoughtful design. Her background in finance from UNC Charlotte, combined with years of competitive equestrian experience, has instilled the discipline, attention to detail, and strategic thinking that sets her apart in today's market. Whether you're buying your first home or selling a luxury property, Mackenzie brings both expertise and genuine care to every transaction.",
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
      <WhyStoneRealtySection />
      <PersonalStorySection agent={displayAgent} />
      <NeighborhoodExpertise agentId={displayAgent.id} />
      <PropertySearchSection />
      <TestimonialsSection agentId={displayAgent.id} />
      <LocalGuidesSection agentId={displayAgent.id} />
      <ContactSection agent={displayAgent} />
      <Footer agent={displayAgent} />
      <ChatBot agentName={displayAgent.firstName} agentId={displayAgent.id} />
      <BackToTop />
    </div>
  );
}
