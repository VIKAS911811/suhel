import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { GalleryItem } from '../types';
import { GALLERY_DATA, getCompanyDisplayName } from '../data/groupData';
import { Lightbox } from '../components/Lightbox';
import { HardHat, Filter, Tag, Eye, Building2 } from 'lucide-react';

interface GalleryPageProps {
  onNavigate: (path: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [activeCompany, setActiveCompany] = useState<string>('ALL');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = ['ALL', 'FABRICATION', 'ERECTION', 'PIPELINE', 'POWER', 'PLANT', 'SAFETY'];
  const companies = [
    { id: 'ALL', label: 'All Companies' },
    { id: 'sr-group', label: 'SR GROUP' },
    { id: 'sr-infra', label: 'NEW SR INFRA' },
    { id: 'suhel-engineering', label: 'SUHEL ENGINEERING' },
    { id: 'sr-power-solution', label: 'SR POWER SOLUTION' }
  ];

  const filteredItems = GALLERY_DATA.filter((item) => {
    const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
    const matchesCompany = activeCompany === 'ALL' || item.companyId === activeCompany;
    return matchesCategory && matchesCompany;
  });

  const getCompanyBadgeClass = (companyId: string) => {
    switch (companyId) {
      case 'sr-infra':
        return 'bg-blue-600/90 text-blue-100 border-blue-400/40';
      case 'suhel-engineering':
        return 'bg-orange-600/90 text-orange-100 border-orange-400/40';
      case 'sr-power-solution':
        return 'bg-emerald-600/90 text-emerald-100 border-emerald-400/40';
      default:
        return 'bg-slate-800/90 text-slate-200 border-slate-700';
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title="Industrial Gallery | Fabrication, Erection, Pipeline & Power - SR GROUP"
        description="Browse SR GROUP's industrial photography gallery showcasing structural steel workshop fabrication, site erection, process piping fit-up, HT electrical installations, and site safety."
      />

      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-left space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
            <HardHat className="w-3.5 h-3.5" />
            <span>VISUAL EXECUTION ARCHIVE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase font-mono tracking-tight text-white">
            INDUSTRIAL GALLERY
          </h1>
          <p className="text-slate-300 text-base max-w-3xl">
            High-definition visual record of heavy workshop fabrication, high-altitude structural erection, high-pressure utility piping, HT electrical panels, and site safety protocols across NEW SR INFRA, SUHEL ENGINEERING, and SR POWER SOLUTION.
          </p>
        </div>

        {/* Filter Bars */}
        <div className="space-y-3 bg-slate-900/90 border border-slate-800 p-4 rounded-xl shadow-lg">
          {/* Company Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 px-2 py-1 uppercase min-w-[130px]">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Company:</span>
            </div>
            {companies.map((comp) => (
              <button
                key={comp.id}
                onClick={() => setActiveCompany(comp.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg uppercase tracking-wider transition-all ${
                  activeCompany === comp.id
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {comp.label}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 px-2 py-1 uppercase min-w-[130px]">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <span>Category:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 text-xs font-bold rounded-lg uppercase transition-all ${
                  activeCategory === cat
                    ? 'bg-slate-100 text-slate-950 font-black shadow-sm'
                    : 'bg-slate-800/60 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden cursor-pointer shadow-xl hover:border-amber-500/50 transition-all text-left"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                
                <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5">
                  <span className="bg-amber-500 text-slate-950 font-black text-[10px] uppercase px-2 py-0.5 rounded shadow flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    <span>{item.category}</span>
                  </span>
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border backdrop-blur-sm shadow ${getCompanyBadgeClass(item.companyId)}`}>
                    {getCompanyDisplayName(item.companyId)}
                  </span>
                </div>

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity shadow">
                  <Eye className="w-4 h-4 text-amber-400" />
                </div>

                <div className="absolute bottom-3 left-3 right-3 space-y-1">
                  <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                    {getCompanyDisplayName(item.companyId)}
                  </span>
                  <h3 className="text-xs font-bold text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-300 line-clamp-1 opacity-90">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="p-12 text-center bg-slate-900/60 rounded-xl border border-slate-800">
            <p className="text-sm text-slate-400">No images found for the selected company and category.</p>
          </div>
        )}

        {/* Lightbox Component */}
        <Lightbox
          item={selectedItem}
          items={filteredItems}
          onClose={() => setSelectedItem(null)}
          onSelect={(item) => setSelectedItem(item)}
          onEnquire={() => {
            setSelectedItem(null);
            onNavigate('/request-quote');
          }}
        />

      </div>
    </div>
  );
};

