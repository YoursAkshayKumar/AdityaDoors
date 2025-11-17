"use client";

import { useState, useEffect } from "react";
import { useScrollAnimation } from "../hooks/use-scroll-animation";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Arjun Mehta",
    position: "Homeowner, Delhi",
    image: "/testimonial-about-1.png",
    quote:
      "Windazo transformed our home with their beautiful wooden shutters. The quality is exceptional and the installation team was professional. Highly recommended!",
    rating: 5,
  },
  {
    id: 2,
    name: "Sunita Patel",
    position: "Interior Designer, Mumbai",
    image: "/testimonial-about-2.png",
    quote:
      "As an interior designer, I've worked with many window companies. Windazo stands out for their attention to detail and custom solutions. My clients love them!",
    rating: 5,
  },
  {
    id: 3,
    name: "Vikram Singh",
    position: "Business Owner, Gurgaon",
    image: "/testimonial-about-3.png",
    quote:
      "We chose Windazo for our office renovation. Their modern window solutions not only look great but also improved our energy efficiency significantly.",
    rating: 5,
  },
  {
    id: 4,
    name: "Kavya Sharma",
    position: "Architect, Bangalore",
    image: "/testimonial-about-4.png",
    quote:
      "Windazo's innovative designs and quality craftsmanship make them my go-to choice for all residential projects. They never disappoint!",
    rating: 5,
  },
];

export default function AboutTestimonials() {
  const [sectionRef, isVisible] = useScrollAnimation();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block bg-cream-50 px-4 py-1 border-l-4 border-gold mb-6">
            <span className="text-sm font-medium text-gold">TESTIMONIALS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our <span className="text-gold">Clients Say</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Do not just take our word for it. Here what our satisfied customers
            have to say about their experience with Windazo.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div
                    className={`bg-cream-50 p-8 rounded-lg relative transition-all duration-1000 ${
                      isVisible
                        ? "opacity-100 transform translate-y-0"
                        : "opacity-0 transform translate-y-12"
                    }`}
                  >
                    <Quote className="absolute top-4 left-4 h-8 w-8 text-gold opacity-50" />

                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <div className="flex justify-center md:justify-start mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < testimonial.rating
                                  ? "text-gold fill-gold"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>

                        <blockquote className="text-gray-700 text-lg mb-4 italic">
                          {testimonial.quote}
                        </blockquote>

                        <div>
                          <h4 className="text-xl font-bold text-gray-900">
                            {testimonial.name}
                          </h4>
                          <p className="text-gold font-medium">
                            {testimonial.position}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-3 rounded-full shadow-lg border border-gray-200 text-gray-600 hover:text-gold transition-all duration-300 z-10 ${
              isVisible
                ? "opacity-100 transform translate-x-0"
                : "opacity-0 transform -translate-x-8"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextSlide}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-3 rounded-full shadow-lg border border-gray-200 text-gray-600 hover:text-gold transition-all duration-300 z-10 ${
              isVisible
                ? "opacity-100 transform translate-x-0"
                : "opacity-0 transform translate-x-8"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 w-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-gold" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
