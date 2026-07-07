import { z } from "zod";

// Structured output for the synthesis node — forces the LLM to produce
// a bull case / bear case / risks instead of free-form prose.
export const ThesisSchema = z.object({
  bullCase: z.array(z.string()).describe("2-4 concise reasons to be bullish"),
  bearCase: z.array(z.string()).describe("2-4 concise reasons to be cautious"),
  keyRisks: z.array(z.string()).describe("Specific, named risks (regulatory, competitive, execution, etc.)"),
  summary: z.string().describe("2-3 sentence plain-language summary of the company's current position"),
});

// Structured output for the decision node — the actual invest/pass call.
export const VerdictSchema = z.object({
  verdict: z.enum(["INVEST", "PASS"]),
  confidence: z.number().min(0).max(1).describe("0-1 confidence in this verdict"),
  reasoning: z.string().describe("Why this verdict follows from the scoring rubric"),
  scoreBreakdown: z.object({
    growth: z.number().min(0).max(10),
    valuation: z.number().min(0).max(10),
    risk: z.number().min(0).max(10),
    moat: z.number().min(0).max(10),
  }),
});
