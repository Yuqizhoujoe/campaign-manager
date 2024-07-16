// types
import datastore from "../datastore";
import { Campaign, CreateCampaign, Nullable } from "../types/data";

const campaignKind = "Campaign";

export const createCampaign = async (
  data: CreateCampaign,
  accountId: string
): Promise<Campaign> => {
  const campaign: Omit<Campaign, "id"> = {
    ...data,
    accountId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const key = datastore.key(campaignKind);
  const entity = {
    key,
    data: campaign,
  };
  datastore.save(entity);
  return { ...campaign, id: key.id! };
};

export const getAllCampaigns = async (): Promise<Campaign[]> => {
  const query = datastore.createQuery(campaignKind);
  const [campaigns] = await datastore.runQuery(query);
  return campaigns;
};

export const getCampaignById = async (
  campaignId: string
): Promise<Nullable<Campaign>> => {
  const campaignKey = datastore.key([campaignKind, datastore.int(campaignId)]);
  const [campaign] = await datastore.get(campaignKey);
  return campaign;
};
