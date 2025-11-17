"use client";

import Link from "next/link";
// import { Button } from "antd";
import { useScrollAnimation } from "./hooks/use-scroll-animation";
// import { Image } from "antd";
// import DoorProduct from "./icons/door-product";
// import Doorim from "../Images/PRODUCT NAME - THE NATURE TONE_20250905_152610_0000.jpg";
// import DoorProductTwo from "./icons/door-producttwo";
// import Image from "next/image";
import { Image } from "antd";

const products = [
  {
    id: 1,
    name: "Aura",
    description: "Elevate your home's first impression with the Aura main Door",
    originalPrice: 19.0,
    price: 14.0,
    image: "/Images/PRODUCT NAME-_20250905_154059_0000.jpg",
    onSale: true,
  },
  {
    id: 2,
    name: "Glass Sunmica Door",
    description: "Sunmica Door: A perfect blend of style and durablity",
    price: 39.0,
    image: "/Images/PRODUCT NAME - THE NATURE TONE_20250905_152610_0000.jpg",
    onSale: false,
  },
  {
    id: 3,
    name: "Chocolate Groove",
    description: "Exquisite Chocolate Veneer Door by Aditya Doors",
    price: 19.0,
    image: "/Images/1_20250904_232041_0000.png",
    onSale: false,
  },
  {
    id: 4,
    name: "Teak Wood Door Frame",
    description:
      "Aditya Doors proudly presents our exquisite Teak Wood Door Frame, also known as Sagwan Chokhat",
    originalPrice: 49.0,
    price: 39.0,
    image:
      "/Images/TEAK WOOD(SAGWAN) DOOR FRAME(CHOKHAT)_20250904_234508_0001.jpg",
    onSale: true,
  },
];

export default function BestSellersSection() {
  const [sectionRef, isVisible] = useScrollAnimation();

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <div className="text-gold text-sm font-medium mb-2">Best Sellers</div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#3c2a21] mb-4">
            Popular Products
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Curabitur accumsan iaculis neque, sit amet scelerisque eros.
            Phasellus hendrerit neque a augue scelerisque, eu mollis mauris
            bibendum. Etiam vitae metus amet scelerisque eros id eros facilisis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`transition-all duration-700 ${
                isVisible
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative">
                {product.onSale && (
                  <div className="absolute -top-4 -right-4 z-10 bg-red-500 text-white w-16 h-16 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">sale</span>
                  </div>
                )}
                <div className="relative h-64 mb-4 bg-gray-100 flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    className="w-full"
                    // width={280}
                    height={255}
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#3c2a21] text-center mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600 text-center text-sm mb-4">
                {product.description}
              </p>

              {/* <div className="flex justify-center items-center mb-4">
                {product.originalPrice ? (
                  <>
                    <span className="text-gray-400 line-through mr-2">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span
                      className="text-[#3c2a21] font-bold"
                      style={{ color: "red" }}
                    >
                      ${product.price.toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="text-[#3c2a21] font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div> */}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <Link href="/products" className="text-white hover:text-gold">
            <button
              className="bg-gold hover:bg-gold-dark text-white px-6 py-2 rounded-none transition-all duration-300"
              style={{ cursor: "pointer" }}
            >
              Load More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
