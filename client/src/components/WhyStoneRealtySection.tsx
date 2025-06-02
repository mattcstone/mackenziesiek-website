import { Award, Home, Star, TrendingUp } from "lucide-react";

export default function WhyStoneRealtySection() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
            <Award className="h-5 w-5 text-yellow-400 mr-2" />
            <span className="text-white font-semibold">Charlotte's Premier Choice</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Why Stone Realty Group
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Charlotte's leading real estate team with an unmatched track record of success. 
            When you work with us, you're backed by years of expertise and thousands of satisfied clients.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center group">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:border-white/30 transition-all duration-500 hover:transform hover:scale-105">
              <div className="bg-gradient-to-br from-stone-blue to-blue-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <div className="text-6xl font-bold text-white mb-4">18</div>
              <div className="text-xl font-bold text-white mb-3">Years in Business</div>
              <p className="text-gray-400 leading-relaxed">
                Nearly two decades of Charlotte market expertise and proven results
              </p>
            </div>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:border-white/30 transition-all duration-500 hover:transform hover:scale-105">
              <div className="bg-gradient-to-br from-stone-blue to-blue-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <Home className="h-10 w-10 text-white" />
              </div>
              <div className="text-6xl font-bold text-white mb-4">2500+</div>
              <div className="text-xl font-bold text-white mb-3">Homes Sold</div>
              <p className="text-gray-400 leading-relaxed">
                Thousands of successful transactions across the Charlotte metro area
              </p>
            </div>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/20 hover:border-white/30 transition-all duration-500 hover:transform hover:scale-105">
              <div className="bg-gradient-to-br from-stone-blue to-blue-600 rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-8 shadow-2xl">
                <Star className="h-10 w-10 text-white" />
              </div>
              <div className="text-6xl font-bold text-white mb-4">1,000</div>
              <div className="text-xl font-bold text-white mb-3">5-Star Reviews</div>
              <p className="text-gray-400 leading-relaxed">
                Exceptional client satisfaction backed by authentic testimonials
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-stone-blue/90 to-blue-700/90 backdrop-blur-sm rounded-3xl p-12 text-white text-center border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-stone-blue/20 to-blue-700/20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <Award className="h-10 w-10 mr-4 text-yellow-400" />
              <h3 className="text-3xl font-bold">Charlotte's Most Trusted Real Estate Team</h3>
            </div>
            <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Our track record speaks for itself. With 18 years of market leadership, over 2,500 successful home sales, 
              and 1,000+ five-star reviews, Stone Realty Group has earned its reputation as Charlotte's premier real estate team. 
              When you choose us, you're choosing proven expertise and unparalleled service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}