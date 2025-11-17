"use client";

import { useScrollAnimation } from "../hooks/use-scroll-animation";
import { Award, Users, MapPin, Clock } from "lucide-react";

const stats = [
  {
    icon: <Award className="h-8 w-8" />,
    number: "25+",
    label: "Years Experience",
    description: "Serving customers since 1995",
  },
  {
    icon: <Users className="h-8 w-8" />,
    number: "5000+",
    label: "Happy Customers",
    description: "Satisfied clients across India",
  },
  {
    icon: <MapPin className="h-8 w-8" />,
    number: "50+",
    label: "Cities Served",
    description: "Nationwide delivery network",
  },
  {
    icon: <Clock className="h-8 w-8" />,
    number: "24/7",
    label: "Customer Support",
    description: "Always here to help you",
  },
];

export default function AboutStats() {
  const [sectionRef, isVisible] = useScrollAnimation();

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-[#2a1c16] text-white"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-gold">Achievements</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Numbers that reflect our commitment to excellence and the trust our
            customers place in us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${
                isVisible
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold text-white rounded-full mb-6">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-gold mb-2">
                {stat.number}
              </div>
              <div className="text-xl font-semibold mb-2">{stat.label}</div>
              <div className="text-gray-400 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
