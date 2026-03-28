"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const quickReplies = [
  "I need a construction quote",
  "Tell me about real estate services",
  "Track my project",
  "Consulting services info",
  "Building materials pricing",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Welcome to Henafek Homes! 👋 I'm your AI assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim() }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
      } else {
        setMessages((prev) => [
          ...prev, 
          { role: "assistant", content: "Sorry, I'm having trouble connecting to my brain. Please try again later." }
        ]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev, 
        { role: "assistant", content: "An unexpected error occurred. Please contact support." }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center glow-blue transition-all"
        style={{
          background: "linear-gradient(135deg, #00b4ff, #0066cc)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat"
      >
        {open ? <X size={24} color="white" /> : <MessageCircle size={24} color="white" />}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] glass overflow-hidden flex flex-col"
            style={{ height: "500px" }}
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center gap-3"
              style={{
                background: "linear-gradient(135deg, rgba(0,180,255,0.15), rgba(212,168,83,0.08))",
              }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-neon-blue)] to-[var(--color-neon-blue-dim)] flex items-center justify-center">
                <Bot size={20} color="white" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Henafek AI Assistant</h4>
                <span className="text-green-400 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                  Online
                </span>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === "user"
                      ? "bg-[var(--color-gold)]/20"
                      : "bg-[var(--color-neon-blue)]/20"
                  }`}>
                    {msg.role === "user" ? <User size={14} className="text-[var(--color-gold)]" /> : <Bot size={14} className="text-[var(--color-neon-blue)]" />}
                  </div>
                  <div
                    className={`max-w-[80%] p-3 rounded-xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[var(--color-neon-blue)]/20 text-white"
                        : "glass-sm text-gray-300"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-[var(--color-neon-blue)]/20 flex items-center justify-center">
                    <Bot size={14} className="text-[var(--color-neon-blue)]" />
                  </div>
                  <div className="glass-sm p-3 rounded-xl flex gap-1 items-center">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 bg-gray-400 rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 bg-gray-400 rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 bg-gray-400 rounded-full" />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Replies */}
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
              {quickReplies.map((reply, i) => (
                <button
                  key={i}
                  disabled={isTyping}
                  onClick={() => sendMessage(reply)}
                  className="text-xs px-3 py-1.5 rounded-full border border-[var(--color-neon-blue)]/30 text-[var(--color-neon-blue)] hover:bg-[var(--color-neon-blue)]/10 transition-colors whitespace-nowrap flex-shrink-0 disabled:opacity-50"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                disabled={isTyping}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder={isTyping ? "AI is thinking..." : "Type a message..."}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-neon-blue)]/50 disabled:opacity-50"
              />
              <button
                disabled={isTyping}
                onClick={() => sendMessage(input)}
                className="w-10 h-10 rounded-xl bg-gradient-to-r from-[var(--color-neon-blue)] to-[#0066cc] flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isTyping ? <Loader2 size={16} color="white" className="animate-spin" /> : <Send size={16} color="white" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
