import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { OSWindow, OSSettings, TerminalLog, MailMessage } from "../types";

interface OSContextProps {
  windows: OSWindow[];
  activeWindowId: string | null;
  settings: OSSettings;
  isBooted: boolean;
  terminalHistory: TerminalLog[];
  messages: MailMessage[];
  spotlightOpen: boolean;
  notifications: { id: string; text: string; timestamp: Date }[];
  
  // App operations
  openApp: (id: string) => void;
  closeApp: (id: string) => void;
  minimizeApp: (id: string) => void;
  maximizeApp: (id: string) => void;
  focusApp: (id: string) => void;
  updateWindowPos: (id: string, x: number, y: number) => void;
  updateWindowSize: (id: string, width: number, height: number) => void;
  
  // Customization
  updateSettings: (newSettings: Partial<OSSettings>) => void;
  setBooted: (val: boolean) => void;
  
  // Shell Terminal
  addTerminalLog: (log: TerminalLog) => void;
  clearTerminalHistory: () => void;
  
  // Mail
  sendMail: (senderName: string, senderEmail: string, subject: string, message: string) => Promise<boolean>;
  refreshMail: () => Promise<void>;
  
  // UI Helpers
  toggleSpotlight: (val?: boolean) => void;
  addNotification: (text: string) => void;
  removeNotification: (id: string) => void;
}

const defaultSettings: OSSettings = {
  theme: "dark",
  wallpaperIndex: 0,
  accentColor: "slate",
  dockPosition: "bottom",
  reducedMotion: false,
  glassEffect: true,
  blurIntensity: "medium",
  cornerRadius: "large",
};

const OSContext = createContext<OSContextProps | undefined>(undefined);

export function OSProvider({ children }: { children: React.ReactNode }) {
  const [isBooted, setIsBooted] = useState(false);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [notifications, setNotifications] = useState<{ id: string; text: string; timestamp: Date }[]>([]);
  const [terminalHistory, setTerminalHistory] = useState<TerminalLog[]>([
    { id: "term-welcome-1", type: "output", text: "PortfolioOS [Version 1.0.0]" },
    { id: "term-welcome-2", type: "output", text: "(c) 2026 Melmar Jones Velasco. All rights reserved." },
    { id: "term-welcome-3", type: "output", text: "Type 'help' to view available commands." },
  ]);
  const [messages, setMessages] = useState<MailMessage[]>([]);

  // Windows initial coordinates staggered
  const [windows, setWindows] = useState<OSWindow[]>([
    { id: "finder", title: "Finder", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 80, y: 70, width: 760, height: 490, minWidth: 450, minHeight: 300 },
    { id: "vscode", title: "Visual Studio Code", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 120, y: 110, width: 880, height: 560, minWidth: 500, minHeight: 350 },
    { id: "terminal", title: "Terminal", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 160, y: 150, width: 680, height: 420, minWidth: 400, minHeight: 250 },
    { id: "safari", title: "Safari", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 200, y: 90, width: 820, height: 510, minWidth: 500, minHeight: 300 },
    { id: "mail", title: "Mail", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 140, y: 130, width: 720, height: 470, minWidth: 450, minHeight: 300 },
    { id: "gallery", title: "Gallery", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 240, y: 170, width: 740, height: 500, minWidth: 450, minHeight: 300 },
    { id: "settings", title: "Settings", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 320, y: 200, width: 560, height: 460, minWidth: 350, minHeight: 300 },
    { id: "pdf", title: "PDF Previewer - Melmar_Resume.pdf", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 100, y: 60, width: 800, height: 620, minWidth: 450, minHeight: 400 },
    { id: "messages", title: "Messages", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 180, y: 120, width: 700, height: 500, minWidth: 400, minHeight: 300 },
    { id: "tetris", title: "Tetris Arcade", isOpen: false, isMinimized: false, isMaximized: false, zIndex: 10, x: 220, y: 80, width: 450, height: 600, minWidth: 320, minHeight: 450 },
  ]);

  // Load configuration settings from LocalStorage
  const [settings, setSettings] = useState<OSSettings>(() => {
    try {
      const saved = localStorage.getItem("portfolio_os_settings");
      if (saved) {
        return { ...defaultSettings, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn("Could not parse settings from localStorage:", e);
    }
    return defaultSettings;
  });

  // Load windows state on refresh
  useEffect(() => {
    try {
      const savedWin = localStorage.getItem("portfolio_os_windows");
      if (savedWin) {
        const parsed: Partial<OSWindow>[] = JSON.parse(savedWin);
        setWindows((prev) =>
          prev.map((w) => {
            const matched = parsed.find((p) => p.id === w.id);
            if (matched) {
              return {
                ...w,
                isOpen: matched.isOpen ?? w.isOpen,
                isMinimized: matched.isMinimized ?? w.isMinimized,
                isMaximized: matched.isMaximized ?? w.isMaximized,
                x: matched.x ?? w.x,
                y: matched.y ?? w.y,
                width: matched.width ?? w.width,
                height: matched.height ?? w.height,
              };
            }
            return w;
          })
        );
      }
    } catch (e) {
      console.warn("Could not reload windows layout history:", e);
    }
  }, []);

  // Save windows state when modified
  const persistWindows = (updatedWins: OSWindow[]) => {
    try {
      const trimState = updatedWins.map(({ id, isOpen, isMinimized, isMaximized, x, y, width, height }) => ({
        id,
        isOpen,
        isMinimized,
        isMaximized,
        x,
        y,
        width,
        height,
      }));
      localStorage.setItem("portfolio_os_windows", JSON.stringify(trimState));
    } catch (e) {
      console.warn("Could not persist windows layout:", e);
    }
  };

  // Sync Mail items from backend
  const refreshMail = async () => {
    try {
      const res = await fetch("/api/contact/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error("Failed to sync backend mail inbox:", err);
    }
  };

  useEffect(() => {
    refreshMail();
  }, []);

  // Handle background settings save
  const updateSettings = (newSettings: Partial<OSSettings>) => {
    setSettings((prev) => {
      const merged = { ...prev, ...newSettings };
      localStorage.setItem("portfolio_os_settings", JSON.stringify(merged));
      return merged;
    });
  };

  // Window actions
  const openApp = (id: string) => {
    setWindows((prev) => {
      const maxZ = prev.length > 0 ? Math.max(...prev.map((w) => w.zIndex), 10) : 10;
      const updated = prev.map((w) => {
        if (w.id === id) {
          return {
            ...w,
            isOpen: true,
            isMinimized: false,
            zIndex: maxZ + 1,
          };
        }
        return w;
      });
      persistWindows(updated);
      return updated;
    });
    setActiveWindowId(id);
    addNotification(`Opened ${id.charAt(0).toUpperCase() + id.slice(1)}`);
  };

  const closeApp = (id: string) => {
    setWindows((prev) => {
      const updated = prev.map((w) => (w.id === id ? { ...w, isOpen: false } : w));
      persistWindows(updated);
      return updated;
    });
    if (activeWindowId === id) {
      // Shift focus to next highest z-index window that is open
      const remainingOpen = windows.filter((w) => w.id !== id && w.isOpen && !w.isMinimized);
      if (remainingOpen.length > 0) {
        const sorted = [...remainingOpen].sort((a, b) => b.zIndex - a.zIndex);
        setActiveWindowId(sorted[0].id);
      } else {
        setActiveWindowId(null);
      }
    }
    addNotification(`Closed ${id.charAt(0).toUpperCase() + id.slice(1)}`);
  };

  const minimizeApp = (id: string) => {
    setWindows((prev) => {
      const updated = prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w));
      persistWindows(updated);
      return updated;
    });
    if (activeWindowId === id) {
      const remainingOpen = windows.filter((w) => w.id !== id && w.isOpen && !w.isMinimized);
      if (remainingOpen.length > 0) {
        const sorted = [...remainingOpen].sort((a, b) => b.zIndex - a.zIndex);
        setActiveWindowId(sorted[0].id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const maximizeApp = (id: string) => {
    setWindows((prev) => {
      const updated = prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
      persistWindows(updated);
      return updated;
    });
    focusApp(id);
  };

  const focusApp = (id: string) => {
    setWindows((prev) => {
      const targetWin = prev.find((w) => w.id === id);
      if (!targetWin) return prev;
      const maxZ = Math.max(...prev.map((w) => w.zIndex), 10);
      if (targetWin.zIndex === maxZ && activeWindowId === id) return prev; // Already focused
      
      const updated = prev.map((w) => (w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w));
      persistWindows(updated);
      return updated;
    });
    setActiveWindowId(id);
  };

  const updateWindowPos = (id: string, x: number, y: number) => {
    setWindows((prev) => {
      const updated = prev.map((w) => (w.id === id ? { ...w, x, y } : w));
      persistWindows(updated);
      return updated;
    });
  };

  const updateWindowSize = (id: string, width: number, height: number) => {
    setWindows((prev) => {
      const updated = prev.map((w) => (w.id === id ? { ...w, width, height } : w));
      persistWindows(updated);
      return updated;
    });
  };

  // Shell Terminal Logger
  const addTerminalLog = (log: TerminalLog) => {
    setTerminalHistory((prev) => [...prev, log]);
  };

  const clearTerminalHistory = () => {
    setTerminalHistory([]);
  };

  // Mail Submission & Dynamic Sync
  const sendMail = async (senderName: string, senderEmail: string, subject: string, message: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderName, senderEmail, subject, message }),
      });
      if (res.ok) {
        addNotification("New email sent successfully!");
        await refreshMail();
        return true;
      }
    } catch (err) {
      console.error("Failed to send mail:", err);
    }
    
    // Client-side fallback if server fails
    const mockMsg: MailMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      senderName,
      senderEmail,
      subject: subject || "No Subject",
      message,
      timestamp: new Date().toISOString(),
      isRead: false,
    };
    setMessages((prev) => [...prev, mockMsg]);
    addNotification("New message cached locally!");
    return true;
  };

  // Notification Core
  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const addNotification = useCallback((text: string) => {
    const id = `notif-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setNotifications((prev) => [{ id, text, timestamp: new Date() }, ...prev]);
    // Auto-prune notifications after 4 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 4000);
  }, [removeNotification]);

  const toggleSpotlight = (val?: boolean) => {
    setSpotlightOpen((prev) => (val !== undefined ? val : !prev));
  };

  // Setup Global Keyboard Listener for Spotlight (Cmd+Space / Ctrl+Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.code === "Space") {
        e.preventDefault();
        toggleSpotlight();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <OSContext.Provider
      value={{
        windows,
        activeWindowId,
        settings,
        isBooted,
        terminalHistory,
        messages,
        spotlightOpen,
        notifications,
        openApp,
        closeApp,
        minimizeApp,
        maximizeApp,
        focusApp,
        updateWindowPos,
        updateWindowSize,
        updateSettings,
        setBooted: setIsBooted,
        addTerminalLog,
        clearTerminalHistory,
        sendMail,
        refreshMail,
        toggleSpotlight,
        addNotification,
        removeNotification,
      }}
    >
      {children}
    </OSContext.Provider>
  );
}

export function useOS() {
  const context = useContext(OSContext);
  if (!context) {
    throw new Error("useOS must be used inside OSProvider");
  }
  return context;
}
