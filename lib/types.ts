export interface Game {
  id: string;
  homeTeam: {
    name: string;
    abbreviation: string;
    logo: string;
    record: string;
  };
  awayTeam: {
    name: string;
    abbreviation: string;
    logo: string;
    record: string;
  };
  gameTime: string;
  venue: string;
  predictions: {
    openai: string;
    anthropic: string;
    grok: string;
    deepseek: string;
  };
}
