import express, { Request, Response } from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import { ServiceItem, ApiResponse } from "shared-types";

const app = express();
const PORT = process.env.PORT || 3003;

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_KEY || "",
);

app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "Services Service is running" });
});

// Get all services
app.get("/services", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from("services").select("*");

    if (error) throw error;

    const response: ApiResponse<ServiceItem[]> = {
      status: 200,
      message: "Services fetched successfully",
      data: data as ServiceItem[],
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to fetch services",
      error: String(error),
    });
  }
});

// Get service by ID
app.get("/services/:id", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (error) throw error;

    const response: ApiResponse<ServiceItem> = {
      status: 200,
      message: "Service fetched successfully",
      data: data as ServiceItem,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to fetch service",
      error: String(error),
    });
  }
});

// Create service (Admin only)
app.post("/services", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("services")
      .insert([req.body])
      .select();

    if (error) throw error;

    const response: ApiResponse<ServiceItem> = {
      status: 201,
      message: "Service created successfully",
      data: data?.[0] as ServiceItem,
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to create service",
      error: String(error),
    });
  }
});

// Update service (Admin only)
app.put("/services/:id", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("services")
      .update(req.body)
      .eq("id", req.params.id)
      .select()
      .single();

    if (error) throw error;

    const response: ApiResponse<ServiceItem> = {
      status: 200,
      message: "Service updated successfully",
      data: data as ServiceItem,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to update service",
      error: String(error),
    });
  }
});

app.listen(PORT, () => {
  console.log(`Services Service running on port ${PORT}`);
});
