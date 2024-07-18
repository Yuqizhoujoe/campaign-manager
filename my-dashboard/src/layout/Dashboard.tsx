import { useEffect, useState } from "react";

// components
import CardContainer from "./Card";
import ChartContainer from "./Chart";

// types
import { CardTypeKey, ReportType, ChartDataType } from "../types";

import axios from "../axios";
import { useParams } from "react-router-dom";

const defaultTotal: { [key in CardTypeKey]: number } = {
  revenue: 0,
  cpc: 0,
  clickCount: 0,
  impCount: 0,
  moneySpent: 0,
};

function Dashboard() {
  const [reportData, setData] = useState<ReportType[]>([]);
  const [chartData, setChartData] = useState<ChartDataType | null>(null);

  const [cardData, setCardData] = useState(defaultTotal);

  const { accountId } = useParams();

  useEffect(() => {
    const fetchAllReport = async () => {
      try {
        // only one platform now and all the report saved in the p1 platform
        const response = await axios.get(`/reports/accounts/${accountId}`);
        setData(response.data);
      } catch (error) {
        console.error("FETCH_REPORT_PLATFORM_ERROR: ", error);
      }
    };

    if (accountId) {
      fetchAllReport();
    }
  }, [accountId]);

  useEffect(() => {
    if (reportData && reportData.length) {
      let updatedTotal: { [key in CardTypeKey]: number } = { ...defaultTotal };

      // loop reportData
      for (let report of reportData) {
        // loop each key of total {revenue: 0, cpc: 0, ...} and update the value
        for (let key in updatedTotal) {
          updatedTotal[key as CardTypeKey] +=
            typeof report[key as CardTypeKey] === "string"
              ? parseInt(report[key as CardTypeKey] as string, 10)
              : (report[key as CardTypeKey] as number);
        }
      }

      setCardData(updatedTotal);
    }
  }, [reportData]);

  const selectCard = (key: CardTypeKey) => {
    const values: number[] = [];
    const dates: string[] = [];
    for (let report of reportData) {
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
    </div>
  );
}

export default Dashboard;
