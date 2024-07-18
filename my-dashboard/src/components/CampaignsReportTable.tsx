import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import {
  AggregatedReports,
  AggregatedReportsData,
  CampaignReportsTableType,
} from "../types";

import axios from "../axios";

const columns: TableColumn<CampaignReportsTableType>[] = [
  {
    name: "Campaign ID",
    selector: (row: CampaignReportsTableType) => row.campaignId,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row: CampaignReportsTableType) => row.campaignName,
    sortable: true,
  },
  {
    name: "Revenue",
    selector: (row: CampaignReportsTableType) => row.revenue,
    sortable: true,
  },
  {
    name: "CPC",
    selector: (row: CampaignReportsTableType) => row.cpc,
  },
  {
    name: "Impression Count",
    selector: (row: CampaignReportsTableType) => row.impCount,
  },
  {
    name: "Ads Spent",
    selector: (row: CampaignReportsTableType) => row.moneySpent,
  },
  // Add more columns as needed
];

function CampaignsReportTable({ accountId }: { accountId: string }) {
  const [campaignReports, setReports] = useState<CampaignReportsTableType[]>(
    []
  );
  useEffect(() => {
    const fetchReports = async () => {
      const response = await axios.get<AggregatedReports>(
        `/reports/campaigns/${accountId}`
      );
      const data = response.data.data || {};
      const reports: CampaignReportsTableType[] = [];
      for (let campaignId in data) {
        const report = data[campaignId];
        const campaignReport: CampaignReportsTableType = {
          campaignId: campaignId,
          campaignName: report.campaignName,
          revenue: report.totalRevenue,
          clickCount: report.totalClick,
          impCount: report.totalImpression,
          moneySpent: report.totalMoneySpent,
          cpc: report.totalCPC,
        };

        reports.push(campaignReport);
      }

      setReports(reports);
    };

    fetchReports();
  }, []);

  return (
    <div className="campaigns-table">
      <DataTable
        title="Campaign"
        columns={columns}
        data={campaignReports}
        pagination
      />
    </div>
  );
}

export default CampaignsReportTable;
