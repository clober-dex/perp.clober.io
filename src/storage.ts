export const DEFAULT_SYMBOL = "PERP_ETH_USDC";
export const CLOBER_SYMBOL_KEY = "clober-current-symbol";

export function getSymbol() {
  return localStorage.getItem(CLOBER_SYMBOL_KEY) || DEFAULT_SYMBOL;
}

export function updateSymbol(symbol: string) {
  localStorage.setItem(CLOBER_SYMBOL_KEY, symbol || DEFAULT_SYMBOL);
}
