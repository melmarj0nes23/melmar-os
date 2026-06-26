import React, { useState, useEffect, useRef } from "react";
import { useOS } from "../../context/OSContext";
import { virtualFileSystem, projectsData } from "../../data/filesystem";
import { motion, AnimatePresence } from "motion/react";
import { Search, Terminal, FileCode, AppWindow, Sparkles } from "lucide-react";

interface SearchResult {
  id: string;
  title: string;
  category: "apps" | "files" | "projects" | "actions";
  description: string;
  icon: any;
  action: () => void;
}

export default function SpotlightSearch() {
  const { spotlightOpen, toggleSpotlight, openApp, focusApp } = useOS();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (spotlightOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [spotlightOpen]);

  // Handle outside click to close
  useEffect(() => {
    if (!spotlightOpen) return;
    const handleOutsideClick = (e: MouseEvent) => {
      const el = document.getElementById("spotlight-box");
      if (el && !el.contains(e.target as Node)) {
        toggleSpotlight(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [spotlightOpen, toggleSpotlight]);

  // Aggregate search targets
  const allResults: SearchResult[] = [
    // Applications
    { id: "app-finder", title: "Finder", category: "apps", description: "Navigate files, skills, and portfolio folders.", icon: AppWindow, action: () => openApp("finder") },
    { id: "app-vscode", title: "Visual Studio Code", category: "apps", description: "Read project source codes and markdown notes.", icon: FileCode, action: () => openApp("vscode") },
    { id: "app-terminal", title: "Terminal", category: "apps", description: "Interactive shell line console for advanced operators.", icon: Terminal, action: () => openApp("terminal") },
    { id: "app-safari", title: "Safari Browser", category: "apps", description: "Browse finished website case studies and bookmarks.", icon: AppWindow, action: () => openApp("safari") },
    { id: "app-mail", title: "Mail Client", category: "apps", description: "Compose messages or contact me directly.", icon: AppWindow, action: () => openApp("mail") },
    { id: "app-gallery", title: "Gallery App", category: "apps", description: "View pictures, awards, and certification certificates.", icon: AppWindow, action: () => openApp("gallery") },
    { id: "app-settings", title: "Settings Panel", category: "apps", description: "Alter system wallpapers, dark mode, and accents.", icon: AppWindow, action: () => openApp("settings") },
  ];

  // Add Files to search
  virtualFileSystem.forEach((node) => {
    allResults.push({
      id: `file-${node.path}`,
      title: node.name,
      category: "files",
      description: `VFS File // Location: ${node.path}`,
      icon: FileCode,
      action: () => {
        if (node.name.endsWith(".pdf")) {
          openApp("pdf");
        } else {
          openApp("vscode");
          // We'll focus the file inside VS Code using custom local storage or events
          localStorage.setItem("vscode_selected_file", node.path);
          window.dispatchEvent(new CustomEvent("vscode_open_file", { detail: node.path }));
        }
      },
    });
  });

  // Add Projects to search
  projectsData.forEach((project) => {
    allResults.push({
      id: `project-${project.id}`,
      title: project.title,
      category: "projects",
      description: `Project Case Study // ${project.tagline}`,
      icon: Sparkles,
      action: () => {
        openApp("safari");
        localStorage.setItem("safari_selected_project", project.id);
        window.dispatchEvent(new CustomEvent("safari_open_project", { detail: project.id }));
      },
    });
  });

  // Add hire actions
  allResults.push({
    id: "action-hire",
    title: "Hire Melmar Jones Velasco",
    category: "actions",
    description: "Launch direct contact mail compose window immediately.",
    icon: Sparkles,
    action: () => {
      openApp("mail");
    }
  });

  // Filter results based on search query
  const filteredResults = query.trim() === ""
    ? allResults.slice(0, 5) // Default listings
    : allResults.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );

  // Keyboard navigation inside search results
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredResults.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % filteredResults.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        filteredResults[selectedIndex].action();
        toggleSpotlight(false);
      }
    } else if (e.key === "Escape") {
      toggleSpotlight(false);
    }
  };

  return (
    <AnimatePresence>
      {spotlightOpen && (
        <div id="spotlight-overlay" className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-start justify-center z-[9999] pt-[15vh]">
          <motion.div
            id="spotlight-box"
            className="w-full max-w-xl bg-[#1c1917]/85 border border-white/10 rounded-2xl shadow-[0_24px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl overflow-hidden text-white"
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            onKeyDown={handleKeyDown}
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3.5 px-4 py-3.5 border-b border-white/5">
              <Search className="w-5 h-5 text-neutral-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                className="w-full bg-transparent outline-none border-none text-base placeholder-neutral-500 font-sans tracking-wide"
                placeholder="Search applications, files, projects, actions..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
              />
              <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-neutral-400">
                ESC
              </span>
            </div>

            {/* Results Pane */}
            {filteredResults.length > 0 ? (
              <div ref={resultsRef} className="max-h-[350px] overflow-y-auto p-1.5 flex flex-col gap-0.5">
                {filteredResults.map((item, index) => {
                  const IconComp = item.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg cursor-pointer transition-all ${
                        isSelected
                          ? "bg-white/10 border-l-[3px] border-white"
                          : "hover:bg-white/5 border-l-[3px] border-transparent"
                      }`}
                      onClick={() => {
                        item.action();
                        toggleSpotlight(false);
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div className={`p-1.5 rounded-lg shrink-0 ${isSelected ? "bg-white/15 text-white" : "bg-neutral-800 text-neutral-400"}`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-xs font-semibold tracking-wide text-neutral-200">
                            {item.title}
                          </span>
                          <span className="text-[9px] font-mono uppercase bg-neutral-800/60 px-1.5 py-0.5 rounded text-neutral-400">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-[10px] text-neutral-400 truncate tracking-wide">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-neutral-500">
                <Search className="w-8 h-8 mb-2 opacity-30" />
                <p className="text-sm font-mono tracking-wide">No system index records matching "{query}"</p>
              </div>
            )}
            
            {/* Search Footer */}
            <div className="px-4 py-2 bg-[#12100e] border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500">
              <span className="flex items-center gap-1.5">
                Use <span className="bg-neutral-800 px-1 py-0.5 rounded text-neutral-400">↑↓</span> to navigate, <span className="bg-neutral-800 px-1 py-0.5 rounded text-neutral-400">Enter</span> to open
              </span>
              <span>
                PortfolioOS v1.0.0
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
