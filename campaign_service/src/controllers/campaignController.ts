import { Router } from "express";

// types
import {
  CampaignServiceRequest,
  CampaignServiceResponse,
  ErrorData,
} from "../types/network";
import { CampaignType, CreateCampaign } from "../types/data";
import {
  createCampaign,
  getAllCampaignsByAccount,
  getCampaignById,
} from "../services/campaignService";

const router = Router();

const cretaeCampaignController = async (
  req: CampaignServiceRequest<CreateCampaign>,
  res: CampaignServiceResponse<CampaignType | ErrorData>
) => {
  try {
    const { campaignId, campaignName, status, type, dailyBudget, schedule } =
      req.body;
    const { accountId } = req.params;

    if (
      !campaignId ||
      !campaignName ||
      !status ||
      !type ||
      !dailyBudget ||
      !schedule
    ) {
      return res.status(400).json({ error: "Missing fields!" });
    }

    const { start, end } = schedule;
    if (!start || !end) {
      return res.status(400).json({ error: "missing start or end time" });
    }

    const createdCampaign = await createCampaign(req.body, accountId);
    return res.status(201).json(createdCampaign);
  } catch (error: any) {
    console.error("CAMPAIGN_CONTROLLER_CREATE_ERROR: ", error);
    return res.status(500).json({ error: error.message });
  }
};

const getCampaignsController = async (
  req: CampaignServiceRequest<null>,
  res: CampaignServiceResponse<CampaignType[] | ErrorData>
) => {
  try {
    const { accountId } = req.params;
    console.log(req.params);
    const campaigns = await getAllCampaignsByAccount(accountId);
    return res.status(200).json(campaigns);
  } catch (error: any) {
    console.error("GET_ALL_CAMPAIGN_CONTROLLER_ERROR: ", error);
    return res.status(500).json({ error: error.message });
  }
};

const getCampaignController = async (
  req: CampaignServiceRequest<null>,
  res: CampaignServiceResponse<CampaignType | ErrorData>
) => {
  try {
    const { campaignId } = req.params;
    const campaign = await getCampaignById(campaignId);
    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    return res.status(200).json(campaign);
  } catch (error: any) {
    console.error("GET_CAMPAIGN_CONTROLLER_ERROR: ", error);
    return res.status(500).json({ error: error.message });
  }
};

router.get(
  "/platforms/:platformId/accounts/:accountId",
  getCampaignsController
);
router.get(
  "/:campaignId/platforms/:platformId/accounts/:accountId/",
  getCampaignController
);
router.post(
  "/platforms/:platformId/accounts/:accountId",
  cretaeCampaignController
);

export default router;
