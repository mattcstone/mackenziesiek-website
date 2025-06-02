import { Award, Home, Star, TrendingUp } from "lucide-react";

export default function WhyStoneRealtySection() {
  return (
    <section className="py-12 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Why Stone Realty Group
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            When you work with us, you're backed by years of expertise and thousands of satisfied clients.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="text-center group">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
              <div className="bg-gradient-to-br from-stone-blue to-blue-600 rounded-xl w-14 h-14 flex items-center justify-center mx-auto mb-4 shadow-xl">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">18</div>
              <div className="text-sm font-bold text-white mb-2">Years in Business</div>
              <p className="text-xs text-gray-400">
                Nearly two decades of Charlotte market expertise and proven results
              </p>
            </div>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
              <div className="bg-gradient-to-br from-stone-blue to-blue-600 rounded-xl w-14 h-14 flex items-center justify-center mx-auto mb-4 shadow-xl">
                <Home className="h-7 w-7 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">2500+</div>
              <div className="text-sm font-bold text-white mb-2">Homes Sold</div>
              <p className="text-xs text-gray-400">
                Thousands of successful transactions across the Charlotte metro area
              </p>
            </div>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
              <div className="bg-gradient-to-br from-stone-blue to-blue-600 rounded-xl w-14 h-14 flex items-center justify-center mx-auto mb-4 shadow-xl">
                <Star className="h-7 w-7 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">1,000</div>
              <div className="text-sm font-bold text-white mb-2">5-Star Reviews</div>
              <p className="text-xs text-gray-400">
                Exceptional client satisfaction backed by authentic testimonials
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-stone-blue/90 to-blue-700/90 backdrop-blur-sm rounded-2xl p-8 text-white text-center border border-white/20">
          <div className="flex items-center justify-center mb-4">
            <Award className="h-6 w-6 mr-3 text-yellow-400" />
            <h3 className="text-xl font-bold">Charlotte's Most Trusted Real Estate Team</h3>
          </div>
          <p className="text-blue-100 max-w-3xl mx-auto">
            Our track record speaks for itself. With 18 years of market leadership, over 2,500 successful home sales, 
            and 1,000+ five-star reviews, Stone Realty Group has earned its reputation as Charlotte's premier real estate team. 
            When you choose us, you're choosing proven expertise and unparalleled service.
          </p>
        </div>
      </div>
    </section>
  );
}