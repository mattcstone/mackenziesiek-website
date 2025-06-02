import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Car } from 'lucide-react';

interface NeighborhoodData {
  name: string;
  zipCode: string;
  price: number;
  sales: number;
  growth: number;
  daysOnMarket: number;
  walkScore: number;
  priceRange: 'Under 300K' | '300K-500K' | '500K-750K' | 'Over 750K';
  type: 'Urban' | 'Suburban' | 'Luxury' | 'Historic';
  amenities: string[];
}

interface NeighborhoodModalProps {
  neighborhood: NeighborhoodData | null;
  open: boolean;
  onClose: () => void;
}

export default function NeighborhoodModal({ neighborhood, open, onClose }: NeighborhoodModalProps) {
  if (!neighborhood) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-gray-900 mb-2">
            {neighborhood.name}
          </DialogTitle>
          <p className="text-lg text-gray-600">Zip Code: {neighborhood.zipCode} • {neighborhood.type} Neighborhood</p>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          {/* Key Metrics */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-blue-600 mb-2">
                    ${(neighborhood.price / 1000).toFixed(0)}K
                  </p>
                  <p className="text-sm text-gray-600">Median Home Price</p>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-600 mb-2">
                    {neighborhood.daysOnMarket}
                  </p>
                  <p className="text-sm text-gray-600">Days on Market</p>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-purple-600 mb-2">
                    +{neighborhood.growth}%
                  </p>
                  <p className="text-sm text-gray-600">YoY Growth</p>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-orange-600 mb-2">
                    {neighborhood.walkScore}
                  </p>
                  <p className="text-sm text-gray-600">Walk Score</p>
                </div>
              </Card>
            </div>
            
            {/* Market Activity */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Market Activity</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Sales (Last 12 Months)</span>
                  <span className="font-semibold text-lg">{neighborhood.sales}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Price Range</span>
                  <Badge variant="outline" className="text-sm">{neighborhood.priceRange}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Neighborhood Type</span>
                  <Badge className="text-sm">{neighborhood.type}</Badge>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Amenities & Features */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Key Amenities & Features</h3>
              <div className="grid grid-cols-2 gap-3">
                {neighborhood.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-sm font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Walkability Info */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Car className="h-5 w-5 text-green-600" />
                Walkability & Transportation
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Walk Score</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${neighborhood.walkScore}%` }}
                      ></div>
                    </div>
                    <span className="font-semibold">{neighborhood.walkScore}/100</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {neighborhood.walkScore >= 90 ? "Walker's Paradise - daily errands do not require a car" :
                   neighborhood.walkScore >= 70 ? "Very Walkable - most errands can be accomplished on foot" :
                   neighborhood.walkScore >= 50 ? "Somewhat Walkable - some errands can be accomplished on foot" :
                   "Car-Dependent - most errands require a car"}
                </p>
              </div>
            </Card>
            
            {/* Investment Outlook */}
            <Card className="p-6 bg-blue-50">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Investment Outlook
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Growth Trend:</span> 
                  {neighborhood.growth > 15 ? " Strong appreciation with above-market growth" :
                   neighborhood.growth > 10 ? " Solid appreciation with steady growth" :
                   neighborhood.growth > 5 ? " Moderate growth in line with market" :
                   " Conservative growth with stable values"}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Market Velocity:</span> 
                  {neighborhood.daysOnMarket < 15 ? " Fast-moving market with high demand" :
                   neighborhood.daysOnMarket < 25 ? " Balanced market with normal activity" :
                   " Slower market with longer selling times"}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}