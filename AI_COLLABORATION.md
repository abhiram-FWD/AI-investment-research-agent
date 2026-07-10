# AI Collaboration & Idea Evolution

How my idea started, how AI helped, and where it saved time.

## My original idea

## My original idea

When I got the assignment, I didn't have a fixed architecture in mind yet — I knew I
needed something that takes a company name, researches it, and gives an invest/pass
call. My first questions were more about how to stand out (most people would build
something simple) than about the technical design. The multi-step LangGraph pipeline,
the rubric-based verdict, and the tech choices came out of working through the
architecture from there.

## How AI helped improve the idea

- **One prompt → multi-step agent.** Started with a single big prompt idea. Ended up
  with a LangGraph pipeline (research → synthesize → decide), so the reasoning is
  visible step by step, not a black box.
- **Rubric, not just "ask the AI."** Scores are calculated in code. The AI only
  explains them. Easier to audit and defend.
- **Landing page idea.** [TODO: 1-2 lines — how did "Alpha Invest AI" and the red/dark
  style come together?]

## Where AI saved time

- **Debugged rate limits fast.** Found Gemini's low free quota quickly using its usage
  dashboard, instead of guessing.
- **Switched providers fast.** Moved from Gemini to Groq in minutes, including a
  dependency fix, instead of hours of trial and error.
- **Found FMP's API changes fast.** Spotted that FMP moved to new endpoints and some
  needed a paid plan — turned confusing errors into a clear fix.
- **Faster UI building.** Built new sections (Bull/Bear, News, Competitors) quickly
  with Antigravity, leaving more time to check the data was real and correct.

## Where AI needed correction

- Antigravity's UI update also brought back hardcoded demo data that had been removed
  earlier on purpose. Caught by checking the actual code, not just its summary. Good
  reminder: always review AI changes, don't just trust the description.

## Ownership note

Everything here reflects decisions I made and can explain. AI sped up research,
debugging, and building — not the final thinking.
