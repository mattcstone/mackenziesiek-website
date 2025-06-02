import { Award, Home, Star, TrendingUp, DollarSign } from "lucide-react";

export default function WhyStoneRealtySection() {
  return (
    <section className="py-12 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Experience The Stone Standard
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-10">
          <div className="text-center group">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
              <div className="bg-gradient-to-br from-stone-blue to-blue-600 rounded-xl w-12 h-12 flex items-center justify-center mx-auto mb-3 shadow-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">18</div>
              <div className="text-xs font-bold text-white">Years in Business</div>
            </div>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
              <div className="bg-gradient-to-br from-stone-blue to-blue-600 rounded-xl w-12 h-12 flex items-center justify-center mx-auto mb-3 shadow-xl">
                <Home className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">2500+</div>
              <div className="text-xs font-bold text-white">Homes Sold</div>
            </div>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
              <div className="bg-gradient-to-br from-stone-blue to-blue-600 rounded-xl w-12 h-12 flex items-center justify-center mx-auto mb-3 shadow-xl">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">$1.5B</div>
              <div className="text-xs font-bold text-white">Closed Transactions</div>
            </div>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
              <div className="bg-gradient-to-br from-stone-blue to-blue-600 rounded-xl w-12 h-12 flex items-center justify-center mx-auto mb-3 shadow-xl">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-1">1,000</div>
              <div className="text-xs font-bold text-white">5-Star Reviews</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-stone-blue/90 to-blue-700/90 backdrop-blur-sm rounded-2xl p-6 text-white text-center border border-white/20">
          <p className="text-blue-100 max-w-4xl mx-auto text-sm leading-relaxed">
            Stone Realty Group, under the leadership of Matt Stone, boasts an impressive 18-year track record in real estate, with over $1.5 billion in closed transactions. In 2023, Matt earned recognition as the 2nd ranked agent out of 8,000 in Charlotte by Real Producers Magazine. Matt leads a powerhouse team of brokers, meticulously selected and trained to meet and uphold 'The Stone Standard.' The team's success is achieved, in part, by leveraging cutting-edge technology and our bespoke property marketing program, "The Stone Selling System." With nearly 1,000 five-star client reviews across various platforms, the team is steadfast in its mission to deliver an unparalleled client experience while preserving the personal touch.
          </p>
        </div>
      </div>
    </section>
  );
}