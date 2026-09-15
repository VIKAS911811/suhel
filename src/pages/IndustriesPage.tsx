import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { IndustrySector, CompanyId } from '../types';
import { INDUSTRIES_SERVED } from '../data/groupData';
import { HardHat, Building2, Layers, Zap, X, FileText, ChevronRight, CheckCircle2 } from 'lucide-react';

interface IndustriesPageProps {
  onNavigate: (path: string) => void;
  onSelectCompany: (companyId: CompanyId) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ onNavigate, onSelectCompany }) => {
  const [selectedSector, setSelectedSector] = useState<IndustrySector | null>(null);
  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);

  const handleOpenSector = (sector: IndustrySector) => {
    setSelectedSector(sector);
    setActiveModalImage(sector.image);
  };

  const getCompanyBadge = (comp: CompanyId) => {
    switch (comp) {
      case 'sr-infra':
        return <span key={comp} className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-bold px-2 py-0.5 rounded">NEW SR INFRA</span>;
      case 'suhel-engineering':
        return <span key={comp} className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-bold px-2 py-0.5 rounded">SUHEL ENG</span>;
      case 'sr-power-solution':
        return <span key={comp} className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded">SR POWER</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title="Industries We Serve | Steel, Power, Cement, Chemical - SR GROUP"
        description="SR GROUP provides specialized structural fabrication, process piping, heavy mechanical erection, and power solutions across 15 industrial sectors including steel plants, power plants, cement, and chemical complexes."
      />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-left space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
            <HardHat className="w-3.5 h-3.5" />
            <span>INDUSTRIAL SECTORS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase font-mono tracking-tight text-white">
            INDUSTRIES WE SERVE
          </h1>
          <p className="text-slate-300 text-base max-w-3xl">
            Integrated engineering, structural fabrication, industrial piping, and HT/LT electrical solutions tailored to India's core heavy industries.
          </p>
        </div>

        {/* 15 Industrial Sector Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INDUSTRIES_SERVED.map((sector) => (
            <div
              key={sector.id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-amber-500/50 transition-all flex flex-col justify-between text-left group shadow-xl"
            >
              <div>
                <div
                  className="relative h-48 overflow-hidden cursor-pointer"
                  onClick={() => handleOpenSector(sector)}
                >
                  <img
                    src={sector.image}
                    alt={sector.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                    {sector.relevantCompanies.map((c) => getCompanyBadge(c))}
                  </div>

                  {sector.gallery && sector.gallery.length > 1 && (
                    <span className="absolute top-3 right-3 bg-slate-950/85 backdrop-blur-sm text-amber-400 border border-amber-500/40 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      {sector.gallery.length} Site Photos
                    </span>
                  )}

                  <h3 className="absolute bottom-3 left-4 text-lg font-black text-white font-mono">
                    {sector.title}
                  </h3>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {sector.shortDesc}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                      Core Services Provided:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {sector.keyServices.map((ks, idx) => (
                        <span key={idx} className="bg-slate-950 text-slate-300 text-[11px] px-2.5 py-1 rounded border border-slate-800">
                          {ks}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => handleOpenSector(sector)}
                  className="w-full bg-slate-950 border border-slate-700 hover:bg-slate-800 text-amber-400 font-bold text-xs py-2.5 rounded flex items-center justify-center gap-2 uppercase tracking-wider transition-colors"
                >
                  <span>Learn Sector Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Sector Detail Modal */}
        {selectedSector && (
          <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 text-left relative max-h-[90vh] overflow-y-auto shadow-2xl">
              <button
                onClick={() => setSelectedSector(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {selectedSector.relevantCompanies.map((c) => getCompanyBadge(c))}
                </div>
                <h2 className="text-2xl font-black text-white font-mono uppercase">{selectedSector.title}</h2>
              </div>

              {/* Main Image & Gallery Thumbnails */}
              <div className="space-y-3">
                <div className="h-56 sm:h-64 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
                  <img
                    src={activeModalImage || selectedSector.image}
                    alt={selectedSector.title}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                </div>

                {selectedSector.gallery && selectedSector.gallery.length > 1 && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Site & Project Photos ({selectedSector.gallery.length}):
                    </span>
                    <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                      {selectedSector.gallery.map((imgUrl, idx) => {
                        const isActive = (activeModalImage || selectedSector.image) === imgUrl;
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setActiveModalImage(imgUrl)}
                            className={`relative h-16 w-24 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                              isActive ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-slate-800 hover:border-slate-600 opacity-70 hover:opacity-100'
                            }`}
                          >
                            <img src={imgUrl} alt={`${selectedSector.title} photo ${idx + 1}`} className="w-full h-full object-cover" />
                            <span className="absolute bottom-0.5 right-1 bg-slate-950/80 text-[9px] font-bold text-white px-1 rounded">
                              #{idx + 1}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <p>{selectedSector.fullDesc}</p>
                
                <div className="pt-2">
                  <span className="font-bold text-amber-400 uppercase tracking-wider block mb-2">Key SR GROUP Offerings for {selectedSector.title}:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedSector.keyServices.map((ks, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-slate-950 p-2.5 rounded border border-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="font-medium text-white">{ks}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => {
                    setSelectedSector(null);
                    onNavigate('/request-quote');
                  }}
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-6 py-3 rounded flex items-center justify-center gap-2 uppercase tracking-wider shadow"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request Quote For {selectedSector.title}</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
