"use client";

import { ChevronRight } from "lucide-react";
// import LegacyImage from "./legacy-image"
import { useScrollAnimation } from "./hooks/use-scroll-animation";
// import { Image } from "antd";
import DoorImage from "./icons/door-image";
// import DoorProduct from "./icons/door-product";

export default function LegacySection() {
  const [sectionRef, isVisible] = useScrollAnimation();

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div
            className={`relative h-[400px] md:h-[500px] transition-all duration-1000 ${
              isVisible
                ? "opacity-100 transform translate-x-0"
                : "opacity-0 transform -translate-x-12"
            }`}
          >
            {/* <div className="absolute inset-0 border-2 border-gold m-8 z-10"></div> */}
            <div
              className="relative h-full w-full"
              // style={{ height: "400px", width: "500px" }}
            >
              <DoorImage />
              {/* <DoorProduct /> */}
              {/* <Image
                alt="image"
                src="http://windazo.like-themes.com/wp-content/uploads/2018/02/blog_03-1120x720.jpg"
              /> */}
            </div>
          </div>

          <div
            className={`space-y-6 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 transform translate-x-0"
                : "opacity-0 transform translate-x-12"
            }`}
          >
            <div className="inline-block bg-cream-50 px-4 py-1 border-l-4 border-gold">
              <span className="text-sm font-medium text-gold">SINCE 1995</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Our Legacy of <span className="text-gold">Excellence</span>
            </h2>
            <p className="text-gray-600">
              For over 25 years, Windazo has been at the forefront of window
              treatment innovation. Our journey began with a simple mission: to
              create beautiful, functional window solutions that transform
              spaces and enhance lives.
            </p>
            <p className="text-gray-600">
              Today, we continue to uphold our commitment to quality
              craftsmanship, innovative design, and exceptional customer
              service. Every product we create is a testament to our dedication
              to excellence and our passion for enhancing your home.
            </p>
            <div className="pt-4">
              <button className="flex items-center bg-brown-900 hover:bg-gray-900 text-white px-6 py-3 rounded-none transition-transform duration-300 hover:translate-y-[-4px] home-btn">
                OUR STORY <ChevronRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
