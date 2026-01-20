"use client";

import { useState } from "react";

type Props = {
  onAdd: (result: "win" | "lose") => void;
};

export default function AddMatchForm({ onAdd }: Props) {
  const [result, setResult] = useState<"win" | "lose">("win");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onAdd(result);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <select
        value={result}
        onChange={(e) => setResult(e.target.value as "win" | "lose")}
        className="border p-2"
      >
        <option value="win">Victoire</option>
        <option value="lose">Défaite</option>
      </select>

      <button className="bg-red-600 text-white px-4 rounded">
        Ajouter
      </button>
    </form>
  );
}
