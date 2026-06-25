/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface OSWindow {
  id: string;            // Unique app key (e.g. 'finder', 'vscode', 'terminal', 'safari', 'mail', 'gallery', 'settings', 'resume')
  title: string;         // Current text heading
  isOpen: boolean;       // Is rendering in the workspace
  isMinimized: boolean;  // Sits in Dock and is invisible on desktop
  isMaximized: boolean;  // Expands to cover full workspace area
  zIndex: number;        // Depth level for focus ordering
  x: number;             // X axis position on desktop in pixels
  y: number;             // Y axis position on desktop in pixels
  width: number;         // Sizing width in pixels
  height: number;        // Sizing height in pixels
  minWidth?: number;
  minHeight?: number;
}

export type OSAccentColor = "blue" | "amber" | "emerald" | "rose" | "slate";
export type OSDockPosition = "bottom" | "left" | "right";
export type OSTheme = "light" | "dark";

export interface OSSettings {
  theme: OSTheme;
  wallpaperIndex: number;
  accentColor: OSAccentColor;
  dockPosition: OSDockPosition;
  reducedMotion: boolean;
  glassEffect: boolean;
  blurIntensity: "low" | "medium" | "high";
  cornerRadius: "none" | "medium" | "large";
}

export interface FSNode {
  name: string;
  type: "file" | "directory";
  path: string;
  content?: string;
  icon?: string;
}

export interface TerminalLog {
  id: string;
  type: "input" | "output" | "error";
  text: string;
}

export interface MailMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  projectId?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: "workstation" | "hackathon" | "certifications" | "highlights";
  imageUrl: string;
  date: string;
}

export interface ProjectData {
  id: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  role: string;
  features: string[];
  screenshots?: string[];
}
