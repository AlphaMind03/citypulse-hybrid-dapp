import express from "express";
import {
  getWeatherByCity,
  getSeismicByCity,
  getDaylightByCity,
  getCityPulseData,
} from "../controllers/cityController";

const router = express.Router();

router.get("/weather/:city", getWeatherByCity);
router.get("/seismic/:city", getSeismicByCity);
router.get("/daylight/:city", getDaylightByCity);
router.get("/city/:city", getCityPulseData);

export default router;