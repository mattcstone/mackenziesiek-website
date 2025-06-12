import { useEffect } from 'react';
import MarketInsightsInfographic from '@/components/MarketInsightsInfographic-clean';
import MainNavigation from '@/components/MainNavigation';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

export default function MarketInsightsPage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const marketInsightsSchema = {
    "@context": "https://schema.org",
    "@type": "Report",
    "name": "Charlotte Real Estate Market Insights",
    "description": "Current Charlotte real estate market data including home prices, days on market, and trends across 25+ neighborhoods",
    "author": {
      "@type": "RealEstateAgent",
      "name": "Mackenzie Siek",
      "telephone": "(704) 610-0959"
    },
    "about": {
      "@type": "Place",
      "name": "Charlotte Metro Area, NC"
    },
    "datePublished": new Date().toISOString(),
    "publisher": {
      "@type": "Organization",
      "name": "Stone Realty Group"
    }
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title="Charlotte Real Estate Market Insights | Current Market Data | Mackenzie Siek Realtor"
        description="Get current Charlotte real estate market insights including home prices, days on market, and trends across 25+ neighborhoods. Expert analysis from top Charlotte realtor Mackenzie Siek."
        keywords="Charlotte real estate market, Charlotte home prices, Charlotte market trends, Charlotte neighborhoods, real estate market data, Charlotte housing market, market insights Charlotte NC"
        canonicalUrl="https://mackenzie.mattstoneteam.com/market-insights"
        schema={marketInsightsSchema}
        ogImage="/assets/shutterstock_284834021.jpg"
      />
      <NavigationHeader agentName="Mackenzie Siek" />
      
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <MarketInsightsInfographic />
          </div>
        </div>
      </div>

      <Footer agent={{
        id: 1,
        firstName: "Mackenzie",
        lastName: "Siek",
        email: "mackenzie@mattstoneteam.com",
        phone: "(704) 610-0959",
        bio: "",
        headshot: "/assets/mackenzie-headshot.jpg",
        welcomeVideo: "",
        church: null,
        favoriteNeighborhood: "In-town Charlotte",
        favoriteSpot: "Farmers markets & the Rail Trail",
        favoriteRestaurant: "300 East",
        hobby: "Interior design & traveling",
        homesSold: 100,
        avgDaysOnMarket: 15,
        yearsExperience: 8,
        slug: "mackenzie-siek",
        createdAt: new Date(),
        updatedAt: new Date()
      }} />
    </div>
  );
}