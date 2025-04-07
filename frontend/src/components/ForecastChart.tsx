"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartData } from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

interface ForecastData {
  ds: string;
  yhat: number;
  yhat_lower: number;
  yhat_upper: number;
}

interface ForecastChartProps {
  data: ForecastData[];
}

export default function ForecastChart({ data }: ForecastChartProps) {
  const chartData: ChartData<"line"> = {
    labels: data.map((d) => d.ds),
    datasets: [
      {
        label: "Forecast",
        data: data.map((d) => d.yhat),
        borderColor: "#3b82f6",
        fill: false,
      },
      {
        label: "Lower Bound",
        data: data.map((d) => d.yhat_lower),
        borderColor: "#93c5fd",
        borderDash: [4, 2],
        fill: false,
      },
      {
        label: "Upper Bound",
        data: data.map((d) => d.yhat_upper),
        borderColor: "#93c5fd",
        borderDash: [4, 2],
        fill: false,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <Line data={chartData} />
    </div>
  );
}