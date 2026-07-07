// STUB — replace with a real Tavily search call, e.g.:
//   POST https://api.tavily.com/search
//   { api_key, query: `${companyName} recent news`, topic: "news", max_results: 5 }
// Tavily returns clean, citable snippets — pass those straight into the
// synthesis node rather than raw HTML.
export async function researchNews(state) {
  console.log(`[researchNews] fetching recent news for ${state.resolvedEntity.name}`);

  const news = [
    { title: "Stub headline 1", snippet: "Placeholder news snippet.", url: "https://example.com/1" },
    { title: "Stub headline 2", snippet: "Placeholder news snippet.", url: "https://example.com/2" },
  ];

  return {
    news,
    reasoningTrace: [...state.reasoningTrace, "Pulled recent news coverage (stub data)."],
  };
}
