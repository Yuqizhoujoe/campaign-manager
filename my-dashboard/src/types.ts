export type AccountType = {
  accountId: string;
  title: string;
  status: "ACTIVE" | "DISABLED";
  createdAt: string;
  updatedAt: string;
};

export type CampaignType = {
  campaignId: string;
  campaignName: string;
  status: "ACTIVE" | "DISABLED";
  type: string;
  dailyBudget: string;
  schedule: {
    start: string;
    end: string;
  };
  accountId: string;
  createdAt: string;
  updatedAt: string;
};

export type ReportType = {
  id: string;
  date: string;
  reportName: string;
  accountId: string;
  accountName: string;
  campaignId: string;
  campaignName: string;
  impCount: string;
  clickCount: string;
  moneySpent: string;
  revenue: string;
  cpc: number;
  ctr: string;
  cpm: number;
};

export type CardType = {
  [key in CardTypeKey]: CardTypeValue;
};

export type CardTypeKey =
  | "revenue"
  | "cpc"
  | "clickCount"
  | "moneySpent"
  | "impCount";

export type CardTypeValue =
  | "Revenue"
  | "CPC"
  | "Clicks"
  | "Impression"
  | "Ad spend";

export type ChartDataType = {
  values: number[];
  dates: string[];
  label: CardTypeKey;
};
