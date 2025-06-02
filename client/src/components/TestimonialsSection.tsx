import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Testimonial } from "@shared/schema";
import logoPath from "@assets/Final-02.png";
import { useLazyLoading } from "@/hooks/use-lazy-loading";

interface TestimonialsSectionProps {
  agentId: number;
}

export default function TestimonialsSection({ agentId }: TestimonialsSectionProps) {
  const { ref, isVisible } = useLazyLoading();
  
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: [`/api/agents/${agentId}/testimonials`],
    enabled: isVisible,
  });

  const displayTestimonials = testimonials || [];

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
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(120, 119, 198, 0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}
      ></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What My Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from Charlotte homebuyers
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {isLoading ? (
            [1, 2, 3].map((i) => (
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
            ))
          ) : displayTestimonials && displayTestimonials.length > 0 ? (
            displayTestimonials.slice(0, 3).map((testimonial, index) => (
              <Card key={testimonial.id} className="bg-white hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex space-x-1 mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <blockquote className="text-gray-700 mb-6 text-sm leading-relaxed">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-stone-blue to-stone-blue-dark rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                      <div className="text-xs text-gray-500">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
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
