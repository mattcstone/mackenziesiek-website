import { useEffect } from 'react';
import MarketInsightsInfographic from '@/components/MarketInsightsInfographic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MarketInsightsPage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <Header agentName="Mackenzie Siek" />
      
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