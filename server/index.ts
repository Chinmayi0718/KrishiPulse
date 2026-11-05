// server/index.ts
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { Configuration, OpenAIApi } from "openai"; // placeholder if needed

dotenv.config();

const PORT = process.env.PORT || 5000;
const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn("Supabase credentials not set. Backend will run but DB operations will fail.");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const app = express();
app.use(cors());
app.use(express.json());

// Simple health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// --- Auth Stubs (replace with real auth in production) ---
app.post("/api/auth/register", async (req: Request, res: Response) => {
  const { email, name } = req.body;
  // In a real app, you'd use Supabase auth. Here we just insert a user record.
  const { data, error } = await supabase.from("users").insert({ email, name }).single();
  if (error) return res.status(500).json({ error: error.message });
  res.json({ user: data });
});

app.post("/api/auth/login", async (req: Request, res: Response) => {
  const { email } = req.body;
  const { data, error } = await supabase.from("users").select("*").eq("email", email).single();
  if (error) return res.status(404).json({ error: "User not found" });
  // Return a dummy token – frontend can store it if needed.
  res.json({ token: "dummy-token", user: data });
});

// Middleware to inject supabase client (could also verify token)
app.use((req: Request, _res: Response, next: NextFunction) => {
  (req as any).supabase = supabase;
  next();
});

// CRUD for farmer profiles
app.get("/api/profiles/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("farmer_profiles").select("*").eq("id", id).single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
});

app.put("/api/profiles/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const { data, error } = await supabase.from("farmer_profiles").update(updates).eq("id", id).single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Add more routes (crops, soil, irrigation, weather, chat, notifications) as needed.
// For brevity we expose generic CRUD helper.
function crud(resource: string) {
  const router = express.Router();

  router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { data, error } = await supabase.from(resource).select("*").eq("id", id).single();
    if (error) return res.status(404).json({ error: error.message });
    res.json(data);
  });

  router.post("", async (req: Request, res: Response) => {
    const { data, error } = await supabase.from(resource).insert(req.body).single();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  router.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { data, error } = await supabase.from(resource).update(req.body).eq("id", id).single();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  router.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { error } = await supabase.from(resource).delete().eq("id", id);
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true });
  });

  return router;
}

// Register generic CRUD routers for key resources
app.use("/api/crops", crud("crops"));
app.use("/api/soil", crud("soil_moisture_records"));
app.use("/api/irrigation", crud("irrigation_records"));
app.use("/api/weather", crud("weather_records"));
app.use("/api/notifications", crud("notifications"));
app.use("/api/chat", crud("chat_history"));

// AI Assistant endpoint – uses Gemini if key present
app.post("/api/assistant", async (req: Request, res: Response) => {
  const { message, language = "en" } = req.body;
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return res.status(200).json({ answer: "[Demo] Gemini API key not configured. This is a placeholder response.", source: "demo" });
  }
  try {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `You are an agricultural assistant. Respond to the farmer's query in ${language}. Query: ${message}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    // Log to DB (optional)
    await supabase.from("chat_history").insert({ message, answer: text, language });
    res.json({ answer: text, source: "gemini" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "AI generation failed" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
