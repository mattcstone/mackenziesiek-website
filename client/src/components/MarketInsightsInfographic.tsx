import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  School,
  Car,
  ShoppingBag,
  TreePine
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
  schoolRating: string;
  crimeIndex: 'Low' | 'Medium' | 'High';
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
    schoolRating: 'A+',
    crimeIndex: 'Low',
    priceRange: '300K-500K',
    type: 'Suburban',
    amenities: ['Top Schools', 'Shopping Centers', 'Golf Courses', 'Parks']
  },
  { 
    name: 'Lake Norman', 
    zipCode: '28117', 
    price: 520000, 
    sales: 165, 
    growth: 15.2, 
    daysOnMarket: 22,
    walkScore: 45,
    schoolRating: 'A',
    crimeIndex: 'Low',
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
    schoolRating: 'B+',
    crimeIndex: 'Medium',
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
    schoolRating: 'B',
    crimeIndex: 'Medium',
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
    schoolRating: 'A',
    crimeIndex: 'Low',
    priceRange: '300K-500K',
    type: 'Suburban',
    amenities: ['Corporate Hub', 'Shopping', 'Dining', 'Family Friendly']
  },
  { 
    name: 'Myers Park', 
    zipCode: '28207', 
    price: 875000, 
    sales: 78, 
    growth: 9.8, 
    daysOnMarket: 28,
    walkScore: 62,
    schoolRating: 'A+',
    crimeIndex: 'Low',
    priceRange: 'Over 750K',
    type: 'Luxury',
    amenities: ['Historic Homes', 'Tree-lined Streets', 'Country Club', 'Premium Schools']
  },
  { 
    name: 'Dilworth', 
    zipCode: '28203', 
    price: 525000, 
    sales: 112, 
    growth: 14.2, 
    daysOnMarket: 15,
    walkScore: 78,
    schoolRating: 'A-',
    crimeIndex: 'Low',
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
    schoolRating: 'B+',
    crimeIndex: 'Medium',
    priceRange: 'Under 300K',
    type: 'Historic',
    amenities: ['Trendy', 'Food Scene', 'Vintage Shops', 'Young Professionals']
  },
  { 
    name: 'Cornelius', 
    zipCode: '28031', 
    price: 445000, 
    sales: 89, 
    growth: 11.7, 
    daysOnMarket: 20,
    walkScore: 42,
    schoolRating: 'A-',
    crimeIndex: 'Low',
    priceRange: '300K-500K',
    type: 'Suburban',
    amenities: ['Lake Access', 'Family Oriented', 'New Developments', 'Good Schools']
  },
  { 
    name: 'Huntersville', 
    zipCode: '28078', 
    price: 398000, 
    sales: 156, 
    growth: 13.4, 
    daysOnMarket: 17,
    walkScore: 48,
    schoolRating: 'A',
    crimeIndex: 'Low',
    priceRange: '300K-500K',
    type: 'Suburban',
    amenities: ['Family Communities', 'Shopping', 'NASCAR Hall of Fame Area', 'Growth Area']
  }
];

const buyerDemographics = [
  { name: 'Corporate Relocations', value: 35, color: '#2563eb' },
  { name: 'Local Buyers', value: 28, color: '#3b82f6' },
  { name: 'First-Time Buyers', value: 22, color: '#60a5fa' },
  { name: 'Investors', value: 15, color: '#93c5fd' }
];

const monthlyTrends = [
  { month: 'Jun 2023', price: 365000, volume: 1150 },
  { month: 'Jul 2023', price: 368000, volume: 1200 },
  { month: 'Aug 2023', price: 372000, volume: 1180 },
  { month: 'Sep 2023', price: 375000, volume: 1250 },
  { month: 'Oct 2023', price: 378000, volume: 1320 },
  { month: 'Nov 2023', price: 381000, volume: 1100 },
  { month: 'Dec 2023', price: 384000, volume: 980 },
  { month: 'Jan 2024', price: 387000, volume: 1050 },
  { month: 'Feb 2024', price: 390000, volume: 1120 },
  { month: 'Mar 2024', price: 394000, volume: 1280 },
  { month: 'Apr 2024', price: 398000, volume: 1350 },
  { month: 'May 2024', price: 402000, volume: 1420 },
  { month: 'Jun 2024', price: 405000, volume: 1380 },
  { month: 'Jul 2024', price: 408000, volume: 1450 },
  { month: 'Aug 2024', price: 411000, volume: 1400 },
  { month: 'Sep 2024', price: 414000, volume: 1380 },
  { month: 'Oct 2024', price: 417000, volume: 1420 },
  { month: 'Nov 2024', price: 420000, volume: 1350 },
  { month: 'Dec 2024', price: 422000, volume: 1180 },
  { month: 'Jan 2025', price: 425000, volume: 1240 },
  { month: 'Feb 2025', price: 428000, volume: 1300 },
  { month: 'Mar 2025', price: 431000, volume: 1380 },
  { month: 'Apr 2025', price: 434000, volume: 1420 },
  { month: 'May 2025', price: 437000, volume: 1450 }
];

export default function MarketInsightsInfographic() {
  const [selectedView, setSelectedView] = useState<'overview' | 'neighborhoods' | 'trends'>('overview');
  const [selectedMetric, setSelectedMetric] = useState<'value' | 'homes' | 'days'>('value');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [schoolFilter, setSchoolFilter] = useState<string>('all');

  const filteredNeighborhoods = useMemo(() => {
    return allNeighborhoodData.filter(neighborhood => {
      const matchesSearch = neighborhood.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           neighborhood.zipCode.includes(searchTerm);
      const matchesPrice = priceFilter === 'all' || neighborhood.priceRange === priceFilter;
      const matchesType = typeFilter === 'all' || neighborhood.type === typeFilter;
      const matchesSchool = schoolFilter === 'all' || neighborhood.schoolRating.startsWith(schoolFilter);
      
      return matchesSearch && matchesPrice && matchesType && matchesSchool;
    });
  }, [searchTerm, priceFilter, typeFilter, schoolFilter]);

  const StatCard = ({ metric, index }: { metric: MarketMetric; index: number }) => {
    const IconComponent = metric.icon;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <Card className="relative overflow-hidden">
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
      </motion.div>
    );
  };

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
                
                <Select value={schoolFilter} onValueChange={setSchoolFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="School Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Schools</SelectItem>
                    <SelectItem value="A">A+ Schools</SelectItem>
                    <SelectItem value="B">B+ Schools</SelectItem>
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
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{neighborhood.name}</CardTitle>
                        <p className="text-sm text-gray-600">Zip Code: {neighborhood.zipCode}</p>
                      </div>
                      <Badge variant={neighborhood.crimeIndex === 'Low' ? 'default' : 'secondary'}>
                        {neighborhood.crimeIndex} Crime
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
                        <School className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">{neighborhood.schoolRating}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Walk Score: {neighborhood.walkScore}</span>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">Key Amenities:</p>
                      <div className="flex flex-wrap gap-1">
                        {neighborhood.amenities.slice(0, 3).map((amenity, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {neighborhood.amenities.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{neighborhood.amenities.length - 3} more
                          </Badge>
                        )}
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
                    setSchoolFilter('all');
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
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyTrends}>
                    <XAxis dataKey="month" />
                    <YAxis 
                      yAxisId="price"
                      orientation="left"
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                    />
                    <YAxis 
                      yAxisId="volume"
                      orientation="right"
                      tickFormatter={(value) => value.toString()}
                    />
                    <Area
                      yAxisId="price"
                      type="monotone"
                      dataKey="price"
                      stroke="#2563eb"
                      strokeWidth={2}
                      fill="url(#colorGradient)"
                    />
                    <Line
                      yAxisId="volume"
                      type="monotone"
                      dataKey="volume"
                      stroke="#dc2626"
                      strokeWidth={2}
                      dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 flex justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span>Median Price</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  <span>Sales Volume</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}


    </div>
  );
}