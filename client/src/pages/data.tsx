import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, BarChart3, Calendar, Phone, Eye } from "lucide-react";

export default function DataPage() {
  const resources = [
    {
      title: "Seller's Guide",
      icon: FileText,
      action: () => window.open('/attached_assets/sellers-guide.pdf', '_blank'),
      buttonText: "View"
    },
    {
      title: "Market Analytics Dashboard",
      icon: BarChart3,
      action: () => window.open('https://www.charlotterealtors.com/market-data/', '_blank'),
      buttonText: "View"
    },
    {
      title: "Buyer Resources",
      icon: Users,
      action: () => window.open('https://www.nchfa.com/', '_blank'),
      buttonText: "View"
    },
    {
      title: "Showing Schedule",
      icon: Calendar,
      action: () => window.open('https://showingtime.com/', '_blank'),
      buttonText: "View"
    },
    {
      title: "Follow Up Boss CRM",
      icon: Phone,
      action: () => window.open('https://app.followupboss.com/', '_blank'),
      buttonText: "View"
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
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-stone-blue/10 rounded-lg">
                          <IconComponent className="h-6 w-6 text-stone-blue" />
                        </div>
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                      </div>
                      <Button 
                        onClick={resource.action}
                        className="bg-stone-blue hover:bg-blue-800 text-white"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        {resource.buttonText}
                      </Button>
                    </div>
                  </CardHeader>
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