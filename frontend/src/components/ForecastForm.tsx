"use client";

import { useState, useEffect } from "react";
import { RegionMap, fetchRegionMap } from "../api/region";

interface ForecastFormProps {
  onSubmit: (state: string, city: string, months: number) => void;
}

export default function ForecastForm({ onSubmit }: ForecastFormProps) {
  const [regionMap, setRegionMap] = useState<RegionMap>({})
  const [stateList, setStateList] = useState<string[]>([]);
  const [cityList, setCityList] = useState<string[]>([]);
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [months, setMonths] = useState(12);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadRegions() {
      try {
        setLoading(true)
        const map = await fetchRegionMap();
        setRegionMap(map);
        const stateList = Object.keys(map).sort();
        setStateList(stateList);
        setState(stateList[0]); // optionally pre-select first state
      } catch (error) {
        console.error('Error loading regions:', error);
      }
      finally {
        setLoading(false);
      }
    }

    loadRegions();
  }, []);

  useEffect(() => {
    if (state && regionMap[state]) {
      setCityList(regionMap[state]);
    } else {
      setCityList([]);
    }
  }, [state, regionMap]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim() || !state.trim() || !months) return;
    onSubmit(state, city, months);
  };

  return (
    <div>
      {loading && <p className="text-center mt-4">Loading State List...</p>}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-4 md:grid-cols-4 gap-4 items-end"
        >
          <div className="w-full">
            <label htmlFor="state" className="block mb-2 text-sm font-medium text-gray-900">
              State
            </label>
            <select
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">Select State</option>
              {stateList.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div className="w-full">
            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">
              City
            </label>
            <select
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={!cityList.length}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">Select City</option>
              {cityList.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full">
            <label htmlFor="months" className="block mb-2 text-sm font-medium text-gray-900">
              Forecast Months
            </label>
            <input
              type="number"
              id="months"
              min={1}
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>

          <button
            type="submit"
            onClick={() => { console.log("Clicked!") }}
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Submit
          </button>

        </form>

      <div>{error && <p className="text-center mt-4 text-red-600">{error}</p>}</div>
    </div>
  );
}