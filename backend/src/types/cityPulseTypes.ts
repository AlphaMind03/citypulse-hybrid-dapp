export interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  wind: number;
  rain: number;
}

export interface SeismicData {
  city: string;
  magnitude: number;
  latitude: string;
  longitude: string;
}

export interface DaylightData {
  city: string;
  sunrise: string;
  sunset: string;
  daylightHours: string;
}

export interface CityPulseResponse {
  city: string;
  weather: WeatherData;
  seismic: SeismicData;
  daylight: DaylightData;
}

export interface BlockchainRecordRequest {
  city: string;
  weather: WeatherData;
  seismic: SeismicData;
  daylight: DaylightData;
}

export interface BlockchainRecordResponse {
  success: boolean;
  message: string;
  txId: string;
  recordedAt: string;
}