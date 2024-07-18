import { useEffect, useState } from "react";

// components
import CardContainer from "./Card";
import ChartContainer from "./Chart";
import CampaignsReportTable from "../components/CampaignsReportTable";

// types
import {
  CardTypeKey,
  ReportType,
  ChartDataType,
  CampaignType,
  AggregatedReports,
  CardData,
} from "../types";

import axios from "../axios";
import { useParams } from "react-router-dom";

function Dashboard() {
  const [chartData, setChartData] = useState<ChartDataType | null>(null);
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [reports, setReports] = useState<ReportType[]>([]);

  /*
    1. get campaign id and campaign name
  */

  const { accountId } = useParams();

  useEffect(() => {
    const fetchAllReport = async () => {
      try {
        // only one platform now and all the report saved in the p1 platform
        const response = await axios.get<AggregatedReports>(
          `/reports/accounts/${accountId}`
        );
        const data = response.data.data[`${accountId}`] || {};
        setReports(data.reports || []);
        setCardData({
          revenue: data.totalRevenue,
          clickCount: data.totalClick,
          cpc: data.totalCPC,
          impCount: data.totalImpression,
          moneySpent: data.totalMoneySpent,
        });
      } catch (error) {
        console.error("FETCH_REPORT_PLATFORM_ERROR: ", error);
      }
    };

    if (accountId) {
      fetchAllReport();
    }
  }, [accountId]);

  const selectCard = (key: CardTypeKey) => {
    const values: number[] = [];
    const dates: string[] = [];
    for (let report of reports) {
      if (typeof report[key] === "string") {
        values.push(parseInt(report[key] as string, 10) as number);
      } else if (typeof report[key] === "number") {
        values.push(report[key] as number);
      }

      dates.push(report.date);
    }
    const temp = {
      values,
      dates,
      label: key,
    };
    setChartData(temp);
  };

  return (
    <div className="dashboard-container">
      <CardContainer data={cardData} onSelect={selectCard} />
      {/* 
      Chart Component
      based on the key selected, get the corresponding report data
      list of revenue, cpc, clickCount
      */}
      {chartData && <ChartContainer data={chartData} />}
      {/* Campaigns Table */}
      {accountId && <CampaignsReportTable accountId={accountId} />}
    </div>
  );
}

export default Dashboard;
