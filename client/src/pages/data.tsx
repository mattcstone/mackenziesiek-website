import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, BarChart3, Calendar, Phone, Eye } from "lucide-react";

export default function DataPage() {
  const resources = [
    {
      title: "Stone Selling System",
      icon: FileText,
      action: () => window.open('/attached_assets/sellers-guide.pdf', '_blank'),
      buttonText: "View"
    },
    {
      title: "Buyer's Guide",
      icon: FileText,
      action: () => window.open('/attached_assets/SRG Buyer Presentation (8).pdf', '_blank'),
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
          <div className="mb-12">
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
                        className="bg-blue-600 hover:bg-blue-700 text-white border-0"
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