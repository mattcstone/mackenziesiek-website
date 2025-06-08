import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Calendar, Clock, Eye, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SEO from "@/components/SEO";
import type { BlogPost, Agent } from "@shared/schema";

export default function BlogPage() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  // Default agent for demonstration
  const defaultAgent: Agent = {
    id: 1,
    firstName: "Mackenzie",
    lastName: "Siek",
    email: "mackenzie@mattstoneteam.com",
    phone: "(704) 610-0959",
    bio: "Your trusted Charlotte real estate expert",
    headshot: "/assets/mackenzie-headshot.jpg",
    welcomeVideo: null,
    church: null,
    favoriteNeighborhood: "In-town Charlotte",
    favoriteSpot: "Farmers markets & the Rail Trail",
    favoriteRestaurant: "300 East",
    hobby: "Interior design & traveling",
    homesSold: 100,
    avgDaysOnMarket: 15,
    rating: "5.0",
    isActive: true,
    createdAt: new Date(),
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title="Real Estate Blog | Charlotte Market Insights | Mackenzie Siek"
        description="Stay informed with the latest Charlotte real estate market insights, buying tips, selling strategies, and neighborhood guides from expert Realtor Mackenzie Siek."
        keywords="Charlotte real estate blog, market insights, buying tips, selling strategies, neighborhood guides, Charlotte housing market"
        canonicalUrl="https://mackenzie.mattstoneteam.com/blog"
      />
      
      <Header agentName={`${defaultAgent.firstName} ${defaultAgent.lastName}`} />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Real Estate Insights
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Stay informed with the latest Charlotte market trends, expert advice, and insider tips for buying and selling real estate
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                    <CardHeader>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded"></div>
                        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : posts && posts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <Card className="group cursor-pointer hover:shadow-lg transition-shadow duration-300 h-full">
                      {post.featuredImage && (
                        <div className="h-48 overflow-hidden rounded-t-lg">
                          <img 
                            src={post.featuredImage} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                          <Clock className="h-4 w-4 ml-2" />
                          <span>{getReadingTime(post.content)} min read</span>
                          {post.viewCount > 0 && (
                            <>
                              <Eye className="h-4 w-4 ml-2" />
                              <span>{post.viewCount} views</span>
                            </>
                          )}
                        </div>
                        <h2 className="text-xl font-bold group-hover:text-blue-600 transition-colors duration-300 mb-2">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {post.excerpt}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {post.tags?.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <ArrowRight className="h-4 w-4 text-blue-600 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No Blog Posts Yet</h3>
                  <p className="text-gray-600 mb-8">
                    Blog posts will appear here once content is published. Check back soon for real estate insights and market updates.
                  </p>
                  <Link href="/">
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                      Return Home
                    </button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer agent={defaultAgent} />
    </div>
  );
}