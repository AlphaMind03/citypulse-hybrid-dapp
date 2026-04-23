import express from "express";
import cors from "cors";
import cityRoutes from "./routes/cityRoutes";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "CityPulse backend is running.",
  });
});

app.use("/api", cityRoutes);

app.listen(PORT, () => {
  console.log(`CityPulse backend server is running on port ${PORT}`);
});