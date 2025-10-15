export enum PathEnum {
  Root = "/",
  Perp = "/perp",

  Portfolio = "/portfolio",
  Positions = "/portfolio/positions",
  Orders = "/portfolio/orders",
  FeeTier = "/portfolio/fee",
  ApiKey = "/portfolio/api-key",
  Setting = "/portfolio/setting",
  Assets = "/portfolio/assets",
  History = "/portfolio/history",
  Markets = "/markets",
}

export const PageTitleMap = {
  [PathEnum.Portfolio]: "Portfolio",
  [PathEnum.FeeTier]: "Fee tier",
  [PathEnum.ApiKey]: "API keys",
  [PathEnum.Orders]: "Orders",
  [PathEnum.Positions]: "Positions",
  [PathEnum.Setting]: "Settings",
  [PathEnum.Assets]: "Assets",
  [PathEnum.History]: "History",
  [PathEnum.Markets]: "Markets",
};
