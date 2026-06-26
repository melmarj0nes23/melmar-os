import React, { useRef } from "react";
import { useOS } from "../../context/OSContext";
import { OSWindow } from "../../types";
import { motion } from "motion/react";
import { Square, X, Minus, MoveRight } from "lucide-react";

interface WindowProps {
  windowState: OSWindow;
  children: React.ReactNode;
}

export default function Window({ windowState, children }: WindowProps) {
  const {
    id,
    title,
    isMinimized,
    isMaximized,
    zIndex,
    x,
    y,
    width,
    height,
    minWidth,
    minHeight,
  } = windowState;

  const {
    activeWindowId,
    closeApp,
    minimizeApp,
    maximizeApp,
    focusApp,
    updateWindowPos,
    updateWindowSize,
    settings,
  } = useOS();

  const windowRef = useRef<HTMLDivElement>(null);
  const isFocused = activeWindowId === id;

  // Custom resizing handler utilizing PointerEvents (mobile & mouse robust)
  const handleResizeStart = (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    focusApp(id);

    const startWidth = width;
    const startHeight = height;
    const startX = e.clientX;
    const startY = e.clientY;

    const target = e.currentTarget as HTMLElement;
    try {
      target.setPointerCapture(e.pointerId);
    } catch (err) {}

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      const newWidth = Math.max(minWidth || 350, startWidth + deltaX);
      const newHeight = Math.max(minHeight || 250, startHeight + deltaY);

      updateWindowSize(id, newWidth, newHeight);
    };

    const handlePointerUp = (upEvent: PointerEvent) => {
      try {
        target.releasePointerCapture(upEvent.pointerId);
      } catch (err) {}
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  // Double-clicking the titlebar maximizes/restores the window
  const handleTitleBarDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    maximizeApp(id);
  };

  if (isMinimized) return null;

  // Dynamic window layout calculations based on dockPosition
  const getWindowLayout = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

    if (!isMaximized && !isMobile) {
      return {
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
      };
    }

    const topBarHeight = 40; // 2.5rem = 40px
    const dockSpacing = 76;

    let maxLeft = 0;
    let maxTop = topBarHeight;
    let maxWidth = "100%";
    let maxHeight = `calc(100% - ${topBarHeight}px)`;

    if (isMobile) {
      maxHeight = `calc(100% - ${topBarHeight}px - 72px)`;
    } else {
      if (settings.dockPosition === "left") {
        maxLeft = dockSpacing;
        maxWidth = `calc(100% - ${dockSpacing}px)`;
      } else if (settings.dockPosition === "right") {
        maxWidth = `calc(100% - ${dockSpacing}px)`;
      } else if (settings.dockPosition === "bottom") {
        maxHeight = `calc(100% - ${topBarHeight}px - ${dockSpacing}px)`;
      }
    }

    return {
      left: `${maxLeft}px`,
      top: `${maxTop}px`,
      width: maxWidth,
      height: maxHeight,
    };
  };

  return (
    <motion.div
      ref={windowRef}
      id={`window-frame-${id}`}
      className={`fixed flex flex-col overflow-hidden border ${
        isFocused
          ? "border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.6)] bg-[#131110]/95"
          : "border-white/5 shadow-[0_15px_30px_rgba(0,0,0,0.4)] bg-[#110f0f]/92 opacity-95"
      } ${
        settings.cornerRadius === "large"
          ? "rounded-2xl"
          : settings.cornerRadius === "medium"
          ? "rounded-lg"
          : "rounded-none"
      } ${settings.glassEffect ? "backdrop-blur-xl" : ""} transition-shadow duration-200`}
      style={{
        zIndex,
        ...getWindowLayout(),
      }}
      initial={settings.reducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      onPointerDown={() => focusApp(id)}
    >
      {/* WINDOW TITLE BAR / DRAG HANDLE */}
      <div
        id={`window-titlebar-${id}`}
        className={`w-full h-11 flex items-center justify-between px-4 select-none shrink-0 ${
          isFocused ? "bg-[#181615]/75 text-neutral-200" : "bg-[#141212]/50 text-neutral-500"
        } border-b border-white/5 cursor-grab active:cursor-grabbing touch-none`}
        onDoubleClick={handleTitleBarDoubleClick}
        onPointerDown={(e) => {
          // Trigger dragging if dragging is focused on title bar only (Framer drag handles dragging natively on custom elements or we handle coords manually)
          // Since we want dynamic drag constraints, we can use simple pointer move drag handler right here:
          if ((e.target as HTMLElement).closest(".control-dot")) return;
          e.preventDefault();
          focusApp(id);

          if (isMaximized || (typeof window !== 'undefined' && window.innerWidth < 640)) return; // Disable drag if maximized or on mobile

          const startX = x;
          const startY = y;
          const startClientX = e.clientX;
          const startClientY = e.clientY;

          const dragTarget = e.currentTarget as HTMLElement;
          try {
            dragTarget.setPointerCapture(e.pointerId);
          } catch (err) {}

          const onDragMove = (moveEvent: PointerEvent) => {
            const nextX = startX + (moveEvent.clientX - startClientX);
            // Constrain dragging: prevent header from slipping beneath top MenuBar (40px)
            const nextY = Math.max(40, startY + (moveEvent.clientY - startClientY));
            updateWindowPos(id, nextX, nextY);
          };

          const onDragUp = (upEvent: PointerEvent) => {
            try {
              dragTarget.releasePointerCapture(upEvent.pointerId);
            } catch (err) {}
            window.removeEventListener("pointermove", onDragMove);
            window.removeEventListener("pointerup", onDragUp);
          };

          window.addEventListener("pointermove", onDragMove);
          window.addEventListener("pointerup", onDragUp);
        }}
      >
        {/* Left Window Controls (Red, Yellow, Green macOS Dots) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            id={`control-close-${id}`}
            className="control-dot w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center group/dot transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              closeApp(id);
            }}
            title="Close"
          >
            <X className="w-2 h-2 text-red-950 opacity-0 group-hover/dot:opacity-100 transition-opacity" />
          </button>
          
          <button
            id={`control-minimize-${id}`}
            className="control-dot w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 flex items-center justify-center group/dot transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              minimizeApp(id);
            }}
            title="Minimize"
          >
            <Minus className="w-2 h-2 text-yellow-950 opacity-0 group-hover/dot:opacity-100 transition-opacity" />
          </button>
          
          <button
            id={`control-maximize-${id}`}
            className="control-dot w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center group/dot transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              maximizeApp(id);
            }}
            title="Maximize"
          >
            <Square className="w-1.5 h-1.5 text-green-950 opacity-0 group-hover/dot:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Dynamic Title */}
        <span className="text-[11px] font-sans font-semibold tracking-wider uppercase text-center flex-1 truncate mx-4 pointer-events-none">
          {title}
        </span>

        {/* Right side spacer for centering symmetry */}
        <div className="w-14 shrink-0 flex justify-end">
          {isMaximized && (
            <button
              onClick={() => maximizeApp(id)}
              className="text-neutral-500 hover:text-white mr-1 cursor-pointer"
              title="Restore window size"
            >
              <MoveRight className="w-3.5 h-3.5 rotate-45" />
            </button>
          )}
        </div>
      </div>

      {/* WINDOW INTERIOR PANEL */}
      <div
        id={`window-body-${id}`}
        className="w-full flex-1 min-h-0 select-text relative flex flex-col bg-[#0b0909]/95 text-neutral-200"
        onPointerDown={(e) => {
          // Focus the app when clicking anywhere inside its body
          focusApp(id);
          // Stops dragging pointerdown bubblings when typing/operating apps
          e.stopPropagation();
        }}
      >
        {children}
      </div>

      {/* RESIZE HANDLE DIAGONAL (Bottom Right) */}
      {!isMaximized && (
        <div
          id={`window-resize-handle-${id}`}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize shrink-0 z-[1001] flex items-end justify-end pointer-events-auto touch-none"
          onPointerDown={handleResizeStart}
        >
          {/* Custom vector lines representing diagonal grip */}
          <svg className="w-3 h-3 text-white/20 select-none mr-0.5 mb-0.5" viewBox="0 0 10 10">
            <line x1="10" y1="2" x2="2" y2="10" stroke="currentColor" strokeWidth="1" />
            <line x1="10" y1="5" x2="5" y2="10" stroke="currentColor" strokeWidth="1" />
            <line x1="10" y1="8" x2="8" y2="10" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
      )}
    </motion.div>
  );
}
