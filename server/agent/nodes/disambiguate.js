// STUB — replace with a real LLM call or ticker-lookup API (e.g. FMP's
// /search endpoint) that resolves "Tesla" -> { name: "Tesla, Inc.", ticker: "TSLA" }.
// Handle ambiguity here later (e.g. multiple companies with similar names).
export async function disambiguate(state) {
  console.log(`[disambiguate] resolving "${state.companyName}"`);

  // TODO: call FMP /search?query=... to resolve the real ticker
  const resolved = {
    name: state.companyName,
    ticker: "STUB",
  };

  return {
    resolvedEntity: resolved,
    reasoningTrace: [...state.reasoningTrace, `Resolved "${state.companyName}" to ${resolved.name} (${resolved.ticker}).`],
  };
}
