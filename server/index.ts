// server/index.ts
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || "";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    "Supabase credentials not set. Backend will run but DB operations will fail.",
  );
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const app = express();
app.use(cors());
app.use(express.json());

// Middleware to verify a farmer's Supabase access token
const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Authentication token required",
      });
    }

    const token = authorization.slice(7).trim();

    if (!token) {
      return res.status(401).json({
        error: "Authentication token required",
      });
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({
        error: "Invalid or expired authentication token",
      });
    }

    // Make the verified farmer ID available to protected routes
    res.locals.farmerId = data.user.id;

    next();
  } catch (error) {
    console.error("Authentication error:", error);

    return res.status(500).json({
      error: "Authentication verification failed",
    });
  }
};

// Simple health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// Real farmer registration using Supabase Authentication
app.post("/api/auth/register", async (req: Request, res: Response) => {
  try {
    const { email, password, full_name } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof full_name !== "string" ||
      !email.trim() ||
      password.length < 8 ||
      !full_name.trim()
    ) {
      return res.status(400).json({
        error:
          "Email, full name, and a password of at least 8 characters are required.",
      });
    }

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { full_name: full_name.trim() },
      },
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(201).json({
      message: "Registration submitted. Check your email for confirmation.",
      user: data.user,
      email_confirmation_required: !data.session,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Registration failed" });
  }
});

// Real farmer login using Supabase Authentication
app.post("/api/auth/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        error: "Email and password are required.",
      });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) {
      return res.status(401).json({
        error: "Invalid credentials or email not confirmed.",
      });
    }

    return res.json({
      message: "Login successful",
      user: data.user,
      session: data.session,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Login failed" });
  }
});

// Middleware to inject supabase client (could also verify token)
app.use((req: Request, _res: Response, next: NextFunction) => {
  (req as any).supabase = supabase;
  next();
});

// CRUD for farmer profiles

// Get the logged-in farmer's profile
app.get(
  "/api/profiles/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const farmerId = res.locals.farmerId as string;

      if (req.params.id !== farmerId) {
        return res.status(403).json({
          error: "You can only access your own profile",
        });
      }

      const token = req.headers.authorization!.slice(7).trim();

      // Use the farmer's token so Supabase RLS is enforced
      const farmerSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      const { data, error } = await farmerSupabase
        .from("farmer_profiles")
        .select("*")
        .eq("id", farmerId)
        .single();

      if (error) {
        return res.status(404).json({ error: "Profile not found" });
      }

      return res.json(data);
    } catch (error) {
      console.error("Get profile error:", error);
      return res.status(500).json({ error: "Failed to fetch profile" });
    }
  },
);

// Update the logged-in farmer's profile
app.put(
  "/api/profiles/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const farmerId = res.locals.farmerId as string;

      if (req.params.id !== farmerId) {
        return res.status(403).json({
          error: "You can only update your own profile",
        });
      }

      const token = req.headers.authorization!.slice(7).trim();

      const farmerSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      // Only allow farmers to edit these profile fields
      const allowedFields = [
        "full_name",
        "phone_number",
        "village",
        "district",
        "state",
        "preferred_language",
      ];

      const updates: Record<string, unknown> = {};

      for (const field of allowedFields) {
        if (Object.prototype.hasOwnProperty.call(req.body ?? {}, field)) {
          updates[field] = req.body[field];
        }
      }

      if (Object.keys(updates).length === 0) {
        return res.status(400).json({
          error: "No valid profile fields provided",
        });
      }

      const { data, error } = await farmerSupabase
        .from("farmer_profiles")
        .update(updates)
        .eq("id", farmerId)
        .select()
        .single();

      if (error) {
        console.error("Update profile error:", error);
        return res.status(500).json({ error: "Failed to update profile" });
      }

      return res.json(data);
    } catch (error) {
      console.error("Update profile error:", error);
      return res.status(500).json({ error: "Failed to update profile" });
    }
  },
);

// Add more routes (crops, soil, irrigation, weather, chat, notifications) as needed.

// Add a new farm for the logged-in farmer
app.post("/api/farms", requireAuth, async (req: Request, res: Response) => {
  try {
    const farmerId = res.locals.farmerId as string;
    const token = req.headers.authorization!.slice(7).trim();

    const {
      farm_name,
      village,
      district,
      state,
      area_acres,
      soil_type,
      primary_crop,
    } = req.body ?? {};

    // Validate the farm's area
    if (
      typeof area_acres !== "number" ||
      !Number.isFinite(area_acres) ||
      area_acres <= 0
    ) {
      return res.status(400).json({
        error: "area_acres must be a positive number",
      });
    }

    // Use the farmer's token to enforce Supabase RLS
    const farmerSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const { data, error } = await farmerSupabase
      .from("farms")
      .insert({
        farmer_id: farmerId,
        farm_name,
        village,
        district,
        state,
        area_acres,
        soil_type,
        primary_crop,
      })
      .select()
      .single();

    if (error) {
      console.error("Create farm error:", error);
      return res.status(500).json({
        error: "Failed to create farm",
      });
    }

    return res.status(201).json({
      message: "Farm created successfully",
      farm: data,
    });
  } catch (error) {
    console.error("Create farm error:", error);
    return res.status(500).json({
      error: "Failed to create farm",
    });
  }
});

// View all farms belonging to the logged-in farmer
app.get("/api/farms", requireAuth, async (req: Request, res: Response) => {
  try {
    const farmerId = res.locals.farmerId as string;
    const token = req.headers.authorization!.slice(7).trim();

    // Use the farmer's token to enforce Supabase RLS
    const farmerSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const { data, error } = await farmerSupabase
      .from("farms")
      .select("*")
      .eq("farmer_id", farmerId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Get farms error:", error);
      return res.status(500).json({
        error: "Failed to fetch farms",
      });
    }

    return res.json({
      message: "Farms fetched successfully",
      farms: data,
    });
  } catch (error) {
    console.error("Get farms error:", error);
    return res.status(500).json({
      error: "Failed to fetch farms",
    });
  }
});

// Update a farm belonging to the logged-in farmer
app.put("/api/farms/:id", requireAuth, async (req: Request, res: Response) => {
  try {
    const farmerId = res.locals.farmerId as string;
    const token = req.headers.authorization!.slice(7).trim();
    const farmId = req.params.id;

    const allowedFields = [
      "farm_name",
      "village",
      "district",
      "state",
      "area_acres",
      "soil_type",
      "primary_crop",
    ];

    const updates: Record<string, unknown> = {};

    for (const field of allowedFields) {
      if (Object.prototype.hasOwnProperty.call(req.body ?? {}, field)) {
        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        error: "No valid farm fields provided",
      });
    }

    if (
      "area_acres" in updates &&
      (typeof updates.area_acres !== "number" ||
        !Number.isFinite(updates.area_acres) ||
        updates.area_acres <= 0)
    ) {
      return res.status(400).json({
        error: "area_acres must be a positive number",
      });
    }

    const farmerSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const { data, error } = await farmerSupabase
      .from("farms")
      .update(updates)
      .eq("id", farmId)
      .eq("farmer_id", farmerId)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Update farm error:", error);
      return res.status(500).json({
        error: "Failed to update farm",
      });
    }

    if (!data) {
      return res.status(404).json({
        error: "Farm not found",
      });
    }

    return res.json({
      message: "Farm updated successfully",
      farm: data,
    });
  } catch (error) {
    console.error("Update farm error:", error);
    return res.status(500).json({
      error: "Failed to update farm",
    });
  }
});

// Delete a farm belonging to the logged-in farmer
app.delete(
  "/api/farms/:id",
  requireAuth,
  async (req: Request, res: Response) => {
    try {
      const farmerId = res.locals.farmerId as string;
      const token = req.headers.authorization!.slice(7).trim();
      const farmId = req.params.id;

      const farmerSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      const { data, error } = await farmerSupabase
        .from("farms")
        .delete()
        .eq("id", farmId)
        .eq("farmer_id", farmerId)
        .select("id")
        .maybeSingle();

      if (error) {
        console.error("Delete farm error:", error);
        return res.status(500).json({
          error: "Failed to delete farm",
        });
      }

      if (!data) {
        return res.status(404).json({
          error: "Farm not found",
        });
      }

      return res.json({
        message: "Farm deleted successfully",
      });
    } catch (error) {
      console.error("Delete farm error:", error);
      return res.status(500).json({
        error: "Failed to delete farm",
      });
    }
  },
);

// For brevity we expose generic CRUD helper.
function crud(resource: string) {
  const router = express.Router();
  router.use(requireAuth);
  router.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { data, error } = await supabase
      .from(resource)
      .select("*")
      .eq("id", id)
      .single();
    if (error) return res.status(404).json({ error: error.message });
    res.json(data);
  });

  router.post("", async (req: Request, res: Response) => {
    const { data, error } = await supabase
      .from(resource)
      .insert(req.body)
      .single();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
  });

  router.put("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { data, error } = await supabase
      .from(resource)
      .update(req.body)
      .eq("id", id)
      .single();
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

// AI Assistant endpoint – uses Gemini if key present

// AI Assistant with authentication and 4 free consultations
app.post("/api/assistant", requireAuth, async (req: Request, res: Response) => {
  try {
    const { message, language = "en" } = req.body ?? {};

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "A consultation message is required",
      });
    }

    if (typeof language !== "string" || !language.trim()) {
      return res.status(400).json({
        error: "Invalid language",
      });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!GEMINI_API_KEY || !SERVICE_ROLE_KEY) {
      return res.status(503).json({
        error: "AI assistant is not fully configured",
      });
    }

    const farmerId = res.locals.farmerId as string;
    const token = req.headers.authorization!.slice(7).trim();

    const farmerSupabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    // This client must remain on the backend only.
    const adminSupabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
    // Check whether this farmer has an active subscription.
    const { data: subscription, error: subscriptionError } =
      await farmerSupabase
        .from("farmer_subscriptions")
        .select("status, expires_at")
        .eq("farmer_id", farmerId)
        .maybeSingle();

    if (subscriptionError) {
      console.error("Subscription lookup error:", subscriptionError);

      return res.status(500).json({
        error: "Failed to check subscription status",
      });
    }

    const hasActiveSubscription =
      subscription?.status === "active" &&
      (subscription.expires_at === null ||
        (typeof subscription.expires_at === "string" &&
          Date.parse(subscription.expires_at) > Date.now()));
    // Atomically reserve one of the farmer's four free consultations.
    // Subscribers do not consume free consultations.
    let remaining: number | null = null;
    let consultationCounted = false;

    if (!hasActiveSubscription) {
      const { data, error: usageError } = await farmerSupabase.rpc(
        "use_free_consultation",
      );

      if (usageError) {
        console.error("Consultation usage error:", usageError);

        return res.status(500).json({
          error: "Failed to check consultation usage",
        });
      }

      if (data === null) {
        return res.status(403).json({
          error: "Free consultation limit reached",
          subscription_required: true,
          free_consultations_remaining: 0,
        });
      }

      remaining = data;
      consultationCounted = true;
    }
    try {
      const { GoogleGenerativeAI } = await import("@google/generative-ai");

      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

      const prompt =
        `You are an agricultural assistant for Indian farmers. ` +
        `Respond in ${language}. ` +
        `Give practical, safe agricultural advice. ` +
        `Farmer's question: ${message.trim()}`;

      const modelNames = ["gemini-3.5-flash-lite", "gemini-3.1-flash-lite"];

      let answer = "";

      for (const modelName of modelNames) {
        try {
          const model = genAI.getGenerativeModel({
            model: modelName,
          });

          const result = await model.generateContent(prompt);
          const response = await result.response;

          answer = response.text();

          if (!answer.trim()) {
            throw new Error("Gemini returned an empty answer");
          }

          break;
        } catch (modelError) {
          console.error(`Gemini model ${modelName} failed:`, modelError);

          const status = (modelError as { status?: number }).status;

          if (status !== 503 && status !== 429) {
            throw modelError;
          }
        }
      }

      if (!answer.trim()) {
        throw new Error("All Gemini models failed");
      }

      if (!answer.trim()) {
        throw new Error("Gemini returned an empty answer");
      }

      return res.json({
        answer,
        source: "gemini",
        subscription_active: hasActiveSubscription,
        consultation_counted: consultationCounted,
        free_consultations_remaining: remaining,
      });
    } catch (aiError) {
      console.error("AI generation error:", aiError);

      // Restore the consultation when Gemini fails.
      // Refund only if a free consultation was used.
      if (consultationCounted) {
        const { error: refundError } = await adminSupabase.rpc(
          "refund_free_consultation_for_farmer",
          { p_farmer_id: farmerId },
        );

        if (refundError) {
          console.error("Consultation refund failed:", refundError);

          return res.status(500).json({
            error: "AI consultation failed and refund could not be confirmed",
            consultation_counted: true,
          });
        }
      }

      return res.status(502).json({
        error: "AI consultation failed",
        consultation_counted: false,
        message: consultationCounted
          ? "Your free consultation was restored."
          : "Your subscription consultation was not completed.",
      });
    }
  } catch (error) {
    console.error("Assistant error:", error);

    return res.status(500).json({
      error: "AI assistant failed",
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
