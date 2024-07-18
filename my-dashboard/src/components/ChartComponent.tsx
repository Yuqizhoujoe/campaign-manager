// types
import { CardTypeKey } from "../types";
import { cardType } from "../constants";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ChartComponent({
  data,
}: {
  data: { label: CardTypeKey; values: number[]; dates: string[] };
}) {
  const chartData = {
    labels: data.dates,
    datasets: [
      {
        label: data.label,
        data: data.values,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Performance Metrics Over Time (${cardType[data.label]})`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  return (
    <div className="chart-component">
      <Line data={chartData} options={options} />
    </div>
  );
}

export default ChartComponent;
