import { SeismicData } from "../types/cityPulseTypes";

const seismicDatabase: Record<string, Omit<SeismicData, "city">> = {
  london: {
    magnitude: 1.4,
    latitude: "51.5074",
    longitude: "-0.1278",
  },
  manchester: {
    magnitude: 1.8,
    latitude: "53.4808",
    longitude: "-2.2426",
  },
  birmingham: {
    magnitude: 1.2,
    latitude: "52.4862",
    longitude: "-1.8904",
  },
  liverpool: {
    magnitude: 1.6,
    latitude: "53.4084",
    longitude: "-2.9916",
  },
  leeds: {
    magnitude: 1.3,
    latitude: "53.8008",
    longitude: "-1.5491",
  },
  bristol: {
    magnitude: 1.1,
    latitude: "51.4545",
    longitude: "-2.5879",
  },
};

export const getSeismicData = (city: string): SeismicData => {
  const normalizedCity = city.trim().toLowerCase();

  const selectedSeismic = seismicDatabase[normalizedCity] ?? {
    magnitude: 1.0,
    latitude: "0.0000",
    longitude: "0.0000",
  };

  return {
    city: normalizedCity,
    ...selectedSeismic,
  };
};