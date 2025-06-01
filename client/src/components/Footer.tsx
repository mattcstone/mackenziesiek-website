import { Facebook, Instagram, Linkedin } from "lucide-react";
import type { Agent } from "@shared/schema";

interface FooterProps {
  agent: Agent;
}

export default function Footer({ agent }: FooterProps) {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 pb-8">
          <div>
            <div className="text-xl font-bold mb-4">{agent.firstName} {agent.lastName}</div>
            <p className="text-gray-400 mb-4">
              Your trusted Charlotte real estate expert, powered by Stone Realty Group.
            </p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-white transition-colors">About Me</a></li>
              <li><a href="#neighborhoods" className="hover:text-white transition-colors">My Areas</a></li>
              <li><a href="#search" className="hover:text-white transition-colors">Search Homes</a></li>
              <li><a href="#guides" className="hover:text-white transition-colors">Local Guides</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Buyer Representation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Seller Representation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Home Valuation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Investment Properties</a></li>
            </ul>
          </div>
          

        </div>
      </div>
      
      {/* Legal Disclaimer Section */}
      <div className="bg-gray-50 py-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-16">
            <img src="/assets/stone-logo-black.png" alt="Stone Realty Group" className="h-24 w-auto opacity-80" />
            <img src="/assets/Logo_Black@4x.png" alt="Stone Selling System" className="h-8 w-auto opacity-80" />
          </div>
          <div className="text-center mt-10 text-gray-600 text-sm max-w-5xl mx-auto leading-relaxed">
            <p>
              Equal Housing Opportunity. The 'Stone Selling System,' 'Stone Realty Group,' and the stylized hexagon 'O' logos are Registered Trademarks of Stone Realty Group. All Rights Reserved. © Copyright 2024 | <a href="#" className="text-gray-800 hover:underline font-medium">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
