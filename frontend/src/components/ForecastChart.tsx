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
import { ChartData, ChartOptions, TimeScale } from "chart.js";
import 'chartjs-adapter-date-fns';


// limiting what elements are brought in from chart.js llib
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, TimeScale, Tooltip, Legend);


// Forecast data appears point, upper and lower bounds
interface ForecastData {
  ds: string;
  yhat: number;
  yhat_lower: number;
  yhat_upper: number;
  source: 'historical' | 'forecast';
}

// a parent style object for storing the Forecast data points
interface ForecastChartProps {
  data: ForecastData[];
}

const options: ChartOptions<'line'>= {
  scales: {
    x: {
      type: 'time' as const,
      time:{
        unit: 'month',
      },
      title: {
        display: true,
        text: 'Time'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Price'
      }
    }
  }
}

export default function ForecastChart({ data }: ForecastChartProps) {

  const historical = data.filter(d => d.source ==='historical')
  const forecast = data.filter(d => d.source ==='forecast')


  const chartData: ChartData<"line", {x: string, y: number}[]> = {
    labels: data.map((d) => d.ds),
    datasets: [
      {
        label: "Historical",
        data: historical.map(d => ({ x: d.ds, y: d.yhat })),
        borderColor: "black",
        fill: false,
      },
      {
        label: "Forecast",
        data: forecast.map(d => ({x: d.ds, y: d.yhat})),
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Lower Bound",
        data: data.map(d => ({x: d.ds, y:d.yhat_lower})),
        borderColor: "#93c5fd",
        borderDash: [4, 2],
        fill: false,
      },
      {
        label: "Upper Bound",
        data: data.map(d => ({x: d.ds, y: d.yhat_upper})),
        borderColor: "#93c5fd",
        borderDash: [4, 2],
        fill: false,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <Line data={chartData} options={options}/>
    </div>
  );
}