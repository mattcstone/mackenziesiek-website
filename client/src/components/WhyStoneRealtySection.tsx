import { Award, Home, Star, TrendingUp } from "lucide-react";

export default function WhyStoneRealtySection() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Stone Realty Group
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Charlotte's leading real estate team with an unmatched track record of success. 
            When you work with us, you're backed by years of expertise and thousands of satisfied clients.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center group">
            <div className="bg-stone-blue rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="h-10 w-10 text-white" />
            </div>
            <div className="text-4xl lg:text-5xl font-bold text-stone-blue mb-2">18</div>
            <div className="text-lg font-semibold text-gray-900 mb-2">Years in Business</div>
            <p className="text-gray-600">
              Nearly two decades of Charlotte market expertise and proven results
            </p>
          </div>

          <div className="text-center group">
            <div className="bg-stone-blue rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Home className="h-10 w-10 text-white" />
            </div>
            <div className="text-4xl lg:text-5xl font-bold text-stone-blue mb-2">2500+</div>
            <div className="text-lg font-semibold text-gray-900 mb-2">Homes Sold</div>
            <p className="text-gray-600">
              Thousands of successful transactions across the Charlotte metro area
            </p>
          </div>

          <div className="text-center group">
            <div className="bg-stone-blue rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Star className="h-10 w-10 text-white" />
            </div>
            <div className="text-4xl lg:text-5xl font-bold text-stone-blue mb-2">1,000</div>
            <div className="text-lg font-semibold text-gray-900 mb-2">5-Star Reviews</div>
            <p className="text-gray-600">
              Exceptional client satisfaction backed by authentic testimonials
            </p>
          </div>
        </div>

        <div className="bg-stone-blue rounded-2xl p-8 text-white text-center">
          <div className="flex items-center justify-center mb-4">
            <Award className="h-8 w-8 mr-3" />
            <h3 className="text-2xl font-bold">Charlotte's Most Trusted Real Estate Team</h3>
          </div>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto">
            Our track record speaks for itself. With 18 years of market leadership, over 2,500 successful home sales, 
            and 1,000+ five-star reviews, Stone Realty Group has earned its reputation as Charlotte's premier real estate team. 
            When you choose us, you're choosing proven expertise and unparalleled service.
          </p>
        </div>
      </div>
    </section>
  );
}