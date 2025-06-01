import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  agentName?: string;
}

export default function Header({ agentName = "Sarah Johnson" }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-0">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <img src="/assets/stone-logo-black.png" alt="Stone Realty Group Logo" className="h-32 w-auto" />
            </div>
            <div className="hidden md:block h-8 w-px bg-gray-300"></div>
            <Link href="/" className="text-2xl lg:text-3xl font-light text-gray-900 hover:text-gray-700 transition-colors tracking-wide">
              {agentName}
            </Link>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-10">
            <a href="#about" className="text-gray-600 hover:text-black transition-colors text-sm font-medium tracking-wide uppercase">
              About
            </a>
            <a href="#neighborhoods" className="text-gray-600 hover:text-black transition-colors text-sm font-medium tracking-wide uppercase">
              Areas
            </a>
            <a href="#search" className="text-gray-600 hover:text-black transition-colors text-sm font-medium tracking-wide uppercase">
              Search
            </a>
            <Link href="/sell" className="text-gray-600 hover:text-black transition-colors text-sm font-medium tracking-wide uppercase">
              Sell
            </Link>
            <a href="#contact" className="bg-black text-white px-6 py-3 rounded-none hover:bg-gray-800 transition-colors text-sm font-medium tracking-wide uppercase">
              Contact
            </a>
          </nav>
          
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-6 pt-4 pb-6 space-y-2 bg-white border-t border-gray-200">
              <a href="#about" className="block px-3 py-3 text-gray-600 hover:text-black transition-colors text-sm font-medium tracking-wide uppercase">
                About
              </a>
              <a href="#neighborhoods" className="block px-3 py-3 text-gray-600 hover:text-black transition-colors text-sm font-medium tracking-wide uppercase">
                Areas
              </a>
              <a href="#search" className="block px-3 py-3 text-gray-600 hover:text-black transition-colors text-sm font-medium tracking-wide uppercase">
                Search
              </a>
              <Link href="/sell" className="block px-3 py-3 text-gray-600 hover:text-black transition-colors text-sm font-medium tracking-wide uppercase">
                Sell
              </Link>
              <a href="#contact" className="block px-3 py-3 bg-black text-white text-center mx-3 hover:bg-gray-800 transition-colors text-sm font-medium tracking-wide uppercase">
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
