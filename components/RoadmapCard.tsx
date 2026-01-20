type Props = {
  priority: string;
  plan: string[];
  errors: string[];
};

export default function RoadmapCard({ priority, plan, errors }: Props) {
  return (
    <div className="border rounded p-4 mt-6">
      <h2 className="text-xl font-bold mb-2">
        Priorité : {priority}
      </h2>

      <ul className="mb-4">
        {plan.map((step, i) => (
          <li key={i}>• {step}</li>
        ))}
      </ul>

      <p className="font-semibold">Erreurs à éviter :</p>
      <ul>
        {errors.map((e, i) => (
          <li key={i}>⚠️ {e}</li>
        ))}
      </ul>
    </div>
  );
}
