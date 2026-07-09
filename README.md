# AI Investment Research Agent — Alpha Invest AI

## Overview
An AI agent that researches a company (financials, news, competitors) and gives an
INVEST/PASS verdict with reasoning. The verdict comes from a transparent scoring rubric,
not a single AI opinion — the AI only explains the score, keeping the decision auditable.

## How to run it

### Prerequisites
- Node.js 18+
- API keys for Groq, Financial Modeling Prep, and Tavily (see `server/.env.example`)

### Setup
```bash
# Server
cd server
cp .env.example .env   # fill in your real keys
npm install
npm run dev             # runs on http://localhost:5000

# Client (separate terminal)
cd client
npm install
npm run dev              # runs on http://localhost:5173
```

Open http://localhost:5173, click through the landing page, and search a company.

## How it works

Architecture: React (Vite) frontend → Express backend → LangGraph.js agent.