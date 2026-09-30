const StockApi = (() => {
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function buildQuoteUrl(symbol, apiKey, apiUrl) {
    const url = new URL(apiUrl);
    // url.searchParams.set("function", "GLOBAL_QUOTE");
    url.searchParams.set("symbol", symbol);
    url.searchParams.set("apikey", apiKey);
    return url;
  }

  function parseQuote(payload) {
    const quote = payload;
    if (!quote || !quote["name"] || !quote["close"]) {
      return null;
    }

    const name = quote["name"];
    const price = parseFloat(quote["close"]);
    const changePercent = parseFloat(quote["percent_change"]);
    if (!Number.isFinite(price) || !Number.isFinite(changePercent)) {
      return null;
    }

    return { name, price, changePercent };
  }

  async function fetchQuote(symbol, { apiKey, apiUrl }) {
    const response = await fetch(buildQuoteUrl(symbol, apiKey, apiUrl));
    if (!response.ok) {
      throw new Error(`Quote request failed for ${symbol}: ${response.status}`);
    }

    const payload = await response.json();
    return parseQuote(payload);
  }

  return {
    delay,
    fetchQuote,
  };
})();
