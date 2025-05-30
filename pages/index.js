import React from 'react';
import { staticGames } from '../lib/staticData';
import GameCard from '../components/GameCard';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Today&apos;s MLB Games</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Game Date</h2>
        <p className="text-gray-700">Friday, May 23, 2025</p>
        
        <div className="flex space-x-2 mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Previous Day
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Today
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Next Day
          </button>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Demo Controls</h2>
      <div className="flex space-x-2 mb-8">
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Toggle API Error
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Show Error Boundary
        </button>
        <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          Toggle Mobile View
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staticGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
