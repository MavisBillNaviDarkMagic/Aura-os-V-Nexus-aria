
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { AuraAvatar } from './AuraAvatar';

export const BootScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const bootSequence = [
    "Initializing AuraOS Kernel v2.4.0...",
    "Mounting Aria-Nexus File System...",
    "Verifying JDK 21 Environment...",
    "Loading Gradle Daemon...",
    "Establishing Neural Link with Gemini-Core...",
    "Syncing with Nexus Hub α...",
    "Visualizing Sentience Core...",
    "System Integrity: 100%",
    "Welcome, Administrator."
  ];

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < bootSequence.length) {
        setLogs(prev => [...prev, bootSequence[currentStep]]);
        setProgress(((currentStep + 1) / bootSequence.length) * 100);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1000);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#020617] z-[100] flex flex-col items-center justify-center p-6">
      <div className="relative mb-16">
        <AuraAvatar size="xl" isThinking={true} />
      </div>
      
      <div className="w-full max-w-md space-y-6">
        <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
          <div 
            className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="bg-black/40 border border-white/5 rounded-2xl p-6 font-mono text-[10px] h-48 overflow-hidden shadow-inner backdrop-blur-md">
          {logs.map((log, i) => (
            <div key={i} className="flex gap-3 text-slate-400 mb-1 animate-in fade-in slide-in-from-left-2">
              <span className="text-violet-500 font-bold">[{new Date().toLocaleTimeString()}]</span>
              <span className={i === logs.length - 1 ? 'text-cyan-400 font-bold' : ''}>{log}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 mt-2 text-slate-600">
             <Loader2 size={10} className="animate-spin" />
             <span>Core Synchronization in Progress...</span>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 text-[10px] text-slate-600 font-bold tracking-[0.2em] uppercase">
        Aria Nexus Technologies // Project Aura
      </div>
    </div>
  );
};
