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

export type AggregatedReportsData = {
  [id: string]: {
    totalRevenue: number;
    totalCPC: number;
    totalClick: number;
    totalImpression: number;
    totalMoneySpent: number;
    campaignName: string;
    reports: ReportType[];
  };
};

export type AggregatedReports = {
  type: "Campaign" | "Account";
  data: AggregatedReportsData;
};

export type CardData = {
  [key in CardTypeKey]: number;
};

export type CampaignReportsTableType = {
  revenue: number;
  cpc: number;
  clickCount: number;
  moneySpent: number;
  impCount: number;
  campaignName: string;
  campaignId: string;
};
