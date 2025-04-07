"use client";

import { useState } from "react";

interface ForecastFormProps {
  onSubmit: (city: string, months: number) => void;
}

export default function ForecastForm({ onSubmit }: ForecastFormProps) {
  const [city, setCity] = useState("");
  const [months, setMonths] = useState(12);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSubmit(city.trim(), months);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto mt-8">
      <label className="flex flex-col text-sm font-medium">
        City Name
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mt-1"
          placeholder="e.g., Redmond"
        />
      </label>

      <label className="flex flex-col text-sm font-medium">
        Forecast Months
        <input
          type="number"
          value={months}
          onChange={(e) => setMonths(Number(e.target.value))}
          min={1}
          max={60}
          className="border border-gray-300 rounded px-3 py-2 mt-1"
        />
      </label>

      <button
        type="submit"
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
      >
        Get Forecast
      </button>
    </form>
  );
}