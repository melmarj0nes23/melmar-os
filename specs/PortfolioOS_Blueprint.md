# PortfolioOS - Complete Project Vision & Software Design Specification
*Version: 1.0.0*  
*Author: Lead Software Architect & Creative Director*  

---

## 1. Product Requirements Document (PRD)

### 1.1 Executive Summary
PortfolioOS is an immersive, interactive, desktop-inspired web application that reimagines the traditional portfolio. Instead of linear scrolling, visitors explore a highly polished, responsive operating system model featuring an active window manager, native-feeling utility apps (Finder, Terminal, VS Code, Safari, Mail, Gallery), dynamic customization, and smooth animations.

### 1.2 Target Audience & Goals
- **Recruiters & Tech Leads**: Need quick, frictionless access to resume details, skills, and projects, but also want to be highly impressed by frontend expertise.
- **Developers & Tech Enthusiasts**: Looking for advanced frontend patterns, terminal interactions, and attention to detail.
- **General Visitors**: Seeking an enjoyable, memorable interactive experience.

### 1.3 Scope of MVP (Minimum Viable Product)
- **Desktop Environment**: Desktop wallpaper, custom shortcuts, system Menu Bar, custom Dock, live clock, Wi-Fi and battery indicators, notification center, and Spotlight Search.
- **Window Manager**: Draggable, resizable, maximizable, minimizable, z-index ordered, focused, and persistent desktop windows.
- **Standard Applications**:
  - *Finder*: File explorer mapping portfolio categories (About, Projects, Skills, Contact).
  - *Safari*: Customized portfolio project browser showing screenshots and web previews.
  - *VS Code*: Integrated developer environment viewing source code, markdown, and configurations.
  - *Terminal*: Fully interactive command line supporting Unix-like commands and custom Easter eggs.
  - *Mail*: Functional contact form connecting to Express backend and featuring simulated/real inbox views.
  - *Gallery*: Image visualizer showing workstation details, hackathons, and certifications.
  - *Settings*: Wallpaper selection, light/dark themes, accent colors, dock positioning, and animation toggles.
- **Mobile Experience**: Transforms automatically into an iOS-inspired layout with full-screen app views, custom widget dashboard, and swipable actions.

### 1.4 Non-Functional Requirements
- **60 FPS Animations**: Leverage spring physics and GPU-accelerated transforms for ultra-smooth UI.
- **Fast First Contentful Paint**: Optimize initial bundle, defer heavy content loading.
- **Robust Type Safety**: Full TypeScript usage across client and server.
- **Local Storage Persistence**: Maintain window states, settings, and history on refresh.

---

## 2. User Personas

### 2.1 Rachel (Technical Recruiter)
- **Quote**: *"I review 50 portfolios a day. Show me what makes you unique in 10 seconds."*
- **Needs**: Clear links to resume, email, and projects. Simple navigation if she chooses to skip the "desktop experience" (handled via rapid Finder tabs and direct links).
- **Behavior**: Double-clicks on "Resume.pdf" on the desktop or searches "Resume" in Spotlight.

### 2.2 Tom (Engineering Manager / Tech Lead)
- **Quote**: *"I look for code quality, architectural foresight, and true engineering craft."*
- **Needs**: To inspect the developer's identity, technical choices, and coding style.
- **Behavior**: Opens VS Code to read `.ts` or `.json` files, runs advanced commands in Terminal, and looks at the file organization.

### 2.3 Maya (Creative Director)
- **Quote**: *"Design is how it works, feels, and interacts. Give me micro-interactions."*
- **Needs**: Seamless transitions, consistent typography, elegant color schemes, glassmorphic depths.
- **Behavior**: Tinkers with Settings (switching to Dark mode, tweaking accent colors, resizing the Dock).

---

## 3. User Journey

```
[ Booting Screen ] ──(Elegant Fade)──> [ Desktop OS View ]
                                              │
                      ┌───────────────────────┼────────────────────────┐
                      ▼                       ▼                        ▼
               [ Click Desktop Icon ]    [ Search Spotlight ]      [ Click Dock App ]
                      │                       │                        │
                      └───────────────────────┼────────────────────────┘
                                              ▼
                                    [ Window Opens / Focus ]
                                              │
                        ┌─────────────────────┴─────────────────────┐
                        ▼                                           ▼
             [ Browse Files & Apps ]                              [ Settings Adjust ]
         (Finder / Safari / VSCode / Mail)                      (Dark Mode / Wallpapers)
                        │                                           │
                        └─────────────────────┬─────────────────────┘
                                              ▼
                                    [ Key Action / Contact ]
                               (Mail send, resume download, socials)
```

---

## 4. UX Flow

1. **Boot Sequence**: 3-second minimal loading state displaying an elegant operating system logo and system initialization progress bar. Fades smoothly into the Desktop environment.
2. **App Launching**: Single-clicking or double-clicking an icon triggers a scale-fade expansion window animation. Dock icon bounces once during launching.
3. **Active Window Focus**: Clicking any part of a window brings it to the foreground (highest z-index), while other windows dim/blur subtly.
4. **Spotlight Search**: Pressing `Cmd + Space` (or `Ctrl + Space` on Windows) brings up an overlay input. Typing immediately filters results; pressing `Enter` opens the first match.
5. **System Notifications**: Events (e.g. system load, contact form sent, secrets unlocked) slide in from the top-right and clear after 4 seconds.

---

## 5. Information Architecture

### 5.1 System File Directory Structure (Simulated inside Finder & VS Code)
```
portfolio/
├── info/
│   ├── about.md          # Personal bio, education, background
│   └── contact.json      # Public email, social profiles, location
├── skills/
│   ├── frontend.json     # React, TypeScript, Tailwind, Next.js
│   ├── backend.json      # Node, Express, PostgreSQL, Firebase
│   └── tools.json        # Git, Docker, Figma, Vite
├── projects/
│   ├── project_1.md      # Detailed case study on Project 1
│   ├── project_2.md      # Detailed case study on Project 2
│   └── index.json        # Metadata list of all projects
└── resume/
    └── resume.pdf        # High-quality printable format
```

---

## 6. Software Architecture

PortfolioOS uses a modern, full-stack design built on **React 19**, **Vite**, and **Express**.

```
┌────────────────────────────────────────────────────────┐
│                      Web Browser                       │
│  ┌───────────────────────┐   ┌──────────────────────┐  │
│  │    Desktop View       │   │     Mobile iOS View  │  │
│  └───────────┬───────────┘   └───────────┬──────────┘  │
│              └─────────────┬─────────────┘             │
│                            ▼                           │
│                      [OSContext]                       │
│          (Window Manager & State Controller)           │
│                            │                           │
└────────────────────────────┼───────────────────────────┘
                             ▼ (Fetch API Requests)
┌────────────────────────────────────────────────────────┐
│                   Express API Server                   │
│  ┌───────────────────────┐   ┌──────────────────────┐  │
│  │   /api/contact route  │   │  /api/gemini route   │  │
│  └───────────────────────┘   └──────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

---

## 7. Folder Structure

```
/
├── .env.example
├── index.html
├── metadata.json
├── package.json
├── server.ts                 # Full-stack Express server entrypoint
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── types.ts              # Custom types and system interface declarations
│   ├── context/
│   │   └── OSContext.tsx     # OS global state management
│   ├── hooks/
│   │   └── useWindowDrag.ts  # Logic for window dragging and resizing
│   ├── components/
│   │   ├── system/
│   │   │   ├── BootScreen.tsx
│   │   │   ├── Desktop.tsx
│   │   │   ├── Dock.tsx
│   │   │   ├── MenuBar.tsx
│   │   │   ├── Window.tsx
│   │   │   └── NotificationCenter.tsx
│   │   └── apps/
│   │       ├── FinderApp.tsx
│   │       ├── SafariApp.tsx
│   │       ├── VSCodeApp.tsx
│   │       ├── TerminalApp.tsx
│   │       ├── MailApp.tsx
│   │       ├── GalleryApp.tsx
│   │       └── SettingsApp.tsx
│   └── data/
│       └── filesystem.ts     # Static files mapping (markdown, JSON, structures)
```

---

## 8. Component Hierarchy

```
<App>
 ├── <BootScreen /> (Unmounts when loaded)
 └── <OSProvider>
      └── <DesktopEnvironment>
           ├── <MenuBar />
           ├── <DesktopArea>
           │    ├── <DesktopIcon /> (Icons: Finder, Safari, Terminal, Resume, etc.)
           │    ├── <WindowContainer>
           │    │    └── <Window>
           │    │         └── <ActiveApp /> (FinderApp, SafariApp, VSCodeApp, etc.)
           │    └── <SpotlightSearch />
           ├── <Dock />
           └── <NotificationCenter />
```

---

## 9. Window Manager Architecture

The Window Manager acts as the orchestrator of all active user applications on the screen.

### 9.1 Window Schema Model
Each window is declared as an object in the window array:
```typescript
interface OSWindow {
  id: string;          // App unique ID (e.g. 'vscode', 'finder')
  title: string;       // Dynamic window title bar name
  isOpen: boolean;     // Rendered state
  isMinimized: boolean;// Toggled off screen, sits in Dock
  isMaximized: boolean;// Takes full desktop space
  zIndex: number;      // Current depth ordering
  x: number;           // Positioning coordinate
  y: number;           // Positioning coordinate
  width: number;       // Window sizing
  height: number;      // Window sizing
  minWidth?: number;
  minHeight?: number;
}
```

### 9.2 Core Actions
- `openWindow(id)`: Adds window to stack or resets `isOpen: true`, increments current max `zIndex` and applies it to focus the window.
- `closeWindow(id)`: Sets `isOpen: false`.
- `minimizeWindow(id)`: Sets `isMinimized: true`. Triggers scale-fade transition towards the corresponding Dock position.
- `maximizeWindow(id)`: Toggles `isMaximized` boolean.
- `focusWindow(id)`: Finds max active `zIndex`, assigns `max + 1` to target window, updating focus state immediately.

---

## 10. Application Architecture

To keep the codebase modular, all application panels inherit standardized properties and styles while housing their specialized content.

1. **Standardized Outer Frame (`<Window />`)**:
   - macOS-style top bar with close (red), minimize (yellow), maximize (green) buttons.
   - Draggable header handle.
   - Double-clicking header triggers maximize action.
   - Subtle outer shadow, rounded glassmorphic border (`backdrop-blur-md`).
2. **Specialized App Logic**:
   - *FinderApp*: Uses a grid and folder navigation hook. Keeps state of current directory path.
   - *VSCodeApp*: Renders custom file explorer layout on left panel, file-content viewer on right. Supports interactive editing or pseudo-git staging.
   - *TerminalApp*: Captures standard shell commands. Stores history arrays, processes command triggers, and displays response strings cleanly.
   - *SafariApp*: Includes web preview frame with bookmark tabs, back/forward cache state, and a custom search/address bar.

---

## 11. State Management Strategy

We use a unified React Context (`OSContext`) with an `OSProvider` to handle global desktop states:

- **Active Windows Stack**: Array of `OSWindow` elements.
- **Active App Identifier**: ID of the currently focused window.
- **System Settings**: Theme (light/dark/auto), Wallpaper index, Accent color (blue, green, graphite, amber), Dock alignment (bottom, left), Animation scaling.
- **Terminal Execution History**: To persist commands across terminal re-opens.
- **Spotlight Visibility**: Boolean state for key triggers.
- **Mail Contact Logs**: Queue of contact forms sent by the user during the current session.

---

## 12. Animation System

We use `motion` (imported from `motion/react`) for fluid transitions:

- **Dock Magnification**: Dynamic hover scale scaling based on mouse cursor distance.
- **Window Transitions**: Spring physics (`stiffness: 300, damping: 25`) for launching and minimizing.
- **Menu Bar Dropdowns**: Fade-in-down menus.
- **Workspace Switching / Wallpaper Transitions**: Dual layers fade smoothly when customization occurs.

---

## 13. Accessibility Plan

PortfolioOS will meet WCAG 2.1 compliance goals through proactive accessibility features:

- **Keyboard Focus Rings**: Visible outlines when tab-navigating through icons and window controls.
- **Escape Key Intercept**: Pressing `Escape` blurs active window or closes Spotlight Search instantly.
- **Aria Roles**: Appropriate `role="button"`, `role="menubar"`, `aria-haspopup`, and text descriptions on all iconic components.
- **Reduced Motion Toggle**: Available in System Settings, sets all animation durations to zero when enabled.

---

## 14. Performance Strategy

To ensure seamless execution:

- **Virtual File Registry**: Static text maps (no dynamic server file indexing overloads).
- **GPU Acceleration**: Always style moves/drags using `translate3d` (supported out-of-the-box by Tailwind and Framer Motion) to prevent heavy browser reflows.
- **Heavy Asset Deferral**: Wait for Boot Screen to finish before loading complex backgrounds or certificates.
- **State Partitioning**: Drag states and terminal inputs are managed locally within components to avoid triggering massive parent context re-renders.

---

## 15. Mobile Adaptation Strategy

On screens narrower than `768px`, the system enters **iOS Mode**:

- **Home Screen Layout**: Circular icons, rounded widgets (Time widget, Tech Stack widget, Quick Bio widget).
- **Navigation Dock**: Classic iOS bottom tray.
- **Fullscreen Windows**: Draggability and resizability are locked. Apps occupy 100% viewport width and height.
- **iOS Gestures**: Home sweep bar at the bottom to close apps; swipe gestures for smooth transitions.

---

## 16. Responsive Design Strategy

We apply responsive tailwind utilities:

- **Desktop Area Sizing**: Sized using `w-full h-[calc(100vh-2.5rem)]` (subtracting Menu Bar).
- **Adaptability Breakpoints**:
  - `sm`/`md`: Switch UI completely from macOS layout to iOS layout.
  - `lg`/`xl`: Adjust desktop grid column counts and default window starting positions.

---

## 17. Local Storage Strategy

The following entries are written to `localStorage`:

- `portfolio_os_settings`: Key-value configuration of user theme, wallpaper choice, accent colors, dock position.
- `portfolio_os_windows`: Keeps history of open, closed, or minimized applications and window shapes, restoring their layout upon browser re-entry.
- `portfolio_os_terminal_history`: Persists command history for technical visitors.

---

## 18. Backend Integration Plan

Our Express backend inside `server.ts` handles:

1. **Gemini AI API Proxy (`/api/gemini`)**:
   - Safely communicates with `@google/genai` using the server-side environment variable `GEMINI_API_KEY`.
   - Power user shell triggers (`gemini ask "your question"`) or an interactive AI assistant component.
2. **Contact Submission Endpoint (`/api/contact`)**:
   - Handles email/message submissions.
   - Logs incoming emails into the virtual Mail application dashboard in real time.

---

## 19. Development Milestones

```
┌────────────────────────────────────────────────────────┐
│               Milestones & Execution Sequence          │
├────────────────────────────────────────────────────────┤
│ Phase 1: Project Setup (Express server, global styles) │
│ Phase 2: Desktop & System Bar (Layout, Wallpapers)     │
│ Phase 3: Dock (Magnification, Springs)                 │
│ Phase 4: Window Manager (Draggable Core, focus stack)  │
│ Phase 5: Shell Terminal & Application Core             │
│ Phase 6: Application Implementation (Finder, VSCode)   │
│ Phase 7: Express API Integrations (Gemini & Mail API)  │
│ Phase 8: Custom settings & Local Storage               │
│ Phase 9: iOS Mobile Layout Adaptation                  │
│ Phase 10: Complete Optimization, lint & compilation     │
└────────────────────────────────────────────────────────┘
```

---

## 20. Feature Roadmap

- **V1.0.0 (Current)**: High-fidelity desktop mockup, standard apps, Express proxy, basic terminal commands, fully draggable system.
- **V1.1.0**: Custom retro skin settings (Classic MacOS Classic / Win95), live CPU/Memory utilization widget.
- **V1.2.0**: Collaborative guestbook application (multiplayer sync via basic state mechanisms).

---

## 21. Testing Strategy

- **Interactive Drag Boundaries**: Ensure windows cannot be dragged entirely off-screen or lost outside visible bounds.
- **Command Injection Safeguards**: Strict sanitization of parameters inside the Terminal processor.
- **Cross-Browser Verification**: Verified on Chrome, Safari, and Firefox.

---

## 22. Deployment Strategy

- Deployed using **Google Cloud Run** running node on port `3000`.
- Fast container start-up times by compiling `server.ts` into a consolidated, CJS bundle inside `/dist/server.cjs` via `esbuild`.

---

## 23. Future Enhancements

- **Portfolio Widget SDK**: Letting developer-minded recruiters drag-and-drop mini widgets onto the desktop surface.
- **Terminal Game Emulator**: Implement a lightweight JS-based game (e.g. Rogue or Snake) runnable inside Terminal app.

---
