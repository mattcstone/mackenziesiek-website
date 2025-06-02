import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyComparisonDashboard from "@/components/PropertyComparisonDashboard";
import BackToTop from "@/components/BackToTop";
import type { Agent } from "@shared/schema";

export default function ComparePage() {
  // Using the same default agent data as other pages
  const defaultAgent: Agent = {
    id: 1,
    firstName: "Mackenzie",
    lastName: "Siek",
    email: "mackenzie@stonerealty.com",
    phone: "(704) 610-0959",
    bio: "Your trusted Charlotte real estate expert with deep knowledge of the city's most desirable neighborhoods. Specializing in in-town living, luxury condos, and investment properties.",
    headshot: "/assets/agent-headshot.jpg",
    welcomeVideo: null,
    church: "Charlotte Community Church",
    favoriteNeighborhood: "Fourth Ward",
    favoriteSpot: "Romare Bearden Park",
    favoriteRestaurant: "The Cellar at Duckworth's",
    hobby: "Urban photography and cycling",
    homesSold: 127,
    avgDaysOnMarket: 18,
    rating: "4.9",
    isActive: true,
    createdAt: new Date(),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header agentName={`${defaultAgent.firstName} ${defaultAgent.lastName}`} />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PropertyComparisonDashboard agentId={defaultAgent.id} />
        </div>
      </main>

      <Footer agent={defaultAgent} />
      <BackToTop />
    </div>
  );
}