import { WeatherData } from "../types/cityPulseTypes";

export const getWeatherData = (city: string): WeatherData => {
  const normalizedCity = city.trim().toLowerCase();

  return {
    city: normalizedCity,
    temperature: 18,
    humidity: 81,
    wind: 12,
    rain: 67,
  };
};