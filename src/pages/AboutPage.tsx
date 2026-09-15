import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { CompanyId } from '../types';
import { COMPANIES_DATA } from '../data/groupData';
import { Building2, ShieldCheck, CheckCircle2, Award, HardHat, FileText, ChevronRight, Layers, Zap } from 'lucide-react';
import { CmdSection } from '../components/cmd/CmdSection';
import { SR_GROUP_HERO_BASE64 } from '../assets/images/srGroupHeroBase64';

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onSelectCompany: (companyId: CompanyId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onSelectCompany }) => {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title="About SR GROUP | Engineering Strength & Industrial Experience"
        description="Learn about SR GROUP, an integrated multi-disciplinary Indian industrial group uniting NEW SR INFRA, SUHEL ENGINEERING, and SR POWER SOLUTION for heavy structural fabrication, pipeline, plant maintenance, and electrical power projects."
      />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Page Header */}
        <div className="text-left space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
            <HardHat className="w-3.5 h-3.5" />
            <span>OUR GROUP IDENTITY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase font-mono tracking-tight text-white">
            ABOUT SR GROUP
          </h1>
          <p className="text-slate-300 text-base max-w-3xl">
            Engineering Strength. Industrial Experience. Trusted Execution.
          </p>
        </div>

        {/* Section 1: Core Group Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <h2 className="text-2xl font-extrabold uppercase font-mono text-white text-left">
              Integrated Engineering Capabilities Across India
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              SR GROUP is a multi-disciplinary industrial engineering group providing integrated solutions across infrastructure, engineering, fabrication, erection and power-related projects.
            </p>

            <p className="text-slate-300 text-sm leading-relaxed">
              The group brings together specialized companies with complementary capabilities to support industrial clients from project execution to infrastructure and power solutions.
            </p>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-l-2 border-amber-500 pl-2">
                Our Primary Objectives
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Quality engineering</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Safe execution</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Timely completion</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Professional project management</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Reliable industrial solutions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Long-term customer relationships</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl overflow-hidden border border-slate-800 shadow-2xl relative">
              <img
                src={SR_GROUP_HERO_BASE64}
                alt="SR Group Engineering Execution"
                referrerPolicy="no-referrer"
                className="w-full h-[380px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 border border-slate-700 p-4 rounded text-left">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
                  ONE GROUP. COMPLETE SOLUTIONS.
                </span>
                <p className="text-xs text-slate-300 mt-1">
                  NEW SR INFRA • SUHEL ENGINEERING • SR POWER SOLUTION
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CMD & Leadership Section */}
        <CmdSection title="LEADERSHIP & VISION" subtitle="Message & Profile of Chairman & Managing Director (CMD)" />

        {/* Section 2: Group Structure Breakdown */}
        <div className="space-y-8 text-left">
          <div className="space-y-2 border-b border-slate-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">ORGANIZATIONAL ARCHITECTURE</span>
            <h2 className="text-2xl font-black uppercase font-mono text-white">SPECIALIZED SUBSIDIARY ENTITIES</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* NEW SR INFRA */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg space-y-4 text-left">
              <div className="flex items-center gap-2 text-blue-400 font-bold font-mono text-lg">
                <Building2 className="w-5 h-5" />
                <span>NEW SR INFRA</span>
              </div>
              <p className="text-xs font-bold text-blue-400 uppercase">
                {COMPANIES_DATA['sr-infra'].category}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Focuses on heavy structural steel fabrication, crane gantries, industrial sheds, pipeline networks, and plant installation works.
              </p>
              <button
                onClick={() => {
                  onSelectCompany('sr-infra');
                  onNavigate('/companies/sr-infra');
                }}
                className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 uppercase tracking-wider pt-2"
              >
                <span>View Company Profile</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* SUHEL ENGINEERING */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg space-y-4 text-left">
              <div className="flex items-center gap-2 text-orange-400 font-bold font-mono text-lg">
                <Layers className="w-5 h-5" />
                <span>SUHEL ENGINEERING</span>
              </div>
              <p className="text-xs font-bold text-orange-400 uppercase">
                {COMPANIES_DATA['suhel-engineering'].category}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Specializes in process plant fabrication, chemical/gas piping, Sponge Iron, Ferro Alloys, Power, Cement, and plant maintenance shutdowns.
              </p>
              <button
                onClick={() => {
                  onSelectCompany('suhel-engineering');
                  onNavigate('/companies/suhel-engineering');
                }}
                className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 uppercase tracking-wider pt-2"
              >
                <span>View Company Profile</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* SR POWER SOLUTION */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg space-y-4 text-left">
              <div className="flex items-center gap-2 text-emerald-400 font-bold font-mono text-lg">
                <Zap className="w-5 h-5" />
                <span>SR POWER SOLUTION</span>
              </div>
              <p className="text-xs font-bold text-emerald-400 uppercase">
                {COMPANIES_DATA['sr-power-solution'].category}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Delivers HT/LT power distribution, PCC/MCC panel installations, cable trays, earthing grids, industrial solar PV, and electrical maintenance.
              </p>
              <button
                onClick={() => {
                  onSelectCompany('sr-power-solution');
                  onNavigate('/companies/sr-power-solution');
                }}
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 uppercase tracking-wider pt-2"
              >
                <span>View Company Profile</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Section 3: Core Value Pillars */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-xl space-y-6 text-left">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">OPERATIONAL PHILOSOPHY</span>
            <h2 className="text-2xl font-black font-mono uppercase text-white">THE SR GROUP COMMITMENT</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase">
                <Award className="w-4 h-4" />
                <span>Quality Workmanship</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Strict compliance with AWS D1.1, IS 2062, ASME Section IX, and IEEE electrical standards across all fabrication and field installations.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase">
                <ShieldCheck className="w-4 h-4" />
                <span>Safety First Culture</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Mandatory PPE, Job Safety Analysis (JSA), site permits to work, daily toolbox talks, and continuous site hazard identification.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase">
                <HardHat className="w-4 h-4" />
                <span>Timely Project Handoff</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Structured resource mobilization, 24/7 shutdown crews, and proactive site coordination to hit project milestones on schedule.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4 text-center">
          <button
            onClick={() => onNavigate('/request-quote')}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-8 py-4 rounded inline-flex items-center gap-2 uppercase tracking-wider shadow-lg transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>DISCUSS YOUR INDUSTRIAL REQUIREMENT</span>
          </button>
        </div>

      </div>
    </div>
  );
};
