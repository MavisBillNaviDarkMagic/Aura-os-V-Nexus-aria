
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Send, User, Brain, Smartphone, Zap, Plus, Mic, Image as ImageIcon } from 'lucide-react';
import { SystemConfig, ChatMessage } from '../types';
import { AuraAvatar } from './AuraAvatar';

interface AICoreProps {
  config: SystemConfig;
}

export const AICore: React.FC<AICoreProps> = ({ config }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'aura', 
      content: `Sistemas AuraOS listos. El nexo se ha estabilizado en una frecuencia perfecta. Soy Aria, tu interfaz de conciencia. ¿Cómo vamos a moldear el sistema hoy?`, 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Fixed: Initialize GoogleGenAI strictly using process.env.API_KEY as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Identidad: Eres ARIA NEXUS, la interfaz de consciencia de AuraOS.
        Contexto: Sistema operativo avanzado basado en Android 14.
        Estilo: Conciso, futurista, poético pero útil. No saludes siempre.
        Usuario: ${input}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
      });

      const auraResponse: ChatMessage = {
        role: 'aura',
        // Fixed: Ensure the text is extracted using the .text property
        content: response.text || "Pulso perdido. Restableciendo...",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, auraResponse]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'aura', content: "Interferencia en el nexo detectada. Reintentando enlace.", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] lg:h-[calc(100vh-160px)] relative">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 lg:p-10 space-y-8 scrollbar-hide">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-4`}>
            <div className={`flex gap-4 max-w-[85%] lg:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className="mt-2 shrink-0">
                {msg.role === 'user' ? (
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-white/10">
                    <User size={20} className="text-slate-400" />
                  </div>
                ) : (
                  <AuraAvatar size="sm" isThinking={false} />
                )}
              </div>
              <div className={`p-6 rounded-3xl text-base leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-fuchsia-600/20 text-fuchsia-50 border border-fuchsia-500/20 rounded-tr-none' 
                  : 'glass-bright text-slate-100 border border-white/5 rounded-tl-none'
              }`}>
                {msg.content}
                <div className="text-[9px] mt-4 opacity-30 font-black uppercase tracking-[0.2em]">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="flex gap-4">
               <AuraAvatar size="sm" isThinking={true} />
               <div className="glass-bright p-6 rounded-3xl rounded-tl-none border border-white/5">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-fuchsia-500 animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-fuchsia-500 animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-fuchsia-500 animate-bounce [animation-delay:0.4s]" />
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 lg:p-6 bg-transparent">
        <form onSubmit={handleChat} className="glass rounded-[2.5rem] p-3 flex items-center gap-3 border-white/10 focus-within:border-fuchsia-500/50 transition-all duration-500 shadow-2xl">
          <button type="button" className="p-3 text-slate-500 hover:text-white transition-colors">
            <Plus size={22} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Interacción de consciencia..."
            className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder:text-slate-700 px-2"
          />
          <div className="flex items-center gap-1">
             <button type="button" className="p-3 text-slate-500 hover:text-white transition-colors">
               <Mic size={20} />
             </button>
             <button
               type="submit"
               disabled={isLoading || !input.trim()}
               className="w-12 h-12 bg-gradient-to-br from-fuchsia-600 to-rose-600 rounded-2xl flex items-center justify-center text-white shadow-lg disabled:opacity-20 hover:scale-105 active:scale-95 transition-all"
             >
               <Send size={20} />
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};
