import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Testimonial } from "@shared/schema";

interface TestimonialsSectionProps {
  agentId: number;
}

export default function TestimonialsSection({ agentId }: TestimonialsSectionProps) {
  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: [`/api/agents/${agentId}/testimonials`],
  });

  // Default testimonials if none exist in database
  const defaultTestimonials = [
    {
      id: 1,
      name: "Alex Thompson",
      location: "SouthEnd Condo Buyer",
      content: "Mackenzie helped me find the perfect SouthEnd condo as a first-time buyer. Her knowledge of the area and understanding of my lifestyle needs was spot on. Love my new place!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&h=50",
    },
    {
      id: 2,
      name: "Jessica Martinez",
      location: "NoDa Townhome Buyer",
      content: "Just relocated to Charlotte and Mackenzie made it so easy! She showed me all the best spots in NoDa and found me a townhome walking distance to everything I love.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&h=50",
    },
    {
      id: 3,
      name: "Ryan & Taylor Kim",
      location: "Dilworth Buyers",
      content: "Mackenzie understood exactly what we wanted - walkable to great restaurants and nightlife. She found us the perfect place in Dilworth and made the whole process stress-free!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&h=50",
    },
  ];

  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ));
  };

  return (
    <section id="testimonials" className="py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What My Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from discerning clients I've helped find their exceptional in-town Charlotte home
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {displayTestimonials.slice(0, 3).map((testimonial) => (
            <Card key={testimonial.id} className="bg-stone-light">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                
                <blockquote className="text-gray-700 mb-6">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center">
                  <img 
                    src={testimonial.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=50&h=50"} 
                    alt={testimonial.name}
                    className="w-12 h-12 object-cover rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-stone-light px-6 py-3 rounded-full">
            <span className="text-2xl font-bold text-stone-blue mr-3">4.9/5</span>
            <div className="flex space-x-1 mr-3">
              {renderStars(5)}
            </div>
            <span className="text-gray-600">Based on <span className="font-semibold">47</span> Google Reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}
