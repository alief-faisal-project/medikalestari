import express, { Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import { ApiResponse } from "shared-types";

const app = express();
const PORT = process.env.PORT || 3001;

// Services URLs
const SERVICES = {
  DOCTORS: process.env.DOCTORS_SERVICE_URL || "http://localhost:3002",
  SERVICES: process.env.SERVICES_SERVICE_URL || "http://localhost:3003",
  AUTH: process.env.AUTH_SERVICE_URL || "http://localhost:3004",
};

app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "API Gateway is running" });
});

// Doctors endpoints
app.get("/api/doctors", async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${SERVICES.DOCTORS}/doctors`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
});

app.get("/api/doctors/:id", async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `${SERVICES.DOCTORS}/doctors/${req.params.id}`,
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch doctor" });
  }
});

// Services endpoints
app.get("/api/services", async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${SERVICES.SERVICES}/services`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

app.get("/api/services/:id", async (req: Request, res: Response) => {
  try {
    const response = await axios.get(
      `${SERVICES.SERVICES}/services/${req.params.id}`,
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch service" });
  }
});

// Auth endpoints
app.post("/api/auth/login", async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`${SERVICES.AUTH}/auth/login`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(401).json({ error: "Authentication failed" });
  }
});

app.post("/api/auth/logout", async (req: Request, res: Response) => {
  try {
    const response = await axios.post(`${SERVICES.AUTH}/auth/logout`, req.body);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Logout failed" });
  }
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
