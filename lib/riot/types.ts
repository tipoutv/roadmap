export type RiotAccount = {
  puuid: string;
  gameName: string;
  tagLine: string;
};

export type RiotMatch = {
  metadata: {
    matchid: string;
  };
  info: {
    teams: {
      teamId: string;
      won: boolean;
    }[];
    players: {
      puuid: string;
      teamId: string;
    }[];
  };
};
