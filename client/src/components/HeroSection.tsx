import { Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Agent } from "@shared/schema";

interface HeroSectionProps {
  agent: Agent;
}

export default function HeroSection({ agent }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-black to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center bg-white/10 rounded-full px-4 py-2 text-sm">
              <Star className="text-yellow-400 mr-2 h-4 w-4" />
              <span>5-Star Agent in Charlotte</span>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Your Guide to
              <span className="text-gray-300"> In-Town Charlotte</span>
            </h1>
            
            <p className="text-xl text-gray-200 leading-relaxed">
              {agent.bio}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100">
                <a href="#contact">Let's Find Your Home</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                <a href="#search">Search Properties</a>
              </Button>
            </div>
            
            <div className="flex items-center space-x-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{agent.homesSold}+</div>
                <div className="text-sm text-gray-300">Homes Sold</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{agent.avgDaysOnMarket}</div>
                <div className="text-sm text-gray-300">Avg Days on Market</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{agent.rating}★</div>
                <div className="text-sm text-gray-300">Client Rating</div>
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
              
              {agent.welcomeVideo && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Button 
                    size="lg"
                    className="bg-white/90 hover:bg-white text-stone-blue w-16 h-16 rounded-full p-0"
                    onClick={() => {
                      // TODO: Implement video player modal
                      console.log("Play welcome video:", agent.welcomeVideo);
                    }}
                  >
                    <Play className="h-6 w-6 ml-1" />
                  </Button>
                </div>
              )}
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-3">
                <img src="/assets/stone-logo.svg" alt="Stone Realty Group" className="w-8 h-8" />
                <div>
                  <div className="text-sm font-semibold text-gray-900">Stone Realty Group</div>
                  <div className="text-xs text-gray-500">Licensed in NC</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
