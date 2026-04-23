import { Request, Response } from "express";
import { getWeatherData } from "../services/weatherService";
import { getSeismicData } from "../services/seismicService";
import { getDaylightData } from "../services/daylightService";
import { CityPulseResponse } from "../types/cityPulseTypes";

type CityParams = {
  city: string;
};

export const getWeatherByCity = (
  req: Request<CityParams>,
  res: Response
): void => {
  const city = req.params.city;
  const weatherData = getWeatherData(city);

  res.status(200).json(weatherData);
};

export const getSeismicByCity = (
  req: Request<CityParams>,
  res: Response
): void => {
  const city = req.params.city;
  const seismicData = getSeismicData(city);

  res.status(200).json(seismicData);
};

export const getDaylightByCity = (
  req: Request<CityParams>,
  res: Response
): void => {
  const city = req.params.city;
  const daylightData = getDaylightData(city);

  res.status(200).json(daylightData);
};

export const getCityPulseData = (
  req: Request<CityParams>,
  res: Response
): void => {
  const city = req.params.city;

  const response: CityPulseResponse = {
    city: city.trim().toLowerCase(),
    weather: getWeatherData(city),
    seismic: getSeismicData(city),
    daylight: getDaylightData(city),
  };

  res.status(200).json(response);
};