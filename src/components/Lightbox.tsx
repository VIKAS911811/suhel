import React from 'react';
import { X, ChevronLeft, ChevronRight, FileText, Tag, Building2 } from 'lucide-react';
import { GalleryItem } from '../types';
import { getCompanyDisplayName } from '../data/groupData';

interface LightboxProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onSelect: (item: GalleryItem) => void;
  onEnquire: (item: GalleryItem) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  item,
  items,
  onClose,
  onSelect,
  onEnquire,
}) => {
  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);
  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    onSelect(items[prevIndex]);
  };
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % items.length;
    onSelect(items[nextIndex]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      {/* Top Controls */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
        <button
          onClick={() => onEnquire(item)}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors shadow"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Quote For Similar Work</span>
        </button>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors focus:outline-none"
          title="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Container */}
      <div className="relative max-w-5xl w-full flex flex-col items-center">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 flex items-center justify-center transition-all shadow-lg"
          title="Previous Image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white border border-slate-700 flex items-center justify-center transition-all shadow-lg"
          title="Next Image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="max-h-[75vh] w-full flex items-center justify-center overflow-hidden rounded-lg border border-slate-800 bg-slate-900 shadow-2xl">
          <img
            src={item.image}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="max-h-[75vh] w-auto max-w-full object-contain"
          />
        </div>

        {/* Caption & Metadata */}
        <div className="w-full mt-4 bg-slate-900/90 border border-slate-800 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20 flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {item.category}
              </span>
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                <Building2 className="w-3 h-3 text-amber-400" />
                {getCompanyDisplayName(item.companyId)}
              </span>
            </div>
            <h3 className="text-base font-extrabold text-white">{item.title}</h3>
            <p className="text-xs text-slate-300">{item.caption}</p>
          </div>

          <div className="text-xs text-slate-400 font-mono shrink-0">
            {currentIndex + 1} / {items.length}
          </div>
        </div>
      </div>
    </div>
  );
};
