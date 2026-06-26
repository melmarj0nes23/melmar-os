import { useState, useEffect } from "react";
import { useOS } from "../../context/OSContext";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import Window from "./Window";
import SpotlightSearch from "./SpotlightSearch";
import NotificationCenter from "./NotificationCenter";

// Lazy Apps
import FinderApp from "../apps/FinderApp";
import VSCodeApp from "../apps/VSCodeApp";
import TerminalApp from "../apps/TerminalApp";
import SafariApp from "../apps/SafariApp";
import MailApp from "../apps/MailApp";
import GalleryApp from "../apps/GalleryApp";
import SettingsApp from "../apps/SettingsApp";
import PDFApp from "../apps/PDFApp";
import MessagesApp from "../apps/MessagesApp";

import { Folder, Globe, Terminal, FileCode, Mail, Image as GalleryIcon, Sliders, Battery, Wifi, Star, FileText, Calendar, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Desktop() {
  const { windows, openApp, settings, activeWindowId, closeApp } = useOS();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileTime, setMobileTime] = useState("");

  // States for desktop background widgets
  const [stickyNote, setStickyNote] = useState(() => {
    return localStorage.getItem("desktop_sticky_note") || "💡 Tap here to write a quick note on your desktop!\n\n- Streamlined Dock & Desktop layouts.\n- Built real-time interactive widgets.\n- Double click Resume.pdf to view!";
  });

  const [cpuLoad, setCpuLoad] = useState(14);
  const [ramUsage, setRamUsage] = useState(4.2);

  // Sync sticky note to localStorage
  useEffect(() => {
    localStorage.setItem("desktop_sticky_note", stickyNote);
  }, [stickyNote]);

  // Simulating small background fluctuations for System Resources widget
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuLoad(Math.floor(10 + Math.random() * 20));
      setRamUsage(parseFloat((4.1 + Math.random() * 0.3).toFixed(1)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Streamlined desktop shortcuts to eliminate app redundancy (as they're already in the Dock)
  const webShortcuts = [
    { id: "pdf", label: "Resume.pdf", icon: FileText, colorClass: "bg-red-600 text-white animate-pulse shadow-md" },
    { id: "safari", label: "Projects", icon: Globe, colorClass: "bg-sky-400 text-white" },
    { id: "terminal", label: "Terminal.sh", icon: Terminal, colorClass: "bg-zinc-800 text-neutral-200 border border-neutral-700" },
    { id: "messages", label: "Messages", icon: MessageSquare, colorClass: "bg-rose-500 text-white hover:animate-pulse shadow-lg shadow-rose-950/40" },
  ];

  // Generate days for a mini-calendar widget
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonthName = today.toLocaleString("default", { month: "long" });
  const currentYear = today.getFullYear();

  const yearForCal = today.getFullYear();
  const monthForCal = today.getMonth();
  const firstDayIndex = new Date(yearForCal, monthForCal, 1).getDay();
  const totalDays = new Date(yearForCal, monthForCal + 1, 0).getDate();

  const calendarCells = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push(null);
  }
  for (let dNum = 1; dNum <= totalDays; dNum++) {
    calendarCells.push(dNum);
  }

  const handleShortcutClick = (id: string) => {
    openApp(id);
  };

  // Resize listener to toggle mobile/desktop mode seamlessly
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Time update for mobile status bar
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setMobileTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const wallpapers = [
    "bg-gradient-to-tr from-purple-950 via-slate-950 to-indigo-950", // Cosmic Slate
    "bg-gradient-to-tr from-amber-950 via-rose-950 to-slate-950",  // Sunset Silk
    "bg-gradient-to-tr from-emerald-950 via-zinc-950 to-stone-950",  // Forest Fog
    "bg-gradient-to-tr from-slate-950 via-neutral-900 to-black",     // Minimal Slate
    "bg-gradient-to-tr from-orange-950 via-pink-950 to-indigo-950"   // Sunrise Glow
  ];

  const currentWallpaperClass = wallpapers[settings.wallpaperIndex] || wallpapers[0];

  // Helper to render active app body inside window
  const renderAppContent = (id: string) => {
    switch (id) {
      case "finder":
        return <FinderApp />;
      case "vscode":
        return <VSCodeApp />;
      case "terminal":
        return <TerminalApp />;
      case "safari":
        return <SafariApp />;
      case "mail":
        return <MailApp />;
      case "gallery":
        return <GalleryApp />;
      case "settings":
        return <SettingsApp />;
      case "pdf":
        return <PDFApp />;
      case "messages":
        return <MessagesApp />;
      default:
        return null;
    }
  };

  // DESKTOP GRID SHORTCUT ICONS DEFINITION
  const shortcuts = [
    { id: "finder", label: "Finder", icon: Folder, colorClass: "bg-blue-500 text-white" },
    { id: "vscode", label: "VS Code", icon: FileCode, colorClass: "bg-blue-600 text-white" },
    { id: "terminal", label: "Terminal", icon: Terminal, colorClass: "bg-zinc-800 text-neutral-200 border border-neutral-700" },
    { id: "safari", label: "Safari", icon: Globe, colorClass: "bg-sky-400 text-white" },
    { id: "messages", label: "Messages", icon: MessageSquare, colorClass: "bg-rose-500 text-white hover:animate-pulse shadow-lg shadow-rose-950/40" },
    { id: "mail", label: "Mail", icon: Mail, colorClass: "bg-emerald-500 text-white" },
    { id: "gallery", label: "Gallery", icon: GalleryIcon, colorClass: "bg-rose-500 text-white" },
    { id: "settings", label: "Settings", icon: Sliders, colorClass: "bg-slate-500 text-white" },
    { id: "pdf", label: "Resume.pdf", icon: FileText, colorClass: "bg-red-600 text-white animate-pulse shadow-md" },
  ];

  // --- MOBILE IOS INTERFACE MODE ---
  if (isMobile) {
    // Check if any app window is currently marked as open to display fullscreen
    // We prioritize the active window ID, falling back to the open app with the highest zIndex.
    // This fixes the issue on mobile where Finder (first in the array) blocks other opened apps.
    const openMobileApp = windows.find((w) => w.id === activeWindowId && w.isOpen && !w.isMinimized)
      || [...windows].sort((a, b) => b.zIndex - a.zIndex).find((w) => w.isOpen && !w.isMinimized);

    return (
      <div id="mobile-os-container" className={`w-full h-full relative overflow-hidden flex flex-col justify-between p-4 ${currentWallpaperClass} select-none`}>

        {/* FULLSCREEN ACTIVE APPLICATION WRAPPER */}
        <AnimatePresence>
          {openMobileApp && (
            <motion.div
              id={`mobile-fullscreen-app-${openMobileApp.id}`}
              className="fixed inset-0 bg-[#0c0a09] z-[1000] flex flex-col overflow-hidden"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
            >
              {/* Mobile app header with close trigger */}
              <div className="w-full h-12 bg-neutral-900 border-b border-white/5 px-4 flex items-center justify-between shrink-0 select-none">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-200">
                  {openMobileApp.title}
                </span>
                <button
                  onClick={() => closeApp(openMobileApp.id)}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-bold text-white cursor-pointer"
                >
                  Close
                </button>
              </div>

              {/* Fullscreen body */}
              <div className="flex-1 min-h-0 select-text bg-black">
                {renderAppContent(openMobileApp.id)}
              </div>

              {/* iOS Bottom Swipe/Sweep Line bar handle to close */}
              <div
                className="w-full h-7 bg-neutral-900 flex items-center justify-center cursor-pointer shrink-0"
                onClick={() => closeApp(openMobileApp.id)}
              >
                <div className="w-32 h-1 bg-white/35 rounded-full hover:bg-white/50 transition-colors" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* WIDGETS DASHBOARD (Top Row on mobile screen) */}
        <div id="mobile-widgets-tray" className="grid grid-cols-2 gap-3.5 mt-2 shrink-0">
          {/* Time & Date Widget */}
          <div className="bg-black/35 backdrop-blur-xl border border-white/10 p-3 rounded-2xl flex flex-col justify-between h-24">
            <span className="text-[9px] font-mono font-bold tracking-widest text-neutral-500 uppercase">CLOCK</span>
            <div>
              <p className="text-xl font-bold text-white leading-tight font-mono">
                {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
              <p className="text-[10px] text-neutral-400 mt-0.5">
                {new Date().toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" })}
              </p>
            </div>
          </div>

          {/* Quick Bio Card Widget */}
          <div className="bg-black/35 backdrop-blur-xl border border-white/10 p-3 rounded-2xl flex flex-col justify-between h-24">
            <span className="text-[9px] font-mono font-bold tracking-widest text-neutral-500 uppercase flex items-center gap-1">
              <Star className="w-2.5 h-2.5 text-yellow-400" /> BIO WIDGET
            </span>
            <p className="text-[10px] text-neutral-300 leading-normal line-clamp-3">
              Crafting type-safe web dashboards, visual canvas animations, and server pipelines.
            </p>
          </div>

          {/* Live Calendar Widget */}
          <div className="col-span-2 bg-black/35 backdrop-blur-xl border border-white/10 p-3.5 rounded-2xl flex flex-col">
            <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
              <span className="text-[9px] font-mono font-bold tracking-widest text-neutral-400 uppercase flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-rose-400" /> CALENDAR
              </span>
              <span className="text-xs font-bold text-rose-400">{currentMonthName} {currentYear}</span>
            </div>
            
            <div className="grid grid-cols-7 gap-y-1 text-center text-[10px]">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <span key={d} className="text-neutral-500 font-bold font-mono uppercase text-[9px]">{d}</span>
              ))}
              {calendarCells.map((day, idx) => {
                const isToday = day === currentDay;
                return (
                  <div key={idx} className="flex items-center justify-center h-4.5 w-4.5 mx-auto">
                    {day ? (
                      <span 
                        className={`text-[10px] font-semibold rounded-full w-4.5 h-4.5 flex items-center justify-center ${
                          isToday 
                            ? "bg-rose-500 text-white font-extrabold shadow-md shadow-rose-500/30" 
                            : "text-neutral-200 hover:bg-white/5 cursor-default"
                        }`}
                      >
                        {day}
                      </span>
                    ) : (
                      <span />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* HOME SCREEN APPLICATION GRID SHORTCUTS */}
        <div id="mobile-app-grid" className="flex-1 grid grid-cols-4 gap-x-2 gap-y-5 py-6 content-start mt-4">
          {shortcuts.map((sc) => (
            <div
              key={sc.id}
              onClick={() => handleShortcutClick(sc.id)}
              className="flex flex-col items-center gap-1.5 cursor-pointer active:scale-95 transition-transform"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg relative ${sc.colorClass}`}>
                <sc.icon className="w-6 h-6" />
                {sc.id === "messages" && (
                  <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-[9px] font-bold text-white rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center animate-bounce shadow-md border border-[#0c0a09] z-10">
                    1
                  </span>
                )}
              </div>
              <span className="text-[10px] font-semibold text-neutral-200 select-none tracking-wide text-center truncate max-w-[80px]">
                {sc.label}
              </span>
            </div>
          ))}
        </div>

        {/* iOS DOCK FOOTER BAR */}
        <div id="mobile-ios-dock" className="w-full bg-black/30 backdrop-blur-xl border border-white/10 p-3 rounded-3xl shadow-xl flex items-center justify-around mt-auto shrink-0 mb-3">
          {shortcuts.slice(0, 4).map((sc) => (
            <div
              key={sc.id}
              onClick={() => handleShortcutClick(sc.id)}
              className="w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer active:scale-90 transition-transform bg-white/5 border border-white/5"
            >
              <sc.icon className="w-5.5 h-5.5 text-neutral-200" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- STANDARD DESKTOP OS INTERFACE MODE ---
  return (
    <div
      id="desktop-os-wrapper"
      className={`w-full h-full relative overflow-hidden select-none ${currentWallpaperClass}`}
    >
      {/* 1. Menu Bar fixed at top */}
      <MenuBar />

      {/* 2. Desktop Area Grid with clean, non-redundant shortcuts */}
      <div
        id="desktop-area-grid"
        className="absolute top-14 p-6 desktop-grid transition-all duration-300 z-[1]"
        style={{
          pointerEvents: "auto",
          left: settings.dockPosition === "left" ? "92px" : "16px",
          width: settings.dockPosition === "left" || settings.dockPosition === "right" ? "calc(100% - 92px)" : "100%",
          height: settings.dockPosition === "bottom" ? "calc(100vh - 2.5rem - 92px)" : "calc(100vh - 2.5rem)",
        }}
      >
        {webShortcuts.map((sc) => {
          const isAppRunning = windows.find((w) => w.id === sc.id)?.isOpen;
          return (
            <div
              key={sc.id}
              id={`desktop-icon-${sc.id}`}
              className="flex flex-col items-center justify-center gap-1 cursor-pointer select-none py-1 group/icon hover:bg-white/5 rounded-xl border border-transparent hover:border-white/5 transition-all text-center h-[85px] w-[85px]"
              onDoubleClick={() => handleShortcutClick(sc.id)}
              onClick={() => {
                handleShortcutClick(sc.id);
              }}
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover/icon:scale-105 relative ${sc.colorClass}`}
              >
                <sc.icon className="w-5.5 h-5.5" />
                {sc.id === "messages" && (
                  <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-[9px] font-bold text-white rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center animate-bounce shadow-md border border-black/50 z-10">
                    1
                  </span>
                )}
              </div>
              <span className="text-[10px] sm:text-[11px] font-medium tracking-wide text-neutral-200 select-none px-1 text-center truncate max-w-full font-sans shadow-black drop-shadow-md">
                {sc.label}
              </span>
              
              {/* Tiny indicator dot showing application run log state */}
              {isAppRunning && (
                <span className="w-1 h-1 bg-emerald-400 rounded-full mt-0.5 shadow-[0_0_2px_emerald]" />
              )}
            </div>
          );
        })}
      </div>

      {/* 2b. Elegant Desktop Widgets (Visible only on lg screens to avoid crowding mobile/tablet layouts) */}
      <div
        id="desktop-widgets-sidebar"
        className={`absolute top-16 bottom-24 w-80 hidden lg:flex flex-col gap-5 pointer-events-auto z-[1] transition-all duration-300 ${
          settings.dockPosition === "right" ? "right-[92px]" : "right-6"
        }`}
      >
        {/* Widget 1: Interactive Sticky Notes */}
        <div className="bg-yellow-100/90 backdrop-blur-md text-neutral-800 p-4 rounded-2xl shadow-xl flex flex-col h-[180px] border border-yellow-200/50 group relative">
          <div className="flex items-center justify-between border-b border-yellow-300/40 pb-2 mb-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-amber-800 uppercase flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" /> STICKY NOTE
            </span>
            <span className="text-[9px] font-mono text-amber-700/80">Auto-saved</span>
          </div>
          <textarea
            value={stickyNote}
            onChange={(e) => setStickyNote(e.target.value)}
            className="flex-1 w-full bg-transparent resize-none outline-none text-xs font-semibold leading-relaxed text-amber-950 focus:ring-0 placeholder-amber-700/50"
            placeholder="Type anything..."
          />
        </div>

        {/* Widget 2: Live Weather */}
        <div className="bg-[#1c1917]/45 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl flex flex-col justify-between h-[110px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-sky-400" /> WEATHER
            </span>
            <span className="text-xs font-semibold text-neutral-200">Philippines</span>
          </div>
          <div className="flex items-end justify-between mt-2">
            <div>
              <p className="text-3xl font-extrabold text-white leading-none font-display">86°F</p>
              <p className="text-[11px] text-neutral-400 mt-1">Humid & Warm • H: 92° L: 78°</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xl">⛅</span>
              <span className="text-[10px] font-medium text-emerald-400">AQI: 35 (Good)</span>
            </div>
          </div>
        </div>

        {/* Widget 2b: Live Calendar */}
        <div className="bg-[#1c1917]/45 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl flex flex-col h-[200px] justify-between">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-rose-400" /> CALENDAR
            </span>
            <span className="text-xs font-bold text-rose-400">{currentMonthName} {currentYear}</span>
          </div>
          
          <div className="grid grid-cols-7 gap-y-1 text-center text-[10px] mt-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <span key={d} className="text-neutral-500 font-bold font-mono uppercase">{d}</span>
            ))}
            {calendarCells.map((day, idx) => {
              const isToday = day === currentDay;
              return (
                <div key={idx} className="flex items-center justify-center h-5 w-5 mx-auto">
                  {day ? (
                    <span 
                      className={`text-[11px] font-medium rounded-full w-5 h-5 flex items-center justify-center ${
                        isToday 
                          ? "bg-rose-500 text-white font-extrabold shadow-md shadow-rose-500/30" 
                          : "text-neutral-200 hover:bg-white/5 cursor-default"
                      }`}
                    >
                      {day}
                    </span>
                  ) : (
                    <span />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Widget 3: Live System Stats */}
        <div className="bg-[#1c1917]/45 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl flex flex-col justify-between h-[150px]">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-purple-400" /> SYSTEM RESOURCES
            </span>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" /> Live
            </span>
          </div>
          
          <div className="flex flex-col gap-3 mt-2">
            {/* CPU */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[10px] font-mono text-neutral-300">
                <span>CPU Load</span>
                <span>{cpuLoad}%</span>
              </div>
              <div className="w-full bg-neutral-800/60 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-sky-400 h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${cpuLoad}%` }} 
                />
              </div>
            </div>

            {/* RAM */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[10px] font-mono text-neutral-300">
                <span>Memory Usage</span>
                <span>{ramUsage} GB / 8 GB</span>
              </div>
              <div className="w-full bg-neutral-800/60 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-purple-400 h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${(ramUsage / 8) * 100}%` }} 
                />
              </div>
            </div>

            {/* Network */}
            <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 mt-1">
              <span className="flex items-center gap-1">
                <Wifi className="w-3.5 h-3.5 text-sky-400" /> Network Status
              </span>
              <span className="text-neutral-200">120 Mbps (Stable)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Render Windows manager stack */}
      <div id="desktop-windows-container" className="absolute top-10 left-0 w-full h-[calc(100vh-2.5rem)] pointer-events-none z-10">
        <AnimatePresence>
          {windows
            .filter((w) => w.isOpen)
            .map((win) => (
              <div key={win.id} className="pointer-events-auto">
                <Window windowState={win}>
                  {renderAppContent(win.id)}
                </Window>
              </div>
            ))}
        </AnimatePresence>
      </div>

      {/* 4. Menu Spotlight search bar */}
      <SpotlightSearch />

      {/* 5. System notification sliders */}
      <NotificationCenter />

      {/* 6. Dynamic dock launchers tray */}
      <Dock />
    </div>
  );
}
