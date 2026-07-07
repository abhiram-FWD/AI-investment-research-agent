# AI Collaboration & Idea Evolution

How my idea started, how AI helped improve it, and where it saved me time.

## My original idea
[TODO: 2-3 sentences in your own words — what was your first mental picture
of this project? e.g. "I first imagined one big prompt: user types a
company, one LLM call does everything, and prints an answer."]

## How AI helped improve the idea

- **Single call → multi-step agent.** Started with one big prompt idea.
  Ended up with a LangGraph pipeline (disambiguate → research → synthesize
  → decide), making the reasoning visible step-by-step instead of a black box.
- **Rubric-based decision, not "just ask the LLM."** Instead of letting the
  LLM decide invest/pass directly, I used a code-based scoring rubric
  (growth/valuation/risk/moat), with the LLM only explaining the score.
  Easier to audit and defend.
- [TODO: add your landing page idea here once built]

## Where AI saved time

- **Debugging rate limits fast.** Diagnosed Gemini's low free-tier quota
  quickly using AI Studio's usage dashboard, instead of guessing.
- **Fast provider switch.** Moved from Gemini to Groq in minutes, including
  fixing a dependency conflict, instead of hours of trial and error.
- **Faster scaffolding.** Boilerplate (routes, graph wiring, components) was
  set up quickly, leaving more time for the parts that matter — the rubric,
  reasoning UI, and real API integration.
- [TODO: add Antigravity efficiency notes once used]

## Ownership note
Everything here reflects decisions I made and can explain — AI sped up
research, debugging, and scaffolding, not the final thinking.