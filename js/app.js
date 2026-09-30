const StockApp = (() => {
  const elements = {
    timestamp: document.getElementById("timestamp"),
    refreshBtn: document.getElementById("refreshBtn"),
    header: document.getElementById("stockTableHeader"),
    table: document.getElementById("stockTable"),
  };

  function setTimestamp(text) {
    elements.timestamp.textContent = text;
  }

  function setLoading(isLoading) {
    elements.refreshBtn.disabled = isLoading;
    if (isLoading) {
      setTimestamp("Fetching...");
    }
  }

  async function fetchPrices() {
    if (elements.refreshBtn.disabled) {
      return;
    }

    setLoading(true);
    StockTable.renderPlaceholderRows(elements.table, StockConfig.tickers);

    for (const ticker of StockConfig.tickers) {
      try {
        const quote = await StockApi.fetchQuote(ticker.symbol, StockConfig);
        if (quote) {
          StockTable.updateQuote(elements.table, ticker.symbol, quote.price, quote.changePercent);
        }
      } catch (error) {
        console.error(`Failed to load ${ticker.symbol}:`, error);
      }

      await StockApi.delay(StockConfig.requestDelayMs);
    }

    setTimestamp("Updated: " + new Date().toLocaleTimeString());
    setLoading(false);
  }

  function init() {
    StockTable.renderHeader(elements.header, StockConfig.columns);
    elements.refreshBtn.addEventListener("click", fetchPrices);
    fetchPrices();
  }

  return { init };
})();

document.addEventListener("DOMContentLoaded", StockApp.init);
