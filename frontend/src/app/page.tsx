"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import ForecastForm from "../components/ForecastForm";

const ForecastChart = dynamic(() => import("../components/ForecastChart"), {
  ssr: false,
});

interface ForecastData {
  ds: string;
  yhat: number;
  yhat_lower: number;
  yhat_upper: number;
}

export default function HomePage() {
  const [forecast, setForecast] = useState<ForecastData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchForecast = async (state: string, city: string, months: number) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`http://localhost:5000/forecast?state=${state}&city=${city}&months=${months}`);
      if (!res.ok) throw new Error("Failed to fetch forecast");
      const data = await res.json();
      setForecast(data);
    } catch (err: any) {
      setError(err.message);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6">
      {/* <h1 className="text-3xl font-bold text-center">Real Estate Forecast</h1> */}
      
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Real Estate Forecaster
          </span>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Adharsh Rajendran
        </div>
      </div>
    </nav>

      <ForecastForm onSubmit={fetchForecast} />

      {loading && <p className="text-center mt-4">Loading forecast...</p>}
      {error && <p className="text-center mt-4 text-red-600">{error}</p>}

      {forecast && forecast.length > 0 && <ForecastChart data={forecast} />}
    </main>
  );
}