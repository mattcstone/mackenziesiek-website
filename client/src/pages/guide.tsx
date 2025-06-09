import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { useEffect } from "react";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Guide, Agent } from "@shared/schema";

export default function GuidePage() {
  const { slug } = useParams();
  
  // Scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  const { data: guide } = useQuery<Guide>({
    queryKey: [`/api/guides/${slug}`],
    enabled: !!slug,
  });

  // Default agent for footer
  const defaultAgent: Agent = {
    id: 1,
    firstName: "Mackenzie",
    lastName: "Siek",
    email: "mackenzie@mattstoneteam.com",
    phone: "(704) 610-0959",
    bio: "",
    headshot: null,
    welcomeVideo: null,
    church: null,
    favoriteNeighborhood: null,
    favoriteSpot: null,
    favoriteRestaurant: null,
    hobby: null,
    homesSold: 127,
    avgDaysOnMarket: 18,
    rating: "4.9",
    isActive: true,
    createdAt: new Date(),
  };

  if (!guide && slug) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Guide Not Found</h1>
            <p className="text-gray-600 mb-8">The guide you're looking for doesn't exist.</p>
            <Link href="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
        <Footer agent={defaultAgent} />
      </div>
    );
  }

  // Default guide data for demonstration
  const displayGuide = guide || {
    id: 1,
    title: "A Perfect Day in Myers Park",
    slug: "perfect-day-myers-park",
    content: `
      <h2>Morning: Start at Park Road Shopping Center</h2>
      <p>Begin your day with a cup of locally roasted coffee at one of the charming cafes in Park Road Shopping Center. This outdoor shopping destination has been a Myers Park staple for decades and offers a perfect mix of local boutiques and national brands.</p>
      
      <h2>Mid-Morning: Freedom Park</h2>
      <p>Take a leisurely stroll through Freedom Park, one of Charlotte's most beloved green spaces. The park features walking trails, a lake, sports facilities, and plenty of space for picnicking. Don't miss the amphitheater where local events are often held.</p>
      
      <h2>Lunch: The Asbury</h2>
      <p>Head to The Asbury for a delicious lunch. This neighborhood favorite offers elevated American cuisine in a warm, welcoming atmosphere. Their seasonal menu features locally sourced ingredients and creative dishes that capture the spirit of Charlotte.</p>
      
      <h2>Afternoon: Little Sugar Creek Greenway</h2>
      <p>Work off lunch with a walk or bike ride along the Little Sugar Creek Greenway. This paved trail system connects Freedom Park to other parts of the city and offers beautiful views of the creek and surrounding neighborhoods.</p>
      
      <h2>Evening: Phillips Place</h2>
      <p>End your day with dinner and shopping at Phillips Place. This upscale outdoor shopping center features excellent restaurants, specialty shops, and a beautiful atmosphere for an evening stroll.</p>
      
      <h2>Hidden Gems</h2>
      <ul>
        <li>The Secret Garden behind the Myers Park Traditional building</li>
        <li>The historic Mint Museum Randolph</li>
        <li>The beautiful architecture along Queens Road</li>
        <li>Local art installations throughout the neighborhood</li>
      </ul>
    `,
    excerpt: "Start with coffee at Park Road Shopping Center, stroll through Freedom Park, lunch at The Asbury, and end with dinner at Phillips Place. Plus my favorite hidden gems!",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600",
    neighborhoodId: 1,
    agentId: 1,
    isFeatured: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-96">
        <img 
          src={displayGuide.image || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600"}
          alt={displayGuide.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <div className="mb-4">
              {displayGuide.isFeatured && (
                <Badge className="bg-stone-blue text-white mb-2">Featured Guide</Badge>
              )}
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">{displayGuide.title}</h1>
            <p className="text-xl">{displayGuide.excerpt}</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="mb-8">
            <div className="flex items-center text-sm text-gray-600 space-x-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Updated {formatDate(displayGuide.updatedAt || new Date())}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Myers Park Neighborhood</span>
              </div>
            </div>
          </div>

          <article className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: displayGuide.content }} />
          </article>

          <div className="mt-12 p-8 bg-stone-light rounded-2xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Ready to Explore Myers Park?
            </h3>
            <p className="text-gray-600 mb-6">
              I'd love to show you around this amazing neighborhood and help you find your perfect home here.
            </p>
            <Button asChild className="bg-stone-blue hover:bg-blue-800">
              <a href="#contact">Contact Me for a Personal Tour</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer agent={defaultAgent} />
    </div>
  );
}
