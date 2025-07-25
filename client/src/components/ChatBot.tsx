import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { ChatMessage } from "@/lib/types";
import mackenziePhoto from "@assets/Mackenzie.jpg";

interface ChatBotProps {
  agentName: string;
  agentId: number;
}

export default function ChatBot({ agentName, agentId }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hi there! I'm Mackenzie with Stone Realty Group. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(`session_${agentId}_${Date.now()}`);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const messageText = inputValue;
    const userMessage: ChatMessage = {
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          agentId,
          message: messageText,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      
      // Get the latest assistant message from the session
      const latestMessage = data.messages[data.messages.length - 1];
      
      if (latestMessage && latestMessage.role === 'assistant') {
        const botResponse: ChatMessage = {
          role: "assistant",
          content: latestMessage.content,
          timestamp: new Date(latestMessage.timestamp),
        };

        setMessages(prev => [...prev, botResponse]);
      }
      
      // Mark that the first message has been sent
      if (isFirstMessage) {
        setIsFirstMessage(false);
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorResponse: ChatMessage = {
        role: "assistant",
        content: `I'm having trouble connecting right now. For immediate assistance, please call ${agentName} directly or fill out the contact form.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorResponse]);
      
      // Mark that the first message has been sent even on error
      if (isFirstMessage) {
        setIsFirstMessage(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {!isOpen ? (
        <div className="relative cursor-pointer" onClick={() => setIsOpen(true)}>
          <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden shadow-lg border-4 border-green-400" style={{animation: 'pulse 3s ease-in-out infinite'}}>
            <img 
              src={mackenziePhoto} 
              alt="Chat with Mackenzie"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
      ) : (
        <Card className="w-72 h-80 sm:w-80 sm:h-96 shadow-2xl max-w-[calc(100vw-2rem)]">
          <CardHeader className="bg-stone-blue text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Chat with {agentName}</h3>
                <p className="text-sm text-blue-100">Ask me about Charlotte real estate!</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-80">
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-xs p-3 rounded-lg text-sm ${
                    message.role === "user" 
                      ? "bg-black text-white" 
                      : "bg-gray-100 text-gray-900"
                  }`}>
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 max-w-xs p-3 rounded-lg text-sm flex items-center space-x-1">
                    <span>Typing</span>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-gray-600 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-1 h-1 bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder=""
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  size="sm"
                  className="bg-stone-blue hover:bg-blue-800"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
