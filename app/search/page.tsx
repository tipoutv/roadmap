import PlayerSearchForm from "@/components/PlayerSearchForm";

export default function SearchPage() {
  return (
    <div className="p-8 flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold">
        Recherche un joueur Valorant
      </h1>
      <PlayerSearchForm />
    </div>
  );
}
