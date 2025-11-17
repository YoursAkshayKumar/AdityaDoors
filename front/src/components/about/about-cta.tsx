"use client";

import { Button } from "antd";
import { useScrollAnimation } from "../hooks/use-scroll-animation";
// import { Button } from "@/components/ui/button"
import { Phone, Mail, ArrowRight } from "lucide-react";

export default function AboutCTA() {
  const [sectionRef, isVisible] = useScrollAnimation();

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-[#2a1c16] text-white"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-8"
            }`}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Work <span className="text-gold">With Us?</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have transformed their
              spaces with Windazo. Let us discuss your next project today.
            </p>
          </div>

          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-12"
            }`}
          >
            <Button className="bg-gold hover:bg-gold-dark text-white px-6 py-4 rounded-none transition-all duration-300 flex items-center justify-center text-lg">
              <Phone className="mr-2 h-5 w-5" />
              Call Us
            </Button>
            <Button className="bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-white px-6 py-4 rounded-none transition-all duration-300 flex items-center justify-center text-lg">
              <Mail className="mr-2 h-5 w-5" />
              Email Us
            </Button>
            <Button className="bg-white text-[#2a1c16] hover:bg-gray-100 px-6 py-4 rounded-none transition-all duration-300 flex items-center justify-center text-lg">
              <span>Visit Showroom</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div
            className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-12"
            }`}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-2">25+</div>
              <div className="text-gray-300">Years of Trust</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-2">5000+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-2">24/7</div>
              <div className="text-gray-300">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
