import { useState, useEffect } from "react";
import { useOS } from "../../context/OSContext";
import { projectsData } from "../../data/filesystem";
import { ProjectData } from "../../types";
import { ArrowLeft, ArrowRight, RotateCw, Globe, Shield, Star, ExternalLink, Github, ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function SafariApp() {
  const { addNotification, settings, openApp } = useOS();
  const [activeProject, setActiveProject] = useState<ProjectData>(projectsData[0]);
  const [addressVal, setAddressVal] = useState(`https://melmar-portfolio.vercel.app/projects/all#${projectsData[0].id}`);
  const [history, setHistory] = useState<string[]>([projectsData[0].id]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  // Track selected screenshot for each project independently
  const [selectedScreenshots, setSelectedScreenshots] = useState<Record<string, string>>({});
  
  // Fullscreen Lightbox states
  const [lightboxProject, setLightboxProject] = useState<ProjectData | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxProject === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const screenshots = lightboxProject.screenshots || [];
      if (e.key === "Escape") {
        setLightboxProject(null);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => 
          prev !== null 
            ? (prev - 1 + screenshots.length) % screenshots.length 
            : 0
        );
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => 
          prev !== null 
            ? (prev + 1) % screenshots.length 
            : 0
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxProject]);

  // Smooth scroll helper with dynamic offset calculation
  const scrollToProjectInternal = (projectId: string) => {
    setAddressVal(`https://melmar-portfolio.vercel.app/projects/all#${projectId}`);
    
    // Smoothly scroll to the target project
    const container = document.getElementById("safari-scroll-container");
    const target = document.getElementById(`safari-project-${projectId}`);
    if (container && target) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const offset = targetRect.top - containerRect.top + container.scrollTop - 24;
      container.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  const navigateToProject = (projectId: string) => {
    scrollToProjectInternal(projectId);
    
    // Append to history stack
    const newHistory = history.slice(0, historyIndex + 1);
    if (newHistory[newHistory.length - 1] !== projectId) {
      newHistory.push(projectId);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  // Sync external event (e.g. clicking "View Project" in Mail, or Spotlight search)
  useEffect(() => {
    const handleOpenProject = (e: Event) => {
      const projectId = (e as CustomEvent).detail;
      const matched = projectsData.find((p) => p.id === projectId);
      if (matched) {
        navigateToProject(matched.id);
      }
    };
    window.addEventListener("safari_open_project", handleOpenProject);
    return () => window.removeEventListener("safari_open_project", handleOpenProject);
  }, [history, historyIndex]);

  // Automatic Scroll Spy to highlight the current bookmarked project and update URL anchor
  useEffect(() => {
    const container = document.getElementById("safari-scroll-container");
    if (!container) return;

    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      // Debounce slightly to minimize state updates on passive scrolls
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        let currentActive = projectsData[0];
        let minDistance = Infinity;

        projectsData.forEach((project) => {
          const el = document.getElementById(`safari-project-${project.id}`);
          if (el) {
            const rect = el.getBoundingClientRect();
            // Distance relative to top of the scroll viewport area
            const distance = Math.abs(rect.top - 140);
            if (distance < minDistance) {
              minDistance = distance;
              currentActive = project;
            }
          }
        });

        setActiveProject(currentActive);
        setAddressVal(`https://melmar-portfolio.vercel.app/projects/all#${currentActive.id}`);
      }, 80);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleBack = () => {
    if (historyIndex > 0) {
      const nextIdx = historyIndex - 1;
      setHistoryIndex(nextIdx);
      const projectId = history[nextIdx];
      scrollToProjectInternal(projectId);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      const projectId = history[nextIdx];
      scrollToProjectInternal(projectId);
    }
  };

  const handleLinkClick = (title: string, url: string) => {
    addNotification(`Redirecting to live project: ${title}`);
    window.open(url, "_blank");
  };

  return (
    <div id="safari-app-body" className="w-full h-full flex flex-col bg-[#0f0e0d] font-sans text-neutral-300 relative">
      {/* SAFARI NAV CONTROL HEADERS */}
      <div className="w-full bg-[#161413] border-b border-white/5 px-4 py-2.5 flex items-center gap-3 shrink-0">
        {/* Navigation Arrows */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={handleBack}
            disabled={historyIndex === 0}
            className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
              historyIndex === 0 ? "text-neutral-600 cursor-not-allowed" : "text-neutral-300 hover:bg-white/10 hover:text-white"
            }`}
            title="Back"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          
          <button
            onClick={handleForward}
            disabled={historyIndex >= history.length - 1}
            className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
              historyIndex >= history.length - 1 ? "text-neutral-600 cursor-not-allowed" : "text-neutral-300 hover:bg-white/10 hover:text-white"
            }`}
            title="Forward"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            className="p-1.5 rounded-lg text-neutral-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
            title="Reload frame"
            onClick={() => addNotification("Reloading active web page view...")}
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Address Input Bar */}
        <div className="flex-1 max-w-2xl mx-auto bg-black/40 border border-white/5 rounded-xl px-3 py-1 flex items-center gap-2 text-[10px] sm:text-xs text-neutral-400">
          <Shield className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <Globe className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
          <input
            type="text"
            className="w-full bg-transparent outline-none border-none text-neutral-300 tracking-wide font-mono text-[16px] sm:text-[11px]"
            value={addressVal}
            readOnly
          />
        </div>

        {/* Bookmarks Star icon */}
        <div className="flex items-center gap-2 shrink-0">
          <Star className="w-4 h-4 text-amber-500 shrink-0" />
        </div>
      </div>

      {/* QUICK JUMP NAVIGATION BAR */}
      <div className="w-full bg-[#12100f] border-b border-white/5 px-4 py-1.5 flex items-center gap-4 text-[10px] font-mono shrink-0 overflow-x-auto text-neutral-400 select-none scrollbar-none">
        <span className="font-semibold text-neutral-500 uppercase tracking-wider shrink-0">Jump To Section:</span>
        {projectsData.map((project) => (
          <button
            key={project.id}
            onClick={() => navigateToProject(project.id)}
            className={`hover:text-amber-400 cursor-pointer transition-colors shrink-0 flex items-center gap-1.5 py-0.5 px-2 rounded-md ${
              activeProject.id === project.id 
                ? "text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 animate-pulse" 
                : "hover:bg-white/5"
            }`}
          >
            <Globe className="w-2.5 h-2.5 text-neutral-500" />
            <span>{project.title}</span>
          </button>
        ))}
      </div>

      {/* MAIN RENDER FRAME PANEL (ALL PROJECTS LINKED ON A SINGLE PAGE) */}
      <div 
        id="safari-scroll-container" 
        className="flex-1 overflow-y-auto bg-[#1a1716] p-4 sm:p-8 select-text scroll-smooth"
      >
        <div className="max-w-3xl mx-auto flex flex-col gap-12 pb-24">
          
          {/* Welcome / Document Title Header */}
          <div className="text-center py-8 border-b border-white/5 select-none max-w-xl mx-auto">
            <h1 className="text-2xl sm:text-4xl font-display font-semibold text-white tracking-tight">
              Featured Case Studies
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed tracking-wide">
              Welcome to the digital archive. Review live portfolios, AI utilities, and interactive web tools. Click on any section or bookmark above to jump.
            </p>
          </div>

          {/* Render All Projects in Vertical Stack */}
          {projectsData.map((project) => {
            const activeImage = selectedScreenshots[project.id] || project.imageUrl;
            const screenshots = project.screenshots || [];
            const activeImageIndex = screenshots.indexOf(activeImage);
            const currentImgIndex = activeImageIndex !== -1 ? activeImageIndex : 0;

            return (
              <div 
                key={project.id}
                id={`safari-project-${project.id}`}
                className="bg-[#12100f] rounded-2xl border border-white/10 overflow-hidden shadow-2xl transition-all hover:border-white/20 scroll-mt-6 flex flex-col"
              >
                {/* Landing Image banner */}
                <div 
                  onClick={() => {
                    setLightboxProject(project);
                    setLightboxIndex(currentImgIndex);
                  }}
                  className="group relative w-full h-48 sm:h-64 overflow-hidden bg-neutral-900 border-b border-white/10 cursor-zoom-in select-none"
                  title="Click to view full screenshot"
                >
                  <img
                    src={activeImage}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity group-hover:opacity-90" />
                  
                  {/* Zoom Hover Overlay Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30">
                    <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-white text-xs font-semibold flex items-center gap-2 shadow-lg">
                      <ZoomIn className="w-4 h-4 text-amber-400 animate-pulse" />
                      <span>Click to view full screenshot</span>
                    </div>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
                    <span className="text-[10px] font-mono bg-white/10 border border-white/10 px-2.5 py-1 rounded-full uppercase tracking-widest text-neutral-300 font-semibold mb-2 inline-block">
                      {project.role}
                    </span>
                    <h2 className="text-xl sm:text-3xl font-display font-semibold text-white tracking-tight">
                      {project.title}
                    </h2>
                  </div>
                </div>

                {/* Project Body details */}
                <div className="p-6 sm:p-8 flex flex-col gap-6">
                  {/* Tagline */}
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed tracking-wide font-medium italic border-l-2 border-amber-500 pl-4 bg-white/[0.01] py-1">
                    "{project.tagline}"
                  </p>

                  {/* Description */}
                  <div className="flex flex-col gap-2">
                    <h4 className="text-[10px] font-mono tracking-widest uppercase font-bold text-neutral-400">Project Overview</h4>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed tracking-wide">
                      {project.description}
                    </p>
                  </div>

                  {/* Key Accomplishments Checklist */}
                  <div className="flex flex-col gap-3">
                    <h4 className="text-[10px] font-mono tracking-widest uppercase font-bold text-neutral-400">Accomplishments & Features</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {project.features.map((f, i) => (
                        <div key={i} className="flex items-start gap-2.5 bg-white/5 border border-white/5 p-3 rounded-xl">
                          <span className="text-amber-400 font-bold shrink-0">✓</span>
                          <span className="text-[11px] text-neutral-300 leading-normal">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies Grid */}
                  <div className="flex flex-col gap-3.5">
                    <h4 className="text-[10px] font-mono tracking-widest uppercase font-bold text-neutral-400">Technology Stack</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono bg-[#1c1917] border border-white/5 text-neutral-200 px-2.5 py-1 rounded-lg"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Screenshots Gallery (1-click active state + Lightbox trigger) */}
                  {screenshots.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <h4 className="text-[10px] font-mono tracking-widest uppercase font-bold text-neutral-400">Project screenshots</h4>
                      <div className="flex items-center gap-3 overflow-x-auto pb-1.5 scrollbar-thin select-none">
                        {screenshots.map((imgUrl, idx) => {
                          const isSelected = activeImage === imgUrl;
                          return (
                            <div key={idx} className="relative shrink-0">
                              <button
                                onClick={() => {
                                  setSelectedScreenshots(prev => ({ ...prev, [project.id]: imgUrl }));
                                  setLightboxProject(project);
                                  setLightboxIndex(idx);
                                }}
                                className={`relative h-14 sm:h-16 active:scale-95 aspect-video rounded-xl overflow-hidden border transition-all cursor-pointer block ${
                                  isSelected
                                    ? "border-amber-500 scale-95 shadow-md shadow-amber-500/10"
                                    : "border-white/10 hover:border-white/30"
                                }`}
                                title="Click to view full screenshot"
                              >
                                <img
                                  src={imgUrl}
                                  alt={`Screenshot ${idx + 1}`}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover"
                                />
                              </button>
                              {isSelected && (
                                <button
                                  onClick={() => {
                                    setLightboxProject(project);
                                    setLightboxIndex(idx);
                                  }}
                                  className="absolute -top-1.5 -right-1.5 p-1 bg-amber-500 hover:bg-amber-400 text-black rounded-full shadow-lg cursor-pointer transition-transform hover:scale-110 active:scale-95"
                                  title="View Full Screenshot"
                                >
                                  <ZoomIn className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* External Links */}
                  <div className="flex items-center justify-center sm:justify-end gap-3 border-t border-white/5 pt-6 mt-2">
                    {project.liveUrl && (
                      <button
                        onClick={() => handleLinkClick(project.title, project.liveUrl!)}
                        className="flex items-center gap-1.5 bg-neutral-100 hover:bg-white text-black px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-colors cursor-pointer shadow-md"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Launch Live App</span>
                        <span className="sm:hidden">Launch Live</span>
                      </button>
                    )}

                    {project.githubUrl && (
                      <button
                        onClick={() => handleLinkClick(`${project.title} Repo`, project.githubUrl!)}
                        className="flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-white border border-white/10 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-colors cursor-pointer shadow-md"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">View Repository</span>
                        <span className="sm:hidden">Repository</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* IMMERSIVE FULLSCREEN LIGHTBOX OVERLAY */}
      {lightboxProject !== null && (
        <div 
          className="absolute inset-0 bg-black/95 backdrop-blur-md z-50 flex flex-col justify-between p-4 select-none animate-in fade-in duration-200"
          onClick={() => setLightboxProject(null)}
        >
          {/* Top Bar Controls */}
          <div className="w-full flex items-center justify-between text-neutral-400 text-xs py-2 px-4 bg-gradient-to-b from-black/60 to-transparent">
            <span className="font-mono text-[11px] tracking-widest text-neutral-300 uppercase">
              {lightboxProject.title} • SCREENSHOT {lightboxIndex + 1} OF {(lightboxProject.screenshots || []).length}
            </span>
            <button
              onClick={() => setLightboxProject(null)}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white text-neutral-300 cursor-pointer transition-colors flex items-center gap-1.5"
              title="Close (Esc)"
            >
              <span className="text-[10px] uppercase font-mono font-bold">Close</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Main Screenshot Viewport */}
          <div className="flex-1 w-full flex items-center justify-center relative px-2 sm:px-14">
            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const count = (lightboxProject.screenshots || []).length;
                setLightboxIndex((prev) => (prev - 1 + count) % count);
              }}
              className="absolute left-2 sm:left-4 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white cursor-pointer border border-white/5 transition-all hover:scale-105 active:scale-95 z-10"
              title="Previous Screenshot (Left Arrow)"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Active Image */}
            <div className="relative max-w-full max-h-[70vh] sm:max-h-[76vh] flex items-center justify-center">
              <img
                src={(lightboxProject.screenshots || [])[lightboxIndex]}
                alt={`Full size screenshot ${lightboxIndex + 1}`}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[70vh] sm:max-h-[76vh] object-contain rounded-xl shadow-2xl border border-white/10 pointer-events-auto cursor-zoom-out transition-transform"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxProject(null);
                }}
              />
            </div>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const count = (lightboxProject.screenshots || []).length;
                setLightboxIndex((prev) => (prev + 1) % count);
              }}
              className="absolute right-2 sm:right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white cursor-pointer border border-white/5 transition-all hover:scale-105 active:scale-95 z-10"
              title="Next Screenshot (Right Arrow)"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Bottom Project Metadata Bar */}
          <div className="w-full text-center py-4 px-4 bg-gradient-to-t from-black/60 to-transparent flex flex-col gap-1 items-center">
            <span className="text-white text-xs sm:text-sm font-bold tracking-wide uppercase font-mono">
              {lightboxProject.title}
            </span>
            <p className="text-neutral-400 text-[11px] italic max-w-lg mx-auto line-clamp-1">
              {lightboxProject.tagline}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
