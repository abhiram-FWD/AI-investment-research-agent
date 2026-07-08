import { ChatGroq } from "@langchain/groq";
import { z } from "zod";

function computeScoreBreakdown(financials, competitors) {
  if (!financials || financials.available === false) {
    return { growth: 0, valuation: 0, risk: 0, moat: 0 };
  }

  const peRatio = financials.peRatio ?? 30;
  const beta = financials.beta ?? 1;

  const growth = 5;
  const valuation = clamp(10 - peRatio / 5);
  const risk = clamp(10 - beta * 5);
  const moat = competitors?.available ? 5 : 4;

  return { growth, valuation, risk, moat };
}

function clamp(n) {
  if (Number.isNaN(n) || n == null) return 0;
  return Math.min(10, Math.max(0, n));
}

const WriteupSchema = z.object({
  verdict: z.enum(["INVEST", "PASS"]),
  confidence: z.number().min(0).max(1),
  reasoning: z.string(),
});

export async function decide(state) {
  console.log(`[decide] scoring ${state.resolvedEntity.name}`);

  const scoreBreakdown = computeScoreBreakdown(
    state.financials,
    state.competitors,
  );
  const overallScore =
    (scoreBreakdown.growth +
      scoreBreakdown.valuation +
      scoreBreakdown.risk +
      scoreBreakdown.moat) /
    4;

  const dataCaveat =
    state.financials?.available === false
      ? "\nNOTE: Real financial data was unavailable for this company. Scores are defaulted to 0 and this verdict should be treated as low-confidence / data-limited. Say so explicitly in your reasoning."
      : "\nNOTE: Growth score is neutral (5/10) because revenue growth data requires a paid FMP plan and wasn't available. Valuation is based on P/E, risk is based on beta (volatility). Mention this data limitation briefly in your reasoning.";

  const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
    temperature: 0.2,
  }).withStructuredOutput(WriteupSchema);

  const prompt = `You are finalizing an investment decision for ${state.resolvedEntity.name}.

Rubric scores (0-10 each, already computed, do not change them):
${JSON.stringify(scoreBreakdown, null, 2)}
Overall average: ${overallScore.toFixed(1)}
${dataCaveat}

Investment thesis: ${JSON.stringify(state.thesis)}

Rule of thumb: overall score >= 6 leans INVEST, below leans PASS, but you may
override with clear justification tied to the thesis's key risks. State your
verdict, a confidence (0-1), and a short reasoning paragraph that references
the specific scores and thesis points above.`;

  const writeup = await model.invoke(prompt);

  const verdict = {
    verdict: writeup.verdict,
    confidence: writeup.confidence,
    reasoning: writeup.reasoning,
    scoreBreakdown,
  };

  return {
    verdict,
    reasoningTrace: [
      ...state.reasoningTrace,
      `Computed rubric scores: ${JSON.stringify(scoreBreakdown)}.`,
      `Final verdict: ${verdict.verdict} (confidence ${verdict.confidence}).`,
    ],
  };
}
