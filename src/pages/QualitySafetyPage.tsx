import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { QUALITY_SAFETY_CARDS } from '../data/groupData';
import { ShieldCheck, HardHat, CheckCircle2, FileText } from 'lucide-react';

interface QualitySafetyPageProps {
  onNavigate: (path: string) => void;
}

export const QualitySafetyPage: React.FC<QualitySafetyPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title="Quality & Safety Policy | Zero-Incident Standard - SR GROUP"
        description="Learn about SR GROUP's quality assurance plans, AWS/IS welding inspections, mandatory site PPE compliance, work permits, toolbox talks, and environmental protection guidelines."
      />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-left space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
            <HardHat className="w-3.5 h-3.5" />
            <span>OPERATIONAL COMMITMENT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase font-mono tracking-tight text-white">
            QUALITY & SAFETY
          </h1>
          <p className="text-slate-300 text-base max-w-3xl">
            Quality and safety are fundamental principles of SR GROUP. Our approach integrates rigorous quality planning, NDT welding audits, site safety compliance, and environmental responsibility across every project.
          </p>
        </div>

        {/* 13 Checklist Pillars */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 text-left shadow-2xl">
          <h2 className="text-xl font-black uppercase font-mono text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <span>OUR 13 SAFETY & QUALITY COMMITMENT PILLARS</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-slate-200">
            {[
              'Quality planning & Quality Assurance Plans (QAP)',
              'Material inspection & Mill test certificates',
              'Workmanship inspection & dimensional audits',
              'Welding quality (AWS D1.1 / ASME Section IX)',
              'Dimensional & verticality laser inspection',
              'Site safety enforcement & Safety Officers',
              'PPE compliance (Helmets, Harnesses, Boots)',
              'Work permits (Hot Work, Height, Confined Spaces)',
              'Daily pre-shift Toolbox Talks & JSA',
              'Job Risk Assessment & Hazard identification',
              'Safe lifting practices & Crane rigging plans',
              'Emergency preparedness & First-aid readiness',
              'Environmental responsibility & Scrap management'
            ].map((pillar, idx) => (
              <div key={idx} className="flex items-center gap-2.5 bg-slate-950 p-3 rounded border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold">{pillar}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Three Core Cards: QUALITY, SAFETY, ENVIRONMENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {QUALITY_SAFETY_CARDS.map((card) => (
            <div
              key={card.title}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all shadow-xl text-left flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img src={card.image} alt={card.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                  <span className="absolute top-4 left-4 bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded uppercase tracking-wider shadow">
                    {card.title}
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-black text-white font-mono">{card.subtitle}</h3>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    {card.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onNavigate('/request-quote')}
                  className="w-full bg-slate-950 border border-slate-700 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Enquire With Quality Requirements</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
