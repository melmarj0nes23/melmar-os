import { useOS } from "../../context/OSContext";
import { motion, AnimatePresence } from "motion/react";
import { Bell, Info } from "lucide-react";

export default function NotificationCenter() {
  const { notifications, removeNotification } = useOS();

  return (
    <div
      id="notification-center-container"
      className="fixed top-12 right-4 flex flex-col gap-2 z-[999]"
      style={{ maxWidth: "320px", pointerEvents: "none" }}
    >
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            id={`notification-${notif.id}`}
            className="glass-panel text-white rounded-xl shadow-2xl p-3.5 flex items-start gap-3 border border-white/10 pointer-events-auto cursor-pointer select-none"
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            onClick={() => removeNotification(notif.id)}
            whileHover={{ scale: 1.02, border: "1px solid rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="bg-white/10 p-2 rounded-lg text-neutral-200">
              <Info className="w-4 h-4" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono tracking-wider font-semibold text-neutral-400 flex items-center gap-1 uppercase">
                  <Bell className="w-2.5 h-2.5" /> System Update
                </span>
                <span className="text-[9px] font-mono text-neutral-500">
                  {notif.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                </span>
              </div>
              <p className="text-xs text-neutral-200 font-medium leading-relaxed tracking-wide">
                {notif.text}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
