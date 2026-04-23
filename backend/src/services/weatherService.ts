import { WeatherData } from "../types/cityPulseTypes";

const weatherDatabase: Record<string, Omit<WeatherData, "city">> = {
  london: {
    temperature: 18,
    humidity: 81,
    wind: 12,
    rain: 67,
  },
  manchester: {
    temperature: 15,
    humidity: 84,
    wind: 10,
    rain: 72,
  },
  birmingham: {
    temperature: 17,
    humidity: 79,
    wind: 9,
    rain: 61,
  },
  liverpool: {
    temperature: 14,
    humidity: 86,
    wind: 14,
    rain: 75,
  },
  leeds: {
    temperature: 16,
    humidity: 80,
    wind: 11,
    rain: 64,
  },
  bristol: {
    temperature: 19,
    humidity: 76,
    wind: 8,
    rain: 58,
  },
};

export const getWeatherData = (city: string): WeatherData => {
  const normalizedCity = city.trim().toLowerCase();

  const selectedWeather = weatherDatabase[normalizedCity] ?? {
    temperature: 18,
    humidity: 80,
    wind: 10,
    rain: 60,
  };

  return {
    city: normalizedCity,
    ...selectedWeather,
  };
};