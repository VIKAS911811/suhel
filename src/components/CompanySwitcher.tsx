import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Building2, Layers, Zap, Check } from 'lucide-react';
import { CompanyId } from '../types';
import { COMPANIES_DATA } from '../data/groupData';

interface CompanySwitcherProps {
  currentCompany: CompanyId;
  onSelectCompany: (companyId: CompanyId) => void;
  variant?: 'header' | 'hero' | 'bar';
}

export const CompanySwitcher: React.FC<CompanySwitcherProps> = ({
  currentCompany,
  onSelectCompany,
  variant = 'header'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeProfile = COMPANIES_DATA[currentCompany];

  const getIcon = (id: CompanyId) => {
    switch (id) {
      case 'sr-infra':
        return <Building2 className="w-4 h-4 text-blue-400" />;
      case 'suhel-engineering':
        return <Layers className="w-4 h-4 text-orange-400" />;
      case 'sr-power-solution':
        return <Zap className="w-4 h-4 text-emerald-400" />;
      default:
        return <Building2 className="w-4 h-4 text-amber-400" />;
    }
  };

  if (variant === 'bar') {
    return (
      <div className="bg-slate-900 border-y border-slate-800 py-3 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            SELECT COMPANY VIEW:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {Object.values(COMPANIES_DATA).map((comp) => {
              const isSelected = currentCompany === comp.id;
              return (
                <button
                  key={comp.id}
                  onClick={() => onSelectCompany(comp.id as CompanyId)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-semibold tracking-wide transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {getIcon(comp.id as CompanyId)}
                  <span>{comp.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-slate-800/90 hover:bg-slate-800 text-slate-100 border border-slate-700 px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-colors shadow-sm"
        aria-expanded={isOpen}
      >
        {getIcon(currentCompany)}
        <span className="hidden sm:inline font-bold">{activeProfile.name}</span>
        <span className="sm:hidden font-bold">{currentCompany === 'sr-group' ? 'GROUP' : activeProfile.name.split(' ')[0]}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl z-50 overflow-hidden divide-y divide-slate-800">
          <div className="px-3 py-2 bg-slate-950/80 text-[11px] font-bold tracking-wider uppercase text-slate-400">
            Our Industrial Group
          </div>
          <div className="py-1">
            {Object.values(COMPANIES_DATA).map((comp) => {
              const isSelected = currentCompany === comp.id;
              return (
                <button
                  key={comp.id}
                  onClick={() => {
                    onSelectCompany(comp.id as CompanyId);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-start gap-3 px-3 py-2.5 text-left text-xs transition-colors ${
                    isSelected ? 'bg-amber-500/10 text-amber-400' : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="mt-0.5">{getIcon(comp.id as CompanyId)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold flex items-center justify-between">
                      <span>{comp.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{comp.category}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
