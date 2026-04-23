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
      setBlockchainMessage("");
      setTransactionId("");
      setRecordedAt("");

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
    <div className="app-shell">
      <div className="background-glow glow-one"></div>
      <div className="background-glow glow-two"></div>

      <main className="dashboard">
        <header className="hero">
          <div className="hero-badge">Hybrid Algorand DApp</div>
          <h1>CityPulse</h1>
          <p>
            Trusted city intelligence powered by a React frontend, structured backend,
            and blockchain recording flow.
          </p>
        </header>

        <section className="search-panel">
          <div className="search-box">
            <input
              type="text"
              placeholder="Enter a city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            
            <button onClick={handleSearch} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
          <p className="helper-text">
  Try: London, Manchester, Birmingham, Liverpool, Leeds, Bristol
</p>

          {loading && <p className="status-message">Loading city data...</p>}
          {error && <p className="error-message">{error}</p>}
        </section>

        <section className="cards-grid">
          <article className="card">
            <div className="card-header">
              <h2>Weather Data</h2>
              <span className="card-tag">Live Route</span>
            </div>
            <div className="card-content">
              <div className="data-row">
                <span>City</span>
                <strong>{cityData?.weather.city ?? "--"}</strong>
              </div>
              <div className="data-row">
                <span>Temperature</span>
                <strong>{cityData?.weather.temperature ?? "--"}</strong>
              </div>
              <div className="data-row">
                <span>Humidity</span>
                <strong>{cityData?.weather.humidity ?? "--"}</strong>
              </div>
              <div className="data-row">
                <span>Wind</span>
                <strong>{cityData?.weather.wind ?? "--"}</strong>
              </div>
              <div className="data-row">
                <span>Rain</span>
                <strong>{cityData?.weather.rain ?? "--"}</strong>
              </div>
            </div>
          </article>

          <article className="card">
            <div className="card-header">
              <h2>Seismic Data</h2>
              <span className="card-tag">Live Route</span>
            </div>
            <div className="card-content">
              <div className="data-row">
                <span>City</span>
                <strong>{cityData?.seismic.city ?? "--"}</strong>
              </div>
              <div className="data-row">
                <span>Magnitude</span>
                <strong>{cityData?.seismic.magnitude ?? "--"}</strong>
              </div>
              <div className="data-row">
                <span>Latitude</span>
                <strong>{cityData?.seismic.latitude ?? "--"}</strong>
              </div>
              <div className="data-row">
                <span>Longitude</span>
                <strong>{cityData?.seismic.longitude ?? "--"}</strong>
              </div>
            </div>
          </article>

          <article className="card">
            <div className="card-header">
              <h2>Daylight Data</h2>
              <span className="card-tag">Live Route</span>
            </div>
            <div className="card-content">
              <div className="data-row">
                <span>City</span>
                <strong>{cityData?.daylight.city ?? "--"}</strong>
              </div>
              <div className="data-row">
                <span>Sunrise</span>
                <strong>{cityData?.daylight.sunrise ?? "--"}</strong>
              </div>
              <div className="data-row">
                <span>Sunset</span>
                <strong>{cityData?.daylight.sunset ?? "--"}</strong>
              </div>
              <div className="data-row">
                <span>Daylight Hours</span>
                <strong>{cityData?.daylight.daylightHours ?? "--"}</strong>
              </div>
            </div>
          </article>
        </section>

        <section className="blockchain-panel">
          <div className="blockchain-top">
            <div>
              <p className="section-label">Blockchain Record</p>
              <h2>Record current city data</h2>
            </div>
            <button
              className="record-button"
              onClick={handleRecordOnBlockchain}
              disabled={recording}
            >
              {recording ? "Recording..." : "Record on Blockchain"}
            </button>
          </div>

          <div className="blockchain-status">
            <p className="blockchain-message">
              {blockchainMessage || "No transaction recorded yet."}
            </p>

            <div className="meta-grid">
              <div className="meta-card">
                <span>Transaction ID</span>
                <strong>{transactionId || "--"}</strong>
              </div>
              <div className="meta-card">
                <span>Recorded At</span>
                <strong>{recordedAt || "--"}</strong>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;