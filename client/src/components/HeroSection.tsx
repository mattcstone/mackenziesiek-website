import { Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Agent } from "@shared/schema";

interface HeroSectionProps {
  agent: Agent;
}

export default function HeroSection({ agent }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-black to-gray-800 text-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1561041930-9b939d8db9d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-gray-800/70"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <a 
              href="#testimonials" 
              className="inline-flex items-center bg-white/10 rounded-full px-4 py-2 text-sm hover:bg-white/20 transition-colors cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Star className="text-yellow-400 mr-2 h-4 w-4" />
              <span>5-Star Agent in Charlotte</span>
            </a>
            
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Your Guide to
              <span className="text-gray-300"> In-Town Charlotte</span>
            </h1>
            
            <p className="text-xl text-gray-200 leading-relaxed">
              {agent.bio}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100 font-semibold px-10 py-4 rounded-lg shadow-lg">
                <a href="https://mackenzie.mattstoneteam.com/" target="_blank" rel="noopener noreferrer">Access Listings</a>
              </Button>
              <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100 font-semibold px-10 py-4 rounded-lg shadow-lg">
                <a href="https://mackenzie.mattstoneteam.com/SELLER" target="_blank" rel="noopener noreferrer">Your Home's Value</a>
              </Button>
            </div>
            
            <div className="flex items-center space-x-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{agent.homesSold}+</div>
                <div className="text-sm text-gray-300">Homes Sold</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{agent.rating}★</div>
                <div className="text-sm text-gray-300">Client Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4+</div>
                <div className="text-sm text-gray-300">Years Experience</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              {agent.headshot ? (
                <img 
                  src={agent.headshot} 
                  alt={`${agent.firstName} ${agent.lastName} professional headshot`}
                  className="w-full h-80 object-cover"
                />
              ) : (
                <div className="w-full h-80 bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-400">Professional Photo Coming Soon</span>
                </div>
              )}
              
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg">
                <div className="transform rotate-12 bg-white bg-opacity-95 px-8 py-4 rounded-lg shadow-2xl border">
                  <span className="text-gray-800 font-bold text-lg">Video Coming Soon</span>
                </div>
              </div>
            </div>
            

          </div>
        </div>
      </div>
    </section>
  );
}
