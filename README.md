# AI Investment Research Agent

## Overview
An AI agent that researches a company (financials, news, competitors) and gives an INVEST/PASS verdict with reasoning. The verdict comes from a transparent scoring rubric, not a single AI opinion — the AI only explains the score, keeping the decision auditable.

## How to run it

- API keys for Groq, Financial Modeling Prep, and Tavily (see `server/.env.example`)

### Prerequisites
- Node.js 18+
- API keys for Gemini, Financial Modeling Prep, and Tavily (see `server/.env.example`)

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

Open http://localhost:5173, type a company name, and click Research.

## How it works

Architecture: React (Vite) frontend → Express backend → LangGraph.js agent.

User input → POST /api/research → LangGraph.js graph:
  disambiguate
    → researchFinancials  ─┐
    → researchNews         ├→ synthesize (Groq/Llama 3.3, structured output) → decide (rubric + Groq writeup) → response
    → researchCompetitors ─┘

Key design choice: the final verdict is **not** a single "so, invest or pass?"
LLM call. A deterministic scoring rubric (growth / valuation / risk / moat,
each 0-10) is computed in plain code from the financial data, and the LLM's
job in the decision node is only to explain and (rarely) override that score
with justification. This makes the verdict auditable and reproducible rather
than a black box.

_TODO: expand with real architecture diagram + specifics once nodes are wired to real data._

## Key decisions & trade-offs

- **Separate React + Express apps** instead of Next.js — easier to debug solo on a deadline.
- **Rubric-based verdict**: scores calculated in code, AI only writes up the reasoning. Chosen for auditability over a single black-box AI call.
- **Switched from Gemini to Groq**: Gemini's free tier (20 req/day) was too restrictive for testing, and I couldn't pay for more. Groq's free tier is far more generous. Only the model wrapper changed — LangGraph structure stayed the same.
- **Research nodes started as stubs** to get the full pipeline working before adding real APIs — caught integration issues early.

## Example runs
- _TODO: paste 3-5 real runs here once nodes use real APIs_

## What I would improve with more time
- _TODO_

## Notes on ambiguity
- _TODO: log any judgment calls you made per the assignment's ground rules_
