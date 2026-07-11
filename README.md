# AI Investment Research Agent — Alpha Invest AI

## Overview
An AI agent that researches a company and gives an INVEST/PASS verdict with reasoning.
The verdict comes from a scoring rubric, not just an AI opinion — this keeps it auditable.

## Live Demo
- App: https://ai-investment-research-agent-flax.vercel.app/
- API: https://ai-investment-research-agent-y7ya.onrender.com

Note: the backend is on Render's free tier, which sleeps after 15 minutes of
inactivity. The first search after a period of inactivity may take 30-50 seconds
while it wakes up — this is expected, not a bug.

## How to run it

### Prerequisites
- Node.js 18+
- API keys: Groq, Financial Modeling Prep, Tavily (see `server/.env.example`)

### Setup
bash
# Server
cd server
cp .env.example .env
npm install
npm run dev             # http://localhost:5000

# Client (separate terminal)
cd client
npm install
npm run dev              # http://localhost:5173


## How it works

React (Vite) frontend → Express backend → LangGraph.js agent.

disambiguate (FMP ticker lookup)
  → researchFinancials (FMP)
  → researchNews (Tavily)
  → researchCompetitors (Tavily)
→ synthesize (Groq: bull/bear case + news sentiment)
→ decide (rubric + Groq writeup)

The verdict is not one big AI call. Scores (growth, valuation, risk, moat) are
computed in code. The AI only explains the score, and rarely overrides it.

## Key decisions & trade-offs

- Separate React + Express apps instead of Next.js — easier to debug solo.
- Rubric-based verdict — scores in code, AI writes up the reasoning only.
- Switched from Gemini to Groq — Gemini's free tier was too limited (20 req/day).
- FMP's free tier lacks growth/debt data — used P/E and beta instead, documented as a limit.
- News sentiment reuses the existing Groq call, no extra API cost.
- Research nodes started as stubs to test the pipeline before adding real APIs.

## Example runs

**Apple (AAPL)** — PASS, 60% confidence, Moderate Risk. Score 4.6/10.
Cited real Q2 revenue growth (17% YoY), but flagged rising costs and a paused product.

**Microsoft (MSFT)** — PASS, 60% confidence, Moderate Risk. Score 4.6/10.
Same overall score as Apple, but different reasoning — weighed R&D costs and market cap.

**Edge case ("Applemicrosoft")** — PASS, 20% confidence, High Risk.
Invalid company name — ticker lookup failed, scores defaulted to 0. No crash, no fake data.

## What I would improve with more time
- Get real revenue growth/debt data (needs FMP's paid tier).
- Improve Tavily competitor search — some results are low quality.
- Cache repeated searches to save API calls.
- Let users adjust risk tolerance.

## Notes on ambiguity
- No decision framework was specified, so I built a rubric-based one for auditability.
- Where FMP data was missing, I used the closest free substitute and documented it.
- Invalid company names return a low-confidence PASS, not a crash.

## Example Runs 
**Tesla, Inc. (TSLA)** — PASS, 60% confidence, High Risk. Rubric: growth 5.0, valuation
4.0, risk 1.0, moat 5.0 (overall 3.7/10). Real beta from FMP was high, correctly
driving down the risk score — shows the rubric responding to genuinely different
inputs across companies, not fixed output. Bull case cited real Q2 delivery numbers
beating estimates; bear case cited discontinued luxury models and BYD competition.