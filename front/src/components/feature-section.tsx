import ProductionIcon from "./icons/production-icon";
import MeasurementIcon from "./icons/measurement-icon";
import InstallationIcon from "./icons/installation-icon";

const features = [
  {
    icon: <ProductionIcon />,
    title: "Own production",
    description:
      "We design and build everything in-house. This allows us to maintain strict quality control and offer fully customizable wood solutions tailored to your specific needs.",
  },
  {
    icon: <MeasurementIcon />,
    title: "Free measurement",
    description:
      "Let us handle the technical details. We provide free, professional measurements to guarantee accuracy before a single piece of wood is cut.",
  },
  {
    icon: <InstallationIcon />,
    title: "Quick installation",
    description:
      "Experience a hassle-free transformation. Our skilled team handles the heavy lifting and assembly, delivering a polished result in record time.",
  },
];

export default function FeatureSection() {
  return (
    <section
      className="bg-cream-50 py-16"
      style={{ backgroundColor: "#f2efea" }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="border border-gold p-4 transition-all duration-300 hover:bg-gold hover:bg-opacity-10">
                <div className="animate-pulse-slow">{feature.icon}</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-gold transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
