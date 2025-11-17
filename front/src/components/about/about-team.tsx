"use client";

import { useScrollAnimation } from "../hooks/use-scroll-animation";
import { Linkedin, Twitter, Mail } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    position: "Founder & CEO",
    image: "/team-member-1.png",
    bio: "With over 25 years in the industry, Rajesh founded Windazo with a vision to revolutionize window solutions in India.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "rajesh@windazo.com",
    },
  },
  {
    id: 2,
    name: "Priya Sharma",
    position: "Head of Design",
    image: "/team-member-2.png",
    bio: "Priya brings 15 years of architectural design experience, ensuring our products meet both aesthetic and functional needs.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "priya@windazo.com",
    },
  },
  {
    id: 3,
    name: "Amit Singh",
    position: "Production Manager",
    image: "/team-member-3.png",
    bio: "Amit oversees our manufacturing processes, ensuring every product meets our stringent quality standards.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "amit@windazo.com",
    },
  },
  {
    id: 4,
    name: "Neha Gupta",
    position: "Customer Relations",
    image: "/team-member-4.png",
    bio: "Neha leads our customer service team, ensuring every client receives exceptional support throughout their journey.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "neha@windazo.com",
    },
  },
];

export default function AboutTeam() {
  const [sectionRef, isVisible] = useScrollAnimation();

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-cream-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block bg-white px-4 py-1 border-l-4 border-gold mb-6">
            <span className="text-sm font-medium text-gold">OUR TEAM</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our <span className="text-gold">Experts</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our dedicated team of professionals brings together decades of
            experience in design, manufacturing, and customer service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden group transition-all duration-700 hover:shadow-xl ${
                isVisible
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative h-64 bg-gray-200 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-gold rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-gold font-medium mb-3">{member.position}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>

                <div className="flex space-x-3">
                  <a
                    href={member.social.linkedin}
                    className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gold hover:text-white transition-colors duration-300"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gold hover:text-white transition-colors duration-300"
                  >
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gold hover:text-white transition-colors duration-300"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
