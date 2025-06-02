import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  agentName?: string;
}

export default function Header({ agentName = "Mackenzie Siek" }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      
      // Only trigger if scroll delta is significant (reduces sensitivity)
      if (scrollDelta < 10) return;
      
      if (currentScrollY < lastScrollY) {
        // Scrolling up
        setIsVisible(true);
      } else if (currentScrollY > 150 && currentScrollY > lastScrollY) {
        // Scrolling down and past 150px (increased threshold)
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header 
      className={`bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50 transition-transform duration-500 ease-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-7 lg:px-10">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <img src="/attached_assets/rectlogo.png" alt="Stone Realty Group Logo" className="h-10 w-auto" />
            </div>
            <div className="hidden md:block h-8 w-px bg-gray-300"></div>
            <Link 
              href="/" 
              className="text-2xl lg:text-3xl font-light text-gray-900 hover:text-gray-700 transition-colors tracking-wide"
              onClick={() => {
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 100);
              }}
            >
              {agentName}
            </Link>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-10">
            {/* Main Menu Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsServicesDropdownOpen(true)}
              onMouseLeave={() => setIsServicesDropdownOpen(false)}
            >
              <button className="text-gray-600 hover:text-black transition-colors text-sm font-medium tracking-wide uppercase py-3 px-2 flex items-center">
                Menu
                <ChevronDown className="ml-1 h-3 w-3" />
              </button>
              
              {isServicesDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white shadow-lg border border-gray-200 rounded-sm z-50">
                  <a href="#search" className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-50 hover:text-black transition-colors">
                    Search
                  </a>
                  <Link href="/sell" className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-50 hover:text-black transition-colors">
                    Sell
                  </Link>
                  <a href="#neighborhoods" className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-50 hover:text-black transition-colors">
                    Areas
                  </a>
                  <a href="#about" className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-50 hover:text-black transition-colors">
                    About
                  </a>
                  <Link href="/reviews" className="block px-4 py-3 text-base text-gray-700 hover:bg-gray-50 hover:text-black transition-colors">
                    Reviews
                  </Link>
                </div>
              )}
            </div>
            
            <a href="#contact" className="bg-black text-white px-6 py-3 rounded-none hover:bg-gray-800 transition-colors text-sm font-medium tracking-wide uppercase min-h-[44px] flex items-center">
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
              <a href="#search" className="block px-4 py-4 text-gray-600 hover:text-black transition-colors text-base font-medium tracking-wide uppercase min-h-[44px] flex items-center rounded">
                Search
              </a>
              <Link href="/sell" className="block px-4 py-4 text-gray-600 hover:text-black transition-colors text-base font-medium tracking-wide uppercase min-h-[44px] flex items-center rounded">
                Sell
              </Link>
              <a href="#neighborhoods" className="block px-4 py-4 text-gray-600 hover:text-black transition-colors text-base font-medium tracking-wide uppercase min-h-[44px] flex items-center rounded">
                Areas
              </a>
              <a href="#about" className="block px-4 py-4 text-gray-600 hover:text-black transition-colors text-base font-medium tracking-wide uppercase min-h-[44px] flex items-center rounded">
                About
              </a>
              <Link href="/reviews" className="block px-4 py-4 text-gray-600 hover:text-black transition-colors text-base font-medium tracking-wide uppercase min-h-[44px] flex items-center rounded">
                Reviews
              </Link>
              <a href="#contact" className="block px-4 py-4 bg-black text-white text-center mx-3 hover:bg-gray-800 transition-colors text-base font-medium tracking-wide uppercase min-h-[44px] flex items-center justify-center rounded">
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
