export function getMockPlayer(riotId: string) {
  return {
    riotId,
    rank: "Silver",
    role: "Duelist",
  };
}

export function getMockMatches() {
  return [
    { result: "win", agent: "Jett", map: "Ascent" },
    { result: "lose", agent: "Jett", map: "Bind" },
  ];
}
