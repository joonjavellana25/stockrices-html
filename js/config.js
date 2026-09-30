const StockConfig = Object.freeze({
  apiKey: (window.STOCK_ENV && window.STOCK_ENV.apiKey) || "",
  apiUrl: "https://www.alphavantage.co/query",
  requestDelayMs: 1200,
  tickers: Object.freeze([
    { name: "Microsoft", symbol: "MSFT" },
    { name: "Google / Alphabet", symbol: "GOOGL" },
    { name: "Apple", symbol: "AAPL" },
    { name: "NVIDIA", symbol: "NVDA" },
    { name: "Meta Platforms", symbol: "META" },
  ]),
  columns: Object.freeze([
    { key: "name", label: "Company" },
    { key: "symbol", label: "Ticker" },
    { key: "price", label: "Price" },
    { key: "change", label: "Change" },
  ]),
});
