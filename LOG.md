# Build Log

## Setup

- Got API keys: Gemini, Financial Modeling Prep (financials), Tavily (news).
- Built frontend (React/Vite) and backend (Express) as separate apps for easier debugging.
- Built the agent with LangGraph.js: disambiguate → research (financials, news, competitors, in parallel) → synthesize → decide.
- Research nodes started as stub/placeholder data to get the pipeline working end-to-end first.

## Key decision: rubric-based verdict

- Score (growth, valuation, risk, moat) is calculated by plain code, not the AI.
- AI's only job: explain the score in plain language. Keeps the verdict auditable, not a black box.

## Problem: Gemini rate limits

- Hit 429 errors almost immediately — free tier capped at 5 requests/min, 20/day.
- Couldn't pay for a higher tier, so switched providers instead of fighting the limit.
- Moved to Groq (Llama 3.3 70B). Free tier: 30 req/min, ~1,000+/day, no card needed.
- Minor snag: had to install an older Groq package version (0.2.4) to avoid a dependency conflict with LangGraph.
- Only 2 files changed. LangGraph structure untouched.

## First successful run

- Tested "Tesla" → PASS, 70% confidence. Reasoning correctly used rubric scores and named real risks.
- Confirmed pipeline works end-to-end with stub research data.

## Pushed to GitHub

- Checked git status before committing — confirmed .env and node_modules excluded via .gitignore.
- Made initial commit, pushed to a private repo.

## Landing page

- Chose a dark, red-accent, glassmorphic style ("Red Noir") to fit the product idea.
- Renamed product to "Alpha Invest AI" — stronger, more credible name.
- Built with Antigravity: hero section, animated starfield background, "how it works" cards.
- Initially added a demo mode with hardcoded data — later removed, see below.

## Real API integration

- Wired real FMP financial data and Tavily news/competitor data into the research nodes.
- FMP's old /api/v3/ endpoints were deprecated (403 errors) — switched to /stable/ endpoints.
- Found ratios-ttm and financial-growth require a paid FMP plan (402 errors) — switched to
  quote and profile endpoints instead, which are free-tier. Rubric now uses P/E and beta
  instead of revenue growth and debt/equity. Documented as a known data limitation.
- Fixed ticker resolution: company name search was matching international listings
  (e.g. AAPL.DE) instead of the main US ticker. Fixed by preferring NASDAQ/NYSE symbols.
- Added news sentiment tagging — extended the existing Groq synthesis call to classify each
  article as positive/negative/neutral, instead of a separate call or a bolted-on heuristic.
  Keeps all AI reasoning in one place and costs no extra API calls.

## UI expansion

- Built new sections with Antigravity: Bull vs Bear case, News (with sentiment badges),
  Competitors, and progress-bar score breakdown.
- Caught and corrected an issue: Antigravity's update re-introduced hardcoded demo data and
  a demo mode that had been deliberately removed earlier per explicit instruction. Reviewed
  the diff, stripped it back out. Reminder to always check AI-generated changes, not just the
  summary of what it says it did.
- Changed PASS verdict color from red to yellow — red is now reserved only for real app
  errors, so a legitimate "don't invest" verdict isn't visually confused with something broken.

## Network issue: certificate errors on college wifi

- Intermittent "self-signed certificate" errors on FMP/Tavily requests.
- Diagnosed as college wifi's SSL-inspection proxy, not a code issue — confirmed by testing
  on mobile hotspot instead, which worked cleanly.
- Did not disable Node's certificate verification (insecure workaround). Using mobile hotspot
  for local dev; won't affect production deployment since that runs in the cloud.

  ## Deployment

- Deployed backend (Express + LangGraph agent) to Render — free tier, root directory
  set to server/, environment variables (GROQ_API_KEY, FMP_API_KEY, TAVILY_API_KEY)
  added in Render's dashboard.
- Deployed frontend (React/Vite) to Vercel — root directory set to client/, auto-detected
  as a Vite project.
- Updated API_BASE in App.jsx to point at the live Render URL instead of localhost.
- Known limitation: Render's free tier sleeps after 15 minutes idle, so the first
  request after inactivity can take 30-50 seconds to respond. Documented in README.
- Verified full flow live: landing page → real search → real Groq/FMP/Tavily data →
  verdict, all working end-to-end on the public URLs, not just localhost.
