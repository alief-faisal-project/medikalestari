import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import axios, { AxiosError } from "axios";

const app = express();
const PORT = process.env.PORT || 3001;

// Services URLs
const SERVICES = {
  DOCTORS: process.env.DOCTORS_SERVICE_URL || "http://localhost:3002",
  SERVICES: process.env.SERVICES_SERVICE_URL || "http://localhost:3003",
  AUTH: process.env.AUTH_SERVICE_URL || "http://localhost:3004",
};

// CORS options
const corsOptions = {
  origin: (process.env.CORS_ORIGIN || "http://localhost:3000").split(","),
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "API Gateway is running",
    timestamp: new Date().toISOString(),
    services: {
      doctors: `${SERVICES.DOCTORS}/health`,
      services: `${SERVICES.SERVICES}/health`,
      auth: `${SERVICES.AUTH}/health`,
    },
  });
});

// Doctors endpoints
app.get("/api/doctors", async (req: Request, res: Response) => {
  try {
    console.log(`Fetching doctors from ${SERVICES.DOCTORS}/doctors`);
    const response = await axios.get(`${SERVICES.DOCTORS}/doctors`, {
      timeout: 5000,
    });
    res.json(response.data);
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error("Error fetching doctors:", axiosError.message);
    res.status(500).json({
      error: "Failed to fetch doctors",
      details: axiosError.message,
      service: SERVICES.DOCTORS,
    });
  }
});

app.get("/api/doctors/:id", async (req: Request, res: Response) => {
  try {
    console.log(
      `Fetching doctor ${req.params.id} from ${SERVICES.DOCTORS}/doctors/${req.params.id}`,
    );
    const response = await axios.get(
      `${SERVICES.DOCTORS}/doctors/${req.params.id}`,
      { timeout: 5000 },
    );
    res.json(response.data);
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error("Error fetching doctor:", axiosError.message);
    res.status(500).json({
      error: "Failed to fetch doctor",
      details: axiosError.message,
    });
  }
});

// Services endpoints
app.get("/api/services", async (req: Request, res: Response) => {
  try {
    console.log(`Fetching services from ${SERVICES.SERVICES}/services`);
    const response = await axios.get(`${SERVICES.SERVICES}/services`, {
      timeout: 5000,
    });
    res.json(response.data);
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error("Error fetching services:", axiosError.message);
    res.status(500).json({
      error: "Failed to fetch services",
      details: axiosError.message,
      service: SERVICES.SERVICES,
    });
  }
});

app.get("/api/services/:id", async (req: Request, res: Response) => {
  try {
    console.log(
      `Fetching service ${req.params.id} from ${SERVICES.SERVICES}/services/${req.params.id}`,
    );
    const response = await axios.get(
      `${SERVICES.SERVICES}/services/${req.params.id}`,
      { timeout: 5000 },
    );
    res.json(response.data);
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error("Error fetching service:", axiosError.message);
    res.status(500).json({
      error: "Failed to fetch service",
      details: axiosError.message,
    });
  }
});

// Auth endpoints
app.post("/api/auth/login", async (req: Request, res: Response) => {
  try {
    console.log(`Login request from ${SERVICES.AUTH}/auth/login`);
    const response = await axios.post(`${SERVICES.AUTH}/auth/login`, req.body, {
      timeout: 5000,
    });
    res.json(response.data);
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error("Error login:", axiosError.message);
    res.status(401).json({
      error: "Authentication failed",
      details: axiosError.message,
    });
  }
});

app.post("/api/auth/logout", async (req: Request, res: Response) => {
  try {
    console.log(`Logout request from ${SERVICES.AUTH}/auth/logout`);
    const response = await axios.post(
      `${SERVICES.AUTH}/auth/logout`,
      req.body,
      {
        timeout: 5000,
      },
    );
    res.json(response.data);
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error("Error logout:", axiosError.message);
    res.status(500).json({
      error: "Logout failed",
      details: axiosError.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
  console.log(`Services:`);
  console.log(`  - Doctors: ${SERVICES.DOCTORS}`);
  console.log(`  - Services: ${SERVICES.SERVICES}`);
  console.log(`  - Auth: ${SERVICES.AUTH}`);
});
