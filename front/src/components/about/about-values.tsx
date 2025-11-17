"use client";

import { useScrollAnimation } from "../hooks/use-scroll-animation";
import { Shield, Heart, Lightbulb, Users } from "lucide-react";

const values = [
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Quality First",
    description:
      "We never compromise on quality. Every product undergoes rigorous testing to ensure it meets our high standards.",
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Customer Care",
    description:
      "Our customers are at the heart of everything we do. We listen, understand, and deliver beyond expectations.",
  },
  {
    icon: <Lightbulb className="h-8 w-8" />,
    title: "Innovation",
    description:
      "We continuously innovate and adopt new technologies to provide cutting-edge solutions for modern homes.",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Teamwork",
    description:
      "Our success is built on the collective expertise and dedication of our talented team members.",
  },
];

export default function AboutValues() {
  const [sectionRef, isVisible] = useScrollAnimation();

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block bg-cream-50 px-4 py-1 border-l-4 border-gold mb-6">
            <span className="text-sm font-medium text-gold">OUR VALUES</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Drives <span className="text-gold">Us</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our core values guide every decision we make and every product we
            create, ensuring we deliver excellence in everything we do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`text-center transition-all duration-700 ${
                isVisible
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold text-white rounded-full mb-6">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
