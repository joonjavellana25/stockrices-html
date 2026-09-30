const ALPHA_VANTAGE_API_URL = "https://www.alphavantage.co/query";
const TWELVE_DATA_API_URL = "https://api.twelvedata.com/quote";
const StockConfig = Object.freeze({
  apiKey: (window.STOCK_ENV && window.STOCK_ENV.apiKey) || "",
  apiUrl: TWELVE_DATA_API_URL,
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
