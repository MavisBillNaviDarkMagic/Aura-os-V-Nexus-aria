
import React from 'react';
import { LayoutDashboard, Settings, Terminal as TerminalIcon, Cpu, ShieldAlert, Power, Sparkles } from 'lucide-react';
import { View } from '../types';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: View.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: View.SETTINGS, label: 'Settings', icon: Settings },
    { id: View.TERMINAL, label: 'Shell', icon: TerminalIcon },
    { id: View.AI_CORE, label: 'Aura AI', icon: Cpu },
    { id: View.EVOLUTION, label: 'Evolution', icon: Sparkles },
  ];

  return (
    <>
      {/* Mobile Top/Bottom Bar */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 h-20 glass rounded-[2rem] border border-white/10 z-[60] flex items-center justify-around px-4 shadow-2xl backdrop-blur-2xl">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col items-center gap-1 p-2 transition-all ${
              currentView === item.id ? 'text-violet-400 scale-110' : 'text-slate-500'
            }`}
          >
            <item.icon size={20} strokeWidth={currentView === item.id ? 2.5 : 2} />
            <span className="text-[9px] font-bold uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 glass border-r border-white/5 flex-col h-full z-10 p-8">
        <div className="flex items-center gap-4 px-2 mb-12">
          <div className="w-10 h-10 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center aura-glow">
            <ShieldAlert size={22} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tighter text-white">ARIA NEXUS</span>
            <span className="text-[10px] font-bold text-violet-400 uppercase tracking-widest opacity-80">Evolution Node</span>
          </div>
        </div>

        <nav className="space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                currentView === item.id
                  ? 'bg-gradient-to-r from-violet-600/20 to-transparent text-violet-300 border border-violet-500/20 shadow-lg shadow-violet-900/10'
                  : 'text-slate-400 hover:bg-white/[0.03] hover:text-slate-200'
              }`}
            >
              <item.icon size={22} className={currentView === item.id ? 'text-violet-400' : 'group-hover:text-slate-200'} />
              <span className="font-bold text-sm tracking-tight">{item.label}</span>
              {currentView === item.id && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-6">
          <div className="p-6 rounded-3xl bg-gradient-to-br from-violet-600/10 to-cyan-600/10 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/10 blur-2xl rounded-full -mr-12 -mt-12 group-hover:bg-violet-600/20 transition-all" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Sentience Sync</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium">Aura is projecting future-state optimizations.</p>
            </div>
          </div>
          
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center gap-3 text-rose-400 font-bold text-xs hover:bg-rose-500/20 transition-all active:scale-95"
          >
            <Power size={14} />
            REBOOT CORE
          </button>
        </div>
      </aside>
    </>
  );
};
