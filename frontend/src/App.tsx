import { useState } from "react";
import "./App.css";

type WeatherData = {
  city: string;
  temperature: number;
  humidity: number;
  wind: number;
  rain: number;
};

type SeismicData = {
  city: string;
  magnitude: number;
  latitude: string;
  longitude: string;
};

type DaylightData = {
  city: string;
  sunrise: string;
  sunset: string;
  daylightHours: string;
};

type CityPulseResponse = {
  city: string;
  weather: WeatherData;
  seismic: SeismicData;
  daylight: DaylightData;
};

function App() {
  const [city, setCity] = useState("");
  const [cityData, setCityData] = useState<CityPulseResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recording, setRecording] = useState(false);
  const [blockchainMessage, setBlockchainMessage] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [recordedAt, setRecordedAt] = useState("");

  const API_BASE_URL = "https://studious-lamp-6vwgrjr6q76c6w-3000.app.github.dev";

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      setCityData(null);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/api/city/${city.trim().toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch city data.");
      }

      const data: CityPulseResponse = await response.json();
      setCityData(data);
    } catch (err) {
      setError("Something went wrong while fetching city data.");
      setCityData(null);
    } finally {
      setLoading(false);
    }
  };
  const handleRecordOnBlockchain = async () => {
  if (!cityData) {
    setBlockchainMessage("Please search for a city first.");
    setTransactionId("");
    setRecordedAt("");
    return;
  }

  try {
    setRecording(true);
    setBlockchainMessage("");
    setTransactionId("");
    setRecordedAt("");

    const response = await fetch(`${API_BASE_URL}/api/blockchain/record`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cityData),
    });

    if (!response.ok) {
      throw new Error("Failed to record city data.");
    }

    const result = await response.json();

    setBlockchainMessage(result.message);
    setTransactionId(result.txId);
    setRecordedAt(result.recordedAt);
  } catch (err) {
    setBlockchainMessage("Something went wrong while recording data.");
    setTransactionId("");
    setRecordedAt("");
  } finally {
    setRecording(false);
  }
};

  return (
    <div className="app">
      <header className="hero">
        <h1>CityPulse</h1>
        <p>A hybrid Algorand DApp for trusted city intelligence.</p>
      </header>

      <section className="search-section">
        <input
          type="text"
          placeholder="Enter a city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </section>

      {loading && <p className="status-message">Loading city data...</p>}
      {error && <p className="error-message">{error}</p>}

      <section className="cards-grid">
        <div className="card">
          <h2>Weather Data</h2>
          <p>City: {cityData?.weather.city ?? "--"}</p>
          <p>Temperature: {cityData?.weather.temperature ?? "--"}</p>
          <p>Humidity: {cityData?.weather.humidity ?? "--"}</p>
          <p>Wind: {cityData?.weather.wind ?? "--"}</p>
          <p>Rain: {cityData?.weather.rain ?? "--"}</p>
        </div>

        <div className="card">
          <h2>Seismic Data</h2>
          <p>City: {cityData?.seismic.city ?? "--"}</p>
          <p>Magnitude: {cityData?.seismic.magnitude ?? "--"}</p>
          <p>Latitude: {cityData?.seismic.latitude ?? "--"}</p>
          <p>Longitude: {cityData?.seismic.longitude ?? "--"}</p>
        </div>

        <div className="card">
          <h2>Daylight Data</h2>
          <p>City: {cityData?.daylight.city ?? "--"}</p>
          <p>Sunrise: {cityData?.daylight.sunrise ?? "--"}</p>
          <p>Sunset: {cityData?.daylight.sunset ?? "--"}</p>
          <p>Daylight Hours: {cityData?.daylight.daylightHours ?? "--"}</p>
        </div>
      </section>

      <section className="blockchain-section">
  <h2>Blockchain Record</h2>
  <p>
    {blockchainMessage || "No transaction recorded yet."}
  </p>
  {transactionId && <p>Transaction ID: {transactionId}</p>}
  {recordedAt && <p>Recorded At: {recordedAt}</p>}
  <button onClick={handleRecordOnBlockchain} disabled={recording}>
    {recording ? "Recording..." : "Record on Blockchain"}
  </button>
</section>
    </div>
  );
}

export default App;