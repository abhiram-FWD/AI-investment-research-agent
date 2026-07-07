# Build log

Keep a running note here as you build — prompts you used, decisions you made,
dead ends. This makes writing the README's "Key decisions & trade-offs" and
"What I'd improve" sections much easier later, and helps you prep for the
interview round.

# workFlow

- Got API keys: Gemini, Financial Modeling Prep (financials), Tavily (news).
- Built frontend (React/Vite) and backend (Express) as separate apps for easier debugging.
- Built the agent with LangGraph.js: disambiguate → research (financials, news, competitors, in parallel) → synthesize → decide.
- Research nodes still return placeholder data. Only synthesize/decide make real AI calls so far.

## Key decision: rubric-based verdict
- Score (growth, valuation, risk, moat) is calculated by plain code, not the AI.
- AI's only job: explain the score in plain language. Keeps the verdict auditable, not a black box.

## Problem: Gemini rate limits
- Hit 429 errors almost immediately.
- Cause: free tier capped at 5 requests/min, 20/day — too low for active testing.
- Can't pay for higher tier, so switched providers instead.
- Moved to Groq (Llama 3.3 70B). Free tier: 30 req/min, ~1,000+/day, no card needed.
- Minor snag: had to install an older Groq package version (0.2.4) to avoid a dependency conflict with LangGraph.
- Only 2 files changed (~4 lines each). LangGraph structure untouched.

## First successful run
- Tested "Tesla" → PASS, 70% confidence. Reasoning correctly used rubric scores and named real risks.
- Confirms pipeline works end-to-end. Next: wire real FMP + Tavily data into research nodes.

## Day 1 (cont.) — Pushed to GitHub

- Initialized git in the project root.
- Checked git status before committing — confirmed .env and node_modules
  were correctly excluded via .gitignore.
- Made initial commit and pushed to a private GitHub repo.
- Renamed project folder to ai-intern-assignment for clarity.
