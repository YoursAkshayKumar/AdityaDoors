"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // WhatsApp number (replace with your actual number)
  const whatsappNumber = "918001234567"; // Format: country code + number (no + or spaces)
  const defaultMessage =
    "Hi! I'm interested in your window and door solutions. Can you help me?";

  useEffect(() => {
    // Show button after a short delay for better UX
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!isVisible) return null;

  return (
    <>
      {/* WhatsApp Button */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
          isVisible
            ? "opacity-100 transform translate-y-0"
            : "opacity-0 transform translate-y-12"
        }`}
      >
        <div className="relative">
          {/* Tooltip */}
          <div
            className={`absolute bottom-full right-0 mb-3 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap transition-all duration-300 ${
              isHovered
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-2 pointer-events-none"
            }`}
          >
            Chat with us on WhatsApp
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>

          {/* Main Button */}
          <button
            onClick={handleWhatsAppClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-pulse-slow"
            aria-label="Chat on WhatsApp"
          >
            {/* Ripple Effect */}
            <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>

            {/* WhatsApp Icon */}
            <MessageCircle className="h-6 w-6 relative z-10" />

            {/* Online Indicator */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse">
              <div className="w-full h-full bg-green-500 rounded-full animate-ping"></div>
            </div>
          </button>

          {/* Notification Badge */}
          <div className="absolute -top-2 -left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
            New
          </div>
        </div>
      </div>

      {/* Mobile Optimization - Larger button on small screens */}
      <style jsx>{`
        @media (max-width: 768px) {
          .whatsapp-mobile {
            bottom: 20px;
            right: 20px;
          }
        }
      `}</style>
    </>
  );
}
