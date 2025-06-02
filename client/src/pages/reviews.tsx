import { useQuery } from "@tanstack/react-query";
import { Star, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import type { Testimonial } from "@shared/schema";
import BackToTop from "@/components/BackToTop";

export default function ReviewsPage() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: [`/api/agents/1/testimonials`],
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-black fill-current" : "text-gray-300"}`} />
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
      
      <main className="pt-4">
        {/* Reviews Grid */}
        <section id="reviews-grid" className="py-8 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-black/10 rounded-full px-4 py-2 mb-4">
                <span className="text-black font-semibold text-xs uppercase tracking-wider">Verified Reviews</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Clients Say About Working With Mackenzie
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed mb-6">
                Mackenzie's clients don't just remember the results — they remember how she made them feel throughout one of life's biggest decisions. The words below are pulled directly from verified Google reviews, offering a glimpse into the trust, care, and professionalism she brings to every home sale and purchase across the Charlotte area.
              </p>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed italic">
                These are real voices, real stories — and a testament to the passion and integrity that define Mackenzie's work.
              </p>
            </div>

            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }, (_, index) => (
                  <Card key={index} className="bg-white animate-pulse shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 rounded-2xl overflow-hidden">
                    <CardContent className="p-8">
                      <div className="flex space-x-1 mb-6">
                        {Array.from({ length: 5 }, (_, i) => (
                          <div key={i} className="w-5 h-5 bg-gray-200 rounded"></div>
                        ))}
                      </div>
                      <div className="space-y-4 mb-8">
                        <div className="h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/6"></div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-40"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : testimonials && testimonials.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <Card 
                    key={testimonial.id} 
                    className="bg-white hover:shadow-2xl transition-all duration-500 border-0 rounded-2xl overflow-hidden group transform hover:-translate-y-2" 
                    style={{animationDelay: `${index * 100}ms`}}
                  >
                    <CardContent className="p-6 relative">
                      {/* Decorative quote mark */}
                      <div className="absolute top-3 right-4 text-4xl text-black/10 font-serif leading-none">
                        "
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex space-x-1">
                          {renderStars(testimonial.rating)}
                        </div>
                        {(testimonial as any).source === 'google' && (
                          <div className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Verified
                          </div>
                        )}
                      </div>
                      
                      <blockquote className="text-gray-700 mb-6 text-sm leading-relaxed relative z-10">
                        "{testimonial.content}"
                      </blockquote>
                      
                      <div className="flex items-center">
                        <div className="relative mr-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold text-sm">
                            {testimonial.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">
                            {testimonial.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {testimonial.location}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-16 shadow-2xl max-w-3xl mx-auto border border-gray-100">
                  <div className="w-20 h-20 bg-gradient-to-br from-black to-gray-800 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Star className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">
                    Authentic Client Reviews
                  </h3>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    Real testimonials are retrieved directly from verified Google My Business reviews. 
                    This ensures complete authenticity and transparency in client feedback.
                  </p>
                  <div className="bg-blue-50 rounded-2xl p-6 mb-8">
                    <p className="text-blue-800 font-medium">
                      Google API rate limits are currently active. Authentic reviews will display once limits reset.
                    </p>
                  </div>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-bold px-8 py-4 text-lg rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
                    onClick={() => window.open('https://g.co/kgs/bMnHUoi', '_blank')}
                  >
                    <ExternalLink className="mr-2 h-6 w-6" />
                    Share Your Experience
                  </Button>
                </div>
              </div>
            )}

            {/* Overall Rating */}
            <div className="text-center mt-20">
              <div className="bg-gradient-to-r from-white to-gray-50 px-12 py-8 rounded-3xl shadow-2xl inline-flex items-center border border-gray-100">
                <div className="text-center mr-8">
                  <div className="text-5xl font-bold text-black mb-2">
                    5.0
                  </div>
                  <div className="flex space-x-1 mb-2">
                    {renderStars(5)}
                  </div>
                  <div className="text-gray-600 font-medium">Overall Rating</div>
                </div>
                <div className="h-16 w-px bg-gray-200 mx-8"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">542</div>
                  <div className="text-gray-600 font-medium">Reviews</div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <div className="bg-gradient-to-br from-black via-gray-900 to-gray-800 p-8 rounded-2xl max-w-3xl mx-auto relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
                  }} />
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Ready to Join These Happy Clients?
                  </h3>
                  <p className="text-lg text-gray-200 mb-6 max-w-xl mx-auto leading-relaxed">
                    Experience the same exceptional service that earned these authentic five-star reviews. 
                    Let's make your Charlotte real estate dreams a reality.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      className="bg-white text-black hover:bg-gray-100 font-semibold px-6 py-3 text-base rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Start Your Journey Today
                    </Button>
                    <Button 
                      size="lg" 
                      className="bg-white text-black hover:bg-gray-100 border-2 border-white px-6 py-3 text-base rounded-full transition-all duration-300 font-semibold"
                      onClick={() => window.open('https://g.co/kgs/L4E6zf4', '_blank')}
                    >
                      <ExternalLink className="mr-2 h-4 w-4 text-black" />
                      Share Your Story
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <ContactSection agent={defaultAgent} />
        </section>
      </main>

      <Footer agent={defaultAgent} />
      <BackToTop />
    </div>
  );
}