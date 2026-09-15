import express, { Request, Response, NextFunction, RequestHandler } from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import sharp, { Metadata as SharpMetadata } from "sharp";
import { fileTypeFromBuffer } from "file-type";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createServer as createViteServer } from "vite";

// Global Environment & Security Keys Configuration (Fail-safe, Lazy, Non-crashing)
const JWT_SECRET = process.env.JWT_SECRET || process.env.SESSION_SECRET || "sr_group_sec_jwt_v1_98a72b64d1f2e8c0";
const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET || "sr_group_captcha_hmac_secret_44f1e09c8b7a";
const ADMIN_USERNAME = (process.env.ADMIN_USERNAME || "vikas ranjan").trim();
// Default bootstrap password hash for initial deployment if not provided in environment
const DEFAULT_BOOTSTRAP_PASSWORD_HASH = "$2b$10$QBdTHezLKcO5nBMQW7QFk.ogxgEao4Zkr0iPlIbAdx3KSUI1WFiDe"; // bcrypt hash of "vikas@123"

const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || DEFAULT_BOOTSTRAP_PASSWORD_HASH;
const ADMIN_PASSWORD_PLAIN = process.env.ADMIN_PASSWORD || "vikas@123";

interface EnquiryRecord {
  id: string;
  timestamp: string;
  type: "quote" | "contact" | "career";
  companyContext?: string;
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  industry?: string;
  serviceRequired?: string;
  projectLocation?: string;
  estimatedSize?: string;
  message: string;
  filename?: string;
  ipHash?: string;
}

const inMemoryEnquiries: EnquiryRecord[] = [];

// -------------------------------------------------------------
// PERSISTENT DATA DIRECTORY SETUP & LIFECYCLE
// -------------------------------------------------------------
const DATA_DIR = path.join(process.cwd(), "data");
const CMD_FILE = path.join(DATA_DIR, "cmd.json");
const LOGOS_FILE = path.join(DATA_DIR, "logos.json");
const ENQUIRIES_FILE = path.join(DATA_DIR, "enquiries.json");
const WORKED_COMPANIES_FILE = path.join(DATA_DIR, "worked_with_companies.json");

if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (e) {
    console.error("[SR GROUP] Failed to create data directory:", e);
  }
}

// -------------------------------------------------------------
// WORKED WITH COMPANIES RECORD DEFINITION & INITIAL SAMPLES
// -------------------------------------------------------------
interface WorkedWithCompanyRecord {
  id: string;
  company_name: string;
  logo_url?: string;
  industry: string;
  category: string;
  project_name?: string;
  scope_of_work?: string;
  location?: string;
  year?: string;
  description?: string;
  display_order: number;
  status: "active" | "inactive";
  projects?: Array<{
    projectName: string;
    scopeOfWork?: string;
    year?: string;
    location?: string;
  }>;
  created_at: string;
  updated_at: string;
}

const inMemoryWorkedCompanies: WorkedWithCompanyRecord[] = [];

// Clean initial sample data clearly marked as requested
const INITIAL_WORKED_COMPANIES_SAMPLE: WorkedWithCompanyRecord[] = [
  {
    id: "cmp-sample-1",
    company_name: "TATA STEEL INDUSTRIAL DIVISION (SAMPLE COMPANY)",
    logo_url: "",
    industry: "Steel & Metallurgy",
    category: "Steel",
    project_name: "Pellet Plant Structural & Utility Piping",
    scope_of_work: "Heavy structural fabrication, equipment erection & high-pressure steam piping execution.",
    location: "Odisha, India",
    year: "2022 - 2024",
    description: "Multi-phase plant structural and utility piping installation executed with certified quality control and strict HSE compliance.",
    display_order: 1,
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cmp-sample-3",
    company_name: "RELIANCE INDUSTRIES LIMITED (SAMPLE COMPANY)",
    logo_url: "",
    industry: "Refinery & Petrochemicals",
    category: "Refinery",
    project_name: "Hydrocracker Expansion & Interconnecting Lines",
    scope_of_work: "Alloy steel piping fabrication, hydrostatic testing, NDT radiography & isometric execution.",
    location: "Jamnagar, Gujarat, India",
    year: "2023 - 2024",
    description: "Specialized high-pressure hydrocarbon pipeline installation with 100% radiographic weld clearance.",
    display_order: 3,
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cmp-sample-4",
    company_name: "GERMAN GREEN STEEL AND POWER LIMITED (SAMPLE COMPANY)",
    logo_url: "",
    industry: "Infrastructure & Heavy",
    category: "Infrastructure",
    project_name: "Industrial Corridor Elevated Heavy Girders",
    scope_of_work: "Box girder fabrication, site erection, torque tightening & NDT compliance.",
    location: "Western Freight Corridor, India",
    year: "2022 - 2023",
    description: "Heavy structural engineering support with dedicated fabrication jigs and crawler crane mobilization.",
    display_order: 4,
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cmp-sample-5",
    company_name: "JINDAL POWER & STEEL (SAMPLE COMPANY)",
    logo_url: "",
    industry: "Power & Heavy Engineering",
    category: "Power",
    project_name: "Captive Power Plant Substation & Cabling",
    scope_of_work: "HT/LT cable laying, transformer testing, switchgear panel erection & plant commissioning.",
    location: "Raigarh, Chhattisgarh, India",
    year: "2023",
    description: "Electrical engineering package for captive generation station with complete protection relay testing.",
    display_order: 5,
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "cmp-sample-6",
    company_name: "ADANI PORTS & SEZ (SAMPLE COMPANY)",
    logo_url: "",
    industry: "Manufacturing & Marine Infra",
    category: "Manufacturing",
    project_name: "Bulk Material Handling Conveyor Structure",
    scope_of_work: "Trestle structural fabrication, conveyor gallery erection, drive tower installation.",
    location: "Mundra Port, Gujarat, India",
    year: "2021 - 2022",
    description: "Rapid turnaround marine terminal conveyor structural erection conforming to marine grade anti-corrosion coating.",
    display_order: 6,
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

// Load persisted worked companies on server start
function loadPersistedWorkedCompanies(): void {
  try {
    if (fs.existsSync(WORKED_COMPANIES_FILE)) {
      const raw = fs.readFileSync(WORKED_COMPANIES_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        inMemoryWorkedCompanies.length = 0;
        inMemoryWorkedCompanies.push(...parsed);
        console.log(`[SR GROUP] Loaded ${inMemoryWorkedCompanies.length} worked-with company records from storage.`);
        return;
      }
    }

    // Initialize with sample data if file does not exist or is empty
    inMemoryWorkedCompanies.length = 0;
    inMemoryWorkedCompanies.push(...INITIAL_WORKED_COMPANIES_SAMPLE);
    savePersistedWorkedCompanies();
    console.log(`[SR GROUP] Initialized worked-with company database with ${inMemoryWorkedCompanies.length} sample records.`);
  } catch (err: any) {
    console.error("[SR GROUP] Error loading worked_with_companies.json:", err?.message || err);
    if (inMemoryWorkedCompanies.length === 0) {
      inMemoryWorkedCompanies.push(...INITIAL_WORKED_COMPANIES_SAMPLE);
    }
  }
}

function savePersistedWorkedCompanies(): void {
  try {
    fs.writeFileSync(WORKED_COMPANIES_FILE, JSON.stringify(inMemoryWorkedCompanies, null, 2), "utf-8");
  } catch (err: any) {
    console.error("[SR GROUP] Error saving worked_with_companies.json:", err?.message || err);
  }
}

loadPersistedWorkedCompanies();

// Load persisted enquiries on server start
function loadPersistedEnquiries(): void {
  try {
    if (fs.existsSync(ENQUIRIES_FILE)) {
      const raw = fs.readFileSync(ENQUIRIES_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        inMemoryEnquiries.length = 0;
        inMemoryEnquiries.push(...parsed);
        console.log(`[SR GROUP] Loaded ${inMemoryEnquiries.length} persisted enquiries from storage.`);
      }
    }
  } catch (err: any) {
    console.error("[SR GROUP] Error loading enquiries.json:", err?.message || err);
  }
}

function savePersistedEnquiries(): void {
  try {
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(inMemoryEnquiries, null, 2), "utf-8");
  } catch (err: any) {
    console.error("[SR GROUP] Error saving enquiries.json:", err?.message || err);
  }
}

// Immediately load persisted records on module evaluation
loadPersistedEnquiries();

// Image Security Processing Types & Constants
interface SanitizedImageResult {
  dataUrl: string;
  width: number;
  height: number;
  aspectRatio: number;
  mimeType: "image/jpeg" | "image/png" | "image/webp";
  size: number;
}

const ALLOWED_IMAGE_MIMES = ["image/jpeg", "image/png", "image/webp"] as const;
const MAX_IMAGE_PAYLOAD_BYTES = 8 * 1024 * 1024; // 8MB binary limit
const MAX_IMAGE_DIMENSION = 6000; // 6000px max width or height
const MAX_IMAGE_PIXELS = 25_000_000; // 25 megapixels (protection against decompression bombs)

/**
 * Validates binary magic-bytes, inspects dimensions/pixel-counts via Sharp,
 * re-encodes the image and strips all EXIF/camera metadata.
 */
async function validateAndSanitizeImage(
  dataUrlOrBase64: unknown,
  preferPng = false
): Promise<SanitizedImageResult> {
  if (typeof dataUrlOrBase64 !== "string" || !dataUrlOrBase64.trim()) {
    throw new Error("Invalid or unsupported image file.");
  }

  const trimmed = dataUrlOrBase64.trim();
  let base64Payload = trimmed;

  // Extract base64 payload if prefixed with data URI scheme
  const matches = trimmed.match(/^data:([a-zA-Z0-9/+.-]+);base64,(.+)$/s);
  if (matches) {
    base64Payload = matches[2];
  }

  // Basic sanity check on base64 content
  if (!base64Payload || base64Payload.length < 10) {
    throw new Error("Invalid or unsupported image file.");
  }

  // Approximate base64 size check before decoding
  if (base64Payload.length > 12 * 1024 * 1024) {
    throw new Error("Uploaded image exceeds 8MB maximum size.");
  }

  let buffer: Buffer;
  try {
    buffer = Buffer.from(base64Payload, "base64");
  } catch {
    throw new Error("Invalid or unsupported image file.");
  }

  if (!buffer || buffer.length === 0) {
    throw new Error("Invalid or unsupported image file.");
  }

  if (buffer.length > MAX_IMAGE_PAYLOAD_BYTES) {
    throw new Error("Uploaded image exceeds 8MB maximum size.");
  }

  // 1. Binary Magic-Byte Detection via file-type
  const detected = await fileTypeFromBuffer(buffer);
  if (!detected || !ALLOWED_IMAGE_MIMES.includes(detected.mime as any)) {
    throw new Error("Invalid or unsupported image file. Only JPG, PNG, and WebP images are allowed.");
  }

  // 2. Decode and inspect with Sharp (with limitInputPixels to prevent decompression bombs)
  let metadata: SharpMetadata;
  try {
    const sharpInstance = sharp(buffer, { failOn: "error", limitInputPixels: MAX_IMAGE_PIXELS });
    metadata = await sharpInstance.metadata();
  } catch (err: any) {
    console.error("[IMAGE SECURITY ERROR] Failed to decode image with Sharp:", err?.message);
    throw new Error("Invalid or unsupported image file.");
  }

  const width = metadata.width || 0;
  const height = metadata.height || 0;
  const totalPixels = width * height;

  if (width <= 0 || height <= 0) {
    throw new Error("Invalid or unsupported image file.");
  }

  if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION || totalPixels > MAX_IMAGE_PIXELS) {
    throw new Error(`Image dimensions exceed the allowable limit (maximum ${MAX_IMAGE_DIMENSION}x${MAX_IMAGE_DIMENSION} px, 25 megapixels).`);
  }

  // 3. Re-encode and Strip EXIF/Metadata (Sharp strips EXIF by default when withMetadata is not called)
  let outputBuffer: Buffer;
  let finalMime: "image/jpeg" | "image/png" | "image/webp";

  try {
    if (preferPng || metadata.hasAlpha || detected.mime === "image/png") {
      finalMime = "image/png";
      outputBuffer = await sharp(buffer, { limitInputPixels: MAX_IMAGE_PIXELS })
        .rotate() // auto-orient based on EXIF before stripping
        .png({ compressionLevel: 8, adaptiveFiltering: true })
        .toBuffer();
    } else if (detected.mime === "image/webp") {
      finalMime = "image/webp";
      outputBuffer = await sharp(buffer, { limitInputPixels: MAX_IMAGE_PIXELS })
        .rotate()
        .webp({ quality: 90 })
        .toBuffer();
    } else {
      finalMime = "image/jpeg";
      outputBuffer = await sharp(buffer, { limitInputPixels: MAX_IMAGE_PIXELS })
        .rotate()
        .jpeg({ quality: 88, mozjpeg: true })
        .toBuffer();
    }
  } catch (err: any) {
    console.error("[IMAGE RE-ENCODING ERROR]:", err?.message);
    throw new Error("Invalid or unsupported image file.");
  }

  // Re-verify output dimensions
  const finalMeta = await sharp(outputBuffer).metadata();
  const finalWidth = finalMeta.width || width;
  const finalHeight = finalMeta.height || height;
  const aspectRatio = finalHeight > 0 ? Number((finalWidth / finalHeight).toFixed(3)) : 1;

  const sanitizedDataUrl = `data:${finalMime};base64,${outputBuffer.toString("base64")}`;

  return {
    dataUrl: sanitizedDataUrl,
    width: finalWidth,
    height: finalHeight,
    aspectRatio,
    mimeType: finalMime,
    size: outputBuffer.length,
  };
}

// Rate Limiter Maps
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const formRateLimitMap = new Map<string, { count: number; resetTime: number }>();
const loginAttemptsMap = new Map<string, { attempts: number; lockUntil: number }>();

// Simple sanitization helper to neutralize HTML/script injection
function sanitizeText(input: unknown, maxLength = 2000): string {
  if (typeof input !== "string") return "";
  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, ""); // strip raw angle brackets to prevent HTML/XSS injection
}

// Basic email validation regex
function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return typeof email === "string" && email.length <= 150 && emailRegex.test(email.trim());
}

// Basic phone validation (international and national)
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[+0-9\s\-()]{7,25}$/;
  return typeof phone === "string" && phoneRegex.test(phone.trim());
}

// General API Rate Limiter (100 requests per 1 minute)
function generalApiRateLimiter(req: Request, res: Response, next: NextFunction): void {
  const clientIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 100;

  const current = rateLimitMap.get(clientIp);
  if (!current || now > current.resetTime) {
    rateLimitMap.set(clientIp, { count: 1, resetTime: now + windowMs });
    next();
  } else if (current.count < maxRequests) {
    current.count++;
    next();
  } else {
    res.status(429).json({ error: "Too many requests. Please try again in a moment." });
  }
}

// Strict Form Submission Rate Limiter (15 submissions per 5 minutes)
function formSubmissionRateLimiter(req: Request, res: Response, next: NextFunction): void {
  const clientIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const windowMs = 5 * 60 * 1000;
  const maxSubmissions = 15;

  const current = formRateLimitMap.get(clientIp);
  if (!current || now > current.resetTime) {
    formRateLimitMap.set(clientIp, { count: 1, resetTime: now + windowMs });
    next();
  } else if (current.count < maxSubmissions) {
    current.count++;
    next();
  } else {
    res.status(429).json({ error: "Form submission limit reached. Please wait before submitting again." });
  }
}

// -------------------------------------------------------------
// ANTI-BOT CAPTCHA GENERATION & HMAC VERIFICATION
// -------------------------------------------------------------
function generateCaptchaChallenge(): { token: string; question: string } {
  const a = Math.floor(Math.random() * 12) + 3; // 3 to 14
  const b = Math.floor(Math.random() * 9) + 2;  // 2 to 10
  const answer = a + b;
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minute expiry
  const nonce = crypto.randomBytes(6).toString("hex");

  const rawData = `${answer}:${expiresAt}:${nonce}`;
  const hmac = crypto.createHmac("sha256", CAPTCHA_SECRET).update(rawData).digest("hex");
  const token = Buffer.from(JSON.stringify({ raw: rawData, sig: hmac })).toString("base64url");

  return {
    token,
    question: `Industrial Verification: What is ${a} + ${b}?`,
  };
}

function verifyCaptchaChallenge(token: unknown, userAnswer: unknown): boolean {
  if (!token || typeof token !== "string" || !userAnswer) {
    return false;
  }

  try {
    const parsed = JSON.parse(Buffer.from(token, "base64url").toString("utf-8"));
    if (!parsed || !parsed.raw || !parsed.sig) return false;

    const expectedSig = crypto.createHmac("sha256", CAPTCHA_SECRET).update(parsed.raw).digest("hex");
    if (parsed.sig !== expectedSig) return false;

    const [correctAnswer, expiresAtStr] = parsed.raw.split(":");
    const expiresAt = parseInt(expiresAtStr, 10);
    if (isNaN(expiresAt) || Date.now() > expiresAt) return false;

    const cleanedUserAnswer = String(userAnswer).trim();
    return cleanedUserAnswer === correctAnswer;
  } catch (e) {
    return false;
  }
}

// -------------------------------------------------------------
// SERVER-SIDE ADMIN AUTHENTICATION & AUTHORIZATION MIDDLEWARE
// -------------------------------------------------------------
export interface AuthRequest extends Request {
  adminUser?: { username: string; role: string };
}

function requireAdminAuth(req: AuthRequest, res: Response, next: NextFunction): void {
  const token =
    req.cookies?.sr_admin_jwt ||
    req.cookies?.sr_admin_token ||
    (req.headers.authorization ? req.headers.authorization.replace(/^Bearer\s+/i, "").trim() : "") ||
    (typeof req.headers["x-admin-token"] === "string" ? req.headers["x-admin-token"].trim() : "");

  if (!token) {
    res.status(401).json({
      error: "Authentication required. Please sign in to the SR GROUP Administration Console.",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { username: string; role: string };
    if (!decoded || !decoded.username || decoded.role !== "admin") {
      res.status(403).json({ error: "Access denied. Insufficient administrative privileges." });
      return;
    }
    req.adminUser = decoded;
    next();
  } catch (err: any) {
    res.status(401).json({ error: "Session expired or invalid authentication token. Please sign in again." });
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Cookie Parser Middleware
  app.use(cookieParser());

  // Security Headers Middleware
  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    // Strict-Transport-Security (1 year)
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
    // Cross-Origin-Opener-Policy
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    next();
  });

  // Strict JSON payload body limit
  app.use(express.json({ limit: "10mb" }));

  // Apply general rate limiter to all /api routes
  app.use("/api", generalApiRateLimiter);

  // Health endpoint
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", group: "SR GROUP", time: new Date().toISOString() });
  });

  // -------------------------------------------------------------
  // CAPTCHA API ENDPOINT
  // -------------------------------------------------------------
  app.get("/api/captcha", (_req: Request, res: Response) => {
    const challenge = generateCaptchaChallenge();
    res.json(challenge);
  });

  // -------------------------------------------------------------
  // ADMIN AUTHENTICATION ENDPOINTS
  // -------------------------------------------------------------
  app.post("/api/admin/login", async (req: Request, res: Response) => {
    const clientIp = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
    const now = Date.now();

    // Check brute-force lockout
    const attemptData = loginAttemptsMap.get(clientIp) || { attempts: 0, lockUntil: 0 };
    if (now < attemptData.lockUntil) {
      const waitSec = Math.ceil((attemptData.lockUntil - now) / 1000);
      console.warn(`[SECURITY AUDIT] Blocked login attempt from locked IP ${clientIp} (${waitSec}s remaining)`);
      res.status(429).json({ error: `Account locked due to excessive failed attempts. Please retry in ${waitSec} seconds.` });
      return;
    }

    const { username, password } = req.body || {};
    const cleanUser = typeof username === "string" ? username.trim() : "";
    const cleanPass = typeof password === "string" ? password : "";

    if (!cleanUser || !cleanPass) {
      res.status(400).json({ error: "Please provide both username and password." });
      return;
    }

    let isPasswordValid = false;

    // Check username match
    if (cleanUser.toLowerCase() === ADMIN_USERNAME.toLowerCase()) {
      // Validate password against bcrypt hash or fallback plain check
      try {
        if (ADMIN_PASSWORD_HASH && ADMIN_PASSWORD_HASH.startsWith("$2")) {
          isPasswordValid = await bcrypt.compare(cleanPass, ADMIN_PASSWORD_HASH);
        }
      } catch {
        isPasswordValid = false;
      }

      if (!isPasswordValid && cleanPass === ADMIN_PASSWORD_PLAIN) {
        isPasswordValid = true;
      }
    }

    if (!isPasswordValid) {
      attemptData.attempts += 1;
      if (attemptData.attempts >= 5) {
        attemptData.lockUntil = now + 15 * 60 * 1000; // 15-minute lock
        console.warn(`[SECURITY AUDIT] IP ${clientIp} locked out after 5 failed admin login attempts.`);
      }
      loginAttemptsMap.set(clientIp, attemptData);
      console.warn(`[SECURITY AUDIT] Failed admin login attempt for user '${cleanUser}' from IP ${clientIp}`);
      res.status(401).json({ error: "Invalid credentials. Please verify your username and password." });
      return;
    }

    // Reset failed attempts on success
    loginAttemptsMap.delete(clientIp);

    // Issue signed JWT token
    const token = jwt.sign(
      { username: ADMIN_USERNAME, role: "admin", iat: Math.floor(Date.now() / 1000) },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    // Set secure HttpOnly cookie (sr_admin_jwt and sr_admin_token)
    const isProd = process.env.NODE_ENV === "production";
    const cookieOptions = {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax" as const,
      maxAge: 8 * 60 * 60 * 1000, // 8 hours
      path: "/",
    };

    res.cookie("sr_admin_jwt", token, cookieOptions);
    res.cookie("sr_admin_token", token, cookieOptions);

    console.log(`[SECURITY AUDIT] Successful admin login for '${ADMIN_USERNAME}' from IP ${clientIp}`);
    res.json({
      success: true,
      user: { username: ADMIN_USERNAME, role: "admin" },
      token,
      message: "Admin session authenticated successfully.",
    });
  });

  app.post("/api/admin/logout", (_req: Request, res: Response) => {
    const isProd = process.env.NODE_ENV === "production";
    const clearOptions = {
      path: "/",
      httpOnly: true,
      sameSite: "lax" as const,
      secure: isProd,
    };
    res.clearCookie("sr_admin_jwt", clearOptions);
    res.clearCookie("sr_admin_token", clearOptions);
    console.log("[SECURITY AUDIT] Admin session signed out.");
    res.json({ success: true, message: "Signed out successfully." });
  });

  app.get("/api/admin/me", (req: Request, res: Response) => {
    const token =
      req.cookies?.sr_admin_jwt ||
      req.cookies?.sr_admin_token ||
      (req.headers.authorization ? req.headers.authorization.replace(/^Bearer\s+/i, "").trim() : "") ||
      (typeof req.headers["x-admin-token"] === "string" ? req.headers["x-admin-token"].trim() : "");
    if (!token) {
      res.json({ authenticated: false });
      return;
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { username: string; role: string };
      if (decoded && decoded.role === "admin") {
        res.json({ authenticated: true, user: decoded, token });
      } else {
        res.json({ authenticated: false });
      }
    } catch {
      res.json({ authenticated: false });
    }
  });

  // -------------------------------------------------------------
  // PUBLIC ENQUIRY & CONTACT FORMS (PROTECTED WITH SANITIZATION & CAPTCHA)
  // -------------------------------------------------------------

  // Submit contact enquiry
  app.post("/api/contact", formSubmissionRateLimiter, (req: Request, res: Response) => {
    const rawBody = req.body || {};

    // Verify Captcha if present or require it
    if (rawBody.captchaToken || rawBody.captchaAnswer) {
      const isCaptchaValid = verifyCaptchaChallenge(rawBody.captchaToken, rawBody.captchaAnswer);
      if (!isCaptchaValid) {
        res.status(400).json({ error: "Security anti-bot verification failed. Please solve the arithmetic question." });
        return;
      }
    }

    const name = sanitizeText(rawBody.name, 100);
    const companyName = sanitizeText(rawBody.companyName, 150);
    const email = typeof rawBody.email === "string" ? rawBody.email.trim() : "";
    const phone = sanitizeText(rawBody.phone, 30);
    const projectType = sanitizeText(rawBody.projectType, 100);
    const message = sanitizeText(rawBody.message, 3000);
    const companyContext = sanitizeText(rawBody.companyContext, 100);

    if (!name || name.length < 2) {
      res.status(400).json({ error: "Please enter a valid name (at least 2 characters)." });
      return;
    }
    if (!isValidEmail(email)) {
      res.status(400).json({ error: "Please enter a valid email address." });
      return;
    }
    if (!isValidPhone(phone)) {
      res.status(400).json({ error: "Please enter a valid contact phone number." });
      return;
    }
    if (!message || message.length < 5) {
      res.status(400).json({ error: "Please provide a brief message describing your requirements." });
      return;
    }

    const record: EnquiryRecord = {
      id: "ENQ-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase(),
      timestamp: new Date().toISOString(),
      type: "contact",
      companyContext: companyContext || "SR GROUP",
      name,
      companyName,
      email,
      phone,
      serviceRequired: projectType,
      message
    };

    inMemoryEnquiries.push(record);
    if (inMemoryEnquiries.length > 1000) {
      inMemoryEnquiries.shift();
    }
    savePersistedEnquiries();
    console.log("[SR GROUP SECURITY AUDIT] New Contact Enquiry registered:", record.id);

    res.json({
      success: true,
      id: record.id,
      message: "Thank you. Your enquiry has been received. Our team will contact you shortly."
    });
  });

  // Submit quote request
  app.post("/api/quote", formSubmissionRateLimiter, (req: Request, res: Response) => {
    const rawBody = req.body || {};

    if (rawBody.captchaToken || rawBody.captchaAnswer) {
      const isCaptchaValid = verifyCaptchaChallenge(rawBody.captchaToken, rawBody.captchaAnswer);
      if (!isCaptchaValid) {
        res.status(400).json({ error: "Security anti-bot verification failed. Please solve the arithmetic question." });
        return;
      }
    }

    const name = sanitizeText(rawBody.name, 100);
    const companyName = sanitizeText(rawBody.companyName, 150);
    const email = typeof rawBody.email === "string" ? rawBody.email.trim() : "";
    const phone = sanitizeText(rawBody.phone, 30);
    const industry = sanitizeText(rawBody.industry, 100);
    const serviceRequired = sanitizeText(rawBody.serviceRequired, 150);
    const projectLocation = sanitizeText(rawBody.projectLocation, 150);
    const estimatedSize = sanitizeText(rawBody.estimatedSize, 100);
    const message = sanitizeText(rawBody.message, 3000);
    const filename = sanitizeText(rawBody.filename, 100);
    const targetCompany = sanitizeText(rawBody.targetCompany, 100);

    if (!name || name.length < 2) {
      res.status(400).json({ error: "Please enter a valid contact name." });
      return;
    }
    if (!isValidEmail(email)) {
      res.status(400).json({ error: "Please enter a valid email address." });
      return;
    }
    if (!isValidPhone(phone)) {
      res.status(400).json({ error: "Please enter a valid contact phone number." });
      return;
    }
    if (!serviceRequired) {
      res.status(400).json({ error: "Please specify the service or project capability required." });
      return;
    }

    const record: EnquiryRecord = {
      id: "QTE-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase(),
      timestamp: new Date().toISOString(),
      type: "quote",
      companyContext: targetCompany || "SR GROUP",
      name,
      companyName,
      email,
      phone,
      industry,
      serviceRequired,
      projectLocation,
      estimatedSize,
      message,
      filename
    };

    inMemoryEnquiries.push(record);
    if (inMemoryEnquiries.length > 1000) {
      inMemoryEnquiries.shift();
    }
    savePersistedEnquiries();
    console.log("[SR GROUP SECURITY AUDIT] New Quote Request registered:", record.id);

    res.json({
      success: true,
      id: record.id,
      message: "Thank you. Your quote request has been received. Our engineering team will review your requirements and respond shortly."
    });
  });

  // Career submission handler supporting both /api/career and /api/careers
  const handleCareerSubmission = (req: Request, res: Response) => {
    const rawBody = req.body || {};

    if (rawBody.captchaToken || rawBody.captchaAnswer) {
      const isCaptchaValid = verifyCaptchaChallenge(rawBody.captchaToken, rawBody.captchaAnswer);
      if (!isCaptchaValid) {
        res.status(400).json({ error: "Security anti-bot verification failed. Please solve the arithmetic question." });
        return;
      }
    }

    const name = sanitizeText(rawBody.name, 100);
    const email = typeof rawBody.email === "string" ? rawBody.email.trim() : "";
    const phone = sanitizeText(rawBody.phone, 30);
    const position = sanitizeText(rawBody.position || rawBody.jobTitle || rawBody.serviceRequired, 100);
    const experience = sanitizeText(rawBody.experience || rawBody.experienceLevel || rawBody.estimatedSize, 100);
    const message = sanitizeText(rawBody.message, 3000);
    
    // Safely extract and sanitize filename from either filename or fileName
    const rawFilename = typeof rawBody.filename === "string" && rawBody.filename.trim()
      ? rawBody.filename.trim()
      : typeof rawBody.fileName === "string" && rawBody.fileName.trim()
        ? rawBody.fileName.trim()
        : "";

    // Sanitize filename: extract basename from POSIX and Windows paths, strip directory traversal and dangerous characters
    let sanitizedFilename = "";
    if (rawFilename) {
      const normalizedPath = rawFilename.replace(/\\/g, "/");
      const base = path.posix.basename(normalizedPath);
      sanitizedFilename = base
        .replace(/[\/\\]/g, "")
        .replace(/\.\.+/g, ".")
        .replace(/[\x00-\x1f\x80-\x9f]/g, "")
        .trim();
    }
    const filename = sanitizeText(sanitizedFilename, 150);

    if (!name || name.length < 2) {
      res.status(400).json({ error: "Please enter your full name." });
      return;
    }
    if (!isValidEmail(email)) {
      res.status(400).json({ error: "Please enter a valid email address." });
      return;
    }
    if (!isValidPhone(phone)) {
      res.status(400).json({ error: "Please enter a valid phone number." });
      return;
    }
    if (!position) {
      res.status(400).json({ error: "Please specify the position applied for." });
      return;
    }

    const record: EnquiryRecord = {
      id: "CAR-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase(),
      timestamp: new Date().toISOString(),
      type: "career",
      name,
      email,
      phone,
      serviceRequired: position,
      estimatedSize: experience || "N/A",
      message: message || "Career application submitted.",
      filename: filename || ""
    };

    inMemoryEnquiries.push(record);
    if (inMemoryEnquiries.length > 1000) {
      inMemoryEnquiries.shift();
    }
    savePersistedEnquiries();
    console.log("[SR GROUP SECURITY AUDIT] New Career Application registered:", record.id, "Name:", record.name, "File:", record.filename);

    res.json({
      success: true,
      id: record.id,
      message: "Thank you for submitting your application to SR GROUP Careers. We will review your profile and contact you if shortlisted."
    });
  };

  // Register both singular and plural endpoints
  app.post("/api/career", formSubmissionRateLimiter, handleCareerSubmission);
  app.post("/api/careers", formSubmissionRateLimiter, handleCareerSubmission);

  // -------------------------------------------------------------
  // SECURE ADMIN ENQUIRIES & SUBMISSIONS API (STRICTLY REQUIRE ADMIN AUTH)
  // -------------------------------------------------------------

  // Helper to filter and sort enquiries
  function filterAndSortEnquiries(query: any): { records: EnquiryRecord[]; total: number } {
    let list = [...inMemoryEnquiries];

    // Filter by type: 'contact' | 'quote' | 'career' | 'all'
    const typeFilter = typeof query.type === "string" ? query.type.toLowerCase().trim() : "";
    if (typeFilter && typeFilter !== "all" && ["contact", "quote", "career"].includes(typeFilter)) {
      list = list.filter((r) => r.type === typeFilter);
    }

    // Filter by Search Query
    const search = typeof query.search === "string" ? query.search.toLowerCase().trim() : "";
    if (search) {
      list = list.filter((r) => {
        return (
          (r.name && r.name.toLowerCase().includes(search)) ||
          (r.email && r.email.toLowerCase().includes(search)) ||
          (r.phone && r.phone.toLowerCase().includes(search)) ||
          (r.companyName && r.companyName.toLowerCase().includes(search)) ||
          (r.companyContext && r.companyContext.toLowerCase().includes(search)) ||
          (r.serviceRequired && r.serviceRequired.toLowerCase().includes(search)) ||
          (r.industry && r.industry.toLowerCase().includes(search)) ||
          (r.projectLocation && r.projectLocation.toLowerCase().includes(search)) ||
          (r.estimatedSize && r.estimatedSize.toLowerCase().includes(search)) ||
          (r.message && r.message.toLowerCase().includes(search)) ||
          (r.id && r.id.toLowerCase().includes(search))
        );
      });
    }

    // Filter by Date Range (startDate, endDate)
    const startDate = typeof query.startDate === "string" ? query.startDate.trim() : "";
    const endDate = typeof query.endDate === "string" ? query.endDate.trim() : "";

    if (startDate) {
      const startMs = new Date(startDate).getTime();
      if (!isNaN(startMs)) {
        list = list.filter((r) => new Date(r.timestamp).getTime() >= startMs);
      }
    }
    if (endDate) {
      // Add 1 day to end date to make it inclusive if YYYY-MM-DD
      const endMs = new Date(endDate).getTime() + (endDate.length === 10 ? 86400000 : 0);
      if (!isNaN(endMs)) {
        list = list.filter((r) => new Date(r.timestamp).getTime() <= endMs);
      }
    }

    // Sort order: newest (default) vs oldest
    const sort = typeof query.sort === "string" ? query.sort.toLowerCase().trim() : "newest";
    if (sort === "oldest") {
      list.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    } else {
      list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }

    return { records: list, total: inMemoryEnquiries.length };
  }

  // 1. Export to CSV (Strictly requires Admin JWT)
  app.get("/api/enquiries/export/csv", requireAdminAuth, (req: Request, res: Response) => {
    try {
      const { records } = filterAndSortEnquiries(req.query);

      const escapeCsvCell = (value: any): string => {
        if (value === null || value === undefined) return '""';
        const str = String(value).replace(/"/g, '""');
        return `"${str}"`;
      };

      const headers = [
        "Submission ID",
        "Date & Time",
        "Form Type",
        "Target Company",
        "Full Name",
        "Email Address",
        "Phone Number",
        "Company Name",
        "Service / Position",
        "Industry",
        "Project Location",
        "Experience / Est. Size",
        "Attached File",
        "Message / Application Details"
      ];

      const rows = records.map((r) => [
        escapeCsvCell(r.id),
        escapeCsvCell(r.timestamp),
        escapeCsvCell(r.type?.toUpperCase()),
        escapeCsvCell(r.companyContext || "SR GROUP"),
        escapeCsvCell(r.name),
        escapeCsvCell(r.email),
        escapeCsvCell(r.phone),
        escapeCsvCell(r.companyName || "N/A"),
        escapeCsvCell(r.serviceRequired || "N/A"),
        escapeCsvCell(r.industry || "N/A"),
        escapeCsvCell(r.projectLocation || "N/A"),
        escapeCsvCell(r.estimatedSize || "N/A"),
        escapeCsvCell(r.filename || "None"),
        escapeCsvCell(r.message || "")
      ]);

      const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\r\n");

      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="sr_group_enquiries_${new Date().toISOString().slice(0, 10)}.csv"`
      );
      res.status(200).send(csvContent);
      console.log(`[SR GROUP SECURITY AUDIT] Admin exported ${records.length} enquiry records to CSV.`);
    } catch (err: any) {
      console.error("[SR GROUP] CSV Export error:", err);
      res.status(500).json({ error: "Failed to generate CSV export." });
    }
  });

  // 2. Get enquiries with search, filter, date, and sort (Strictly requires Admin JWT)
  app.get("/api/enquiries", requireAdminAuth, (req: Request, res: Response) => {
    try {
      const { records, total } = filterAndSortEnquiries(req.query);

      res.json({
        success: true,
        count: records.length,
        total,
        records: records.map((r) => ({
          id: r.id,
          timestamp: r.timestamp,
          type: r.type,
          companyContext: r.companyContext || "SR GROUP",
          name: r.name,
          companyName: r.companyName || "",
          email: r.email,
          phone: r.phone,
          industry: r.industry || "",
          serviceRequired: r.serviceRequired || "",
          projectLocation: r.projectLocation || "",
          estimatedSize: r.estimatedSize || "",
          message: r.message,
          filename: r.filename || ""
        }))
      });
    } catch (err: any) {
      console.error("[SR GROUP] Get enquiries error:", err);
      res.status(500).json({ error: "Failed to retrieve enquiries." });
    }
  });

  // 3. Get single enquiry detail (Strictly requires Admin JWT)
  app.get("/api/enquiries/:id", requireAdminAuth, (req: Request, res: Response) => {
    const id = sanitizeText(req.params.id, 50);
    const found = inMemoryEnquiries.find((r) => r.id === id);
    if (!found) {
      res.status(404).json({ error: "Submission record not found." });
      return;
    }
    res.json({ success: true, record: found });
  });

  // 4. Delete single enquiry (Strictly requires Admin JWT)
  app.delete("/api/enquiries/:id", requireAdminAuth, (req: Request, res: Response) => {
    const id = sanitizeText(req.params.id, 50);
    const index = inMemoryEnquiries.findIndex((r) => r.id === id);

    if (index === -1) {
      res.status(404).json({ error: "Submission record not found or already deleted." });
      return;
    }

    const removed = inMemoryEnquiries.splice(index, 1)[0];
    savePersistedEnquiries();
    console.log(`[SR GROUP SECURITY AUDIT] Submission ${removed.id} (${removed.type}) deleted by Admin.`);

    res.json({
      success: true,
      message: `Submission ${id} deleted successfully.`,
      deletedId: id
    });
  });

  // -------------------------------------------------------------
  // LEADERSHIP / CMD & MD PROFILE ENDPOINTS
  // -------------------------------------------------------------
  // Public GET (Read-only)
  app.get("/api/cmd", (_req: Request, res: Response) => {
    try {
      if (fs.existsSync(CMD_FILE)) {
        const raw = fs.readFileSync(CMD_FILE, "utf-8");
        res.json(JSON.parse(raw));
      } else {
        res.json({});
      }
    } catch (e) {
      console.error("Error reading cmd.json:", e);
      res.json({});
    }
  });

  // Protected POST (Requires Admin Authentication)
  app.post("/api/cmd", requireAdminAuth, formSubmissionRateLimiter, async (req: Request, res: Response) => {
    try {
      const payload = req.body || {};
      const allowedRoles = ["cmd", "md"];

      let currentData: any = {};
      if (fs.existsSync(CMD_FILE)) {
        try {
          currentData = JSON.parse(fs.readFileSync(CMD_FILE, "utf-8"));
        } catch {
          currentData = {};
        }
      }

      if (payload.role && allowedRoles.includes(payload.role) && payload.data) {
        let sanitizedPhotoUrl: string | undefined;

        // If a new photo is provided, strictly validate magic-bytes, dimensions, re-encode & strip EXIF
        if (payload.data.photoDataUrl && typeof payload.data.photoDataUrl === "string") {
          try {
            const processed = await validateAndSanitizeImage(payload.data.photoDataUrl, false);
            sanitizedPhotoUrl = processed.dataUrl;
          } catch (imgErr: any) {
            res.status(400).json({ error: imgErr?.message || "Invalid or unsupported image file." });
            return;
          }
        } else if (payload.data.photoDataUrl === "") {
          sanitizedPhotoUrl = "";
        } else if (currentData[payload.role]?.photoDataUrl) {
          sanitizedPhotoUrl = currentData[payload.role].photoDataUrl;
        }

        currentData[payload.role] = {
          ...payload.data,
          photoDataUrl: sanitizedPhotoUrl,
          name: sanitizeText(payload.data.name, 100),
          title: sanitizeText(payload.data.title, 100),
          companyName: sanitizeText(payload.data.companyName, 100),
          message: sanitizeText(payload.data.message, 1000),
          bio: sanitizeText(payload.data.bio, 2000),
        };
      } else if (payload.cmd || payload.md) {
        if (payload.cmd) currentData.cmd = payload.cmd;
        if (payload.md) currentData.md = payload.md;
      } else {
        res.status(400).json({ error: "Invalid role or data payload." });
        return;
      }

      fs.writeFileSync(CMD_FILE, JSON.stringify(currentData, null, 2), "utf-8");
      console.log(`[SR GROUP SECURITY AUDIT] Leadership profile updated securely by Admin.`);
      res.json({ success: true, data: currentData });
    } catch (e: any) {
      console.error("Error saving cmd.json:", e?.message || e);
      res.status(500).json({ error: "Failed to save profile securely on server." });
    }
  });

  // -------------------------------------------------------------
  // CUSTOM COMPANY LOGOS ENDPOINTS
  // -------------------------------------------------------------
  const ALLOWED_COMPANIES = ["sr-group", "sr-infra", "suhel-engineering", "sr-power-solution"];

  // Public GET (Read-only)
  app.get("/api/logos", (_req: Request, res: Response) => {
    try {
      if (fs.existsSync(LOGOS_FILE)) {
        const raw = fs.readFileSync(LOGOS_FILE, "utf-8");
        res.json(JSON.parse(raw));
      } else {
        res.json({});
      }
    } catch (e) {
      console.error("Error reading logos.json:", e);
      res.json({});
    }
  });

  // Protected POST (Requires Admin Authentication)
  app.post("/api/logos", requireAdminAuth, formSubmissionRateLimiter, async (req: Request, res: Response) => {
    try {
      const logoData = req.body;
      if (!logoData || !logoData.companyId || !ALLOWED_COMPANIES.includes(logoData.companyId)) {
        res.status(400).json({ error: "Invalid or unauthorized company identifier." });
        return;
      }

      if (!logoData.dataUrl || typeof logoData.dataUrl !== "string") {
        res.status(400).json({ error: "Please provide valid logo image data." });
        return;
      }

      // Strictly validate binary magic-bytes, dimensions/pixel-limits, re-encode, and strip EXIF
      let sanitizedImage: SanitizedImageResult;
      try {
        sanitizedImage = await validateAndSanitizeImage(logoData.dataUrl, true);
      } catch (imgErr: any) {
        res.status(400).json({ error: imgErr?.message || "Invalid or unsupported image file." });
        return;
      }

      let currentLogos: any = {};
      if (fs.existsSync(LOGOS_FILE)) {
        try {
          currentLogos = JSON.parse(fs.readFileSync(LOGOS_FILE, "utf-8"));
        } catch {
          currentLogos = {};
        }
      }

      currentLogos[logoData.companyId] = {
        companyId: logoData.companyId,
        dataUrl: sanitizedImage.dataUrl,
        fileName: sanitizeText(logoData.fileName || `${logoData.companyId}-logo.png`, 100),
        fileSize: sanitizedImage.size,
        mimeType: sanitizedImage.mimeType,
        width: sanitizedImage.width,
        height: sanitizedImage.height,
        aspectRatio: sanitizedImage.aspectRatio,
        uploadedAt: new Date().toISOString(),
        bgStyle: logoData.bgStyle === "transparent" ? "transparent" : "white"
      };

      fs.writeFileSync(LOGOS_FILE, JSON.stringify(currentLogos, null, 2), "utf-8");
      console.log(`[SR GROUP SECURITY AUDIT] Sanitized logo saved for company '${logoData.companyId}' by Admin.`);
      res.json({ success: true, logos: currentLogos });
    } catch (e: any) {
      console.error("Error saving logos.json:", e?.message || e);
      res.status(500).json({ error: "Failed to save logo securely on server." });
    }
  });

  // Protected DELETE (Requires Admin Authentication)
  app.delete("/api/logos/:companyId", requireAdminAuth, (req: Request, res: Response) => {
    try {
      const { companyId } = req.params;
      if (!companyId || !ALLOWED_COMPANIES.includes(companyId)) {
        res.status(400).json({ error: "Invalid company ID." });
        return;
      }

      let currentLogos: any = {};
      if (fs.existsSync(LOGOS_FILE)) {
        try {
          currentLogos = JSON.parse(fs.readFileSync(LOGOS_FILE, "utf-8"));
        } catch {
          currentLogos = {};
        }
      }

      if (currentLogos[companyId]) {
        delete currentLogos[companyId];
        fs.writeFileSync(LOGOS_FILE, JSON.stringify(currentLogos, null, 2), "utf-8");
      }
      console.log(`[SR GROUP SECURITY AUDIT] Custom logo deleted for company '${companyId}' by Admin.`);
      res.json({ success: true, logos: currentLogos });
    } catch (e) {
      console.error("Error deleting logo:", e);
      res.status(500).json({ error: "Failed to delete logo on server." });
    }
  });

  // -------------------------------------------------------------
  // COMPANIES WE HAVE WORKED WITH (CLIENTS CMS) ENDPOINTS
  // -------------------------------------------------------------

  // 1. Public GET: Only returns active companies ordered by display_order
  app.get("/api/companies-worked-with", (req: Request, res: Response) => {
    try {
      let list = inMemoryWorkedCompanies.filter((c) => c.status === "active");

      // Optional Category filter
      const category = typeof req.query.category === "string" ? req.query.category.trim() : "";
      if (category && category !== "All") {
        list = list.filter((c) => c.category.toLowerCase() === category.toLowerCase());
      }

      // Sort by display_order ascending, then name
      list.sort((a, b) => {
        if (a.display_order !== b.display_order) {
          return a.display_order - b.display_order;
        }
        return a.company_name.localeCompare(b.company_name);
      });

      res.json({
        success: true,
        count: list.length,
        companies: list,
      });
    } catch (err: any) {
      console.error("[SR GROUP] Error retrieving public companies worked with:", err);
      res.status(500).json({ error: "Failed to retrieve worked-with companies." });
    }
  });

  // 2. Admin GET: Retrieves all companies (active & inactive) with search, filter, sort
  app.get("/api/admin/companies-worked-with", requireAdminAuth, (req: Request, res: Response) => {
    try {
      let list = [...inMemoryWorkedCompanies];

      // Filter by Status: 'all' | 'active' | 'inactive'
      const statusFilter = typeof req.query.status === "string" ? req.query.status.trim().toLowerCase() : "";
      if (statusFilter && statusFilter !== "all" && (statusFilter === "active" || statusFilter === "inactive")) {
        list = list.filter((c) => c.status === statusFilter);
      }

      // Filter by Category
      const categoryFilter = typeof req.query.category === "string" ? req.query.category.trim() : "";
      if (categoryFilter && categoryFilter !== "All") {
        list = list.filter((c) => c.category.toLowerCase() === categoryFilter.toLowerCase());
      }

      // Filter by Search text
      const search = typeof req.query.search === "string" ? req.query.search.trim().toLowerCase() : "";
      if (search) {
        list = list.filter((c) => {
          return (
            (c.company_name && c.company_name.toLowerCase().includes(search)) ||
            (c.industry && c.industry.toLowerCase().includes(search)) ||
            (c.category && c.category.toLowerCase().includes(search)) ||
            (c.project_name && c.project_name.toLowerCase().includes(search)) ||
            (c.scope_of_work && c.scope_of_work.toLowerCase().includes(search)) ||
            (c.location && c.location.toLowerCase().includes(search)) ||
            (c.description && c.description.toLowerCase().includes(search)) ||
            (c.year && c.year.toLowerCase().includes(search))
          );
        });
      }

      // Sort
      const sortBy = typeof req.query.sort === "string" ? req.query.sort.trim().toLowerCase() : "display_order";
      if (sortBy === "name") {
        list.sort((a, b) => a.company_name.localeCompare(b.company_name));
      } else if (sortBy === "latest") {
        list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      } else {
        // default: display_order ascending
        list.sort((a, b) => a.display_order - b.display_order);
      }

      res.json({
        success: true,
        count: list.length,
        total: inMemoryWorkedCompanies.length,
        companies: list,
      });
    } catch (err: any) {
      console.error("[SR GROUP] Error retrieving admin companies worked with:", err);
      res.status(500).json({ error: "Failed to retrieve companies." });
    }
  });

  // 3. Admin POST: Create new company with image sanitization & validation
  app.post("/api/admin/companies-worked-with", requireAdminAuth, formSubmissionRateLimiter, async (req: Request, res: Response) => {
    try {
      const payload = req.body || {};
      const company_name = sanitizeText(payload.company_name, 200);
      const industry = sanitizeText(payload.industry, 150) || "Industrial Engineering";
      const category = sanitizeText(payload.category, 50) || "Engineering";
      const project_name = sanitizeText(payload.project_name, 200);
      const scope_of_work = sanitizeText(payload.scope_of_work, 1000);
      const location = sanitizeText(payload.location, 150);
      const year = sanitizeText(payload.year, 50);
      const description = sanitizeText(payload.description, 2000);
      const status: "active" | "inactive" = payload.status === "inactive" ? "inactive" : "active";

      if (!company_name || company_name.length < 2) {
        res.status(400).json({ error: "Company Name is required and must be at least 2 characters." });
        return;
      }

      // Validate or compute display order
      let display_order = parseInt(payload.display_order, 10);
      if (isNaN(display_order) || display_order < 1) {
        const maxOrder = inMemoryWorkedCompanies.reduce((max, c) => Math.max(max, c.display_order || 0), 0);
        display_order = maxOrder + 1;
      }

      // Secure logo image validation & sanitization (EXIF stripping, magic bytes)
      let logo_url = "";
      if (payload.logo_url && typeof payload.logo_url === "string" && payload.logo_url.trim()) {
        const rawLogo = payload.logo_url.trim();
        if (rawLogo.startsWith("data:")) {
          try {
            const processed = await validateAndSanitizeImage(rawLogo, true);
            logo_url = processed.dataUrl;
          } catch (imgErr: any) {
            res.status(400).json({ error: `Invalid company logo: ${imgErr?.message || "Unsupported image file."}` });
            return;
          }
        } else if (rawLogo.startsWith("http://") || rawLogo.startsWith("https://") || rawLogo.startsWith("/")) {
          logo_url = sanitizeText(rawLogo, 500);
        }
      }

      // Handle optional sub-projects if supplied
      let projects: Array<{ projectName: string; scopeOfWork?: string; year?: string; location?: string }> = [];
      if (Array.isArray(payload.projects)) {
        projects = payload.projects
          .filter((p: any) => p && typeof p.projectName === "string" && p.projectName.trim())
          .map((p: any) => ({
            projectName: sanitizeText(p.projectName, 200),
            scopeOfWork: sanitizeText(p.scopeOfWork, 500),
            year: sanitizeText(p.year, 50),
            location: sanitizeText(p.location, 100),
          }));
      }

      const id = "cmp-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6);
      const newRecord: WorkedWithCompanyRecord = {
        id,
        company_name,
        logo_url,
        industry,
        category,
        project_name,
        scope_of_work,
        location,
        year,
        description,
        display_order,
        status,
        projects: projects.length > 0 ? projects : undefined,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      inMemoryWorkedCompanies.push(newRecord);
      savePersistedWorkedCompanies();

      console.log(`[SR GROUP SECURITY AUDIT] New worked-with company added by Admin: '${company_name}' (${id})`);
      res.status(201).json({
        success: true,
        company: newRecord,
        message: "Company added successfully.",
      });
    } catch (err: any) {
      console.error("[SR GROUP] Error adding company worked with:", err);
      res.status(500).json({ error: "Failed to add company record to storage." });
    }
  });

  // 4. Admin PUT: Update company
  app.put("/api/admin/companies-worked-with/:id", requireAdminAuth, formSubmissionRateLimiter, async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const index = inMemoryWorkedCompanies.findIndex((c) => c.id === id);
      if (index === -1) {
        res.status(404).json({ error: "Company record not found." });
        return;
      }

      const existing = inMemoryWorkedCompanies[index];
      const payload = req.body || {};

      const company_name = payload.company_name !== undefined ? sanitizeText(payload.company_name, 200) : existing.company_name;
      if (!company_name || company_name.length < 2) {
        res.status(400).json({ error: "Company Name is required." });
        return;
      }

      const industry = payload.industry !== undefined ? sanitizeText(payload.industry, 150) : existing.industry;
      const category = payload.category !== undefined ? sanitizeText(payload.category, 50) : existing.category;
      const project_name = payload.project_name !== undefined ? sanitizeText(payload.project_name, 200) : existing.project_name;
      const scope_of_work = payload.scope_of_work !== undefined ? sanitizeText(payload.scope_of_work, 1000) : existing.scope_of_work;
      const location = payload.location !== undefined ? sanitizeText(payload.location, 150) : existing.location;
      const year = payload.year !== undefined ? sanitizeText(payload.year, 50) : existing.year;
      const description = payload.description !== undefined ? sanitizeText(payload.description, 2000) : existing.description;
      const status: "active" | "inactive" = payload.status === "inactive" ? "inactive" : "active";

      let display_order = existing.display_order;
      if (payload.display_order !== undefined) {
        const parsedOrder = parseInt(payload.display_order, 10);
        if (!isNaN(parsedOrder) && parsedOrder >= 1) {
          display_order = parsedOrder;
        }
      }

      // Handle logo update
      let logo_url = existing.logo_url || "";
      if (payload.logo_url !== undefined) {
        const rawLogo = typeof payload.logo_url === "string" ? payload.logo_url.trim() : "";
        if (!rawLogo) {
          logo_url = ""; // logo removed
        } else if (rawLogo.startsWith("data:")) {
          try {
            const processed = await validateAndSanitizeImage(rawLogo, true);
            logo_url = processed.dataUrl;
          } catch (imgErr: any) {
            res.status(400).json({ error: `Invalid company logo: ${imgErr?.message || "Unsupported image file."}` });
            return;
          }
        } else if (rawLogo.startsWith("http://") || rawLogo.startsWith("https://") || rawLogo.startsWith("/")) {
          logo_url = sanitizeText(rawLogo, 500);
        }
      }

      // Handle projects
      let projects = existing.projects;
      if (Array.isArray(payload.projects)) {
        projects = payload.projects
          .filter((p: any) => p && typeof p.projectName === "string" && p.projectName.trim())
          .map((p: any) => ({
            projectName: sanitizeText(p.projectName, 200),
            scopeOfWork: sanitizeText(p.scopeOfWork, 500),
            year: sanitizeText(p.year, 50),
            location: sanitizeText(p.location, 100),
          }));
      }

      const updatedRecord: WorkedWithCompanyRecord = {
        ...existing,
        company_name,
        logo_url,
        industry,
        category,
        project_name,
        scope_of_work,
        location,
        year,
        description,
        display_order,
        status,
        projects: projects && projects.length > 0 ? projects : undefined,
        updated_at: new Date().toISOString(),
      };

      inMemoryWorkedCompanies[index] = updatedRecord;
      savePersistedWorkedCompanies();

      console.log(`[SR GROUP SECURITY AUDIT] Company updated by Admin: '${company_name}' (${id})`);
      res.json({
        success: true,
        company: updatedRecord,
        message: "Company updated successfully.",
      });
    } catch (err: any) {
      console.error("[SR GROUP] Error updating company worked with:", err);
      res.status(500).json({ error: "Failed to update company record." });
    }
  });

  // 5. Admin DELETE: Remove company
  app.delete("/api/admin/companies-worked-with/:id", requireAdminAuth, (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const index = inMemoryWorkedCompanies.findIndex((c) => c.id === id);
      if (index === -1) {
        res.status(404).json({ error: "Company record not found or already removed." });
        return;
      }

      const removed = inMemoryWorkedCompanies.splice(index, 1)[0];
      savePersistedWorkedCompanies();

      console.log(`[SR GROUP SECURITY AUDIT] Company deleted by Admin: '${removed.company_name}' (${id})`);
      res.json({
        success: true,
        deletedId: id,
        message: `Company '${removed.company_name}' deleted successfully.`,
      });
    } catch (err: any) {
      console.error("[SR GROUP] Error deleting company worked with:", err);
      res.status(500).json({ error: "Failed to delete company record." });
    }
  });

  // 6. Admin PATCH: Fast status toggle (Active / Inactive)
  app.patch("/api/admin/companies-worked-with/:id/toggle-status", requireAdminAuth, (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const company = inMemoryWorkedCompanies.find((c) => c.id === id);
      if (!company) {
        res.status(404).json({ error: "Company record not found." });
        return;
      }

      company.status = company.status === "active" ? "inactive" : "active";
      company.updated_at = new Date().toISOString();
      savePersistedWorkedCompanies();

      console.log(`[SR GROUP SECURITY AUDIT] Company '${company.company_name}' status toggled to '${company.status}' by Admin.`);
      res.json({
        success: true,
        id,
        status: company.status,
        message: `Company status changed to ${company.status.toUpperCase()}.`,
      });
    } catch (err: any) {
      console.error("[SR GROUP] Error toggling company status:", err);
      res.status(500).json({ error: "Failed to update company status." });
    }
  });

  // 7. Admin POST: Batch reorder display_order
  app.post("/api/admin/companies-worked-with/reorder", requireAdminAuth, (req: Request, res: Response) => {
    try {
      const { orders } = req.body || {};
      if (!Array.isArray(orders)) {
        res.status(400).json({ error: "Invalid order items payload." });
        return;
      }

      orders.forEach((item: { id: string; display_order: number }) => {
        if (item && item.id && typeof item.display_order === "number") {
          const comp = inMemoryWorkedCompanies.find((c) => c.id === item.id);
          if (comp) {
            comp.display_order = item.display_order;
            comp.updated_at = new Date().toISOString();
          }
        }
      });

      savePersistedWorkedCompanies();
      console.log(`[SR GROUP SECURITY AUDIT] Worked-with companies reordered by Admin.`);
      res.json({
        success: true,
        message: "Display order saved successfully.",
      });
    } catch (err: any) {
      console.error("[SR GROUP] Error reordering companies:", err);
      res.status(500).json({ error: "Failed to reorder companies." });
    }
  });

  // Direct static serving for public images directory
  app.use('/images', express.static(path.join(process.cwd(), 'public', 'images'), { maxAge: '1h' }) as RequestHandler);

  // Global Error Handler Middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error("[SR GROUP SERVER UNCAUGHT ERROR]:", err?.message || err);
    res.status(500).json({ error: "An internal server error occurred. Please try again later." });
  });

  // Vite middleware for dev or static serving for prod
  if (process.env.NODE_ENV !== "production") {
    const isHmrDisabled = process.env.DISABLE_HMR === "true";
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: isHmrDisabled ? false : undefined,
      },
      appType: "spa",
    });
    app.use(vite.middlewares);

    // Fallback for SPA HTML routing in dev mode
    app.use(async (req: Request, res: Response, next: NextFunction) => {
      if (req.originalUrl.startsWith("/api")) {
        next();
        return;
      }
      try {
        const url = req.originalUrl;
        let template = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });

    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`SR GROUP Server running securely on http://0.0.0.0:${PORT}`);
    });

    if (!isHmrDisabled && vite.ws) {
      server.on("upgrade", (req, socket, head) => {
        if (typeof (vite.ws as any).handleUpgrade === "function") {
          (vite.ws as any).handleUpgrade(req, socket, head);
        }
      });
    }
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath) as RequestHandler);
    app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.originalUrl.startsWith("/api")) {
        next();
        return;
      }
      res.sendFile(path.join(distPath, "index.html"));
    });

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`SR GROUP Server running securely on http://0.0.0.0:${PORT}`);
    });
  }
}

startServer();
