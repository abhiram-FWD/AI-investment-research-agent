# AI Collaboration & Idea Evolution

How my idea started, how AI helped improve it, and where it saved me time.

## My original idea

[TODO: 2-3 sentences in your own words — what was your first mental picture of this
project? e.g. "I first imagined one big prompt: user types a company, one LLM call does
everything, and prints an answer."]

## How AI helped improve the idea

- **Single call → multi-step agent.** Started with one big prompt idea. Ended up with a
  LangGraph pipeline (disambiguate → research → synthesize → decide), making the reasoning
  visible step-by-step instead of a black box.
- **Rubric-based decision, not "just ask the LLM."** Instead of letting the LLM decide
  invest/pass directly, I used a code-based scoring rubric (growth/valuation/risk/moat),
  with the LLM only explaining the score. Easier to audit and defend.
- **Landing page concept.** [TODO: 1-2 sentences on how the "Alpha Invest AI" name and
  Red Noir visual style came together.]

## Where AI saved time

- **Debugging rate limits fast.** Diagnosed Gemini's low free-tier quota quickly using AI
  Studio's usage dashboard, instead of guessing.
- **Fast provider switch.** Moved from Gemini to Groq in minutes, including fixing a
  dependency conflict, instead of hours of trial and error.
- **Diagnosing FMP API changes.** Quickly identified that FMP had deprecated old endpoints
  and moved to a new /stable/ base URL, and that some endpoints needed a paid plan — turned
  confusing 403/402 errors into a clear fix instead of guesswork.
- **Faster scaffolding and UI expansion.** Boilerplate and later UI sections (Bull/Bear
  case, News, Competitors) were built quickly with Antigravity, leaving more time for the
  parts that matter — the rubric, and verifying the data is real and correct.

## Where AI needed correction

- Antigravity's frontend update for the new UI sections also re-introduced hardcoded demo
  data and a "demo mode" that had been deliberately removed earlier per an explicit
  instruction. Caught by reviewing the actual diff before accepting it, not by trusting the
  summary of what it said it did. Reinforced that every AI-generated change needs a real
  review, especially with agentic tools that touch multiple files at once.

## Ownership note

Everything here reflects decisions I made and can explain — AI sped up research, debugging,
and scaffolding, not the final thinking.
