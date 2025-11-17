"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X, Send, User, Clock } from "lucide-react";
import { Button } from "antd";
// import { Button } from "@/components/ui/button"

export default function WhatsAppChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");

  // WhatsApp number and business info
  const whatsappNumber = "918001234567";
  const businessName = "Aditya";
  const businessHours = "Mon-Fri: 8:00-18:00, Sat: 9:00-16:00";
  const responseTime = "Typically replies within an hour";

  const quickMessages = [
    "I need a quote for windows",
    "What are your installation services?",
    "I want to schedule a consultation",
    "Tell me about your products",
    "What are your business hours?",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = (customMessage?: string) => {
    const messageToSend =
      customMessage || message || "Hi! I'm interested in your services.";
    const encodedMessage = encodeURIComponent(messageToSend);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    setMessage("");
    setIsOpen(false);
  };

  const handleQuickMessage = (quickMsg: string) => {
    handleSendMessage(quickMsg);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Widget */}
      {isOpen && (
        <div className="mb-4 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 animate-fade-in-up">
          {/* Header */}
          <div className="bg-green-500 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{businessName}</h3>
                  <div className="flex items-center space-x-1 text-xs opacity-90">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                    <span>Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="p-4 max-h-80 overflow-y-auto">
            {/* Welcome Message */}
            <div className="mb-4">
              <div className="bg-gray-100 rounded-lg p-3 mb-2">
                <p className="text-sm text-gray-800">
                  👋 Hi there! Welcome to {businessName}. How can we help you
                  today?
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{responseTime}</span>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800 font-medium">
                Business Hours
              </p>
              <p className="text-xs text-blue-600">{businessHours}</p>
            </div>

            {/* Quick Messages */}
            <div className="space-y-2 mb-4">
              <p className="text-xs font-medium text-gray-600">
                Quick messages:
              </p>
              {quickMessages.map((quickMsg, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickMessage(quickMsg)}
                  className="w-full text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 border border-gray-200"
                >
                  {quickMsg}
                </button>
              ))}
            </div>

            {/* Custom Message Input */}
            <div className="space-y-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-sm"
              />
              <Button
                onClick={() => handleSendMessage()}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        aria-label="Open WhatsApp Chat"
      >
        {/* Ripple Effect */}
        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>

        {/* Icon */}
        {isOpen ? (
          <X className="h-6 w-6 relative z-10" />
        ) : (
          <MessageCircle className="h-6 w-6 relative z-10" />
        )}

        {/* Online Indicator */}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white">
            <div className="w-full h-full bg-green-500 rounded-full animate-pulse"></div>
          </div>
        )}

        {/* Notification Badge */}
        {!isOpen && (
          <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
            Chat
          </div>
        )}
      </button>
    </div>
  );
}
