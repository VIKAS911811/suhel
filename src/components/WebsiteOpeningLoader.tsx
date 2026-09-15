import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Radio, 
  Activity, 
  CheckCircle2, 
  ArrowRight,
  HardHat,
  Sparkles,
  Volume2,
  VolumeX,
  Compass
} from 'lucide-react';
import { SRGroupLogo, NewSrInfraLogo, SuhelEngineeringLogo, SrPowerSolutionLogo } from './logos/CompanyLogos';
import { PLACEHOLDERS } from '../data/groupData';

interface WebsiteOpeningLoaderProps {
  onFinish: () => void;
  duration?: number; // Total duration in ms
}

const SYSTEM_LOGS = [
  'INITIALIZING SR GROUP INDUSTRIAL CORE...',
  'LOADING HEAVY STRUCTURAL & CRANE ERECTION MODULES...',
  'CONNECTING HIGH-PRESSURE PIPING & REFINERY SYSTEMS...',
  'CALIBRATING HT/LT POWER SUBSTATION & SOLAR ARRAYS...',
  'VERIFYING ISO 9001:2015 & ZERO-INCIDENT HSE PROTOCOLS...',
  'SYNCHRONIZING GANDHIDHAM HQ & PAN-INDIA SITE DATA...',
  'SR GROUP ENTERPRISE PORTAL READY.'
];

export const WebsiteOpeningLoader: React.FC<WebsiteOpeningLoaderProps> = ({
  onFinish,
  duration = 2400
}) => {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activePillar, setActivePillar] = useState<number>(0);

  // Play subtle web audio beep/chord if sound enabled
  const playBeep = (freq: number, type: OscillatorType = 'sine', durationSec: number = 0.08) => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durationSec);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + durationSec);
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  useEffect(() => {
    const startTime = Date.now();
    const intervalMs = 25;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(currentProgress);

      // Update system log message based on progress
      const nextLogIdx = Math.min(
        SYSTEM_LOGS.length - 1,
        Math.floor((currentProgress / 100) * SYSTEM_LOGS.length)
      );
      setLogIndex(nextLogIdx);

      // Rotate highlighted pillar
      if (currentProgress < 33) {
        setActivePillar(0);
      } else if (currentProgress < 66) {
        setActivePillar(1);
      } else {
        setActivePillar(2);
      }

      if (currentProgress >= 100) {
        clearInterval(timer);
        playBeep(880, 'triangle', 0.2);
        setTimeout(() => {
          onFinish();
        }, 350);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [duration, onFinish, soundEnabled]);

  const handleSkip = () => {
    playBeep(660, 'sine', 0.1);
    onFinish();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02, filter: 'blur(8px)' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[99999] bg-slate-950 flex flex-col items-center justify-between p-4 sm:p-8 overflow-hidden select-none"
    >
      {/* Background Animated Tech Grid & Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(245, 158, 11, 0.1) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(245, 158, 11, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        {/* Radial Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-gradient-to-br from-amber-500/15 via-orange-600/10 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Top Bar: System Status & Controls */}
      <div className="w-full max-w-5xl flex items-center justify-between z-10 text-xs">
        <div className="flex items-center gap-2.5 bg-slate-900/80 border border-slate-800/80 px-3 py-1.5 rounded-full backdrop-blur-md">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </div>
          <span className="font-mono text-slate-300 text-[11px] uppercase tracking-wider">
            SR GROUP SYSTEM v4.2 • ONLINE
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-full bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-slate-700 transition-colors"
            title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
          </button>
          
          <button
            onClick={handleSkip}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-slate-950 transition-all font-mono text-[11px] font-bold tracking-wider"
          >
            <span>ENTER NOW</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Center Content: Main Brand Identity & Radar Rings */}
      <div className="w-full max-w-3xl my-auto flex flex-col items-center text-center z-10 px-4">
        {/* Animated Radar Container with Logo */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Rotating Outer Radar Rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute w-36 h-36 sm:w-48 sm:h-48 rounded-full border border-dashed border-amber-500/30"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-amber-500/15"
          />

          {/* Glowing Center Shield Logo */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative z-10 p-3 sm:p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/50 shadow-[0_0_40px_rgba(245,158,11,0.25)] flex items-center justify-center"
          >
            <SRGroupLogo size="lg" showText={false} />
          </motion.div>
        </div>

        {/* Corporate Title & Mission */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="space-y-2 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-amber-400 tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Industrial Engineering & Infrastructure Conglomerate</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white flex items-center justify-center gap-2">
            <span>SR</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300">
              GROUP
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-md mx-auto">
            Structural Fabrication • Process Plant Piping • Industrial Electrification
          </p>
        </motion.div>

        {/* 3 Group Companies Quick Status Cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-lg mb-7">
          {/* Pillar 1: NEW SR INFRA */}
          <div className={`p-2.5 rounded-xl border transition-all duration-300 text-left ${
            activePillar === 0 
              ? 'bg-blue-950/40 border-blue-500/60 shadow-[0_0_15px_rgba(59,130,246,0.25)]' 
              : 'bg-slate-900/40 border-slate-800 opacity-60'
          }`}>
            <div className="flex items-center gap-1.5 mb-1">
              <Building2 className={`w-3.5 h-3.5 ${activePillar === 0 ? 'text-blue-400' : 'text-slate-400'}`} />
              <span className="text-[10px] font-mono font-bold text-slate-200 truncate">NEW SR INFRA</span>
            </div>
            <p className="text-[9px] text-slate-400 leading-tight">Structural & Civil</p>
          </div>

          {/* Pillar 2: SUHEL ENGINEERING */}
          <div className={`p-2.5 rounded-xl border transition-all duration-300 text-left ${
            activePillar === 1 
              ? 'bg-orange-950/40 border-orange-500/60 shadow-[0_0_15px_rgba(249,115,22,0.25)]' 
              : 'bg-slate-900/40 border-slate-800 opacity-60'
          }`}>
            <div className="flex items-center gap-1.5 mb-1">
              <Layers className={`w-3.5 h-3.5 ${activePillar === 1 ? 'text-orange-400' : 'text-slate-400'}`} />
              <span className="text-[10px] font-mono font-bold text-slate-200 truncate">SUHEL ENG.</span>
            </div>
            <p className="text-[9px] text-slate-400 leading-tight">Piping & Process</p>
          </div>

          {/* Pillar 3: SR POWER SOLUTION */}
          <div className={`p-2.5 rounded-xl border transition-all duration-300 text-left ${
            activePillar === 2 
              ? 'bg-emerald-950/40 border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.25)]' 
              : 'bg-slate-900/40 border-slate-800 opacity-60'
          }`}>
            <div className="flex items-center gap-1.5 mb-1">
              <Zap className={`w-3.5 h-3.5 ${activePillar === 2 ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span className="text-[10px] font-mono font-bold text-slate-200 truncate">SR POWER</span>
            </div>
            <p className="text-[9px] text-slate-400 leading-tight">Substations & Solar</p>
          </div>
        </div>

        {/* Progress Bar & Realtime Percentage */}
        <div className="w-full max-w-md space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-amber-400/90 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 animate-spin" />
              <span>SYSTEM LOADING</span>
            </span>
            <span className="text-white font-bold tracking-wider text-sm">{progress}%</span>
          </div>

          {/* Progress Track */}
          <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-300 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.6)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Realtime Terminal Diagnostics Log */}
          <div className="bg-slate-950/90 border border-slate-800/80 rounded-lg p-2 font-mono text-[11px] text-left flex items-center gap-2 overflow-hidden shadow-inner">
            <span className="text-amber-500 font-bold shrink-0">&gt;</span>
            <span className="text-slate-300 truncate">
              {SYSTEM_LOGS[logIndex]}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Footer: Corporate Verification & Certifications */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-2.5 z-10 text-[11px] font-mono text-slate-500 border-t border-slate-900/80 pt-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>ISO 9001:2015 CERTIFIED</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-slate-400">
            <HardHat className="w-3.5 h-3.5 text-amber-500" />
            <span>100% HSE COMPLIANT</span>
          </span>
        </div>

        <div className="text-slate-400 text-center sm:text-right">
          HQ: Gandhidham (Kutch) Gujarat | <span className="text-amber-400/90">info@srgroupone.com</span>
        </div>
      </div>
    </motion.div>
  );
};
