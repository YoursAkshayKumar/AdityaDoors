import ProductionIcon from "./icons/production-icon";
import MeasurementIcon from "./icons/measurement-icon";
import InstallationIcon from "./icons/installation-icon";

const features = [
  {
    icon: <ProductionIcon />,
    title: "Own production",
    description:
      "Proin rhoncus tincidunt tortor. Aenean non malesuada est, commodo dapibus ipsum.",
  },
  {
    icon: <MeasurementIcon />,
    title: "Free measurement",
    description:
      "Cras sagittis lectus eu congue, sit amet imperdiet est congue eget. Ut tempus bibendum.",
  },
  {
    icon: <InstallationIcon />,
    title: "Quick installation",
    description:
      "Quis enim nisi, fringilla non sodales et, hendrerit vel mauris. Donec eget tempus mauris.",
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
