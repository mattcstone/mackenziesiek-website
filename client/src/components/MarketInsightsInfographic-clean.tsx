import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import NeighborhoodModal from './NeighborhoodModal';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Area, AreaChart, Tooltip, Legend } from 'recharts';
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
  Car
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

const marketMetrics: MarketMetric[] = [
  {
    title: 'Median Home Price',
    value: '$425,000',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    description: 'Year over year'
  },
  {
    title: 'Average Days on Market',
    value: '23',
    change: '-15%',
    trend: 'down',
    icon: Clock,
    description: 'Compared to last year'
  },
  {
    title: 'Total Active Listings',
    value: '2,847',
    change: '-8.3%',
    trend: 'down',
    icon: Home,
    description: 'Current inventory'
  },
  {
    title: 'Price Per Square Foot',
    value: '$228',
    change: '+9.2%',
    trend: 'up',
    icon: Target,
    description: 'Last 30 days'
  }
];

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
  },
  { 
    name: 'Belmont', 
    zipCode: '28012', 
    price: 375000, 
    sales: 124, 
    growth: 16.8, 
    daysOnMarket: 19,
    walkScore: 52,
    priceRange: '300K-500K',
    type: 'Suburban',
    amenities: ['Historic Downtown', 'Catawba River Access', 'Small Town Charm', 'Growing Community']
  },
  { 
    name: 'Gastonia', 
    zipCode: '28052', 
    price: 265000, 
    sales: 189, 
    growth: 14.2, 
    daysOnMarket: 21,
    walkScore: 45,
    priceRange: 'Under 300K',
    type: 'Suburban',
    amenities: ['Affordable Housing', 'Historic District', 'Parks & Recreation', 'Growing Economy']
  },
  { 
    name: 'Rock Hill', 
    zipCode: '29730', 
    price: 285000, 
    sales: 167, 
    growth: 13.9, 
    daysOnMarket: 23,
    walkScore: 41,
    priceRange: 'Under 300K',
    type: 'Suburban',
    amenities: ['SC Tax Benefits', 'Manchester Meadows', 'Riverwalk', 'Knowledge Park']
  },
  { 
    name: 'Fort Mill', 
    zipCode: '29715', 
    price: 425000, 
    sales: 142, 
    growth: 12.7, 
    daysOnMarket: 18,
    walkScore: 38,
    priceRange: '300K-500K',
    type: 'Suburban',
    amenities: ['SC Tax Benefits', 'Great Schools', 'Historic Downtown', 'Proximity to Charlotte']
  },
  { 
    name: 'Matthews', 
    zipCode: '28105', 
    price: 415000, 
    sales: 118, 
    growth: 11.5, 
    daysOnMarket: 16,
    walkScore: 55,
    priceRange: '300K-500K',
    type: 'Suburban',
    amenities: ['Historic Downtown', 'Squirrel Lake Park', 'Festival in the Park', 'Close to Charlotte']
  },
  { 
    name: 'Mint Hill', 
    zipCode: '28227', 
    price: 385000, 
    sales: 96, 
    growth: 10.8, 
    daysOnMarket: 20,
    walkScore: 35,
    priceRange: '300K-500K',
    type: 'Suburban',
    amenities: ['Rural Feel', 'New Construction', 'Growing Community', 'Family-Friendly']
  },
  { 
    name: 'Waxhaw', 
    zipCode: '28173', 
    price: 465000, 
    sales: 89, 
    growth: 15.3, 
    daysOnMarket: 22,
    walkScore: 32,
    priceRange: '300K-500K',
    type: 'Suburban',
    amenities: ['Historic Downtown', 'Cane Creek Park', 'Marvin Road Corridor', 'Union County Schools']
  },
  { 
    name: 'Pineville', 
    zipCode: '28134', 
    price: 345000, 
    sales: 134, 
    growth: 13.2, 
    daysOnMarket: 17,
    walkScore: 48,
    priceRange: '300K-500K',
    type: 'Suburban',
    amenities: ['Carolina Place Mall', 'PNC Music Pavilion', 'Affordable Housing', 'Transit Access']
  },
  { 
    name: 'Concord', 
    zipCode: '28025', 
    price: 365000, 
    sales: 178, 
    growth: 12.1, 
    daysOnMarket: 19,
    walkScore: 43,
    priceRange: '300K-500K',
    type: 'Suburban',
    amenities: ['Charlotte Motor Speedway', 'Historic Downtown', 'Cabarrus County', 'Growing Market']
  },
  { 
    name: 'Kannapolis', 
    zipCode: '28081', 
    price: 295000, 
    sales: 145, 
    growth: 17.4, 
    daysOnMarket: 18,
    walkScore: 42,
    priceRange: 'Under 300K',
    type: 'Suburban',
    amenities: ['NC Research Campus', 'Downtown Revitalization', 'Affordable Housing', 'Growing Tech Hub']
  },
  { 
    name: 'Indian Trail', 
    zipCode: '28079', 
    price: 395000, 
    sales: 112, 
    growth: 14.6, 
    daysOnMarket: 21,
    walkScore: 28,
    priceRange: '300K-500K',
    type: 'Suburban',
    amenities: ['New Construction', 'Family Communities', 'Union County Schools', 'Rural Suburban Feel']
  },
  { 
    name: 'Monroe', 
    zipCode: '28110', 
    price: 315000, 
    sales: 98, 
    growth: 16.2, 
    daysOnMarket: 24,
    walkScore: 39,
    priceRange: '300K-500K',
    type: 'Suburban',
    amenities: ['Historic Downtown', 'Union County Seat', 'Affordable Living', 'Small Town Appeal']
  },
  { 
    name: 'Mooresville', 
    zipCode: '28117', 
    price: 445000, 
    sales: 127, 
    growth: 13.8, 
    daysOnMarket: 20,
    walkScore: 41,
    priceRange: '300K-500K',
    type: 'Suburban',
    amenities: ['Lake Norman Access', 'Race City USA', 'NASCAR Teams', 'Downtown Revitalization']
  },
  { 
    name: 'Davidson', 
    zipCode: '28036', 
    price: 625000, 
    sales: 67, 
    growth: 9.4, 
    daysOnMarket: 26,
    walkScore: 58,
    priceRange: '500K-750K',
    type: 'Luxury',
    amenities: ['Davidson College', 'Historic Downtown', 'Lake Norman', 'Walkable Community']
  },
  { 
    name: 'Stallings', 
    zipCode: '28104', 
    price: 425000, 
    sales: 78, 
    growth: 11.9, 
    daysOnMarket: 19,
    walkScore: 31,
    priceRange: '300K-500K',
    type: 'Suburban',
    amenities: ['New Development', 'Family-Oriented', 'Union County Schools', 'Growing Community']
  }
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
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<NeighborhoodData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredNeighborhoods = useMemo(() => {
    return allNeighborhoodData.filter(neighborhood => {
      const matchesSearch = neighborhood.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           neighborhood.zipCode.includes(searchTerm);
      const matchesPrice = priceFilter === 'all' || neighborhood.priceRange === priceFilter;
      const matchesType = typeFilter === 'all' || neighborhood.type === typeFilter;
      
      return matchesSearch && matchesPrice && matchesType;
    });
  }, [searchTerm, priceFilter, typeFilter]);

  const handleNeighborhoodClick = (neighborhood: NeighborhoodData) => {
    setSelectedNeighborhood(neighborhood);
    setModalOpen(true);
  };

  // Custom tooltip component for the multi-line chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {`${entry.name}: ${entry.payload[entry.dataKey] ? 
                (entry.dataKey === 'price' ? `$${(entry.payload[entry.dataKey] / 1000).toFixed(0)}K` :
                 entry.dataKey === 'pricePerSqFt' ? `$${entry.payload[entry.dataKey]}` :
                 entry.dataKey === 'inventory' ? `${(entry.payload[entry.dataKey] / 1000).toFixed(1)}K` :
                 entry.payload[entry.dataKey].toLocaleString()) : 'N/A'}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Charlotte Market Insights</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Real-time market data and neighborhood analytics for informed real estate decisions
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-center space-x-1 bg-gray-100 rounded-lg p-1">
        {['overview', 'neighborhoods'].map((view) => (
          <Button
            key={view}
            variant={selectedView === view ? 'default' : 'ghost'}
            onClick={() => setSelectedView(view as any)}
            className="capitalize"
          >
            {view}
          </Button>
        ))}
      </div>

      {/* Overview View */}
      {selectedView === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
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
            })}
          </div>

          {/* 24-Month Market Trends Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                24-Month Market Trends - All Metrics
              </CardTitle>
              <p className="text-sm text-gray-600">
                Hover over any line to see detailed values for that time period
              </p>
            </CardHeader>
            <CardContent>
              {/* Combined Multi-Line Chart */}
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrends}>
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 10 }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    
                    {/* Hidden Y-axes for scaling only */}
                    <YAxis 
                      yAxisId="price"
                      orientation="left"
                      hide={true}
                      domain={['dataMin - 10000', 'dataMax + 10000']}
                    />
                    
                    <YAxis 
                      yAxisId="volume"
                      orientation="right"
                      hide={true}
                      domain={['dataMin - 100', 'dataMax + 100']}
                    />
                    
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    
                    {/* Median Price Line */}
                    <Line
                      yAxisId="price"
                      type="monotone"
                      dataKey="price"
                      stroke="#2563eb"
                      strokeWidth={3}
                      name="Median Price"
                      dot={{ fill: '#2563eb', strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 6, fill: '#2563eb' }}
                    />
                    
                    {/* Price Per Sq Ft Line */}
                    <Line
                      yAxisId="price"
                      type="monotone"
                      dataKey="pricePerSqFt"
                      stroke="#7c3aed"
                      strokeWidth={2}
                      name="Price/Sq Ft"
                      dot={{ fill: '#7c3aed', strokeWidth: 2, r: 2 }}
                      activeDot={{ r: 5, fill: '#7c3aed' }}
                    />
                    
                    {/* Sales Volume Line */}
                    <Line
                      yAxisId="volume"
                      type="monotone"
                      dataKey="volume"
                      stroke="#059669"
                      strokeWidth={3}
                      name="Sales Volume"
                      dot={{ fill: '#059669', strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 6, fill: '#059669' }}
                    />
                    
                    {/* Inventory Line */}
                    <Line
                      yAxisId="volume"
                      type="monotone"
                      dataKey="inventory"
                      stroke="#dc2626"
                      strokeWidth={2}
                      name="Inventory"
                      dot={{ fill: '#dc2626', strokeWidth: 2, r: 2 }}
                      activeDot={{ r: 5, fill: '#dc2626' }}
                    />
                    
                    {/* New Listings Line */}
                    <Line
                      yAxisId="volume"
                      type="monotone"
                      dataKey="newListings"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      name="New Listings"
                      dot={{ fill: '#f59e0b', strokeWidth: 2, r: 2 }}
                      activeDot={{ r: 5, fill: '#f59e0b' }}
                    />
                    
                    {/* Days on Market Line (scaled to fit) */}
                    <Line
                      yAxisId="volume"
                      type="monotone"
                      dataKey="daysOnMarket"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      name="Days on Market"
                      dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 2 }}
                      activeDot={{ r: 5, fill: '#8b5cf6' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {/* Legend with Icons */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-blue-600"></div>
                  <DollarSign className="w-4 h-4 text-blue-600" />
                  <span>Median Price</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-green-600"></div>
                  <Home className="w-4 h-4 text-green-600" />
                  <span>Sales Volume</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-red-600"></div>
                  <Building className="w-4 h-4 text-red-600" />
                  <span>Inventory</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-purple-600"></div>
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span>Days on Market</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-purple-500"></div>
                  <Target className="w-4 h-4 text-purple-500" />
                  <span>Price/Sq Ft</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-yellow-600"></div>
                  <Zap className="w-4 h-4 text-yellow-600" />
                  <span>New Listings</span>
                </div>
              </div>
            </CardContent>
          </Card>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                whileHover={{ scale: 1.02 }}
              >
                <Card 
                  className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-blue-200 border-2"
                  onClick={() => handleNeighborhoodClick(neighborhood)}
                >
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



      {/* Neighborhood Modal */}
      <NeighborhoodModal
        neighborhood={selectedNeighborhood}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}