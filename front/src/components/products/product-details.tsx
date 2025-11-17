"use client";

import { useState } from "react";
import { useScrollAnimation } from "../hooks/use-scroll-animation";
import {
  Star,
  ShoppingCart,
  Heart,
  Plus,
  Minus,
  Truck,
  Shield,
  RotateCcw,
  Award,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";
// import { Button } from "@/components/ui/button"
import Link from "next/link";
import InquiryModal from "./inquiry-modal";
import { Button, Image } from "antd";
// import { Button } from "antd"

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  isOnSale: boolean;
  isFeatured: boolean;
  description: string;
}

// Sample product data - in real app, this would come from API/database
const products: Product[] = [
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
    name: "Smart Door Lock System",
    category: "Door Locks",
    price: 299.99,
    rating: 4.9,
    reviews: 89,
    image: "/product-lock-1.png",
    isOnSale: false,
    isFeatured: true,
    description: "Advanced smart lock with keypad and mobile app control",
  },
  // Add more products as needed...
];

// Extended product data
const getExtendedProductData = (product: Product) => ({
  ...product,
  images: [
    product.image,
    `/product-${product.id}-2.png`,
    `/product-${product.id}-3.png`,
    `/product-${product.id}-4.png`,
  ],
  fullDescription: `${product.description}. This premium product is crafted with the finest materials and designed to meet the highest standards of quality and durability. Perfect for modern homes and commercial spaces, it combines functionality with aesthetic appeal. Our expert craftsmen ensure every detail meets our rigorous quality standards, providing you with a product that not only looks great but performs exceptionally for years to come.`,
  specifications: {
    Material: product.category.includes("Door")
      ? "Premium Steel/Wood"
      : "High-grade Aluminum",
    Finish: "Powder Coated",
    Warranty: "5-10 Years",
    Installation: "Professional Installation Included",
    Maintenance: "Low Maintenance Required",
    Certification: "ISO 9001 Certified",
    Dimensions: "Standard Size (Custom Available)",
    Weight: "Varies by Model",
  },
  features: [
    "Premium Quality Materials",
    "Weather Resistant",
    "Easy Installation",
    "Long-lasting Durability",
    "Modern Design",
    "Energy Efficient",
    "Corrosion Resistant",
    "Low Maintenance",
  ],
  inStock: true,
  stockCount: Math.floor(Math.random() * 50) + 10,
  shippingInfo: {
    freeShipping: product.price > 100,
    estimatedDelivery: "3-5 business days",
    returnPolicy: "30-day return policy",
  },
});

interface ProductDetailProps {
  productId: string;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const [sectionRef, isVisible] = useScrollAnimation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  // Find product by ID
  const product = products.find((p) => p.id === Number.parseInt(productId));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The product you are looking for does not exist.
          </p>
          <Link href="/products">
            <Button className="bg-gold hover:bg-gold-dark text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const extendedProduct = getExtendedProductData(product);

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, Math.min(10, quantity + change)));
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
    alert(`Added ${quantity} ${product.name}(s) to cart!`);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % extendedProduct.images.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) =>
        (prev - 1 + extendedProduct.images.length) %
        extendedProduct.images.length
    );
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gold">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-500 hover:text-gold">
              Products
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gold font-medium">
              {extendedProduct.name}
            </span>
          </nav>
        </div>
      </div>

      <section ref={sectionRef} className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/products">
              <Button
                //   variant="outline"
                className="mb-4 bg-transparent"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Left Side - Images */}
            <div
              className={`space-y-4 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 transform translate-x-0"
                  : "opacity-0 transform -translate-x-12"
              }`}
            >
              {/* Main Image */}
              <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      className="w-full"
                      // width={280}
                      // height={255}
                    />
                    {/* <div className="w-32 h-32 md:w-48 md:h-48 bg-gray-300 rounded-lg mx-auto mb-4"></div>
                    <p className="text-lg md:text-xl font-medium">
                      {product.name}
                    </p>
                    <p className="text-sm">Image {selectedImage + 1}</p> */}
                  </div>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-md transition-all duration-300"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-md transition-all duration-300"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {extendedProduct.isOnSale && (
                    <span className="bg-red-500 text-white px-3 py-1 text-sm font-bold rounded">
                      SALE
                    </span>
                  )}
                  {extendedProduct.isFeatured && (
                    <span className="bg-gold text-white px-3 py-1 text-sm font-bold rounded">
                      FEATURED
                    </span>
                  )}
                </div>

                {/* Image Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {extendedProduct.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        selectedImage === index
                          ? "bg-gold"
                          : "bg-white bg-opacity-50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-3">
                {extendedProduct.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-white rounded-lg border-2 transition-colors duration-300 shadow-sm ${
                      selectedImage === index
                        ? "border-gold"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-sm text-gray-500">{index + 1}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side - Product Details */}
            <div
              className={`space-y-6 transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 transform translate-x-0"
                  : "opacity-0 transform translate-x-12"
              }`}
            >
              {/* Product Header */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gold font-medium uppercase tracking-wide">
                    {extendedProduct.category}
                  </span>
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 rounded-full transition-colors duration-300 ${
                      isFavorite
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-red-500 hover:text-white"
                    }`}
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {extendedProduct.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(extendedProduct.rating)
                            ? "text-gold fill-gold"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {extendedProduct.rating} ({extendedProduct.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    ${extendedProduct.price}
                  </span>
                  {extendedProduct.originalPrice && (
                    <>
                      <span className="text-2xl text-gray-500 line-through">
                        ${extendedProduct.originalPrice}
                      </span>
                      <span className="bg-red-500 text-white px-3 py-1 text-sm font-bold rounded">
                        Save $
                        {(
                          extendedProduct.originalPrice - extendedProduct.price
                        ).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    extendedProduct.inStock ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <span
                  className={`font-medium ${
                    extendedProduct.inStock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {extendedProduct.inStock
                    ? `In Stock (${extendedProduct.stockCount} available)`
                    : "Out of Stock"}
                </span>
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 hover:bg-gray-100 transition-colors duration-300"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-4 py-2 font-medium">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 hover:bg-gray-100 transition-colors duration-300"
                      disabled={quantity >= 10}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!extendedProduct.inStock}
                    className="bg-gold hover:bg-gold-dark text-white py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg transition-all duration-300">
                    Buy Now
                  </Button>
                  <Button
                    onClick={() => setShowInquiryModal(true)}
                    // variant="outline"
                    className="border-gold text-gold hover:bg-gold hover:text-white py-3 rounded-lg transition-all duration-300"
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Inquiry
                  </Button>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-gold" />
                  <div>
                    <p className="font-medium">
                      {extendedProduct.shippingInfo.freeShipping
                        ? "Free Shipping"
                        : "Standard Shipping"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Estimated delivery:{" "}
                      {extendedProduct.shippingInfo.estimatedDelivery}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="h-5 w-5 text-gold" />
                  <div>
                    <p className="font-medium">Easy Returns</p>
                    <p className="text-sm text-gray-600">
                      {extendedProduct.shippingInfo.returnPolicy}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-gold" />
                  <div>
                    <p className="font-medium">Warranty Included</p>
                    <p className="text-sm text-gray-600">
                      {extendedProduct.specifications.Warranty} manufacturer
                      warranty
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-16">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200">
                <div className="flex space-x-8 px-6 overflow-x-auto">
                  {["description", "specifications", "features", "reviews"].map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-4 px-2 font-medium text-sm capitalize transition-colors duration-300 border-b-2 whitespace-nowrap ${
                          activeTab === tab
                            ? "border-gold text-gold"
                            : "border-transparent text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {tab}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === "description" && (
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {extendedProduct.fullDescription}
                    </p>
                  </div>
                )}

                {activeTab === "specifications" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(extendedProduct.specifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between py-3 border-b border-gray-100"
                        >
                          <span className="font-medium text-gray-900">
                            {key}:
                          </span>
                          <span className="text-gray-600">{value}</span>
                        </div>
                      )
                    )}
                  </div>
                )}

                {activeTab === "features" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {extendedProduct.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Award className="h-5 w-5 text-gold flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold">
                        Customer Reviews
                      </h3>
                      <Button className="bg-gold hover:bg-gold-dark text-white px-4 py-2 rounded-lg">
                        Write a Review
                      </Button>
                    </div>

                    {/* Sample Reviews */}
                    {[1, 2, 3].map((review) => (
                      <div
                        key={review}
                        className="border-b border-gray-200 pb-6"
                      >
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="h-4 w-4 text-gold fill-gold"
                              />
                            ))}
                          </div>
                          <span className="font-medium">Customer {review}</span>
                          <span className="text-sm text-gray-500">
                            2 days ago
                          </span>
                        </div>
                        <p className="text-gray-700">
                          Great product! Excellent quality and fast delivery.
                          Highly recommended for anyone looking for reliable{" "}
                          {extendedProduct.category.toLowerCase()}. The
                          installation was smooth and the team was very
                          professional.
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <InquiryModal
          product={extendedProduct}
          isOpen={showInquiryModal}
          onClose={() => setShowInquiryModal(false)}
        />
      )}
    </div>
  );
}
