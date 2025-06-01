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
    <section id="contact" className="py-10 lg:py-16 bg-gradient-to-br from-black to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in-left">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Make Your Move?
            </h2>
            
            <p className="text-xl text-gray-200 mb-8">
              Whether you're buying your first home, selling to upgrade, relocating to Charlotte, or exploring your options, 
              I'm here to guide you through every step. Let's discuss your real estate goals and find the perfect solution for you.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <Phone className="text-gray-300 w-6 h-6 mr-4" />
                <span>{agent.phone}</span>
              </div>
              <div className="flex items-center">
                <Clock className="text-gray-300 w-6 h-6 mr-4" />
                <span>Available 7 days a week</span>
              </div>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <Input
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <Input
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">I'm interested in...</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <Textarea
                    rows={3}
                    placeholder="Tell me about your home goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-black text-white hover:bg-gray-800"
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
