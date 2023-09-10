import { WeatherPopupProps } from "./types";
import { useState } from "react";
import WeatherArrowIcon from "./weatherArrowIcon";
function WeatherPopup({ selectedDate, hourlyData }: WeatherPopupProps) {
  if (!selectedDate) {
    return null; // If no date is selected, don't render the popup
  }

  return (
    <div className="popup">
      <h2 className="font-bold text-2xl text-primary mb-4">
        Hourly Weather for {selectedDate}
      </h2>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="font-bold border-b bg-tersiary text-primary text-center">
              Time
            </th>
            <th className="font-bold border-b bg-tersiary text-primary text-center">
              Temperature (&deg;C)
            </th>
            <th className="font-bold border-b bg-tersiary text-primary text-center">
              Water Temperature(&deg;C)
            </th>
            <th className="font-bold border-b bg-tersiary text-primary text-center">
              Precipitation (mm)
            </th>
            <th className="font-bold border-b bg-tersiary text-primary text-center">
              Cloud Cover (%)
            </th>
            <th className="font-bold border-b bg-tersiary text-primary text-center">
              Swell Height(m)
            </th>

            <th className="font-bold border-b bg-tersiary text-primary text-center">
              Wind
            </th>
          </tr>
        </thead>
        <tbody>
          {hourlyData &&
            Object.keys(hourlyData).map((time, index) => (
              <tr key={index}>
                <td className="border-b text-center py-5">{time}:00</td>
                <td className="border-b text-center text-quint font-semibold">
                  {hourlyData[time].temperature}
                </td>
                <td className="border-b text-center text-blue-800 font-semibold">
                  {hourlyData[time].waterTemperature &&
                  hourlyData[time].waterTemperature != 0
                    ? hourlyData[time].waterTemperature.toFixed(1)
                    : "No swell data"}
                </td>
                <td className="border-b text-center text-quad font-semibold">
                  {hourlyData[time].precipitation}
                </td>
                <td className="border-b text-center text-tersiary font-semibold">
                  {hourlyData[time].cloudCover}
                </td>
                <td className="border-b text-center text-yellow-300 font-semibold">
                  {hourlyData[time].swellHeight && hourlyData[time].swellHeight != 0
                    ? hourlyData[time].swellHeight.toFixed(1)
                    : "No swell data"}
                </td>
                <td className="border-b text-center">
                  <WeatherArrowIcon
                    direction={hourlyData[time].windDirection}
                    windSpeed={hourlyData[time].windSpeed}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default WeatherPopup;
