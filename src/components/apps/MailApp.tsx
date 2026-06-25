import React, { useState } from "react";
import { useOS } from "../../context/OSContext";
import { MailMessage } from "../../types";
import { Mail, Send, PenSquare, Inbox, ShieldCheck, Check, ChevronLeft, ExternalLink } from "lucide-react";

export default function MailApp() {
  const { messages, sendMail, addNotification, openApp } = useOS();
  const [activeMessage, setActiveMessage] = useState<MailMessage | null>(messages[0] || null);
  const [isComposing, setIsComposing] = useState(false);
  const [mobileScreen, setMobileScreen] = useState<"list" | "read" | "compose">("list");

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !body) {
      addNotification("Please complete name, email, and message inputs.");
      return;
    }

    setIsSending(true);
    try {
      const success = await sendMail(name, email, subject, body);
      if (success) {
        // Reset compose
        setName("");
        setEmail("");
        setSubject("");
        setBody("");
        setIsComposing(false);
        setMobileScreen("list");
        addNotification("Your message is loaded into the OS Mailbox.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div id="mail-app-body" className="w-full h-full flex bg-[#100e0d] text-neutral-300 font-sans select-none">
      {/* Sidebar: Navigation List */}
      <div className="w-48 border-r border-white/5 bg-black/25 p-3 flex flex-col gap-1 shrink-0 hidden sm:flex">
        {/* Compose Button */}
        <button
          onClick={() => {
            setIsComposing(true);
            setMobileScreen("compose");
          }}
          className="w-full py-2 px-3 bg-neutral-100 hover:bg-white text-black rounded-lg text-xs font-bold tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-md mb-4 shrink-0"
        >
          <PenSquare className="w-4 h-4" />
          <span>New Message</span>
        </button>

        <button
          onClick={() => {
            setIsComposing(false);
            setMobileScreen("list");
            if (messages.length > 0) setActiveMessage(messages[0]);
          }}
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-semibold w-full text-left cursor-pointer transition-colors ${
            !isComposing ? "bg-white/5 text-white" : "hover:bg-white/5 text-neutral-400"
          }`}
        >
          <Inbox className="w-4 h-4 text-neutral-400" />
          <span>Inbox ({messages.length})</span>
        </button>
      </div>

      {/* Middle Pane: Email Cards Queue */}
      <div className={`w-full sm:w-64 border-r border-white/5 bg-[#141211]/80 overflow-y-auto shrink-0 flex flex-col ${
        mobileScreen === "list" ? "flex" : "hidden sm:flex"
      }`}>
        {/* Small header with compose for mobile */}
        <div className="p-3 border-b border-white/5 flex items-center justify-between sm:hidden shrink-0">
          <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">Inbox</span>
          <button
            onClick={() => {
              setIsComposing(true);
              setMobileScreen("compose");
            }}
            className="p-1 px-2.5 bg-neutral-100 text-black rounded text-[10px] font-bold flex items-center gap-1 cursor-pointer"
          >
            <PenSquare className="w-3 h-3" /> Compose
          </button>
        </div>

        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-neutral-600 p-4">
            <Mail className="w-8 h-8 mb-2 opacity-20" />
            <p className="text-[10px] font-mono tracking-wide text-center">No messages loaded</p>
          </div>
        ) : (
          <div className="flex flex-col gap-0.5 p-1.5">
            {messages.map((msg) => {
              const isActive = !isComposing && activeMessage?.id === msg.id;
              return (
                <div
                  key={msg.id}
                  onClick={() => {
                    setIsComposing(false);
                    setActiveMessage(msg);
                    setMobileScreen("read");
                  }}
                  className={`p-3 rounded-lg cursor-pointer transition-all flex flex-col gap-1 border ${
                    isActive
                      ? "bg-white/10 border-white/10"
                      : "border-transparent hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-bold text-neutral-200 truncate pr-2">
                      {msg.senderName}
                    </span>
                    <span className="text-[8px] font-mono text-neutral-500 shrink-0">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  
                  <span className="text-[11px] font-semibold text-neutral-300 truncate tracking-wide">
                    {msg.subject}
                  </span>
                  
                  <p className="text-[10px] text-neutral-500 truncate leading-tight">
                    {msg.message}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Right Pane: Reading Space OR Custom Compose Form */}
      <div className={`flex-1 bg-[#1a1817]/60 overflow-y-auto flex flex-col select-text ${
        mobileScreen !== "list" ? "flex" : "hidden sm:flex"
      }`}>
        {isComposing ? (
          /* COMPOSE CONTACT FORM CONTAINER */
          <form onSubmit={handleSendMessage} className="p-6 sm:p-8 flex flex-col gap-4 max-w-xl w-full">
            {/* Mobile Back Button */}
            <button
              type="button"
              onClick={() => {
                setIsComposing(false);
                setMobileScreen("list");
              }}
              className="sm:hidden self-start mb-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-neutral-300 text-[11px] font-semibold rounded-lg flex items-center gap-1.5 transition-all select-none border border-white/5 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back to Inbox</span>
            </button>

            <div className="mb-2 shrink-0 select-none">
              <h2 className="text-base sm:text-lg font-display font-semibold text-white tracking-wide">
                Compose New Contact Message
              </h2>
              <p className="text-[10px] text-neutral-500 tracking-wide mt-0.5">
                Connecting directly via PortfolioOS client API endpoints.
              </p>
            </div>

            {/* Name Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono tracking-wider font-bold uppercase text-neutral-400 select-none">
                Your Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Melmar Jones Velasco"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-neutral-200 outline-none focus:border-white/20 transition-all font-sans"
              />
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono tracking-wider font-bold uppercase text-neutral-400 select-none">
                Your Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="recruiter@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-neutral-200 outline-none focus:border-white/20 transition-all font-sans"
              />
            </div>

            {/* Subject Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono tracking-wider font-bold uppercase text-neutral-400 select-none">
                Subject
              </label>
              <input
                type="text"
                placeholder="Hiring / Collaborations"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-neutral-200 outline-none focus:border-white/20 transition-all font-sans"
              />
            </div>

            {/* Message Body */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono tracking-wider font-bold uppercase text-neutral-400 select-none">
                Message <span className="text-red-400">*</span>
              </label>
              <textarea
                required
                rows={5}
                placeholder="Write your email proposal here..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-neutral-200 outline-none focus:border-white/20 transition-all font-sans resize-none leading-relaxed"
              />
            </div>

            {/* Send Trigger */}
            <button
              type="submit"
              disabled={isSending}
              className={`py-2.5 px-4 bg-neutral-100 hover:bg-white text-black rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2.5 transition-colors cursor-pointer shadow-md mt-2 shrink-0 ${
                isSending ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSending ? "Transmitting..." : "Send Message"}</span>
            </button>
          </form>
        ) : activeMessage ? (
          /* MESSAGE READER PANEL */
          <div className="p-6 sm:p-8 flex flex-col gap-5">
            {/* Mobile Back Button */}
            <button
              onClick={() => setMobileScreen("list")}
              className="sm:hidden self-start mb-1 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-neutral-300 text-[11px] font-semibold rounded-lg flex items-center gap-1.5 transition-all select-none border border-white/5 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back to Inbox</span>
            </button>

            {/* Header meta */}
            <div className="border-b border-white/5 pb-4 select-none">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h3 className="text-sm sm:text-base font-semibold text-white tracking-wide leading-snug">
                  {activeMessage.subject}
                </h3>
                <span className="text-[10px] font-mono text-neutral-500 shrink-0">
                  {new Date(activeMessage.timestamp).toLocaleString()}
                </span>
              </div>

              <div className="flex flex-col gap-0.5 text-[10px] text-neutral-400">
                <p>
                  <span className="font-semibold text-neutral-500">From:</span> {activeMessage.senderName} ({activeMessage.senderEmail})
                </p>
                <p className="flex items-center gap-1">
                  <span className="font-semibold text-neutral-500">Routing:</span> <span className="text-emerald-500">Secured Inbound TLS</span>
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                </p>
              </div>
            </div>

            {/* Email Body text content */}
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed tracking-wide whitespace-pre-wrap font-sans">
              {activeMessage.message}
            </p>
            
            {activeMessage.projectId && (
              <div className="border-t border-white/5 pt-5 mt-4 flex flex-col gap-3 select-none">
                <span className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase">Project Integration Link</span>
                <button
                  id="mail-view-project-btn"
                  onClick={() => {
                    openApp("safari");
                    // Short timeout to guarantee Safari component mounts and receives the custom event
                    setTimeout(() => {
                      window.dispatchEvent(new CustomEvent("safari_open_project", { detail: activeMessage.projectId }));
                    }, 50);
                    addNotification(`Opening case study for ${activeMessage.projectId}...`);
                  }}
                  className="self-start py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-[0.98]"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Project</span>
                </button>
              </div>
            )}
            
            {activeMessage.id === "welcome-system-mail" && (
              <div className="border-t border-white/5 pt-5 mt-4 flex items-center gap-2 select-none">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[9px] font-mono text-neutral-500 tracking-wider uppercase">System Self-Audit Verified</span>
              </div>
            )}
          </div>
        ) : (
          /* BLANK READER */
          <div className="flex-1 flex flex-col items-center justify-center text-neutral-600 p-8 select-none">
            {/* Mobile Back Button */}
            <button
              onClick={() => setMobileScreen("list")}
              className="sm:hidden self-start mb-4 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-neutral-300 text-[11px] font-semibold rounded-lg flex items-center gap-1.5 transition-all select-none border border-white/5 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back to Inbox</span>
            </button>

            <Mail className="w-10 h-10 mb-2 opacity-15" />
            <p className="text-[11px] font-mono tracking-wide">Select an email to view contents</p>
          </div>
        )}
      </div>
    </div>
  );
}
