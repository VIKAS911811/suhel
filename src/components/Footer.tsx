import React from 'react';
import { HardHat, Phone, Mail, MapPin, Linkedin, Facebook, Instagram, Youtube, ArrowRight, Clock, Building2, ShieldCheck, Lock } from 'lucide-react';
import { CompanyId } from '../types';
import { PLACEHOLDERS } from '../data/groupData';
import { SRGroupLogo, SuhelEngineeringLogo } from './logos/CompanyLogos';
import { useAdminAuth } from '../context/AdminAuthContext';

interface FooterProps {
  onNavigate: (path: string) => void;
  onSelectCompany: (companyId: CompanyId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onSelectCompany }) => {
  const { openAuthModal, isAdmin, openAdminDashboard } = useAdminAuth();

  const handleLinkClick = (path: string) => {
    if (path.includes('#')) {
      const [base, hash] = path.split('#');
      onNavigate(base || '/');
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
      return;
    }
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompanyClick = (companyId: CompanyId) => {
    onSelectCompany(companyId);
    onNavigate(`/companies/${companyId === 'sr-group' ? '' : companyId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Group Brand */}
          <div className="lg:col-span-2 space-y-4">
            <SRGroupLogo size="md" showText={true} />

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              SR GROUP is a multi-disciplinary industrial engineering group bringing together NEW SR INFRA, SUHEL ENGINEERING, and SR POWER SOLUTION to deliver integrated infrastructure, fabrication, piping, and power distribution projects across India.
            </p>

            <div className="pt-2 space-y-3 text-xs">
              <div className="space-y-2 border-l-2 border-amber-500/40 pl-2.5">
                <div className="flex items-start gap-2 text-slate-300">
                  <Building2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-[11px] uppercase tracking-wider font-mono">Registered Office :</strong>
                    <span className="text-slate-300 leading-snug">{PLACEHOLDERS.registeredAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block text-[11px] uppercase tracking-wider font-mono">Corporate Office :</strong>
                    <span className="text-slate-300 leading-snug">{PLACEHOLDERS.corporateAddress}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                    <a href="tel:+919898241068" className="hover:text-amber-400 transition-colors">{PLACEHOLDERS.phone}</a>
                    <span className="text-slate-600">/</span>
                    <a href="tel:+919129325506" className="hover:text-amber-400 transition-colors">{PLACEHOLDERS.secondaryPhone}</a>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-1.5 text-slate-300 font-mono text-[11px]">
                    <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="text-[10px] uppercase font-bold text-slate-400">Department Emails:</span>
                  </div>
                  <div className="space-y-1 pl-5 font-mono text-[11px]">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-sans px-1.5 py-0.5 bg-slate-800 text-slate-300 rounded font-bold uppercase">HQ</span>
                      <a href={`mailto:${PLACEHOLDERS.email}`} className="text-amber-400 hover:underline">
                        {PLACEHOLDERS.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-sans px-1.5 py-0.5 bg-amber-500/20 text-amber-300 rounded font-bold uppercase">Projects</span>
                      <a href="mailto:project@srgroupone.com" className="text-amber-400 hover:underline">
                        project@srgroupone.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-sans px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded font-bold uppercase">Accounts</span>
                      <a href="mailto:account@srgroupone.com" className="text-amber-400 hover:underline">
                        account@srgroupone.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-sans px-1.5 py-0.5 bg-sky-500/20 text-sky-300 rounded font-bold uppercase">Billing</span>
                      <a href="mailto:bill@srgroupone.com" className="text-amber-400 hover:underline">
                        bill@srgroupone.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-sans px-1.5 py-0.5 bg-orange-500/20 text-orange-300 rounded font-bold uppercase">Purchase</span>
                      <a href="mailto:purchase@srgroupone.com" className="text-amber-400 hover:underline">
                        purchase@srgroupone.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-slate-400 text-[11px] pt-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-300 font-semibold block">Opening Hours:</span>
                    <span className="block">{PLACEHOLDERS.openingHours.weekdays}</span>
                    <span className="block">{PLACEHOLDERS.openingHours.saturday} | {PLACEHOLDERS.openingHours.sunday}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Placeholders without fake URLs */}
            <div className="pt-2 flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-2">Connect:</span>
              <button className="w-8 h-8 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500 transition-colors" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500 transition-colors" title="Facebook">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500 transition-colors" title="Instagram">
                <Instagram className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-500 transition-colors" title="YouTube">
                <Youtube className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-l-2 border-amber-500 pl-2">
              Quick Links
            </h3>
            <ul className="space-y-1.5 text-xs">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Group', path: '/about' },
                { label: 'Our Companies', path: '/companies' },
                { label: 'Services', path: '/services' },
                { label: 'Industries We Serve', path: '/industries' },
                { label: 'Projects Showcase', path: '/projects' },
                { label: 'Worked With Companies', path: '/#companies-worked-with' },
                { label: 'Quality & Safety', path: '/quality-safety' },
                { label: 'Industrial Gallery', path: '/gallery' },
                { label: 'Careers', path: '/careers' },
                { label: 'Contact Us', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => handleLinkClick(link.path)}
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3 h-3 text-slate-600" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Group Subsidiaries */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-l-2 border-amber-500 pl-2">
              Our Companies
            </h3>
            <ul className="space-y-3 text-xs">
              <li>
                <button
                  onClick={() => handleCompanyClick('sr-infra')}
                  className="text-left group block"
                >
                  <span className="font-bold text-white group-hover:text-amber-400 transition-colors block">
                    NEW SR INFRA
                  </span>
                  <span className="text-[11px] text-slate-400 line-clamp-1">
                    Infrastructure & Structural Fabrication
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCompanyClick('suhel-engineering')}
                  className="text-left group block"
                >
                  <span className="font-bold text-white group-hover:text-amber-400 transition-colors block">
                    SUHEL ENGINEERING
                  </span>
                  <span className="text-[11px] text-slate-400 line-clamp-1">
                    Process Plant Engineering & Piping
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleCompanyClick('sr-power-solution')}
                  className="text-left group block"
                >
                  <span className="font-bold text-white group-hover:text-amber-400 transition-colors block">
                    SR POWER SOLUTION
                  </span>
                  <span className="text-[11px] text-slate-400 line-clamp-1">
                    HT/LT Electrical & Energy Solutions
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Key Service Capabilities */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-l-2 border-amber-500 pl-2">
              Services
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => handleLinkClick('/services/fabrication-erection')} className="hover:text-white transition-colors">
                  Structural Steel Fabrication
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/services/fabrication-erection')} className="hover:text-white transition-colors">
                  Structural Erection Works
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/services/pipeline')} className="hover:text-white transition-colors">
                  Industrial Pipeline Services
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/services/industrial-engineering')} className="hover:text-white transition-colors">
                  Process Plant Overhaul
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/services/power-plant-boiler')} className="hover:text-amber-400 font-semibold transition-colors flex items-center gap-1 text-amber-300/90">
                  <span>Power Plant Boiler & Overhaul</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/services/power-solutions')} className="hover:text-white transition-colors">
                  HT/LT Power Distribution
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/services/power-solutions')} className="hover:text-white transition-colors">
                  Industrial Solar PV Solutions
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('/services/industrial-engineering')} className="hover:text-white transition-colors">
                  Plant Maintenance & Shutdowns
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} SR GROUP. All Rights Reserved. Engineering • Infrastructure • Power Solutions.</p>
          <div className="flex items-center gap-4 text-[11px] flex-wrap">
            <button onClick={() => handleLinkClick('/quality-safety')} className="hover:text-slate-300 transition-colors">
              Quality Policy
            </button>
            <span>•</span>
            <button onClick={() => handleLinkClick('/quality-safety')} className="hover:text-slate-300 transition-colors">
              Safety First Standards
            </button>
            <span>•</span>
            <button onClick={() => handleLinkClick('/request-quote')} className="hover:text-amber-400 transition-colors font-semibold">
              Request a Quote
            </button>
            <span>•</span>
            {isAdmin && (
              <>
                <button
                  onClick={() => openAdminDashboard()}
                  className="bg-amber-500/10 hover:bg-amber-500 hover:text-slate-950 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded transition-colors flex items-center gap-1 font-mono uppercase tracking-wider text-[10px] font-bold"
                  title="View Website Form Submissions"
                >
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>Submissions Dashboard</span>
                </button>
                <span>•</span>
              </>
            )}
            <button
              onClick={() => openAuthModal()}
              className="hover:text-amber-400 text-slate-400 transition-colors flex items-center gap-1 font-mono uppercase tracking-wider text-[10px]"
              title="Management Administration Console"
            >
              <Lock className="w-3 h-3 text-amber-500" />
              <span>{isAdmin ? 'Admin Console (Active)' : 'Admin Console'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
