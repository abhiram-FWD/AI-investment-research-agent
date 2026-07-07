import { ChatGroq } from "@langchain/groq";
import { z } from "zod";

function computeScoreBreakdown(financials) {
  const growth = Math.min(10, Math.max(0, financials.revenueGrowthYoY * 40));
  const valuation = Math.min(10, Math.max(0, 10 - financials.peRatio / 5));
  const risk = Math.min(10, Math.max(0, 10 - financials.debtToEquity * 10));
  const moat = 5; // TODO: derive from competitors node instead of hardcoding

  return { growth, valuation, risk, moat };
}

const WriteupSchema = z.object({
  verdict: z.enum(["INVEST", "PASS"]),
  confidence: z.number().min(0).max(1),
  reasoning: z.string(),
});

export async function decide(state) {
  console.log(`[decide] scoring ${state.resolvedEntity.name}`);

  const scoreBreakdown = computeScoreBreakdown(state.financials);
  const overallScore =
    (scoreBreakdown.growth +
      scoreBreakdown.valuation +
      scoreBreakdown.risk +
      scoreBreakdown.moat) /
    4;

  const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
    temperature: 0.2,
  }).withStructuredOutput(WriteupSchema);

  const prompt = `You are finalizing an investment decision for ${state.resolvedEntity.name}.

Rubric scores (0-10 each, already computed, do not change them):
${JSON.stringify(scoreBreakdown, null, 2)}
Overall average: ${overallScore.toFixed(1)}

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
