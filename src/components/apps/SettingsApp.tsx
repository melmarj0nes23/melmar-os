import { useOS } from "../../context/OSContext";
import { OSSettings, OSAccentColor, OSDockPosition } from "../../types";
import { Sliders, Monitor, Eye, LayoutGrid, RotateCcw } from "lucide-react";

export default function SettingsApp() {
  const { settings, updateSettings, addNotification } = useOS();

  const wallpapers = [
    { name: "Default Premium", desc: "Melmar default premium graphic artwork", style: "", isUrl: true, url: "https://cdn.jsdelivr.net/gh/melmarj0nes23/melmar-assets@main/images/wall1.webp" },
    { name: "Cosmic Slate", desc: "Mysterious celestial obsidian gradient", style: "bg-gradient-to-tr from-purple-950 via-slate-950 to-indigo-950" },
    { name: "Sunset Silk", desc: "Velvety pink-to-gold dusk cascade", style: "bg-gradient-to-tr from-amber-950 via-rose-950 to-slate-950" },
    { name: "Forest Fog", desc: "Moody dynamic evergreen mist", style: "bg-gradient-to-tr from-emerald-950 via-zinc-950 to-stone-950" },
    { name: "Minimal Graphite", desc: "High-contrast monochromatic ink", style: "bg-gradient-to-tr from-slate-950 via-neutral-900 to-black" },
    { name: "Sunrise Glow", desc: "Radiant high-contrast solar morning", style: "bg-gradient-to-tr from-orange-950 via-pink-950 to-indigo-950" }
  ];

  const accents: { name: OSAccentColor; colorClass: string }[] = [
    { name: "slate", colorClass: "bg-slate-500" },
    { name: "blue", colorClass: "bg-sky-500" },
    { name: "amber", colorClass: "bg-amber-500" },
    { name: "emerald", colorClass: "bg-emerald-500" },
    { name: "rose", colorClass: "bg-rose-500" }
  ];

  const positions: { name: OSDockPosition; label: string }[] = [
    { name: "left", label: "Left Rail" },
    { name: "bottom", label: "Bottom Desk" },
    { name: "right", label: "Right Rail" }
  ];

  const handleResetSettings = () => {
    updateSettings({
      theme: "dark",
      wallpaperIndex: 0,
      accentColor: "slate",
      dockPosition: "bottom",
      reducedMotion: false,
      glassEffect: true,
      blurIntensity: "medium",
      cornerRadius: "large"
    });
    addNotification("Restored default desktop settings successfully!");
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-[#110f0e] select-none text-neutral-300 font-sans">
      {/* Settings Left Navigation panel */}
      <div className="w-full md:w-44 border-b md:border-b-0 md:border-r border-white/5 bg-black/20 p-4 shrink-0 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible shrink-0">
        <div className="hidden md:flex items-center gap-2 mb-4 px-2">
          <Sliders className="w-4 h-4 text-neutral-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Settings</span>
        </div>
        <button className="flex items-center gap-2.5 px-3 py-2 bg-white/5 border border-white/10 text-white rounded-lg text-xs font-medium w-full shrink-0 text-left cursor-pointer">
          <Monitor className="w-3.5 h-3.5" />
          <span>Appearance</span>
        </button>
      </div>

      {/* Settings Right Dashboard area */}
      <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6">
        {/* SECTION 1: Wallpapers */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <LayoutGrid className="w-4 h-4 text-neutral-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-200">Desktop Wallpaper</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {wallpapers.map((wp, idx) => {
              const active = settings.wallpaperIndex === idx;
              return (
                <div
                  key={wp.name}
                  onClick={() => {
                    updateSettings({ wallpaperIndex: idx });
                    addNotification(`Wallpaper changed to ${wp.name}`);
                  }}
                  className={`border rounded-xl p-1.5 cursor-pointer flex flex-col gap-2 transition-all ${
                    active
                      ? "border-white bg-white/10 shadow-lg"
                      : "border-white/5 hover:border-white/20 hover:bg-white/5 bg-black/20"
                  }`}
                >
                  <div 
                    className={`w-full h-16 rounded-lg shadow-inner ${wp.style}`} 
                    style={wp.isUrl ? { backgroundImage: `url(${wp.url})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
                  />
                  <div className="px-1">
                    <p className="text-[10px] font-semibold text-neutral-200 truncate">{wp.name}</p>
                    <p className="text-[8px] text-neutral-500 truncate leading-tight">{wp.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: Accent Highlight Color */}
        <div className="border-t border-white/5 pt-5">
          <div className="flex items-center gap-2 mb-3">
            <Eye className="w-4 h-4 text-neutral-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-200">Accent Colors</h3>
          </div>
          
          <div className="flex items-center gap-4 bg-black/25 p-4 rounded-xl border border-white/5">
            <span className="text-[11px] font-medium text-neutral-400">Select active highlight:</span>
            <div className="flex items-center gap-2.5">
              {accents.map((acc) => {
                const active = settings.accentColor === acc.name;
                return (
                  <button
                    key={acc.name}
                    onClick={() => {
                      updateSettings({ accentColor: acc.name });
                      addNotification(`Accent color shifted to ${acc.name}`);
                    }}
                    className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-all ${acc.colorClass} ${
                      active ? "ring-2 ring-white ring-offset-2 ring-offset-[#110f0e]" : "opacity-80 hover:opacity-100"
                    }`}
                    title={`Highlight: ${acc.name}`}
                    aria-label={`Highlight Accent ${acc.name}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* SECTION 3: Dock Alignment */}
        <div className="border-t border-white/5 pt-5">
          <div className="flex items-center gap-2 mb-3">
            <LayoutGrid className="w-4 h-4 text-neutral-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-200">Dock Positioning</h3>
          </div>
          
          <div className="grid grid-cols-3 gap-3 bg-black/25 p-3 rounded-xl border border-white/5">
            {positions.map((pos) => {
              const active = settings.dockPosition === pos.name;
              return (
                <button
                  key={pos.name}
                  onClick={() => {
                    updateSettings({ dockPosition: pos.name });
                    addNotification(`Dock aligned to ${pos.label}`);
                  }}
                  className={`py-2 text-[10px] font-semibold rounded-lg cursor-pointer transition-all ${
                    active
                      ? "bg-white/10 text-white border border-white/10"
                      : "text-neutral-400 hover:bg-white/5 hover:text-neutral-200"
                  }`}
                >
                  {pos.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 4: Toggles (Reduced motion, glass, corners) */}
        <div className="border-t border-white/5 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Glass effect */}
          <div className="bg-black/25 p-3 border border-white/5 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-neutral-200">Glassmorphic Acrylic Blurs</p>
              <p className="text-[9px] text-neutral-500">Enable modern frosted background rendering</p>
            </div>
            <button
              onClick={() => updateSettings({ glassEffect: !settings.glassEffect })}
              className={`w-10 h-5.5 rounded-full p-0.5 cursor-pointer transition-colors ${
                settings.glassEffect ? "bg-emerald-500 flex justify-end" : "bg-neutral-800 flex justify-start"
              }`}
            >
              <span className="w-4.5 h-4.5 rounded-full bg-white shadow-md block" />
            </button>
          </div>

          {/* Reduced Motion */}
          <div className="bg-black/25 p-3 border border-white/5 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-neutral-200">Reduced Motion</p>
              <p className="text-[9px] text-neutral-500">Deactivate window expansions and dock springs</p>
            </div>
            <button
              onClick={() => {
                updateSettings({ reducedMotion: !settings.reducedMotion });
                addNotification(settings.reducedMotion ? "Animations enabled" : "Motion disabled");
              }}
              className={`w-10 h-5.5 rounded-full p-0.5 cursor-pointer transition-colors ${
                settings.reducedMotion ? "bg-emerald-500 flex justify-end" : "bg-neutral-800 flex justify-start"
              }`}
            >
              <span className="w-4.5 h-4.5 rounded-full bg-white shadow-md block" />
            </button>
          </div>
          
          {/* Corner Radius Controls */}
          <div className="sm:col-span-2 bg-black/25 p-4 border border-white/5 rounded-xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-semibold text-neutral-200">Window Border Radiuses</p>
                <p className="text-[9px] text-neutral-500">Adjust aesthetic curves on app panel frames</p>
              </div>
              <span className="text-[10px] font-mono text-neutral-400 uppercase bg-neutral-800 px-2 py-0.5 rounded">
                {settings.cornerRadius}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(["none", "medium", "large"] as const).map((r) => {
                const active = settings.cornerRadius === r;
                return (
                  <button
                    key={r}
                    onClick={() => {
                      updateSettings({ cornerRadius: r });
                      addNotification(`Curves set to ${r}`);
                    }}
                    className={`py-1.5 text-[9px] font-bold rounded cursor-pointer capitalize transition-all ${
                      active
                        ? "bg-white/10 text-white border border-white/10"
                        : "text-neutral-500 hover:bg-white/5 hover:text-neutral-300"
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECTION 5: Factory Reset */}
        <div className="border-t border-white/5 pt-5 mt-auto flex justify-end">
          <button
            onClick={handleResetSettings}
            className="flex items-center gap-1.5 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/10 hover:border-red-500/20 rounded-xl text-[10px] font-bold tracking-wider uppercase cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
