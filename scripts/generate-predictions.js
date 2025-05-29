// generate-predictions.js
/**
 * This script generates predictions for upcoming games using multiple LLM providers
 * It's designed to be run as a scheduled GitHub Action
 */

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Load games data
function loadGamesData() {
  try {
    const gamesPath = path.join(dataDir, 'games.json');
    if (fs.existsSync(gamesPath)) {
      return JSON.parse(fs.readFileSync(gamesPath, 'utf8'));
    }
    return [];
  } catch (error) {
    console.error('Error loading games data:', error);
    return [];
  }
}

// Generate prediction using OpenAI
async function generateOpenAIPrediction(game) {
  if (!process.env.OPENAI_API_KEY) {
    return { provider: 'OpenAI', error: 'API key not configured' };
  }
  
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a sports prediction expert.' },
          { role: 'user', content: `Predict the winner and score for this MLB game: ${game.teams.away.team} at ${game.teams.home.team}. Respond with only team names and scores in JSON format like {"winner": "Team Name", "awayScore": X, "homeScore": Y, "confidence": 0.X}` }
        ],
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    const prediction = JSON.parse(response.data.choices[0].message.content);
    return { provider: 'OpenAI', ...prediction };
  } catch (error) {
    console.error('Error generating OpenAI prediction:', error.message);
    return { provider: 'OpenAI', error: error.message };
  }
}

// Generate prediction using Anthropic
async function generateAnthropicPrediction(game) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return { provider: 'Anthropic', error: 'API key not configured' };
  }
  
  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-opus-20240229',
        messages: [
          { role: 'user', content: `Predict the winner and score for this MLB game: ${game.teams.away.team} at ${game.teams.home.team}. Respond with only team names and scores in JSON format like {"winner": "Team Name", "awayScore": X, "homeScore": Y, "confidence": 0.X}` }
        ],
        max_tokens: 150
      },
      {
        headers: {
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json'
        }
      }
    );
    
    const prediction = JSON.parse(response.data.content[0].text);
    return { provider: 'Anthropic', ...prediction };
  } catch (error) {
    console.error('Error generating Anthropic prediction:', error.message);
    return { provider: 'Anthropic', error: error.message };
  }
}

// Generate prediction using Grok
async function generateGrokPrediction(game) {
  if (!process.env.GROK_API_KEY) {
    return { provider: 'Grok', error: 'API key not configured' };
  }
  
  try {
    // Note: This is a placeholder as Grok's API details might differ
    const response = await axios.post(
      'https://api.grok.ai/v1/chat/completions',
      {
        model: 'grok-1',
        messages: [
          { role: 'system', content: 'You are a sports prediction expert.' },
          { role: 'user', content: `Predict the winner and score for this MLB game: ${game.teams.away.team} at ${game.teams.home.team}. Respond with only team names and scores in JSON format like {"winner": "Team Name", "awayScore": X, "homeScore": Y, "confidence": 0.X}` }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    const prediction = JSON.parse(response.data.choices[0].message.content);
    return { provider: 'Grok', ...prediction };
  } catch (error) {
    console.error('Error generating Grok prediction:', error.message);
    return { provider: 'Grok', error: error.message };
  }
}

// Generate prediction using DeepSeek
async function generateDeepSeekPrediction(game) {
  if (!process.env.DEEPSEEK_API_KEY) {
    return { provider: 'DeepSeek', error: 'API key not configured' };
  }
  
  try {
    // Note: This is a placeholder as DeepSeek's API details might differ
    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'You are a sports prediction expert.' },
          { role: 'user', content: `Predict the winner and score for this MLB game: ${game.teams.away.team} at ${game.teams.home.team}. Respond with only team names and scores in JSON format like {"winner": "Team Name", "awayScore": X, "homeScore": Y, "confidence": 0.X}` }
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    const prediction = JSON.parse(response.data.choices[0].message.content);
    return { provider: 'DeepSeek', ...prediction };
  } catch (error) {
    console.error('Error generating DeepSeek prediction:', error.message);
    return { provider: 'DeepSeek', error: error.message };
  }
}

async function generatePredictions() {
  console.log('Generating predictions for upcoming games...');
  
  try {
    // Load games data
    const games = loadGamesData();
    
    // Filter for upcoming games
    const upcomingGames = games.filter(game => 
      game.status === 'Scheduled' || game.status === 'Pre-Game'
    );
    
    console.log(`Found ${upcomingGames.length} upcoming games`);
    
    // Generate predictions for each game
    const predictions = [];
    
    for (const game of upcomingGames) {
      console.log(`Generating predictions for ${game.teams.away.team} at ${game.teams.home.team}`);
      
      // Generate predictions from all providers
      const [openAIPrediction, anthropicPrediction, grokPrediction, deepSeekPrediction] = await Promise.all([
        generateOpenAIPrediction(game),
        generateAnthropicPrediction(game),
        generateGrokPrediction(game),
        generateDeepSeekPrediction(game)
      ]);
      
      // Combine predictions
      const gamePrediction = {
        gameId: game.gameId,
        awayTeam: game.teams.away.team,
        homeTeam: game.teams.home.team,
        gameDate: game.date,
        predictions: [
          openAIPrediction,
          anthropicPrediction,
          grokPrediction,
          deepSeekPrediction
        ],
        generatedAt: new Date().toISOString()
      };
      
      predictions.push(gamePrediction);
    }
    
    // Save predictions to file
    fs.writeFileSync(
      path.join(dataDir, 'predictions.json'),
      JSON.stringify(predictions, null, 2)
    );
    
    console.log(`Saved predictions for ${predictions.length} games to data/predictions.json`);
    
    // If MongoDB URI is provided, also save to database
    if (process.env.MONGODB_URI) {
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      
      const db = client.db('sports-almanac');
      const predictionsCollection = db.collection('predictions');
      
      // Update existing predictions or insert new ones
      for (const prediction of predictions) {
        await predictionsCollection.updateOne(
          { gameId: prediction.gameId },
          { $set: prediction },
          { upsert: true }
        );
      }
      
      await client.close();
      console.log('Successfully updated predictions in MongoDB');
    }
    
    return predictions;
  } catch (error) {
    console.error('Error generating predictions:', error);
    throw error;
  }
}

// Execute the function
generatePredictions()
  .then(() => console.log('Prediction generation completed successfully'))
  .catch(err => {
    console.error('Failed to generate predictions:', err);
    process.exit(1);
  });
