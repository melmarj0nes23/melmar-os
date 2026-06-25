import { useState, useEffect } from "react";
import { useOS } from "../../context/OSContext";
import { motion, AnimatePresence } from "motion/react";
import { Terminal } from "lucide-react";

export default function BootScreen() {
  const { isBooted, setBooted } = useOS();
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing PortfolioOS kernel...");

  const statusLogs = [
    { threshold: 0, text: "Initializing PortfolioOS kernel v1.0.0..." },
    { threshold: 15, text: "Loading virtual file system registry (VFS)..." },
    { threshold: 35, text: "Mounting partition '/dev/portfolio_root'..." },
    { threshold: 55, text: "Establishing secure Gemini server proxy gateways..." },
    { threshold: 75, text: "Compiling interface layouts and window boundaries..." },
    { threshold: 90, text: "Starting Window Manager & Desktop scheduler..." },
    { threshold: 98, text: "Welcome. Booting complete!" },
  ];

  useEffect(() => {
    if (isBooted) return;

    const duration = 2400; // total boot time in ms
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const nextProgress = Math.min(Math.round((stepCount / steps) * 100), 100);
      setProgress(nextProgress);

      // Check for logs changes
      const currentLog = [...statusLogs]
        .reverse()
        .find((log) => nextProgress >= log.threshold);
      if (currentLog) {
        setStatusText(currentLog.text);
      }

      if (stepCount >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setBooted(true);
        }, 300);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isBooted, setBooted]);

  return (
    <AnimatePresence>
      {!isBooted && (
        <motion.div
          id="boot-screen-container"
          className="fixed inset-0 bg-[#070606] flex flex-col items-center justify-center text-white z-[9999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center max-w-xs w-full px-6">
            {/* Custom Logo Graphic */}
            <motion.div
              className="relative w-16 h-16 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center shadow-xl mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <Terminal className="w-8 h-8 text-white" />
              <div className="absolute inset-0 rounded-2xl bg-radial from-white/10 to-transparent pointer-events-none" />
            </motion.div>

            {/* Title */}
            <h1 className="text-xl font-display font-medium tracking-widest text-neutral-200 mb-1">
              PORTFOLIO<span className="text-white font-bold">OS</span>
            </h1>
            <p className="text-xs font-mono text-neutral-500 mb-8 tracking-wider">
              DEVELOPER EDITION
            </p>

            {/* Progress Bar Container */}
            <div className="w-full bg-neutral-900 border border-neutral-800 h-2.5 rounded-full p-[2px] mb-4">
              <motion.div
                className="bg-neutral-200 h-full rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                style={{ width: `${progress}%` }}
                layoutId="boot-progress"
              />
            </div>

            {/* Console Log status message */}
            <div className="h-6 flex items-center justify-center">
              <p className="text-[10px] font-mono text-neutral-400 tracking-wide text-center">
                {statusText}
              </p>
            </div>
            
            {/* Dots */}
            <div className="flex items-center gap-1.5 mt-2">
              <span className="boot-dot w-1.5 h-1.5 bg-neutral-600 rounded-full" />
              <span className="boot-dot w-1.5 h-1.5 bg-neutral-600 rounded-full" />
              <span className="boot-dot w-1.5 h-1.5 bg-neutral-600 rounded-full" />
            </div>
          </div>
          
          <div className="absolute bottom-6 text-[9px] font-mono text-neutral-600">
            Secure UEFI Boot // Port 3000 Ingress Live
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
