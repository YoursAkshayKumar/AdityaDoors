"use client";

import { useScrollAnimation } from "../hooks/use-scroll-animation";
import { Award, Home } from "lucide-react";

export default function AboutStory() {
  const [sectionRef, isVisible] = useScrollAnimation();

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-cream-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Story Content */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 transform translate-x-0"
                : "opacity-0 transform -translate-x-12"
            }`}
          >
            <div className="inline-block bg-white px-4 py-1 border-l-4 border-gold mb-6">
              <span className="text-sm font-medium text-gold">OUR STORY</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Building Trust Through <span className="text-gold">Quality</span>
            </h2>

            <div className="space-y-4 text-gray-600 mb-8">
              <p>
                Founded in 1995 in Meerut, Uttar Pradesh, Windazo began as a
                small family business with a simple vision: to provide
                homeowners with the highest quality window and door solutions
                that combine functionality, beauty, and durability.
              </p>
              <p>
                What started as a local workshop has grown into one of North
                India most trusted names in window and door manufacturing. Our
                journey has been marked by continuous innovation, unwavering
                commitment to quality, and an ever-growing family of satisfied
                customers.
              </p>
              <p>
                Today, we proudly serve thousands of homes and businesses across
                India, maintaining the same values of craftsmanship, integrity,
                and customer satisfaction that our founders established over two
                decades ago.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">25+</div>
                <div className="text-gray-600">Years of Excellence</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold mb-2">5000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
            </div>
          </div>

          {/* Story Image */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 transform translate-x-0"
                : "opacity-0 transform translate-x-12"
            }`}
          >
            <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Home className="h-16 w-16 mx-auto mb-4" />
                  <p>Company Workshop & Showroom</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-gold p-6 rounded-lg">
              <Award className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
