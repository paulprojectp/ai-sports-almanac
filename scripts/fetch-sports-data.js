# LLM Prediction Generation Workflow
name: Generate LLM Predictions

on:
  # Runs every day at 8 AM UTC
  schedule:
    - cron: '0 8 * * *'
  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

jobs:
  generate-predictions:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Generate predictions from multiple LLMs
        run: node scripts/generate-predictions.js
        env:
          MONGODB_URI: ${{ secrets.MONGODB_URI }}
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          GROK_API_KEY: ${{ secrets.GROK_API_KEY }}
          DEEPSEEK_API_KEY: ${{ secrets.DEEPSEEK_API_KEY }}
          
      - name: Commit and push if changes
        run: |
          git config --global user.name 'GitHub Actions Bot'
          git config --global user.email 'actions@github.com'
          git add data/
          git diff --quiet && git diff --staged --quiet || (git commit -m "Auto-update LLM predictions" && git push)
