import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Home, Clock, DollarSign, BarChart3 } from "lucide-react";

interface MarketData {
  medianPrice: number;
  averageDays: number;
  totalListings: number;
  priceChange: number;
  location: string;
  lastUpdated: string;
}

interface HistoricalData {
  month: string;
  price: number;
  days: number;
}

export default function MarketAnalytics() {
  const [selectedArea, setSelectedArea] = useState("");
  const [customZip, setCustomZip] = useState("");
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const charlotteAreas = [
    { value: "28202", label: "Uptown Charlotte (28202)" },
    { value: "28203", label: "South End (28203)" },
    { value: "28204", label: "Dilworth (28204)" },
    { value: "28205", label: "Plaza Midwood (28205)" },
    { value: "28206", label: "NoDa (28206)" },
    { value: "28207", label: "Myers Park (28207)" },
    { value: "28209", label: "SouthPark (28209)" },
    { value: "28210", label: "Pineville (28210)" },
    { value: "28211", label: "Ballantyne (28211)" },
    { value: "28226", label: "Matthews (28226)" },
    { value: "28277", label: "Waxhaw (28277)" },
    { value: "28031", label: "Huntersville (28031)" },
    { value: "28078", label: "Indian Trail (28078)" },
    { value: "28027", label: "Davidson (28027)" }
  ];

  const fetchMarketData = async (zipCode: string) => {
    if (!zipCode) return;
    
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch('/api/market-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ zipCode })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch market data');
      }

      const data = await response.json();
      setMarketData(data.currentData);
      setHistoricalData(data.historicalData || []);
    } catch (err) {
      setError('Unable to fetch market data. Please try again.');
      console.error('Market data error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAreaSelect = (value: string) => {
    setSelectedArea(value);
    setCustomZip("");
    fetchMarketData(value);
  };

  const handleCustomZipSubmit = () => {
    if (customZip.length === 5) {
      setSelectedArea("");
      fetchMarketData(customZip);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatChange = (change: number) => {
    const isPositive = change >= 0;
    return (
      <span className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
        {isPositive ? '+' : ''}{change.toFixed(1)}%
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Charlotte Market Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Charlotte Area</label>
              <Select value={selectedArea} onValueChange={handleAreaSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a neighborhood" />
                </SelectTrigger>
                <SelectContent>
                  {charlotteAreas.map((area) => (
                    <SelectItem key={area.value} value={area.value}>
                      {area.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Or Enter Custom Zip Code</label>
              <div className="flex space-x-2">
                <Input
                  placeholder="28202"
                  value={customZip}
                  onChange={(e) => setCustomZip(e.target.value)}
                  maxLength={5}
                />
                <Button 
                  onClick={handleCustomZipSubmit}
                  disabled={customZip.length !== 5}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {loading && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Loading market data...</p>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card>
          <CardContent className="p-6">
            <div className="text-red-600 text-center">{error}</div>
          </CardContent>
        </Card>
      )}

      {marketData && !loading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Median Price</p>
                    <p className="text-2xl font-bold">{formatPrice(marketData.medianPrice)}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
                <div className="mt-2">
                  {formatChange(marketData.priceChange)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Days on Market</p>
                    <p className="text-2xl font-bold">{marketData.averageDays}</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-sm text-gray-500 mt-2">Current average</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Listings</p>
                    <p className="text-2xl font-bold">{marketData.totalListings}</p>
                  </div>
                  <Home className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-sm text-gray-500 mt-2">Available homes</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Location</p>
                    <p className="text-lg font-bold">{marketData.location}</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">Updated: {marketData.lastUpdated}</p>
              </CardContent>
            </Card>
          </div>

          {historicalData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>6-Month Price Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {historicalData.map((data, index) => (
                    <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-600">{data.month}</p>
                      <p className="text-lg font-bold">{formatPrice(data.price)}</p>
                      <p className="text-sm text-gray-500">{data.days} days</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}