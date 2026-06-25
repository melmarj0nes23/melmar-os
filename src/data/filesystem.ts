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
