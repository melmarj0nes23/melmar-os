import React, { useState, useEffect, useRef } from "react";
import { useOS } from "../../context/OSContext";
import { TerminalLog } from "../../types";
import { virtualFileSystem, getFSDirectoryContents, getFSNodeByPath } from "../../data/filesystem";

export default function TerminalApp() {
  const {
    terminalHistory,
    addTerminalLog,
    clearTerminalHistory,
    openApp,
    addNotification,
  } = useOS();

  const [inputVal, setInputVal] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isHacking, setIsHacking] = useState(false);
  const [isMatrix, setIsMatrix] = useState(false);
  const [currentDir, setCurrentDir] = useState("/"); // Virtual shell path

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of terminal when logs are appended
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [terminalHistory, isHacking, isMatrix]);

  // Capture focuses
  const focusTerminalInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    focusTerminalInput();
  }, []);

  const handleCommandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cmdStr = inputVal.trim();
    if (!cmdStr) return;

    // Log the user's prompt
    addTerminalLog({
      id: `input-${Date.now()}`,
      type: "input",
      text: `${currentDir === "/" ? "~" : currentDir} $ ${cmdStr}`,
    });

    // Store in historical input
    setCommandHistory((prev) => [...prev, cmdStr]);
    setHistoryIdx(-1);
    setInputVal("");

    const args = cmdStr.split(" ");
    const primaryCmd = args[0].toLowerCase();
    const cmdParam = args.slice(1).join(" ");

    // Parse commands
    switch (primaryCmd) {
      case "help":
        addTerminalLog({
          id: `out-h1`,
          type: "output",
          text: "Available commands:\n" +
                "  about            Read my professional bio introduction\n" +
                "  skills           List my developer technical skill sets\n" +
                "  projects         Outline my high-fidelity project cards\n" +
                "  experience       Details of previous software roles\n" +
                "  contact          Details of social handles and email channels\n" +
                "  ls               List directory nodes at the current path\n" +
                "  cat [filepath]   Print exact file contents\n" +
                "  cd [dir]         Shift current directory path\n" +
                "  open [app]       Launch applications (e.g. open vscode, open settings)\n" +
                "  sudo hire-me     Open an easter egg hire action trigger\n" +
                "  coffee           Output a warm comforting ASCII coffee break\n" +
                "  matrix           Toggle digital cosmic matrix green screen vectors\n" +
                "  hack             Run automated cyber telemetry console sweeps\n" +
                "  pwd              Print active directory path\n" +
                "  whoami           Show shell metadata details\n" +
                "  date             Display active local client timestamp\n" +
                "  clear            Purge console logs",
        });
        break;

      case "clear":
        clearTerminalHistory();
        break;

      case "pwd":
        addTerminalLog({ id: `out-${Date.now()}`, type: "output", text: currentDir === "/" ? "/ (Root Directory)" : currentDir });
        break;

      case "whoami":
        addTerminalLog({
          id: `out-${Date.now()}`,
          type: "output",
          text: "guest_visitor@portfolioos.org // Connected Port: 3000 Ingress Node // Security: Standard Read Access",
        });
        break;

      case "date":
        addTerminalLog({ id: `out-${Date.now()}`, type: "output", text: new Date().toString() });
        break;

      case "about":
        const aboutNode = getFSNodeByPath("/info/about.md");
        addTerminalLog({
          id: `out-about`,
          type: "output",
          text: aboutNode?.content || "Biographical notes are offline.",
        });
        break;

      case "skills":
        const frontNode = getFSNodeByPath("/skills/frontend.json");
        const backNode = getFSNodeByPath("/skills/backend.json");
        const toolNode = getFSNodeByPath("/skills/tools.json");
        addTerminalLog({
          id: `out-skills`,
          type: "output",
          text: `--- FRONTEND SKILLS ---\n${frontNode?.content || ""}\n` +
                `--- BACKEND SKILLS ---\n${backNode?.content || ""}\n` +
                `--- PLATFORMS & TOOLS ---\n${toolNode?.content || ""}`,
        });
        break;

      case "projects":
        addTerminalLog({
          id: `out-projects`,
          type: "output",
          text: "To browse projects fully, run 'open safari'. Here is a brief listing:\n" +
                "1. Melmar's Portfolio Builder [Real-time visual editor & template library]\n" +
                "2. URL-Kilatis Analyzer [AI website reviews & multi-category audits]\n" +
                "3. Bantay-Bills Manager [Premium cloud-synced bill tracker & planner]\n" +
                "4. TinginCV Optimizer [Automated resume ATS optimizer & simulation]",
        });
        break;

      case "experience":
        const resNode = getFSNodeByPath("/resume.txt");
        addTerminalLog({
          id: `out-experience`,
          type: "output",
          text: resNode?.content || "Resume log unavailable.",
        });
        break;

      case "contact":
        const contactNode = getFSNodeByPath("/info/contact.json");
        addTerminalLog({
          id: `out-contact`,
          type: "output",
          text: contactNode?.content || "Contact information offline.",
        });
        break;

      case "ls":
        const children = getFSDirectoryContents(currentDir);
        if (children.length === 0) {
          addTerminalLog({ id: `out-${Date.now()}`, type: "output", text: "(Directory is empty)" });
        } else {
          const formatted = children
            .map((c) => (c.type === "directory" ? `${c.name}/` : c.name))
            .join("    ");
          addTerminalLog({ id: `out-${Date.now()}`, type: "output", text: formatted });
        }
        break;

      case "cd":
        if (!cmdParam || cmdParam === "/") {
          setCurrentDir("/");
        } else if (cmdParam === "..") {
          setCurrentDir("/");
        } else {
          // Normalise name (e.g. cd info)
          const cleanName = cmdParam.replace("/", "");
          const targetPath = `/${cleanName}`;
          // Check if directory exists
          const exists = virtualFileSystem.some((n) => n.path.startsWith(targetPath) && n.type === "directory");
          if (exists) {
            setCurrentDir(targetPath);
          } else {
            addTerminalLog({ id: `err-${Date.now()}`, type: "error", text: `cd: no such file or directory: ${cmdParam}` });
          }
        }
        break;

      case "cat":
        if (!cmdParam) {
          addTerminalLog({ id: `err-${Date.now()}`, type: "error", text: "Usage: cat [filepath]" });
          break;
        }

        // Search flat file or relative path
        let targetFilePath = cmdParam;
        if (!cmdParam.startsWith("/")) {
          targetFilePath = currentDir === "/" ? `/${cmdParam}` : `${currentDir}/${cmdParam}`;
        }

        const fileNode = getFSNodeByPath(targetFilePath);
        if (fileNode && fileNode.type === "file") {
          addTerminalLog({ id: `out-${Date.now()}`, type: "output", text: fileNode.content || "" });
        } else {
          addTerminalLog({ id: `err-${Date.now()}`, type: "error", text: `cat: ${cmdParam}: No such file or directory` });
        }
        break;

      case "open":
        if (!cmdParam) {
          addTerminalLog({ id: `err-${Date.now()}`, type: "error", text: "Usage: open [app-name]" });
          break;
        }
        const appName = cmdParam.toLowerCase();
        const availableApps = ["finder", "vscode", "terminal", "safari", "mail", "gallery", "settings", "pdf"];
        if (availableApps.includes(appName) || appName === "resume.pdf") {
          const targetApp = appName === "resume.pdf" ? "pdf" : appName;
          openApp(targetApp);
          addTerminalLog({ id: `out-${Date.now()}`, type: "output", text: `Launching PDF Viewer for Melmar's Resume...` });
        } else {
          addTerminalLog({ id: `err-${Date.now()}`, type: "error", text: `open: '${cmdParam}' app registry target not found.` });
        }
        break;

      case "sudo":
        if (cmdParam.toLowerCase() === "hire-me") {
          addTerminalLog({
            id: `out-sudo-hire`,
            type: "output",
            text: "ACCESS GRANTED. Executing priority macro 'MelmarHired'...\n" +
                  "Booting Mail app compose dashboard...",
          });
          setTimeout(() => {
            openApp("mail");
            addNotification("Macro triggered! Sudo hired Melmar!");
          }, 800);
        } else {
          addTerminalLog({ id: `err-${Date.now()}`, type: "error", text: "sudo: permission denied. Access logs locked." });
        }
        break;

      case "coffee":
        addTerminalLog({
          id: `out-coffee`,
          type: "output",
          text: "       (  )   (  )\n" +
                "        ) (    ) (\n" +
                "       (  )   (  )\n" +
                "     .----------.\n" +
                "    /            \\  ( )\n" +
                "   |  PORTFOLIO   |==#\n" +
                "   |     OS       |\n" +
                "    \\            /\n" +
                "     '----------'\n" +
                "--- Fresh brewing finished. Enjoy your break! ---",
        });
        break;

      case "matrix":
        setIsMatrix((prev) => !prev);
        setIsHacking(false);
        break;

      case "hack":
        setIsHacking((prev) => !prev);
        setIsMatrix(false);
        break;

      default:
        addTerminalLog({
          id: `err-${Date.now()}`,
          type: "error",
          text: `sh: command not found: ${primaryCmd}. Type 'help' to review directory rules.`,
        });
        break;
    }
  };

  // Traversal of local history via Arrow keys
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIdx === -1 ? commandHistory.length - 1 : Math.max(0, historyIdx - 1);
      setHistoryIdx(nextIdx);
      setInputVal(commandHistory[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === -1) return;
      const nextIdx = historyIdx + 1;
      if (nextIdx >= commandHistory.length) {
        setHistoryIdx(-1);
        setInputVal("");
      } else {
        setHistoryIdx(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    }
  };

  const renderLogText = (text: string) => {
    const lines = text.split("\n");
    return (
      <div className="flex flex-col gap-0.5 w-full">
        {lines.map((line, idx) => {
          // Check if line looks like command definition "  cmd       desc"
          if (line.startsWith("  ")) {
            const trimmed = line.trim();
            const parts = trimmed.split(/\s{2,}/);
            if (parts.length >= 2) {
              const cmd = parts[0];
              const desc = parts.slice(1).join("  ");
              return (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 py-0.5 border-b border-white/[0.02] last:border-0 w-full"
                >
                  <span className="text-emerald-400 font-semibold w-full sm:w-[150px] shrink-0 font-mono select-all">
                    {cmd}
                  </span>
                  <span className="text-neutral-400 flex-1 leading-relaxed break-words">
                    {desc}
                  </span>
                </div>
              );
            }
          }

          // Render normal line of output
          return (
            <div key={idx} className="min-h-[1.2em] whitespace-pre-wrap break-words leading-relaxed">
              {line}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      id="terminal-app-body"
      className="w-full h-full bg-[#0a0808] p-4 font-mono text-[11px] sm:text-xs text-green-400 overflow-y-auto overflow-x-hidden flex flex-col gap-2 relative select-text"
      onClick={focusTerminalInput}
      ref={bodyRef}
    >
      {/* Matrix Overlay Mode */}
      {isMatrix && (
        <div className="absolute inset-0 bg-[#020202] text-green-500 overflow-hidden flex flex-col items-center justify-center pointer-events-none z-10 select-none opacity-90 p-6 leading-relaxed">
          <div className="animate-pulse flex flex-col items-center">
            <span className="text-sm font-bold tracking-widest text-emerald-400 mb-2">MATRIX MODE ACTIVATED</span>
            <p className="text-[10px] text-emerald-600 text-center">
              01001100 01101111 01100001 01100100 01101001 01101110 01100111...<br />
              Melmar Jones Velasco's code is pure, clean, and type-safe.<br />
              He is ready to integrate high-velocity fullstack features.<br />
              <br />
              Type "matrix" again in Terminal shell to exit.
            </p>
          </div>
        </div>
      )}

      {/* Cyber Hack Simulation Telemetry Overlay */}
      {isHacking && (
        <div className="absolute inset-0 bg-[#040303] text-red-500 overflow-hidden pointer-events-none z-10 select-none p-4 flex flex-col justify-start font-mono leading-relaxed text-[10px] opacity-90">
          <span className="text-red-400 font-bold mb-1 animate-pulse">RUNNING CORE THREAD SANITIZER SCANNER...</span>
          <div className="flex flex-col gap-0.5 animate-pulse text-red-600">
            <span>[info] checking process ports (3000 online)</span>
            <span>[info] verifying stack: React 19 + TypeScript + Node 22</span>
            <span>[info] syncing cloud storage modules...</span>
            <span>[warn] unauthorized resume downloading bypass detected</span>
            <span>[info] access override granted via sudo hired</span>
            <span>[info] ping packet response: 24ms (ingress stable)</span>
            <span>[info] type "hack" again in Terminal shell to exit.</span>
          </div>
        </div>
      )}

      {/* Normal Output logs list */}
      <div className="flex flex-col gap-1.5 w-full shrink-0">
        {terminalHistory.map((log) => (
          <div key={log.id} className="leading-relaxed tracking-wide w-full">
            {log.type === "input" ? (
              <div className="whitespace-pre-wrap break-words text-neutral-300 font-semibold">
                {log.text}
              </div>
            ) : log.type === "error" ? (
              <div className="whitespace-pre-wrap break-words text-red-400 font-medium">
                {log.text}
              </div>
            ) : (
              <div className="text-neutral-400 w-full">
                {renderLogText(log.text)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Active typing shell line */}
      <form onSubmit={handleCommandSubmit} className="flex items-start gap-1.5 shrink-0 select-none mt-2 w-full">
        <span className="text-neutral-200 font-bold shrink-0 whitespace-nowrap">
          {currentDir === "/" ? "~" : currentDir} $
        </span>
        <input
          ref={inputRef}
          type="text"
          className="terminal-input flex-1 min-w-0 bg-transparent border-none outline-none text-green-300 font-mono text-[11px] sm:text-xs tracking-wide p-0 caret-green-400 select-text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}
