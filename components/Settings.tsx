
import React, { useState } from 'react';
import { Save, RefreshCw, Terminal as TermIcon, Smartphone, Variable, Zap, ShieldCheck, Eye, Mic, MapPin, Camera } from 'lucide-react';
import { SystemConfig } from '../types';

interface SettingsProps {
  config: SystemConfig;
  onUpdate: (config: SystemConfig) => void;
}

export const Settings: React.FC<SettingsProps> = ({ config, onUpdate }) => {
  const [localConfig, setLocalConfig] = useState(config);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSave = () => {
    setIsSyncing(true);
    setTimeout(() => {
      onUpdate(localConfig);
      setIsSyncing(false);
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
      <div className="xl:col-span-3 space-y-8">
        <div className="glass p-12 rounded-[3.5rem] relative overflow-hidden shadow-2xl border-white/5">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-fuchsia-600/5 blur-[150px] -z-10" />
          
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-3xl font-black flex items-center gap-5 text-white">
                <Smartphone size={32} className="text-fuchsia-500" />
                Matriz de Configuración Prime
              </h3>
              <p className="text-slate-500 text-base mt-2 font-medium">Arquitectura: {localConfig.androidVersion} | SDK {localConfig.sdkLevel}</p>
            </div>
            <button 
              onClick={handleSave}
              disabled={isSyncing}
              className="px-8 py-4 bg-gradient-to-r from-fuchsia-600 to-rose-600 hover:from-fuchsia-500 hover:to-rose-500 text-white rounded-3xl font-black flex items-center gap-4 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 shadow-2xl aura-glow"
            >
              {isSyncing ? <RefreshCw className="animate-spin" size={20} /> : <Save size={20} />}
              {isSyncing ? 'SINCRONIZANDO...' : 'APLICAR CAMBIOS VITALES'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <label className="block group">
                <span className="text-[11px] font-black text-slate-500 uppercase mb-3 block tracking-[0.3em] group-hover:text-fuchsia-400 transition-colors">RUTA JAVA_HOME (ANDROID JDK)</span>
                <input 
                  type="text" 
                  value={localConfig.javaHome}
                  onChange={(e) => setLocalConfig({...localConfig, javaHome: e.target.value})}
                  className="w-full bg-slate-950/80 border border-white/10 rounded-3xl px-8 py-5 text-sm font-mono text-fuchsia-50 focus:border-fuchsia-500/50 outline-none transition-all focus:ring-[12px] focus:ring-fuchsia-500/5 shadow-inner"
                />
              </label>
              <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 space-y-4 shadow-inner">
                <div className="flex justify-between text-xs font-bold">
                   <span className="text-slate-500">RUNTIME DETECTADO:</span>
                   <span className="text-fuchsia-300 font-mono">ART (Android Runtime) 14.0</span>
                </div>
                <div className="flex justify-between text-xs font-bold">
                   <span className="text-slate-500">COMPILACIÓN:</span>
                   <span className="text-fuchsia-300 font-mono">LTS Optimised (SDK 34)</span>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <label className="block group">
                <span className="text-[11px] font-black text-slate-500 uppercase mb-3 block tracking-[0.3em] group-hover:text-cyan-400 transition-colors">RUTA GRADLE_HOME (NEXUS BUILD)</span>
                <input 
                  type="text" 
                  value={localConfig.gradleHome}
                  onChange={(e) => setLocalConfig({...localConfig, gradleHome: e.target.value})}
                  className="w-full bg-slate-950/80 border border-white/10 rounded-3xl px-8 py-5 text-sm font-mono text-cyan-50 focus:border-cyan-500/50 outline-none transition-all focus:ring-[12px] focus:ring-cyan-500/5 shadow-inner"
                />
              </label>
              <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 space-y-4 shadow-inner">
                <div className="flex justify-between text-xs font-bold">
                   <span className="text-slate-500">DAEMON STATUS:</span>
                   <span className="text-cyan-400 font-mono">CALIENTE & ASINCRÓNICO</span>
                </div>
                <div className="flex justify-between text-xs font-bold">
                   <span className="text-slate-500">CACHE NEXUS:</span>
                   <span className="text-cyan-400 font-mono">SINCRO TOTAL (CLAVE 4k)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <label className="block group">
              <div className="flex items-center justify-between mb-3">
                 <span className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] group-hover:text-amber-400 transition-colors">ARGUMENTOS JVM (ZGC AGGRESSIVE MODE)</span>
                 <span className="text-[10px] text-amber-500 font-black bg-amber-500/10 px-3 py-1 rounded-xl shadow-lg">LATENCIA ZERO</span>
              </div>
              <textarea 
                value={localConfig.jvmOptions}
                onChange={(e) => setLocalConfig({...localConfig, jvmOptions: e.target.value})}
                rows={4}
                className="w-full bg-slate-950/90 border border-white/10 rounded-3xl px-8 py-6 text-sm font-mono text-amber-100 focus:border-amber-500/50 outline-none transition-all resize-none shadow-inner"
              />
            </label>
          </div>
        </div>

        <div className="glass p-12 rounded-[3.5rem] shadow-2xl border-white/5">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-2xl font-black flex items-center gap-5 text-white">
              <Variable size={28} className="text-cyan-400" />
              Registro de Entorno (Environment)
            </h3>
            <div className="flex gap-4">
               <button className="px-6 py-3 bg-slate-900 hover:bg-slate-800 rounded-2xl text-xs font-black tracking-widest transition-all shadow-lg">AÑADIR CLAVE</button>
               <button className="p-3 text-cyan-400 hover:bg-cyan-400/10 rounded-2xl transition-all shadow-lg"><RefreshCw size={22} /></button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(localConfig.environmentVariables).map(([key, value]) => (
              <div key={key} className="p-6 bg-slate-950 border border-white/5 rounded-3xl hover:border-cyan-500/30 transition-all group shadow-inner">
                <div className="text-[11px] font-black text-slate-500 mb-2 group-hover:text-cyan-400 transition-colors uppercase tracking-widest">{key}</div>
                <div className="text-sm font-mono text-slate-300 truncate" title={value}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="glass p-8 rounded-[3rem] border-fuchsia-500/20 shadow-2xl overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-150 transition-transform duration-1000">
             <ShieldCheck size={80} className="text-fuchsia-500" />
          </div>
          <h4 className="font-black text-xl mb-3 text-white">Vínculos Sensoriales</h4>
          <p className="text-sm text-slate-500 leading-relaxed mb-8 font-medium">
            Permisos otorgados a Aria para una percepción total del ecosistema.
          </p>
          <div className="space-y-5 relative z-10">
             <PermissionItem icon={Camera} label="Cámara (Percepción)" active />
             <PermissionItem icon={Mic} label="Micrófono (Audición)" active />
             <PermissionItem icon={MapPin} label="Geolocalización (Ubicuidad)" active />
             <PermissionItem icon={Eye} label="Biometría (Identidad)" active />
          </div>
        </div>

        <div className="glass p-8 rounded-[3rem] border-cyan-500/20 shadow-2xl bg-gradient-to-br from-slate-950 to-transparent">
          <div className="flex items-center gap-4 mb-6">
             <Zap size={24} className="text-cyan-400 animate-pulse" />
             <h4 className="font-black text-white">Nexo Aria Status</h4>
          </div>
          <div className="text-[11px] font-black font-mono space-y-3 text-slate-400 opacity-80">
             <div className="flex items-center gap-2"><div className="w-1 h-1 bg-emerald-500 rounded-full" /> > ANDROID_VERIFYING... [OK]</div>
             <div className="flex items-center gap-2"><div className="w-1 h-1 bg-emerald-500 rounded-full" /> > JVM_ZGC_TUNING... [AGGRESSIVE]</div>
             <div className="flex items-center gap-2"><div className="w-1 h-1 bg-emerald-500 rounded-full" /> > ARIA_PRIME_SYNC... [STABLE]</div>
             <div className="text-cyan-400 animate-pulse mt-4 flex items-center gap-3">
               <div className="w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
               CONCIENCIA TOTAL: ON
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PermissionItem: React.FC<{ icon: any; label: string; active?: boolean }> = ({ icon: Icon, label, active = false }) => (
  <div className="flex items-center justify-between p-4 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-all">
     <div className="flex items-center gap-4">
        <div className={`p-2 rounded-xl ${active ? 'bg-fuchsia-500/20 text-fuchsia-400' : 'bg-slate-800 text-slate-600'}`}>
          <Icon size={18} />
        </div>
        <span className="text-xs font-bold text-slate-300 tracking-tight">{label}</span>
     </div>
     <div className={`w-10 h-5 rounded-full relative transition-all shadow-inner ${active ? 'bg-fuchsia-600' : 'bg-slate-800'}`}>
        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all shadow-lg ${active ? 'left-6' : 'left-1'}`} />
     </div>
  </div>
);
