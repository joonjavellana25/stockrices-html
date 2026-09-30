const StockTable = (() => {
  const CELL_CLASS = "py-4 px-2 border-b border-[#2a2d34]";
  const HEADER_CLASS = "text-left py-3 px-2 text-[#9aa0a6] font-medium border-b border-[#2a2d34]";
  const MUTED_CLASS = "text-[#9aa0a6] italic";
  const UP_CLASS = "text-[#3ddc97]";
  const DOWN_CLASS = "text-[#ff5c57]";

  function createCell(className, text) {
    const cell = document.createElement("td");
    cell.className = className;
    cell.textContent = text;
    return cell;
  }

  function renderHeader(headerRow, columns) {
    headerRow.replaceChildren();
    columns.forEach((column) => {
      const th = document.createElement("th");
      th.className = HEADER_CLASS;
      th.textContent = column.label;
      headerRow.appendChild(th);
    });
  }

  function renderPlaceholderRows(tbody, tickers) {
    tbody.replaceChildren();
    tickers.forEach((ticker) => {
      const row = document.createElement("tr");
      row.dataset.ticker = ticker.symbol;

      row.appendChild(createCell(CELL_CLASS, ticker.name));

      const symbolCell = createCell(`${CELL_CLASS} text-[#58a6ff] font-semibold`, ticker.symbol);
      row.appendChild(symbolCell);

      const priceCell = createCell(`${CELL_CLASS} text-lg font-bold ${MUTED_CLASS} price`, "--");
      row.appendChild(priceCell);

      const changeCell = createCell(`${CELL_CLASS} ${MUTED_CLASS} change`, "--");
      row.appendChild(changeCell);

      tbody.appendChild(row);
    });
  }

  function getRowByTicker(tbody, symbol) {
    return tbody.querySelector(`tr[data-ticker="${symbol}"]`);
  }

  function updateQuote(tbody, symbol, price, changePercent) {
    const row = getRowByTicker(tbody, symbol);
    if (!row) {
      return;
    }

    const priceCell = row.querySelector(".price");
    const changeCell = row.querySelector(".change");
    const isUp = changePercent >= 0;

    priceCell.className = `${CELL_CLASS} text-lg font-bold price`;
    priceCell.textContent = `$${price.toFixed(2)}`;

    changeCell.className = `${CELL_CLASS} change ${isUp ? UP_CLASS : DOWN_CLASS}`;
    changeCell.textContent = `${changePercent.toFixed(2)}%`;
  }

  return {
    renderHeader,
    renderPlaceholderRows,
    updateQuote,
  };
})();
