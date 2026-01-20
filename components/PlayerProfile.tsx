import { RoadmapResult } from "@/lib/engine/types";

type Props = {
  roadmap: RoadmapResult;
  iaScore: number;
  isPremium: boolean;
};

export default function PlayerProfile({
  roadmap,
  iaScore,
  isPremium,
}: Props) {
  return (
    <section className="space-y-8">
      {/* IA SCORE */}
      <div className="rounded-xl border border-neutral-800 p-6 bg-gradient-to-br from-neutral-900 to-neutral-800">
        <p className="text-sm text-neutral-400">IA Score</p>
        <p className="text-4xl font-bold text-white">
          {iaScore}
          <span className="text-neutral-400 text-lg"> / 100</span>
        </p>
        <p className="text-xs text-neutral-500 mt-2">
          Estimation basée sur winrate, KDA et rank
        </p>
      </div>

      {/* ROADMAP */}
      <div>
        <h2 className="text-xl font-bold mb-4">Training roadmap</h2>

        <div className="grid gap-4">
          {roadmap.steps.map((step, i) => (
            <div
              key={i}
              className="relative rounded-lg border border-neutral-800 p-4 bg-neutral-900 hover:scale-[1.01] transition-transform"
            >
              <h3 className="font-semibold text-white">
                {step.title}
              </h3>
              <p className="text-sm text-neutral-300">
                {step.description}
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                {step.frequency}
              </p>

              {/* PREMIUM LOCK */}
              {step.premium && !isPremium && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center rounded-lg">
                  <p className="text-yellow-400 font-semibold">
                    🔒 Premium
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RULES */}
      <div>
        <h2 className="text-xl font-bold mb-4">Coaching tips</h2>

        <div className="grid gap-3">
          {roadmap.rules.map((rule, i) => (
            <div
              key={i}
              className="rounded-lg border border-neutral-800 p-3 bg-neutral-900"
            >
              <h4 className="font-medium text-white">
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
