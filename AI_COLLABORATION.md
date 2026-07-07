# AI Collaboration & Idea Evolution

This file documents my original idea for the AI Investment Research Agent,
how working with AI (Claude, and Antigravity where used) shaped and improved
that idea, and where AI meaningfully increased my efficiency versus building
solo. This is separate from LOG.md (which tracks day-to-day build decisions)
— this file is about the *thinking process*, not the build log.

## My original idea

The assignment asked for an agent that takes a company name, researches it,
and gives an invest/pass decision with reasoning. My starting idea was:
[TODO: write 3-5 sentences in your own words — what was your first mental
picture of this? e.g. "I initially imagined a single-prompt tool: user types
a company, one big LLM call does everything, and it prints an answer."]

## How AI helped me improve the idea

- **Moved from a single LLM call to a multi-step agent.** My first instinct
  was one large prompt doing research + reasoning + decision all at once.
  Talking it through, the idea evolved into a LangGraph.js pipeline with
  distinct steps (disambiguate → research → synthesize → decide), which
  makes the agent's reasoning visible and auditable step-by-step, instead
  of being one opaque black-box call.
- **Rubric-based decision instead of "just ask the LLM."** Initially the
  plan was to let the LLM decide invest/pass directly. Talking through the
  trade-offs, I realized a reproducible, code-based scoring rubric (growth/
  valuation/risk/moat) with the LLM only explaining the score was more
  defensible and auditable — a reviewer can check exactly *why* a company
  scored the way it did, rather than trusting an unexplainable verdict.
- [TODO: add your landing page idea here once built — what was the seed of
  the "free trial vs enter the void" concept, and how did it get refined?]

## Where AI increased my efficiency

- **Debugging rate-limit issues fast.** When I hit Gemini's 429 errors, AI
  helped me quickly diagnose the actual cause (very low free-tier RPD quota
  on my specific project) via the AI Studio usage/rate-limit dashboards,
  rather than guessing or spending hours trial-and-error retrying.
- **Fast, safe pivot between LLM providers.** Switching from Gemini to Groq
  took minutes, not hours — AI helped identify a provider with a much more
  usable free tier, and pinpointed the exact dependency version conflict
  (@langchain/groq needing a newer @langchain/core than LangGraph supported)
  so I could fix it with one targeted npm install instead of trial and error
  or forcing a broken dependency tree.
- **Scaffolding boilerplate quickly.** The initial project structure (Express
  routes, LangGraph node wiring, React components) was generated fast, which
  let me spend more of my week on the parts that actually differentiate the
  project — the rubric design, the reasoning trace UI, and later, real API
  integration and the landing page.
- [TODO: add efficiency notes for Antigravity once you start using it — e.g.
  time saved on wiring FMP/Tavily, any UI iteration it helped with]

## Note on ownership

Everything in this file, and the project as a whole, reflects decisions I
made and can explain — AI was used as a collaborator to speed up research,
debugging, and scaffolding, not to generate an unexamined final product.
