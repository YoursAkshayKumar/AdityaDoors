"use client";

import { useScrollAnimation } from "../hooks/use-scroll-animation";

export default function ProductsHero() {
  const [sectionRef, isVisible] = useScrollAnimation();

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#2a1c16] py-16 md:py-24 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gold to-transparent"></div>
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
            OUR PRODUCTS
          </div>

          <h1
            className={`text-4xl md:text-6xl font-bold text-white mb-6 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-12"
            }`}
          >
            Premium <span className="text-gold">Products</span>
          </h1>

          <p
            className={`text-xl text-gray-300 max-w-2xl mx-auto transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-12"
            }`}
          >
            Discover our extensive collection of high-quality doors, windows,
            and hardware solutions designed to enhance your space.
          </p>
        </div>
      </div>
    </section>
  );
}
