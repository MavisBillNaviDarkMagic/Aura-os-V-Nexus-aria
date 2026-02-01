
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

const App: React.FC = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  
  const [config, setConfig] = useState<SystemConfig>(() => {
    const saved = localStorage.getItem('aura_nexus_config');
    return saved ? JSON.parse(saved) : {
      javaHome: '/usr/lib/jvm/java-21-openjdk-amd64',
      gradleHome: '/opt/gradle/gradle-8.5',
      gradleVersion: '8.5',
      javaVersion: '21.0.2',
      jvmOptions: '-Xmx4g -Xms1g -XX:+UseG1GC -XX:+UseStringDeduplication',
      environmentVariables: {
        'PATH': '$PATH:$JAVA_HOME/bin:$GRADLE_HOME/bin',
        'AURA_ENV': 'production',
        'NEXUS_MODE': 'advanced',
        'GRADLE_OPTS': '-Dorg.gradle.daemon=true -Dorg.gradle.parallel=true'
      }
    };
  });

  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: 18,
    ram: 45,
    disk: 32,
    uptime: '0d 0h 0m'
  });

  useEffect(() => {
    localStorage.setItem('aura_nexus_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const diff = Date.now() - start;
      const hours = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      
      setMetrics(prev => ({
        ...prev,
        cpu: Math.min(95, Math.max(5, prev.cpu + (Math.random() * 6 - 3))),
        ram: Math.min(85, Math.max(30, prev.ram + (Math.random() * 2 - 1))),
        uptime: `${hours}h ${mins}m ${secs}s`
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (isBooting) {
    return <BootScreen onComplete={() => setIsBooting(false)} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case View.DASHBOARD: return <Dashboard metrics={metrics} />;
      case View.SETTINGS: return <Settings config={config} onUpdate={setConfig} />;
      case View.TERMINAL: return <Terminal />;
      case View.AI_CORE: return <AICore config={config} />;
      case View.EVOLUTION: return <EvolutionCore />;
      default: return <Dashboard metrics={metrics} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden font-['Space_Grotesk'] selection:bg-violet-500/30">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-violet-900/10 rounded-full blur-[160px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-900/10 rounded-full blur-[160px] animate-pulse [animation-delay:2s]" />
      </div>

      <Sidebar currentView={currentView} setView={setCurrentView} />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-10 relative z-0 scrollbar-hide">
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="animate-in fade-in slide-in-from-left duration-500">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-white flex items-center gap-3">
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                AuraOS
              </span>
              <div className="h-2 w-2 rounded-full bg-emerald-400 aura-glow animate-pulse hidden md:block" />
              <span className="text-[10px] font-mono text-slate-500 bg-slate-900/80 border border-slate-700 px-3 py-1 rounded-full uppercase tracking-widest">
                Evolution Core
              </span>
            </h1>
            <p className="text-slate-400 mt-1 font-medium italic opacity-70 text-sm">Aria Nexus Authority Control</p>
          </div>
          
          <div className="flex items-center gap-4 glass p-2 px-4 rounded-2xl border-white/5 w-full md:w-auto justify-between md:justify-end">
             <div className="text-right">
                <div className="text-[10px] uppercase text-slate-500 font-bold tracking-tighter">Neural Link</div>
                <div className="text-sm text-cyan-400 font-mono font-bold">@TRANSCENDENT</div>
             </div>
             <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                <div className="relative">
                   <AuraAvatar size="sm" isThinking={false} />
                </div>
             </div>
          </div>
        </header>

        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20 md:pb-0">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
