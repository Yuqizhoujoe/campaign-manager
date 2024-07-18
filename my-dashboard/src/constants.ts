import { CardTypeKey, CardType } from "./types";

export type ReportDataKeyType =
  | "REVENUE"
  | "CPC"
  | "CLICK_COUNT"
  | "MONEY_SPENT"
  | "IMPRESSION_COUNT";

export const reportDataKeys: { [key in ReportDataKeyType]: CardTypeKey } = {
  REVENUE: "revenue",
  CPC: "cpc",
  CLICK_COUNT: "clickCount",
  MONEY_SPENT: "moneySpent",
  IMPRESSION_COUNT: "impCount",
};

export const cardType: CardType = {
  revenue: "Revenue",
  cpc: "CPC",
  clickCount: "Clicks",
  impCount: "Impression",
  moneySpent: "Ad spend",
};
