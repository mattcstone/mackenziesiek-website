import MarketInsightsInfographic from '@/components/MarketInsightsInfographic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MarketInsightsPage() {
  return (
    <div className="min-h-screen">
      <Header agentName="Mackenzie Siek" />
      
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                Charlotte Market Insights
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stay ahead of Charlotte's dynamic real estate market with comprehensive data analysis, 
                neighborhood trends, and expert insights from Stone Realty Group.
              </p>
            </div>
            
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