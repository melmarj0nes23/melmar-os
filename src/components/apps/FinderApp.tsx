import { useState, useEffect } from "react";
import { useOS } from "../../context/OSContext";
import { FSNode } from "../../types";
import { virtualFileSystem, getFSDirectoryContents } from "../../data/filesystem";
import { Folder, FileText, ArrowLeft, ArrowUp, ChevronRight, FileCode, Star, Download, MonitorPlay, Mail, Phone } from "lucide-react";

export default function FinderApp() {
  const { openApp, addNotification } = useOS();
  const [currentPath, setCurrentPath] = useState(() => {
    return localStorage.getItem("finder_current_path") || "/";
  });
  const [selectedNode, setSelectedNode] = useState<FSNode | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState<"filesystem" | "resume">(() => {
    return (localStorage.getItem("finder_active_tab") as "filesystem" | "resume") || "filesystem";
  });
  const [resumeMode, setResumeMode] = useState<"styled" | "txt">("styled");

  // Persist currentPath and activeTab changes
  useEffect(() => {
    localStorage.setItem("finder_current_path", currentPath);
  }, [currentPath]);

  useEffect(() => {
    localStorage.setItem("finder_active_tab", activeTab);
  }, [activeTab]);

  // Sync external navigation requests (e.g., clicking Download Resume in Dock)
  useEffect(() => {
    const handleGoResume = () => {
      setActiveTab("resume");
    };
    window.addEventListener("finder_go_resume", handleGoResume);
    return () => window.removeEventListener("finder_go_resume", handleGoResume);
  }, []);

  const handleNodeClick = (node: FSNode) => {
    if (selectedNode?.path === node.path) {
      handleNodeDoubleClick(node);
    } else {
      setSelectedNode(node);
    }
  };

  const handleNodeDoubleClick = (node: FSNode) => {
    if (node.type === "directory") {
      setCurrentPath(node.path);
      setSelectedNode(null);
    } else {
      if (node.name.endsWith(".pdf")) {
        openApp("pdf");
        addNotification(`Opened ${node.name} in PDF Previewer`);
      } else {
        // File node double-click opens in VS Code!
        openApp("vscode");
        localStorage.setItem("vscode_selected_file", node.path);
        // Dispatch custom event to notify open VS Code instance to update active file
        window.dispatchEvent(new CustomEvent("vscode_open_file", { detail: node.path }));
        addNotification(`Opened ${node.name} in VS Code`);
      }
    }
  };

  const handleBreadcrumbClick = (path: string) => {
    setCurrentPath(path);
    setSelectedNode(null);
  };

  const handleGoUp = () => {
    if (currentPath === "/") return;
    const parts = currentPath.split("/").filter(Boolean);
    if (parts.length === 1) {
      setCurrentPath("/");
    } else {
      const parentParts = parts.slice(0, -1);
      setCurrentPath(`/${parentParts.join("/")}`);
    }
    setSelectedNode(null);
  };

  // List of active files in directory
  const currentContents = getFSDirectoryContents(currentPath);

  // Sidebar navigations
  const sidebarItems = [
    { name: "All Files (Root)", path: "/", tab: "filesystem" as const },
    { name: "Personal Bio", path: "/info", tab: "filesystem" as const },
    { name: "Technical Skills", path: "/skills", tab: "filesystem" as const },
    { name: "Finished Projects", path: "/projects", tab: "filesystem" as const },
    { name: "Melmar Resume.txt", path: "/resume.txt", tab: "resume" as const },
  ];

  const handleDownloadResume = () => {
    // Generate text blob download
    const resumeNode = virtualFileSystem.find((n) => n.path === "/resume.txt");
    if (resumeNode) {
      const blob = new Blob([resumeNode.content || ""], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Melmar_Jones_Velasco_Resume.txt";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      addNotification("Melmar_Jones_Velasco_Resume.txt downloaded successfully!");
    }
  };

  return (
    <div id="finder-app-body" className="w-full h-full flex bg-[#100e0d] text-neutral-300 font-sans select-none overflow-hidden">
      {/* FINDER LEFT SIDEBAR */}
      <div className="w-48 bg-black/25 border-r border-white/5 p-3 flex flex-col gap-1 shrink-0 hidden md:flex">
        <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-500 uppercase px-2 mb-2">Favorites</span>
        
        {sidebarItems.map((item) => {
          const isActive = activeTab === item.tab && (item.tab === "resume" || currentPath === item.path);
          return (
            <button
              key={item.name}
              onClick={() => {
                setActiveTab(item.tab);
                if (item.tab === "filesystem") {
                  setCurrentPath(item.path);
                  setSelectedNode(null);
                }
              }}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold w-full text-left transition-colors cursor-pointer ${
                isActive ? "bg-white/10 text-white" : "hover:bg-white/5 text-neutral-400"
              }`}
            >
              <Star className="w-3.5 h-3.5 text-neutral-400" />
              <span className="truncate">{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* FINDER RIGHT CONTENT CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Horizontal Favorites Bar */}
        <div className="md:hidden flex items-center gap-2 px-3 py-2 bg-[#0c0a09] border-b border-white/5 overflow-x-auto shrink-0 select-none scrollbar-none">
          {sidebarItems.map((item) => {
            const isActive = activeTab === item.tab && (item.tab === "resume" || currentPath === item.path);
            return (
              <button
                key={item.name}
                onClick={() => {
                  setActiveTab(item.tab);
                  if (item.tab === "filesystem") {
                    setCurrentPath(item.path);
                    setSelectedNode(null);
                  }
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive 
                    ? "bg-amber-500 text-black shadow-sm font-bold" 
                    : "bg-white/5 text-neutral-400 hover:bg-white/10"
                }`}
              >
                <Star className="w-3 h-3 shrink-0" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
        {/* Navigation Bar (Breadcrumbs) */}
        <div className="w-full bg-[#151312] border-b border-white/5 px-4 py-2 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs">
            {/* Go Up button */}
            <button
              onClick={handleGoUp}
              disabled={currentPath === "/" || activeTab === "resume"}
              className={`p-1 rounded cursor-pointer ${
                currentPath === "/" || activeTab === "resume"
                  ? "text-neutral-600 cursor-not-allowed"
                  : "text-neutral-300 hover:bg-white/10 hover:text-white"
              }`}
              title="Go to parent directory"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>

            {/* Path Breadcrumbs */}
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-400">
              <button onClick={() => { setActiveTab("filesystem"); handleBreadcrumbClick("/"); }} className="hover:text-white cursor-pointer font-semibold">
                Root
              </button>
              {currentPath !== "/" &&
                currentPath.split("/").filter(Boolean).map((part, index, arr) => {
                  const targetSubPath = `/${arr.slice(0, index + 1).join("/")}`;
                  return (
                    <span key={part} className="flex items-center gap-1">
                      <ChevronRight className="w-3 h-3 text-neutral-600" />
                      <button
                        onClick={() => { setActiveTab("filesystem"); handleBreadcrumbClick(targetSubPath); }}
                        className="hover:text-white cursor-pointer"
                      >
                        {part}
                      </button>
                    </span>
                  );
                })}
              
              {activeTab === "resume" && (
                <span className="flex items-center gap-1">
                  <ChevronRight className="w-3 h-3 text-neutral-600" />
                  <span className="text-white font-semibold">Resume View</span>
                </span>
              )}
            </div>
          </div>

          {/* View Modes (Grid vs List) */}
          {activeTab === "filesystem" && (
            <div className="flex items-center gap-1 bg-black/35 p-0.5 rounded-lg border border-white/5">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-2 py-1 text-[10px] font-bold rounded cursor-pointer ${
                  viewMode === "grid" ? "bg-white/10 text-white" : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-2 py-1 text-[10px] font-bold rounded cursor-pointer ${
                  viewMode === "list" ? "bg-white/10 text-white" : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                List
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Inner Panel View */}
        {activeTab === "resume" ? (
          /* RESUME VIEW PANEL */
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 select-text flex flex-col items-center bg-[#181615]/30">
            <div className="max-w-2xl w-full bg-[#12100e] border border-white/15 rounded-2xl shadow-2xl p-5 sm:p-8 relative">
              
              {/* Modern tab/mode switcher for Resume readability */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6 shrink-0 select-none gap-4">
                <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl">
                  <button
                    onClick={() => setResumeMode("styled")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      resumeMode === "styled"
                        ? "bg-amber-500 text-black shadow-md shadow-amber-500/10"
                        : "text-neutral-300 hover:bg-white/5"
                    }`}
                  >
                    Aesthetic CV
                  </button>
                  <button
                    onClick={() => setResumeMode("txt")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                      resumeMode === "txt"
                        ? "bg-amber-500 text-black shadow-md shadow-amber-500/10"
                        : "text-neutral-300 hover:bg-white/5"
                    }`}
                  >
                    Plain TXT
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openApp("pdf")}
                    className="p-1.5 px-3 bg-red-600/90 hover:bg-red-600 text-white border border-red-500/10 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Open PDF Viewer</span>
                  </button>

                  <button
                    onClick={handleDownloadResume}
                    className="p-1.5 px-3 bg-white/10 hover:bg-white text-neutral-300 hover:text-black border border-white/5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download TXT</span>
                  </button>
                </div>
              </div>

              {resumeMode === "styled" ? (
                /* BEAUTIFULLY STYLED CV VIEW */
                <div className="flex flex-col gap-6 text-neutral-200">
                  {/* Header info */}
                  <div className="text-center sm:text-left flex flex-col gap-2">
                    <h1 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-white leading-tight">
                      MELMAR JONES VELASCO
                    </h1>
                    <p className="text-xs sm:text-sm font-mono text-amber-400 tracking-wider uppercase font-semibold">
                      Web Developer & Digital Architect
                    </p>
                    
                    {/* Contact links row */}
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 mt-2 text-[11px] font-mono text-neutral-400 border-t border-b border-white/5 py-3">
                      <a href="mailto:melmarjvelasco@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
                        <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>melmarjvelasco@gmail.com</span>
                      </a>
                      <span className="hidden sm:inline text-white/10">•</span>
                      <span className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>+63949-636-4706</span>
                      </span>
                      <span className="hidden sm:inline text-white/10">•</span>
                      <a href="https://github.com/melmarj0nes23" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                        <FileCode className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>GitHub</span>
                      </a>
                      <span className="hidden sm:inline text-white/10">•</span>
                      <a href="https://ph.linkedin.com/in/melmar-jones-velasco-5b795a340" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
                        <Star className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xs font-mono tracking-widest uppercase font-bold text-neutral-400 border-l-2 border-amber-500 pl-2">
                      Professional Summary
                    </h2>
                    <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed font-sans">
                      Highly skilled Web Developer with 2+ years of hands-on experience in designing, coding, and modifying responsive websites and web applications, ensuring they are user-friendly, visually appealing, and functionally sound. Proficient in HTML, CSS, and JavaScript, with a strong portfolio demonstrating the ability to transform wireframes and ideas into clean, efficient, and maintainable code. Adept at leveraging modern web technologies, cloud-hosted platforms, and AI-assisted development tools to optimize project delivery, enhance SEO performance, and build scalable, secure, and high-performing web experiences while collaborating effectively with design and product teams.
                    </p>
                  </div>

                  {/* Experience */}
                  <div className="flex flex-col gap-4">
                    <h2 className="text-xs font-mono tracking-widest uppercase font-bold text-neutral-400 border-l-2 border-amber-500 pl-2 mb-1">
                      Professional Experience
                    </h2>

                    <div className="flex flex-col gap-5">
                      {/* Job 1 */}
                      <div className="flex flex-col gap-1 text-[13px]">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span className="font-bold text-white text-sm sm:text-base">Freelance Web Developer & Digital Architect</span>
                          <span className="text-[10px] font-mono text-amber-400 bg-amber-400/5 border border-amber-400/10 px-2.5 py-0.5 rounded-full self-start sm:self-auto">July 2024 - Present</span>
                        </div>
                        <span className="text-xs text-neutral-400 italic">Self-Employed</span>
                        <ul className="list-disc pl-4 mt-2 flex flex-col gap-1.5 text-xs text-neutral-300 leading-relaxed">
                          <li>Developed and implemented responsive websites and web applications using HTML5, CSS3, and JavaScript (ES6+), ensuring cross-device compatibility and enhanced user engagement by 25%.</li>
                          <li>Conceptualized, wireframed, and designed end-to-end website layouts and user experiences (UX/UI) for diverse clients, delivering visually appealing and functionally sound digital solutions.</li>
                          <li>Leveraged AI-assisted development tools for rapid code implementation, debugging, and content generation, reducing project delivery timelines by 20% and improving development efficiency.</li>
                          <li>Managed full content direction and structured site copy with visual hierarchy to maximize SEO performance and achieve top search engine rankings for client projects.</li>
                          <li>Integrated third-party APIs to enhance website functionality and user-facing features, ensuring seamless data flow and improved user experience.</li>
                          <li>Utilized Git and GitHub for version control, ensuring clean, well-documented, and scalable code management and collaborative development workflows.</li>
                          <li>Troubleshot, debugged, and optimized existing web applications to maximize speed, scalability, and adherence to industry best practices for web standards and security.</li>
                        </ul>
                      </div>

                      {/* Job 2 */}
                      <div className="flex flex-col gap-1 text-[13px] border-t border-white/5 pt-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span className="font-bold text-white text-sm sm:text-base">Workforce Specialist II / Workforce Scheduler</span>
                          <span className="text-[10px] font-mono text-neutral-400 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full self-start sm:self-auto">Dec 2022 - Jul 2024</span>
                        </div>
                        <span className="text-xs text-neutral-400 italic">VXI Global Holdings (PayPal)</span>
                        <ul className="list-disc pl-4 mt-2 flex flex-col gap-1.5 text-xs text-neutral-300 leading-relaxed">
                          <li>Architected and deployed intricate scheduling strategies for a workforce of 150+ agents, optimizing resource allocation to meet fluctuating service demands and maintain target service levels.</li>
                          <li>Analyzed real-time performance data and historical trends to forecast staffing needs, reducing overstaffing by 10% and improving operational efficiency.</li>
                          <li>Collaborated with operations leadership to implement process improvements, enhancing workforce management protocols and agent productivity by 15%.</li>
                          <li>Developed and maintained comprehensive shift schedules, ensuring adherence to labor laws and company policies while maximizing agent availability and engagement.</li>
                        </ul>
                      </div>

                      {/* Job 3 */}
                      <div className="flex flex-col gap-1 text-[13px] border-t border-white/5 pt-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span className="font-bold text-white text-sm sm:text-base">Workforce Real-Time Analyst</span>
                          <span className="text-[10px] font-mono text-neutral-400 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full self-start sm:self-auto">Oct 2018 - Dec 2022</span>
                        </div>
                        <span className="text-xs text-neutral-400 italic">VXI Global Holdings (PayPal)</span>
                        <ul className="list-disc pl-4 mt-2 flex flex-col gap-1.5 text-xs text-neutral-300 leading-relaxed">
                          <li>Monitored real-time call queues and agent performance metrics, proactively identifying and mitigating potential service level risks to maintain operational stability.</li>
                          <li>Analyzed intraday performance data to provide actionable recommendations to management, optimizing agent deployment and achieving consistent service delivery targets.</li>
                          <li>Implemented dynamic staffing adjustments based on real-time data analysis, improving response times by 12% and enhancing customer satisfaction.</li>
                          <li>Generated detailed reports on workforce adherence and productivity, providing critical insights for strategic planning and performance management.</li>
                        </ul>
                      </div>

                      {/* Job 4 */}
                      <div className="flex flex-col gap-1 text-[13px] border-t border-white/5 pt-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span className="font-bold text-white text-sm sm:text-base">Subject Matter Expert</span>
                          <span className="text-[10px] font-mono text-neutral-400 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full self-start sm:self-auto">Jan 2018 - Oct 2018</span>
                        </div>
                        <span className="text-xs text-neutral-400 italic">VXI Global Holdings (PayPal)</span>
                        <ul className="list-disc pl-4 mt-2 flex flex-col gap-1.5 text-xs text-neutral-300 leading-relaxed">
                          <li>Oversaw staffing allocation and generated comprehensive performance reports, providing data-driven insights to leadership for improved workforce efficiency and decision-making.</li>
                          <li>Collaborated with leadership teams to optimize operational processes and enhance resource management, demonstrating strong problem-solving and communication skills.</li>
                          <li>Mentored and coached a team of 20+ customer service representatives, elevating their technical proficiency and adherence to best practices, resulting in a 10% improvement in resolution rates.</li>
                          <li>Analyzed complex customer issues and developed standardized troubleshooting guides, reducing average handling time by 5% for common inquiries.</li>
                        </ul>
                      </div>

                      {/* Job 5 */}
                      <div className="flex flex-col gap-1 text-[13px] border-t border-white/5 pt-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span className="font-bold text-white text-sm sm:text-base">Customer Service Representative</span>
                          <span className="text-[10px] font-mono text-neutral-400 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full self-start sm:self-auto">Apr 2017 - Jan 2018</span>
                        </div>
                        <span className="text-xs text-neutral-400 italic">VXI Global Holdings (PayPal)</span>
                        <ul className="list-disc pl-4 mt-2 flex flex-col gap-1.5 text-xs text-neutral-300 leading-relaxed">
                          <li>Conducted coaching and training refreshers for new hires and existing agents, ensuring adherence to best practices and improving overall team performance by 8%.</li>
                          <li>Supported escalation processes and mentored agents, enhancing team capabilities in troubleshooting and complex problem resolution, leading to a 15% reduction in unresolved cases.</li>
                          <li>Managed a high volume of customer inquiries, consistently achieving top customer satisfaction scores through empathetic and efficient service delivery.</li>
                          <li>Identified recurring customer pain points and provided feedback to management, contributing to the development of improved service protocols.</li>
                        </ul>
                      </div>

                      {/* Job 6 */}
                      <div className="flex flex-col gap-1 text-[13px] border-t border-white/5 pt-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <span className="font-bold text-white text-sm sm:text-base">Technical Support Representative</span>
                          <span className="text-[10px] font-mono text-neutral-400 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full self-start sm:self-auto">Apr 2015 - Apr 2017</span>
                        </div>
                        <span className="text-xs text-neutral-400 italic">VXI Global Holdings (PayPal)</span>
                        <ul className="list-disc pl-4 mt-2 flex flex-col gap-1.5 text-xs text-neutral-300 leading-relaxed">
                          <li>Delivered expert technical support for AT&T ICM customers, guiding them through complex troubleshooting procedures to resolve technical issues effectively and efficiently.</li>
                          <li>Documented and tracked technical problems and resolutions in a centralized knowledge base, contributing to a 20% improvement in future support efficiency and agent training.</li>
                          <li>Diagnosed and resolved a wide range of hardware and software issues, maintaining a high first-call resolution rate and minimizing customer downtime.</li>
                          <li>Collaborated with senior technicians to escalate and resolve intricate technical challenges, ensuring comprehensive problem resolution for critical system failures.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-col gap-2 border-t border-white/5 pt-4">
                    <h2 className="text-xs font-mono tracking-widest uppercase font-bold text-neutral-400 border-l-2 border-amber-500 pl-2 mb-1">
                      Technical & Operations Skills
                    </h2>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {[
                        "HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Web Design", "Web Application Development",
                        "UX/UI Design Principles", "Git", "GitHub", "Website Deployment", "Cloud Hosting",
                        "SEO Optimization", "Debugging", "Troubleshooting", "API Integration", "Problem Solving",
                        "Attention to Detail", "Collaborative Mindset", "Clean Code", "Well-Documented Code", "Scalable Code",
                        "Web Standards", "Security Best Practices", "Data Protection", "Figma", "Adobe XD",
                        "Node.js", "Python", "PHP", "SQL", "NoSQL", "Performance Optimization", "Cross-Browser Compatibility",
                        "User Engagement", "Project Delivery Optimization", "Resource Management", "Data Analysis",
                        "Operational Efficiency", "Process Optimization"
                      ].map((sk) => (
                        <span key={sk} className="text-[10px] font-mono bg-neutral-900 border border-white/5 hover:border-white/20 text-neutral-300 px-2.5 py-1 rounded-full transition-colors select-none">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div className="flex flex-col gap-2 border-t border-white/5 pt-4">
                    <h2 className="text-xs font-mono tracking-widest uppercase font-bold text-neutral-400 border-l-2 border-amber-500 pl-2">
                      Education
                    </h2>
                    <div className="flex items-center justify-between text-xs sm:text-[13px]">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-white">Nursing Education (Undergraduate)</span>
                        <span className="text-neutral-400 text-xs">Luzon Colleges of Science and Technology</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Text representation */
                <pre className="text-[11px] sm:text-xs font-mono text-neutral-300 whitespace-pre-wrap leading-relaxed select-text mt-8 sm:mt-0">
                  {virtualFileSystem.find((n) => n.path === "/resume.txt")?.content}
                </pre>
              )}
            </div>
          </div>
        ) : (
          /* STANDARD FILESYSTEM PANELS */
          <div className="flex-1 flex overflow-hidden">
            {/* Grid/List Central Pane container */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#181615]/10">
              {/* Grid/List Central Pane scroll area */}
              <div className="flex-1 overflow-y-auto p-4">
                {currentContents.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-neutral-500">
                    <p className="text-xs font-mono">This directory folder is empty</p>
                  </div>
                ) : viewMode === "grid" ? (
                  /* GRID VIEW */
                  <div className="grid grid-cols-3 sm:grid-cols-4 xl:grid-cols-5 gap-4">
                    {currentContents.map((node) => {
                      const isSelected = selectedNode?.path === node.path;
                      return (
                        <div
                          key={node.path}
                          onClick={() => handleNodeClick(node)}
                          onDoubleClick={() => handleNodeDoubleClick(node)}
                          className={`p-3 rounded-2xl flex flex-col items-center text-center cursor-pointer border transition-all ${
                            isSelected
                              ? "bg-white/10 border-white/15 shadow-md"
                              : "border-transparent hover:bg-white/5 hover:border-white/5"
                          }`}
                        >
                          {node.type === "directory" ? (
                            <Folder className="w-10 h-10 text-sky-400 mb-2 filter drop-shadow-md" />
                          ) : node.name.endsWith(".json") ? (
                            <FileCode className="w-10 h-10 text-emerald-400 mb-2 filter drop-shadow-md" />
                          ) : (
                            <FileText className="w-10 h-10 text-amber-400 mb-2 filter drop-shadow-md" />
                          )}
                          <span className="w-full block text-center text-[10px] sm:text-[11px] font-medium leading-tight text-neutral-200 select-none truncate px-1">
                            {node.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* LIST VIEW */
                  <div className="flex flex-col p-1 gap-0.5">
                    <div className="grid grid-cols-3 px-3 py-1.5 text-[9px] font-mono uppercase font-bold text-neutral-500 border-b border-white/5 mb-1.5">
                      <span>Name</span>
                      <span>Kind</span>
                      <span>Location</span>
                    </div>
                    {currentContents.map((node) => {
                      const isSelected = selectedNode?.path === node.path;
                      return (
                        <div
                          key={node.path}
                          onClick={() => handleNodeClick(node)}
                          onDoubleClick={() => handleNodeDoubleClick(node)}
                          className={`grid grid-cols-3 items-center px-3 py-2 rounded-lg cursor-pointer text-xs border transition-all ${
                            isSelected
                              ? "bg-white/10 border-white/5 text-white"
                              : "border-transparent hover:bg-white/5 text-neutral-400"
                          }`}
                        >
                          <span className="flex items-center gap-2 text-neutral-200 font-medium">
                            {node.type === "directory" ? (
                              <Folder className="w-3.5 h-3.5 text-sky-400" />
                            ) : (
                              <FileText className="w-3.5 h-3.5 text-neutral-400" />
                            )}
                            <span className="truncate">{node.name}</span>
                          </span>
                          <span className="font-mono text-[10px] uppercase">{node.type}</span>
                          <span className="font-mono text-[10px] text-neutral-500 truncate">{node.path}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Mobile Action Footer */}
              {selectedNode && (
                <div className="sm:hidden border-t border-white/5 bg-[#141211]/95 p-3 flex items-center justify-between shrink-0 select-text">
                  <div className="flex items-center gap-2 text-left min-w-0">
                    {selectedNode.type === "directory" ? (
                      <Folder className="w-5 h-5 text-sky-400 shrink-0" />
                    ) : (
                      <FileText className="w-5 h-5 text-amber-400 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold text-white truncate">{selectedNode.name}</p>
                      <p className="text-[9px] font-mono text-neutral-500 uppercase">{selectedNode.type}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleNodeDoubleClick(selectedNode)}
                    className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-black rounded-lg text-xs font-bold tracking-wide flex items-center gap-1.5 cursor-pointer transition-colors shrink-0"
                  >
                    {selectedNode.type === "file" ? <FileCode className="w-3.5 h-3.5" /> : <MonitorPlay className="w-3.5 h-3.5" />}
                    <span>{selectedNode.type === "file" ? "Open" : "Explore"}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Right Pane: Live preview summary details */}
            {selectedNode && (
              <div className="w-56 border-l border-white/5 bg-[#141211]/85 p-4 flex flex-col items-center gap-4 text-center shrink-0 hidden sm:flex select-text">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  {selectedNode.type === "directory" ? (
                    <Folder className="w-12 h-12 text-sky-400" />
                  ) : (
                    <FileText className="w-12 h-12 text-amber-400" />
                  )}
                </div>
                
                <div className="w-full">
                  <h4 className="text-xs font-bold text-neutral-200 truncate px-2">{selectedNode.name}</h4>
                  <p className="text-[9px] font-mono text-neutral-500 mt-1 uppercase">Kind: {selectedNode.type}</p>
                </div>

                <div className="h-[1px] w-full bg-white/5" />

                {/* Simulated file stats */}
                <div className="w-full text-left text-[10px] font-mono text-neutral-400 flex flex-col gap-1 px-1 select-text">
                  <p><span className="text-neutral-600 font-semibold">Location:</span> {selectedNode.path}</p>
                  {selectedNode.type === "file" && (
                    <>
                      <p><span className="text-neutral-600 font-semibold">Size:</span> {(selectedNode.content?.length || 0) * 2} Bytes</p>
                      <p className="flex items-center gap-1"><span className="text-neutral-600 font-semibold">Access:</span> <span className="text-emerald-500">Read Available</span></p>
                    </>
                  )}
                </div>

                {/* Call to action button inside preview bar */}
                {selectedNode.type === "file" ? (
                  <button
                    onClick={() => handleNodeDoubleClick(selectedNode)}
                    className="w-full mt-auto py-1.5 bg-white/5 hover:bg-white hover:text-black border border-white/5 text-neutral-300 rounded-lg text-[10px] font-bold tracking-wide uppercase flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-sm"
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    <span>Load in Editor</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleNodeDoubleClick(selectedNode)}
                    className="w-full mt-auto py-1.5 bg-white/5 hover:bg-white/10 text-neutral-300 rounded-lg text-[10px] font-bold tracking-wide uppercase flex items-center justify-center gap-1.5 cursor-pointer transition-all border border-white/5"
                  >
                    <MonitorPlay className="w-3.5 h-3.5" />
                    <span>Open Folder</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
