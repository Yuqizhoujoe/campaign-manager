import { Router } from "express";
import {
  CampaignServiceRequest,
  CampaignServiceResponse,
  ErrorData,
} from "../types/network";
import { ReportType } from "../types/data";

import {
  createReport,
  fetchReportsByPlatformId,
  fetchReportsByAccountId,
  deleteReportById,
  fetchReportsByCampaignId,
} from "../services/reportService";

const router = Router();

const createReportController = async (
  req: CampaignServiceRequest<Omit<ReportType, "id">>,
  res: CampaignServiceResponse<ReportType | ErrorData>
) => {
  try {
    const report = await createReport(req.body);
    return res.status(201).json(report);
  } catch (error: any) {
    console.error("CREATE_REPORT_CONTROLLER_ERROR: ", error);
    return res.status(500).json({ error: error.message });
  }
};

const queryPlatformReportController = async (
  req: CampaignServiceRequest<null>,
  res: CampaignServiceResponse<ReportType[] | ErrorData>
) => {
  try {
    const { platformId } = req.params;
    const reports = await fetchReportsByPlatformId(platformId);
    if (!reports || !reports.length) {
      return res.status(404).json({ error: "Report not available" });
    }
    return res.status(200).json(reports);
  } catch (error: any) {
    console.error("REPORT_CONTROLLER_PLATFORM_ERROR: ", error);
    return res.status(500).json({ error: error.message });
  }
};

const queryAccountReportController = async (
  req: CampaignServiceRequest<null>,
  res: CampaignServiceResponse<ReportType[] | ErrorData>
) => {
  try {
    const { accountId } = req.params;
    const reports = await fetchReportsByAccountId(accountId);
    if (!reports || !reports.length) {
      return res.status(404).json({ error: "Report not found" });
    }
    return res.status(200).json(reports);
  } catch (error: any) {
    console.error("ACCOUNT_CONTROLLER_QUERY_REPORT_ERROR: ", error);
    return res.status(500).json({ error: error.message });
  }
};

const queryCampaignReportController = async (
  req: CampaignServiceRequest<null>,
  res: CampaignServiceResponse<ReportType[] | ErrorData>
) => {
  try {
    const { campaignId } = req.params;
    const reports = await fetchReportsByCampaignId(campaignId);
    if (!reports || !reports.length) {
      return res.status(404).json({ error: "Report not found" });
    }
    return res.status(200).json(reports);
  } catch (error: any) {
    console.error("ACCOUNT_CONTROLLER_QUERY_REPORT_ERROR: ", error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteReportController = async (
  req: CampaignServiceRequest<null>,
  res: CampaignServiceResponse<boolean | ErrorData>
) => {
  try {
    const { reportId } = req.params;
    await deleteReportById(reportId);
    return res.status(200).json(true);
  } catch (error: any) {
    console.error("DELETE_REPORT_CONTROLLER_ERROR: ", error);
    return res.status(500).json({ error: error.message });
  }
};

router.get("/platforms/:platformId", queryPlatformReportController);
router.get("/accounts/:accountId", queryAccountReportController);
router.get("/campaigns/:campaignId", queryCampaignReportController);
router.post("/", createReportController);
router.delete("/:reportId", deleteReportController);

export default router;
