"use client";
//The root component for each baySide containing all the info about the viz
import WeatherTable from "./weatherTable";
import { useEffect, useState } from "react";
import { BaySide, RawWeatherData, RawTideData, RawSwellData } from "./types";
import LoadingSpinner from "./loadingSpinner";
import VideoViewer from "./videoViewer";

export default function VizIndicator(side: BaySide) {
  const [weatherData, setWeatherData] = useState<RawWeatherData | null>(null);
  const [tideData, setTideData] = useState<RawTideData | null>(null);
  const [swellData, setSwellData] = useState<RawSwellData | null>(null);

  useEffect(() => {
    fetchWeatherData(side)
      .then(({ data }) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error(error);
      });
    fetchTideData(side)
      .then(({ data }) => {
        setTideData(data);
      })
      .catch((error) => {
        console.error(error);
      });
    fetchSwellData(side)
      .then((data) => {
        setSwellData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [side]);
  return (
    <div className="overflow-x-auto">
      {weatherData && tideData && swellData ? (
        <WeatherTable
          //@ts-ignore
          weatherData={weatherData.properties.timeseries}
          tideData={tideData}
          //@ts-ignore
          swellData={swellData}
        />
      ) : (
        <p>
          <LoadingSpinner />
        </p>
      )}
      <VideoViewer side={side} />
    </div>
  );
}

async function fetchWeatherData(side: BaySide) {
  try {
    const queryParams = new URLSearchParams(side).toString();
    const response = await fetch(`/api?${queryParams}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

async function fetchTideData(side: BaySide) {
  try {
    const queryParams = new URLSearchParams(side).toString();
    const response = await fetch(`/api/tideData?${queryParams}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
async function fetchSwellData(side: BaySide) {
  try {
    const queryParams = new URLSearchParams(side).toString();
    const response = await fetch(`/api/swellData?${queryParams}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
