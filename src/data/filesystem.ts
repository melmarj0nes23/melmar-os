import { FSNode, ProjectData, GalleryItem } from "../types";

// Dynamic Projects Data mapping
export const projectsData: ProjectData[] = [
  {
    id: "portfolio-builder",
    title: "Melmar's Portfolio Builder",
    tagline: "Seamless real-time visual editor & template library with instant one-click deployment.",
    description: "Melmar's Portfolio Builder is an interactive platform built to help developers and creatives showcase their work online without wrestling with complex setups. Users can select from a curated library of gorgeous layouts, customize the contents directly through an intuitive visual editor, and publish instantly.",
    technologies: ["Next.js (App Router)", "React", "TypeScript", "Tailwind CSS", "Supabase Database & Auth", "Vercel"],
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/port1.jpeg",
    liveUrl: "https://my-4polio.vercel.app",
    githubUrl: "https://github.com/melmarj0nes23",
    role: "Full-Stack Developer & Designer",
    features: [
      "Seamless real-time visual editor",
      "Highly-polished template library",
      "Instant one-click deployment",
      "Custom public profile links",
      "Dynamic page metadata",
      "Bulletproof secure authentication",
      "Fully responsive design"
    ],
    screenshots: [
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/port1.jpeg",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/port2.jpeg",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/port3.jpeg"
    ]
  },
  {
    id: "url-kilatis",
    title: "URL-Kilatis Analyzer",
    tagline: "AI-powered website review platform that audits page speed, SEO, accessibility, and overall UX.",
    description: "URL-Kilatis is an intelligent auditing platform that inspects live URLs to provide a comprehensive, multi-category quality report. It evaluates performance metrics, SEO configurations, security standards, and UX structures, generating expert AI recommendations to optimize user engagement and accessibility.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Lucide React"],
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/url1.jpeg",
    liveUrl: "https://url-kilatis.vercel.app",
    githubUrl: "https://github.com/melmarj0nes23",
    role: "Creator & Lead Architect",
    features: [
      "Instant multi-category page audits (under 2 minutes)",
      "Expert AI-generated reviews and optimization guides",
      "Granular category-based scoring metrics",
      "SEO, performance, and accessibility indicators",
      "Local scan history logs database",
      "Zero registration or account creation required"
    ],
    screenshots: [
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/url1.jpeg",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/url2.jpeg",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/url3.jpeg",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/url4.jpeg"
    ]
  },
  {
    id: "bantay-bills",
    title: "Bantay-Bills Manager",
    tagline: "Premium cloud-synced bill tracker, monthly planner, and AI subscription auditor.",
    description: "Bantay-Bills is a premium financial utility engineered for individuals seeking a complete view of their monthly utility cycles, service subscriptions, and personal financial obligations. It features cloud synchronization, monthly due date calendars, and proactive email/push alerts.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Firebase Firestore", "Firebase Auth", "Google Gemini API", "Lucide React"],
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/ban1.webp",
    liveUrl: "https://bantay-bills.vercel.app",
    githubUrl: "https://github.com/melmarj0nes23",
    role: "Lead Full-Stack Developer",
    features: [
      "Interactive analytics charts and payment tracking",
      "Mobile-optimized utility accordion lists",
      "Full monthly calendar scheduling interface",
      "Intelligent budget insights powered by Gemini & Groq AI",
      "Firebase database and cloud state synchronization",
      "Seamless CSV expense database exports",
      "Proactive due date push notification alerts"
    ],
    screenshots: [
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/ban1.webp",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/ban2.webp",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/ban3.webp",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/ban4.webp"
    ]
  },
  {
    id: "tingin-cv",
    title: "TinginCV Optimizer",
    tagline: "Automated resume optimizer, recruiter feedback generator, and ATS simulation platform.",
    description: "TinginCV is an automated CV optimization and Applicant Tracking System (ATS) simulator. Designed with a strict focus on privacy, the platform lets users scan, grade, and redesign their resumes entirely client-side, comparing original and target ATS readability scores.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Google Gemini API", "pdf2json", "mammoth", "Vercel"],
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/cv1.webp",
    liveUrl: "https://tingin-cv.vercel.app",
    githubUrl: "https://github.com/melmarj0nes23",
    role: "Software Engineer & Designer",
    features: [
      "High-accuracy ATS readability score simulations",
      "Detailed bullet point feedback and optimization tips",
      "Recruiter review and skills gap map charts",
      "Pristine, grid-aligned resume PDF downloads",
      "100% local device-side privacy compliance",
      "Open to all users with zero login friction"
    ],
    screenshots: [
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/cv1.webp",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/cv2.webp",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/cv3.webp"
    ]
  },
  {
    id: "ads-alis",
    title: "Ads-Alis Stream",
    tagline: "High-performance, cookie-free, and advertisement-free video streaming utility.",
    description: "Ads-Alis is a high-performance, responsive single-screen utility interface meant for security-minded, cookie-free, and advertisement-free video streaming. By consolidating sandbox constraints and privacy-centric request routing, Ads-Alis facilitates clutter-free media playback from multiple platforms concurrently.",
    technologies: ["React 18", "TypeScript", "Vite", "Tailwind CSS v4", "Lucide React", "LocalStorage API", "Cloudflare Pages"],
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/alis1.webp",
    liveUrl: "https://ads-alis.pages.dev/",
    githubUrl: "https://github.com/melmarj0nes23",
    role: "Creator & Lead Architect",
    features: [
      "Search Video in App securely",
      "Picture-in-Picture Mode for convenient multitasking",
      "Auto-Play Related Videos & Searches",
      "Local Stream History logs database",
      "Add, Rename, and Delete Bookmarks easily",
      "Sandboxed ad-blocking stream structures"
    ],
    screenshots: [
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/alis1.webp",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/alis2.webp"
    ]
  },
  {
    id: "flexi-dash",
    title: "FlexiDash Financial Tracker",
    tagline: "Sleek, modern financial tracking and personal command dashboard.",
    description: "FlexiDash is a sleek, modern financial tracking and dashboard application designed to help users effortlessly manage their income, expenses, and custom products. Built with a focus on speed, beautiful aesthetics, and seamless user experience, it acts as a personal financial command center.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "NextAuth (Auth.js)", "Recharts", "Turso (SQLite)", "Drizzle ORM", "Resend API"],
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/flexi1.webp",
    liveUrl: "https://flexi-dash.vercel.app/",
    githubUrl: "https://github.com/melmarj0nes23",
    role: "Full-Stack Developer & Designer",
    features: [
      "Modern authentication via NextAuth and Resend API",
      "Dynamic Analytics Dashboard with interactive Recharts graphs",
      "Transaction Tracking with simple logging, editing, and deletion",
      "Product Management for pre-setting unit service prices",
      "Global Edge Architecture on Turso and Vercel Edge networks",
      "Premium glassmorphic user interface & micro-animations"
    ],
    screenshots: [
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/flexi1.webp",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/flexi2.webp",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/flexi3.webp",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/flexi4.webp"
    ]
  },
  {
    id: "rian-fernandez",
    title: "Rian Fernandez Atelier",
    tagline: "Luxury couture digital showcase and custom fashion showroom.",
    description: "Creating a clean, minimal website focused on high-quality visuals to showcase the studio's craftsmanship. A dedicated portfolio with a simple inquiry process makes it easier for potential clients to explore custom couture gown projects and get in touch.",
    technologies: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript (ES6+)", "React", "Vite", "Firebase"],
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/rf1.webp",
    liveUrl: "https://rf-atelier.pages.dev/",
    githubUrl: "https://github.com/melmarj0nes23",
    role: "Front-End Developer & Designer",
    features: [
      "High-resolution showcase focusing on detailed couture craftsmanship",
      "Optimized assets and imagery for blazingly fast load times",
      "Unified digital contact and inquiry channels",
      "Beautiful minimal grid layout highlighting design quality",
      "Deployed securely on Cloudflare Pages"
    ],
    screenshots: [
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/rf1.webp",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/rf2.webp",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/rf3.webp",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/rf4.webp"
    ]
  },
  {
    id: "mjn-salon",
    title: "MJN Salon & Spa",
    tagline: "Responsive mobile-friendly digital treatment catalog and scheduling portal.",
    description: "A highly convenient, mobile-first website that simplifies the booking process for customers. It organizes the salon's treatments, services, pricing, business hours, and map locations into an easy-to-navigate layout, making information instantly available.",
    technologies: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript (ES6+)", "React", "Vite"],
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/mjn1.webp",
    liveUrl: "https://mjn-salon.pages.dev/",
    githubUrl: "https://github.com/melmarj0nes23",
    role: "Front-End Engineer & UI Builder",
    features: [
      "Interactive digital menus detailing spa & salon services and prices",
      "Mobile-friendly interface built with responsive Tailwind classes",
      "Direct integration with social booking, calling, and messaging API triggers",
      "Optimized for quick load times over global edge CDNs",
      "Deployed effortlessly on Cloudflare Pages"
    ],
    screenshots: [
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/mjn1.webp",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/mjn2.webp",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/mjn3.webp",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/mjn4.webp"
    ]
  },
  {
    id: "nunez-dental",
    title: "Nuñez Dental Clinic",
    tagline: "Clean, professional, and highly accessible dental clinic portal.",
    description: "A clean and professional dental care landing platform designed to make it simple for patients to learn about clinic hours, medical team credentials, location details, and treatment categories, answering common FAQs on a single page.",
    technologies: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript (ES6+)", "React", "Vite"],
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/clinic1.webp",
    liveUrl: "https://nunez-dentalclinic.pages.dev/",
    githubUrl: "https://github.com/melmarj0nes23",
    role: "Lead Developer & Designer",
    features: [
      "Clean, modern aesthetic styled with comfortable medical-brand themes",
      "Detailed dental treatment directories and scheduling charts",
      "Fully responsive grids accommodating desktop and mobile viewports",
      "Direct contact widgets, clinic hours, and map linkages",
      "Static edge caching and continuous integration via Cloudflare Pages"
    ],
    screenshots: [
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/clinic1.webp",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/clinic2.webp",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/clinic3.webp",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/clinic4.webp"
    ]
  },
  {
    id: "apros-spa",
    title: "Apros Wellness Spa",
    tagline: "Unified massage therapies and package-booking directory.",
    description: "An organized, single-page informational platform built for Apros Wellness Spa. Built to categorize their extensive treatment catalogs, home/hotel packages, and wet area access slots into clean, intuitive sections, streamlining the booking flow.",
    technologies: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript (ES6+)", "React", "Vite"],
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/spa1.webp",
    liveUrl: "https://apros-pasig.pages.dev/",
    githubUrl: "https://github.com/melmarj0nes23",
    role: "Web Developer & UI Designer",
    features: [
      "Well-structured directory organizing massages, therapies, and wet areas",
      "Responsive, fluid layout optimized for both touchscreens and cursors",
      "Direct call-to-action booking prompts and scheduler integration",
      "Calm, therapeutic layout with high-contrast text and readable cards",
      "Deployed and cached globally with Cloudflare Pages"
    ],
    screenshots: [
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/spa1.webp",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/spa2.webp",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/spa3.webp",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/spa4.webp"
    ]
  },
  {
    id: "mayas-flower",
    title: "Maya's Flower Shop",
    tagline: "High-resolution catalog and occasion-based bouquet showcase.",
    description: "Maya's Flower Shop is a highly visual, clean digital catalog that displays premium floral arrangements sorted by occasion, enabling customers to easily browse choices and place inquiry tickets directly without messaging friction.",
    technologies: ["HTML5", "Tailwind CSS", "JavaScript (ES6+)", "React", "Vite"],
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/maya1.webp",
    liveUrl: "https://mayas-flowershop.pages.dev/",
    githubUrl: "https://github.com/melmarj0nes23",
    role: "Front-End Web Developer",
    features: [
      "Image-focused occasion grids (Valentine's, Mother's Day, Weddings)",
      "Highly optimized and compressed assets keeping pages instant",
      "Instant inquiry and communication routes for direct ordering",
      "Cohesive pastel-toned branding aesthetics with fluid navigation",
      "Fast static delivery powered by Cloudflare Pages"
    ],
    screenshots: [
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/maya1.webp",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/maya2.webp",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/maya3.webp",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/maya4.webp"
    ]
  },
  {
    id: "aiced-cafe",
    title: "Aiced Café",
    tagline: "Elegant coffee shop catalog, menu, and scheduling showcase.",
    description: "Aiced Café's website delivers an elegant, high-contrast coffee shop catalog. It organizes menus, operational hours, location details, and direct messaging links on a lightweight single page with integrated interactive maps.",
    technologies: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript", "React", "Vite"],
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/aiced1.webp",
    liveUrl: "https://aiced-cafe.pages.dev/",
    githubUrl: "https://github.com/melmarj0nes23",
    role: "UI/UX Developer & Designer",
    features: [
      "Visual digital menus highlighting craft brews and hot pastries",
      "Integrated location maps and operational hours scheduler",
      "Warm café color styling with polished glass effects",
      "Lightweight, mobile-responsive page columns loading instantly",
      "Hosted on Cloudflare Pages for reliable CDN speed"
    ],
    screenshots: [
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/aiced1.webp",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/aiced2.webp",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/aiced3.webp",
      "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/aiced4.webp"
    ]
  }
];

// Gallery Images and Highlights
export const galleryItems: GalleryItem[] = [
  {
    id: "port-builder-scr-1",
    title: "Portfolio Builder Dashboard",
    description: "Interactive workspace with real-time template switching, customization blocks, and deployment configuration controls.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/port1.jpeg",
    date: "2024"
  },
  {
    id: "port-builder-scr-2",
    title: "Template Showcase Options",
    description: "Curated libraries of clean, high-performance visual blocks optimized for designer and developer portfolios.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/port2.jpeg",
    date: "2024"
  },
  {
    id: "port-builder-scr-3",
    title: "Instant Live Layout Editor",
    description: "Real-time visual content styling with active inline state tracking and zero delay previews.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/port3.jpeg",
    date: "2024"
  },
  {
    id: "url-kilatis-scr-1",
    title: "URL-Kilatis Scan Dashboard",
    description: "Core website evaluation field designed with elegant micro-interactions, analyzing live URLs inside 2 minutes.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/url1.jpeg",
    date: "2025"
  },
  {
    id: "url-kilatis-scr-2",
    title: "Detailed Audit Feedback",
    description: "AI-generated expert recommendations highlighting exact code enhancements and performance diagnostic results.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/url2.jpeg",
    date: "2025"
  },
  {
    id: "url-kilatis-scr-3",
    title: "Score Breakdown Panel",
    description: "High-contrast categories scoring cards covering Core Web Vitals, accessibility indices, and design criteria.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/url3.jpeg",
    date: "2025"
  },
  {
    id: "url-kilatis-scr-4",
    title: "Audit History Logs",
    description: "Responsive scan database modal storing historic audits and metrics securely on the client-side.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/url4.jpeg",
    date: "2025"
  },
  {
    id: "bantay-bills-scr-1",
    title: "Bantay-Bills Financial Center",
    description: "Stately dark financial analytics dashboard with clean charts summarizing active utilities, costs, and limits.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/ban1.webp",
    date: "2024"
  },
  {
    id: "bantay-bills-scr-2",
    title: "Billing Calendar & Milestones",
    description: "Complete scheduling layout plotting exact bill due dates and calendar tracking with color notifications.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/ban2.webp",
    date: "2024"
  },
  {
    id: "bantay-bills-scr-3",
    title: "Mobile Accordion Bill View",
    description: "Compact, fluid-accordion structure optimized for scanning subscription lists and tracking invoices on small screens.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/ban3.webp",
    date: "2024"
  },
  {
    id: "bantay-bills-scr-4",
    title: "AI Budget Recommendations",
    description: "Google Gemini powered advisor suggesting dynamic expense splits and active subscription auditing.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/ban4.webp",
    date: "2024"
  },
  {
    id: "tingin-cv-scr-1",
    title: "TinginCV Main Page",
    description: "Minimalist layout designed to parse resume PDF uploads, calculating immediate ATS readability indices.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/cv1.webp",
    date: "2025"
  },
  {
    id: "tingin-cv-scr-2",
    title: "Skills Gap Matrix",
    description: "In-depth keyword extraction and semantic analyzer tracking exactly which skills recruiters require.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/cv2.webp",
    date: "2025"
  },
  {
    id: "tingin-cv-scr-3",
    title: "Optimized PDF Resume Builder",
    description: "Pristine grid resume styling system ready for immediate single-click PDF downloads.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/cv3.webp",
    date: "2025"
  },
  {
    id: "ads-alis-scr-1",
    title: "Ads-Alis Screen Player",
    description: "Clutter-free, ad-blocking stream playback module supporting YouTube, Vimeo, and Dailymotion streaming.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/alis1.webp",
    date: "2024"
  },
  {
    id: "ads-alis-scr-2",
    title: "Bookmark Management Showcase",
    description: "Responsive utility sidebar enabling search, bookmarks, stream history logs, and customization client-side.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/alis2.webp",
    date: "2024"
  },
  {
    id: "flexi-dash-scr-1",
    title: "FlexiDash Dashboard",
    description: "Personal financial command center featuring glassmorphism, responsive visual summary metrics, and active charts.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/flexi1.webp",
    date: "2025"
  },
  {
    id: "flexi-dash-scr-2",
    title: "Interactive Analytics Chart",
    description: "Beautiful Recharts analytical graphics visualizing dynamic income, expenditures, and net financial health.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/flexi2.webp",
    date: "2025"
  },
  {
    id: "flexi-dash-scr-3",
    title: "Transaction Management View",
    description: "Granular transaction ledger where users can effortlessly log, search, edit, and delete expense inputs.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/flexi3.webp",
    date: "2025"
  },
  {
    id: "flexi-dash-scr-4",
    title: "Product & Expense Ledger",
    description: "Custom service product library designed to save unit pricings for rapid attachment to invoices and transactions.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/flexi4.webp",
    date: "2025"
  },
  {
    id: "rian-fernandez-scr-1",
    title: "Atelier Showcase Landing",
    description: "Elegant, minimal welcome landing designed with modern typography to showcase high-fashion craftsmanship.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/rf1.webp",
    date: "2024"
  },
  {
    id: "rian-fernandez-scr-2",
    title: "Couture Gown Portfolio Grid",
    description: "Distraction-free high-fidelity portfolio grid organizing spectacular wedding gowns and design records.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/rf2.webp",
    date: "2024"
  },
  {
    id: "rian-fernandez-scr-3",
    title: "Craftsmanship Detail Zoom",
    description: "Optimized image rendering pipeline allowing patients or customers to appreciate pristine dress tailoring details.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/rf3.webp",
    date: "2024"
  },
  {
    id: "rian-fernandez-scr-4",
    title: "Client Enquiry Funnel",
    description: "Streamlined consultation and custom-gown enquiry forms converting social media traffic to booked projects.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/rf4.webp",
    date: "2024"
  },
  {
    id: "mjn-salon-scr-1",
    title: "MJN Salon & Spa Hero",
    description: "Fluid, mobile-friendly landing panel directing visitors to services, catalog treatments, and directions.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/mjn1.webp",
    date: "2024"
  },
  {
    id: "mjn-salon-scr-2",
    title: "Treatments & Price Guide",
    description: "Polished price-sheets and hair treatment list layout, helping clients browse services upfront.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/mjn2.webp",
    date: "2024"
  },
  {
    id: "mjn-salon-scr-3",
    title: "Operational Hours Calendar",
    description: "Clean schedules showing open hours, telephone numbers, and coordinates on social networks.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/mjn3.webp",
    date: "2024"
  },
  {
    id: "mjn-salon-scr-4",
    title: "Mobile Appointment Booking",
    description: "Direct instant booking buttons and telephone linkage for convenient appointment booking.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/mjn4.webp",
    date: "2024"
  },
  {
    id: "nunez-dental-scr-1",
    title: "Dental Portal Welcome Screen",
    description: "Responsive clinic welcome viewport showing emergency hours, treatment lists, and address pointers.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/clinic1.webp",
    date: "2024"
  },
  {
    id: "nunez-dental-scr-2",
    title: "Treatment Descriptions Grid",
    description: "Clear informational list covering cosmetic, restorative, and pediatric dental treatment solutions.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/clinic2.webp",
    date: "2024"
  },
  {
    id: "nunez-dental-scr-3",
    title: "Clinic Operating Hours",
    description: "Stately business hours listing with interactive visual cues to prevent appointment booking overlap.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/clinic3.webp",
    date: "2024"
  },
  {
    id: "nunez-dental-scr-4",
    title: "Dentist Profiles & Team Info",
    description: "Patient-centered directory introducing certified dental surgeons and treatment assistants.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/clinic4.webp",
    date: "2024"
  },
  {
    id: "apros-spa-scr-1",
    title: "Apros Wellness Spa Welcome",
    description: "Warm, calming introduction highlighting massages, pampering packages, and wet area services.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/spa1.webp",
    date: "2024"
  },
  {
    id: "apros-spa-scr-2",
    title: "Therapies Catalog & Pricings",
    description: "Highly readable table dividing therapies, hotel service upgrades, and prices clearly.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/spa2.webp",
    date: "2024"
  },
  {
    id: "apros-spa-scr-3",
    title: "Packages & Home Services List",
    description: "Information columns highlighting massage lengths, travel ranges, and spa rules.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/spa3.webp",
    date: "2024"
  },
  {
    id: "apros-spa-scr-4",
    title: "Instant Inquiry Trigger",
    description: "Direct reservation buttons triggering instant booking messages for easy booking.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/spa4.webp",
    date: "2024"
  },
  {
    id: "mayas-flower-scr-1",
    title: "Maya's Flower Shop Homepage",
    description: "Lively visual showcase centered on floral arrangements, keeping photography compressed but extremely crisp.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/maya1.webp",
    date: "2024"
  },
  {
    id: "mayas-flower-scr-2",
    title: "Floral Occasions & Arrangement Grid",
    description: "Beautiful visual catalog highlighting custom bridal bundles, rose bouquets, and gift grids.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/maya2.webp",
    date: "2024"
  },
  {
    id: "mayas-flower-scr-3",
    title: "Occasion Categorized Lists",
    description: "Frictionless grouping making arrangements searchable by holiday theme (Valentine's, anniversaries, etc.).",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/maya3.webp",
    date: "2024"
  },
  {
    id: "mayas-flower-scr-4",
    title: "Contact & Ordering Page",
    description: "Direct contact prompts linking clients with florists for custom orders and instant delivery notes.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/maya4.webp",
    date: "2024"
  },
  {
    id: "aiced-cafe-scr-1",
    title: "Aiced Café Digital Front",
    description: "Inviting single-page café storefront styled with deep brown branding shades and glass elements.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/aiced1.webp",
    date: "2025"
  },
  {
    id: "aiced-cafe-scr-2",
    title: "Coffee & Pastry Visual Menu",
    description: "Interactive responsive menu table grouping lattes, single-origins, pastries, and daily pricing charts.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/aiced2.webp",
    date: "2025"
  },
  {
    id: "aiced-cafe-scr-3",
    title: "Warm Café Aesthetic Details",
    description: "Visual panels optimized to set a relaxing vibe, keeping mobile layouts beautifully consistent.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/aiced3.webp",
    date: "2025"
  },
  {
    id: "aiced-cafe-scr-4",
    title: "Interactive Maps & Social Widgets",
    description: "Embedded location map and operational schedule widgets helping walk-ins get directions easily.",
    category: "highlights",
    imageUrl: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/aiced4.webp",
    date: "2025"
  }
];

// File nodes used inside Finder, VS Code explorer, and cat CLI command
export const virtualFileSystem: FSNode[] = [
  // Root Level Directory Items
  { name: "info", type: "directory", path: "/info", icon: "folder" },
  { name: "skills", type: "directory", path: "/skills", icon: "folder" },
  { name: "projects", type: "directory", path: "/projects", icon: "folder" },
  { name: "README.md", type: "file", path: "/README.md", icon: "file-code", content: `# Welcome to PortfolioOS!

PortfolioOS is an elite desktop environment built from scratch to demonstrate advanced front-end capabilities, full-stack API orchestration, and beautiful UI/UX design.

### Quick Start
- Double click **Finder** on your desktop to explore my skills and personal data.
- Run **VS Code** to see live editor renderings and project mockups.
- Open the **Terminal** to explore my commands (type \`help\` to start).
- Launch **Settings** to switch wallpapers, turn on dark mode, change accent colors, or toggle reduced motion.

Feel free to write me an email via **Mail app** or search for files instantly with \`Cmd + Space\`!
` },
  { name: "resume.pdf", type: "file", path: "/resume.pdf", icon: "file-text", content: "[PDF Document Metadata: 3 Pages, Optimized A4 Format]" },
  { name: "resume.txt", type: "file", path: "/resume.txt", icon: "file-text", content: `========================================================================
MELMAR JONES VELASCO - WEB DEVELOPER & DIGITAL ARCHITECT
========================================================================
Email: melmarjvelasco@gmail.com | Phone: +63949-636-4706
GitHub: github.com/melmarj0nes23
LinkedIn: ph.linkedin.com/in/melmar-jones-velasco-5b795a340
Location: Philippines (Open to Remote / Relocation)

------------------------------------------------------------------------
PROFESSIONAL SUMMARY
------------------------------------------------------------------------
Highly skilled Web Developer with 2+ years of hands-on experience in 
designing, coding, and modifying responsive websites and web applications, 
ensuring they are user-friendly, visually appealing, and functionally sound. 
Proficient in HTML, CSS, and JavaScript, with a strong portfolio 
demonstrating the ability to transform wireframes and ideas into clean, 
efficient, and maintainable code. Adept at leveraging modern web technologies, 
cloud-hosted platforms, and AI-assisted development tools to optimize project 
delivery, enhance SEO performance, and build scalable, secure, and 
high-performing web experiences while collaborating effectively with design 
and product teams.

------------------------------------------------------------------------
PROFESSIONAL EXPERIENCE
------------------------------------------------------------------------
* Freelance Web Developer & Digital Architect
  Self-Employed | July 2024 - Present
  - Developed and implemented responsive websites and web applications using 
    HTML5, CSS3, and JavaScript (ES6+), ensuring cross-device compatibility 
    and enhanced user engagement by 25%.
  - Conceptualized, wireframed, and designed end-to-end website layouts and 
    user experiences (UX/UI) for diverse clients, delivering visually 
    appealing and functionally sound digital solutions.
  - Leveraged AI-assisted development tools for rapid code implementation, 
    debugging, and content generation, reducing project delivery timelines 
    by 20% and improving development efficiency.
  - Managed full content direction and structured site copy with visual 
    hierarchy to maximize SEO performance and achieve top search engine 
    rankings for client projects.
  - Integrated third-party APIs to enhance website functionality and 
    user-facing features, ensuring seamless data flow and improved user experience.
  - Utilized Git and GitHub for version control, ensuring clean, 
    well-documented, and scalable code management and collaborative 
    development workflows.
  - Troubleshot, debugged, and optimized existing web applications to maximize 
    speed, scalability, and adherence to industry best practices for web 
    standards and security.

* Workforce Specialist II / Workforce Scheduler
  VXI Global Holdings (PayPal) | Dec 2022 - Jul 2024
  - Architected and deployed intricate scheduling strategies for a workforce of 
    150+ agents, optimizing resource allocation to meet fluctuating service 
    demands and maintain target service levels.
  - Analyzed real-time performance data and historical trends to forecast 
    staffing needs, reducing overstaffing by 10% and improving operational efficiency.
  - Collaborated with operations leadership to implement process improvements, 
    enhancing workforce management protocols and agent productivity by 15%.
  - Developed and maintained comprehensive shift schedules, ensuring adherence 
    to labor laws and company policies while maximizing agent availability 
    and engagement.

* Workforce Real-Time Analyst
  VXI Global Holdings (PayPal) | Oct 2018 - Dec 2022
  - Monitored real-time call queues and agent performance metrics, proactively 
    identifying and mitigating potential service level risks to maintain 
    operational stability.
  - Analyzed intraday performance data to provide actionable recommendations to 
    management, optimizing agent deployment and achieving consistent service 
    delivery targets.
  - Implemented dynamic staffing adjustments based on real-time data analysis, 
    improving response times by 12% and enhancing customer satisfaction.
  - Generated detailed reports on workforce adherence and productivity, providing 
    critical insights for strategic planning and performance management.

* Subject Matter Expert
  VXI Global Holdings (PayPal) | Jan 2018 - Oct 2018
  - Oversaw staffing allocation and generated comprehensive performance reports, 
    providing data-driven insights to leadership for improved workforce efficiency 
    and decision-making.
  - Collaborated with leadership teams to optimize operational processes and 
    enhance resource management, demonstrating strong problem-solving and 
    communication skills.
  - Mentored and coached a team of 20+ customer service representatives, 
    elevating their technical proficiency and adherence to best practices, 
    resulting in a 10% improvement in resolution rates.
  - Analyzed complex customer issues and developed standardized troubleshooting 
    guides, reducing average handling time by 5% for common inquiries.

* Customer Service Representative
  VXI Global Holdings (PayPal) | Apr 2017 - Jan 2018
  - Conducted coaching and training refreshers for new hires and existing agents, 
    ensuring adherence to best practices and improving overall team performance by 8%.
  - Supported escalation processes and mentored agents, enhancing team capabilities 
    in troubleshooting and complex problem resolution, leading to a 15% reduction 
    in unresolved cases.
  - Managed a high volume of customer inquiries, consistently achieving top customer 
    satisfaction scores through empathetic and efficient service delivery.
  - Identified recurring customer pain points and provided feedback to management, 
    contributing to the development of improved service protocols.

* Technical Support Representative
  VXI Global Holdings (PayPal) | Apr 2015 - Apr 2017
  - Delivered expert technical support for AT&T ICM customers, guiding them through 
    complex troubleshooting procedures to resolve technical issues effectively and efficiently.
  - Documented and tracked technical problems and resolutions in a centralized 
    knowledge base, contributing to a 20% improvement in future support 
    efficiency and agent training.
  - Diagnosed and resolved a wide range of hardware and software issues, 
    maintaining a high first-call resolution rate and minimizing customer downtime.
  - Collaborated with senior technicians to escalate and resolve intricate technical 
    challenges, ensuring comprehensive problem resolution for critical system failures.

------------------------------------------------------------------------
SKILLS
------------------------------------------------------------------------
HTML5 • CSS3 • JavaScript (ES6+) • Responsive Web Design • Web Application 
Development • UX/UI Design Principles • Git • GitHub • Website Deployment • 
Cloud Hosting • SEO Optimization • Debugging • Troubleshooting • API Integration • 
Problem Solving • Attention to Detail • Collaborative Mindset • Clean Code • 
Well-Documented Code • Scalable Code • Web Standards • Security Best Practices • 
Data Protection • Figma (Familiarity) • Adobe XD (Familiarity) • 
Node.js (Basic Understanding) • Python (Basic Understanding) • 
PHP (Basic Understanding) • SQL (Basic Understanding) • 
NoSQL (Basic Understanding) • Performance Optimization • 
Cross-Browser Compatibility • User Engagement • Project Delivery Optimization • 
Resource Management • Data Analysis • Operational Efficiency • Process Optimization

------------------------------------------------------------------------
EDUCATION
------------------------------------------------------------------------
Nursing Education (Undergraduate)
Luzon Colleges of Science and Technology
` },

  // info directory items
  { name: "about.md", type: "file", path: "/info/about.md", icon: "file-text", content: `# About Melmar Jones Velasco

I'm a passionate web developer who enjoys turning ideas into clean, interactive, and user-friendly digital experiences. What started as a curiosity about how websites work quickly grew into a genuine passion for building them from the ground up. I enjoy learning new technologies, experimenting with modern design concepts, and continuously improving my skills through hands-on projects.

### Core Philosophy
1. **Design Honestly & Thoughtfully**: Build intuitive, engaging, and enjoyable user experiences that respect the user's intent. Avoid empty clutter and focus on writing clean, maintainable code.
2. **Analytical & Precise**: A decade in BPO operations and Workforce Management strengthened my analytical thinking, problem-solving abilities, attention to detail, and ability to work under pressure. I apply these exact traits to software engineering.
3. **Continuous Growth**: Constantly learning new technologies, exploring modern frameworks, and refining my frontend skills. Also fascinated by cybersecurity and ethical hacking for secure, reliable applications.

### My Journey
Before transitioning into web development, I spent nearly a decade in the BPO industry specializing in Workforce Management, scheduling, and operations. Those years developed my strong professional communication, real-time strategy, and data analysis skills. Today, I channel that passion and discipline into full-stack web development and user experience design, building immersive digital platforms like PortfolioOS.
` },
  { name: "contact.json", type: "file", path: "/info/contact.json", icon: "file-code", content: `{
  "name": "Melmar Jones Velasco",
  "email": "melmarjvelasco@gmail.com",
  "facebook": "https://facebook.com/melmarj0nes23",
  "github": "https://github.com/melmarj0nes23",
  "linkedin": "https://ph.linkedin.com/in/melmar-jones-velasco-5b795a340",
  "availability": "Available for full-time frontend/web development roles & contracts",
  "preferredTimezone": "PHT (UTC+8)"
}
` },

  // skills directory items
  { name: "frontend.json", type: "file", path: "/skills/frontend.json", icon: "file-code", content: `{
  "languages": ["TypeScript", "JavaScript (ESNext)", "HTML5/CSS3"],
  "frameworks": ["React 19", "Next.js", "Vue 3"],
  "styling": ["Tailwind CSS", "CSS Modules", "Sass", "Framer Motion / Motion"],
  "stateManagement": ["React Context", "Zustand", "Redux Toolkit"],
  "graphics": ["Canvas API", "SVG animation", "Three.js / WebGL"]
}
` },
  { name: "backend.json", type: "file", path: "/skills/backend.json", icon: "file-code", content: `{
  "languages": ["Node.js", "Python", "Go"],
  "frameworks": ["Express", "FastAPI", "NestJS"],
  "databases": ["PostgreSQL", "MongoDB", "Redis", "Firebase (Firestore)"],
  "orm": ["Prisma", "Drizzle", "Mongoose"],
  "apis": ["GraphQL", "RESTful APIs", "WebSockets"]
}
` },
  { name: "tools.json", type: "file", path: "/skills/tools.json", icon: "file-code", content: `{
  "vcs": ["Git", "GitHub Actions", "GitLab CI"],
  "design": ["Figma", "Adobe Creative Suite", "Spline"],
  "bundlers": ["Vite", "ESBuild", "Webpack"],
  "platforms": ["Google Cloud (GCP)", "AWS", "Vercel", "Docker"]
}
` },

  // projects directory items
  { name: "melmar-portfolio-builder.md", type: "file", path: "/projects/melmar-portfolio-builder.md", icon: "file-text", content: `# Melmar's Portfolio Builder

Seamless real-time visual editor & template library with instant one-click deployment.

### Story & Purpose
I noticed that many developers and designers struggled to launch their portfolios quickly due to setup complexities, hosting setups, or design blocks. To solve this, I built Melmar's Portfolio Builder! Users can select a high-quality template, customize their content directly in a visual editor, and publish instantly.

### Architecture
- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **Database & Auth**: Supabase (Real-time and secure profiles)
- **Hosting & Deploy**: Vercel Integration
` },
  { name: "url-kilatis.md", type: "file", path: "/projects/url-kilatis.md", icon: "file-text", content: `# URL-Kilatis Analyzer

AI-powered website review platform that audits page speed, SEO, accessibility, and overall UX.

### About
URL-Kilatis is an AI-powered website review platform that analyzes any given URL to provide a comprehensive audit and expert insights on its overall quality.

### Features
- **Instant website analysis**: Audits take under 2 minutes depending on complexity
- **Category-based scoring**: Evaluates Performance, SEO, Accessibility, UX, Design, and Security
- **AI-generated expert reviews**: Actionable suggestions to boost user experience
- **Local scan history**: Keeps track of recent scans securely
` },
  { name: "bantay-bills.md", type: "file", path: "/projects/bantay-bills.md", icon: "file-text", content: `# Bantay-Bills Manager

Premium cloud-synced bill tracker, personal finance planner, and subscription auditor.

### Story & Purpose
Built for users with busy schedules, multiple bills, credit dates, and auto-recurring subscriptions, Bantay-Bills acts as a central command dashboard for due date calendar management.

### Features
- **Interactive financial charts**: Visual analytics and budget splits
- **Full monthly calendar**: Easily plan and track due dates
- **AI Subscription Auditor**: Google Gemini-driven feedback and tips
- **Firebase Sync**: Full database real-time backup and authorization
- **Active Notifications**: Proactive email and push notifications
` },
  { name: "tingin-cv.md", type: "file", path: "/projects/tingin-cv.md", icon: "file-text", content: `# TinginCV Resume Optimizer

Automated resume optimization and ATS simulation platform with local device-side privacy.

### About
TinginCV is an automated resume optimization and ATS simulation platform. It requires no login, making it open to everyone. To guarantee 100% data privacy, all scans are done directly from your local device.

### Features
- **ATS score breakdowns**: See before and after scores instantly
- **Recruiter reviews**: Detailed, point-by-point suggestion metrics
- **Skills Gap Analysis**: Highlight missing keywords and match indices
- **Pristine PDF Exports**: Ready-to-send ATS-friendly CV formats
` },
  { name: "ads-alis-stream.md", type: "file", path: "/projects/ads-alis-stream.md", icon: "file-text", content: `# Ads-Alis Stream

Ad-free, cookie-free, and high-performance video streaming utility platform.

### Story & Purpose
The project was engineered to facilitate clutter-free and secure media playback. Ads-Alis is a high-performance single-screen utility interface that consolidates sandboxed iframe controls and custom request routes, preventing advertisements, cookies, and intrusive scripts across supported major video networks.

### Features
- **Search Video In-App**: Search and view contents immediately
- **Picture-in-Picture Mode**: Smooth multitask viewing with zero overlay lag
- **Bookmark Hub**: Add, rename, or delete video bookmarks
- **Local Logs**: Client-side stream history tracking and automated related-search recommendations
- **Edge Deployment**: Cached on Cloudflare Pages global network for instant load times
` },
  { name: "flexi-dash.md", type: "file", path: "/projects/flexi-dash.md", icon: "file-text", content: `# FlexiDash - Financial Tracker

Sleek personal financial tracker, interactive analytics dashboard, and product ledger.

### Story & Purpose
To help users effortlessly track incoming and outgoing financial transactions, I built FlexiDash. It combines elegant glassmorphic visuals with high-speed performance, featuring unified charts, pre-set service product catalogues, and secure email authentication.

### Architecture
- **Framework**: Next.js with React 18, TypeScript, Tailwind CSS
- **Authentication**: NextAuth.js (Auth.js) and Resend API password recoveries
- **Database**: Serverless Turso SQLite with Drizzle ORM
- **Deployment**: Vercel Edge network for instant load times
` },
  { name: "rian-fernandez-atelier.md", type: "file", path: "/projects/rian-fernandez-atelier.md", icon: "file-text", content: `# Rian Fernandez Atelier

Clean and minimal luxury couture digital portfolio showcase.

### Story & Purpose
The studio previously relied on social channels to share their couture gown portfolio. Image compression degraded the fine tailorial craftsmanship, and there was no clean inquiry process. Creating a minimalist, high-quality showcase resolved this by focusing entirely on distortion-free media and easy direct client inquiry forms.

### Actions Taken
- Built using HTML5, CSS3, Tailwind CSS, React, and Vite
- Optimized images and assets for blazingly fast global loading
- Integrated a direct contact funnel and deployed on Cloudflare Pages
` },
  { name: "mjn-salon-spa.md", type: "file", path: "/projects/mjn-salon-spa.md", icon: "file-text", content: `# MJN Salon & Spa

Responsive, mobile-first booking portal and digital treatment catalog.

### Story & Purpose
Customers had to continuously send messages just to ask about basic treatments, operational hours, or spa prices. This mobile-optimized single-page website organizes salon treatment menus, price lists, hours, and direct navigation links in one fast-loading workspace.

### Key Metrics
- Reduced customer inquiry wait time significantly
- Boosted direct online bookings with one-click appointment triggers
- Built with HTML5, CSS3, Tailwind CSS, React, and Vite, hosted on Cloudflare Pages
` },
  { name: "nunez-dental-clinic.md", type: "file", path: "/projects/nunez-dental-clinic.md", icon: "file-text", content: `# Nuñez Dental Clinic

Clean, professional, and accessible dentist clinic informational website.

### Story & Purpose
The clinic lacked an informational directory detailing services, operating schedules, maps, and dental credentials. Patients had to call or message to find basic clinic info. This clean portal lists all crucial information in a highly readable, responsive structure.

### Features
- Fully responsive across mobile, tablets, and desktop monitors
- Detailed directories for cosmetic, pediatric, and restorative dental surgeries
- Clear scheduling details and embedded maps to find clinic locations easily
- Deployed on Cloudflare Pages for reliable, fast delivery
` },
  { name: "apros-wellness-spa.md", type: "file", path: "/projects/apros-wellness-spa.md", icon: "file-text", content: `# Apros Wellness Spa

Unified massage treatments directory and home/hotel package-booking platform.

### Story & Purpose
Apros Wellness Spa offers a wide range of massages, spa packages, wet area access slots, and hotels services, but this was difficult to navigate on social media. This responsive platform organizes all treatments into clean sections, enabling customers to easily browse choices.

### Actions Taken
- Categorized treatments and pricing into clear, interactive lists
- Implemented mobile-responsive menus and direct messaging links for booking
- Deployed on Cloudflare Pages for reliable global CDN speeds
` },
  { name: "mayas-flower-shop.md", type: "file", path: "/projects/mayas-flower-shop.md", icon: "file-text", content: `# Maya's Flower Shop

Occasion-based bouquet showcase and image-focused floral digital catalog.

### Story & Purpose
The shop previously handled orders entirely through social media DMs, making it hard to browse arrangements or prices. During busy occasions (Valentine's, Mother's Day), manual inquiries piled up. This catalog solves this by grouping premium arrangements by occasion, allowing customers to browse and inquire with a single click.

### Key Features
- High-fidelity product grids optimized for mobile screens
- Compressed assets maintaining premium image clarity without lag
- Direct links to trigger messaging or inquiries for quick ordering
- Deployed securely on Cloudflare Pages
` },
  { name: "aiced-cafe.md", type: "file", path: "/projects/aiced-cafe.md", icon: "file-text", content: `# Aiced Café

Cozy single-page coffeehouse menu, operational schedule, and map locator.

### Story & Purpose
The café had no dedicated digital page for customers to quickly browse lattes, hot brews, pastries, or open hours. This beautiful single-page dashboard displays menus, hours, and maps, giving visitors everything they need in one place.

### Actions Taken
- Structured menus into high-contrast interactive lists
- Embedded maps and coordinates for seamless walk-ins
- Styled with cozy coffeehouse-branded warm colors and glass aesthetics
- Hosted and delivered over Cloudflare Pages for optimal loading speeds
` }
];

// Flat helper to find nodes quickly
export function getFSNodeByPath(path: string): FSNode | undefined {
  return virtualFileSystem.find((node) => node.path === path);
}

// Flat helper to list directory children
export function getFSDirectoryContents(dirPath: string): FSNode[] {
  if (dirPath === "/") {
    // Return all root files and directories (no deep subdirectories, only their folders)
    return virtualFileSystem.filter((node) => {
      const parts = node.path.split("/").filter(Boolean);
      return parts.length === 1;
    });
  }

  return virtualFileSystem.filter((node) => {
    const parentPath = node.path.substring(0, node.path.lastIndexOf("/"));
    return parentPath === dirPath;
  });
}
