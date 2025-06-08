import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhyStoneRealtySection from "@/components/WhyStoneRealtySection";
import PersonalStorySection from "@/components/PersonalStorySection";
import NeighborhoodExpertise from "@/components/NeighborhoodExpertise";


import LocalGuidesSection from "@/components/LocalGuidesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import BackToTop from "@/components/BackToTop";
import MarketInsightsInfographic from "@/components/MarketInsightsInfographic";
import SEO from "@/components/SEO";
import LocalSEO from "@/components/LocalSEO";
import type { Agent } from "@shared/schema";

export default function AgentPage() {
  const { slug } = useParams();
  
  // Check if user navigated to contact section and scroll to it
  useEffect(() => {
    if (window.location.hash === '#contact') {
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  }, []);
  
  // Default agent for demonstration (would normally come from database)
  const defaultAgent: Agent = {
    id: 1,
    firstName: "Mackenzie",
    lastName: "Siek",
    email: "mackenzie@mattstoneteam.com",
    phone: "(704) 610-0959",
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

  const homePageSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Mackenzie Siek",
    "url": "https://mackenzie.mattstoneteam.com",
    "telephone": "(704) 610-0959",
    "email": "mackenzie@mattstoneteam.com",
    "image": "/assets/Mackenzie.jpg",
    "description": "Top Charlotte Realtor specializing in SouthEnd, NoDa, Dilworth & Fourth Ward. Expert in in-town Charlotte living with 18+ years experience.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Charlotte",
      "addressRegion": "NC",
      "addressCountry": "US"
    },
    "areaServed": [
      {
        "@type": "Place",
        "name": "SouthEnd Charlotte"
      },
      {
        "@type": "Place", 
        "name": "NoDa Charlotte"
      },
      {
        "@type": "Place",
        "name": "Dilworth Charlotte"
      },
      {
        "@type": "Place",
        "name": "Fourth Ward Charlotte"
      },
      {
        "@type": "Place",
        "name": "Uptown Charlotte"
      }
    ],
    "knowsAbout": ["Charlotte Real Estate", "Condo Sales", "First Time Buyers", "Investment Properties", "Luxury Homes"],
    "memberOf": {
      "@type": "Organization",
      "name": "Stone Realty Group",
      "description": "Premier real estate brokerage with $1.5B in sales and 1000+ 5-star reviews"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "1000"
    },
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Real Estate License",
        "recognizedBy": {
          "@type": "Organization",
          "name": "North Carolina Real Estate Commission"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title="Mackenzie Siek - Top Charlotte Realtor® | SouthEnd, NoDa, Dilworth Specialist | Stone Realty Group"
        description="Charlotte's premier Realtor® Mackenzie Siek specializes in SouthEnd condos, NoDa homes, Dilworth & Fourth Ward properties. 18+ years experience, 1000+ 5-star reviews. Your expert for in-town Charlotte living."
        keywords="Charlotte Realtor, SouthEnd condos, NoDa homes, Dilworth real estate, Fourth Ward properties, Charlotte real estate agent, in-town Charlotte, luxury condos Charlotte, Stone Realty Group"
        canonicalUrl="https://mackenzie.mattstoneteam.com"
        schema={homePageSchema}
        ogImage="/assets/Mackenzie.jpg"
      />
      <LocalSEO 
        businessName="Mackenzie Siek - Stone Realty Group"
        cityState="Charlotte, NC"
        phone="(704) 610-0959"
        website="https://mackenzie.mattstoneteam.com"
        serviceAreas={[
          "SouthEnd Charlotte",
          "NoDa Charlotte", 
          "Dilworth Charlotte",
          "Fourth Ward Charlotte",
          "Uptown Charlotte",
          "Myers Park Charlotte",
          "Plaza Midwood Charlotte",
          "Belmont NC",
          "Davidson NC",
          "Cornelius NC",
          "Huntersville NC",
          "Matthews NC",
          "Mint Hill NC",
          "Pineville NC",
          "Fort Mill SC",
          "Rock Hill SC",
          "Gastonia NC",
          "Concord NC",
          "Kannapolis NC",
          "Indian Trail NC",
          "Weddington NC",
          "Wesley Chapel NC",
          "Ballantyne Charlotte",
          "South Park Charlotte",
          "University City Charlotte"
        ]}
      />
      <Header agentName={`${displayAgent.firstName} ${displayAgent.lastName}`} />
      <HeroSection agent={displayAgent} />
      <PersonalStorySection agent={displayAgent} />

      <WhyStoneRealtySection />
      <NeighborhoodExpertise agentId={displayAgent.id} />
      <TestimonialsSection agentId={displayAgent.id} />
      <LocalGuidesSection agentId={displayAgent.id} />
      <ContactSection agent={displayAgent} />
      <Footer agent={displayAgent} />
      <ChatBot agentName={displayAgent.firstName} agentId={displayAgent.id} />
      <BackToTop />
    </div>
  );
}
