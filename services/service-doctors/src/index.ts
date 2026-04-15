import express, { Request, Response } from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import { Doctor, ApiResponse } from "shared-types";

const app = express();
const PORT = process.env.PORT || 3002;

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_KEY || "",
);

app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "Doctors Service is running" });
});

// Get all doctors
app.get("/doctors", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from("doctors").select("*");

    if (error) throw error;

    const response: ApiResponse<Doctor[]> = {
      status: 200,
      message: "Doctors fetched successfully",
      data: data as Doctor[],
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to fetch doctors",
      error: String(error),
    });
  }
});

// Get doctor by ID
app.get("/doctors/:id", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (error) throw error;

    const response: ApiResponse<Doctor> = {
      status: 200,
      message: "Doctor fetched successfully",
      data: data as Doctor,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to fetch doctor",
      error: String(error),
    });
  }
});

// Create doctor (Admin only)
app.post("/doctors", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("doctors")
      .insert([req.body])
      .select();

    if (error) throw error;

    const response: ApiResponse<Doctor> = {
      status: 201,
      message: "Doctor created successfully",
      data: data?.[0] as Doctor,
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to create doctor",
      error: String(error),
    });
  }
});

// Update doctor (Admin only)
app.put("/doctors/:id", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("doctors")
      .update(req.body)
      .eq("id", req.params.id)
      .select()
      .single();

    if (error) throw error;

    const response: ApiResponse<Doctor> = {
      status: 200,
      message: "Doctor updated successfully",
      data: data as Doctor,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to update doctor",
      error: String(error),
    });
  }
});

app.listen(PORT, () => {
  console.log(`Doctors Service running on port ${PORT}`);
});
