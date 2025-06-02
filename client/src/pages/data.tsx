import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, ExternalLink, Users, BarChart3, Calendar, Phone } from "lucide-react";

export default function DataPage() {
  const resources = [
    {
      title: "Seller's Guide",
      description: "Comprehensive guide for sellers featuring The Stone Selling System",
      icon: FileText,
      type: "PDF",
      action: () => {
        const link = document.createElement('a');
        link.href = '/attached_assets/sellers-guide.pdf';
        link.download = 'Stone-Realty-Sellers-Guide.pdf';
        link.click();
      },
      buttonText: "Download Guide"
    },
    {
      title: "Market Analytics Dashboard",
      description: "Real-time Charlotte market data and neighborhood statistics",
      icon: BarChart3,
      type: "Link",
      action: () => window.open('https://www.charlotterealtors.com/market-data/', '_blank'),
      buttonText: "View Analytics"
    },
    {
      title: "Buyer Resources",
      description: "First-time homebuyer guides and financing information",
      icon: Users,
      type: "Portal",
      action: () => window.open('https://www.nchfa.com/', '_blank'),
      buttonText: "Access Portal"
    },
    {
      title: "Showing Schedule",
      description: "Coordinate and manage property showings efficiently",
      icon: Calendar,
      type: "Tool",
      action: () => window.open('https://showingtime.com/', '_blank'),
      buttonText: "Open Calendar"
    },
    {
      title: "Follow Up Boss CRM",
      description: "Lead management and client communication platform",
      icon: Phone,
      type: "CRM",
      action: () => window.open('https://app.followupboss.com/', '_blank'),
      buttonText: "Access CRM"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Agent Resources & Data
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quick access to essential tools, guides, and resources for serving clients effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-stone-blue/10 rounded-lg">
                        <IconComponent className="h-6 w-6 text-stone-blue" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {resource.type}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <Button 
                      onClick={resource.action}
                      className="w-full bg-stone-blue hover:bg-blue-800"
                    >
                      {resource.icon === FileText ? (
                        <Download className="h-4 w-4 mr-2" />
                      ) : (
                        <ExternalLink className="h-4 w-4 mr-2" />
                      )}
                      {resource.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Reference</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
                <p className="text-gray-600">Phone: (704) 610-0959</p>
                <p className="text-gray-600">Email: Hello@mattstoneteam.com</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Office Hours</h3>
                <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Saturday: 9:00 AM - 4:00 PM</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Emergency Contact</h3>
                <p className="text-gray-600">After-hours: (704) 610-0959</p>
                <p className="text-gray-600">Available 24/7 for clients</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              This page is for internal use only. All resources are for authorized agent access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}