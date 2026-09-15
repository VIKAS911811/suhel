import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Phone, Mail, FileText, ChevronRight, ChevronDown, LayoutDashboard, Building2, Layers, Zap, Globe } from 'lucide-react';
import { CompanyId } from '../types';
import { CompanySwitcher } from './CompanySwitcher';
import { PLACEHOLDERS } from '../data/groupData';
import { SRGroupLogo } from './logos/CompanyLogos';
import { useAdminAuth } from '../context/AdminAuthContext';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  currentCompany: CompanyId;
  onSelectCompany: (companyId: CompanyId) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  currentCompany,
  onSelectCompany,
}) => {
  const { isAdmin, openAdminDashboard } = useAdminAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [companiesDropdownOpen, setCompaniesDropdownOpen] = useState(false);
  const [emailsDropdownOpen, setEmailsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const emailDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCompaniesDropdownOpen(false);
      }
      if (emailDropdownRef.current && !emailDropdownRef.current.contains(event.target as Node)) {
        setEmailsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const companySubLinks = [
    {
      label: 'NEW SR INFRA',
      path: '/companies/sr-infra',
      companyId: 'sr-infra' as CompanyId,
      subtitle: 'Heavy Structural Fabrication & Erection',
      icon: <Building2 className="w-4 h-4 text-blue-400 shrink-0" />,
      color: 'hover:border-blue-500/50 hover:bg-blue-500/10',
    },
    {
      label: 'SUHEL ENGINEERING',
      path: '/companies/suhel-engineering',
      companyId: 'suhel-engineering' as CompanyId,
      subtitle: 'Process Plant Piping & Execution',
      icon: <Layers className="w-4 h-4 text-orange-400 shrink-0" />,
      color: 'hover:border-amber-500/50 hover:bg-amber-500/10',
    },
    {
      label: 'SR POWER SOLUTION',
      path: '/companies/sr-power-solution',
      companyId: 'sr-power-solution' as CompanyId,
      subtitle: 'HT/LT Power & Industrial Electricals',
      icon: <Zap className="w-4 h-4 text-emerald-400 shrink-0" />,
      color: 'hover:border-emerald-500/50 hover:bg-emerald-500/10',
    },
    {
      label: '3 COMPANIES PORTAL',
      path: '/portal',
      companyId: 'sr-group' as CompanyId,
      subtitle: 'Unified Multi-Entity Architecture',
      icon: <Globe className="w-4 h-4 text-sky-400 shrink-0" />,
      color: 'hover:border-sky-500/50 hover:bg-sky-500/10',
    },
  ];

  const mainNavLinks = [
    { label: 'HOME', path: '/' },
    { label: 'SERVICES', path: '/services' },
    { label: 'INDUSTRIES', path: '/industries' },
    { label: 'PROJECTS', path: '/projects' },
    { label: 'QUALITY & SAFETY', path: '/quality-safety' },
    { label: 'GALLERY', path: '/gallery' },
    { label: 'ABOUT GROUP', path: '/about' },
    { label: 'CONTACT', path: '/contact' },
  ];

  // Full flat links for mobile menu
  const mobileNavLinks = [
    { label: 'HOME', path: '/' },
    { label: 'NEW SR INFRA', path: '/companies/sr-infra' },
    { label: 'SUHEL ENGINEERING', path: '/companies/suhel-engineering' },
    { label: 'SR POWER SOLUTION', path: '/companies/sr-power-solution' },
    { label: '3 COMPANIES PORTAL', path: '/portal' },
    { label: 'SERVICES', path: '/services' },
    { label: 'INDUSTRIES', path: '/industries' },
    { label: 'PROJECTS', path: '/projects' },
    { label: 'QUALITY & SAFETY', path: '/quality-safety' },
    { label: 'GALLERY', path: '/gallery' },
    { label: 'ABOUT GROUP', path: '/about' },
    { label: 'CONTACT', path: '/contact' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setCompaniesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCompanyActive = currentPath.startsWith('/companies') || currentPath === '/portal';

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Bar for industrial contact details */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 border-b border-slate-800/80">
        <div className="w-full max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] font-medium tracking-wide flex-wrap justify-center sm:justify-start">
            <a href="tel:+919898241068" className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors shrink-0">
              <Phone className="w-3 h-3 text-amber-500 shrink-0" />
              <span>{PLACEHOLDERS.phone}</span>
            </a>
            <a href="tel:+919129325506" className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors shrink-0">
              <Phone className="w-3 h-3 text-amber-500 shrink-0" />
              <span>{PLACEHOLDERS.secondaryPhone}</span>
            </a>
            <a href={`mailto:${PLACEHOLDERS.email}`} className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors font-mono font-medium shrink-0">
              <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="text-amber-300/90 hover:text-amber-400">{PLACEHOLDERS.email}</span>
            </a>
            <a href="mailto:project@srgroupone.com" className="hidden md:flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition-colors font-mono font-medium shrink-0">
              <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="text-amber-300/90 hover:text-amber-400">project@srgroupone.com</span>
            </a>

            {/* Department Emails Popover / Quick Access */}
            <div className="relative shrink-0" ref={emailDropdownRef}>
              <button
                type="button"
                onClick={() => setEmailsDropdownOpen(!emailsDropdownOpen)}
                className="text-[10px] font-sans font-bold bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300 border border-slate-700/80 px-2 py-0.5 rounded flex items-center gap-1 transition-colors"
                title="View all 5 SR GROUP departmental emails"
              >
                <span>Department Emails</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${emailsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {emailsDropdownOpen && (
                <div className="absolute left-0 sm:left-auto sm:right-0 mt-1.5 w-72 bg-slate-950/95 border border-amber-500/30 rounded-xl shadow-2xl p-2.5 z-50 space-y-1.5 backdrop-blur-md">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-800 px-1">
                    <span>SR GROUP Email Directory</span>
                    <span className="text-amber-400 font-mono">5 DEPARTMENTS</span>
                  </div>
                  {PLACEHOLDERS.departmentEmails.map((dept) => (
                    <a
                      key={dept.email}
                      href={`mailto:${dept.email}`}
                      className="block p-1.5 rounded hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-slate-200 font-sans">{dept.department}</span>
                        <span className="text-[9px] font-mono bg-amber-500/20 text-amber-400 px-1 rounded font-bold">
                          {dept.badge}
                        </span>
                      </div>
                      <div className="text-amber-300 font-mono text-[11px] font-bold">
                        {dept.email}
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>

            <span className="hidden lg:inline text-slate-400 border-l border-slate-700 pl-3 shrink-0">
              Gandhidham (Kutch) Gujarat
            </span>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <CompanySwitcher
              currentCompany={currentCompany}
              onSelectCompany={onSelectCompany}
            />
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/95 backdrop-blur-md shadow-xl py-2.5 border-b border-slate-800'
            : 'bg-slate-900 py-3.5 border-b border-slate-800'
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo Area - Permanently non-shrinking on all screen sizes & device modes */}
          <button
            onClick={() => {
              onSelectCompany('sr-group');
              handleLinkClick('/');
            }}
            className="flex items-center gap-2.5 sm:gap-3 group text-left focus:outline-none hover:opacity-95 transition-opacity shrink-0 flex-shrink-0 select-none py-1"
            title="SR GROUP - Engineering & Infrastructure"
          >
            <SRGroupLogo size="md" showText={true} />
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center space-x-1">
            {/* Home link */}
            <button
              onClick={() => handleLinkClick('/')}
              className={`px-3 py-2 text-xs font-bold tracking-wider transition-colors uppercase rounded whitespace-nowrap ${
                currentPath === '/'
                  ? 'text-amber-400 bg-amber-500/10 border-b-2 border-amber-500'
                  : 'text-slate-200 hover:text-amber-400 hover:bg-slate-800/60'
              }`}
            >
              HOME
            </button>

            {/* OUR COMPANIES Dropdown */}
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setCompaniesDropdownOpen(true)}
              onMouseLeave={() => setCompaniesDropdownOpen(false)}
            >
              <button
                onClick={() => setCompaniesDropdownOpen(!companiesDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold tracking-wider transition-colors uppercase rounded whitespace-nowrap ${
                  isCompanyActive
                    ? 'text-amber-400 bg-amber-500/10 border-b-2 border-amber-500'
                    : 'text-slate-200 hover:text-amber-400 hover:bg-slate-800/60'
                }`}
                aria-expanded={companiesDropdownOpen}
              >
                <span>OUR COMPANIES</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${companiesDropdownOpen ? 'rotate-180 text-amber-400' : 'text-slate-400'}`} />
              </button>

              {companiesDropdownOpen && (
                <div className="absolute left-0 mt-1 w-80 bg-slate-900/98 backdrop-blur-md border border-slate-700 rounded-xl shadow-2xl p-2 z-50 animate-fadeIn space-y-1">
                  <div className="px-3 py-1.5 text-[10px] font-black tracking-widest uppercase text-slate-400 border-b border-slate-800 mb-1 flex items-center justify-between">
                    <span>GROUP ENTITIES</span>
                    <span className="text-amber-400">3 COMPANIES</span>
                  </div>

                  {companySubLinks.map((company) => {
                    const isSelected = currentPath === company.path;
                    return (
                      <button
                        key={company.path}
                        onClick={() => {
                          onSelectCompany(company.companyId);
                          handleLinkClick(company.path);
                        }}
                        className={`w-full flex items-start gap-3 p-2.5 rounded-lg text-left transition-all border border-transparent ${company.color} ${
                          isSelected ? 'bg-slate-800 border-slate-700' : ''
                        }`}
                      >
                        <div className="mt-0.5 p-1 rounded bg-slate-950/80 border border-slate-800">
                          {company.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-black tracking-wide text-white flex items-center justify-between">
                            <span>{company.label}</span>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>}
                          </div>
                          <div className="text-[10px] text-slate-400 leading-snug mt-0.5">
                            {company.subtitle}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Other Primary Nav Links */}
            {mainNavLinks.slice(1).map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`px-3 py-2 text-xs font-bold tracking-wider transition-colors uppercase rounded whitespace-nowrap ${
                    isActive
                      ? 'text-amber-400 bg-amber-500/10 border-b-2 border-amber-500'
                      : 'text-slate-200 hover:text-amber-400 hover:bg-slate-800/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Action: Request Quote */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {isAdmin && (
              <button
                onClick={openAdminDashboard}
                className="bg-amber-500/15 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-amber-500/30 px-3 py-2 rounded text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all whitespace-nowrap"
                title="Open Submissions Dashboard"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </button>
            )}
            <button
              onClick={() => handleLinkClick('/request-quote')}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold text-xs px-4 sm:px-5 py-2.5 rounded shadow-lg shadow-amber-500/25 flex items-center gap-2 uppercase tracking-wider transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              <FileText className="w-4 h-4" />
              <span>REQUEST A QUOTE</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex xl:hidden items-center gap-2 shrink-0">
            <button
              onClick={() => handleLinkClick('/request-quote')}
              className="sm:hidden bg-amber-500 text-slate-950 p-2 rounded font-bold text-xs flex items-center"
              title="Request Quote"
            >
              <FileText className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-white hover:bg-slate-800 rounded-md focus:outline-none"
              aria-label="Toggle mobile navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Navigation Menu</span>
            <CompanySwitcher
              currentCompany={currentCompany}
              onSelectCompany={onSelectCompany}
            />
          </div>

          <div className="space-y-1">
            {mobileNavLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-xs font-bold tracking-wider uppercase transition-colors ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-black'
                      : 'text-slate-200 hover:bg-slate-900 hover:text-amber-400'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
            <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between pb-1 border-b border-slate-800/80">
                <span className="text-[10px] uppercase font-bold text-slate-400">Official SR GROUP Emails</span>
                <span className="text-[9px] font-mono text-amber-400 bg-amber-500/20 px-1.5 py-0.5 rounded font-bold">5 DEPT</span>
              </div>
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-sans">HQ:</span>
                  <a href={`mailto:${PLACEHOLDERS.email}`} className="text-amber-300 hover:underline">
                    {PLACEHOLDERS.email}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-amber-400 font-sans">Projects:</span>
                  <a href="mailto:project@srgroupone.com" className="text-amber-300 hover:underline">
                    project@srgroupone.com
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-emerald-400 font-sans">Accounts:</span>
                  <a href="mailto:account@srgroupone.com" className="text-emerald-300 hover:underline">
                    account@srgroupone.com
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-sky-400 font-sans">Billing:</span>
                  <a href="mailto:bill@srgroupone.com" className="text-sky-300 hover:underline">
                    bill@srgroupone.com
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-orange-400 font-sans">Purchase:</span>
                  <a href="mailto:purchase@srgroupone.com" className="text-orange-300 hover:underline">
                    purchase@srgroupone.com
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 text-slate-300 font-mono text-[11px]">
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <a href="tel:+919898241068" className="hover:text-amber-400">{PLACEHOLDERS.phone}</a>
                <span className="text-slate-600">/</span>
                <a href="tel:+919129325506" className="hover:text-amber-400">{PLACEHOLDERS.secondaryPhone}</a>
              </div>
            </div>

            <button
              onClick={() => handleLinkClick('/request-quote')}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold text-xs py-3 rounded shadow-lg flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <FileText className="w-4 h-4" />
              <span>REQUEST A QUOTE</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
