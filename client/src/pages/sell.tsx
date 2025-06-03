import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Home, TrendingUp, Users, Camera, Globe, Timer, Award, DollarSign, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import stoneSellingSystemLogo from "@assets/Logo_Black@4x.png";
import sellersGuidePdf from "@assets/sellers-guide.pdf";

export default function SellPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: ""
  });
  const { toast } = useToast();

  const createSellerLeadMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest("POST", "/api/seller-leads", {
        ...data,
        agentId: 1 // Mackenzie's agent ID
      });
    },
    onSuccess: () => {
      // Create download link for the PDF
      const link = document.createElement('a');
      link.href = sellersGuidePdf;
      link.download = 'stone-selling-system-guide.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Thank you!",
        description: "Your selling guide is downloading now. We'll be in touch soon!"
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: ""
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to process request. Please try again or call us directly.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createSellerLeadMutation.mutate(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const defaultAgent = {
    id: 1,
    firstName: "Mackenzie",
    lastName: "Stone",
    email: "mackenzie@mattstoneteam.com",
    phone: "(704) 755-5095",
    bio: "Your trusted Charlotte real estate expert",
    headshot: "/assets/mackenzie-headshot.jpg",
    welcomeVideo: null,
    church: null,
    favoriteNeighborhood: "Lake Norman",
    favoriteSpot: null,
    favoriteRestaurant: null,
    hobby: null,
    homesSold: 150,
    avgDaysOnMarket: 12,
    rating: "4.9",
    isActive: true,
    createdAt: new Date()
  };

  return (
    <div className="min-h-screen bg-white">
      <Header agentName="Mackenzie Siek" />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                Sell Your Home with 
                <span className="text-yellow-400"> The Stone Standard</span>
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                Experience unparalleled service with our proven Stone Selling System. 
                Over $1.5 billion in transactions and 1,000+ five-star reviews.
              </p>
              
              {/* Experience The Stone Standard Metrics */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white text-center mb-6">Experience The Stone Standard</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gray-700 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">18</div>
                    <div className="text-sm text-gray-300">Years in Business</div>
                  </div>
                  
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gray-700 rounded-full flex items-center justify-center">
                      <Home className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">2500+</div>
                    <div className="text-sm text-gray-300">Homes Sold</div>
                  </div>
                  
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gray-700 rounded-full flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">$1.5B</div>
                    <div className="text-sm text-gray-300">Closed Transactions</div>
                  </div>
                  
                  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gray-700 rounded-full flex items-center justify-center">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">1,000</div>
                    <div className="text-sm text-gray-300">5-Star Reviews</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Lead Capture Form */}
            <Card className="bg-white text-black">
              <CardHeader className="text-center">
                <img 
                  src={stoneSellingSystemLogo} 
                  alt="Stone Selling System" 
                  className="h-16 mx-auto mb-4"
                />
                <CardTitle className="text-2xl">Get Your FREE Seller's Guide</CardTitle>
                <CardDescription>
                  Download our comprehensive guide to selling your home in Charlotte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Home Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="For accurate market analysis"
                      className="mt-1"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-black hover:bg-gray-800 text-white py-3"
                    disabled={createSellerLeadMutation.isPending}
                  >
                    {createSellerLeadMutation.isPending ? "Processing..." : "Download FREE Seller's Guide"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Home Value Analysis Tool */}
      <section className="py-16 bg-gradient-to-br from-black via-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get Your Free Home Analysis
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Find out your home value, equity, refinance options and much more with our comprehensive analysis tool.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <iframe 
              src="https://mackenzie.mattstoneteam.com/SELLER"
              className="w-full h-[800px] border-0"
              title="Home Value Analysis Tool"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          </div>
        </div>
      </section>

      {/* Stone Selling System Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The Stone Selling System</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our proprietary marketing system combines cutting-edge technology with proven strategies 
              to maximize your home's exposure and sale price.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Professional Photography</h3>
              <p className="text-gray-600 text-sm">
                Drone photography, Matterport 3D tours, and detailed floor plans showcase your home beautifully.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Global Marketing Reach</h3>
              <p className="text-gray-600 text-sm">
                We spend over $2M annually on marketing across Zillow, Realtor®.com, social media, and more.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Precision Pricing</h3>
              <p className="text-gray-600 text-sm">
                Strategic pricing positions your home to attract qualified buyers and maximize your return.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-black text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Timer className="h-8 w-8" />
              </div>
              <h3 className="font-semibold mb-2">Quick Sale Strategy</h3>
              <p className="text-gray-600 text-sm">
                Our proven system attracts buyers within the first days on market for optimal results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Market Coverage */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Expansive Coverage. Extensive Expertise.</h2>
              <p className="text-lg text-gray-600 mb-6">
                From Lake Norman to Lake Wylie and everywhere in between, Stone Realty Group has a deep 
                understanding of the Charlotte market. When relocation buyers arrive, they expect a brokerage 
                that comprehensively grasps the broader market dynamics.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Corporate relocations and executive clients</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Professional athletes and high-net-worth individuals</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>First-time buyers and growing families</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <span>Retirees and downsizing clients</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-6 text-center">Why Choose The Stone Standard?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Award className="h-6 w-6 text-yellow-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">Proven Results</h4>
                    <p className="text-gray-600 text-sm">Nearly two decades of experience with $1.5B+ in closed volume</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-6 w-6 text-blue-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">Client Satisfaction</h4>
                    <p className="text-gray-600 text-sm">1,000+ five-star reviews across various platforms</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Home className="h-6 w-6 text-green-500 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold">Market Expertise</h4>
                    <p className="text-gray-600 text-sm">Deep knowledge of Charlotte's premier neighborhoods</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Experience The Stone Standard?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            The decision before you carries immense weight. Entrusting your home's sale to the right partner 
            is crucial. We don't take that responsibility lightly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 px-8 py-4">
              <a href="https://mackenzie.mattstoneteam.com/SELLER" target="_blank" rel="noopener noreferrer">
                Get Your Home Value
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-4">
              <a href="tel:(704) 755-5095">
                Call (704) 755-5095
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer agent={defaultAgent} />
    </div>
  );
}