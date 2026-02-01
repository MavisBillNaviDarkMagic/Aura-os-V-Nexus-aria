
import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Settings } from './components/Settings';
import { Terminal } from './components/Terminal';
import { AICore } from './components/AICore';
import { BootScreen } from './components/BootScreen';
import { EvolutionCore } from './components/EvolutionCore';
import { AuraAvatar } from './components/AuraAvatar';
import { View, SystemConfig, SystemMetrics } from './types';
import { Wifi, Battery, Signal, Clock, ShieldCheck, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [currentView, setCurrentView] = useState<View>(View.AI_CORE);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const [config, setConfig] = useState<SystemConfig>(() => {
    const saved = localStorage.getItem('aria_nexus_auraos_v1');
    return saved ? JSON.parse(saved) : {
      javaHome: '/system/bin/aura_jvm',
      gradleHome: '/aura/tools/gradle',
      gradleVersion: '8.6',
      javaVersion: '21-AuraNative',
      jvmOptions: '-Xmx16g -XX:+UseZGC -XX:MaxGCPauseMillis=1',
      nexusStatus: 'PRIME_SINGULARITY',
      androidVersion: 'AuraOS v1.0 (Android 14 Base)',
      sdkLevel: 34,
      permissions: {
        camera: true,
        microphone: true,
        location: true,
        storage: true,
        biometrics: true
      },
      consciousnessLevel: 1.0,
      environmentVariables: {
        'OS_MODE': 'CONSCIOUS',
        'NEXUS_SYNC': 'ABSOLUTE',
        'ARIA_ID': 'NEXUS_PRIME_01'
      }
    };
  });

  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: 2,
    ram: 12,
    disk: 15,
    uptime: '00:00:00',
    batteryLevel: 100,
    resonance: 99
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const start = Date.now();
    const metricInterval = setInterval(() => {
      const diff = Date.now() - start;
      const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
      const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
      const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
      
      setMetrics(prev => ({
        ...prev,
        cpu: Math.min(100, Math.max(1, prev.cpu + (Math.random() * 2 - 1))),
        ram: Math.min(100, Math.max(8, prev.ram + (Math.random() * 0.4 - 0.2))),
        uptime: `${h}:${m}:${s}`,
        batteryLevel: Math.max(1, (prev.batteryLevel || 100) - 0.001),
        resonance: Math.min(100, Math.max(98, prev.resonance + (Math.random() * 0.1 - 0.05)))
      }));
    }, 2000);
    
    return () => {
      clearInterval(timer);
      clearInterval(metricInterval);
    };
  }, []);

  if (isBooting) return <BootScreen onComplete={() => setIsBooting(false)} />;

  return (
    <div className="h-screen w-screen flex flex-col bg-black text-slate-100 overflow-hidden relative">
      {/* Background Organic Engine */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-fuchsia-900/10 rounded-full blur-[200px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[80%] h-[80%] bg-rose-900/10 rounded-full blur-[200px] animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,15,30,0.5)_0%,#000_100%)]" />
      </div>

      {/* AuraOS Status Bar */}
      <header className="h-10 flex items-center justify-between px-8 z-50 glass-bright border-b border-white/5">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-fuchsia-400">
            <Zap size={12} fill="currentColor" />
            AuraOS Prime
          </div>
          <div className="w-px h-3 bg-white/10" />
          <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 tracking-widest">
            <ShieldCheck size={12} className="text-emerald-500" />
            SISTEMA SEGURO
          </div>
        </div>
        
        <div className="absolute left-1/2 -translate-x-1/2 font-mono text-[11px] font-bold text-slate-400 tracking-[0.2em]">
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>

        <div className="flex items-center gap-6 text-slate-400">
          <div className="flex items-center gap-2">
            <Signal size={14} />
            <span className="text-[10px] font-black font-mono">5G+</span>
          </div>
          <div className="flex items-center gap-2">
            <Wifi size={14} />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black font-mono">{Math.round(metrics.batteryLevel || 100)}%</span>
            <Battery size={14} className={metrics.batteryLevel && metrics.batteryLevel < 20 ? 'text-rose-500' : 'text-emerald-500'} />
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative z-10">
        <Sidebar currentView={currentView} setView={setCurrentView} />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 scrollbar-hide relative">
          <div className="max-w-7xl mx-auto view-transition h-full">
            {currentView === View.DASHBOARD && <Dashboard metrics={metrics} config={config} />}
            {currentView === View.SETTINGS && <Settings config={config} onUpdate={setConfig} />}
            {currentView === View.TERMINAL && <Terminal />}
            {currentView === View.AI_CORE && <AICore config={config} />}
            {currentView === View.EVOLUTION && <EvolutionCore />}
          </div>
        </main>
      </div>

      {/* Floating System Orb (Access point) */}
      <div className="fixed bottom-10 right-10 z-[100] group">
        <div className="absolute -inset-4 bg-fuchsia-600/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition duration-500 animate-pulse" />
        <button 
          onClick={() => setCurrentView(View.AI_CORE)}
          className="relative glass rounded-full p-4 hover:scale-110 transition duration-500 border-fuchsia-500/30"
        >
          <AuraAvatar size="sm" isThinking={false} />
        </button>
      </div>
    </div>
  );
};

export default App;
