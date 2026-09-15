import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CompanyId } from '../types';
import { COMPANIES_DATA, PLACEHOLDERS } from '../data/groupData';
import { NewSrInfraLogo, SuhelEngineeringLogo, SrPowerSolutionLogo, SRGroupLogo } from './logos/CompanyLogos';
import { ThreeDIndustrialHologram } from './ThreeDIndustrialHologram';
import { 
  Building2, 
  Layers, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  HardHat, 
  Cpu, 
  Radio, 
  Flame, 
  FileCheck,
  ChevronRight,
  ExternalLink,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX,
  Compass,
  Activity,
  Gauge
} from 'lucide-react';

interface CompanyLoadingScreenProps {
  targetCompany: CompanyId;
  onComplete: () => void;
  onCancel?: () => void;
  autoCloseDelay?: number; // ms to complete loading
}

export const CompanyLoadingScreen: React.FC<CompanyLoadingScreenProps> = ({
  targetCompany: initialCompany,
  onComplete,
  onCancel,
  autoCloseDelay = 1800,
}) => {
  const [selectedCompany, setSelectedCompany] = useState<CompanyId>(initialCompany);
  const [progress, setProgress] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [telemetryValues, setTelemetryValues] = useState({
    freq: '50.02 Hz',
    pressure: '42.8 Bar',
    load: '88.4%',
    rigidity: '99.98%'
  });

  const company = COMPANIES_DATA[selectedCompany] || COMPANIES_DATA['sr-group'];

  // Company specific styling & metadata
  const getThemeConfig = (id: CompanyId) => {
    switch (id) {
      case 'sr-infra':
        return {
          themeColor: '#2563eb',
          lightColor: '#60a5fa',
          accentBorder: 'border-blue-500/50',
          glowColor: 'rgba(37, 99, 235, 0.45)',
          bgGradient: 'from-blue-950/80 via-slate-950 to-slate-950',
          badgeText: 'COMPANY 01 • INFRASTRUCTURE & STRUCTURAL',
          badgeClass: 'bg-blue-600/25 text-blue-400 border-blue-500/50 shadow-blue-500/20',
          hudTitle: 'NEW SR INFRA 3D STRUCTURAL GATEWAY',
          hqLocation: 'Gandhidham (Kutch), Gujarat',
          gstin: '24CTGPR1641K1ZJ',
          divisionType: 'STRUCTURAL FABRICATION & ERECTION',
          icon: <Building2 className="w-6 h-6 text-blue-400" />,
          logoComp: <NewSrInfraLogo size="sm" showText={false} />,
          steps: [
            'Initializing 3D Structural Steel Mesh & Truss Nodes...',
            'Connecting to Gandhidham Headquarters & Plant Works...',
            'Rendering Isometric Pipeline & Erection Models in 3D...',
            'Validating ISO 9001:2015 Structural Safety Standards...',
            '3D Model Synchronized! Launching NEW SR INFRA Portal...'
          ],
          telemetry: {
            t1: 'YIELD STRENGTH: 350 MPa',
            t2: 'DEFLECTION: 0.02 mm',
            t3: 'WELD EFFICIENCY: 99.9%',
            t4: 'ERECTION CAPACITY: 1200 MT'
          },
          specialities: ['Heavy Structural Fabrication', 'Industrial Plant Piping', 'Civil Infrastructure', 'Turnkey Erection'],
        };
      case 'suhel-engineering':
        return {
          themeColor: '#ea580c',
          lightColor: '#fb923c',
          accentBorder: 'border-orange-500/50',
          glowColor: 'rgba(234, 88, 12, 0.45)',
          bgGradient: 'from-orange-950/80 via-slate-950 to-slate-950',
          badgeText: 'COMPANY 02 • MECHANICAL FABRICATION & PIPING',
          badgeClass: 'bg-orange-600/25 text-orange-400 border-orange-500/50 shadow-orange-500/20',
          hudTitle: 'SUHEL ENGINEERING 3D PROCESS PIPING GATEWAY',
          hqLocation: 'Asansol, Paschim Bardhaman, WB',
          gstin: '19BXVPA8671E1ZY',
          divisionType: 'HIGH-PRESSURE PROCESS PIPING & BOILERS',
          vendorCode: 'Vendor ID: 10001847',
          icon: <Layers className="w-6 h-6 text-orange-400" />,
          logoComp: <SuhelEngineeringLogo size="sm" showText={false} />,
          steps: [
            'Spooling 3D High-Pressure Pipe Manifold Geometry...',
            'Connecting to Asansol Heavy Fabrication Hub...',
            'Simulating Hydro-Testing & Thermal Expansion Arc...',
            'Verifying NDT / X-Ray Radiography Welding Compliance...',
            '3D Simulation Complete! Launching SUHEL ENGINEERING...'
          ],
          telemetry: {
            t1: 'DESIGN PRESSURE: 160 Bar',
            t2: 'TEST TEMP: 450°C',
            t3: 'NDT CLEARANCE: 100%',
            t4: 'PIPING DIAMETER: 24" NB'
          },
          specialities: ['High-Pressure Process Piping', 'Boiler & Steam Headers', 'Heavy Structural Assembly', 'Radiography Welds'],
        };
      case 'sr-power-solution':
        return {
          themeColor: '#10b981',
          lightColor: '#34d399',
          accentBorder: 'border-emerald-500/50',
          glowColor: 'rgba(16, 185, 129, 0.45)',
          bgGradient: 'from-emerald-950/80 via-slate-950 to-slate-950',
          badgeText: 'COMPANY 03 • POWER SOLUTIONS & HT/LT PANELS',
          badgeClass: 'bg-emerald-600/25 text-emerald-400 border-emerald-500/50 shadow-emerald-500/20',
          hudTitle: 'SR POWER SOLUTION 3D HIGH-VOLTAGE GATEWAY',
          hqLocation: 'Disergarh, Paschim Bardhaman, WB',
          gstin: '19BXVPA8671E2ZX',
          divisionType: 'SUBSTATIONS & ELECTRICAL AUTOMATION',
          icon: <Zap className="w-6 h-6 text-emerald-400" />,
          logoComp: <SrPowerSolutionLogo size="sm" showText={false} />,
          steps: [
            'Generating 3D Electromagnetic Flux & Substation Bus...',
            'Connecting to High-Voltage Power Engineering Unit...',
            'Calibrating HT/LT Switchgear & Transformer Vector...',
            'Running Live Voltage Harmonic & Load Flow Simulation...',
            '3D Power Grid Ready! Launching SR POWER SOLUTION...'
          ],
          telemetry: {
            t1: 'GRID FREQ: 50.00 Hz',
            t2: 'HT BUS: 33 kV / 11 kV',
            t3: 'LT FEED: 415 V (3-Phase)',
            t4: 'ISOLATION LEVEL: Class F'
          },
          specialities: ['Substation Erection', 'HT/LT Custom Panels', 'Industrial Cable Trays', 'Transformer Testing'],
        };
      default:
        return {
          themeColor: '#f59e0b',
          lightColor: '#fde047',
          accentBorder: 'border-amber-500/50',
          glowColor: 'rgba(245, 158, 11, 0.45)',
          bgGradient: 'from-amber-950/80 via-slate-950 to-slate-950',
          badgeText: 'SR GROUP EXECUTIVE 3D PORTAL',
          badgeClass: 'bg-amber-600/25 text-amber-400 border-amber-500/50 shadow-amber-500/20',
          hudTitle: 'SR GROUP INDUSTRIAL MATRIX 3D',
          hqLocation: 'Gandhidham (Kutch) Gujarat',
          gstin: 'Integrated Multi-Disciplinary Group',
          divisionType: 'TURNKEY ENGINEERING & INFRASTRUCTURE',
          icon: <HardHat className="w-6 h-6 text-amber-400" />,
          logoComp: <SRGroupLogo size="sm" showText={false} />,
          steps: [
            'Initializing SR GROUP 3D industrial core...',
            'Synchronizing NEW SR INFRA, SUHEL & POWER SOLUTION...',
            'Compiling Multi-Disciplinary Turnkey Matrix in 3D...',
            'Optimizing Group Quality Standards & Safety Badges...',
            'Entering SR GROUP Workspace...'
          ],
          telemetry: {
            t1: 'COMPANIES: 3 Units',
            t2: 'ONGOING SITES: 18+',
            t3: 'SAFETY RATING: 99.8%',
            t4: 'EXPERIENCE: 25+ Years'
          },
          specialities: ['Three Integrated Companies', 'Structural, Piping & Power', 'Pan-India Turnkey Delivery', 'Zero Harm Protocol'],
        };
    }
  };

  const theme = getThemeConfig(selectedCompany);

  // Play subtle sci-fi sound tick on audio enabled
  const playSciFiSound = (pitch = 440) => {
    if (!isAudioEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch (e) {
      // AudioContext fallback
    }
  };

  // Smooth progress ticker
  useEffect(() => {
    setProgress(0);
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / autoCloseDelay) * 100));
      setProgress(pct);

      const stepIdx = Math.min(
        theme.steps.length - 1,
        Math.floor((pct / 100) * theme.steps.length)
      );
      setActiveStepIndex(stepIdx);

      if (pct % 25 === 0 && pct > 0) {
        playSciFiSound(500 + pct * 4);
      }

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 200);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [selectedCompany, autoCloseDelay]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-2xl p-3 sm:p-6 overflow-y-auto"
      style={{
        backgroundImage: `radial-gradient(circle at center, ${theme.glowColor}, transparent 75%)`,
      }}
    >
      {/* Dynamic 3D Spatial Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b20_1px,transparent_1px),linear-gradient(to_bottom,#1e293b20_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Main 3D Container Card */}
      <div className="relative w-full max-w-3xl bg-gradient-to-b from-slate-900/95 via-slate-950/98 to-slate-950 border border-slate-700/80 rounded-3xl p-5 sm:p-8 shadow-2xl overflow-hidden backdrop-blur-md">
        
        {/* Holographic Laser Scanner Beam */}
        <motion.div
          animate={{ y: [-180, 560] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-40 pointer-events-none shadow-[0_0_15px_#38bdf8]"
        />

        {/* Top High-Tech Status Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800/80 pb-4 gap-3">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <div>
              <span className="text-[11px] font-mono font-black tracking-widest text-slate-300 uppercase block">
                SR GROUP 3D GATEWAY
              </span>
              <span className="text-[9px] font-mono text-slate-500">
                SYSTEM ID: SR-3D-{selectedCompany.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Quick 3 Companies Switcher inside 3D Loading */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {(['sr-infra', 'suhel-engineering', 'sr-power-solution'] as CompanyId[]).map((cid) => (
              <button
                key={cid}
                onClick={() => {
                  setSelectedCompany(cid);
                  playSciFiSound(680);
                }}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold uppercase transition-all ${
                  selectedCompany === cid
                    ? 'bg-slate-800 text-white shadow-md border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cid === 'sr-infra' ? 'NEW SR INFRA' : cid === 'suhel-engineering' ? 'SUHEL' : 'POWER'}
              </button>
            ))}
          </div>

          {/* Action Tools: Sound & Skip */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsAudioEnabled(!isAudioEnabled);
                playSciFiSound(720);
              }}
              title={isAudioEnabled ? 'Mute Audio' : 'Enable 3D Sound Effects'}
              className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-amber-400 border border-slate-800 transition-colors"
            >
              {isAudioEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={onComplete}
              className="text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1 transition-colors uppercase tracking-wider"
            >
              <span>Instant Enter</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Center: 3D Hologram Stage & Interactive Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 py-6 items-center">
          
          {/* Left / Center 3D Interactive Hologram Model (7 Cols) */}
          <div className="md:col-span-7 flex flex-col items-center justify-center relative">
            <ThreeDIndustrialHologram
              companyId={selectedCompany}
              themeColor={theme.themeColor}
              glowColor={theme.glowColor}
            />

            {/* Instruction tooltip */}
            <p className="text-[10px] text-slate-400 font-mono mt-2 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>Drag / Hover mouse to rotate 3D wireframe angle</span>
            </p>
          </div>

          {/* Right Info & Live Telemetry Panel (5 Cols) */}
          <div className="md:col-span-5 space-y-4 text-left">
            
            <div className="space-y-1.5">
              <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border inline-block ${theme.badgeClass}`}>
                {theme.badgeText}
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-mono tracking-tight text-white uppercase">
                {company.name}
              </h2>
              <p className="text-xs text-slate-300 leading-snug">
                {company.tagline}
              </p>
            </div>

            {/* 3D Real-Time Industrial Telemetry Grid */}
            <div className="bg-slate-950/90 rounded-2xl p-3 border border-slate-800 space-y-2 font-mono text-[10px]">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800/80 pb-1.5">
                <span className="flex items-center gap-1 text-cyan-400 font-bold">
                  <Activity className="w-3 h-3 animate-pulse" />
                  3D LIVE TELEMETRY
                </span>
                <span className="text-emerald-400 font-bold">CALIBRATED</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-slate-300">
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[8px] uppercase">Telemetry 01</span>
                  <span className="text-amber-400 font-bold">{theme.telemetry.t1}</span>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[8px] uppercase">Telemetry 02</span>
                  <span className="text-cyan-400 font-bold">{theme.telemetry.t2}</span>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[8px] uppercase">Telemetry 03</span>
                  <span className="text-emerald-400 font-bold">{theme.telemetry.t3}</span>
                </div>
                <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-500 block text-[8px] uppercase">Telemetry 04</span>
                  <span className="text-white font-bold">{theme.telemetry.t4}</span>
                </div>
              </div>
            </div>

            {/* Capabilities list */}
            <div className="flex flex-wrap gap-1.5">
              {theme.specialities.map((s, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800 font-medium"
                >
                  ✓ {s}
                </span>
              ))}
            </div>

            {/* Headquarters link */}
            <div className="text-[11px] font-mono text-slate-400 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center justify-between">
              <span className="text-amber-400">HQ:</span>
              <span className="text-slate-200 truncate">{theme.hqLocation}</span>
            </div>

          </div>

        </div>

        {/* Bottom Loading Progress & System Stream */}
        <div className="space-y-3 pt-3 border-t border-slate-800/80">
          
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-slate-300 font-semibold truncate max-w-[80%]">
              <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
              <span className="text-amber-400 truncate">{theme.steps[activeStepIndex]}</span>
            </div>
            <span className="font-black text-white text-sm shrink-0">{progress}%</span>
          </div>

          {/* Futuristic 3D Progress Bar */}
          <div className="relative w-full h-3.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5 shadow-inner">
            <motion.div
              className="h-full rounded-full transition-all duration-100 relative overflow-hidden"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${theme.themeColor}, #38bdf8, #f59e0b)`
              }}
            >
              {/* Internal Shimmer */}
              <motion.div
                animate={{ x: [-100, 300] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-white/30 w-16 skew-x-12"
              />
            </motion.div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>3D ISOMETRIC VECTOR PIPELINE</span>
            </span>
            <span>POWERED BY SR GROUP EXECUTIVE BOARD</span>
          </div>

        </div>

      </div>
    </motion.div>
  );
};
