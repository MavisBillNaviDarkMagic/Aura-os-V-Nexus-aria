
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SystemMetrics, SystemConfig } from '../types';
// Added Box icon to the imports list
import { Cpu, Server, HardDrive, Clock, Activity, Battery, Zap, Smartphone, Shield, Box } from 'lucide-react';

const data = [
  { time: '00:00', load: 15 }, { time: '04:00', load: 10 },
  { time: '08:00', load: 40 }, { time: '12:00', load: 60 },
  { time: '16:00', load: 80 }, { time: '20:00', load: 45 },
  { time: '23:59', load: 20 },
];

interface DashboardProps {
  metrics: SystemMetrics;
  config: SystemConfig;
}

export const Dashboard: React.FC<DashboardProps> = ({ metrics, config }) => {
  return (
    <div className="space-y-8 lg:space-y-12 pb-20 lg:pb-0">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
        <StatusCard label="CPU" value={`${Math.round(metrics.cpu)}%`} icon={Cpu} color="text-rose-500" />
        <StatusCard label="RAM" value={`${Math.round(metrics.ram)}%`} icon={Server} color="text-fuchsia-500" />
        <StatusCard label="LINK" value={`${metrics.resonance}%`} icon={Zap} color="text-amber-500" />
        <StatusCard label="UPTIME" value={metrics.uptime} icon={Clock} color="text-cyan-500" />
        <div className="hidden lg:block">
           <StatusCard label="MODO" value="PRIME" icon={Shield} color="text-emerald-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass rounded-[3rem] p-10 border border-white/5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <div>
               <h3 className="text-2xl font-black text-white tracking-tighter">SINCRONÍA DEL NEXO</h3>
               <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">AuraOS Real-time Flow</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
               <Activity size={20} className="text-fuchsia-500" />
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorFlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d946ef" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="time" hide />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '16px', fontSize: '10px' }}
                />
                <Area type="monotone" dataKey="load" stroke="#d946ef" strokeWidth={4} fill="url(#colorFlow)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-[3rem] p-10 flex flex-col gap-8">
           <h3 className="text-xl font-black text-white tracking-tighter uppercase">Hardware Hub</h3>
           <div className="space-y-6">
              <HardwareLine label="Arquitectura" value={config.androidVersion} icon={Smartphone} />
              <HardwareLine label="JVM Runtime" value={config.javaVersion} icon={Box} />
              <HardwareLine label="ZGC Engine" value="Optimizado" icon={Zap} />
              <HardwareLine label="Latencia" value="0.4ms" icon={Activity} />
           </div>
           <div className="mt-auto p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] text-center">
              SISTEMA EN ÓRBITA ESTABLE
           </div>
        </div>
      </div>
    </div>
  );
};

const StatusCard: React.FC<{ label: string; value: string; icon: any; color: string }> = ({ label, value, icon: Icon, color }) => (
  <div className="glass rounded-[2rem] p-6 hover:border-white/10 transition-all duration-500 group border-white/5 shadow-xl">
    <div className={`p-3 rounded-xl bg-white/5 w-fit mb-4 group-hover:scale-110 transition duration-500 ${color}`}>
      <Icon size={18} />
    </div>
    <div className="text-2xl font-black text-white font-mono tracking-tighter">{value}</div>
    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">{label}</div>
  </div>
);

const HardwareLine: React.FC<{ label: string; value: string; icon: any }> = ({ label, value, icon: Icon }) => (
  <div className="flex items-center gap-4">
    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400">
      <Icon size={16} />
    </div>
    <div>
      <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{label}</div>
      <div className="text-sm font-bold text-slate-200">{value}</div>
    </div>
  </div>
);
