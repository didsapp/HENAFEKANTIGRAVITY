"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Loader2, Send } from "lucide-react";
import { getClientThread, sendMessageAsClient } from "../portalActions";
import { useSession } from "next-auth/react";

export default function ClientMessagesPage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      const thread = await getClientThread();
      setMessages(thread);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    
    try {
      await sendMessageAsClient(input);
      setInput("");
      const thread = await getClientThread(); // Refresh
      setMessages(thread);
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) return <div className="h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin text-[var(--color-neon-blue)]" size={40} /></div>;

  return (
    <div className="space-y-8 h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <MessageSquare className="text-[var(--color-neon-blue)]" /> Direct Channel
        </h1>
        <p className="text-gray-400">Communicate directly with your designated Henafek Homes Administrator.</p>
      </div>

      <div className="glass flex-1 overflow-hidden flex flex-col border border-white/10 rounded-2xl bg-[var(--color-navy-950)]/50">
        <div className="p-4 border-b border-white/10 glass bg-transparent">
          <h3 className="font-bold text-white">Henafek Support</h3>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4">
          {messages.map((msg, i) => {
            const isMyMsg = msg.senderId === session?.user?.id;
            return (
              <div key={i} className={`flex ${isMyMsg ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl text-sm ${isMyMsg ? "bg-[var(--color-neon-blue)] text-white rounded-br-sm" : "bg-white/10 text-gray-200 rounded-bl-sm"}`}>
                  {msg.content}
                  <div className={`text-[9px] mt-1 ${isMyMsg ? "text-blue-200 text-right" : "text-gray-500"}`}>
                    {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              </div>
            );
          })}
          {messages.length === 0 && <div className="text-center text-gray-500 mt-10">Start a conversation with your project administrator here!</div>}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 bg-[var(--color-navy-900)]/80">
          <form onSubmit={handleSend} className="flex gap-2 max-w-4xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Write your message here..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-blue)] transition-colors"
            />
            <button type="submit" className="p-3 px-6 rounded-xl bg-[var(--color-neon-blue)] text-white hover:opacity-80 transition-opacity flex items-center gap-2 font-bold">
              Send <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
