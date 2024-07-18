import { Router } from "express";

// types
import {
  CampaignServiceRequest,
  CampaignServiceResponse,
  ErrorData,
} from "../types/network";
import { AccountType } from "../types/data";

// services
import {
  createAccount,
  getAccountById,
  getAllAccounts,
  updateAccount,
  queryAccountByName,
} from "../services/accountService";

const router = Router();

const getAllAccountsController = async (
  req: CampaignServiceRequest<null>,
  res: CampaignServiceResponse<AccountType[] | ErrorData>
) => {
  try {
    const { q } = req.query || {};
    let accounts: AccountType[] = [];
    if (q && typeof q === "string") {
      accounts = await queryAccountByName(q);
    } else {
      accounts = await getAllAccounts();
    }
    if (!accounts || !accounts.length) {
      return res.status(404).json({ error: "Accounts not available" });
    }
    return res.status(200).json(accounts);
  } catch (error: any) {
    console.error("GET_ACCOUNTS_CONTROLLER_ERRROR: ", error);
    return res.status(500).json({ error: error.message });
  }
};

const getAccountController = async (
  req: CampaignServiceRequest<null>,
  res: CampaignServiceResponse<AccountType | ErrorData>
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
  req: CampaignServiceRequest<{ title: string; accountId: string }>,
  res: CampaignServiceResponse<AccountType | ErrorData>
) => {
  const { title, accountId } = req.body;
  try {
    if (!title || !accountId) {
      return res.status(400).json({ error: "Miss title or accountId!" });
    }

    const createdAccount = await createAccount({ title, accountId });
    return res.status(201).json(createdAccount);
  } catch (error: any) {
    console.error("ACCOUNT_CONTROLLER_CREATE_ACCOUNT_ERROR: ", error);
    return res.status(500).json({ error: error.message });
  }
};

const updateAccountController = async (
  req: CampaignServiceRequest<{ status: "ACTIVE" | "DISABLED" }>,
  res: CampaignServiceResponse<AccountType | ErrorData>
) => {
  const { accountId } = req.params;
  const { status } = req.body;
  try {
    if (!accountId) {
      return res.status(400).json({ error: "Missing account id!" });
    }
    if (!status) {
      return res.status(400).json({ error: "Missing status!" });
    }

    const updatedAccount = await updateAccount(parseInt(accountId), { status });
    return res.status(200).json(updatedAccount);
  } catch (error: any) {
    console.error("ACCOUNT_CONTROLLER_UPDATE_ACCOUNT_ERROR: ", error);
    return res.status(500).json({ error: error.message });
  }
};

router.get("/:accountId", getAccountController);
router.get("/", getAllAccountsController);
router.post("/", createAccountController);
router.put("/:accountId", updateAccountController);

export default router;
