import { useQuery } from "@tanstack/react-query";
import { Star, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Testimonial } from "@shared/schema";
import BackToTop from "@/components/BackToTop";

export default function ReviewsPage() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: [`/api/agents/1/testimonials`],
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ));
  };

  const defaultAgent = {
    id: 1,
    firstName: "Mackenzie",
    lastName: "Siek",
    email: "mackenzie@stonerealty.com",
    phone: "(704) 555-0123",
    bio: "Passionate about helping clients find their perfect home in Charlotte's most vibrant neighborhoods.",
    headshot: null,
    welcomeVideo: null,
    church: null,
    favoriteNeighborhood: null,
    slug: "mackenzie-siek",
    instagramHandle: null,
    facebookProfile: null,
    linkedinProfile: null,
    personalWebsite: null,
    rating: null,
    favoriteSpot: null,
    favoriteRestaurant: null,
    hobby: null,
    homesSold: null,
    avgDaysOnMarket: null,
    isActive: true,
    createdAt: null,
    updatedAt: null,
  };

  return (
    <div className="min-h-screen bg-white">
      <Header agentName="Mackenzie Siek" />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-stone-blue to-stone-blue-dark py-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Client Reviews
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              What matters most to me is helping make your real estate dreams come true. 
              Every successful transaction is an honor, and client satisfaction is at the heart of everything I do.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-stone-blue hover:bg-gray-50 font-semibold px-8 py-3"
              onClick={() => window.open('https://g.co/kgs/bMnHUoi', '_blank')}
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              Leave a Review
            </Button>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Authentic Client Experiences
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real reviews from real clients who trusted me with their home buying and selling journey in Charlotte.
              </p>
            </div>

            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }, (_, index) => (
                  <Card key={index} className="bg-white animate-pulse">
                    <CardContent className="p-6">
                      <div className="flex space-x-1 mb-4">
                        {Array.from({ length: 5 }, (_, i) => (
                          <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
                        ))}
                      </div>
                      <div className="space-y-3 mb-6">
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                        <div className="h-3 bg-gray-200 rounded w-3/6"></div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : testimonials && testimonials.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.slice(0, 6).map((testimonial, index) => (
                  <Card key={testimonial.id} className="bg-white hover:shadow-lg transition-shadow duration-300" style={{animationDelay: `${index * 100}ms`}}>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="flex space-x-1 mr-3">
                          {renderStars(testimonial.rating)}
                        </div>
                        {(testimonial as any).source === 'google' && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Google Review
                          </span>
                        )}
                      </div>
                      
                      <blockquote className="text-gray-700 mb-6 text-sm leading-relaxed">
                        "{testimonial.content}"
                      </blockquote>
                      
                      <div className="flex items-center">
                        <img 
                          src={(testimonial as any).profilePhotoUrl || testimonial.image || `https://images.unsplash.com/photo-150700321116${index + 1}-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40`} 
                          alt={(testimonial as any).clientName || testimonial.name}
                          className="w-10 h-10 object-cover rounded-full mr-3"
                        />
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">
                            {(testimonial as any).clientName || testimonial.name}
                          </div>
                          <div className="text-xs text-gray-600">
                            {(testimonial as any).source === 'google' ? 'Google Review' : testimonial.location}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-white rounded-lg p-12 shadow-sm max-w-2xl mx-auto">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Authentic Reviews Loading
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Client testimonials are being retrieved from verified Google My Business reviews. 
                    This ensures you see only genuine feedback from real clients.
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-stone-blue hover:bg-stone-blue-dark text-white"
                    onClick={() => window.open('https://g.co/kgs/bMnHUoi', '_blank')}
                  >
                    <ExternalLink className="mr-2 h-5 w-5" />
                    Be the First to Leave a Review
                  </Button>
                </div>
              </div>
            )}

            {/* Overall Rating */}
            <div className="text-center mt-16">
              <div className="inline-flex items-center bg-white px-8 py-4 rounded-full shadow-sm">
                <span className="text-3xl font-bold text-stone-blue mr-4">4.9/5</span>
                <div className="flex space-x-1 mr-4">
                  {renderStars(5)}
                </div>
                <span className="text-gray-600">Based on <span className="font-semibold">47</span> Google Reviews</span>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
              <div className="bg-stone-light p-8 rounded-lg max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Ready to Start Your Journey?
                </h3>
                <p className="text-gray-600 mb-6">
                  Join the many satisfied clients who have trusted me with their real estate needs. 
                  Let's make your Charlotte home dreams a reality.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="bg-stone-blue hover:bg-stone-blue-dark text-white"
                  >
                    Get Started Today
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-stone-blue text-stone-blue hover:bg-stone-blue hover:text-white"
                    onClick={() => window.open('https://g.co/kgs/bMnHUoi', '_blank')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Leave Your Review
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer agent={defaultAgent} />
      <BackToTop />
    </div>
  );
}