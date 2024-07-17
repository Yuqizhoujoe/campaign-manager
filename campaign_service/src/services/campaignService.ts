// types
import datastore from "../datastore";
import { CampaignType, CreateCampaign, Nullable } from "../types/data";

const campaignKind = "Campaign";
const namespace = "campaign-manager-campaigns";

export const createCampaign = async (
  data: CreateCampaign,
  accountId: string
): Promise<CampaignType> => {
  const campaign: Omit<CampaignType, "id"> = {
    ...data,
    accountId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const key = datastore.key({
    namespace: namespace,
    path: [campaignKind, data.campaignId],
  });
  const entity = {
    key,
    data: campaign,
  };
  await datastore.save(entity);
  return { ...campaign, id: key.id! };
};

export const getAllCampaignsByAccount = async (
  accountId: string
): Promise<CampaignType[]> => {
  const query = datastore
    .createQuery(namespace, campaignKind)
    .filter("accountId", "=", accountId);
  const [campaigns] = await datastore.runQuery(query);
  return campaigns;
};

export const getCampaignById = async (
  campaignId: string
): Promise<Nullable<CampaignType>> => {
  const campaignKey = datastore.key({
    namespace: namespace,
    path: [campaignKind, campaignId],
  });
  const [campaign] = await datastore.get(campaignKey);
  return campaign;
};
