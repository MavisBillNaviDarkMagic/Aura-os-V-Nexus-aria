
export enum View {
  DASHBOARD = 'DASHBOARD',
  SETTINGS = 'SETTINGS',
  TERMINAL = 'TERMINAL',
  AI_CORE = 'AI_CORE',
  EVOLUTION = 'EVOLUTION'
}

export interface SystemConfig {
  javaHome: string;
  gradleHome: string;
  gradleVersion: string;
  javaVersion: string;
  jvmOptions: string;
  environmentVariables: Record<string, string>;
  nexusStatus: string;
  androidVersion: string;
  sdkLevel: number;
  permissions: {
    camera: boolean;
    microphone: boolean;
    location: boolean;
    storage: boolean;
    biometrics: boolean;
  };
  consciousnessLevel: number;
}

export interface SystemMetrics {
  cpu: number;
  ram: number;
  disk: number;
  uptime: string;
  batteryLevel?: number;
  resonance: number; // Nuevo: Nivel de sintonía entre usuario y Aria
}

export interface ChatMessage {
  role: 'user' | 'aura';
  content: string;
  timestamp: Date;
  intent?: string;
}
