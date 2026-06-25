import { useState, useEffect } from "react";
import { useOS } from "../../context/OSContext";
import { motion, AnimatePresence } from "motion/react";
import { Wifi, Battery, Search, Terminal as LogoIcon, Volume2, Globe, Sparkles } from "lucide-react";

export default function MenuBar() {
  const { activeWindowId, toggleSpotlight, openApp, setBooted, addNotification } = useOS();
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Time and Date updates
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
      setDate(
        now.toLocaleDateString([], {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Determine active app text & menu options
  const getAppMeta = () => {
    switch (activeWindowId) {
      case "finder":
        return { name: "Finder", options: ["File", "Edit", "View", "Go", "Window", "Help"] };
      case "vscode":
        return { name: "VS Code", options: ["File", "Edit", "Selection", "View", "Run", "Terminal", "Help"] };
      case "terminal":
        return { name: "Terminal", options: ["Shell", "Edit", "View", "Window", "Help"] };
      case "safari":
        return { name: "Safari", options: ["File", "Edit", "View", "History", "Bookmarks", "Window", "Help"] };
      case "mail":
        return { name: "Mail", options: ["Mail", "File", "Edit", "View", "Message", "Window", "Help"] };
      case "gallery":
        return { name: "Gallery", options: ["Gallery", "File", "Edit", "View", "Slideshow", "Help"] };
      case "settings":
        return { name: "Settings", options: ["Settings", "Edit", "Wallpaper", "Reset", "Help"] };
      default:
        return { name: "PortfolioOS", options: ["File", "Preferences", "View", "Help"] };
    }
  };

  const meta = getAppMeta();

  // Clear menus on clicking outside
  useEffect(() => {
    if (!activeMenu) return;
    const handleOutsideClick = () => setActiveMenu(null);
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [activeMenu]);

  // Handle system menu clicks
  const handleSystemMenuAction = (action: string) => {
    setActiveMenu(null);
    if (action === "about") {
      addNotification("Melmar Jones Velasco's PortfolioOS - v1.0.0 is running perfectly.");
    } else if (action === "restart") {
      setBooted(false); // Triggers re-booting progress
    } else if (action === "settings") {
      openApp("settings");
    } else if (action === "finder") {
      openApp("finder");
    }
  };

  return (
    <div
      id="menu-bar"
      className="w-full h-10 bg-black/35 backdrop-blur-md border-b border-white/5 text-white flex items-center justify-between px-4 fixed top-0 left-0 z-[999] text-xs font-sans select-none"
    >
      {/* Left Menu Segment */}
      <div className="flex items-center gap-4">
        {/* Apple/PortfolioOS Main System Menu */}
        <div className="relative">
          <button
            className="flex items-center gap-1.5 font-bold hover:bg-white/10 px-2 py-1 rounded transition-colors cursor-pointer"
            onClick={() => setActiveMenu(activeMenu === "system" ? null : "system")}
          >
            <LogoIcon className="w-3.5 h-3.5 text-neutral-200" />
          </button>
          
          <AnimatePresence>
            {activeMenu === "system" && (
              <motion.div
                className="absolute left-0 mt-1 w-52 bg-[#1c1917]/95 border border-white/10 rounded-xl shadow-2xl p-1 backdrop-blur-2xl text-neutral-300 flex flex-col gap-0.5 z-[1000]"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.15 }}
              >
                <button
                  className="w-full text-left px-3 py-1.5 hover:bg-white/10 hover:text-white rounded-lg flex items-center justify-between cursor-pointer"
                  onClick={() => handleSystemMenuAction("about")}
                >
                  <span>About PortfolioOS</span>
                  <LogoIcon className="w-3 h-3 opacity-50" />
                </button>
                <button
                  className="w-full text-left px-3 py-1.5 hover:bg-white/10 hover:text-white rounded-lg flex items-center justify-between cursor-pointer"
                  onClick={() => handleSystemMenuAction("settings")}
                >
                  <span>System Settings...</span>
                  <Sparkles className="w-3 h-3 text-amber-400" />
                </button>
                <div className="h-[1px] bg-white/10 my-1 mx-2" />
                <button
                  className="w-full text-left px-3 py-1.5 hover:bg-white/10 hover:text-white rounded-lg flex items-center justify-between cursor-pointer"
                  onClick={() => handleSystemMenuAction("finder")}
                >
                  <span>Browse Directory</span>
                </button>
                <div className="h-[1px] bg-white/10 my-1 mx-2" />
                <button
                  className="w-full text-left px-3 py-1.5 hover:bg-red-500/20 hover:text-red-400 rounded-lg flex items-center justify-between cursor-pointer"
                  onClick={() => handleSystemMenuAction("restart")}
                >
                  <span className="font-semibold">Restart Kernel...</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Focused Application Indicator */}
        <span className="font-bold tracking-wide text-neutral-100 font-display">
          {meta.name}
        </span>

        {/* App-Specific Submenus */}
        <div className="hidden md:flex items-center gap-1 text-neutral-300">
          {meta.options.map((opt) => (
            <button
              key={opt}
              className="px-2 py-1 hover:bg-white/10 rounded transition-colors hover:text-white cursor-pointer"
              onClick={() => {
                addNotification(`Clicked Menu: ${meta.name} > ${opt}`);
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Right Menu Segment */}
      <div className="flex items-center gap-3.5 text-neutral-300">
        <div className="flex items-center gap-2.5 bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg">
          {/* Custom Network Info */}
          <div className="group relative flex items-center justify-center cursor-pointer">
            <Wifi className="w-3.5 h-3.5 text-neutral-300 hover:text-white" />
            <div className="pointer-events-none absolute right-0 top-6 scale-0 rounded bg-neutral-900 px-2.5 py-1 text-[10px] font-mono whitespace-nowrap border border-white/10 group-hover:scale-100 transition-all z-[9999] text-white">
              Wi-Fi: Port 3000 Ingress (Online)
            </div>
          </div>

          {/* Battery Tooltip */}
          <div className="group relative flex items-center justify-center cursor-pointer">
            <Battery className="w-3.5 h-3.5 text-emerald-400" />
            <div className="pointer-events-none absolute right-0 top-6 scale-0 rounded bg-neutral-900 px-2.5 py-1 text-[10px] font-mono whitespace-nowrap border border-white/10 group-hover:scale-100 transition-all z-[9999] text-white">
              Battery: 100% Charged (AC Power)
            </div>
          </div>

          <Volume2 className="w-3.5 h-3.5 text-neutral-300 hidden sm:block" />
          
          <Globe className="w-3.5 h-3.5 text-neutral-300 hidden sm:block" />
        </div>

        {/* Spotlight Trigger */}
        <button
          className="hover:bg-white/10 p-1.5 rounded transition-colors cursor-pointer"
          onClick={() => toggleSpotlight()}
          aria-label="Toggle search HUD"
        >
          <Search className="w-3.5 h-3.5 text-neutral-200" />
        </button>

        {/* Live Date and Time */}
        <div className="flex items-center gap-2 border-l border-white/15 pl-3.5 font-medium">
          <span className="hidden sm:inline font-mono tracking-wide text-[11px] text-neutral-400">
            {date}
          </span>
          <span className="font-mono tracking-wider font-semibold text-white">
            {time}
          </span>
        </div>
      </div>
    </div>
  );
}
