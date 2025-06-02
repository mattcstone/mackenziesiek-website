import { Award, Home, Star, TrendingUp, Sparkles } from "lucide-react";

export default function WhyStoneRealtySection() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-400 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-cyan-400 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-full px-6 py-2 mb-6">
            <Sparkles className="h-5 w-5 text-white mr-2" />
            <span className="text-white font-semibold">Charlotte's #1 Choice</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
            Why Stone Realty Group
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Charlotte's leading real estate team with an unmatched track record of success. 
            When you work with us, you're backed by years of expertise and thousands of satisfied clients.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center group relative">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-2xl shadow-blue-500/30">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-2">18</div>
            <div className="text-lg font-semibold text-white mb-2">Years in Business</div>
            <p className="text-gray-400 text-sm">
              Nearly two decades of Charlotte market expertise and proven results
            </p>
          </div>

          <div className="text-center group relative">
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-2xl shadow-purple-500/30">
                <Home className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-2">2500+</div>
            <div className="text-lg font-semibold text-white mb-2">Homes Sold</div>
            <p className="text-gray-400 text-sm">
              Thousands of successful transactions across the Charlotte metro area
            </p>
          </div>

          <div className="text-center group relative">
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-2xl shadow-yellow-500/30">
                <Star className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">1,000</div>
            <div className="text-lg font-semibold text-white mb-2">5-Star Reviews</div>
            <p className="text-gray-400 text-sm">
              Exceptional client satisfaction backed by authentic testimonials
            </p>
          </div>
        </div>

        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 rounded-2xl p-8 text-white text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-purple-600/80 to-blue-700/80 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-4">
              <Award className="h-8 w-8 mr-3 text-yellow-300" />
              <h3 className="text-2xl font-bold">Charlotte's Most Trusted Real Estate Team</h3>
            </div>
            <p className="text-lg text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Our track record speaks for itself. With 18 years of market leadership, over 2,500 successful home sales, 
              and 1,000+ five-star reviews, Stone Realty Group has earned its reputation as Charlotte's premier real estate team. 
              When you choose us, you're choosing proven expertise and unparalleled service.
            </p>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-8 h-8 border-2 border-white/30 rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-6 h-6 border-2 border-white/30 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}