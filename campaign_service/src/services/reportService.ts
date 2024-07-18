import path from "path";
import fs from "fs";
import datastore from "../datastore";
import {
  Nullable,
  ReportType,
  AggregatedReports,
  AggregatedReportsData,
} from "../types/data";

import { v4 as uuidv4 } from "uuid";

const reportKind = "Report";
const namespace = "campaign-manager-reports";

export const createReport = async (
  report: Omit<ReportType, "id">
): Promise<ReportType> => {
  const id = uuidv4();
  const reportWithId = { ...report, id };
  const reportKey = datastore.key({
    namespace: namespace,
    path: [reportKind, id],
  });
  const entity = {
    key: reportKey,
    data: reportWithId,
  };
  await datastore.save(entity);
  return reportWithId;
};

export const fetchReportsByPlatformId = async (
  platformId: string
): Promise<Nullable<ReportType[]>> => {
  const query = datastore.createQuery(namespace, reportKind);
  const [reports] = await datastore.runQuery(query);
  return reports as ReportType[];
};

export const fetchReportsByAccountId = async (
  accountId: string
): Promise<Nullable<ReportType[]>> => {
  const query = datastore
    .createQuery(namespace, reportKind)
    .filter("accountId", "=", accountId);

  const [reports] = await query.run();
  return reports;
};

export const fetchReportsByCampaignId = async (
  campaignId: string
): Promise<Nullable<ReportType[]>> => {
  const query = datastore
    .createQuery(namespace, reportKind)
    .filter("campaignId", "=", campaignId);

  const [reports] = await query.run();

  return reports;
};

/*
  {
    campaignId: ReportType[]
  }
*/
export const aggregateReportByCampaign = async (
  accountId: string
): Promise<Nullable<AggregatedReports>> => {
  const reports = await fetchReportsByAccountId(accountId);
  const reportsByCampaign: AggregatedReports = {
    type: "Campaign",
    data: {},
  };

  if (!reports) {
    return reportsByCampaign;
  }

  const data: AggregatedReportsData = {};
  for (let report of reports) {
    if (!data[report.campaignId]) {
      data[report.campaignId] = {
        totalRevenue: 0,
        totalCPC: 0,
        totalClick: 0,
        totalImpression: 0,
        totalMoneySpent: 0,
        campaignName: report.campaignName,
        reports: [],
      };
    }
    data[report.campaignId].reports.push(report);
  }

  /*
    camp123: {
      totalRevenue: 100,
      reports: [
        {
          revenue: 
        }
      ]
    }
  */
  for (let campaignId of Object.keys(data)) {
    for (let report of data[campaignId].reports) {
      data[campaignId].totalRevenue += parseInt(report.revenue);
      data[campaignId].totalCPC += report.cpc;
      data[campaignId].totalClick += parseInt(report.clickCount);
      data[campaignId].totalImpression += parseInt(report.impCount);
      data[campaignId].totalMoneySpent += parseInt(report.moneySpent);
    }
  }

  reportsByCampaign.data = data;
  return reportsByCampaign;
};

/*
  {

  }
*/
export const aggregateReportByAccount = async (accountId: string) => {
  const reports = await fetchReportsByAccountId(accountId);
  const reportsByAccount: AggregatedReports = {
    type: "Account",
    data: {},
  };

  if (!reports) {
    return reportsByAccount;
  }

  const data: AggregatedReportsData = {};
  for (let report of reports) {
    if (!data[report.accountId]) {
      data[report.accountId] = {
        totalRevenue: 0,
        totalCPC: 0,
        totalClick: 0,
        totalImpression: 0,
        totalMoneySpent: 0,
        campaignName: report.campaignName,
        reports: [],
      };
    }
    data[report.accountId].reports.push(report);
  }

  /*
    camp123: {
      totalRevenue: 100,
      reports: [
        {
          revenue: 
        }
      ]
    }
  */
  for (let accountId of Object.keys(data)) {
    for (let report of data[accountId].reports) {
      data[accountId].totalRevenue += parseInt(report.revenue);
      data[accountId].totalCPC += report.cpc;
      data[accountId].totalClick += parseInt(report.clickCount);
      data[accountId].totalImpression += parseInt(report.impCount);
      data[accountId].totalMoneySpent += parseInt(report.moneySpent);
    }
  }

  reportsByAccount.data = data;
  return reportsByAccount;
};

export const deleteReportById = async (reportId: string): Promise<boolean> => {
  const key = datastore.key({
    namespace: namespace,
    path: [reportKind, reportId],
  });
  await datastore.delete(key);
  return true;
};

const checkReport = async (
  report: Omit<ReportType, "id">
): Promise<boolean> => {
  const query = datastore
    .createQuery(namespace, reportKind)
    .filter("accountId", "=", report.accountId)
    .filter("campaignId", "=", report.campaignId)
    .filter("date", "=", report.date);

  const [existingReports] = await query.run();
  if (existingReports && existingReports.length > 0) {
    return false;
  }
  return true;
};

export const createReportsInBatch = async (): Promise<void> => {
  try {
    const filePath = path.join(__dirname, "../..", "data", "data.json");
    const sampleData: Omit<ReportType[], "id"> = JSON.parse(
      fs.readFileSync(filePath, "utf8")
    );
    for (const report of sampleData) {
      const valid = await checkReport(report);
      if (!valid) continue;
      await createReport(report);
    }
  } catch (error: any) {
    console.error("CREATE_REPORTS_IN_BATCH_ERROR: ", error);
  }
};
