import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { CompanyId } from '../types';
import { PROJECTS_DATA } from '../data/groupData';
import { HardHat, Building2, MapPin, CheckCircle2, Clock, FileText, Filter } from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (path: string) => void;
  onSelectCompany: (companyId: CompanyId) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const [activeCompanyFilter, setActiveCompanyFilter] = useState<CompanyId | 'all'>('all');

  const filteredProjects = activeCompanyFilter === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.companyId === activeCompanyFilter);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title="Our Projects | Structural Fabrication, Pipeline & Electrical - SR GROUP"
        description="Explore representative industrial projects executed by SR GROUP subsidiaries across structural steel fabrication, high-pressure piping, process plant maintenance, and HT/LT electrical distribution."
      />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-left space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
            <HardHat className="w-3.5 h-3.5" />
            <span>EXECUTION PORTFOLIO</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase font-mono tracking-tight text-white">
            OUR PROJECTS
          </h1>
          <p className="text-slate-300 text-base max-w-3xl">
            Representative project portfolio demonstrating industrial engineering, structural fabrication, process pipeline erection, and HT/LT power distribution.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-900 border border-slate-800 p-2 rounded-lg">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 px-3 py-1 uppercase">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span>Filter By Company:</span>
          </div>
          
          <button
            onClick={() => setActiveCompanyFilter('all')}
            className={`px-3 py-1.5 text-xs font-bold rounded uppercase transition-colors ${
              activeCompanyFilter === 'all'
                ? 'bg-amber-500 text-slate-950 font-black'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All Projects
          </button>
          
          <button
            onClick={() => setActiveCompanyFilter('sr-infra')}
            className={`px-3 py-1.5 text-xs font-bold rounded uppercase transition-colors ${
              activeCompanyFilter === 'sr-infra'
                ? 'bg-blue-600 text-white font-black'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            NEW SR INFRA
          </button>

          <button
            onClick={() => setActiveCompanyFilter('suhel-engineering')}
            className={`px-3 py-1.5 text-xs font-bold rounded uppercase transition-colors ${
              activeCompanyFilter === 'suhel-engineering'
                ? 'bg-orange-600 text-white font-black'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            SUHEL ENGINEERING
          </button>

          <button
            onClick={() => setActiveCompanyFilter('sr-power-solution')}
            className={`px-3 py-1.5 text-xs font-bold rounded uppercase transition-colors ${
              activeCompanyFilter === 'sr-power-solution'
                ? 'bg-emerald-600 text-white font-black'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            SR POWER SOLUTION
          </button>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all flex flex-col justify-between text-left shadow-xl"
            >
              <div>
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-amber-500 text-slate-950 font-black text-[10px] uppercase px-2.5 py-1 rounded">
                      {proj.companyName}
                    </span>
                    <span className="bg-slate-950/80 text-white font-bold text-[10px] uppercase px-2 py-0.5 rounded border border-slate-700 flex items-center gap-1">
                      {proj.completionStatus === 'Completed' ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Clock className="w-3 h-3 text-amber-400" />
                      )}
                      <span>{proj.completionStatus}</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 flex items-center gap-1 text-[11px] font-medium text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{proj.location}</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
                      SECTOR: {proj.industry.toUpperCase()}
                    </span>
                    <h3 className="text-base font-black text-white font-mono mt-1 leading-snug">
                      {proj.title}
                    </h3>
                  </div>

                  <div className="space-y-1 pt-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Scope of Work:</span>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {proj.scopeOfWork}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400 italic leading-relaxed border-l-2 border-slate-700 pl-3">
                    "{proj.description}"
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => onNavigate('/request-quote')}
                  className="w-full bg-slate-950 border border-slate-700 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Request Similar Project Quote</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
