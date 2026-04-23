import { SeismicData } from "../types/cityPulseTypes";

export const getSeismicData = (city: string): SeismicData => {
  const normalizedCity = city.trim().toLowerCase();

  return {
    city: normalizedCity,
    magnitude: 1.4,
    latitude: "53.275",
    longitude: "6.348",
  };
};