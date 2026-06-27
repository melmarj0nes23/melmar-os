import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Temporary memory store for incoming portfolio emails/messages
interface ContactMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  projectId?: string;
}

const contactMessages: ContactMessage[] = [
  {
    id: "welcome-system-mail",
    senderName: "PortfolioOS System",
    senderEmail: "system@melmar-portfolio.vercel.app",
    subject: "Welcome to PortfolioOS v1.0.0!",
    message: "Hi there! Welcome to PortfolioOS. You can explore files in Finder, view and run code in VS Code, run CLI commands in the Terminal, or send a contact form right from the Mail application. Have fun customizing settings in the Settings app!",
    timestamp: new Date().toISOString(),
    isRead: false,
  },
  {
    id: "mail-portfolio-builder",
    senderName: "Melmar Jones Velasco",
    senderEmail: "melmar@melmar-portfolio.vercel.app",
    subject: "Project Feature: Melmar's Portfolio Builder",
    message: "Hello! I wanted to share my work on the Portfolio Builder. It's an interactive platform built to help developers and creatives showcase their work online without wrestling with complex setups. Users can select from a curated library of gorgeous layouts, customize content directly through an intuitive visual editor, and publish instantly. Check it out and let me know your thoughts!",
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    isRead: false,
    projectId: "portfolio-builder"
  },
  {
    id: "mail-url-kilatis",
    senderName: "Melmar Jones Velasco",
    senderEmail: "melmar@melmar-portfolio.vercel.app",
    subject: "Project Feature: URL-Kilatis Analyzer",
    message: "Hey! Check out my URL-Kilatis Analyzer project. It's an intelligent website review platform that audits live URLs to inspect performance metrics, SEO configurations, security standards, accessibility, and overall UX, generating expert reviews under 2 minutes. Tap the 'View Project' button below to check out the case study!",
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    isRead: false,
    projectId: "url-kilatis"
  },
  {
    id: "mail-bantay-bills",
    senderName: "Melmar Jones Velasco",
    senderEmail: "melmar@melmar-portfolio.vercel.app",
    subject: "Project Feature: Bantay-Bills Manager",
    message: "Hi there, I built Bantay-Bills Manager, a premium cloud-synced bill tracker, monthly planner, and AI subscription auditor. It's engineered for individuals seeking a complete view of their monthly utility cycles, service subscriptions, and personal financial obligations. I integrated it with Firebase, Gemini, and nice interactive charts.",
    timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
    isRead: false,
    projectId: "bantay-bills"
  },
  {
    id: "mail-tingin-cv",
    senderName: "Melmar Jones Velasco",
    senderEmail: "melmar@melmar-portfolio.vercel.app",
    subject: "Project Feature: TinginCV Optimizer",
    message: "Hello! Check out TinginCV Optimizer. It is an automated CV optimization and Applicant Tracking System (ATS) simulator designed with a strict focus on privacy. It scans, grades, and helps redesign resumes client-side, comparing original and target ATS readability scores using the Google Gemini API.",
    timestamp: new Date(Date.now() - 3600000 * 72).toISOString(),
    isRead: false,
    projectId: "tingin-cv"
  },
  {
    id: "mail-ads-alis",
    senderName: "Melmar Jones Velasco",
    senderEmail: "melmar@melmar-portfolio.vercel.app",
    subject: "Project Feature: Ads-Alis Stream",
    message: "Hi! Let me introduce Ads-Alis Stream, a high-performance, responsive single-screen utility interface meant for security-minded, cookie-free, and advertisement-free video streaming. By consolidating sandbox constraints and privacy-centric request routing, Ads-Alis facilitates clutter-free media playback from multiple platforms concurrently. Check it out using Safari!",
    timestamp: new Date(Date.now() - 3600000 * 96).toISOString(),
    isRead: false,
    projectId: "ads-alis"
  },
  {
    id: "mail-flexi-dash",
    senderName: "Melmar Jones Velasco",
    senderEmail: "melmar@melmar-portfolio.vercel.app",
    subject: "Project Feature: FlexiDash Tracker",
    message: "Hello there! I'm super excited about FlexiDash, a sleek, modern financial tracking and dashboard application designed to help users effortlessly manage their income, expenses, and custom products. Built with glassmorphism, dynamic micro-animations, custom scrollbars, and powered by Next.js and serverless Turso SQLite, it is blazing-fast!",
    timestamp: new Date(Date.now() - 3600000 * 120).toISOString(),
    isRead: false,
    projectId: "flexi-dash"
  },
  {
    id: "mail-rian-fernandez",
    senderName: "Melmar Jones Velasco",
    senderEmail: "melmar@melmar-portfolio.vercel.app",
    subject: "Project Feature: Rian Fernandez Atelier",
    message: "Hey! Check out Rian Fernandez Atelier, a clean, minimal boutique portfolio and inquiry site focused on showcasing high-quality visuals of the studio's couture wedding gowns. By optimizing images and deploying over Cloudflare Pages, we solved compression issues and created a sleek experience for prospective clients to inquire about custom projects.",
    timestamp: new Date(Date.now() - 3600000 * 144).toISOString(),
    isRead: false,
    projectId: "rian-fernandez"
  },
  {
    id: "mail-mjn-salon",
    senderName: "Melmar Jones Velasco",
    senderEmail: "melmar@melmar-portfolio.vercel.app",
    subject: "Project Feature: MJN Salon & Spa",
    message: "Hello! Check out MJN Salon & Spa. It is a highly responsive, mobile-friendly landing page that aggregates business schedules, service menus, prices, and direct bookings so customers don't have to manually ask social handles for basic operational details. It loads instantly and simplifies booking appointments.",
    timestamp: new Date(Date.now() - 3600000 * 168).toISOString(),
    isRead: false,
    projectId: "mjn-salon"
  },
  {
    id: "mail-nunez-dental",
    senderName: "Melmar Jones Velasco",
    senderEmail: "melmar@melmar-portfolio.vercel.app",
    subject: "Project Feature: Nuñez Dental Clinic",
    message: "Hey there! I designed and developed Nuñez Dental Clinic's informational portal to help patients find clinics, browse treatment catalogs, check schedules, and contact details in a single place. It provides a clean, professional presence across all desktop and mobile devices, deployed on Cloudflare Pages.",
    timestamp: new Date(Date.now() - 3600000 * 192).toISOString(),
    isRead: false,
    projectId: "nunez-dental"
  },
  {
    id: "mail-apros-spa",
    senderName: "Melmar Jones Velasco",
    senderEmail: "melmar@melmar-portfolio.vercel.app",
    subject: "Project Feature: Apros Wellness Spa",
    message: "Hi! Check out Apros Wellness Spa's treatment catalog platform. The spa offers a wide array of massages, packages, wet area slots, and hotel services, so I structured them into easy-to-browse sections with clear booking calls-to-action. It serves as an elegant central directory.",
    timestamp: new Date(Date.now() - 3600000 * 216).toISOString(),
    isRead: false,
    projectId: "apros-spa"
  },
  {
    id: "mail-mayas-flower",
    senderName: "Melmar Jones Velasco",
    senderEmail: "melmar@melmar-portfolio.vercel.app",
    subject: "Project Feature: Maya's Flower Shop",
    message: "Hello! Take a look at Maya's Flower Shop, an image-focused digital catalog grouping boutique floral arrangements by occasion. It speeds up ordering during peak holidays by showing arrangements and pricing transparently, paired with clear messaging links.",
    timestamp: new Date(Date.now() - 3600000 * 240).toISOString(),
    isRead: false,
    projectId: "mayas-flower"
  },
  {
    id: "mail-aiced-cafe",
    senderName: "Melmar Jones Velasco",
    senderEmail: "melmar@melmar-portfolio.vercel.app",
    subject: "Project Feature: Aiced Café Portal",
    message: "Hey! Check out Aiced Café. It's a single-page café storefront styled with cozy warm coffee tones, glass aesthetics, menus, and integrated Google Maps. It lets caffeine lovers check coordinates, operating schedules, and coffee/pastry prices in seconds.",
    timestamp: new Date(Date.now() - 3600000 * 264).toISOString(),
    isRead: false,
    projectId: "aiced-cafe"
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());

  // API Route: Submit / Get messages
  app.get("/api/contact/messages", (req, res) => {
    res.json(contactMessages);
  });

  // API Route: Verify admin authentication key securely without exposing it in front-end client code
  app.post("/api/admin/verify", (req, res) => {
    const { key } = req.body;
    const expectedKey = process.env.ADMIN_KEY || "A@11111a";
    if (key === expectedKey) {
      return res.json({ success: true, message: "Authentication successful." });
    }
    return res.status(401).json({ success: false, error: "Invalid authorization key." });
  });

  app.post("/api/contact/send", (req, res) => {
    const { senderName, senderEmail, subject, message } = req.body;
    if (!senderName || !senderEmail || !message) {
      return res.status(400).json({ error: "Missing required fields: senderName, senderEmail, message" });
    }

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      senderName,
      senderEmail,
      subject: subject || "No Subject",
      message,
      timestamp: new Date().toISOString(),
      isRead: false,
    };

    contactMessages.push(newMessage);
    res.status(201).json({ success: true, message: "Message received successfully!", data: newMessage });
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PortfolioOS server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Critical server crash:", err);
});
