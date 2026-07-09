import axios from "axios";

export async function disambiguate(state) {
  console.log(`[disambiguate] resolving "${state.companyName}"`);

  try {
    const res = await axios.get(
      "https://financialmodelingprep.com/stable/search-name",
      {
        params: { query: state.companyName, apikey: process.env.FMP_API_KEY },
        timeout: 10000,
      },
    );

    const results = res.data;

    if (!Array.isArray(results) || results.length === 0) {
      return {
        resolvedEntity: { name: state.companyName, ticker: null, found: false },
        reasoningTrace: [
          ...state.reasoningTrace,
          `Could not resolve "${state.companyName}" to a known ticker. Proceeding with limited data.`,
        ],
      };
    }

    // FMP's field name for exchange varies between endpoints/versions, so
    // check both possibilities rather than assuming one.
    const exchangeOf = (r) => r.exchangeShortName || r.exchange || "";

    const isUS = (r) => ["NASDAQ", "NYSE"].includes(exchangeOf(r));
    const isCleanSymbol = (r) => !r.symbol.includes(".");

    const best =
      results.find((r) => isUS(r) && isCleanSymbol(r)) ||
      results.find((r) => isCleanSymbol(r)) ||
      results.find((r) => isUS(r)) ||
      results[0];

    const resolved = {
      name: best.name,
      ticker: best.symbol,
      exchange: exchangeOf(best) || "unknown",
      found: true,
    };

    return {
      resolvedEntity: resolved,
      reasoningTrace: [
        ...state.reasoningTrace,
        `Resolved "${state.companyName}" to ${resolved.name} (${resolved.ticker}, ${resolved.exchange}).`,
      ],
    };
  } catch (err) {
    console.error(
      "[disambiguate] FMP search failed:",
      err.response?.status,
      err.message,
    );
    return {
      resolvedEntity: { name: state.companyName, ticker: null, found: false },
      reasoningTrace: [
        ...state.reasoningTrace,
        `Ticker lookup failed for "${state.companyName}" (${err.message}). Proceeding with limited data.`,
      ],
    };
  }
}
