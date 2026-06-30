import Container from "../../../Components/layout/Container";
import FeatureCard from "./FeatureCard";

export default function FeatureGrid({ features }) {
  return (
    <section className="py-2">
        <div className="space-y-5">
          <h2 className="text-4xl font-bold">
            What's Included
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.desc}
              />
            ))}
          </div>
        </div>
    </section>
  );
}