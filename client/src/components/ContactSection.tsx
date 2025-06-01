import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { ContactFormData } from "@/lib/types";
import type { Agent } from "@shared/schema";

interface ContactSectionProps {
  agent: Agent;
}

export default function ContactSection({ agent }: ContactSectionProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interest: "",
    neighborhoods: "",
    message: "",
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createLeadMutation = useMutation({
    mutationFn: async (data: ContactFormData & { agentId: number }) => {
      return await apiRequest("POST", "/api/leads", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you! I'll get back to you within 2 hours.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        interest: "",
        neighborhoods: "",
        message: "",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/agents/${agent.id}/leads`] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or call me directly.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createLeadMutation.mutate({ ...formData, agentId: agent.id });
  };

  return (
    <section id="contact" className="py-16 lg:py-24 bg-gradient-to-br from-stone-blue to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Find Your Charlotte Home?
            </h2>
            
            <p className="text-xl text-blue-100 mb-8">
              Let's chat about your home goals! I'm here to guide you through every step of the process, 
              whether you're buying, selling, or just exploring your options.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <Phone className="text-stone-sky w-6 h-6 mr-4" />
                <span>{agent.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="text-stone-sky w-6 h-6 mr-4" />
                <span>{agent.email}</span>
              </div>
              <div className="flex items-center">
                <Clock className="text-stone-sky w-6 h-6 mr-4" />
                <span>Available 7 days a week</span>
              </div>
            </div>
            
            <Card className="bg-white/10 border-white/20">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 text-white">Quick Response Guarantee</h3>
                <p className="text-blue-100 text-sm">
                  I respond to all inquiries within 2 hours during business days, 
                  and within 4 hours on weekends. Your time is valuable!
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <Input
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <Input
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">I'm interested in...</label>
                  <Select value={formData.interest} onValueChange={(value) => setFormData({ ...formData, interest: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your interest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buying">Buying a home</SelectItem>
                      <SelectItem value="selling">Selling my home</SelectItem>
                      <SelectItem value="both">Both buying and selling</SelectItem>
                      <SelectItem value="valuation">Getting a home valuation</SelectItem>
                      <SelectItem value="exploring">Just exploring options</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Neighborhoods</label>
                  <Input
                    placeholder="e.g., Myers Park, Dilworth, South End"
                    value={formData.neighborhoods}
                    onChange={(e) => setFormData({ ...formData, neighborhoods: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <Textarea
                    rows={4}
                    placeholder="Tell me about your home goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-stone-blue text-white hover:bg-blue-800"
                  disabled={createLeadMutation.isPending}
                >
                  <Send className="mr-2 h-4 w-4" />
                  {createLeadMutation.isPending ? "Sending..." : "Send Message"}
                </Button>
                
                <div className="text-center text-sm text-gray-600">
                  <p>Or call/text me directly at <span className="font-semibold">{agent.phone}</span></p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
