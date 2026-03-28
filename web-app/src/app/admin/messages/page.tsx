"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Loader2, Send } from "lucide-react";
import { getAllClientsWithMessages, getThread, sendMessageAsAdmin } from "../adminActions";
import { useSession } from "next-auth/react";

export default function AdminMessagesPage() {
  const { data: session } = useSession();
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    try {
      const data = await getAllClientsWithMessages();
      setClients(data);
      if (data.length > 0) {
        selectClient(data[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function selectClient(client: any) {
    setSelectedClient(client);
    try {
      const thread = await getThread(client.id);
      setMessages(thread);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || !selectedClient) return;
    
    try {
      await sendMessageAsAdmin(selectedClient.id, input);
      setInput("");
      const thread = await getThread(selectedClient.id);
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
          <MessageSquare className="text-[var(--color-neon-blue)]" /> Message Center
        </h1>
        <p className="text-gray-400">Communicate directly with clients.</p>
      </div>

      <div className="glass flex-1 overflow-hidden flex flex-col md:flex-row border border-white/10 rounded-2xl">
        {/* Sidebar */}
        <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 overflow-y-auto">
          {clients.map(client => (
            <button
              key={client.id}
              onClick={() => selectClient(client)}
              className={`w-full text-left p-4 flex items-center gap-4 transition-colors ${selectedClient?.id === client.id ? "bg-white/10 border-l-2 border-[var(--color-neon-blue)]" : "hover:bg-white/5"}`}
            >
              <div className="w-10 h-10 rounded-full bg-[var(--color-navy-800)] flex items-center justify-center text-[var(--color-gold)] font-bold">
                {client.name?.[0] || "?"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-white truncate">{client.name}</div>
                <div className="text-xs text-gray-500 truncate">Tap to View Thread</div>
              </div>
            </button>
          ))}
          {clients.length === 0 && <div className="p-4 text-center text-sm text-gray-500">No clients available.</div>}
        </div>

        {/* Chat Area */}
        <div className="md:w-2/3 flex flex-col h-full bg-[var(--color-navy-950)]/50">
          {selectedClient ? (
            <>
              {/* Header */}
              <div className="p-4 border-b border-white/10 glass bg-transparent">
                <h3 className="font-bold text-white">Chat with {selectedClient.name}</h3>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => {
                  const isAdminMsg = msg.senderId === session?.user?.id;
                  return (
                    <div key={i} className={`flex ${isAdminMsg ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${isAdminMsg ? "bg-[var(--color-neon-blue)] text-white rounded-br-sm" : "bg-white/10 text-gray-200 rounded-bl-sm"}`}>
                        {msg.content}
                        <div className={`text-[9px] mt-1 ${isAdminMsg ? "text-blue-200 text-right" : "text-gray-500"}`}>
                          {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {messages.length === 0 && <div className="text-center text-gray-500 mt-10">No messages yet. Send one to start the conversation!</div>}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/10 bg-[var(--color-navy-900)]/80">
                <form onSubmit={handleSend} className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-blue)] transition-colors"
                  />
                  <button type="submit" className="p-3 rounded-xl bg-[var(--color-neon-blue)] text-white hover:opacity-80 transition-opacity">
                    <Send size={20} />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a client to start chatting.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
