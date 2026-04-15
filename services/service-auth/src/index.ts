import express, { Request, Response } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";
import { LoginRequest, LoginResponse, ApiResponse, User } from "shared-types";

const app = express();
const PORT = process.env.PORT || 3004;
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_KEY || "",
);

app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "Auth Service is running" });
});

// Login
app.post("/auth/login", async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginRequest = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Get user from database
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" },
    );

    const response: ApiResponse<LoginResponse> = {
      status: 200,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Login failed",
      error: String(error),
    });
  }
});

// Logout
app.post("/auth/logout", (req: Request, res: Response) => {
  const response: ApiResponse<null> = {
    status: 200,
    message: "Logout successful",
  };

  res.json(response);
});

// Verify token
app.post("/auth/verify", (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const response: ApiResponse<null> = {
      status: 200,
      message: "Token is valid",
    };

    res.json(response);
  } catch (error) {
    res.status(401).json({
      status: 401,
      message: "Invalid token",
      error: String(error),
    });
  }
});

app.listen(PORT, () => {
  console.log(`Auth Service running on port ${PORT}`);
});
