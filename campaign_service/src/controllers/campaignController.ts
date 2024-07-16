import { Router } from "express";

// types
import {
  CampaignServiceRequest,
  CampaignServiceResponse,
  ErrorData,
} from "../types/network";
import { Campaign, CreateCampaign } from "../types/data";
import {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
} from "../services/campaignService";

const router = Router();

const cretaeCampaignController = async (
  req: CampaignServiceRequest<CreateCampaign>,
  res: CampaignServiceResponse<Campaign | ErrorData>
) => {
  try {
    const { campaignName, status, type, dailyBudget, schedule } = req.body;
    const { accountId } = req.params;

    if (!campaignName || !status || !type || !dailyBudget || !schedule) {
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
  res: CampaignServiceResponse<Campaign[] | ErrorData>
) => {
  try {
    const campaigns = await getAllCampaigns();
    return res.status(200).json(campaigns);
  } catch (error: any) {
    console.error("GET_ALL_CAMPAIGN_CONTROLLER_ERROR: ", error);
    return res.status(500).json({ error: error.message });
  }
};

const getCampaignController = async (
  req: CampaignServiceRequest<null>,
  res: CampaignServiceResponse<Campaign | ErrorData>
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

router.post("/", cretaeCampaignController);
router.get("/", getCampaignsController);
router.get("/:campaignId", getCampaignController);

export default router;
