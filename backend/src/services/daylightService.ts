import { DaylightData } from "../types/cityPulseTypes";

export const getDaylightData = (city: string): DaylightData => {
  const normalizedCity = city.trim().toLowerCase();

  return {
    city: normalizedCity,
    sunrise: "06:10",
    sunset: "19:58",
    daylightHours: "13h 48m",
  };
};