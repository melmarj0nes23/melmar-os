import React, { useState } from "react";
import { galleryItems, projectsData } from "../../data/filesystem";
import { GalleryItem } from "../../types";
import { Grid, Eye, X, ChevronLeft, ChevronRight, ZoomIn, Lock, RotateCw, Share2, Plus, Folder, ArrowLeft, Image as ImageIcon, Sparkles } from "lucide-react";

export default function GalleryApp() {
  const [viewMode, setViewMode] = useState<"albums" | "all">("albums");
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxItems, setLightboxItems] = useState<GalleryItem[]>(galleryItems);

  const categories = ["all", "workstation", "hackathon", "certifications", "highlights"];

  // Mapping project IDs to their respective image item ID prefixes
  const getAlbumItems = (projectId: string) => {
    const prefixMap: Record<string, string> = {
      "portfolio-builder": "port-builder-scr-",
      "url-kilatis": "url-kilatis-scr-",
      "bantay-bills": "bantay-bills-scr-",
      "tingin-cv": "tingin-cv-scr-"
    };
    const prefix = prefixMap[projectId];
    return prefix ? galleryItems.filter((item) => item.id.startsWith(prefix)) : [];
  };

  // Build the list of albums
  const albums = projectsData.map((project) => {
    const items = getAlbumItems(project.id);
    return {
      id: project.id,
      title: project.title,
      tagline: project.tagline,
      coverUrl: project.imageUrl || items[0]?.imageUrl,
      items: items,
      technologies: project.technologies
    };
  });

  // Flat filtering for "All Photos" view
  const filteredFlatItems = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const handleOpenLightbox = (item: GalleryItem, scope: GalleryItem[]) => {
    const idx = scope.findIndex((x) => x.id === item.id);
    if (idx !== -1) {
      setLightboxItems(scope);
      setLightboxIndex(idx);
    }
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && lightboxItems.length > 0) {
      setLightboxIndex((prev) => (prev! === 0 ? lightboxItems.length - 1 : prev! - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null && lightboxItems.length > 0) {
      setLightboxIndex((prev) => (prev! === lightboxItems.length - 1 ? 0 : prev! + 1));
    }
  };

  const activeAlbum = selectedAlbumId ? albums.find((a) => a.id === selectedAlbumId) : null;

  return (
    <div id="gallery-app-body" className="w-full h-full flex flex-col bg-[#0e0c0b] text-neutral-300 font-sans overflow-hidden select-none relative">
      
      {/* GALLERY TOP NAV CONTROLS */}
      <div className="w-full bg-[#141211] border-b border-white/5 p-3 sm:p-4 flex flex-col gap-3 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Folder className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-200">
              {selectedAlbumId && activeAlbum 
                ? `Gallery / Albums / ${activeAlbum.title}` 
                : "Portfolio Media Gallery"}
            </span>
          </div>

          {/* Toggle between Albums view and Flat all-photos view */}
          <div className="flex items-center bg-black/40 border border-white/5 p-1 rounded-xl shrink-0 self-center sm:self-auto">
            <button
              onClick={() => { setViewMode("albums"); setSelectedAlbumId(null); }}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === "albums"
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  : "text-neutral-500 hover:text-neutral-300 bg-transparent"
              }`}
            >
              <Folder className="w-3.5 h-3.5 hidden sm:block" />
              <span>Project Albums</span>
            </button>
            <button
              onClick={() => setViewMode("all")}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wider uppercase flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === "all"
                  ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                  : "text-neutral-500 hover:text-neutral-300 bg-transparent"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 hidden sm:block" />
              <span>All Photos</span>
            </button>
          </div>
        </div>

        {/* Sub-header Filter pill row (only visible in "All Photos" mode) */}
        {viewMode === "all" && (
          <div className="flex items-center gap-1.5 overflow-x-auto shrink-0 select-none pb-1 sm:pb-0 scrollbar-none">
            <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider mr-2 shrink-0">Filter:</span>
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
        )}
      </div>

      {/* MAIN CONTENT WORKSPACE */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        
        {/* ================= VIEW 1: ALBUMS VIEW ================= */}
        {viewMode === "albums" && !selectedAlbumId && (
          <div className="flex flex-col gap-6 max-w-5xl mx-auto">
            <div className="py-2 border-b border-white/5">
              <h2 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
                Case Study Media Albums
              </h2>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Explore dedicated screen collections segregated by each custom-architected application. Double click or tap an album to browse.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              {albums.map((album) => (
                <div
                  key={album.id}
                  onClick={() => setSelectedAlbumId(album.id)}
                  className="group flex flex-col gap-4 cursor-pointer bg-[#131110]/50 hover:bg-[#131110] border border-white/5 hover:border-white/10 p-4 rounded-2xl transition-all shadow-md hover:shadow-xl"
                >
                  {/* Folder / Album Sleeve Stack effect */}
                  <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-neutral-950 border border-white/5 shadow-inner">
                    
                    {/* Background Stack Sheets */}
                    <div className="absolute inset-0 bg-neutral-900 translate-y-[-4px] translate-x-[-4px] opacity-40 scale-[0.98] rounded-xl border border-white/5 transition-transform group-hover:translate-y-[-8px] group-hover:translate-x-[-8px]" />
                    <div className="absolute inset-0 bg-neutral-800 translate-y-[-2px] translate-x-[-2px] opacity-60 scale-[0.99] rounded-xl border border-white/5 transition-transform group-hover:translate-y-[-4px] group-hover:translate-x-[-4px]" />
                    
                    {/* Top Cover Image */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden bg-neutral-900 flex items-center justify-center">
                      <img
                        src={album.coverUrl}
                        alt={album.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Indicator of item count */}
                      <span className="absolute top-3 right-3 px-2.5 py-1 bg-black/75 backdrop-blur-md text-[10px] font-mono font-bold text-amber-400 rounded-lg border border-amber-500/20 flex items-center gap-1 shadow-md">
                        <ImageIcon className="w-3 h-3" />
                        {album.items.length} Images
                      </span>
                    </div>
                  </div>

                  {/* Album Info */}
                  <div className="flex flex-col gap-1.5 px-1">
                    <h3 className="text-sm font-bold text-neutral-100 group-hover:text-amber-400 transition-colors flex items-center justify-between">
                      <span>{album.title}</span>
                      <span className="text-[9px] font-mono bg-white/10 text-neutral-400 px-2 py-0.5 rounded uppercase tracking-wider">
                        Album
                      </span>
                    </h3>
                    <p className="text-[11px] text-neutral-400 leading-normal line-clamp-2">
                      {album.tagline}
                    </p>
                    
                    {/* Small tag line for tech stack */}
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {album.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-[8px] font-mono px-1.5 py-0.5 bg-neutral-900 border border-white/5 rounded text-neutral-500">
                          {tech}
                        </span>
                      ))}
                      {album.technologies.length > 3 && (
                        <span className="text-[8px] font-mono px-1.5 py-0.5 bg-neutral-900 text-neutral-500">
                          +{album.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= VIEW 2: SINGLE ALBUM DETAIL ================= */}
        {viewMode === "albums" && selectedAlbumId && activeAlbum && (
          <div className="flex flex-col gap-6 max-w-5xl mx-auto">
            {/* Header controls inside Album */}
            <div className="flex flex-col gap-4 pb-4 border-b border-white/5">
              <button
                onClick={() => setSelectedAlbumId(null)}
                className="flex items-center gap-2 self-start px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-lg text-xs font-semibold text-neutral-300 hover:text-white cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Albums</span>
              </button>

              <div>
                <span className="text-[9px] font-mono font-bold tracking-widest text-amber-500 uppercase">
                  PROJECT ALBUM ({activeAlbum.items.length} MEDIA LOGS)
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                  {activeAlbum.title}
                </h2>
                <p className="text-xs text-neutral-400 mt-1 max-w-2xl leading-relaxed">
                  {activeAlbum.tagline}
                </p>
              </div>
            </div>

            {/* Grid of items in this album */}
            {activeAlbum.items.length === 0 ? (
              <div className="h-48 flex items-center justify-center text-neutral-500">
                <p className="text-sm font-mono">No screenshots logged for this album yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {activeAlbum.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleOpenLightbox(item, activeAlbum.items)}
                    className="group relative bg-[#131110] border border-white/5 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all hover:border-white/15"
                  >
                    <div className="relative w-full h-44 overflow-hidden bg-neutral-900 border-b border-white/5">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-[#131110]/20 transition-all" />
                      <div className="absolute top-3 right-3 p-1.5 bg-black/60 backdrop-blur-md rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="w-3.5 h-3.5" />
                      </div>
                    </div>

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
        )}

        {/* ================= VIEW 3: FLAT ALL PHOTOS GRID ================= */}
        {viewMode === "all" && (
          <div className="max-w-5xl mx-auto">
            {filteredFlatItems.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-neutral-500">
                <p className="text-sm font-mono">No screenshots found in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredFlatItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleOpenLightbox(item, filteredFlatItems)}
                    className="group relative bg-[#131110] border border-white/5 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-all hover:border-white/15"
                  >
                    <div className="relative w-full h-44 overflow-hidden bg-neutral-900 border-b border-white/5">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-[#131110]/20 transition-all" />
                      <div className="absolute top-3 right-3 p-1.5 bg-black/60 backdrop-blur-md rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        <ZoomIn className="w-3.5 h-3.5" />
                      </div>
                    </div>

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
        )}
      </div>

      {/* LIGHTBOX MODAL OVERLAY (Context-aware navigation) */}
      {lightboxIndex !== null && lightboxItems.length > 0 && (
        <div
          onClick={handleCloseLightbox}
          className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center p-4 sm:p-8 z-[2000] select-text select-none cursor-zoom-out"
        >
          {/* Top closing control bar */}
          <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
            <span className="text-[10px] font-mono text-neutral-400">
              {lightboxIndex + 1} / {lightboxItems.length}
            </span>
            <button
              onClick={handleCloseLightbox}
              className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white cursor-pointer"
              title="Close Lightbox"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Left Arrow */}
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
                {/* Left: Window Controls (Red, Yellow, Green Mac Dots) */}
                <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                </div>

                {/* Left-Center: Navigation Arrows */}
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

                {/* Center: URL Bar Input Area */}
                <div className="flex-1 max-w-full sm:max-w-md bg-[#2c2c2e] border border-white/5 py-1 px-3 rounded-lg flex items-center justify-between text-neutral-400 gap-2 font-mono text-[10px] sm:text-xs">
                  <div className="flex items-center gap-1.5 truncate">
                    <Lock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate text-neutral-300">
                      portfolioos.org/gallery/{lightboxItems[lightboxIndex].id}
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

                {/* Right: Safari Action Icons */}
                <div className="hidden sm:flex items-center gap-2.5 text-neutral-400 shrink-0">
                  <Share2 className="w-3.5 h-3.5 hover:text-white transition-colors cursor-pointer" title="Share" />
                  <Plus className="w-3.5 h-3.5 hover:text-white transition-colors cursor-pointer" title="Add" />
                </div>
              </div>

              {/* Main Content Pane hosting the Image */}
              <div className="relative bg-[#0d0d0f] flex items-center justify-center p-1 sm:p-2 min-h-[30vh] max-h-[50vh] sm:max-h-[60vh] overflow-hidden select-none">
                <img
                  src={lightboxItems[lightboxIndex].imageUrl}
                  alt={lightboxItems[lightboxIndex].title}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[48vh] sm:max-h-[58vh] object-contain transition-transform duration-300"
                />
              </div>
            </div>
            
            {/* Description & metadata text */}
            <div className="text-center px-4 max-w-md select-text">
              <span className="text-[9px] font-mono uppercase bg-white/10 border border-white/5 px-2 py-0.5 rounded text-neutral-300">
                {lightboxItems[lightboxIndex].category}
              </span>
              <h3 className="text-sm font-semibold text-white tracking-wide mt-2">
                {lightboxItems[lightboxIndex].title}
              </h3>
              <p className="text-[11px] text-neutral-400 mt-1 leading-normal">
                {lightboxItems[lightboxIndex].description}
              </p>
            </div>

            {/* Bottom Easy Navigation Controls Row */}
            <div className="flex items-center justify-center gap-3.5 mt-2 select-none z-20">
              <button
                onClick={handlePrev}
                className="flex sm:hidden items-center gap-1.5 px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-white/10 hover:border-white/20 active:scale-95 text-neutral-300 hover:text-white text-[11px] font-semibold rounded-full cursor-pointer transition-all shadow-md"
                title="Previous Image"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
              
              <span className="text-[10px] font-mono text-neutral-400 bg-neutral-950/80 px-2.5 py-1 rounded-full border border-white/5">
                {lightboxIndex + 1} / {lightboxItems.length}
              </span>

              <button
                onClick={handleNext}
                className="flex sm:hidden items-center gap-1.5 px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-white/10 hover:border-white/20 active:scale-95 text-neutral-300 hover:text-white text-[11px] font-semibold rounded-full cursor-pointer transition-all shadow-md"
                title="Next Image"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Arrow */}
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
