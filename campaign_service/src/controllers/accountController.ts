import { Router } from "express";

// types
import {
  CampaignServiceRequest,
  CampaignServiceResponse,
  ErrorData,
} from "../types/network";
import { Account } from "../types/data";

// controllers
import campaignController from "./campaignController";

// services
import {
  createAccount,
  getAccountById,
  updateAccount,
} from "../services/accountService";

const router = Router();

const getAccountController = async (
  req: CampaignServiceRequest<null>,
  res: CampaignServiceResponse<Account | ErrorData>
) => {
  const { accountId } = req.params;
  try {
    const account = await getAccountById(accountId);
    if (!account) {
      return res.status(404).json({ error: "Account not found" });
    }
    return res.status(200).json(account);
  } catch (error: any) {
    console.error("ACCOUNT_CONTROLLER_GET_ACCOUNT_ERROR", error);
    return res.status(500).json({ error: error.message });
  }
};

const createAccountController = async (
  req: CampaignServiceRequest<{ title: string }>,
  res: CampaignServiceResponse<Account | ErrorData>
) => {
  const { title } = req.body;
  try {
    if (!title) {
      return res.status(400).json({ error: "Miss title!" });
    }

    const createdAccount = await createAccount({ title });
    return res.status(201).json(createdAccount);
  } catch (error: any) {
    console.error("ACCOUNT_CONTROLLER_CREATE_ACCOUNT_ERROR: ", error);
    return res.status(500).json({ error: error.message });
  }
};

const updateAccountController = async (
  req: CampaignServiceRequest<{ title: string }>,
  res: CampaignServiceResponse<Account | ErrorData>
) => {
  const { accountId } = req.params;
  const { title } = req.body;
  try {
    if (!accountId) {
      return res.status(400).json({ error: "Missing account id!" });
    }
    if (!title) {
      return res.status(400).json({ error: "Missing title!" });
    }

    const updatedAccount = await updateAccount(accountId, { title });
    return res.status(200).json(updatedAccount);
  } catch (error: any) {
    console.error("ACCOUNT_CONTROLLER_UPDATE_ACCOUNT_ERROR: ", error);
    return res.status(500).json({ error: error.message });
  }
};

router.get("/:accountId", getAccountController);
router.post("/", createAccountController);
router.put("/:accountId", updateAccountController);

router.use("/:accountId/campaigns", campaignController);

export default router;
