import { StateGraph, Annotation, START, END } from "@langchain/langgraph";
import { disambiguate } from "./nodes/disambiguate.js";
import { researchFinancials } from "./nodes/researchFinancials.js";
import { researchNews } from "./nodes/researchNews.js";
import { researchCompetitors } from "./nodes/researchCompetitors.js";
import { synthesize } from "./nodes/synthesize.js";
import { decide } from "./nodes/decide.js";

// Shared state that flows through every node. Each node returns a partial
// object; LangGraph merges it into this state for the next node.
const AgentState = Annotation.Root({
  companyName: Annotation(),
  resolvedEntity: Annotation(),
  financials: Annotation(),
  news: Annotation(),
  competitors: Annotation(),
  thesis: Annotation(),
  verdict: Annotation(),
  // Human-readable trail of what the agent did at each step — this is what
  // the frontend renders as the "reasoning trace" panel.
  reasoningTrace: Annotation({
    reducer: (existing, update) => update, // nodes pass the full accumulated array
    default: () => [],
  }),
});

const graph = new StateGraph(AgentState)
  .addNode("disambiguate", disambiguate)
  .addNode("researchFinancials", researchFinancials)
  .addNode("researchNews", researchNews)
  .addNode("researchCompetitors", researchCompetitors)
  .addNode("synthesize", synthesize)
  .addNode("decide", decide)

  .addEdge(START, "disambiguate")
  // Fan out: the three research nodes all run after disambiguation.
  .addEdge("disambiguate", "researchFinancials")
  .addEdge("disambiguate", "researchNews")
  .addEdge("disambiguate", "researchCompetitors")
  // Fan in: synthesize waits for all three research nodes.
  .addEdge("researchFinancials", "synthesize")
  .addEdge("researchNews", "synthesize")
  .addEdge("researchCompetitors", "synthesize")
  .addEdge("synthesize", "decide")
  .addEdge("decide", END);

const compiledGraph = graph.compile();

export async function runResearchAgent(companyName) {
  const result = await compiledGraph.invoke({
    companyName,
    reasoningTrace: [`Started research on "${companyName}".`],
  });

  return {
    companyName: result.companyName,
    resolvedEntity: result.resolvedEntity,
    financials: result.financials,
    news: result.news,
    competitors: result.competitors,
    thesis: result.thesis,
    verdict: result.verdict,
    reasoningTrace: result.reasoningTrace,
  };
}
