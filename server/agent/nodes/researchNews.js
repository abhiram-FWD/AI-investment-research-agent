import axios from "axios";

export async function researchNews(state) {
  const companyName = state.resolvedEntity.name || state.companyName;
  console.log(`[researchNews] fetching recent news for ${companyName}`);

  try {
    const res = await axios.post(
      "https://api.tavily.com/search",
      {
        api_key: process.env.TAVILY_API_KEY,
        query: `${companyName} recent news`,
        topic: "news",
        search_depth: "basic",
        max_results: 5,
      },
      { timeout: 15000 },
    );

    const results = res.data?.results || [];

    const news = results.map((r) => ({
      title: r.title,
      snippet: r.content?.slice(0, 300) || "",
      url: r.url,
      publishedDate: r.published_date || null,
    }));

    return {
      news:
        news.length > 0
          ? news
          : { available: false, reason: "No recent news found." },
      reasoningTrace: [
        ...state.reasoningTrace,
        news.length > 0
          ? `Found ${news.length} recent news items for ${companyName}.`
          : `No recent news found for ${companyName}.`,
      ],
    };
  } catch (err) {
    console.error("[researchNews] Tavily request failed:", err.message);
    return {
      news: { available: false, reason: `News lookup failed: ${err.message}` },
      reasoningTrace: [
        ...state.reasoningTrace,
        `News lookup failed for ${companyName}.`,
      ],
    };
  }
}
