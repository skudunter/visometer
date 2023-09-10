type BaySide = "atlantic" | "false bay";
type RawWeatherData = {
  properties: {
    timeseries: Array<{
      time: string;
      data: {
        instant: {
          details: {
            air_temperature: number;
            wind_speed?: number;
          };
        };
        next_1_hours?: {
          details: {
            precipitation_amount?: number;
          };
        };
      };
    }>;
  };
};

type RawHoursWeatherData = [
  {
    time: string;
    data: {
      instant: {
        details: {
          air_temperature: number;
          wind_speed?: number;
        };
      };
      next_1_hours?: {
        details: {
          precipitation_amount?: number;
        };
      };
    };
  }
];
type WeatherDataItem = {
  time: string;
  data: {
    instant: {
      details: {
        air_temperature: number;
        cloud_area_fraction: number;
        wind_speed?: number;
        wind_from_direction?: number;
      };
    };
    next_1_hours?: {
      details?: {
        precipitation_amount?: number;
      };
    };
    next_6_hours?: {
      details?: {
        precipitation_amount?: number;
      };
    };
  };
};
type TideData = {
  height: number;
  time: string;
  type: "high" | "low";
};
type SwellHeight = {
  icon: number;
  meteo: number;
  noaa: number;
  sg: number;
};

type WaterTemperature = {
  meto: number;
  noaa: number;
  sg: number;
};

type HourlyData = {
  swellHeight: SwellHeight;
  time: string;
  waterTemperature: WaterTemperature;
};

type RawSwellData = {
  data: { hours: HourlyData[] };
};
type WeatherGroupedData = {
  [date: string]: {
    daily: {
      morning: {
        temperature: number;
        cloudCover: number;
        precipitation: number;
        ImageURL: string;
      };
      afternoon: {
        temperature: number;
        cloudCover: number;
        precipitation: number;
        ImageURL: string;
      };
      temperatures: number[];
      precipitation: number[];
      windSpeeds: number[];
      cloudCover: number[];
      windDirections: number[];
      weightedWindDirections: number[];
      swellHeights: number[];
      averageTemperature?: number;
      maxTemperature?: number;
      minTemperature?: number;
      averageWindSpeed?: string;
      averageWindDirection?: string;
      totalPrecipitation?: string;
      averageSwellHeight?: number;

      tides: {
        highTides: TideData[];
        lowTides: TideData[];
      };
    };
    hourly: {
      [hour: string]: {
        temperature: number;
        precipitation: number;
        windSpeed: number;
        cloudCover: number;
        windDirection: number;
        swellHeight: number;
        waterTemperature: number;
      };
    };
  };
};
type WeatherTableProps = {
  weatherData: WeatherDataItem[];
  tideData: RawTideData;
  swellData: RawSwellData;
};
interface WeatherPopupProps {
  selectedDate: string | null;
  hourlyData: Record<string, WeatherHourlyData> | undefined;
}
type WeatherHourlyData = {
  temperature: number;
  precipitation: number;
  windSpeed: number;
  cloudCover: number;
  windDirection: number;
  swellHeight: number;
  waterTemperature: number;
};

type RawTideData = {
  data: {
    height: number;
    time: string;
    type: string;
  }[];
  meta: {
    cost: number;
    dailyQuota: number;
    datum: string;
    end: string;
    lat: number;
    lng: number;
    requestCount: number;
    start: string;
    station: {
      distance: number;
      lat: number;
      lng: number;
      name: string;
      source: string;
    };
  };
};
export type {
  BaySide,
  RawWeatherData,
  RawHoursWeatherData,
  WeatherGroupedData,
  WeatherDataItem,
  WeatherTableProps,
  WeatherPopupProps,
  RawTideData,
  RawSwellData,
};
