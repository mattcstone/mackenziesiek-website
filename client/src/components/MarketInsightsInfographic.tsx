import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import NeighborhoodModal from './NeighborhoodModal';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import { 
  Home, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Clock, 
  Users, 
  MapPin, 
  Building,
  Calendar,
  Target,
  Award,
  Zap,
  Search,
  Filter,
  Car,
  ShoppingBag,
  TreePine,
  Info,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';

interface MarketMetric {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ElementType;
  description: string;
}

const marketMetrics: MarketMetric[] = [
  {
    title: 'Median Home Price',
    value: '$425,000',
    change: '+8.2%',
    trend: 'up',
    icon: DollarSign,
    description: 'Charlotte metro area'
  },
  {
    title: 'Days on Market',
    value: '18 days',
    change: '-12%',
    trend: 'down',
    icon: Clock,
    description: 'Average time to sell'
  },
  {
    title: 'Active Listings',
    value: '2,850',
    change: '+5.1%',
    trend: 'up',
    icon: Home,
    description: 'Available properties'
  },
  {
    title: 'Homes Sold',
    value: '1,290',
    change: '+15.3%',
    trend: 'up',
    icon: Target,
    description: 'Last 30 days'
  }
];

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

const allNeighborhoodData: NeighborhoodData[] = [
  { 
    name: 'South Charlotte', 
    zipCode: '28277', 
    price: 485000, 
    sales: 285, 
    growth: 12.5, 
    daysOnMarket: 18,
    walkScore: 72,
    priceRange: '300K-500K',
    type: 'Suburban',
    amenities: ['Shopping Centers', 'Golf Courses', 'Parks']
  },
  { 
    name: 'Lake Norman', 
    zipCode: '28117', 
    price: 520000, 
    sales: 165, 
    growth: 15.2, 
    daysOnMarket: 22,
    walkScore: 45,
    priceRange: '500K-750K',
    type: 'Luxury',
    amenities: ['Waterfront', 'Boating', 'Private Communities', 'Country Clubs']
  },
  { 
    name: 'Uptown', 
    zipCode: '28202', 
    price: 395000, 
    sales: 95, 
    growth: 8.7, 
    daysOnMarket: 12,
    walkScore: 95,
    priceRange: '300K-500K',
    type: 'Urban',
    amenities: ['Walkable', 'Nightlife', 'Restaurants', 'Transit Access']
  },
  { 
    name: 'NoDa', 
    zipCode: '28205', 
    price: 285000, 
    sales: 145, 
    growth: 18.9, 
    daysOnMarket: 8,
    walkScore: 88,
    priceRange: 'Under 300K',
    type: 'Historic',
    amenities: ['Arts District', 'Breweries', 'Music Venues', 'Historic Charm']
  },
  { 
    name: 'Ballantyne', 
    zipCode: '28277', 
    price: 465000, 
    sales: 125, 
    growth: 10.3, 
    daysOnMarket: 16,
    walkScore: 58,
    priceRange: '300K-500K',
    type: 'Suburban',
    amenities: ['Corporate Hub', 'Shopping', 'Dining']
  },
  { 
    name: 'Myers Park', 
    zipCode: '28207', 
    price: 875000, 
    sales: 78, 
    growth: 9.8, 
    daysOnMarket: 28,
    walkScore: 62,
    priceRange: 'Over 750K',
    type: 'Luxury',
    amenities: ['Historic Homes', 'Tree-lined Streets', 'Country Club']
  },
  { 
    name: 'Dilworth', 
    zipCode: '28203', 
    price: 525000, 
    sales: 112, 
    growth: 14.2, 
    daysOnMarket: 15,
    walkScore: 78,
    priceRange: '500K-750K',
    type: 'Historic',
    amenities: ['Walkable', 'Historic District', 'Local Shops', 'Community Feel']
  },
  { 
    name: 'Plaza Midwood', 
    zipCode: '28205', 
    price: 315000, 
    sales: 198, 
    growth: 22.1, 
    daysOnMarket: 9,
    walkScore: 85,
    priceRange: 'Under 300K',
    type: 'Historic',
    amenities: ['Trendy', 'Food Scene', 'Vintage Shops', 'Entertainment']
  },
  { 
    name: 'Cornelius', 
    zipCode: '28031', 
    price: 445000, 
    sales: 89, 
    growth: 11.7, 
    daysOnMarket: 20,
    walkScore: 42,
    priceRange: '300K-500K',
    type: 'Suburban',
    amenities: ['Lake Access', 'New Developments']
  },
  { 
    name: 'Huntersville', 
    zipCode: '28078', 
    price: 398000, 
    sales: 156, 
    growth: 13.4, 
    daysOnMarket: 17,
    walkScore: 48,
    priceRange: '300K-500K',
    type: 'Suburban',
    amenities: ['Shopping', 'NASCAR Hall of Fame Area', 'Growth Area']
  }
];

const buyerDemographics = [
  { name: 'Corporate Relocations', value: 35, color: '#2563eb' },
  { name: 'Local Buyers', value: 28, color: '#3b82f6' },
  { name: 'First-Time Buyers', value: 22, color: '#60a5fa' },
  { name: 'Investors', value: 15, color: '#93c5fd' }
];

const monthlyTrends = [
  { month: 'Jun 2023', price: 365000, volume: 1150, inventory: 2850, daysOnMarket: 32, pricePerSqFt: 185, newListings: 1890 },
  { month: 'Jul 2023', price: 368000, volume: 1200, inventory: 2780, daysOnMarket: 30, pricePerSqFt: 187, newListings: 1950 },
  { month: 'Aug 2023', price: 372000, volume: 1180, inventory: 2720, daysOnMarket: 28, pricePerSqFt: 189, newListings: 1820 },
  { month: 'Sep 2023', price: 375000, volume: 1250, inventory: 2650, daysOnMarket: 26, pricePerSqFt: 191, newListings: 1980 },
  { month: 'Oct 2023', price: 378000, volume: 1320, inventory: 2580, daysOnMarket: 25, pricePerSqFt: 193, newListings: 2050 },
  { month: 'Nov 2023', price: 381000, volume: 1100, inventory: 2620, daysOnMarket: 28, pricePerSqFt: 194, newListings: 1650 },
  { month: 'Dec 2023', price: 384000, volume: 980, inventory: 2680, daysOnMarket: 35, pricePerSqFt: 196, newListings: 1420 },
  { month: 'Jan 2024', price: 387000, volume: 1050, inventory: 2720, daysOnMarket: 38, pricePerSqFt: 197, newListings: 1580 },
  { month: 'Feb 2024', price: 390000, volume: 1120, inventory: 2690, daysOnMarket: 35, pricePerSqFt: 199, newListings: 1680 },
  { month: 'Mar 2024', price: 394000, volume: 1280, inventory: 2620, daysOnMarket: 30, pricePerSqFt: 201, newListings: 1850 },
  { month: 'Apr 2024', price: 398000, volume: 1350, inventory: 2550, daysOnMarket: 28, pricePerSqFt: 203, newListings: 1920 },
  { month: 'May 2024', price: 402000, volume: 1420, inventory: 2480, daysOnMarket: 25, pricePerSqFt: 205, newListings: 2080 },
  { month: 'Jun 2024', price: 405000, volume: 1380, inventory: 2450, daysOnMarket: 24, pricePerSqFt: 207, newListings: 1980 },
  { month: 'Jul 2024', price: 408000, volume: 1450, inventory: 2400, daysOnMarket: 22, pricePerSqFt: 209, newListings: 2120 },
  { month: 'Aug 2024', price: 411000, volume: 1400, inventory: 2380, daysOnMarket: 21, pricePerSqFt: 211, newListings: 2050 },
  { month: 'Sep 2024', price: 414000, volume: 1380, inventory: 2350, daysOnMarket: 20, pricePerSqFt: 213, newListings: 2000 },
  { month: 'Oct 2024', price: 417000, volume: 1420, inventory: 2320, daysOnMarket: 19, pricePerSqFt: 215, newListings: 2100 },
  { month: 'Nov 2024', price: 420000, volume: 1350, inventory: 2340, daysOnMarket: 22, pricePerSqFt: 217, newListings: 1850 },
  { month: 'Dec 2024', price: 422000, volume: 1180, inventory: 2380, daysOnMarket: 28, pricePerSqFt: 218, newListings: 1650 },
  { month: 'Jan 2025', price: 425000, volume: 1240, inventory: 2410, daysOnMarket: 32, pricePerSqFt: 220, newListings: 1780 },
  { month: 'Feb 2025', price: 428000, volume: 1300, inventory: 2390, daysOnMarket: 30, pricePerSqFt: 222, newListings: 1880 },
  { month: 'Mar 2025', price: 431000, volume: 1380, inventory: 2350, daysOnMarket: 26, pricePerSqFt: 224, newListings: 1950 },
  { month: 'Apr 2025', price: 434000, volume: 1420, inventory: 2320, daysOnMarket: 24, pricePerSqFt: 226, newListings: 2020 },
  { month: 'May 2025', price: 437000, volume: 1450, inventory: 2290, daysOnMarket: 22, pricePerSqFt: 228, newListings: 2100 }
];

export default function MarketInsightsInfographic() {
  const [selectedView, setSelectedView] = useState<'overview' | 'neighborhoods' | 'trends'>('overview');
  const [selectedMetric, setSelectedMetric] = useState<'price' | 'volume' | 'inventory' | 'daysOnMarket' | 'pricePerSqFt' | 'newListings'>('price');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<NeighborhoodData | null>(null);
  const filteredNeighborhoods = useMemo(() => {
    return allNeighborhoodData.filter(neighborhood => {
      const matchesSearch = neighborhood.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           neighborhood.zipCode.includes(searchTerm);
      const matchesPrice = priceFilter === 'all' || neighborhood.priceRange === priceFilter;
      const matchesType = typeFilter === 'all' || neighborhood.type === typeFilter;
      
      return matchesSearch && matchesPrice && matchesType;
    });
  }, [searchTerm, priceFilter, typeFilter]);

  const StatCard = ({ metric, index }: { metric: MarketMetric; index: number }) => {
    const IconComponent = metric.icon;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.02, y: -2 }}
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Card className="relative overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg ${
                        metric.trend === 'up' ? 'bg-green-100' : 
                        metric.trend === 'down' ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <IconComponent className={`h-4 w-4 ${
                          metric.trend === 'up' ? 'text-green-600' : 
                          metric.trend === 'down' ? 'text-blue-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <Badge 
                        variant={metric.trend === 'up' ? 'default' : 'secondary'}
                        className="flex items-center gap-1"
                      >
                        {metric.trend === 'up' ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : metric.trend === 'down' ? (
                          <TrendingDown className="w-3 h-3" />
                        ) : null}
                        {metric.change}
                      </Badge>
                    </div>
                    <Info className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
                    <p className="text-sm font-medium text-gray-700">{metric.title}</p>
                    <p className="text-xs text-gray-500">{metric.description}</p>
                  </div>
                </CardContent>
              </Card>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs bg-slate-900 text-white p-3 rounded-lg shadow-lg">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <p className="font-semibold mb-1 text-sm">{metric.title} Insights</p>
                <p className="text-xs mb-2">{metric.description}</p>
                <div className="border-t border-gray-600 pt-2">
                  <p className="text-xs opacity-90">
                    {metric.trend === 'up' ? '📈 Positive market indicator showing growth momentum' : 
                     metric.trend === 'down' ? '📉 Market adjustment - monitor for opportunities' :
                     '📊 Stable market conditions with steady performance'}
                  </p>
                </div>
              </motion.div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>
    );
  };

  const NeighborhoodDetailModal = ({ neighborhood }: { neighborhood: NeighborhoodData }) => (
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
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Charlotte Market Insights</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Real-time data and trends shaping Charlotte's dynamic real estate landscape
        </p>
        
        {/* View Toggle */}
        <div className="flex justify-center gap-2">
          {['overview', 'neighborhoods', 'trends'].map((view) => (
            <Button
              key={view}
              variant={selectedView === view ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedView(view as any)}
              className="capitalize"
            >
              {view}
            </Button>
          ))}
        </div>
      </div>

      {/* Overview View */}
      {selectedView === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketMetrics.map((metric, index) => (
              <StatCard key={metric.title} metric={metric} index={index} />
            ))}
          </div>

          {/* Market Composition */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Buyer Demographics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={buyerDemographics}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          dataKey="value"
                        >
                          {buyerDemographics.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2">
                    {buyerDemographics.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span>{item.name}</span>
                        </div>
                        <span className="font-medium">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  Market Highlights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Zap className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-900">Seller's Market</p>
                      <p className="text-sm text-green-700">High demand, limited inventory</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Building className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900">Corporate Growth</p>
                      <p className="text-sm text-blue-700">Major companies expanding to Charlotte</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-purple-900">Infrastructure Investment</p>
                      <p className="text-sm text-purple-700">Light rail expansion driving growth</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Neighborhoods View */}
      {selectedView === 'neighborhoods' && (
        <div className="space-y-6">
          {/* Search and Filter Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-blue-600" />
                Search & Filter Neighborhoods
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name or zip code..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="Under 300K">Under $300K</SelectItem>
                    <SelectItem value="300K-500K">$300K - $500K</SelectItem>
                    <SelectItem value="500K-750K">$500K - $750K</SelectItem>
                    <SelectItem value="Over 750K">Over $750K</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Neighborhood Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Urban">Urban</SelectItem>
                    <SelectItem value="Suburban">Suburban</SelectItem>
                    <SelectItem value="Luxury">Luxury</SelectItem>
                    <SelectItem value="Historic">Historic</SelectItem>
                  </SelectContent>
                </Select>
                

              </div>
            </CardContent>
          </Card>

          {/* Neighborhood Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNeighborhoods.map((neighborhood, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:border-blue-200 border-2"
                          onClick={() => setSelectedNeighborhood(neighborhood)}>
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{neighborhood.name}</CardTitle>
                              <p className="text-sm text-gray-600">Zip Code: {neighborhood.zipCode}</p>
                            </div>
                            <Badge variant="outline">
                              {neighborhood.type}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-2xl font-bold text-blue-600">
                                ${(neighborhood.price / 1000).toFixed(0)}K
                              </p>
                              <p className="text-xs text-gray-500">Median Price</p>
                            </div>
                            <div>
                              <p className="text-lg font-semibold">
                                {neighborhood.daysOnMarket}d
                              </p>
                              <p className="text-xs text-gray-500">Days on Market</p>
                            </div>
                          </div>
                    
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium">{neighborhood.type}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Car className="h-4 w-4 text-green-600" />
                              <span className="text-sm">Walk Score: {neighborhood.walkScore}</span>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Key Amenities:</p>
                            <div className="flex flex-wrap gap-1">
                              {neighborhood.amenities.map((amenity, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-2 border-t">
                            <span className="text-sm text-gray-600">{neighborhood.sales} sales</span>
                            <Badge className="text-green-700">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              +{neighborhood.growth}%
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-sm bg-slate-900 text-white p-3 rounded-lg shadow-lg">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="font-semibold mb-1 text-sm">{neighborhood.name} Market Data</p>
                        <div className="text-xs space-y-1">
                          <p>💰 Median Price: ${(neighborhood.price / 1000).toFixed(0)}K</p>
                          <p>⏰ Avg Days on Market: {neighborhood.daysOnMarket} days</p>
                          <p>📈 Growth Rate: +{neighborhood.growth}% YoY</p>
                          <p>🚶 Walkability Score: {neighborhood.walkScore}/100</p>
                        </div>
                        <div className="border-t border-gray-600 pt-2 mt-2">
                          <p className="text-xs opacity-90">
                            {neighborhood.type} neighborhood in zip code {neighborhood.zipCode}
                          </p>
                        </div>
                      </motion.div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            ))}
          </div>
          
          {filteredNeighborhoods.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-500">No neighborhoods match your current filters.</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setPriceFilter('all');
                    setTypeFilter('all');
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Trends View */}
      {selectedView === 'trends' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                24-Month Market Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Metric Selection */}
              <div className="flex flex-wrap gap-2 mb-6">
                <Button
                  variant={selectedMetric === 'price' ? 'default' : 'outline'}
                  onClick={() => setSelectedMetric('price')}
                  size="sm"
                >
                  <DollarSign className="w-4 h-4 mr-1" />
                  Median Price
                </Button>
                <Button
                  variant={selectedMetric === 'volume' ? 'default' : 'outline'}
                  onClick={() => setSelectedMetric('volume')}
                  size="sm"
                >
                  <Home className="w-4 h-4 mr-1" />
                  Sales Volume
                </Button>
                <Button
                  variant={selectedMetric === 'inventory' ? 'default' : 'outline'}
                  onClick={() => setSelectedMetric('inventory')}
                  size="sm"
                >
                  <Building className="w-4 h-4 mr-1" />
                  Inventory
                </Button>
                <Button
                  variant={selectedMetric === 'daysOnMarket' ? 'default' : 'outline'}
                  onClick={() => setSelectedMetric('daysOnMarket')}
                  size="sm"
                >
                  <Clock className="w-4 h-4 mr-1" />
                  Days on Market
                </Button>
                <Button
                  variant={selectedMetric === 'pricePerSqFt' ? 'default' : 'outline'}
                  onClick={() => setSelectedMetric('pricePerSqFt')}
                  size="sm"
                >
                  <Target className="w-4 h-4 mr-1" />
                  Price/Sq Ft
                </Button>
                <Button
                  variant={selectedMetric === 'newListings' ? 'default' : 'outline'}
                  onClick={() => setSelectedMetric('newListings')}
                  size="sm"
                >
                  <Zap className="w-4 h-4 mr-1" />
                  New Listings
                </Button>
              </div>

              {/* Main Chart */}
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyTrends}>
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis 
                      tickFormatter={(value) => {
                        if (selectedMetric === 'price') return `$${(value / 1000).toFixed(0)}K`;
                        if (selectedMetric === 'pricePerSqFt') return `$${value}`;
                        if (selectedMetric === 'inventory') return `${(value / 1000).toFixed(1)}K`;
                        return value.toLocaleString();
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey={selectedMetric}
                      stroke="#2563eb"
                      strokeWidth={3}
                      fill="url(#colorGradient)"
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Market Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Current Inventory</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {monthlyTrends[monthlyTrends.length - 1].inventory.toLocaleString()}
                    </p>
                  </div>
                  <Building className="h-8 w-8 text-blue-600" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Available homes</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg Days on Market</p>
                    <p className="text-2xl font-bold text-green-600">
                      {monthlyTrends[monthlyTrends.length - 1].daysOnMarket}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Current month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Price per Sq Ft</p>
                    <p className="text-2xl font-bold text-purple-600">
                      ${monthlyTrends[monthlyTrends.length - 1].pricePerSqFt}
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Current average</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">New Listings</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {monthlyTrends[monthlyTrends.length - 1].newListings.toLocaleString()}
                    </p>
                  </div>
                  <Zap className="h-8 w-8 text-orange-600" />
                </div>
                <p className="text-xs text-gray-500 mt-1">This month</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analytics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-blue-600" />
                Market Performance Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Inventory vs Sales Chart */}
                <div>
                  <h4 className="font-semibold mb-3">Inventory vs Sales Volume (Last 12 Months)</h4>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyTrends.slice(-12)}>
                        <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                        <YAxis yAxisId="left" tickFormatter={(value) => `${(value / 1000).toFixed(1)}K`} />
                        <YAxis yAxisId="right" orientation="right" />
                        <Line yAxisId="left" type="monotone" dataKey="inventory" stroke="#ef4444" strokeWidth={2} name="Inventory" />
                        <Line yAxisId="right" type="monotone" dataKey="volume" stroke="#10b981" strokeWidth={2} name="Sales" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* New Listings vs Closed Sales */}
                <div>
                  <h4 className="font-semibold mb-3">Market Activity (Last 12 Months)</h4>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyTrends.slice(-12)}>
                        <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                        <YAxis />
                        <Bar dataKey="newListings" fill="#3b82f6" name="New Listings" />
                        <Bar dataKey="volume" fill="#f59e0b" name="Closed Sales" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Key Insights */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-3">Market Insights</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-blue-800">
                      <span className="font-medium">Inventory Trend:</span> 
                      {monthlyTrends[monthlyTrends.length - 1].inventory < monthlyTrends[monthlyTrends.length - 12].inventory 
                        ? " Decreasing inventory indicates seller's market conditions"
                        : " Increasing inventory suggests more buyer options"
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-800">
                      <span className="font-medium">Price Appreciation:</span> 
                      {((monthlyTrends[monthlyTrends.length - 1].price / monthlyTrends[0].price - 1) * 100).toFixed(1)}% 
                      over 24 months
                    </p>
                  </div>
                  <div>
                    <p className="text-blue-800">
                      <span className="font-medium">Market Velocity:</span> 
                      {monthlyTrends[monthlyTrends.length - 1].daysOnMarket < monthlyTrends[0].daysOnMarket 
                        ? " Homes selling faster than 2 years ago"
                        : " Homes taking longer to sell"
                      }
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}


    </div>
  );
}