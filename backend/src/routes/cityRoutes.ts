import express from "express";
import {
  getWeatherByCity,
  getSeismicByCity,
  getDaylightByCity,
  getCityPulseData,
  recordCityPulseData,
} from "../controllers/cityController";

const router = express.Router();

router.get("/weather/:city", getWeatherByCity);
router.get("/seismic/:city", getSeismicByCity);
router.get("/daylight/:city", getDaylightByCity);
router.get("/city/:city", getCityPulseData);
router.post("/blockchain/record", recordCityPulseData);

export default router;