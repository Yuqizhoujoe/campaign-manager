export type Nullable<T> = T | null | undefined;

export type Account = {
  id: string;
  title: string;
  status: "ACTIVE" | "DISABLED";
  createdAt: string;
  updatedAt: string;
};

export interface CreateCampaign {
  campaignName: string;
  status: "ACTIVE" | "DISABLED";
  type: string;
  dailyBudget: string;
  schedule: {
    start: string;
    end: string;
  };
}

export interface Campaign extends CreateCampaign {
  id: string;
  accountId: string;
  createdAt: string;
  updatedAt: string;
}
