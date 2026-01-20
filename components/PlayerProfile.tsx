import { RoadmapResult } from "@/lib/engine/types";

type Props = {
  roadmap: RoadmapResult;
};

export default function PlayerProfile({ roadmap }: Props) {
  return (
    <section className="space-y-6">
      {/* PRIORITY */}
      <div>
        <h2 className="text-xl font-bold">Focus</h2>
        <p className="text-neutral-300">{roadmap.priority}</p>
        <p className="text-sm text-neutral-400">
          Winrate: {roadmap.winrate}%
        </p>
      </div>

      {/* ROADMAP STEPS */}
      <div>
        <h2 className="text-xl font-bold mb-2">Training plan</h2>
        <div className="space-y-3">
          {roadmap.steps.map((step, i) => (
            <div
              key={i}
              className="border border-neutral-800 rounded-lg p-4"
            >
              <h3 className="font-semibold">
                {step.title}
                {step.premium && (
                  <span className="ml-2 text-xs text-yellow-400">
                    PREMIUM
                  </span>
                )}
              </h3>
              <p className="text-sm text-neutral-300">
                {step.description}
              </p>
              <p className="text-xs text-neutral-500">
                {step.frequency}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RULES */}
      <div>
        <h2 className="text-xl font-bold mb-2">Coaching tips</h2>
        <div className="space-y-2">
          {roadmap.rules.map((rule, i) => (
            <div
              key={i}
              className="border border-neutral-800 rounded-lg p-3"
            >
              <h4 className="font-medium">
                {rule.title}
                {rule.premium && (
                  <span className="ml-2 text-xs text-yellow-400">
                    PREMIUM
                  </span>
                )}
              </h4>
              <p className="text-sm text-neutral-400">
                {rule.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
