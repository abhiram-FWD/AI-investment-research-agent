// STUB — replace with a Tavily search like `${companyName} main competitors 2026`
// or `${companyName} market share vs competitors`.
export async function researchCompetitors(state) {
  console.log(`[researchCompetitors] fetching competitive landscape for ${state.resolvedEntity.name}`);

  const competitors = {
    mainCompetitors: ["Competitor A", "Competitor B"],
    competitivePosition: "Placeholder — describe moat/market position here.",
  };

  return {
    competitors,
    reasoningTrace: [...state.reasoningTrace, "Pulled competitive landscape (stub data)."],
  };
}
