export type Nullable<T> = T | null | undefined;

export type Product = {
  productId: string;
  title: string;
  desc: string;
  type: "app" | "website" | "other";
};

export type Account = {
  accountId?: string;
  status: string;
  created?: string;
  lastUpdated?: string;
  name: string;
  timezone: string;
};

export type Campaign = {};

export type TrackingLink = {
  trackingLinkId: string;
  trackingCompany: string;
  clickThroughLink: string;
  viewThroughLink: string;
};

export type Creative = {
  creativeId: string;
  type: "image" | "video" | "other";
};
