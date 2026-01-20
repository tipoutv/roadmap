type Match = {
  result: "win" | "lose";
};

type Props = {
  matches: Match[];
};

export default function MatchHistory({ matches }: Props) {
  const wins = matches.filter((m) => m.result === "win").length;
  const winrate =
    matches.length > 0
      ? Math.round((wins / matches.length) * 100)
      : 0;

  return (
    <div className="border p-4 rounded space-y-2">
      <h3 className="font-semibold">
        Historique des matchs
      </h3>

      <p>
        Matchs : {matches.length} — Winrate : {winrate}%
      </p>

      <div className="flex gap-2">
        {matches.map((m, i) => (
          <span
            key={i}
            className={`px-2 py-1 rounded text-sm ${
              m.result === "win"
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {m.result === "win" ? "W" : "L"}
          </span>
        ))}
      </div>
    </div>
  );
}
