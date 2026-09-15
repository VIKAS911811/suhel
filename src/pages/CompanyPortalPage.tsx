import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { CompanyId } from '../types';
import { COMPANIES_DATA, PLACEHOLDERS } from '../data/groupData';
import { NewSrInfraLogo, SuhelEngineeringLogo, SrPowerSolutionLogo, SRGroupLogo } from '../components/logos/CompanyLogos';
import { 
  Building2, 
  Layers, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  HardHat, 
  Cpu, 
  Radio, 
  MapPin, 
  Phone, 
  Mail,
  Sparkles,
  ExternalLink,
  RotateCw
} from 'lucide-react';

interface CompanyPortalPageProps {
  onNavigate: (path: string) => void;
  onSelectCompany: (companyId: CompanyId) => void;
  onTriggerLoading: (companyId: CompanyId) => void;
}

export const CompanyPortalPage: React.FC<CompanyPortalPageProps> = ({
  onNavigate,
  onSelectCompany,
  onTriggerLoading,
}) => {
  const [hoveredCompany, setHoveredCompany] = useState<CompanyId | null>(null);

  const companiesList: {
    id: CompanyId;
    companyNumber: string;
    themeGradient: string;
    borderColor: string;
    glowBg: string;
    btnClass: string;
    badgeClass: string;
    logoComp: React.ReactNode;
    features: string[];
    location: string;
    contact: string;
  }[] = [
    {
      id: 'sr-infra',
      companyNumber: 'COMPANY 01',
      themeGradient: 'from-blue-950/60 via-slate-900 to-slate-950',
      borderColor: 'hover:border-blue-500/70 border-slate-800',
      glowBg: 'bg-blue-600',
      btnClass: 'bg-blue-600 hover:bg-blue-500 text-white',
      badgeClass: 'bg-blue-600/20 text-blue-400 border-blue-500/40',
      logoComp: <NewSrInfraLogo size="sm" showText={true} />,
      features: [
        'Structural Fabrication & Heavy Erection',
        'Industrial Pipeline & Plant Piping Works',
        'Civil Foundation & Infrastructure Works',
        'Heavy Equipment Installation & Maintenance'
      ],
      location: 'Gandhidham (Kutch) Gujarat',
      contact: '(+91) 9898 241 068',
    },
    {
      id: 'suhel-engineering',
      companyNumber: 'COMPANY 02',
      themeGradient: 'from-orange-950/60 via-slate-900 to-slate-950',
      borderColor: 'hover:border-orange-500/70 border-slate-800',
      glowBg: 'bg-orange-600',
      btnClass: 'bg-orange-600 hover:bg-orange-500 text-white',
      badgeClass: 'bg-orange-600/20 text-orange-400 border-orange-500/40',
      logoComp: <SuhelEngineeringLogo size="sm" showText={true} />,
      features: [
        'High-Pressure Process Piping & Welding',
        'Boiler, Refinery & Power Plant Works',
        'Heavy Structural Fabrication & Assembly',
        'Vendor Code: 10001847-Suhel Engineering'
      ],
      location: 'Asansol, Paschim Bardhaman, WB',
      contact: '(+91) 9129 325 506',
    },
    {
      id: 'sr-power-solution',
      companyNumber: 'COMPANY 03',
      themeGradient: 'from-emerald-950/60 via-slate-900 to-slate-950',
      borderColor: 'hover:border-emerald-500/70 border-slate-800',
      glowBg: 'bg-emerald-600',
      btnClass: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      badgeClass: 'bg-emerald-600/20 text-emerald-400 border-emerald-500/40',
      logoComp: <SrPowerSolutionLogo size="sm" showText={true} />,
      features: [
        'HT / LT Industrial Power Distribution',
        'Substation Erection, Testing & Commissioning',
        'Custom Control Panels & Switchgears',
        'Industrial Electrification & Cable Trays'
      ],
      location: 'Disergarh, Paschim Bardhaman, WB',
      contact: '(+91) 9129 325 506',
    },
  ];

  const handleLaunchCompany = (id: CompanyId) => {
    onTriggerLoading(id);
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title="Company Gateway | Visit NEW SR INFRA • SUHEL ENGINEERING • SR POWER SOLUTION"
        description="Visit and explore all three specialized companies under SR GROUP with high-tech loading portal and division overviews."
      />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20">
            <Radio className="w-3.5 h-3.5 animate-pulse text-amber-400" />
            <span>INTERACTIVE COMPANY PORTAL GATEWAY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black uppercase font-mono tracking-tight text-white">
            EXPLORE OUR THREE COMPANIES
          </h1>

          <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
            Direct high-speed gateway to access each specialized industrial subsidiary under <strong className="text-white">SR GROUP</strong>. Click below to launch the interactive division loading experience.
          </p>
        </div>

        {/* 3 Companies Interactive Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {companiesList.map((item) => {
            const companyData = COMPANIES_DATA[item.id];
            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredCompany(item.id)}
                onMouseLeave={() => setHoveredCompany(null)}
                className={`bg-gradient-to-b ${item.themeGradient} border ${item.borderColor} rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1.5 relative overflow-hidden group`}
              >
                {/* Glow Backdrop */}
                <div className={`absolute top-0 right-0 w-32 h-32 ${item.glowBg} opacity-10 rounded-full blur-2xl pointer-events-none`} />

                <div className="space-y-6">
                  
                  {/* Top Bar with Number and Launch Indicator */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${item.badgeClass}`}>
                      {item.companyNumber}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      PORTAL ACTIVE
                    </span>
                  </div>

                  {/* Logo & Name */}
                  <div className="space-y-3">
                    <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 inline-block">
                      {item.logoComp}
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black font-mono uppercase text-white tracking-tight">
                      {companyData.name}
                    </h2>

                    <p className="text-xs text-slate-300 leading-relaxed min-h-[48px]">
                      {companyData.tagline}
                    </p>
                  </div>

                  {/* Key Capabilities List */}
                  <div className="space-y-2 pt-2 border-t border-slate-800/80">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block font-mono">
                      Specialized Capabilities:
                    </span>
                    <div className="space-y-1.5">
                      {item.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* HQ & Direct Contact Info */}
                  <div className="bg-slate-950/90 rounded-xl p-3 border border-slate-800 text-[11px] space-y-1 font-mono text-slate-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{item.contact}</span>
                    </div>
                  </div>

                </div>

                {/* Action Launch Button */}
                <div className="pt-6 mt-6 border-t border-slate-800/80 space-y-2.5">
                  <button
                    onClick={() => handleLaunchCompany(item.id)}
                    className={`w-full ${item.btnClass} font-black text-xs py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-wider shadow-lg transition-all transform active:scale-95`}
                  >
                    <RotateCw className="w-4 h-4" />
                    <span>Launch & Visit {companyData.name}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>

                  <button
                    onClick={() => {
                      onSelectCompany(item.id);
                      onNavigate(`/companies/${item.id}`);
                    }}
                    className="w-full bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white text-[11px] py-2 px-3 rounded-lg border border-slate-800 flex items-center justify-center gap-1.5 transition-colors font-mono"
                  >
                    <span>Instant Direct Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Banner with SR GROUP Unified Quality Framework */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>UNIFIED STANDARDS & MANAGEMENT</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white font-mono uppercase">
              Integrated Multi-Disciplinary Execution
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Clients can engage individual companies for dedicated specialized scopes or contract SR GROUP for end-to-end integrated infrastructure, structural fabrication, piping, and power distribution.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/contact')}
            className="shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-6 py-3.5 rounded-xl uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20"
          >
            Contact Group Central Desk
          </button>
        </div>

      </div>
    </div>
  );
};
