import { useState } from "react";
import { Search, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import type { SearchFormData, MarketStats } from "@/lib/types";

export default function PropertySearchSection() {
  const [searchForm, setSearchForm] = useState<SearchFormData>({
    location: "",
    propertyType: "",
    priceRange: "",
    bedrooms: "",
  });

  const marketStats: MarketStats = {
    activeListings: 1247,
    medianPrice: "$425K",
    avgDaysOnMarket: 23,
  };

  const handleSearch = () => {
    // Redirect to Matt Stone Team search tool
    window.open("https://mackenzie.mattstoneteam.com/", "_blank");
  };

  const handleValuation = () => {
    // Redirect to Matt Stone Team seller page
    window.open("https://mackenzie.mattstoneteam.com/SELLER", "_blank");
  };

  return (
    <section id="search" className="py-16 lg:py-24 bg-gradient-to-br from-black to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Find Your Perfect Home
          </h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Discover Charlotte's premier in-town neighborhoods and luxury properties
          </p>
        </div>
        
        <Card>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <Input
                  placeholder="Neighborhood, ZIP, or City"
                  value={searchForm.location}
                  onChange={(e) => setSearchForm({ ...searchForm, location: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
                <Select value={searchForm.propertyType} onValueChange={(value) => setSearchForm({ ...searchForm, propertyType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="single-family">Single Family</SelectItem>
                    <SelectItem value="townhome">Townhome</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <Select value={searchForm.priceRange} onValueChange={(value) => setSearchForm({ ...searchForm, priceRange: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Price</SelectItem>
                    <SelectItem value="under-400k">Under $400K</SelectItem>
                    <SelectItem value="400k-600k">$400K - $600K</SelectItem>
                    <SelectItem value="600k-800k">$600K - $800K</SelectItem>
                    <SelectItem value="800k-plus">$800K+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                <Select value={searchForm.bedrooms} onValueChange={(value) => setSearchForm({ ...searchForm, bedrooms: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1+">1+</SelectItem>
                    <SelectItem value="2+">2+</SelectItem>
                    <SelectItem value="3+">3+</SelectItem>
                    <SelectItem value="4+">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleSearch} className="bg-black text-white hover:bg-gray-800 flex-1">
                <Search className="mr-2 h-4 w-4" />
                Search Properties
              </Button>
              
              <Button onClick={handleValuation} variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                <Calculator className="mr-2 h-4 w-4" />
                Get Home Value
              </Button>
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>Powered by <span className="font-semibold">YLOPO</span> - Real-time MLS data updated every 15 minutes</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{marketStats.activeListings.toLocaleString()}</div>
            <div className="text-blue-200">Active Listings</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{marketStats.medianPrice}</div>
            <div className="text-blue-200">Median Home Price</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{marketStats.avgDaysOnMarket}</div>
            <div className="text-blue-200">Days on Market</div>
          </div>
        </div>
      </div>
    </section>
  );
}
