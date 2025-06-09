import { Home, Users, Mountain, Handshake, MapPin, Coffee, Utensils, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Agent } from "@shared/schema";

interface PersonalStorySectionProps {
  agent: Agent;
}

export default function PersonalStorySection({ agent }: PersonalStorySectionProps) {
  return (
    <section id="about" className="py-8 lg:py-12 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-2 space-y-6 animate-fade-in-up">
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight hover:text-black transition-colors duration-300">
                Your In-Town Charlotte Expert
              </h2>
              <p className="text-base text-gray-600 leading-relaxed">
                Born and raised in Charlotte, real estate flows through my veins! Growing up, I spent countless weekends 
                exploring model homes with my builder father, absorbing everything from foundation to finish work. Those early 
                experiences sparked my passion for exceptional design and quality craftsmanship. Add 10 years of competitive 
                equestrian training to the mix, and you'll understand my relentless drive for excellence and attention to detail. 
                My UNC Charlotte finance degree gives me the analytical edge to navigate complex transactions, while my 
                appreciation for good design helps every property showcase its best features.
              </p>
            </div>
            
            {/* Expertise Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-5">
                    <Home className="h-7 w-7 text-black mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-semibold text-gray-900 mb-2 text-base">In-Town Specialist</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Expert in Uptown, SouthEnd, Dilworth & Myers Park</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-5">
                    <Users className="h-7 w-7 text-black mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-semibold text-gray-900 mb-2 text-base">Professional Focus</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Understanding discerning buyers' lifestyle needs</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-5">
                    <Mountain className="h-7 w-7 text-black mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-semibold text-gray-900 mb-2 text-base">City Lifestyle</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Best restaurants, bars, and entertainment venues</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-5">
                    <Handshake className="h-7 w-7 text-black mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-semibold text-gray-900 mb-2 text-base">Luxury Specialist</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">Curating exceptional properties</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          {/* Image and Personal Details */}
          <div className="space-y-4">
            <div className="rounded-xl shadow-lg overflow-hidden">
              <img 
                src="/assets/mackenzie-headshot.jpg" 
                alt="Mackenzie Siek headshot" 
                className="w-full h-auto"
              />
            </div>
            
            {/* Personal Details Section - Improved Typography */}
            <div className="bg-gradient-to-r from-gray-900 to-black rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-6 text-center">Get to Know Mackenzie</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg transition-shadow duration-300">
                    <Utensils className="w-5 h-5 text-black" />
                  </div>
                  <h4 className="font-semibold mb-2 text-sm">Favorite Restaurant</h4>
                  <p className="text-gray-300 text-sm">300 East</p>
                </div>
                
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg transition-shadow duration-300">
                    <Coffee className="w-5 h-5 text-black" />
                  </div>
                  <h4 className="font-semibold mb-2 text-sm">Weekend Vibes</h4>
                  <p className="text-gray-300 text-sm">Farmers markets & rail trail</p>
                </div>
                
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg transition-shadow duration-300">
                    <Mountain className="w-5 h-5 text-black" />
                  </div>
                  <h4 className="font-semibold mb-2 text-sm">Hobbies</h4>
                  <p className="text-gray-300 text-sm">Interior design & travel</p>
                </div>
                
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg transition-shadow duration-300">
                    <Users className="w-5 h-5 text-black" />
                  </div>
                  <h4 className="font-semibold mb-2 text-sm">Fun Fact</h4>
                  <p className="text-gray-300 text-sm">Competitive equestrian</p>
                </div>
                
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg transition-shadow duration-300">
                    <Home className="w-5 h-5 text-black" />
                  </div>
                  <h4 className="font-semibold mb-2 text-sm">Why Real Estate?</h4>
                  <p className="text-gray-300 text-sm">Builder dad inspiration</p>
                </div>
                
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg transition-shadow duration-300">
                    <Handshake className="w-5 h-5 text-black" />
                  </div>
                  <h4 className="font-semibold mb-2 text-sm">Education</h4>
                  <p className="text-gray-300 text-sm">UNC Charlotte Finance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
