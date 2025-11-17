"use client";

import { useState, useMemo } from "react";
import { useScrollAnimation } from "../hooks/use-scroll-animation";
import { Search, Filter, Plus } from "lucide-react";
import ProductCard from "./product-card";
import AddProductModal from "./add-product-modal";
import { Button } from "antd";
// import Button from "@/components/ui/button"

// Sample product data
const products = [
  {
    id: 1,
    name: "Aura",
    category: "Handles",
    price: 89.99,
    originalPrice: 120.0,
    rating: 4.8,
    reviews: 124,
    image: "/Images/PRODUCT NAME-_20250905_154059_0000.jpg",
    isOnSale: true,
    isFeatured: true,
    description: "Elevate your home's first impression with the Aura main Door",
  },
  {
    id: 2,
    name: "Glass Sunmica Door",
    category: "Door Locks",
    price: 299.99,
    rating: 4.9,
    reviews: 89,
    image: "/Images/PRODUCT NAME - THE NATURE TONE_20250905_152610_0000.jpg",
    isOnSale: false,
    isFeatured: true,
    description: "Sunmica Door: A perfect blend of style and durablity",
  },
  {
    id: 3,
    name: "Chocolate Groove",
    category: "Door Hinges",
    price: 45.99,
    originalPrice: 65.0,
    rating: 4.7,
    reviews: 156,
    image: "/Images/1_20250904_232041_0000.png",
    isOnSale: true,
    isFeatured: false,
    description: "Exquisite Chocolate Veneer Door by Aditya Doors",
  },
  {
    id: 4,
    name: "Teak Wood Door Frame",
    category: "Doors",
    price: 899.99,
    rating: 4.6,
    reviews: 67,
    image:
      "/Images/TEAK WOOD(SAGWAN) DOOR FRAME(CHOKHAT)_20250904_234508_0001.jpg",
    isOnSale: false,
    isFeatured: true,
    description:
      "Aditya Doors proudly presents our exquisite Teak Wood Door Frame, also known as Sagwan Chokhat",
  },
  {
    id: 5,
    name: "Double Glazed Window",
    category: "Windows",
    price: 549.99,
    originalPrice: 699.99,
    rating: 4.8,
    reviews: 203,
    image: "/product-window-1.png",
    isOnSale: true,
    isFeatured: true,
    description: "Energy-efficient double glazed window with aluminum frame",
  },
  {
    id: 6,
    name: "Keyless Entry Pad",
    category: "Keyless Entry",
    price: 199.99,
    rating: 4.5,
    reviews: 98,
    image: "/product-keypad-1.png",
    isOnSale: false,
    isFeatured: false,
    description: "Digital keypad entry system with weather resistance",
  },
  {
    id: 7,
    name: "Door Frame Hardware Kit",
    category: "Hardware",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.4,
    reviews: 76,
    image: "/product-hardware-1.png",
    isOnSale: true,
    isFeatured: false,
    description: "Complete hardware kit for door installation",
  },
  {
    id: 8,
    name: "LED Door Light Fixture",
    category: "Fixtures",
    price: 79.99,
    rating: 4.6,
    reviews: 134,
    image: "/product-fixture-1.png",
    isOnSale: false,
    isFeatured: false,
    description: "Modern LED light fixture for door entrance",
  },
  {
    id: 9,
    name: "Glass Panel Door",
    category: "Doors",
    price: 1299.99,
    rating: 4.9,
    reviews: 45,
    image: "/product-door-2.png",
    isOnSale: false,
    isFeatured: true,
    description: "Contemporary glass panel door with aluminum frame",
  },
  {
    id: 10,
    name: "Biometric Door Lock",
    category: "Door Locks",
    price: 449.99,
    originalPrice: 549.99,
    rating: 4.7,
    reviews: 112,
    image: "/product-lock-2.png",
    isOnSale: true,
    isFeatured: true,
    description: "Advanced biometric fingerprint door lock system",
  },
];

const categories = [
  { name: "All Products", count: products.length },
  {
    name: "Door Hinges",
    count: products.filter((p) => p.category === "Door Hinges").length,
  },
  {
    name: "Door Locks",
    count: products.filter((p) => p.category === "Door Locks").length,
  },
  {
    name: "Doors",
    count: products.filter((p) => p.category === "Doors").length,
  },
  {
    name: "Fixtures",
    count: products.filter((p) => p.category === "Fixtures").length,
  },
  {
    name: "Handles",
    count: products.filter((p) => p.category === "Handles").length,
  },
  {
    name: "Hardware",
    count: products.filter((p) => p.category === "Hardware").length,
  },
  {
    name: "Keyless Entry",
    count: products.filter((p) => p.category === "Keyless Entry").length,
  },
  {
    name: "Windows",
    count: products.filter((p) => p.category === "Windows").length,
  },
];

export default function ProductsContent() {
  const [sectionRef, isVisible] = useScrollAnimation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("featured");
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "All Products") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        filtered.sort(
          (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0)
        );
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-cream-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div
              className={`bg-white rounded-lg shadow-lg p-6 sticky top-24 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 transform translate-x-0"
                  : "opacity-0 transform -translate-x-12"
              }`}
            >
              {/* Search Bar */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Search Products
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Categories
                </h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <button
                        onClick={() => setSelectedCategory(category.name)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-300 flex justify-between items-center ${
                          selectedCategory === category.name
                            ? "bg-gold text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <span>{category.name}</span>
                        <span className="text-sm">({category.count})</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sort Options */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Sort By
                </h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div
              className={`mb-6 flex justify-between items-center transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-8"
              }`}
            >
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory} ({filteredProducts.length} products)
                </h2>
                <div className="flex items-center space-x-2 text-gray-600 mt-1">
                  <Filter className="h-5 w-5" />
                  <span>Showing {filteredProducts.length} results</span>
                </div>
              </div>
              <Button
                onClick={() => setShowAddProductModal(true)}
                className="bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Product
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  isVisible={isVisible}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Add Product Modal */}
      {showAddProductModal && (
        <AddProductModal
          isOpen={showAddProductModal}
          onClose={() => setShowAddProductModal(false)}
          onProductAdded={(newProduct) => {
            // In a real app, this would update the products list
            console.log("New product added:", newProduct);
            alert("Product added successfully!");
          }}
        />
      )}
    </section>
  );
}
