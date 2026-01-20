import { PlayerData } from "./types";

export const mockPlayer: PlayerData = {
  riotId: "Tiloup#Z3BR",
  rank: "Silver 2",
  matches: [
    {
      id: "1",
      map: "Ascent",
      agent: "Jett",
      result: "win",
      kills: 21,
      deaths: 15,
    },
    {
      id: "2",
      map: "Bind",
      agent: "Jett",
      result: "loss",
      kills: 14,
      deaths: 18,
    },
    {
      id: "3",
      map: "Haven",
      agent: "Reyna",
      result: "loss",
      kills: 12,
      deaths: 20,
    },
    {
      id: "4",
      map: "Ascent",
      agent: "Jett",
      result: "win",
      kills: 24,
      deaths: 13,
    },
    {
      id: "5",
      map: "Split",
      agent: "Reyna",
      result: "loss",
      kills: 10,
      deaths: 19,
    },
  ],
};
