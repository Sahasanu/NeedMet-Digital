import PlanCard from "./PlanCard";

export default function PlanSelector({
  plans,
  selectedPlanId,
  onSelect,
  basePrice,
}) {
  return (
    <section className="py-2">
     
        <div className="space-y-8">
          <h2 className="text-4xl font-bold">
            Select Duration
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                title={plan.name}
                plan={plan}
                basePrice={plan.price}
                selected={selectedPlanId === plan.id}
                onSelect={() => onSelect(plan.id)}
              />
            ))}
          </div>
        </div>
      
    </section>
  );
}