"use client";

import { useScrollAnimation } from "../hooks/use-scroll-animation";

export default function AboutHero() {
  const [sectionRef, isVisible] = useScrollAnimation();

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#2a1c16] py-24 md:py-32 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/about-hero-bg.png')",
          }}
        ></div>
        <div className="absolute inset-0 bg-[#2a1c16] bg-opacity-75"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div
            className={`inline-block bg-gold px-4 py-1 text-white text-sm font-medium mb-6 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-8"
            }`}
          >
            ABOUT ADITYA
          </div>

          <h1
            className={`text-4xl md:text-6xl font-bold text-white mb-6 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-12"
            }`}
          >
            Crafting Excellence <span className="text-gold">Since 1995</span>
          </h1>

          <p
            className={`text-xl text-gray-300 max-w-2xl mx-auto transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-12"
            }`}
          >
            For over 25 years, Aditya has been transforming homes and businesses
            with premium window and door solutions, combining traditional
            craftsmanship with modern innovation.
          </p>
        </div>
      </div>
    </section>
  );
}
