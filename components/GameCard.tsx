import React from 'react';
import { Game } from '../lib/types';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { homeTeam, awayTeam, gameTime, venue, predictions } = game;
  
  // Format the game time
  const formattedTime = new Date(gameTime).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  });

  return (
    <div className="card p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <img 
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}${awayTeam.logo}`} 
            alt={`${awayTeam.name} logo`}
            className="team-logo mr-2"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `${process.env.NEXT_PUBLIC_BASE_PATH}/team-logos/default.svg`;
            }}
          />
          <div>
            <h3 className="font-bold">{awayTeam.name}</h3>
            <p className="text-sm text-gray-600">{awayTeam.record}</p>
          </div>
        </div>
        <div className="text-center">
          <span className="text-xl font-bold">@</span>
        </div>
        <div className="flex items-center">
          <div className="text-right mr-2">
            <h3 className="font-bold">{homeTeam.name}</h3>
            <p className="text-sm text-gray-600">{homeTeam.record}</p>
          </div>
          <img 
            src={`${process.env.NEXT_PUBLIC_BASE_PATH}${homeTeam.logo}`} 
            alt={`${homeTeam.name} logo`}
            className="team-logo"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `${process.env.NEXT_PUBLIC_BASE_PATH}/team-logos/default.svg`;
            }}
          />
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-700"><strong>Time:</strong> {formattedTime}</p>
        <p className="text-sm text-gray-700"><strong>Venue:</strong> {venue}</p>
      </div>
      
      <div className="border-t pt-3">
        <h4 className="font-semibold mb-2">Predictions</h4>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-blue-600">OpenAI:</p>
            <p className="text-sm text-gray-700">{predictions.openai}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-purple-600">Anthropic:</p>
            <p className="text-sm text-gray-700">{predictions.anthropic}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-green-600">Grok:</p>
            <p className="text-sm text-gray-700">{predictions.grok}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-orange-600">DeepSeek:</p>
            <p className="text-sm text-gray-700">{predictions.deepseek}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
