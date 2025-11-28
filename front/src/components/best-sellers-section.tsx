"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useScrollAnimation } from "./hooks/use-scroll-animation";
import { Image } from "antd";

// =======================================================
// 1. ADDED: TypeScript Interface for Product Data
// This defines the expected structure, preventing the 'never' type error.
// =======================================================
interface Product {
  // CRITICAL FIX: The unique MongoDB ID used for the React key
  _id: string; 
  title: string;
  image: string;
  description: string;
  onSale?: boolean; // Used in the conditional rendering check
  // Add other properties you use here for better type safety:
  // price: number;
  // category: { name: string; id: string; };
}
// =======================================================

export default function BestSellersSection() {
  const [sectionRef, isVisible] = useScrollAnimation();
  
  // =======================================================
  // 2. FIXED: Explicitly set the type to Product[] for the state
  // This resolves the Type error: Property '_id' does not exist on type 'never'.
  // =======================================================
  const [products, setProducts] = useState<Product[]>([]);
  // =======================================================
  
  const [loading, setLoading] = useState(true);

  // Replace with your backend URL
  const ENV_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://yourapi.com";
  const API_URL = ENV_URL + "/api/products/popular-products";

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        // Since data.products matches the Product[] type, this is safe
        setProducts(data.products); 
      } catch (error) {
        // Failed to fetch products
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="text-gold text-sm font-medium mb-2">Best Sellers</div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#3c2a21] mb-4">
            Popular Products
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Enhance the beauty and security of your home with our most popular
            and highly recommended premium doors and frames. Each product is
            crafted with expert detailing, elegant design, and long-lasting
            durability that customers truly value.
          </p>
        </div>

        {/* Product Loader */}
        {loading && (
          <div className="text-center py-10 text-gray-600">
            Loading products...
          </div>
        )}

        {/* Product Grid */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div
                // CRITICAL FIX: The key is now correctly typed as product._id (string)
                key={product._id} 
                className={`transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  {/* Note: TypeScript will now check if 'onSale' exists */}
                  {product?.onSale && (
                    <div className="absolute -top-4 -right-4 z-10 bg-red-500 text-white w-16 h-16 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">sale</span>
                    </div>
                  )}

                  <div className="relative h-64 mb-4 bg-gray-100 flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.title}
                      className="w-full"
                      height={255}
                    />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#3c2a21] text-center mb-2">
                  {product.title}
                </h3>

                <p className="text-gray-600 text-center text-sm mb-4">
                  {product.description.split(" ").length > 15
                    ? product.description.split(" ").slice(0, 15).join(" ") + "..." : product.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Load More */}
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