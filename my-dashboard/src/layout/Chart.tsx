import React from "react";

// types
import { ChartDataType } from "../types";
import ChartComponent from "../components/ChartComponent";

function ChartContainer({ data }: { data: ChartDataType }) {
  return (
    <div className="chart-page">
      <ChartComponent data={data} />
    </div>
  );
}

export default ChartContainer;
