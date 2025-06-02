import MarketTrendStoryWidget from '@/components/MarketTrendStoryWidget';

export default function MarketTrendsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Charlotte Real Estate Market Stories
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the evolving narrative of Charlotte's real estate market through data-driven insights 
              and expert analysis from Stone Realty Group.
            </p>
          </div>
          
          <MarketTrendStoryWidget />
          
          <div className="mt-12 bg-white rounded-lg shadow-sm p-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Ready to Explore Charlotte Real Estate?
              </h2>
              <p className="text-gray-600 mb-6">
                Let our expert team guide you through Charlotte's dynamic market with personalized insights 
                and unmatched local expertise.
              </p>
              <div className="flex justify-center gap-4">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Schedule Consultation
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  View Market Reports
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}