import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { SERVICES_DATA, getCompanyDisplayName } from '../data/groupData';
import { CheckCircle2, FileText, Wrench, ShieldCheck, HardHat, ChevronRight } from 'lucide-react';

interface ServiceDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug, onNavigate }) => {
  const service = SERVICES_DATA.find((s) => s.slug === slug) || SERVICES_DATA[0];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title={`${service.title} | SR GROUP Industrial Engineering`}
        description={service.shortDesc}
      />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
          <div className="relative h-64 sm:h-80 overflow-hidden">
            <img src={service.heroImage} alt={service.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20" />
            
            <div className="absolute bottom-8 left-6 sm:left-10 right-6 text-left space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <HardHat className="w-4 h-4" />
                <span>SR GROUP TECHNICAL SERVICE SPECIFICATION</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white font-mono uppercase tracking-tight">
                {service.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                Executed by {getCompanyDisplayName(service.companyId)} with strict quality compliance.
              </p>
            </div>
          </div>

          <div className="p-6 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              PRIMARY EXECUTING SUBSIDIARY: <span className="text-amber-400">{getCompanyDisplayName(service.companyId)}</span>
            </span>
            <button
              onClick={() => onNavigate('/request-quote')}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-6 py-3 rounded flex items-center gap-2 uppercase tracking-wider shadow"
            >
              <FileText className="w-4 h-4" />
              <span>Get Quotation For {service.title}</span>
            </button>
          </div>
        </div>

        {/* Content Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-black uppercase font-mono text-white">OVERVIEW & WORK SCOPE</h2>
              <p className="text-sm text-slate-300 leading-relaxed">{service.fullDesc}</p>
            </div>

            {/* Scope Items */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 border-l-2 border-amber-500 pl-2">
                Core Service Components
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
                {service.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-slate-950 p-3 rounded border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Timeline Steps if present */}
            {service.processSteps && (
              <div className="space-y-6 pt-4">
                <h2 className="text-2xl font-black uppercase font-mono text-white">EXECUTION PROCESS & WORKFLOW</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.processSteps.map((p, idx) => (
                    <div key={idx} className="bg-slate-900 border border-slate-800 p-4 rounded-lg space-y-2 text-left">
                      <span className="text-xs font-black text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        STEP {p.step}
                      </span>
                      <h4 className="text-sm font-bold text-white font-mono">{p.title}</h4>
                      <p className="text-xs text-slate-300">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Specifications */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-l-2 border-amber-500 pl-2">
                Technical Specifications
              </h3>
              <div className="space-y-3 text-xs text-slate-300">
                {service.specifications?.map((spec, idx) => (
                  <div key={idx} className="border-b border-slate-800/80 pb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">{spec.label}</span>
                    <span className="font-semibold text-white">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate('/request-quote')}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs py-3.5 rounded flex items-center justify-center gap-2 uppercase tracking-wider shadow"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request Engineering Proposal</span>
                </button>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-amber-400 font-bold uppercase">
                <ShieldCheck className="w-4 h-4" />
                <span>Quality & Safety Guarantee</span>
              </div>
              <p>
                All work executed under this service division strictly follows SR GROUP site permit systems, NDT weld inspections, material certificate audits, and zero-incident site safety protocols.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
