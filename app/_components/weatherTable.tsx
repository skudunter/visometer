// component that takes the raw weather data and formats it in an array of type then renders that data in a meaningfull way
import {
  WeatherDataItem,
  WeatherGroupedData,
  WeatherTableProps,
  RawTideData,
  RawSwellData,
} from "./types";
import { useState } from "react";
import WeatherImageIcon from "./weatherImageIcon";
import WeatherArrowIcon from "./weatherArrowIcon";
import WeatherPopup from "./weatherPopup";

function WeatherTable({ weatherData, tideData, swellData }: WeatherTableProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const groupedData: WeatherGroupedData = convertRawHourDataToOrderedData(
    weatherData,
    tideData,
    swellData
  );

  const handleRowClick = (date: string) => {
    if (selectedDate === date) {
      setSelectedDate(null);
    } else {
      setSelectedDate(date);
    }
  };

  return (
    <div className="overflow-x-auto">
      <WeatherPopup
        selectedDate={selectedDate}
        hourlyData={groupedData[selectedDate!]?.hourly}
      />
      <table className="min-w-full border-collaps">
        <thead>
          <tr>
            <th
              className="font-bold border-b border-t bg-tersiary text-primary text-center"
              scope="col"
            >
              Date
            </th>
            <th
              className="font-bold border-b bg-tersiary text-primary text-center"
              scope="col"
            >
              Morning
            </th>
            <th
              className="font-bold border-b bg-tersiary text-primary text-center"
              scope="col"
            >
              Afternoon
            </th>
            <th
              className="font-bold border-b bg-tersiary text-primary text-center"
              scope="col"
            >
              Min/Max Temperature (&deg;C)
            </th>
            <th
              className="font-bold border-b bg-tersiary text-primary text-center"
              scope="col"
            >
              Total Precipitation (mm)
            </th>
            <th
              className="font-bold border-b bg-tersiary text-primary text-center"
              scope="col"
            >
              Swell (m)
            </th>
            <th
              className="font-bold border-b bg-tersiary text-primary text-center"
              scope="col"
            >
              High Tide
            </th>
            <th
              className="font-bold border-b bg-tersiary text-primary text-center"
              scope="col"
            >
              Low Tide
            </th>
            <th
              className="font-bold border-b bg-tersiary text-primary text-center"
              scope="col"
            >
              Wind
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(groupedData).map((date, index) => (
            <tr
              key={index}
              onClick={() => handleRowClick(date)}
              className={`${
                date === selectedDate ? "bg-sextant" : "bg-primary"
              } hover:bg-secondary cursor-pointer`}
            >
              <td className="border-b py-6 text-left">{formatDate(date)}</td>
              <td className="border-b text-center">
                <div className="flex justify-center items-center">
                  <WeatherImageIcon
                    imageURL={groupedData[date].daily.morning.ImageURL}
                  />
                </div>
              </td>
              <td className="border-b text-center">
                <div className="flex justify-center items-center">
                  <WeatherImageIcon
                    imageURL={groupedData[date].daily.afternoon.ImageURL}
                  />
                </div>
              </td>
              <td className="border-b text-center">
                <span className="text-quint font-semibold">
                  {groupedData[date].daily.minTemperature}
                </span>
                <span className="font-mono font-extrabold"> / </span>
                <span className="text-quint font-semibold">
                  {groupedData[date].daily.maxTemperature}
                </span>
              </td>
              <td className="border-b text-center text-quad font-semibold">
                {groupedData[date].daily.totalPrecipitation}
              </td>
              <td className="border-b text-center text-quad font-semibold">
                {groupedData[date].daily.averageSwellHeight &&
                groupedData[date].daily.averageSwellHeight !== 0
                  ? groupedData[date].daily.averageSwellHeight?.toFixed(1)
                  : "No swell data"}
              </td>
              <td className="border-b text-center text-tersiary font-semibold">
                {groupedData[date].daily.tides.highTides &&
                groupedData[date].daily.tides.highTides.length > 0 ? (
                  <>
                    <div>
                      {formatTime(
                        groupedData[date].daily.tides.highTides[0].time
                      )}
                      <span className="text-blue-800">
                        {` (${groupedData[
                          date
                        ].daily.tides.highTides[0].height.toFixed(2)}m)`}
                      </span>
                    </div>

                    {groupedData[date].daily.tides.highTides.length > 1 && (
                      <div>
                        {formatTime(
                          groupedData[date].daily.tides.highTides[1].time
                        )}
                        <span className="text-blue-800">{` (${groupedData[
                          date
                        ].daily.tides.highTides[1].height.toFixed(2)}m)`}</span>
                      </div>
                    )}
                  </>
                ) : (
                  "No high tides"
                )}
              </td>
              <td className="border-b text-center text-tersiary font-semibold">
                {groupedData[date].daily.tides.lowTides &&
                groupedData[date].daily.tides.lowTides.length > 0 ? (
                  <>
                    <div>
                      {formatTime(
                        groupedData[date].daily.tides.lowTides[0].time
                      )}
                      <span className="text-yellow-300">
                        {` (${groupedData[
                          date
                        ].daily.tides.lowTides[0].height.toFixed(2)}m)`}
                      </span>
                    </div>
                    {groupedData[date].daily.tides.lowTides.length > 1 && (
                      <div>
                        {formatTime(
                          groupedData[date].daily.tides.lowTides[1].time
                        )}
                        <span className="text-yellow-300">
                          {` (${groupedData[
                            date
                          ].daily.tides.lowTides[1].height.toFixed(2)}m)`}
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  "No low tides"
                )}
              </td>
              <td className="border-b text-center ">
                <WeatherArrowIcon
                  direction={groupedData[date].daily.averageWindDirection}
                  windSpeed={groupedData[date].daily.averageWindSpeed}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatDate(dateTime: string) {
  const dateObject = new Date(dateTime);
  const date = dateObject.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  return `${date} `;
}
function formatTime(dateTime: string) {
  const date = new Date(dateTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const amOrPm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour time format
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

  return `${formattedHours}:${String(minutes).padStart(2, "0")} ${amOrPm}`;
}

function convertRawHourDataToOrderedData(
  data: WeatherDataItem[],
  tideData: RawTideData,
  swellData: RawSwellData
) {
  const groupedData: WeatherGroupedData = {};

  data.forEach((item) => {
    const date = item.time.split("T")[0]; // Get the date part
    const time = item.time.split("T")[1].split(":")[0];
    if (!groupedData[date]) {
      groupedData[date] = {
        daily: {
          morning: {
            temperature: 0,
            cloudCover: 0,
            precipitation: 0,
            ImageURL: "/sunny-day.png", // Default image URL
          },
          afternoon: {
            temperature: 0,
            cloudCover: 0,
            precipitation: 0,
            ImageURL: "/sunny-day.png", // Default image URL
          },
          temperatures: [],
          precipitation: [],
          windSpeeds: [],
          cloudCover: [],
          windDirections: [],
          weightedWindDirections: [],
          swellHeights: [],
          averageSwellHeight: undefined,
          averageTemperature: undefined,
          maxTemperature: undefined,
          minTemperature: undefined,
          averageWindSpeed: undefined,
          averageWindDirection: undefined,
          totalPrecipitation: undefined,
          tides: {
            highTides: [],
            lowTides: [],
          },
        },
        hourly: {},
      };
    }

    if (item.data.instant.details.air_temperature !== undefined) {
      if (time === "12") {
        // Data at 12:00:00
        groupedData[date].daily.morning.temperature =
          item.data.instant.details.air_temperature;
        groupedData[date].daily.morning.cloudCover =
          item.data.instant.details.cloud_area_fraction || 0;

        if (item.data.next_1_hours && item.data.next_1_hours.details) {
          groupedData[date].daily.morning.precipitation =
            item.data.next_1_hours.details.precipitation_amount || 0;
        }

        if (item.data.next_6_hours) {
          groupedData[date].daily.morning.precipitation =
            item.data.next_6_hours.details?.precipitation_amount || 0;
        }
      } else if (time === "18") {
        // Data at 18:00:00
        groupedData[date].daily.afternoon.temperature =
          item.data.instant.details.air_temperature;
        groupedData[date].daily.afternoon.cloudCover =
          item.data.instant.details.cloud_area_fraction || 0;

        if (item.data.next_1_hours && item.data.next_1_hours.details) {
          groupedData[date].daily.afternoon.precipitation =
            item.data.next_1_hours.details.precipitation_amount || 0;
        }
        if (item.data.next_6_hours) {
          groupedData[date].daily.afternoon.precipitation =
            item.data.next_6_hours.details?.precipitation_amount || 0;
        }
      }
    }

    //hourly data
    if (!groupedData[date].hourly[time]) {
      const dateTime = new Date(date + "T" + time + ":00Z");

      // Find the corresponding entry in swellData
      const matchingSwellData = swellData.data.hours.find((swellItem) => {
        const swellDateTime = new Date(swellItem.time.split("+")[0]);
        return dateTime.getTime() === swellDateTime.getTime();
      });

      if (matchingSwellData) {
        groupedData[date].hourly[time] = {
          temperature: item.data.instant.details.air_temperature || 0,
          precipitation:
            item.data.next_1_hours?.details?.precipitation_amount ||
            0 + item.data.next_6_hours?.details?.precipitation_amount! ||
            0,
          windSpeed: item.data.instant.details.wind_speed || 0,
          cloudCover: item.data.instant.details.cloud_area_fraction || 0,
          windDirection: item.data.instant.details.wind_from_direction || 0,
          swellHeight: matchingSwellData.swellHeight.sg,
          waterTemperature: matchingSwellData.waterTemperature.meto,
        };
        groupedData[date].daily.swellHeights.push(
          matchingSwellData.swellHeight.sg
        );
      } else {
        // Handle the case where no matching swellData is found
        // You can set default values or handle it as needed.
        groupedData[date].hourly[time] = {
          temperature: item.data.instant.details.air_temperature || 0,
          precipitation:
            item.data.next_1_hours?.details?.precipitation_amount ||
            0 + item.data.next_6_hours?.details?.precipitation_amount! ||
            0,
          windSpeed: item.data.instant.details.wind_speed || 0,
          cloudCover: item.data.instant.details.cloud_area_fraction || 0,
          windDirection: item.data.instant.details.wind_from_direction || 0,
          swellHeight: 0, // Set a default value
          waterTemperature: 0, // Set a default value
        };
      }
    }

    const dailySwellHeights = groupedData[date].daily.swellHeights;
    if (dailySwellHeights.length > 0) {
      const totalSwellHeight = dailySwellHeights.reduce(
        (acc, height) => acc + height,
        0
      );
      const averageSwellHeight = totalSwellHeight / dailySwellHeights.length;
      groupedData[date].daily.averageSwellHeight = averageSwellHeight;
    }

    groupedData[date].daily.temperatures.push(
      item.data.instant.details.air_temperature
    );
    groupedData[date].daily.windDirections.push(
      item.data.instant.details.wind_from_direction || 0
    );
    groupedData[date].daily.cloudCover.push(
      item.data.instant.details.cloud_area_fraction || 0
    );

    if (item.data.next_1_hours && item.data.next_1_hours.details) {
      groupedData[date].daily.precipitation.push(
        item.data.next_1_hours.details.precipitation_amount || 0
      );
    }

    if (item.data.next_6_hours) {
      groupedData[date].daily.precipitation.push(
        item.data.next_6_hours.details?.precipitation_amount || 0
      );
    }

    const windSpeed = item.data.instant.details.wind_speed || 0;
    groupedData[date].daily.windSpeeds.push(windSpeed);

    // Calculate the weighted wind direction and store it
    const weightedWindDirection =
      windSpeed * item.data.instant.details.wind_from_direction!;
    groupedData[date].daily.weightedWindDirections.push(weightedWindDirection);
  });

  // Process tide data
  for (const date in groupedData) {
    if (tideData && tideData.data) {
      for (let i = 0; i < tideData.data.length; i++) {
        const element = tideData.data[i];
        if (element.time.split("T")[0] === date) {
          if (element.type === "high") {
            groupedData[date].daily.tides.highTides.push({
              type: "high",
              time: element.time,
              height: element.height,
            });
          } else if (element.type === "low") {
            groupedData[date].daily.tides.lowTides.push({
              type: "low",
              time: element.time,
              height: element.height,
            });
          }
        }
      }
    }
    const dayData = groupedData[date];

    const totalTemperatures = dayData.daily.temperatures.reduce(
      (acc, temp) => acc + temp,
      0
    );

    dayData.daily.averageTemperature =
      totalTemperatures / dayData.daily.temperatures.length;
    dayData.daily.maxTemperature = Math.max(...dayData.daily.temperatures);
    dayData.daily.minTemperature = Math.min(...dayData.daily.temperatures);

    const totalWindSpeeds = dayData.daily.windSpeeds.reduce(
      (acc, speed) => acc + speed,
      0
    );
    const totalPrecipitation = dayData.daily.precipitation.reduce(
      (acc, precipitation) => acc + precipitation,
      0
    );

    dayData.daily.averageWindSpeed = (
      totalWindSpeeds / dayData.daily.windSpeeds.length
    ).toFixed(1);
    dayData.daily.totalPrecipitation = totalPrecipitation.toFixed(1);

    // Calculate the weighted average wind direction
    const totalWeightedWindDirection =
      dayData.daily.weightedWindDirections.reduce(
        (acc, weightedDirection) => acc + weightedDirection,
        0
      );
    dayData.daily.averageWindDirection = (
      totalWeightedWindDirection / totalWindSpeeds
    ).toFixed(1);

    // Morning conditions
    if (dayData.daily.morning.precipitation > 3) {
      dayData.daily.morning.ImageURL = "/weatherIcons/stormy-day.png";
    } else if (dayData.daily.morning.precipitation > 0.5) {
      dayData.daily.morning.ImageURL = "/weatherIcons/cloudy-and-rainy-day.png";
    } else if (dayData.daily.morning.precipitation > 0.1) {
      dayData.daily.morning.ImageURL = "/weatherIcons/rainy-day.png";
    } else if (dayData.daily.morning.temperature > 20) {
      dayData.daily.morning.ImageURL = "/weatherIcons/very-sunny-day.png";
    } else if (dayData.daily.morning.cloudCover > 80) {
      dayData.daily.morning.ImageURL = "/weatherIcons/very-cloudy-day.png";
    } else if (dayData.daily.morning.cloudCover > 50) {
      dayData.daily.morning.ImageURL = "/weatherIcons/cloudy-day.png";
    } else if (dayData.daily.morning.cloudCover > 30) {
      dayData.daily.morning.ImageURL = "/weatherIcons/partly-cloudy-day.png";
    } else if (dayData.daily.morning.cloudCover > 5) {
      dayData.daily.morning.ImageURL = "/weatherIcons/partly-sunny-day.png";
    } else {
      dayData.daily.morning.ImageURL = "/weatherIcons/sunny-day.png";
    }

    // Afternoon conditions
    if (dayData.daily.afternoon.precipitation > 3) {
      dayData.daily.afternoon.ImageURL = "/weatherIcons/stormy-day.png";
    } else if (dayData.daily.afternoon.precipitation > 0.5) {
      dayData.daily.afternoon.ImageURL = "/weatherIcons/cloudy-and-rainy-day.png";
    } else if (dayData.daily.afternoon.precipitation > 0.1) {
      dayData.daily.afternoon.ImageURL = "/weatherIcons/rainy-day.png";
    } else if (dayData.daily.afternoon.temperature > 20) {
      dayData.daily.afternoon.ImageURL = "/weatherIcons/very-sunny-day.png";
    } else if (dayData.daily.afternoon.cloudCover > 80) {
      dayData.daily.afternoon.ImageURL = "/weatherIcons/very-cloudy-day.png";
    } else if (dayData.daily.afternoon.cloudCover > 50) {
      dayData.daily.afternoon.ImageURL = "/weatherIcons/cloudy-day.png";
    } else if (dayData.daily.afternoon.cloudCover > 30) {
      dayData.daily.afternoon.ImageURL = "/weatherIcons/partly-cloudy-day.png";
    } else if (dayData.daily.afternoon.cloudCover > 5) {
      dayData.daily.afternoon.ImageURL = "/weatherIcons/partly-sunny-day.png";
    } else {
      dayData.daily.afternoon.ImageURL = "/weatherIcons/sunny-day.png";
    }
  }

  return groupedData;
}

export default WeatherTable;
