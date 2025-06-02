import { Award, Home, Star, TrendingUp } from "lucide-react";

export default function WhyStoneRealtySection() {
  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-stone-blue/10 rounded-full px-6 py-2 mb-6">
            <Award className="h-5 w-5 text-stone-blue mr-2" />
            <span className="text-stone-blue font-semibold">Charlotte's Premier Choice</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Stone Realty Group
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Charlotte's leading real estate team with an unmatched track record of success. 
            When you work with us, you're backed by years of expertise and thousands of satisfied clients.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="bg-stone-blue rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <div className="text-5xl font-bold text-stone-blue mb-3">18</div>
            <div className="text-lg font-bold text-gray-900 mb-2">Years in Business</div>
            <p className="text-gray-600 leading-relaxed">
              Nearly two decades of Charlotte market expertise and proven results
            </p>
          </div>

          <div className="text-center group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="bg-stone-blue rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Home className="h-8 w-8 text-white" />
            </div>
            <div className="text-5xl font-bold text-stone-blue mb-3">2500+</div>
            <div className="text-lg font-bold text-gray-900 mb-2">Homes Sold</div>
            <p className="text-gray-600 leading-relaxed">
              Thousands of successful transactions across the Charlotte metro area
            </p>
          </div>

          <div className="text-center group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="bg-stone-blue rounded-2xl w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Star className="h-8 w-8 text-white" />
            </div>
            <div className="text-5xl font-bold text-stone-blue mb-3">1,000</div>
            <div className="text-lg font-bold text-gray-900 mb-2">5-Star Reviews</div>
            <p className="text-gray-600 leading-relaxed">
              Exceptional client satisfaction backed by authentic testimonials
            </p>
          </div>
        </div>

        <div className="bg-stone-blue rounded-2xl p-8 text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-stone-blue/90 to-blue-700/90"></div>
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
        </div>
      </div>
    </section>
  );
}