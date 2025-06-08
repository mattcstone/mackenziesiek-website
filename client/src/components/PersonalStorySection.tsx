import { Home, Users, Mountain, Handshake, MapPin, Coffee, Utensils, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Agent } from "@shared/schema";

interface PersonalStorySectionProps {
  agent: Agent;
}

export default function PersonalStorySection({ agent }: PersonalStorySectionProps) {
  return (
    <section id="about" className="py-12 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight hover:text-black transition-colors duration-300">
                Your In-Town Charlotte Expert
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Born and raised in Charlotte, real estate flows through my veins! Growing up, I spent countless weekends 
                exploring model homes with my builder father, absorbing everything from foundation to finish work. Those early 
                experiences sparked my passion for exceptional design and quality craftsmanship. Add 10 years of competitive 
                equestrian training to the mix, and you'll understand my relentless drive for excellence and attention to detail. 
                My UNC Charlotte finance degree gives me the analytical edge to navigate complex transactions, while my 
                appreciation for good design helps every property showcase its best features. When I'm not helping clients achieve their real estate dreams, you'll 
                catch me discovering treasures at local farmers markets, conquering hiking trails, or planning my next 
                international adventure — I'm passionate about exploring new cultures and bringing that global perspective 
                to Charlotte's diverse real estate market!
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <Home className="h-8 w-8 text-black mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-semibold text-gray-900 mb-2">In-Town Specialist</h3>
                    <p className="text-gray-600 text-sm">Expert in Uptown, SouthEnd, Dilworth & Myers Park</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <Users className="h-8 w-8 text-black mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-semibold text-gray-900 mb-2">Professional Focus</h3>
                    <p className="text-gray-600 text-sm">Understanding discerning buyers' lifestyle needs</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <Mountain className="h-8 w-8 text-black mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-semibold text-gray-900 mb-2">City Lifestyle</h3>
                    <p className="text-gray-600 text-sm">Best restaurants, bars, and entertainment venues</p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="group cursor-pointer transform hover:scale-105 transition-all duration-300">
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <Handshake className="h-8 w-8 text-black mb-3 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="font-semibold text-gray-900 mb-2">Luxury Specialist</h3>
                    <p className="text-gray-600 text-sm">Curating exceptional properties</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Personal Details Section - Compact with animations */}
            <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6 text-center">Get to Know Mackenzie</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg transition-shadow duration-300">
                    <Utensils className="w-6 h-6 text-black" />
                  </div>
                  <h4 className="font-semibold mb-1">Favorite Restaurant</h4>
                  <p className="text-gray-300 text-sm">300 East</p>
                </div>
                
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg transition-shadow duration-300">
                    <Coffee className="w-6 h-6 text-black" />
                  </div>
                  <h4 className="font-semibold mb-1">Weekend Vibes</h4>
                  <p className="text-gray-300 text-sm">Farmers markets & rail trail</p>
                </div>
                
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg transition-shadow duration-300">
                    <Mountain className="w-6 h-6 text-black" />
                  </div>
                  <h4 className="font-semibold mb-1">Hobbies</h4>
                  <p className="text-gray-300 text-sm">Interior design & travel</p>
                </div>
                
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg transition-shadow duration-300">
                    <Users className="w-6 h-6 text-black" />
                  </div>
                  <h4 className="font-semibold mb-1">Fun Fact</h4>
                  <p className="text-gray-300 text-sm">Competitive equestrian</p>
                </div>
                
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg transition-shadow duration-300">
                    <Home className="w-6 h-6 text-black" />
                  </div>
                  <h4 className="font-semibold mb-1">Why Real Estate?</h4>
                  <p className="text-gray-300 text-sm">Builder dad inspiration</p>
                </div>
                
                <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 group-hover:shadow-lg transition-shadow duration-300">
                    <Handshake className="w-6 h-6 text-black" />
                  </div>
                  <h4 className="font-semibold mb-1">Education</h4>
                  <p className="text-gray-300 text-sm">UNC Charlotte Finance</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="rounded-2xl shadow-lg overflow-hidden">
              <img 
                src="/assets/mackenzie-headshot.jpg" 
                alt="Mackenzie Siek headshot" 
                className="w-full h-auto"
              />
            </div>
            

          </div>
        </div>
      </div>
    </section>
  );
}
