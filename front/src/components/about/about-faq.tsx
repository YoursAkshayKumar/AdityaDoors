"use client";

import { useState } from "react";
import { useScrollAnimation } from "../hooks/use-scroll-animation";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    id: 1,
    question: "How long has Windazo been in business?",
    answer:
      "Windazo has been serving customers since 1995, making us one of the most experienced window and door companies in North India with over 25 years of expertise.",
  },
  {
    id: 2,
    question: "What types of products do you offer?",
    answer:
      "We offer a comprehensive range of products including wooden shutters, aluminum windows, plastic blinds, doors, door hardware, locks, handles, and various fixtures. All our products are custom-made to fit your specific requirements.",
  },
  {
    id: 3,
    question: "Do you provide installation services?",
    answer:
      "Yes, we provide complete installation services with our trained and experienced team. We also offer free measurement services to ensure perfect fit and professional installation with warranty coverage.",
  },
  {
    id: 4,
    question: "What areas do you serve?",
    answer:
      "While we're based in Meerut, Uttar Pradesh, we serve customers across India. We have a nationwide delivery network covering over 50 cities and provide installation services in major metropolitan areas.",
  },
  {
    id: 5,
    question: "Do you offer warranties on your products?",
    answer:
      "Yes, we provide comprehensive warranties on all our products. Our standard warranty covers manufacturing defects and includes up to 10 years coverage on select premium products, ensuring your peace of mind.",
  },
  {
    id: 6,
    question: "Can you create custom designs?",
    answer:
      "We specialize in custom solutions tailored to your specific needs, architectural requirements, and design preferences. Our design team works closely with you to create unique solutions that perfectly match your vision.",
  },
  {
    id: 7,
    question: "How can I get a quote for my project?",
    answer:
      "You can get a free quote by contacting us through our website, calling our customer service team, or visiting our showroom. We offer free consultations and measurements to provide accurate pricing for your project.",
  },
  {
    id: 8,
    question: "What makes Windazo different from competitors?",
    answer:
      "Our 25+ years of experience, commitment to quality, custom manufacturing capabilities, comprehensive warranty, 24/7 customer support, and proven track record with 5000+ satisfied customers set us apart in the industry.",
  },
];

export default function AboutFAQ() {
  const [sectionRef, isVisible] = useScrollAnimation();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-cream-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block bg-white px-4 py-1 border-l-4 border-gold mb-6">
            <span className="text-sm font-medium text-gold">FAQ</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked <span className="text-gold">Questions</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our products, services, and
            company. Can not find what you are looking for? Contact us directly.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className={`bg-white rounded-lg shadow-md transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-12"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  {openFAQ === faq.id ? (
                    <ChevronUp className="h-5 w-5 text-gold flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gold flex-shrink-0" />
                  )}
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFAQ === faq.id
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
