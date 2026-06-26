import { useState, useEffect } from "react";
import { useOS } from "../../context/OSContext";
import { motion, AnimatePresence } from "motion/react";
import {
  Folder,
  Globe,
  Terminal,
  FileCode,
  Mail,
  Image as GalleryIcon,
  Sliders,
  FileText,
  Trash2,
  MessageSquare,
  Gamepad2
} from "lucide-react";

interface DockItem {
  id: string;
  label: string;
  icon: any;
  action: () => void;
  colorClass: string;
}

export default function Dock() {
  const { windows, openApp, settings, addNotification } = useOS();
  const [bouncingAppId, setBouncingAppId] = useState<string | null>(null);
  const [trashCount, setTrashCount] = useState(0);

  // Core list of Dock Launchers
  const dockItems: DockItem[] = [
    { id: "finder", label: "Finder", icon: Folder, colorClass: "bg-blue-500 text-white", action: () => handleLaunch("finder") },
    { id: "safari", label: "Safari Browser", icon: Globe, colorClass: "bg-sky-400 text-white", action: () => handleLaunch("safari") },
    { id: "vscode", label: "VS Code", icon: FileCode, colorClass: "bg-blue-600 text-white", action: () => handleLaunch("vscode") },
    { id: "terminal", label: "Terminal", icon: Terminal, colorClass: "bg-zinc-800 text-neutral-200 border border-neutral-700", action: () => handleLaunch("terminal") },
    { id: "messages", label: "Messages", icon: MessageSquare, colorClass: "bg-rose-500 text-white", action: () => handleLaunch("messages") },
    { id: "mail", label: "Mail", icon: Mail, colorClass: "bg-emerald-500 text-white", action: () => handleLaunch("mail") },
    { id: "gallery", label: "Gallery", icon: GalleryIcon, colorClass: "bg-rose-500 text-white", action: () => handleLaunch("gallery") },
    { id: "tetris", label: "Tetris", icon: Gamepad2, colorClass: "bg-purple-600 text-white", action: () => handleLaunch("tetris") },
    { id: "settings", label: "Settings", icon: Sliders, colorClass: "bg-slate-500 text-white", action: () => handleLaunch("settings") },
  ];

  const handleLaunch = (id: string) => {
    setBouncingAppId(id);
    openApp(id);
    
    // Bounces for 1.2s then clears
    setTimeout(() => {
      setBouncingAppId(null);
    }, 1200);
  };

  const isAppOpen = (id: string) => {
    const win = windows.find((w) => w.id === id);
    return win ? win.isOpen : false;
  };

  const handleTrashClick = () => {
    if (trashCount > 0) {
      setTrashCount(0);
      addNotification("Trash cleared! Satisfying paper crunch sounds completed.");
    } else {
      setTrashCount(4);
      addNotification("Trash has 4 system log fragments. Click again to purge safely.");
    }
  };

  // Determine dock position styles
  const getDockPositionStyles = () => {
    switch (settings.dockPosition) {
      case "left":
        return "left-3 top-1/2 -translate-y-1/2 flex-col";
      case "right":
        return "right-3 top-1/2 -translate-y-1/2 flex-col";
      default: // bottom
        return "bottom-3 left-1/2 -translate-x-1/2 flex-row";
    }
  };

  return (
    <div
      id="desktop-dock-wrapper"
      className={`fixed ${getDockPositionStyles()} z-[998] transition-all duration-300`}
    >
      <div
        id="desktop-dock-body"
        className={`flex ${
          settings.dockPosition === "bottom" ? "flex-row" : "flex-col"
        } items-center gap-2.5 p-2 bg-[#1c1917]/55 ${
          settings.glassEffect ? "backdrop-blur-xl" : ""
        } border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]`}
      >
        {dockItems.map((item) => {
          const IconComponent = item.icon;
          const open = isAppOpen(item.id);
          const bouncing = bouncingAppId === item.id;

          return (
            <div key={item.id} className="relative group flex flex-col items-center">
              {/* Tooltip */}
              <div
                className={`absolute pointer-events-none scale-0 group-hover:scale-100 bg-neutral-900 border border-white/10 text-white text-[10px] font-medium tracking-wide px-2.5 py-1 rounded-lg transition-all z-[999] shadow-lg whitespace-nowrap ${
                  settings.dockPosition === "left"
                    ? "left-14 top-1/2 -translate-y-1/2"
                    : settings.dockPosition === "right"
                    ? "right-14 top-1/2 -translate-y-1/2"
                    : "bottom-14 left-1/2 -translate-x-1/2"
                }`}
              >
                {item.label}
              </div>

              {/* Launcher Button */}
              <motion.button
                id={`dock-app-${item.id}`}
                className={`w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer relative shadow-md transition-all ${item.colorClass}`}
                onClick={item.action}
                aria-label={`Launch ${item.label}`}
                whileHover={settings.reducedMotion ? {} : { scale: 1.2, y: settings.dockPosition === "bottom" ? -6 : 0, x: settings.dockPosition === "left" ? 6 : settings.dockPosition === "right" ? -6 : 0 }}
                animate={
                  bouncing
                    ? {
                        y: [0, -15, 0, -8, 0],
                      }
                    : {}
                }
                transition={
                  bouncing
                    ? {
                        duration: 0.8,
                        ease: "easeInOut",
                        repeat: Infinity,
                      }
                    : {
                        type: "spring",
                        stiffness: 400,
                        damping: 18,
                      }
                }
              >
                <IconComponent className="w-5.5 h-5.5" />
                
                {/* Unread message badge to catch attention */}
                {item.id === "messages" && (
                  <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-[9px] font-bold text-white rounded-full h-4 min-w-[16px] px-1 flex items-center justify-center animate-bounce shadow-md border border-black/50 z-10">
                    1
                  </span>
                )}
                
                {/* Active application notification dot */}
                {open && (
                  <span
                    className={`absolute w-1.5 h-1.5 bg-neutral-100 rounded-full shadow-[0_0_4px_white] ${
                      settings.dockPosition === "left"
                        ? "right-1 top-1/2 -translate-y-1/2"
                        : settings.dockPosition === "right"
                        ? "left-1 top-1/2 -translate-y-1/2"
                        : "bottom-1 left-1/2 -translate-x-1/2"
                    }`}
                  />
                )}
              </motion.button>

              {/* Persistent App Name for Web/Desktop View */}
              <span className="hidden sm:block text-[9px] font-semibold text-neutral-300/90 tracking-wide mt-1 select-none text-center truncate max-w-[54px]">
                {item.id === "safari" ? "Safari" : item.label}
              </span>
            </div>
          );
        })}

        {/* Separator inside Dock */}
        <div
          className={`${
            settings.dockPosition === "bottom" ? "w-[1px] h-8 my-auto" : "w-8 h-[1px] mx-auto"
          } bg-white/10`}
        />

        {/* Custom Resume PDF Launcher */}
        <div className="relative group flex flex-col items-center">
          <div
            className={`absolute pointer-events-none scale-0 group-hover:scale-100 bg-neutral-900 border border-white/10 text-white text-[10px] font-medium tracking-wide px-2.5 py-1 rounded-lg transition-all z-[999] shadow-lg whitespace-nowrap ${
              settings.dockPosition === "left"
                ? "left-14 top-1/2 -translate-y-1/2"
                : settings.dockPosition === "right"
                ? "right-14 top-1/2 -translate-y-1/2"
                : "bottom-14 left-1/2 -translate-x-1/2"
            }`}
          >
            Open Resume (PDF)
          </div>

          <motion.button
            id="dock-resume-launcher"
            onClick={(e) => {
              e.preventDefault();
              handleLaunch("pdf");
            }}
            className="w-11 h-11 rounded-xl bg-red-600 text-white flex items-center justify-center cursor-pointer shadow-md relative"
            whileHover={settings.reducedMotion ? {} : { scale: 1.2, y: settings.dockPosition === "bottom" ? -6 : 0, x: settings.dockPosition === "left" ? 6 : settings.dockPosition === "right" ? -6 : 0 }}
            animate={
              bouncingAppId === "pdf"
                ? {
                    y: [0, -15, 0],
                  }
                : {}
            }
            transition={
              bouncingAppId === "pdf"
                ? {
                    duration: 0.8,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }
                : {
                    type: "spring",
                    stiffness: 400,
                    damping: 18,
                  }
            }
          >
            <FileText className="w-5.5 h-5.5" />

            {/* Active app indicator dot */}
            {isAppOpen("pdf") && (
              <span
                className={`absolute w-1.5 h-1.5 bg-neutral-100 rounded-full shadow-[0_0_4px_white] ${
                  settings.dockPosition === "left"
                    ? "right-1 top-1/2 -translate-y-1/2"
                    : settings.dockPosition === "right"
                    ? "left-1 top-1/2 -translate-y-1/2"
                    : "bottom-1 left-1/2 -translate-x-1/2"
                }`}
              />
            )}
          </motion.button>

          {/* Persistent App Name for Web/Desktop View */}
          <span className="hidden sm:block text-[9px] font-semibold text-neutral-300/90 tracking-wide mt-1 select-none text-center truncate max-w-[54px]">
            Resume
          </span>
        </div>

        {/* Trash Bin */}
        <div className="relative group flex flex-col items-center">
          <div
            className={`absolute pointer-events-none scale-0 group-hover:scale-100 bg-neutral-900 border border-white/10 text-white text-[10px] font-medium tracking-wide px-2.5 py-1 rounded-lg transition-all z-[999] shadow-lg whitespace-nowrap ${
              settings.dockPosition === "left"
                ? "left-14 top-1/2 -translate-y-1/2"
                : settings.dockPosition === "right"
                ? "right-14 top-1/2 -translate-y-1/2"
                : "bottom-14 left-1/2 -translate-x-1/2"
            }`}
          >
            {trashCount > 0 ? `Trash (${trashCount} items)` : "Trash (Empty)"}
          </div>

          <motion.button
            id="dock-trash"
            onClick={handleTrashClick}
            className={`w-11 h-11 rounded-xl flex items-center justify-center cursor-pointer shadow-md ${
              trashCount > 0 ? "bg-red-500 text-white" : "bg-neutral-800 text-neutral-400 border border-neutral-700"
            }`}
            whileHover={settings.reducedMotion ? {} : { scale: 1.2, y: settings.dockPosition === "bottom" ? -6 : 0, x: settings.dockPosition === "left" ? 6 : settings.dockPosition === "right" ? -6 : 0 }}
          >
            <Trash2 className="w-5.5 h-5.5" />
          </motion.button>

          {/* Persistent App Name for Web/Desktop View */}
          <span className="hidden sm:block text-[9px] font-semibold text-neutral-300/90 tracking-wide mt-1 select-none text-center truncate max-w-[54px]">
            Trash
          </span>
        </div>
      </div>
    </div>
  );
}
