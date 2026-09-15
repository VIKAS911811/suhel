import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WorkedWithCompany, CompanyCategory } from '../types';
import {
  Building2,
  Briefcase,
  MapPin,
  Calendar,
  Layers,
  Wrench,
  ShieldCheck,
  Search,
  ExternalLink,
  ChevronRight,
  Factory,
  Zap,
  Sparkles,
  Info
} from 'lucide-react';

interface CompaniesWorkedWithSectionProps {
  onNavigate?: (path: string) => void;
  className?: string;
  showCategoryFilters?: boolean;
  limit?: number;
}

const CATEGORIES: CompanyCategory[] = [
  'All',
  'Power',
  'Steel',
  'Manufacturing',
  'Infrastructure',
  'Oil & Gas',
  'Chemical',
  'Refinery',
  'Engineering',
  'Construction',
  'Other'
];

export const CompaniesWorkedWithSection: React.FC<CompaniesWorkedWithSectionProps> = ({
  onNavigate,
  className = '',
  showCategoryFilters = true,
  limit
}) => {
  const [companies, setCompanies] = useState<WorkedWithCompany[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CompanyCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCompanyDetail, setSelectedCompanyDetail] = useState<WorkedWithCompany | null>(null);

  const fetchWorkedCompanies = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/companies-worked-with');
      if (!res.ok) {
        throw new Error(`Failed to fetch: HTTP ${res.status}`);
      }
      const data = await res.json();
      if (data && Array.isArray(data.companies)) {
        setCompanies(data.companies);
        setError(null);
      } else {
        setCompanies([]);
      }
    } catch (err: any) {
      console.error('[SR GROUP] Error loading worked with companies:', err);
      setError('Unable to load client companies at this moment.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkedCompanies();
  }, []);

  // Filter available categories based on actual companies
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    companies.forEach((c) => {
      if (c.category) set.add(c.category);
    });
    return CATEGORIES.filter((cat) => cat === 'All' || set.has(cat));
  }, [companies]);

  // Filter companies
  const filteredCompanies = useMemo(() => {
    let list = [...companies];

    if (selectedCategory !== 'All') {
      list = list.filter(
        (c) => c.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.company_name.toLowerCase().includes(q) ||
          c.industry.toLowerCase().includes(q) ||
          (c.project_name && c.project_name.toLowerCase().includes(q)) ||
          (c.scope_of_work && c.scope_of_work.toLowerCase().includes(q)) ||
          (c.location && c.location.toLowerCase().includes(q)) ||
          (c.description && c.description.toLowerCase().includes(q))
      );
    }

    if (limit && limit > 0) {
      return list.slice(0, limit);
    }

    return list;
  }, [companies, selectedCategory, searchQuery, limit]);

  // Helper to generate clean initials for text-based placeholder
  const getInitials = (name: string): string => {
    const clean = name.replace(/\(SAMPLE.*?\)/gi, '').trim();
    const words = clean.split(/\s+/).filter(Boolean);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return clean.slice(0, 2).toUpperCase();
  };

  // Helper to get category-specific icon
  const getCategoryIcon = (cat: string) => {
    switch (cat?.toLowerCase()) {
      case 'power':
        return <Zap className="w-3.5 h-3.5 text-amber-400" />;
      case 'steel':
      case 'manufacturing':
        return <Factory className="w-3.5 h-3.5 text-orange-400" />;
      case 'infrastructure':
      case 'construction':
        return <Building2 className="w-3.5 h-3.5 text-blue-400" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <section
      id="companies-worked-with"
      className={`py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left relative scroll-mt-24 ${className}`}
    >
      {/* Section Header */}
      <div className="space-y-4 max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3.5 py-1.5 rounded-full border border-amber-500/20 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>CLIENT SATISFACTION & INDUSTRIAL TRUST</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase font-mono tracking-tight text-white leading-tight">
          COMPANIES WE HAVE WORKED WITH
        </h2>

        <p className="text-slate-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
          Trusted by leading companies across industrial, infrastructure, power, manufacturing and engineering sectors.
        </p>

        <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full mt-3" />
      </div>

      {/* Category Filter Pills & Search Bar */}
      {showCategoryFilters && companies.length > 0 && (
        <div className="mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-3 sm:p-4 rounded-2xl shadow-xl backdrop-blur-md">
            {/* Horizontal Scrollable Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin scrollbar-thumb-slate-700">
              {availableCategories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-mono uppercase font-bold tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-[1.02]'
                        : 'bg-slate-950/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    <span>{cat}</span>
                    {cat !== 'All' && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                          isSelected ? 'bg-slate-950/20 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {companies.filter((c) => c.category?.toLowerCase() === cat.toLowerCase()).length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Live Search */}
            <div className="relative sm:w-72 shrink-0">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clients or projects..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-amber-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 text-xs font-mono"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-5 space-y-4 animate-pulse h-80"
            >
              <div className="h-16 bg-slate-800 rounded-xl w-3/4 mx-auto" />
              <div className="h-4 bg-slate-800 rounded w-5/6 mx-auto" />
              <div className="h-3 bg-slate-800 rounded w-1/2 mx-auto" />
              <div className="space-y-2 pt-4 border-t border-slate-800/60">
                <div className="h-3 bg-slate-800 rounded w-full" />
                <div className="h-3 bg-slate-800 rounded w-4/5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-rose-500/10 border border-rose-500/30 p-6 rounded-2xl text-center space-y-2 max-w-xl mx-auto">
          <p className="text-sm font-mono text-rose-400">{error}</p>
          <button
            onClick={fetchWorkedCompanies}
            className="text-xs font-mono uppercase font-bold text-amber-400 hover:underline"
          >
            Click to retry loading
          </button>
        </div>
      )}

      {/* Empty State: If no companies are active or added */}
      {!loading && !error && companies.length === 0 && (
        <div className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-12 text-center max-w-2xl mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
            <Building2 className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-black font-mono uppercase text-white tracking-wide">
            OUR INDUSTRIAL PARTNERS & CLIENTS
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
            SR GROUP actively executes turnkey engineering, fabrication, and electrical infrastructure contracts for major industrial partners.
          </p>
          {onNavigate && (
            <div className="pt-2">
              <button
                onClick={() => onNavigate('/request-quote')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-6 py-3 rounded-xl uppercase tracking-wider font-mono shadow-lg transition-all"
              >
                Partner With Us
              </button>
            </div>
          )}
        </div>
      )}

      {/* No Search Results */}
      {!loading && !error && companies.length > 0 && filteredCompanies.length === 0 && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-10 text-center space-y-3 max-w-lg mx-auto">
          <p className="text-sm text-slate-300 font-mono">
            No worked-with companies matched your filter criteria.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-xs text-amber-400 font-bold uppercase font-mono hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Responsive Companies Grid: Desktop 4-5, Tablet 3, Mobile 1-2 */}
      {!loading && !error && filteredCompanies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {filteredCompanies.map((company, idx) => {
            const hasLogo = Boolean(company.logo_url && company.logo_url.trim());
            const isSample = company.company_name.toUpperCase().includes('SAMPLE');
            const cleanName = company.company_name.replace(/\(SAMPLE.*?\)/gi, '').trim();

            return (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.4) }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => setSelectedCompanyDetail(company)}
                className="bg-slate-900 border border-slate-800/90 hover:border-amber-500/50 rounded-2xl p-5 flex flex-col justify-between shadow-xl transition-all duration-300 group cursor-pointer relative overflow-hidden text-left"
              >
                {/* Subtle Amber Top Accent on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Sample Badge if applicable */}
                {isSample && (
                  <div className="absolute top-2.5 right-2.5">
                    <span className="text-[9px] font-black uppercase font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                      SAMPLE
                    </span>
                  </div>
                )}

                {/* Top Section: Logo & Category */}
                <div className="space-y-3.5">
                  {/* Logo Container with Strict Aspect Ratio & Anti-distortion */}
                  <div className="w-full h-20 rounded-xl bg-white flex items-center justify-center p-3 border border-slate-700/50 shadow-inner overflow-hidden group-hover:scale-[1.02] transition-transform">
                    {hasLogo ? (
                      <img
                        src={company.logo_url}
                        alt={`${cleanName} Logo`}
                        referrerPolicy="no-referrer"
                        className="max-h-14 max-w-full object-contain filter drop-shadow-sm select-none"
                        loading="lazy"
                        onError={(e) => {
                          // Fallback to text initials if image fails to load
                          (e.target as HTMLElement).style.display = 'none';
                          const fallbackEl = document.getElementById(`fallback-${company.id}`);
                          if (fallbackEl) fallbackEl.style.display = 'flex';
                        }}
                      />
                    ) : null}

                    {/* Text-based Industrial Placeholder if no logo or fallback */}
                    <div
                      id={`fallback-${company.id}`}
                      className={`items-center justify-center gap-2 w-full h-full ${
                        hasLogo ? 'hidden' : 'flex'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center font-black font-mono text-sm border border-slate-800 shadow-sm shrink-0">
                        {getInitials(company.company_name)}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-black font-mono text-slate-800 tracking-wider truncate uppercase">
                          {company.category || 'CLIENT'}
                        </span>
                        <span className="text-[9px] font-mono text-slate-600 truncate uppercase">
                          PARTNER
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Company Name & Sector Badge */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center gap-1.5">
                      <span className="p-1 rounded bg-slate-800/80 shrink-0">
                        {getCategoryIcon(company.category)}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/90 font-mono truncate">
                        {company.industry || company.category}
                      </span>
                    </div>

                    <h3
                      className="text-sm font-black text-white font-mono uppercase tracking-tight line-clamp-2 group-hover:text-amber-300 transition-colors leading-snug"
                      title={cleanName}
                    >
                      {cleanName}
                    </h3>
                  </div>

                  {/* Short Description */}
                  {company.description && (
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {company.description}
                    </p>
                  )}

                  {/* Optional Project & Scope Metadata */}
                  {(company.project_name || company.scope_of_work) && (
                    <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-[11px] font-mono">
                      {company.project_name && (
                        <div className="flex items-start gap-1.5 text-slate-300">
                          <Wrench className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1 font-semibold text-slate-200">
                            {company.project_name}
                          </span>
                        </div>
                      )}

                      {company.scope_of_work && (
                        <div className="flex items-start gap-1.5 text-slate-400">
                          <Layers className="w-3 h-3 text-slate-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1 text-slate-400">
                            {company.scope_of_work}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Card Footer: Location / Year / Action */}
                <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  {company.location ? (
                    <div className="flex items-center gap-1 truncate max-w-[70%]" title={company.location}>
                      <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{company.location}</span>
                    </div>
                  ) : company.year ? (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{company.year}</span>
                    </div>
                  ) : (
                    <span className="text-slate-600">Client Partner</span>
                  )}

                  <span className="text-amber-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-bold">
                    <span>Details</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Modal View for In-Depth Company & Projects Detail */}
      <AnimatePresence>
        {selectedCompanyDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-left"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-800 bg-slate-950 flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  {/* Logo or Badge in Modal */}
                  <div className="w-20 h-16 rounded-xl bg-white flex items-center justify-center p-2 border border-slate-700 shrink-0 overflow-hidden shadow-sm">
                    {selectedCompanyDetail.logo_url ? (
                      <img
                        src={selectedCompanyDetail.logo_url}
                        alt={selectedCompanyDetail.company_name}
                        referrerPolicy="no-referrer"
                        className="max-h-12 max-w-full object-contain"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-slate-900 text-amber-400 flex items-center justify-center font-black font-mono text-sm">
                        {getInitials(selectedCompanyDetail.company_name)}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black uppercase font-mono bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded">
                        {selectedCompanyDetail.category}
                      </span>
                      {selectedCompanyDetail.year && (
                        <span className="text-[10px] font-mono text-slate-400">
                          {selectedCompanyDetail.year}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg sm:text-xl font-black font-mono uppercase text-white leading-tight">
                      {selectedCompanyDetail.company_name.replace(/\(SAMPLE.*?\)/gi, '').trim()}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      {selectedCompanyDetail.industry}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCompanyDetail(null)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
                {/* Description */}
                {selectedCompanyDetail.description && (
                  <div className="space-y-1.5 bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5" />
                      <span>Engagement Overview</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {selectedCompanyDetail.description}
                    </p>
                  </div>
                )}

                {/* Primary Project & Scope */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedCompanyDetail.project_name && (
                    <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-1 font-mono">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <Wrench className="w-3 h-3 text-amber-400" />
                        Project Name
                      </span>
                      <p className="text-xs font-bold text-white">
                        {selectedCompanyDetail.project_name}
                      </p>
                    </div>
                  )}

                  {selectedCompanyDetail.location && (
                    <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-1 font-mono">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        Project Location
                      </span>
                      <p className="text-xs font-bold text-white">
                        {selectedCompanyDetail.location}
                      </p>
                    </div>
                  )}
                </div>

                {selectedCompanyDetail.scope_of_work && (
                  <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-1.5 font-mono">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-amber-400" />
                      Scope of Work / Deliverables
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {selectedCompanyDetail.scope_of_work}
                    </p>
                  </div>
                )}

                {/* Multiple Sub-Projects Architecture Support */}
                {selectedCompanyDetail.projects && selectedCompanyDetail.projects.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>Additional Executed Contracts</span>
                    </h4>

                    <div className="space-y-2">
                      {selectedCompanyDetail.projects.map((proj, pIdx) => (
                        <div
                          key={pIdx}
                          className="bg-slate-950 border border-slate-800 p-3 rounded-xl space-y-1 font-mono text-xs"
                        >
                          <div className="flex items-center justify-between text-white font-bold">
                            <span>{proj.projectName}</span>
                            {proj.year && (
                              <span className="text-[10px] text-slate-400">{proj.year}</span>
                            )}
                          </div>
                          {proj.scopeOfWork && (
                            <p className="text-[11px] text-slate-400">{proj.scopeOfWork}</p>
                          )}
                          {proj.location && (
                            <p className="text-[10px] text-slate-500 flex items-center gap-1">
                              <MapPin className="w-2.5 h-2.5" />
                              <span>{proj.location}</span>
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  SR GROUP Verified Client Record
                </span>
                <div className="flex items-center gap-3">
                  {onNavigate && (
                    <button
                      onClick={() => {
                        setSelectedCompanyDetail(null);
                        onNavigate('/request-quote');
                      }}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-2 rounded-lg font-mono uppercase tracking-wider shadow"
                    >
                      Request RFQ
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedCompanyDetail(null)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs px-4 py-2 rounded-lg"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
