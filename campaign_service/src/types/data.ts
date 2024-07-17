export type Nullable<T> = T | null | undefined;

export type AccountType = {
  id: string;
  accountId: string;
  title: string;
  status: "ACTIVE" | "DISABLED";
  createdAt: string;
  updatedAt: string;
};

export interface CreateCampaign {
  campaignId: string;
  campaignName: string;
  status: "ACTIVE" | "DISABLED";
  type: string;
  dailyBudget: string;
  schedule: {
    start: string;
    end: string;
  };
}

export interface CampaignType extends CreateCampaign {
  id: string;
  accountId: string;
  createdAt: string;
  updatedAt: string;
}

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
