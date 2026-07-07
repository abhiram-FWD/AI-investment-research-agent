// STUB — replace with real Financial Modeling Prep calls, e.g.:
//   GET https://financialmodelingprep.com/api/v3/profile/{ticker}?apikey=...
//   GET https://financialmodelingprep.com/api/v3/ratios/{ticker}?apikey=...
// Wrap the real axios calls in try/catch and return a `financialsAvailable: false`
// flag on failure instead of throwing, so the graph degrades gracefully.
export async function researchFinancials(state) {
  console.log(`[researchFinancials] fetching financials for ${state.resolvedEntity.ticker}`);

  const financials = {
    revenueGrowthYoY: 0.12,
    grossMargin: 0.34,
    peRatio: 28.5,
    debtToEquity: 0.45,
    available: true, // TODO: set false + reason if the real API call fails
  };

  return {
    financials,
    reasoningTrace: [...state.reasoningTrace, "Pulled financial fundamentals (stub data)."],
  };
}
