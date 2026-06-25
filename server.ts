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
    senderEmail: "system@portfolioos.org",
    subject: "Welcome to PortfolioOS v1.0.0!",
    message: "Hi there! Welcome to PortfolioOS. You can explore files in Finder, view and run code in VS Code, run CLI commands in the Terminal, or send a contact form right from the Mail application. Have fun customizing settings in the Settings app!",
    timestamp: new Date().toISOString(),
    isRead: false,
  },
  {
    id: "mail-portfolio-builder",
    senderName: "Melmar Jones Velasco",
    senderEmail: "melmar@portfolioos.org",
    subject: "Project Feature: Melmar's Portfolio Builder",
    message: "Hello! I wanted to share my work on the Portfolio Builder. It's an interactive platform built to help developers and creatives showcase their work online without wrestling with complex setups. Users can select from a curated library of gorgeous layouts, customize content directly through an intuitive visual editor, and publish instantly. Check it out and let me know your thoughts!",
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    isRead: false,
    projectId: "portfolio-builder"
  },
  {
    id: "mail-url-kilatis",
    senderName: "Melmar Jones Velasco",
    senderEmail: "melmar@portfolioos.org",
    subject: "Project Feature: URL-Kilatis Analyzer",
    message: "Hey! Check out my URL-Kilatis Analyzer project. It's an intelligent website review platform that audits live URLs to inspect performance metrics, SEO configurations, security standards, accessibility, and overall UX, generating expert reviews under 2 minutes. Tap the 'View Project' button below to check out the case study!",
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    isRead: false,
    projectId: "url-kilatis"
  },
  {
    id: "mail-bantay-bills",
    senderName: "Melmar Jones Velasco",
    senderEmail: "melmar@portfolioos.org",
    subject: "Project Feature: Bantay-Bills Manager",
    message: "Hi there, I built Bantay-Bills Manager, a premium cloud-synced bill tracker, monthly planner, and AI subscription auditor. It's engineered for individuals seeking a complete view of their monthly utility cycles, service subscriptions, and personal financial obligations. I integrated it with Firebase, Gemini, and nice interactive charts.",
    timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
    isRead: false,
    projectId: "bantay-bills"
  },
  {
    id: "mail-tingin-cv",
    senderName: "Melmar Jones Velasco",
    senderEmail: "melmar@portfolioos.org",
    subject: "Project Feature: TinginCV Optimizer",
    message: "Hello! Check out TinginCV Optimizer. It is an automated CV optimization and Applicant Tracking System (ATS) simulator designed with a strict focus on privacy. It scans, grades, and helps redesign resumes client-side, comparing original and target ATS readability scores using the Google Gemini API.",
    timestamp: new Date(Date.now() - 3600000 * 72).toISOString(),
    isRead: false,
    projectId: "tingin-cv"
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
