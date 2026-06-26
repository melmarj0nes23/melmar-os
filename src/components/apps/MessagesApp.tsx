import React, { useState, useEffect, useRef } from "react";
import { db, handleFirestoreError, OperationType } from "../../lib/firebase";
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  onSnapshot, 
  serverTimestamp 
} from "firebase/firestore";
import { Send, MessageSquare, AlertCircle, Sparkles, User, Loader2, ArrowDown } from "lucide-react";
import { useOS } from "../../context/OSContext";
import { motion } from "motion/react";

interface Message {
  id: string;
  name: string;
  message: string;
  timestamp: any;
  color?: string;
  emoji?: string;
}

const PRESET_COLORS = [
  { name: "Sky Blue", value: "from-sky-500/20 to-blue-500/10 border-sky-500/30 text-sky-300" },
  { name: "Rose Pink", value: "from-rose-500/20 to-pink-500/10 border-rose-500/30 text-rose-300" },
  { name: "Emerald Green", value: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-300" },
  { name: "Amber Orange", value: "from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-300" },
  { name: "Amethyst Purple", value: "from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-300" },
];

const PRESET_EMOJIS = ["💬", "🚀", "💡", "🎨", "💻", "🦊", "🌟", "🔥", "✨", "🍕", "🧁", "🎧"];

export default function MessagesApp() {
  const { addNotification } = useOS();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0].value);
  const [selectedEmoji, setSelectedEmoji] = useState(PRESET_EMOJIS[0]);
  const [nameError, setNameError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"write" | "messages">("messages");

  const listEndRef = useRef<HTMLDivElement>(null);

  // Load name from localStorage so returning visitors don't have to re-type it
  useEffect(() => {
    const savedName = localStorage.getItem("guestbook_name");
    if (savedName) {
      setName(savedName);
    }
  }, []);

  // Set up real-time listener to Firestore collection
  useEffect(() => {
    const messagesCollection = collection(db, "messages");
    const q = query(messagesCollection, orderBy("timestamp", "asc"), limit(100));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const msgsList: Message[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          msgsList.push({
            id: doc.id,
            name: data.name || "Anonymous",
            message: data.message || "",
            timestamp: data.timestamp,
            color: data.color || PRESET_COLORS[0].value,
            emoji: data.emoji || "💬",
          });
        });
        setMessages(msgsList);
        setLoading(false);
        // Scroll to bottom when new messages arrive
        setTimeout(() => {
          listEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      },
      (error) => {
        console.error("Firestore sync error:", error);
        addNotification("Failed to connect to messages channel");
        setLoading(false);
        try {
          handleFirestoreError(error, OperationType.GET, "messages");
        } catch (e) {
          // Logged inside helper
        }
      }
    );

    return () => unsubscribe();
  }, [addNotification]);

  // Handle name input validation (strict alphabet restriction)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const originalValue = e.target.value;
    // Strip everything except letters and single whitespace sequences
    const cleaned = originalValue.replace(/[^A-Za-z\s]/g, "");
    setName(cleaned);

    if (originalValue !== cleaned) {
      setNameError("Only letters (A-Z, a-z) and spaces are allowed.");
    } else {
      setNameError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedText = text.trim();

    if (!trimmedName) {
      setNameError("Name is required to post a message.");
      return;
    }

    if (/[^A-Za-z\s]/.test(trimmedName)) {
      setNameError("Name must contain letters and spaces only.");
      return;
    }

    if (!trimmedText) {
      return;
    }

    setSubmitting(true);
    try {
      // Save visitor name locally for convenience
      localStorage.setItem("guestbook_name", trimmedName);

      await addDoc(collection(db, "messages"), {
        name: trimmedName,
        message: trimmedText,
        timestamp: serverTimestamp(),
        color: selectedColor,
        emoji: selectedEmoji,
      });

      setText("");
      setNameError("");
      addNotification("Your message was posted successfully!");
      setActiveTab("messages");
      setTimeout(scrollToBottom, 150);
    } catch (err) {
      console.error("Error adding message:", err);
      addNotification("Could not post message. Please try again.");
      try {
        handleFirestoreError(err, OperationType.WRITE, "messages");
      } catch (e) {
        // Logged inside helper
      }
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToBottom = () => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col h-full bg-[#0c0a09] text-neutral-100 select-text overflow-hidden font-sans">
      {/* Mobile view Tab Bar (visible on mobile only) */}
      <div className="flex md:hidden bg-[#141211] border-b border-white/10 shrink-0 p-2 gap-2 z-10">
        <button
          type="button"
          onClick={() => setActiveTab("messages")}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === "messages"
              ? "bg-rose-500 text-white shadow-md shadow-rose-950/40"
              : "bg-[#1c1917] text-neutral-400 hover:text-neutral-200"
          }`}
        >
          View Messages ({messages.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("write")}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
            activeTab === "write"
              ? "bg-rose-500 text-white shadow-md shadow-rose-950/40"
              : "bg-[#1c1917] text-neutral-400 hover:text-neutral-200"
          }`}
        >
          Write Message
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row min-h-0 h-full overflow-hidden">
        {/* 1. Sidebar - Input Form & Personalization Controls */}
        <div className={`w-full md:w-80 shrink-0 bg-[#161413]/70 border-b md:border-b-0 md:border-r border-white/10 p-5 flex flex-col justify-between overflow-y-auto ${
          activeTab === "write" ? "flex" : "hidden md:flex"
        }`}>
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight leading-tight">
                Leave a Message
              </h2>
              <p className="text-[11px] text-neutral-400 mt-1.5 leading-relaxed">
                Your message will sync instantly to all other visitors in real-time. Drop a greeting, a design feedback, or just say hello!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div>
                <label htmlFor="visitor-name" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5 font-mono">
                  Your Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="visitor-name"
                    type="text"
                    maxLength={30}
                    value={name}
                    onChange={handleNameChange}
                    placeholder="e.g. Melmar Jones"
                    className="w-full bg-[#1c1917]/90 border border-white/10 rounded-xl px-3.5 py-2.5 text-[16px] sm:text-xs text-white placeholder-neutral-500 outline-none focus:border-rose-500/50 transition-all duration-200"
                    required
                  />
                  <User className="absolute right-3.5 top-3 w-4 h-4 text-neutral-500 pointer-events-none" />
                </div>
                {nameError ? (
                  <p className="text-[10px] text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {nameError}
                  </p>
                ) : (
                  <p className="text-[9px] text-neutral-500 mt-1 font-mono">
                    English letters & spaces only. No numbers/symbols.
                  </p>
                )}
              </div>

              {/* Message Input */}
              <div>
                <label htmlFor="visitor-message" className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5 font-mono">
                  Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="visitor-message"
                  maxLength={400}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write your greeting..."
                  rows={3}
                  className="w-full bg-[#1c1917]/90 border border-white/10 rounded-xl px-3.5 py-2.5 text-[16px] sm:text-xs text-white placeholder-neutral-500 outline-none focus:border-rose-500/50 transition-all duration-200 resize-none"
                  required
                />
              </div>

              {/* Color Accent Picker */}
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2 font-mono">
                  Bubble Color Accent
                </span>
                <div className="flex gap-2">
                  {PRESET_COLORS.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      title={color.name}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-6 h-6 rounded-full border transition-all duration-200 cursor-pointer ${
                        color.value.split(" ")[0].replace("from-", "bg-").replace("/20", "")
                      } ${
                        selectedColor === color.value 
                          ? "ring-2 ring-white scale-110 border-white/50" 
                          : "border-white/10 opacity-70 hover:opacity-100"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Avatar Emoji Selector */}
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2 font-mono">
                  Choose Emoji Avatar
                </span>
                <div className="grid grid-cols-6 gap-1.5 bg-[#1c1917]/50 p-2 rounded-xl border border-white/5">
                  {PRESET_EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`text-base h-8 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer hover:bg-white/5 ${
                        selectedEmoji === emoji 
                          ? "bg-white/10 scale-110 border border-white/20" 
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || !name.trim() || !text.trim() || !!nameError}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-950/40 hover:shadow-rose-950/60 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Drop Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* 2. Messages Board list */}
        <div className={`flex-1 flex flex-col h-full bg-[#090807] overflow-hidden relative ${
          activeTab === "messages" ? "flex" : "hidden md:flex"
        }`}>
          <div className="p-4 bg-[#110f0e]/50 border-b border-white/5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-neutral-300" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-[#090807] animate-pulse" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-neutral-200">Global Channel</h3>
                <p className="text-[10px] text-neutral-500 font-mono">
                  {messages.length} messages received
                </p>
              </div>
            </div>

            <button 
              onClick={scrollToBottom}
              className="p-1.5 hover:bg-white/5 rounded-lg text-neutral-400 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-[10px] font-mono"
              title="Scroll to bottom"
            >
              Latest <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* List Body */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
                <p className="text-xs font-mono text-neutral-500">Connecting to global boards...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-500 text-xl">
                  📬
                </div>
                <div>
                  <p className="text-sm font-bold text-neutral-200">No messages yet</p>
                  <p className="text-xs text-neutral-500 max-w-xs mt-1">
                    Be the very first visitor to drop an instant live message on Melmar's portfolio!
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3.5">
                {messages.map((msg, index) => {
                  const formattedTime = msg.timestamp
                    ? new Date(msg.timestamp.seconds * 1000).toLocaleString([], {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Syncing...";

                  return (
                    <motion.div
                      key={msg.id}
                      id={`msg-card-${msg.id}`}
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.4) }}
                      className={`bg-gradient-to-br ${msg.color || PRESET_COLORS[0].value} border p-4 rounded-2xl flex flex-col justify-between space-y-3 shadow-lg backdrop-blur-sm w-full min-w-0`}
                    >
                      <div className="flex items-start justify-between gap-2.5 min-w-0 w-full">
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          <span className="text-xl shrink-0 select-none">{msg.emoji || "💬"}</span>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-bold text-white truncate pr-1">
                              {msg.name}
                            </h4>
                            <span className="text-[9px] font-mono text-neutral-400 block mt-0.5">
                              {formattedTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-xs text-neutral-200 leading-relaxed font-normal whitespace-pre-wrap break-words">
                        {msg.message}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            )}
            <div ref={listEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
