import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { CompanyId } from '../types';
import { SERVICES_DATA } from '../data/groupData';
import { Building2, Pipette, Wrench, Zap, Flame, ArrowRight, CheckCircle2, HardHat, FileText, ChevronRight } from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
  onSelectCompany: (companyId: CompanyId) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const categories = [
    {
      title: 'INDUSTRIAL ENGINEERING',
      slug: 'industrial-engineering',
      description: 'Structural fabrication, erection, plant machinery installation, equipment positioning, dismantling, and plant maintenance shutdowns.',
      icon: Building2,
      services: [
        'Structural Fabrication',
        'Structural Erection',
        'Industrial Fabrication',
        'Equipment Installation',
        'Plant Installation',
        'Plant Maintenance',
        'Shutdown Works',
        'Dismantling Works'
      ]
    },
    {
      title: 'POWER PLANT BOILER WORKS & OVERHAUL',
      slug: 'power-plant-boiler',
      description: 'Turnkey boiler erection & installation, scheduled plant maintenance shutdowns, IBR pressure parts, tube replacement, steam piping, and full overhauls.',
      icon: Flame,
      services: [
        'Boiler Erection & Installation',
        'Boiler Maintenance & Shutdown',
        'Pressure Parts & Tube Replacement',
        'Drum, Header, Superheater & Economizer Work',
        'Steam & Utility Piping',
        'Boiler Structure & Platform Fabrication',
        'Ducting & Expansion Joint Work',
        'FD/ID/PA Fan Maintenance',
        'Pump, Valve & Equipment Maintenance',
        'Ash & Coal Handling System Work',
        'Insulation & Refractory Work',
        'Testing, Commissioning & Overhauling'
      ]
    },
    {
      title: 'PIPELINE SERVICES',
      slug: 'pipeline',
      description: 'High-pressure gas lines, industrial water supply networks, chemical piping, utility pipelines, fabrication, fit-up, and hydro-testing.',
      icon: Pipette,
      services: [
        'Gas Pipeline',
        'Water Pipeline',
        'Chemical Pipeline',
        'Industrial Pipeline',
        'Pipeline Fabrication',
        'Pipeline Erection',
        'Pipe Support Fabrication',
        'Hydro Testing & Coating'
      ]
    },
    {
      title: 'STEEL & PROCESS PLANTS',
      slug: 'industrial-engineering',
      description: 'Specialized mechanical engineering and overhaul works for heavy process manufacturing complexes.',
      icon: Wrench,
      services: [
        'Sponge Iron Plant Works',
        'Ferro Alloys Furnace Works',
        'Induction Furnace Works',
        'Cement Plant Works',
        'Rolling Mill Works',
        'Pellet Plant Works',
        'Copper Smelter Works',
        'Sugar Mill Works',
        'Power Plant Works',
        'Pollution Prevention Systems'
      ]
    },
    {
      title: 'POWER SOLUTIONS',
      slug: 'power-solutions',
      description: 'Turnkey HT/LT electrical engineering, PCC/MCC control panels, transformer setups, power cabling, industrial solar, and maintenance.',
      icon: Zap,
      services: [
        'LT & HT Electrical Installation',
        'HT/LT Works',
        'Industrial Electrification',
        'Cable Installation & Trays',
        'Electrical Panels (PCC / MCC)',
        'Power Distribution',
        'Industrial Solar Solutions',
        'Electrical Maintenance & Testing'
      ]
    }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title="Industrial Services | Structural Fabrication, Pipelines & Power - SR GROUP"
        description="Comprehensive industrial services offered by SR GROUP: Structural steel fabrication & erection, industrial pipelines, process plant overhauls, and HT/LT power distribution across India."
      />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-left space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
            <HardHat className="w-3.5 h-3.5" />
            <span>FULL CAPABILITY MATRIX</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase font-mono tracking-tight text-white">
            OUR INDUSTRIAL SERVICES
          </h1>
          <p className="text-slate-300 text-base max-w-3xl">
            SR GROUP delivers specialized multi-disciplinary engineering capabilities divided across five major service divisions including specialized Power Plant Boiler Engineering & Overhauls.
          </p>
        </div>

        {/* Mega Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="bg-slate-900 border border-slate-800 rounded-xl p-8 space-y-6 text-left hover:border-amber-500/50 transition-all flex flex-col justify-between shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-white font-mono">{cat.title}</h2>
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                        SERVICE DIVISION 0{idx + 1}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="pt-2 space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Key Execution Scope:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                      {cat.services.map((s, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 bg-slate-950 p-2 rounded border border-slate-800/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span className="line-clamp-1">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => onNavigate(`/services/${cat.slug}`)}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 uppercase tracking-wider"
                  >
                    <span>View Division Specifications</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onNavigate('/request-quote')}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2 rounded flex items-center gap-1.5 uppercase tracking-wider shadow"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Quote</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Individual Service Cards Spotlight */}
        <div className="space-y-8 text-left border-t border-slate-800 pt-12">
          <h2 className="text-2xl font-black uppercase font-mono text-white">FEATURED SERVICE DIVISIONS</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {SERVICES_DATA.map((serv) => (
              <div key={serv.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between">
                <div className="relative h-48 overflow-hidden">
                  <img src={serv.heroImage} alt={serv.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 text-lg font-black text-white font-mono">
                    {serv.title}
                  </span>
                </div>

                <div className="p-6 space-y-4 text-left">
                  <p className="text-xs text-slate-300 leading-relaxed">{serv.shortDesc}</p>
                  <button
                    onClick={() => onNavigate(`/services/${serv.slug}`)}
                    className="w-full bg-slate-950 border border-slate-700 hover:bg-slate-800 text-amber-400 font-bold text-xs py-3 rounded flex items-center justify-center gap-2 uppercase tracking-wider"
                  >
                    <span>Read Full Technical Process</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
