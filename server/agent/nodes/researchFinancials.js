import axios from "axios";

const FMP_BASE = "https://financialmodelingprep.com/stable";

async function safeGet(url, params) {
  try {
    const res = await axios.get(url, { params, timeout: 10000 });
    return res.data;
  } catch (err) {
    console.error(
      `[researchFinancials] request failed for ${url}:`,
      err.response?.status,
      err.message,
    );
    return null;
  }
}

export async function researchFinancials(state) {
  const { ticker, found } = state.resolvedEntity;

  if (!found || !ticker) {
    console.log(
      "[researchFinancials] no ticker available, skipping real fetch",
    );
    return {
      financials: {
        available: false,
        reason: "No ticker resolved for this company.",
      },
      reasoningTrace: [
        ...state.reasoningTrace,
        "Skipped financials — no valid ticker found.",
      ],
    };
  }

  console.log(`[researchFinancials] fetching financials for ${ticker}`);

  const apikey = process.env.FMP_API_KEY;

  const [quote, profile] = await Promise.all([
    safeGet(`${FMP_BASE}/quote`, { symbol: ticker, apikey }),
    safeGet(`${FMP_BASE}/profile`, { symbol: ticker, apikey }),
  ]);

  const quoteData = Array.isArray(quote) ? quote[0] : quote;
  const profileData = Array.isArray(profile) ? profile[0] : profile;

  if (!quoteData && !profileData) {
    return {
      financials: {
        available: false,
        reason: "FMP returned no data for this ticker on the free tier.",
      },
      reasoningTrace: [
        ...state.reasoningTrace,
        `No financial data available for ${ticker}.`,
      ],
    };
  }

  const financials = {
    available: true,
    peRatio: quoteData?.pe ?? null,
    marketCap: quoteData?.marketCap ?? profileData?.mktCap ?? null,
    beta: profileData?.beta ?? null,
    priceChangePercent: quoteData?.changesPercentage ?? null,
    revenueGrowthYoY: null,
    debtToEquity: null,
  };

  return {
    financials,
    reasoningTrace: [
      ...state.reasoningTrace,
      `Pulled real financials for ${ticker}: P/E ${financials.peRatio != null ? financials.peRatio.toFixed(1) : "N/A"}, market cap ${financials.marketCap != null ? "$" + (financials.marketCap / 1e9).toFixed(1) + "B" : "N/A"}. (Revenue growth and debt/equity require FMP's paid tier — not available here.)`,
    ],
  };
}
