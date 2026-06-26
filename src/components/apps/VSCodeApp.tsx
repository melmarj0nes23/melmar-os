import React, { useState, useEffect } from "react";
import { useOS } from "../../context/OSContext";
import { FSNode } from "../../types";
import { virtualFileSystem, getFSNodeByPath } from "../../data/filesystem";
import { FolderCode, GitBranch, Puzzle, Search, Play, HelpCircle, FileJson, FileText, Settings } from "lucide-react";

export default function VSCodeApp() {
  const { addNotification } = useOS();
  const [activeFile, setActiveFile] = useState<FSNode>(() => {
    const savedPath = localStorage.getItem("vscode_selected_file");
    if (savedPath) {
      const matched = getFSNodeByPath(savedPath);
      if (matched && matched.type === "file") {
        return matched;
      }
    }
    return virtualFileSystem.find((f) => f.path === "/README.md") || virtualFileSystem[3];
  });
  const [activeSidebarTab, setActiveSidebarTab] = useState<"explorer" | "search" | "git" | "extensions">("explorer");
  const [openTabs, setOpenTabs] = useState<FSNode[]>(() => {
    const readme = virtualFileSystem.find((f) => f.path === "/README.md") || virtualFileSystem[3];
    if (activeFile.path !== readme.path) {
      return [readme, activeFile];
    }
    return [activeFile];
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Open by default on all screens so visitors can find files instantly

  // Sync external file load event (e.g. from Finder or Spotlight)
  useEffect(() => {
    const handleOpenFile = (e: Event) => {
      const filePath = (e as CustomEvent).detail;
      const matched = getFSNodeByPath(filePath);
      if (matched && matched.type === "file") {
        selectFile(matched);
      }
    };
    window.addEventListener("vscode_open_file", handleOpenFile);
    return () => window.removeEventListener("vscode_open_file", handleOpenFile);
  }, []);

  // Sync default sidebar state on mount depending on viewport size
  useEffect(() => {
    if (window.innerWidth >= 640) {
      setIsSidebarOpen(true);
    }
  }, []);

  const selectFile = (node: FSNode) => {
    setActiveFile(node);
    setOpenTabs((prev) => {
      if (!prev.some((t) => t.path === node.path)) {
        return [...prev, node];
      }
      return prev;
    });
    // Auto-close sidebar on mobile viewports for a focused view
    if (window.innerWidth < 640) {
      setIsSidebarOpen(false);
    }
  };

  const handleTabClick = (tab: "explorer" | "git" | "extensions") => {
    if (activeSidebarTab === tab) {
      setIsSidebarOpen((prev) => !prev);
    } else {
      setActiveSidebarTab(tab);
      setIsSidebarOpen(true);
    }
  };

  const handleCloseTab = (e: React.MouseEvent, node: FSNode) => {
    e.stopPropagation();
    const remaining = openTabs.filter((t) => t.path !== node.path);
    setOpenTabs(remaining);
    
    if (activeFile.path === node.path && remaining.length > 0) {
      setActiveFile(remaining[remaining.length - 1]);
    }
  };

  const handleSaveSimulatedFile = () => {
    addNotification(`Saved ${activeFile.name} changes safely inside VFS partition.`);
  };

  // Group files by directories
  const flatFiles = virtualFileSystem.filter((n) => n.type === "file");

  return (
    <div id="vscode-app-body" className="w-full h-full flex bg-[#1e1e1e] font-sans text-neutral-300 text-xs overflow-hidden select-none relative">
      {/* VS CODE LEFT MOST ACTIVITY BAR */}
      <div className="w-12 bg-[#333333]/20 border-r border-white/5 flex flex-col items-center justify-between py-4 shrink-0 select-none">
        <div className="flex flex-col items-center gap-5 w-full">
          {/* Explorer trigger */}
          <button
            onClick={() => handleTabClick("explorer")}
            className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
              activeSidebarTab === "explorer" && isSidebarOpen ? "text-sky-400 bg-white/5" : "text-neutral-500 hover:text-neutral-300"
            }`}
            title="Explorer"
          >
            <FolderCode className="w-5 h-5" />
          </button>
          
          {/* Git trigger */}
          <button
            onClick={() => handleTabClick("git")}
            className={`p-1.5 rounded-lg cursor-pointer transition-colors relative ${
              activeSidebarTab === "git" && isSidebarOpen ? "text-sky-400 bg-white/5" : "text-neutral-500 hover:text-neutral-300"
            }`}
            title="Git Version Control"
          >
            <GitBranch className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-sky-500 rounded-full" />
          </button>
          
          {/* Extensions trigger */}
          <button
            onClick={() => handleTabClick("extensions")}
            className={`p-1.5 rounded-lg cursor-pointer transition-colors ${
              activeSidebarTab === "extensions" && isSidebarOpen ? "text-sky-400 bg-white/5" : "text-neutral-500 hover:text-neutral-300"
            }`}
            title="Extensions Market"
          >
            <Puzzle className="w-5 h-5" />
          </button>
        </div>

        {/* Lower utilities */}
        <div className="flex flex-col items-center gap-4">
          <Settings className="w-4 h-4 text-neutral-500 hover:text-neutral-300 cursor-pointer" />
        </div>
      </div>

      {/* VS CODE SIDEBAR SUB PANEL */}
      <div className={`w-48 bg-[#1e1e1e] sm:bg-[#252526]/55 border-r border-white/5 flex flex-col shrink-0 overflow-y-auto select-none transition-all duration-150 ${
        isSidebarOpen ? "flex" : "hidden"
      } ${
        isSidebarOpen ? "absolute sm:relative z-20 left-12 top-0 bottom-0 h-full shadow-2xl sm:shadow-none" : ""
      }`}>
        {activeSidebarTab === "explorer" && (
          <div className="p-3.5 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono font-bold tracking-widest text-neutral-500 uppercase">Explorer: Workspace</span>
              {/* Close button for mobile viewports */}
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="sm:hidden text-neutral-500 hover:text-neutral-300 text-xs px-1 font-bold"
              >
                ×
              </button>
            </div>
            <div className="flex flex-col gap-1 mt-2 font-medium">
              <span className="text-[10px] text-neutral-400 font-bold uppercase select-none px-1">FILESYSTEM:</span>
              {flatFiles.map((f) => {
                const isActive = activeFile.path === f.path;
                return (
                  <button
                    key={f.path}
                    onClick={() => selectFile(f)}
                    className={`flex items-center gap-2 px-2 py-1.5 rounded text-[11px] w-full text-left transition-colors cursor-pointer ${
                      isActive ? "bg-white/5 text-sky-400 font-semibold" : "hover:bg-white/5 text-neutral-400"
                    }`}
                  >
                    {f.name.endsWith(".json") ? (
                      <FileJson className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    )}
                    <span className="truncate">{f.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {activeSidebarTab === "git" && (
          <div className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono font-bold tracking-widest text-neutral-500 uppercase">Source Control: Git</span>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="sm:hidden text-neutral-500 hover:text-neutral-300 text-xs px-1 font-bold"
              >
                ×
              </button>
            </div>
            <div className="flex flex-col gap-1.5 mt-2">
              <p className="text-[11px] text-neutral-400 font-semibold px-1">Changes Staged (1)</p>
              <div className="flex items-center justify-between px-2 py-1.5 bg-white/5 border border-white/5 rounded text-[10px] text-neutral-300">
                <span className="truncate">portfolio.config</span>
                <span className="text-[8px] font-mono font-bold text-sky-400 bg-sky-950 px-1 rounded">M</span>
              </div>
              <button
                onClick={() => addNotification("Pushed: Committed 1 configured telemetry item to master branch.")}
                className="w-full py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer mt-2"
              >
                Sync Commit
              </button>
            </div>
          </div>
        )}

        {activeSidebarTab === "extensions" && (
          <div className="p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono font-bold tracking-widest text-neutral-500 uppercase">Extensions</span>
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="sm:hidden text-neutral-500 hover:text-neutral-300 text-xs px-1 font-bold"
              >
                ×
              </button>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <div className="p-2.5 bg-white/5 rounded-xl border border-white/5 flex flex-col gap-1">
                <h5 className="font-semibold text-neutral-200">Gemini AI Assistant</h5>
                <p className="text-[9px] text-neutral-500 leading-normal">Brings LLM query execution directly inside the workspace command line.</p>
                <span className="text-[8px] font-mono text-emerald-400 mt-1 uppercase">✓ Installed v1.2</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* VS CODE RIGHT EDITOR INTERIOR */}
      <div 
        onClick={() => {
          if (window.innerWidth < 640 && isSidebarOpen) {
            setIsSidebarOpen(false);
          }
        }}
        className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e]"
      >
        {/* Editor tabs tray */}
        <div className="w-full h-9 bg-[#2d2d2d]/50 border-b border-white/5 flex items-center overflow-x-auto select-none shrink-0 scrollbar-none">
          {openTabs.map((tab) => {
            const isActive = activeFile.path === tab.path;
            return (
              <div
                key={tab.path}
                onClick={() => selectFile(tab)}
                className={`h-full px-3.5 flex items-center gap-2 border-r border-white/5 text-[11px] cursor-pointer shrink-0 transition-colors ${
                  isActive
                    ? "bg-[#1e1e1e] text-white border-t-2 border-sky-400 font-semibold"
                    : "bg-[#2d2d2d]/20 text-neutral-500 hover:bg-[#2d2d2d]/35"
                }`}
              >
                <span>{tab.name}</span>
                <button
                  onClick={(e) => handleCloseTab(e, tab)}
                  className="p-0.5 hover:bg-white/10 rounded text-neutral-500 hover:text-white"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>

        {/* Action utility bar beneath tabs */}
        <div className="w-full bg-[#1e1e1e] border-b border-white/5 px-4 py-1.5 flex items-center justify-between text-[10px] text-neutral-500 shrink-0 select-none">
          <div className="flex items-center gap-3">
            <span>Workspace: portfolio_root</span>
            <span>Path: {activeFile.path}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveSimulatedFile}
              className="text-neutral-400 hover:text-white px-2 py-0.5 bg-white/5 rounded border border-white/5 cursor-pointer"
            >
              Ctrl+S (Save)
            </button>
          </div>
        </div>

        {/* Main Code Editor pane */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden flex select-text">
          {/* Editor Content styled with line counts */}
          <div className="w-full min-h-full p-4 flex flex-col font-mono text-[11px] sm:text-xs leading-relaxed select-text overflow-x-hidden">
            {(activeFile.content || "").split("\n").map((line, i) => (
              <div key={i} className="flex items-start gap-4 hover:bg-white/[0.02] px-1 rounded group w-full min-w-0">
                <span className="text-neutral-600 select-none text-right w-8 shrink-0 font-mono">
                  {i + 1}
                </span>
                <code className={`flex-1 select-text whitespace-pre-wrap break-words font-mono min-w-0 ${
                  activeFile.name.endsWith(".json") ? "text-emerald-400" : "text-neutral-300"
                }`}>
                  {line || "\u00A0"}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Footer status line bar */}
        <div className="w-full h-5.5 bg-[#007acc] text-white px-4 flex items-center justify-between text-[10px] font-mono shrink-0 select-none">
          <div className="flex items-center gap-3.5">
            <span className="font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> Live Server
            </span>
            <span>UTF-8</span>
          </div>
          <div className="flex items-center gap-3">
            <span>TypeScript React</span>
            <span>Ln 1, Col 1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
