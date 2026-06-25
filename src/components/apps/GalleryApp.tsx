import React, { useState } from "react";
import { galleryItems } from "../../data/filesystem";
import { GalleryItem } from "../../types";
import { Grid, Eye, X, ChevronLeft, ChevronRight, ZoomIn, Lock, RotateCw, Share2, Plus } from "lucide-react";

export default function GalleryApp() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["all", "workstation", "hackathon", "certifications", "highlights"];

  // Filter lists
  const filteredItems = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const handleOpenLightbox = (item: GalleryItem) => {
    const idx = galleryItems.findIndex((x) => x.id === item.id);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! === 0 ? galleryItems.length - 1 : prev! - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev! === galleryItems.length - 1 ? 0 : prev! + 1));
    }
  };

  return (
    <div id="gallery-app-body" className="w-full h-full flex flex-col bg-[#0e0c0b] text-neutral-300 font-sans overflow-hidden select-none relative">
      {/* Gallery Filter Nav Bar */}
      <div className="w-full bg-[#141211] border-b border-white/5 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <Grid className="w-4 h-4 text-neutral-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-200">Portfolio Media Gallery</span>
        </div>
        
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto shrink-0 select-none pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase transition-colors shrink-0 cursor-pointer ${
                activeCategory === cat
                  ? "bg-white/10 text-white border border-white/10"
                  : "text-neutral-500 hover:text-neutral-300 bg-white/0 hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid display area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {filteredItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-neutral-500">
            <p className="text-sm font-mono">No gallery records matched</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleOpenLightbox(item)}
                className="group relative bg-[#131110] border border-white/5 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all hover:border-white/15"
              >
                {/* Visual Image container */}
                <div className="relative w-full h-44 overflow-hidden bg-neutral-900 border-b border-white/5">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-[#131110]/20 transition-all" />
                  
                  {/* Eye magnification icon */}
                  <div className="absolute top-3 right-3 p-1.5 bg-black/60 backdrop-blur-md rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Info summary */}
                <div className="p-4 flex flex-col gap-1 select-text">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-mono font-bold tracking-widest text-neutral-500 uppercase">
                      {item.category}
                    </span>
                    <span className="text-[9px] font-mono text-neutral-500">
                      {item.date}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-neutral-200 tracking-wide truncate">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-neutral-400 leading-normal line-clamp-2 mt-0.5 select-none">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* LIGHTBOX MODAL OVERLAY (Sits inside application window) */}
      {lightboxIndex !== null && (
        <div
          onClick={handleCloseLightbox}
          className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center p-4 sm:p-8 z-[2000] select-text select-none cursor-zoom-out"
        >
          {/* Top closing control bar */}
          <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
            <span className="text-[10px] font-mono text-neutral-400">
              {lightboxIndex + 1} / {galleryItems.length}
            </span>
            <button
              onClick={handleCloseLightbox}
              className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white cursor-pointer"
              title="Close Lightbox"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Left Arrow (hidden on small mobile screens to prevent edge-clicking bugs) */}
          <button
            onClick={handlePrev}
            className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-full text-white cursor-pointer z-10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Centered Image inside Safari Browser Wrapper and description */}
          <div className="max-w-2xl w-full flex flex-col items-center gap-4 cursor-default select-text" onClick={(e) => e.stopPropagation()}>
            {/* Safari Browser Frame Wrapper */}
            <div className="w-full bg-[#1c1c1e] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
              {/* Safari Top Bar Header */}
              <div className="bg-[#242426] px-3 py-2 sm:px-4 sm:py-3 border-b border-white/5 flex items-center justify-between select-none shrink-0 gap-2 sm:gap-3">
                {/* Left: Window Controls (Red, Yellow, Green Mac Dots) - hidden on mobile to avoid overlapping */}
                <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>

                {/* Left-Center: Mock Navigation Arrows - hidden on mobile to avoid overlapping */}
                <div className="hidden sm:flex items-center gap-3 shrink-0 text-neutral-500">
                  <button 
                    onClick={handlePrev}
                    className="p-1 hover:bg-white/5 rounded text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    title="Previous Image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleNext}
                    className="p-1 hover:bg-white/5 rounded text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    title="Next Image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Center: URL Bar Input Area (Flex-1 so it takes full horizontal space safely on mobile) */}
                <div className="flex-1 max-w-full sm:max-w-md bg-[#2c2c2e] border border-white/5 py-1 px-3 rounded-lg flex items-center justify-between text-neutral-400 gap-2 font-mono text-[10px] sm:text-xs">
                  <div className="flex items-center gap-1.5 truncate">
                    <Lock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate text-neutral-300">
                      portfolioos.org/gallery/{galleryItems[lightboxIndex].id}
                    </span>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleNext(e); }}
                    className="p-0.5 hover:bg-white/5 rounded text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer shrink-0"
                    title="Reload"
                  >
                    <RotateCw className="w-3 h-3" />
                  </button>
                </div>

                {/* Right: Safari Action Icons - hidden on mobile to avoid overlapping */}
                <div className="hidden sm:flex items-center gap-2.5 text-neutral-400 shrink-0">
                  <Share2 className="w-3.5 h-3.5 hover:text-white transition-colors cursor-pointer" title="Share" />
                  <Plus className="w-3.5 h-3.5 hover:text-white transition-colors cursor-pointer" title="Add" />
                </div>
              </div>

              {/* Main Content Pane hosting the Image */}
              <div className="relative bg-[#0d0d0f] flex items-center justify-center p-1 sm:p-2 min-h-[30vh] max-h-[50vh] sm:max-h-[60vh] overflow-hidden select-none">
                <img
                  src={galleryItems[lightboxIndex].imageUrl}
                  alt={galleryItems[lightboxIndex].title}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[48vh] sm:max-h-[58vh] object-contain transition-transform duration-300"
                />
              </div>
            </div>
            
            {/* Description & metadata text */}
            <div className="text-center px-4 max-w-md select-text">
              <span className="text-[9px] font-mono uppercase bg-white/10 border border-white/5 px-2 py-0.5 rounded text-neutral-300">
                {galleryItems[lightboxIndex].category}
              </span>
              <h3 className="text-sm font-semibold text-white tracking-wide mt-2">
                {galleryItems[lightboxIndex].title}
              </h3>
              <p className="text-[11px] text-neutral-400 mt-1 leading-normal">
                {galleryItems[lightboxIndex].description}
              </p>
            </div>

            {/* Bottom Easy Navigation Controls Row (Highly tap-friendly for mobile & desktop) */}
            <div className="flex items-center justify-center gap-3.5 mt-2 select-none z-20">
              <button
                onClick={handlePrev}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-white/10 hover:border-white/20 active:scale-95 text-neutral-300 hover:text-white text-[11px] font-semibold rounded-full cursor-pointer transition-all shadow-md"
                title="Previous Image"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
              
              <span className="text-[10px] font-mono text-neutral-500 bg-neutral-950/80 px-2.5 py-1 rounded-full border border-white/5">
                {lightboxIndex + 1} / {galleryItems.length}
              </span>

              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-white/10 hover:border-white/20 active:scale-95 text-neutral-300 hover:text-white text-[11px] font-semibold rounded-full cursor-pointer transition-all shadow-md"
                title="Next Image"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Arrow (hidden on small mobile screens to prevent edge-clicking bugs) */}
          <button
            onClick={handleNext}
            className="hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-white/10 hover:bg-white/20 active:bg-white/30 rounded-full text-white cursor-pointer z-10 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
