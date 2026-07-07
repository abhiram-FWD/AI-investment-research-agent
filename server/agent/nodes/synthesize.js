import { ChatGroq } from "@langchain/groq";
import { ThesisSchema } from "../schemas.js";

// This node is wired for real (not a stub) — it calls Groq (Llama 3.3 70B)
// and forces structured output via the Zod schema so downstream code never
// has to parse free-form text.
export async function synthesize(state) {
  console.log(
    `[synthesize] building investment thesis for ${state.resolvedEntity.name}`,
  );

  const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
  }).withStructuredOutput(ThesisSchema);

  const prompt = `You are an investment research analyst. Based on the data below, produce a structured
investment thesis for ${state.resolvedEntity.name} (${state.resolvedEntity.ticker}).

FINANCIALS: ${JSON.stringify(state.financials)}
RECENT NEWS: ${JSON.stringify(state.news)}
COMPETITIVE LANDSCAPE: ${JSON.stringify(state.competitors)}

Be specific and grounded in the data provided. Do not invent facts not present above.`;

  const thesis = await model.invoke(prompt);

  return {
    thesis,
    reasoningTrace: [
      ...state.reasoningTrace,
      "Synthesized bull/bear case from research (Groq / Llama 3.3 70B).",
    ],
  };
}
