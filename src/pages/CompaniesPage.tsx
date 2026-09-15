import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { CompanyId } from '../types';
import { COMPANIES_DATA } from '../data/groupData';
import { Building2, Layers, Zap, ArrowRight, ShieldCheck, CheckCircle2, HardHat, FileText } from 'lucide-react';
import { SRGroupLogo, SuhelEngineeringLogo } from '../components/logos/CompanyLogos';

interface CompaniesPageProps {
  onNavigate: (path: string) => void;
  onSelectCompany: (companyId: CompanyId) => void;
}

export const CompaniesPage: React.FC<CompaniesPageProps> = ({ onNavigate, onSelectCompany }) => {
  const handleViewProfile = (companyId: CompanyId) => {
    onSelectCompany(companyId);
    onNavigate(`/companies/${companyId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title="Our Companies | NEW SR INFRA • SUHEL ENGINEERING • SR POWER SOLUTION"
        description="Discover the three specialized companies under SR GROUP: NEW SR INFRA (Infrastructure & Structural Fabrication), SUHEL ENGINEERING (Process Plant Fabrication & Piping), and SR POWER SOLUTION (HT/LT Electrical Engineering)."
      />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-left space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
            <HardHat className="w-3.5 h-3.5" />
            <span>SR GROUP SUBSIDIARIES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase font-mono tracking-tight text-white">
            OUR THREE COMPANIES
          </h1>
          <p className="text-slate-300 text-base max-w-3xl">
            Complete Industrial Solutions Under One Group. Each company brings specialized capabilities, experienced engineering crews, and dedicated site infrastructure.
          </p>
        </div>

        {/* Company 1: NEW SR INFRA */}
        <div id="sr-infra" className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition-all hover:border-blue-500/40">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            <div className="lg:col-span-5 relative min-h-[300px]">
              <img
                src={COMPANIES_DATA['sr-infra'].heroImage}
                alt="NEW SR INFRA"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-transparent to-transparent opacity-80" />
              <span className="absolute top-4 left-4 bg-blue-600 text-white font-black text-xs px-3 py-1 rounded uppercase tracking-wider shadow">
                COMPANY 01
              </span>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 text-left flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-blue-400">
                    <Building2 className="w-6 h-6" />
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-400">NEW SR INFRA</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
                    Industrial Infrastructure & Engineering
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {COMPANIES_DATA['sr-infra'].fullDesc}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    Core Capabilities:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {COMPANIES_DATA['sr-infra'].services.map((s, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => handleViewProfile('sr-infra')}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-3 rounded flex items-center justify-center gap-2 uppercase tracking-wider transition-colors"
                >
                  <span>Explore NEW SR INFRA Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('/request-quote')}
                  className="w-full sm:w-auto bg-slate-950 border border-slate-700 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Request Infrastructure Quote</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Company 2: SUHEL ENGINEERING */}
        <div id="suhel-engineering" className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition-all hover:border-orange-500/40">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            <div className="lg:col-span-5 relative min-h-[300px]">
              <img
                src={COMPANIES_DATA['suhel-engineering'].heroImage}
                alt="SUHEL ENGINEERING"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-transparent to-transparent opacity-80" />
              <span className="absolute top-4 left-4 bg-orange-600 text-white font-black text-xs px-3 py-1 rounded uppercase tracking-wider shadow">
                COMPANY 02
              </span>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 text-left flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <SuhelEngineeringLogo size="md" showText={true} />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
                    Industrial Engineering & Fabrication
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  "Suhel Engineering provides integrated industrial engineering, fabrication, erection and plant execution services for diverse industrial sectors. The company focuses on safe execution, quality workmanship and dependable project delivery."
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    Specialized Plant & Pipeline Services:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {COMPANIES_DATA['suhel-engineering'].services.slice(0, 8).map((s, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => handleViewProfile('suhel-engineering')}
                  className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs px-6 py-3 rounded flex items-center justify-center gap-2 uppercase tracking-wider transition-colors"
                >
                  <span>Explore SUHEL ENGINEERING Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('/request-quote')}
                  className="w-full sm:w-auto bg-slate-950 border border-slate-700 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Request Fabrication Quote</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Company 3: SR POWER SOLUTION */}
        <div id="sr-power-solution" className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl transition-all hover:border-emerald-500/40">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            <div className="lg:col-span-5 relative min-h-[300px]">
              <img
                src={COMPANIES_DATA['sr-power-solution'].heroImage}
                alt="SR POWER SOLUTION"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-transparent to-transparent opacity-80" />
              <span className="absolute top-4 left-4 bg-emerald-600 text-white font-black text-xs px-3 py-1 rounded uppercase tracking-wider shadow">
                COMPANY 03
              </span>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-10 space-y-6 text-left flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Zap className="w-6 h-6" />
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">SR POWER SOLUTION</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
                    Power & Electrical Engineering Solutions
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  "SR POWER SOLUTION provides reliable electrical, power and industrial energy solutions for commercial, infrastructure and industrial applications."
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    HT / LT Electrical & Solar Services:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {COMPANIES_DATA['sr-power-solution'].services.slice(0, 8).map((s, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => handleViewProfile('sr-power-solution')}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3 rounded flex items-center justify-center gap-2 uppercase tracking-wider transition-colors"
                >
                  <span>Explore SR POWER SOLUTION Profile</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('/request-quote')}
                  className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-6 py-3 rounded flex items-center justify-center gap-2 uppercase tracking-wider transition-all shadow-lg"
                >
                  <Zap className="w-4 h-4" />
                  <span>Discuss Your Power Requirement</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
