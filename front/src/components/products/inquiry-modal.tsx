"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { X, MessageSquare, User, Mail, Phone, Send } from "lucide-react";
import { Button } from "antd";
// import { Button } from "@/components/ui/button"

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

interface InquiryModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function InquiryModal({
  product,
  isOpen,
  onClose,
}: InquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    inquiryType: "general",
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Pre-fill subject with product name
      setFormData((prev) => ({
        ...prev,
        subject: `Inquiry about ${product.name}`,
        message: `Hi, I'm interested in learning more about the ${product.name}. Could you please provide more details about pricing, availability, and installation?`,
      }));
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, product.name]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Inquiry submitted:", { ...formData, productId: product.id });
    alert(
      "Thank you for your inquiry! Our team will contact you within 24 hours."
    );
    onClose();
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      inquiryType: "general",
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-300"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="bg-[#2a1c16] text-white p-6 rounded-t-lg">
            <div className="flex items-center space-x-3 mb-4">
              <MessageSquare className="h-6 w-6 text-gold" />
              <h2 className="text-2xl font-bold">Product Inquiry</h2>
            </div>
            <div className="bg-[#3c2a21] rounded-lg p-4">
              <h3 className="font-semibold text-gold mb-1">{product.name}</h3>
              <p className="text-gray-300 text-sm">
                {product.category} • ${product.price}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Inquiry Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inquiry Type
                </label>
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                >
                  <option value="general">General Information</option>
                  <option value="pricing">Pricing & Quotes</option>
                  <option value="availability">Availability</option>
                  <option value="installation">Installation Services</option>
                  <option value="customization">Customization Options</option>
                  <option value="warranty">Warranty & Support</option>
                </select>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name *"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email *"
                    required
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                  />
                </div>
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject *"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please describe your inquiry in detail..."
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent resize-none"
                />
              </div>

              {/* Additional Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">
                  What happens next?
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Our product specialist will review your inquiry</li>
                  <li>• You will receive a response within 24 hours</li>
                  <li>• We will provide detailed information and pricing</li>
                  <li>• Free consultation and measurement available</li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  typeof="submit"
                  className="flex-1 bg-gold hover:bg-gold-dark text-white py-3 rounded-lg transition-all duration-300 flex items-center justify-center"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send Inquiry
                </Button>
                <Button
                  typeof="button"
                  //   type="button"
                  onClick={onClose}
                  //   variant="outline"
                  className="flex-1 sm:flex-none sm:px-8 py-3 rounded-lg bg-transparent"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 rounded-b-lg">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>0 (800) 255-52-38</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@Adityadoor.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
