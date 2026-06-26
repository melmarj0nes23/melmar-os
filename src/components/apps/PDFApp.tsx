import React, { useState, useRef, useEffect } from "react";
import { useOS } from "../../context/OSContext";
import { 
  Download, 
  Printer, 
  ZoomIn, 
  ZoomOut, 
  ChevronLeft, 
  ChevronRight, 
  RotateCw,
  Search,
  Mail,
  Phone,
  Globe,
  FileCode,
  CheckCircle,
  Briefcase,
  GraduationCap
} from "lucide-react";

export default function PDFApp() {
  const { addNotification } = useOS();
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [rotation, setRotation] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const page3Ref = useRef<HTMLDivElement>(null);

  // Scroll listener to update page indicator dynamically
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const p1 = page1Ref.current;
      const p2 = page2Ref.current;
      const p3 = page3Ref.current;
      
      if (!p1 || !p2 || !p3) return;

      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const midpoint = containerScrollTop + containerHeight / 2;

      const offset1 = p1.offsetTop;
      const offset2 = p2.offsetTop;
      const offset3 = p3.offsetTop;

      if (midpoint < offset2) {
        setCurrentPage(1);
      } else if (midpoint >= offset2 && midpoint < offset3) {
        setCurrentPage(2);
      } else {
        setCurrentPage(3);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToPage = (pageNumber: number) => {
    const p1 = page1Ref.current;
    const p2 = page2Ref.current;
    const p3 = page3Ref.current;
    const container = containerRef.current;

    if (!container) return;

    let targetOffset = 0;
    if (pageNumber === 1 && p1) targetOffset = p1.offsetTop;
    if (pageNumber === 2 && p2) targetOffset = p2.offsetTop;
    if (pageNumber === 3 && p3) targetOffset = p3.offsetTop;

    container.scrollTo({
      top: targetOffset - 16,
      behavior: "smooth"
    });
    setCurrentPage(pageNumber);
  };

  const handleZoomIn = () => {
    if (zoom < 150) setZoom(zoom + 10);
  };

  const handleZoomOut = () => {
    if (zoom > 60) setZoom(zoom - 10);
  };

  const handleRotate = () => {
    setRotation((rotation + 90) % 360);
  };

  const handlePrint = () => {
    // Open standard native print interface
    window.print();
  };

  const handleDownload = () => {
    const textContent = `========================================================================
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
efficient, and maintainable code...`;

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Melmar_Jones_Velasco_Resume.pdf"; // Mocking as .pdf or downloads actual text format
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addNotification("Melmar_Jones_Velasco_Resume.pdf prepared for offline storage.");
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] text-neutral-200 select-none overflow-hidden relative" id="pdf-reader-app">
      {/* Dynamic styling override for seamless printed resume format */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #pdf-reader-app, #pdf-reader-app .print-page {
            visibility: visible;
          }
          #pdf-reader-app {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
            background: white !important;
            overflow: visible !important;
          }
          .pdf-toolbar {
            display: none !important;
          }
          .pdf-pages-container {
            background: white !important;
            padding: 0 !important;
            overflow: visible !important;
            height: auto !important;
            display: block !important;
          }
          .print-page {
            width: 100% !important;
            max-width: 100% !important;
            height: 297mm !important;
            page-break-after: always !important;
            border: none !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 15mm !important;
            background: white !important;
            color: black !important;
          }
        }
      `}</style>

      {/* 1. PDF READER TOOLBAR */}
      <div className="pdf-toolbar h-11 bg-[#2d2d2d] border-b border-[#1b1b1b] flex items-center justify-between px-3 shrink-0 text-xs font-medium z-10 shadow-md">
        
        {/* Left Toolbar Controls (Document Title, Pagination) */}
        <div className="flex items-center gap-3">
          {/* Adobe Acrobat Style PDF Logo badge */}
          <div className="flex items-center gap-1.5 bg-red-600 px-2 py-0.5 rounded text-[10px] font-black text-white select-none">
            PDF
          </div>
          <span className="hidden md:inline font-semibold text-neutral-100 max-w-[200px] truncate">
            Melmar_Resume.pdf
          </span>
          
          <div className="w-px h-5 bg-neutral-700 mx-1 hidden md:block" />

          {/* Page Selector navigation tools */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => scrollToPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-1 text-neutral-400 hover:text-white hover:bg-white/5 rounded cursor-pointer disabled:opacity-30 disabled:hover:bg-transparent"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 bg-neutral-800 border border-neutral-700 rounded px-1.5 py-0.5 text-[11px]">
              <span className="font-mono text-white text-center w-5">{currentPage}</span>
              <span className="text-neutral-500">/</span>
              <span className="text-neutral-400 font-mono">3</span>
            </div>
            <button
              onClick={() => scrollToPage(Math.min(3, currentPage + 1))}
              disabled={currentPage === 3}
              className="p-1 text-neutral-400 hover:text-white hover:bg-white/5 rounded cursor-pointer disabled:opacity-30 disabled:hover:bg-transparent"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center Toolbar Controls (Zoom and Rotation) */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="p-1 text-neutral-400 hover:text-white hover:bg-white/5 rounded cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          
          <span className="font-mono text-neutral-300 text-[10px] bg-neutral-800 border border-neutral-700/60 rounded px-2 py-0.5 w-12 text-center">
            {zoom}%
          </span>
          
          <button
            onClick={handleZoomIn}
            className="p-1 text-neutral-400 hover:text-white hover:bg-white/5 rounded cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <div className="w-px h-5 bg-neutral-700 mx-1" />

          <button
            onClick={handleRotate}
            className="p-1 text-neutral-400 hover:text-white hover:bg-white/5 rounded cursor-pointer"
            title="Rotate Clockwise"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Toolbar Controls (Actions: Download / Print) */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrint}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/5 rounded cursor-pointer flex items-center gap-1.5"
            title="Print Document"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px]">Print</span>
          </button>
          
          <button
            onClick={handleDownload}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/5 rounded cursor-pointer flex items-center gap-1.5 bg-neutral-800 hover:bg-amber-500 hover:text-black border border-neutral-700/80 transition-colors"
            title="Download Document"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px] font-bold">Download</span>
          </button>
        </div>
      </div>

      {/* 2. PDF VIEWER CANVAS & SCROLLPORT */}
      <div 
        ref={containerRef}
        className="pdf-pages-container flex-1 overflow-y-auto bg-[#323639] p-6 sm:p-10 flex flex-col items-center gap-8"
        style={{ scrollBehavior: "smooth" }}
      >
        <div 
          className="transition-all duration-200 flex flex-col items-center gap-8 w-full max-w-4xl"
          style={{ 
            transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
            transformOrigin: "top center"
          }}
        >
          
          {/* ================= PAGE 1 ================= */}
          <div 
            ref={page1Ref}
            className="print-page w-full max-w-[760px] aspect-auto sm:aspect-[1/1.414] bg-white text-neutral-800 shadow-2xl p-6 sm:p-14 rounded border border-neutral-400 flex flex-col justify-between select-text"
          >
            <div className="flex flex-col gap-6">
              {/* PDF Header Section */}
              <div className="text-center pb-5 border-b border-neutral-200">
                <h1 className="text-3xl font-serif tracking-tight text-neutral-900 font-bold mb-1.5">
                  MELMAR JONES VELASCO
                </h1>
                <p className="text-xs font-mono text-amber-600 tracking-widest uppercase font-semibold mb-3">
                  Web Developer & Digital Architect
                </p>
                
                {/* Contact Coordinates */}
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] font-serif text-neutral-600 italic">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-neutral-500 shrink-0" />
                    melmarjvelasco@gmail.com
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-neutral-500 shrink-0" />
                    +63949-636-4706
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-3 h-3 text-neutral-500 shrink-0" />
                    github.com/melmarj0nes23
                  </span>
                </div>
              </div>

              {/* Summary Section */}
              <div className="flex flex-col gap-2">
                <h2 className="text-[11px] font-mono tracking-wider uppercase font-bold text-neutral-500 border-b border-neutral-200 pb-1">
                  Professional Summary
                </h2>
                <p className="text-[12px] text-neutral-700 leading-relaxed font-serif text-justify">
                  Highly skilled Web Developer with 2+ years of hands-on experience in designing, coding, and modifying responsive websites and web applications, ensuring they are user-friendly, visually appealing, and functionally sound. Proficient in HTML, CSS, and JavaScript, with a strong portfolio demonstrating the ability to transform wireframes and ideas into clean, efficient, and maintainable code. Adept at leveraging modern web technologies, cloud-hosted platforms, and AI-assisted development tools to optimize project delivery, enhance SEO performance, and build scalable, secure, and high-performing web experiences while collaborating effectively with design and product teams.
                </p>
              </div>

              {/* Experience Section */}
              <div className="flex flex-col gap-4">
                <h2 className="text-[11px] font-mono tracking-wider uppercase font-bold text-neutral-500 border-b border-neutral-200 pb-1">
                  Professional Experience
                </h2>

                {/* Job 1 */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4">
                    <h3 className="font-serif font-bold text-[13px] text-neutral-900">
                      Freelance Web Developer & Digital Architect
                    </h3>
                    <span className="text-[10px] font-mono text-neutral-500 shrink-0">July 2024 – Present</span>
                  </div>
                  <div className="flex justify-between items-baseline text-[10px] text-neutral-500 italic">
                    <span>Self-Employed</span>
                    <span>Remote / Philippines</span>
                  </div>
                  <ul className="list-disc pl-4 text-[11px] text-neutral-700 space-y-1.5 font-serif leading-relaxed text-justify">
                    <li>Developed and implemented responsive websites and web applications using HTML5, CSS3, and JavaScript (ES6+), ensuring cross-device compatibility and enhanced user engagement by 25%.</li>
                    <li>Conceptualized, wireframed, and designed end-to-end website layouts and user experiences (UX/UI) for diverse clients, delivering visually appealing and functionally sound digital solutions.</li>
                    <li>Leveraged AI-assisted development tools for rapid code implementation, debugging, and content generation, reducing project delivery timelines by 20% and improving development efficiency.</li>
                    <li>Managed full content direction and structured site copy with visual hierarchy to maximize SEO performance and achieve top search engine rankings for client projects.</li>
                    <li>Integrated third-party APIs to enhance website functionality and user-facing features, ensuring seamless data flow and improved user experience.</li>
                  </ul>
                </div>

                {/* Job 2 */}
                <div className="flex flex-col gap-1.5 border-t border-neutral-100 pt-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4">
                    <h3 className="font-serif font-bold text-[13px] text-neutral-900">
                      Workforce Specialist II / Workforce Scheduler
                    </h3>
                    <span className="text-[10px] font-mono text-neutral-500 shrink-0">Dec 2022 – Jul 2024</span>
                  </div>
                  <div className="flex justify-between items-baseline text-[10px] text-neutral-500 italic">
                    <span>VXI Global Holdings (PayPal Support)</span>
                    <span>Pangasinan, Philippines</span>
                  </div>
                  <ul className="list-disc pl-4 text-[11px] text-neutral-700 space-y-1.5 font-serif leading-relaxed text-justify">
                    <li>Architected and deployed intricate scheduling strategies for a workforce of 150+ agents, optimizing resource allocation to meet fluctuating service demands and maintain target service levels.</li>
                    <li>Analyzed real-time performance data and historical trends to forecast staffing needs, reducing overstaffing by 10% and improving operational efficiency.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Page number footer */}
            <div className="text-center border-t border-neutral-100 pt-3 text-[10px] font-mono text-neutral-400 select-none">
              Page 1 of 3
            </div>
          </div>


          {/* ================= PAGE 2 ================= */}
          <div 
            ref={page2Ref}
            className="print-page w-full max-w-[760px] aspect-auto sm:aspect-[1/1.414] bg-white text-neutral-800 shadow-2xl p-6 sm:p-14 rounded border border-neutral-400 flex flex-col justify-between select-text"
          >
            <div className="flex flex-col gap-6">
              {/* Continuation Header */}
              <div className="flex justify-between items-center border-b border-neutral-100 pb-2 text-[10px] font-mono text-neutral-400">
                <span>Melmar Jones Velasco — Resume</span>
                <span>Experience (Continued)</span>
              </div>

              {/* Experience Continued */}
              <div className="flex flex-col gap-5">
                {/* Job 2 points continued */}
                <div className="flex flex-col gap-1">
                  <h4 className="text-[11px] font-mono font-bold uppercase text-neutral-500">Workforce Specialist II (Continued)</h4>
                  <ul className="list-disc pl-4 text-[11px] text-neutral-700 space-y-1.5 font-serif leading-relaxed text-justify">
                    <li>Collaborated with operations leadership to implement process improvements, enhancing workforce management protocols and agent productivity by 15%.</li>
                    <li>Developed and maintained comprehensive shift schedules, ensuring adherence to labor laws and company policies while maximizing agent availability and engagement.</li>
                  </ul>
                </div>

                {/* Job 3 */}
                <div className="flex flex-col gap-1.5 border-t border-neutral-100 pt-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4">
                    <h3 className="font-serif font-bold text-[13px] text-neutral-900">
                      Workforce Real-Time Analyst
                    </h3>
                    <span className="text-[10px] font-mono text-neutral-500 shrink-0">Oct 2018 – Dec 2022</span>
                  </div>
                  <div className="flex justify-between items-baseline text-[10px] text-neutral-500 italic">
                    <span>VXI Global Holdings (PayPal Support)</span>
                    <span>Pangasinan, Philippines</span>
                  </div>
                  <ul className="list-disc pl-4 text-[11px] text-neutral-700 space-y-1.5 font-serif leading-relaxed text-justify">
                    <li>Monitored real-time call queues and agent performance metrics, proactively identifying and mitigating potential service level risks to maintain operational stability.</li>
                    <li>Analyzed intraday performance data to provide actionable recommendations to management, optimizing agent deployment and achieving consistent service delivery targets.</li>
                    <li>Implemented dynamic staffing adjustments based on real-time data analysis, improving response times by 12% and enhancing customer satisfaction.</li>
                    <li>Generated detailed reports on workforce adherence and productivity, providing critical insights for strategic planning and performance management.</li>
                  </ul>
                </div>

                {/* Job 4 */}
                <div className="flex flex-col gap-1.5 border-t border-neutral-100 pt-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4">
                    <h3 className="font-serif font-bold text-[13px] text-neutral-900">
                      Subject Matter Expert
                    </h3>
                    <span className="text-[10px] font-mono text-neutral-500 shrink-0">Jan 2018 – Oct 2018</span>
                  </div>
                  <div className="flex justify-between items-baseline text-[10px] text-neutral-500 italic">
                    <span>VXI Global Holdings (PayPal Support)</span>
                    <span>Pangasinan, Philippines</span>
                  </div>
                  <ul className="list-disc pl-4 text-[11px] text-neutral-700 space-y-1.5 font-serif leading-relaxed text-justify">
                    <li>Oversaw staffing allocation and generated comprehensive performance reports, providing data-driven insights to leadership for improved workforce efficiency and decision-making.</li>
                    <li>Collaborated with leadership teams to optimize operational processes and enhance resource management, demonstrating strong problem-solving and communication skills.</li>
                    <li>Mentored and coached a team of 20+ customer service representatives, elevating their technical proficiency and adherence to best practices, resulting in a 10% improvement in resolution rates.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Page number footer */}
            <div className="text-center border-t border-neutral-100 pt-3 text-[10px] font-mono text-neutral-400 select-none">
              Page 2 of 3
            </div>
          </div>


          {/* ================= PAGE 3 ================= */}
          <div 
            ref={page3Ref}
            className="print-page w-full max-w-[760px] aspect-auto sm:aspect-[1/1.414] bg-white text-neutral-800 shadow-2xl p-6 sm:p-14 rounded border border-neutral-400 flex flex-col justify-between select-text"
          >
            <div className="flex flex-col gap-5">
              {/* Continuation Header */}
              <div className="flex justify-between items-center border-b border-neutral-100 pb-2 text-[10px] font-mono text-neutral-400">
                <span>Melmar Jones Velasco — Resume</span>
                <span>Skills & Education</span>
              </div>

              {/* Job 5 Customer Service Representative */}
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4">
                  <h3 className="font-serif font-bold text-[12px] text-neutral-900">
                    Customer Service Representative
                  </h3>
                  <span className="text-[10px] font-mono text-neutral-500 shrink-0">Apr 2017 – Jan 2018</span>
                </div>
                <ul className="list-disc pl-4 text-[10px] text-neutral-700 space-y-1 font-serif leading-relaxed">
                  <li>Conducted coaching and training refreshers for new hires and existing agents, improving team performance by 8%.</li>
                  <li>Supported escalation processes and mentored agents, leading to a 15% reduction in unresolved cases.</li>
                </ul>
              </div>

              {/* Job 6 Technical Support Representative */}
              <div className="flex flex-col gap-1.5 border-t border-neutral-100 pt-2">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4">
                  <h3 className="font-serif font-bold text-[12px] text-neutral-900">
                    Technical Support Representative
                  </h3>
                  <span className="text-[10px] font-mono text-neutral-500 shrink-0">Apr 2015 – Apr 2017</span>
                </div>
                <ul className="list-disc pl-4 text-[10px] text-neutral-700 space-y-1 font-serif leading-relaxed">
                  <li>Delivered expert technical support for AT&T ICM customers, guiding them through complex troubleshooting procedures.</li>
                  <li>Documented and tracked technical problems in a centralized knowledge base, contributing to a 20% improvement in support efficiency.</li>
                </ul>
              </div>

              {/* Skills Section */}
              <div className="flex flex-col gap-2 border-t border-neutral-100 pt-2.5">
                <h2 className="text-[11px] font-mono tracking-wider uppercase font-bold text-neutral-500 border-b border-neutral-150 pb-1">
                  Technical & Operations Skills
                </h2>
                <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[10px] text-neutral-700 font-serif leading-relaxed">
                  <div>
                    <p className="font-bold text-neutral-900 mb-0.5">Development & UI/UX:</p>
                    <p className="mb-2">HTML5, CSS3, JavaScript (ES6+), Responsive Web Design, Web Application Development, UX/UI Design, Figma, Adobe XD.</p>
                    
                    <p className="font-bold text-neutral-900 mb-0.5">Version Control & Deployment:</p>
                    <p>Git, GitHub, Website Deployment, Cloud Hosting, SEO Optimization, API Integration.</p>
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 mb-0.5">Workforce Optimization & Systems:</p>
                    <p className="mb-2">Resource Management, Data Analysis, Intraday Staffing Adjustments, Schedule Forecasting, Operations Leadership.</p>

                    <p className="font-bold text-neutral-900 mb-0.5">Familiarity & Other Tech:</p>
                    <p>Node.js, Python, PHP, SQL, NoSQL (Basic Understandings), Troubleshooting, Debugging.</p>
                  </div>
                </div>
              </div>

              {/* Education Section */}
              <div className="flex flex-col gap-2 border-t border-neutral-100 pt-2.5">
                <h2 className="text-[11px] font-mono tracking-wider uppercase font-bold text-neutral-500 border-b border-neutral-150 pb-1">
                  Education
                </h2>
                <div className="text-[11px] font-serif">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-4">
                    <span className="font-bold text-neutral-900">Nursing Education (Undergraduate)</span>
                    <span className="text-[10px] font-mono text-neutral-500 shrink-0">Luzon, PH</span>
                  </div>
                  <span className="text-neutral-600 italic block text-[10px]">Luzon Colleges of Science and Technology</span>
                </div>
              </div>
            </div>

            {/* Page number footer */}
            <div className="text-center border-t border-neutral-100 pt-3 text-[10px] font-mono text-neutral-400 select-none">
              Page 3 of 3
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
