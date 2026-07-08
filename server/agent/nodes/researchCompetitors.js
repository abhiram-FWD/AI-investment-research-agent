import axios from "axios";

export async function researchCompetitors(state) {
  const companyName = state.resolvedEntity.name || state.companyName;
  console.log(
    `[researchCompetitors] fetching competitive landscape for ${companyName}`,
  );

  try {
    const res = await axios.post(
      "https://api.tavily.com/search",
      {
        api_key: process.env.TAVILY_API_KEY,
        query: `${companyName} main competitors market position 2026`,
        search_depth: "basic",
        max_results: 5,
      },
      { timeout: 15000 },
    );

    const results = res.data?.results || [];

    const competitors = {
      available: results.length > 0,
      summarySnippets: results.map((r) => ({
        title: r.title,
        snippet: r.content?.slice(0, 300) || "",
        url: r.url,
      })),
    };

    return {
      competitors,
      reasoningTrace: [
        ...state.reasoningTrace,
        competitors.available
          ? `Found ${results.length} sources on ${companyName}'s competitive landscape.`
          : `No competitive landscape data found for ${companyName}.`,
      ],
    };
  } catch (err) {
    console.error("[researchCompetitors] Tavily request failed:", err.message);
    return {
      competitors: {
        available: false,
        reason: `Competitor lookup failed: ${err.message}`,
      },
      reasoningTrace: [
        ...state.reasoningTrace,
        `Competitor lookup failed for ${companyName}.`,
      ],
    };
  }
}
