'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Paperclip, User, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/client';

export default function LiveChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [inputText, setInputText] = useState('');
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [isTyping, setIsTyping] = useState(false);
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Persist session
    useEffect(() => {
        const savedSession = localStorage.getItem('elefriends_chat_session');
        if (savedSession) setSessionId(savedSession);
    }, []);

    useEffect(() => {
        if (sessionId) {
            localStorage.setItem('elefriends_chat_session', sessionId);
            // Fetch existing messages
            const fetchExisting = async () => {
                const { data } = await supabase
                    .from('chat_messages')
                    .select('*')
                    .eq('session_id', sessionId)
                    .order('created_at', { ascending: true });
                if (data) setMessages(data);
            };
            fetchExisting();
        }
    }, [sessionId]);

    // Initial greeting if no chat is started
    useEffect(() => {
        if (!sessionId && messages.length === 0) {
            setMessages([
                { id: 'greeting', sender_type: 'agent', content: 'Hi there! 👋 How can we help you plan your safari today?', created_at: new Date().toISOString() }
            ]);
        }
    }, [sessionId]);

    // Scroll to bottom when messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    // Subscribe to messages if we have a session
    useEffect(() => {
        if (!sessionId) return;
        
        const channel = supabase
            .channel(`chat_${sessionId}`)
            .on('postgres_changes', 
                { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `session_id=eq.${sessionId}` },
                (payload) => {
                    const newMsg = payload.new;
                    // Don't duplicate if we just sent it
                    setMessages(prev => {
                        if (prev.find(m => m.id === newMsg.id)) return prev;
                        return [...prev, newMsg];
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [sessionId]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const content = inputText.trim();
        setInputText('');
        setSending(true);

        try {
            let activeSessionId = sessionId;

            // Optional: Create session on first message physically sent to Supabase
            if (!activeSessionId) {
                // For simplicity, we create a visitor ID on the fly
                // We could use localstorage to remember them
                const visitorId = "visitor_" + Math.random().toString(36).substr(2, 9);
                
                const { data: sessionData, error: sessionError } = await supabase
                    .from('chat_sessions')
                    .insert({ visitor_id: visitorId, visitor_name: 'Guest' })
                    .select()
                    .single();
                
                if (sessionError) throw sessionError;
                activeSessionId = sessionData.id;
                setSessionId(activeSessionId);
            }

            // Push to db
            const { data: newMsg, error } = await supabase
                .from('chat_messages')
                .insert({
                    session_id: activeSessionId,
                    sender_type: 'visitor',
                    content: content
                })
                .select()
                .single();
                
            if (error) throw error;

            // Manually add to list if subscription hasn't caught it yet
            if (newMsg) {
                setMessages(prev => {
                    if (prev.find(m => m.id === newMsg.id)) return prev;
                    return [...prev, newMsg];
                });
            }
            
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white w-[350px] shadow-2xl rounded-[2rem] border border-gray-100 overflow-hidden mb-6 flex flex-col h-[500px]"
                    >
                        {/* Header */}
                        <div className="bg-[#0b1315] p-5 flex items-center justify-between text-white border-b border-white/10 shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 overflow-hidden border-2 border-emerald-500/20">
                                        <Image 
                                            src="/img/agent_avatar.png" 
                                            alt="Live Agent" 
                                            width={40} 
                                            height={40} 
                                            className="object-cover"
                                        />
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0b1315] rounded-full" />
                                </div>
                                <div>
                                    <h3 className="font-black text-sm uppercase tracking-wider leading-tight">Live Support</h3>
                                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-0.5">We typically reply in minutes</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Chat Body */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/50 custom-scrollbar">
                            {messages.map((msg, idx) => (
                                <div 
                                    key={msg.id || idx} 
                                    className={`flex items-end gap-2 ${msg.sender_type === 'visitor' ? 'flex-row-reverse' : 'flex-row'}`}
                                >
                                    {msg.sender_type === 'agent' && (
                                        <div className="w-6 h-6 rounded-full overflow-hidden border border-emerald-500/10 shrink-0 mb-1">
                                            <Image 
                                                src="/img/agent_avatar.png" 
                                                alt="Agent" 
                                                width={24} 
                                                height={24} 
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                    <div 
                                        className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
                                            msg.sender_type === 'visitor' 
                                                ? 'bg-emerald-500 text-white rounded-2xl rounded-tr-[4px]' 
                                                : 'bg-white text-gray-700 border border-gray-100 shadow-sm rounded-2xl rounded-tl-[4px]'
                                        }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex items-end gap-2">
                                    <div className="w-6 h-6 rounded-full overflow-hidden border border-emerald-500/10 shrink-0 mb-1">
                                        <Image 
                                            src="/img/agent_avatar.png" 
                                            alt="Agent" 
                                            width={24} 
                                            height={24} 
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="bg-white border border-gray-100 shadow-sm px-4 py-3 rounded-2xl rounded-tl-[4px] flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                            <form 
                                onSubmit={handleSendMessage}
                                className="flex items-center gap-2 bg-gray-50 rounded-2xl p-1.5 border border-gray-200 focus-within:border-emerald-500 focus-within:shadow-sm transition-all"
                            >
                                <button type="button" className="p-2 text-gray-400 hover:text-emerald-500 transition-colors">
                                    <Paperclip className="w-4 h-4" />
                                </button>
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    placeholder="Type your message..."
                                    className="flex-1 bg-transparent border-none focus:outline-none text-sm font-medium text-gray-700 placeholder:font-medium placeholder:text-gray-400 px-2"
                                />
                                <button 
                                    type="submit"
                                    disabled={!inputText.trim() || sending}
                                    className="p-2.5 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 disabled:opacity-50 disabled:hover:bg-emerald-500 transition-colors"
                                >
                                    {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Action Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-[2rem] shadow-2xl flex items-center justify-center transition-colors duration-300 ${
                    isOpen ? 'bg-[#0b1315] text-white hover:bg-gray-900 border border-white/10' : 'bg-emerald-500 text-white hover:bg-emerald-600'
                }`}
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
                
                {/* Notification dot */}
                {!isOpen && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    </span>
                )}
            </motion.button>
        </div>
    );
}
