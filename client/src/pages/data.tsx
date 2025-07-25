import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Users, BarChart3, Calendar, Phone, Eye, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function DataPage() {
  const resources = [
    {
      title: "Stone Selling System",
      icon: FileText,
      action: () => window.open('/attached_assets/Compressed_Stone Selling System Digital Presentation.pdf', '_blank'),
      buttonText: "View"
    },
    {
      title: "Buyer Presentation",
      icon: FileText,
      action: () => window.open('/attached_assets/Compressed_SRG Buyer Presentation.pdf', '_blank'),
      buttonText: "View"
    },

  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Agent Resources</h1>
            <div className="w-24"></div> {/* Spacer for center alignment */}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">

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