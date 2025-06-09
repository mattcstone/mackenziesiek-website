import { Play, Star, ArrowRight, Home } from "lucide-react";
import { InteractiveButton } from "@/components/ui/interactive-button";
import type { Agent } from "@shared/schema";

interface HeroSectionProps {
  agent: Agent;
}

export default function HeroSection({ agent }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-black to-gray-800 text-white overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-80 sm:opacity-70"
        >
          <source src="/attached_assets/shutterstock_1072368770_1749376824938.mov" type="video/mp4" />
          {/* Fallback background image if video fails to load */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
            style={{
              backgroundImage: "url('/assets/shutterstock_284834021.jpg')"
            }}
          ></div>
        </video>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-gray-800/40 sm:from-black/50 sm:to-gray-800/50"></div>
      
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
              <span>Top Realtor in Charlotte NC</span>
            </a>
            
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Your Guide to
              <span className="text-gray-300"> In-Town Charlotte Living</span>
            </h1>
            
            <p className="text-xl text-gray-200 leading-relaxed">
              Specializing in Charlotte's most sought-after neighborhoods: SouthEnd condos, NoDa townhomes, Dilworth historic homes, and Fourth Ward luxury properties. Your trusted Charlotte realtor for in-town living.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://mackenzie.mattstoneteam.com/" target="_blank" rel="noopener noreferrer">
                <InteractiveButton 
                  variant="secondary" 
                  animation="scale" 
                  size="lg"
                  className="w-full sm:w-auto group"
                >
                  <Home className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
                  Access Listings
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </InteractiveButton>
              </a>
              <a href="https://mackenzie.mattstoneteam.com/SELLER" target="_blank" rel="noopener noreferrer">
                <InteractiveButton 
                  variant="secondary" 
                  animation="scale" 
                  size="lg"
                  className="w-full sm:w-auto group"
                >
                  <Star className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                  Your Home's Value
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </InteractiveButton>
              </a>
            </div>
            

          </div>
          
          <div className="relative">
            <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/attached_assets/Untitled design.png" 
                alt="Mackenzie Siek - Charlotte Real Estate Agent with luxury home"
                className="w-full h-80 object-cover rounded-lg shadow-2xl"
              />
            </div>
            

          </div>
        </div>
      </div>
    </section>
  );
}
