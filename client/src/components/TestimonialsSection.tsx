import { useQuery } from "@tanstack/react-query";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Testimonial } from "@shared/schema";
import logoPath from "@assets/Final-02.png";
import { useLazyLoading } from "@/hooks/use-lazy-loading";
import { useState } from "react";

interface TestimonialsSectionProps {
  agentId: number;
}

// Component for truncated text with read more functionality
function TruncatedText({ text, maxLength = 150 }: { text: string; maxLength?: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (text.length <= maxLength) {
    return <span>"{text}"</span>;
  }
  
  const truncatedText = text.slice(0, maxLength) + "...";
  
  return (
    <span>
      "{isExpanded ? text : truncatedText}"
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        className="ml-2 h-auto p-0 text-stone-blue hover:text-stone-blue-dark font-medium text-xs"
      >
        {isExpanded ? "Read Less" : "Read More"}
      </Button>
    </span>
  );
}

export default function TestimonialsSection({ agentId }: TestimonialsSectionProps) {
  const { ref, isVisible } = useLazyLoading();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: [`/api/agents/${agentId}/testimonials`],
    enabled: isVisible,
  });

  // Sort testimonials to prioritize those with images
  const sortedTestimonials = testimonials ? [...testimonials].sort((a, b) => {
    if (a.image && !b.image) return -1;
    if (!a.image && b.image) return 1;
    return 0;
  }) : [];
  
  const displayTestimonials = sortedTestimonials;
  const itemsPerPage = 3;
  const totalPages = Math.ceil(displayTestimonials.length / itemsPerPage);
  


  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ));
  };

  return (
    <section ref={ref} id="testimonials" className="relative py-8 lg:py-12 bg-gradient-to-br from-gray-50 to-stone-50 overflow-hidden">
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What My Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real experiences from buyers and sellers across the Charlotte metro area
          </p>
        </div>
        
        <div className="relative">
          {/* Modern Navigation Arrows */}
          {displayTestimonials.length > itemsPerPage && totalPages > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 
                          bg-gray-700 hover:bg-gray-600
                          text-white rounded-full shadow-xl p-3 
                          hover:shadow-2xl hover:scale-110 
                          transition-all duration-300 ease-out
                          border-2 border-gray-600
                          backdrop-blur-sm"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 
                          bg-gray-700 hover:bg-gray-600
                          text-white rounded-full shadow-xl p-3 
                          hover:shadow-2xl hover:scale-110 
                          transition-all duration-300 ease-out
                          border-2 border-gray-600
                          backdrop-blur-sm"
                aria-label="Next testimonials"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {isLoading ? (
                <div className="w-full flex-shrink-0">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                      <Card key={i} className="bg-white animate-pulse">
                        <CardContent className="p-8">
                          <div className="h-4 bg-gray-200 rounded mb-4"></div>
                          <div className="space-y-2">
                            <div className="h-3 bg-gray-200 rounded"></div>
                            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                          </div>
                          <div className="mt-6 flex items-center">
                            <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                            <div className="h-3 bg-gray-200 rounded w-24"></div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : displayTestimonials && displayTestimonials.length > 0 ? (
                Array.from({ length: totalPages }, (_, pageIndex) => {
                  const start = pageIndex * itemsPerPage;
                  const pageTestimonials = displayTestimonials.slice(start, start + itemsPerPage);
                  
                  return (
                    <div key={pageIndex} className="w-full flex-shrink-0">
                      <div className="grid lg:grid-cols-3 gap-8">
                        {pageTestimonials.map((testimonial) => (
                          <Card key={testimonial.id} className="bg-white hover:shadow-lg transition-shadow duration-300 h-[280px] flex flex-col">
                            <CardContent className="p-8 flex flex-col flex-1">
                              <div className="flex space-x-1 mb-4">
                                {renderStars(testimonial.rating)}
                              </div>
                              <blockquote className="text-gray-700 mb-6 text-sm leading-relaxed flex-1">
                                <TruncatedText text={testimonial.content} maxLength={120} />
                              </blockquote>
                              <div className="flex items-center mt-auto">
                                {testimonial.image ? (
                                  <img 
                                    src={testimonial.image} 
                                    alt={testimonial.name}
                                    className="w-10 h-10 object-cover rounded-full mr-3"
                                  />
                                ) : (
                                  <div className="w-10 h-10 bg-gradient-to-br from-stone-blue to-stone-blue-dark rounded-full flex items-center justify-center mr-3">
                                    <span className="text-white font-bold text-sm">
                                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                  </div>
                                )}
                                <div>
                                  <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                                  <div className="text-xs text-gray-500">{testimonial.location}</div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="w-full flex-shrink-0">
                  <div className="text-center py-12">
                    <div className="bg-stone-light rounded-lg p-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Client Testimonials</h3>
                      <p className="text-gray-600 mb-4">
                        Authentic client testimonials are being retrieved from verified sources.
                      </p>
                      <p className="text-sm text-gray-500">
                        Please check back soon to see genuine reviews from Mackenzie's clients.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pagination Dots */}
          {displayTestimonials.length > itemsPerPage && totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    i === currentIndex ? 'bg-stone-blue' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial page ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="https://g.co/kgs/bMnHUoi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-stone-light px-6 py-3 rounded-full hover:bg-stone-200 transition-colors duration-200 cursor-pointer"
          >
            <span className="text-2xl font-bold text-stone-blue mr-3">5.0/5</span>
            <div className="flex space-x-1 mr-3">
              {renderStars(5)}
            </div>
            <span className="text-gray-600">Based on <span className="font-semibold">542</span> Google Reviews</span>
          </a>
        </div>
        
        {/* Section separator */}
        <div className="max-w-4xl mx-auto mt-12">
          <hr className="border-t border-gray-200" />
        </div>
      </div>
    </section>
  );
}