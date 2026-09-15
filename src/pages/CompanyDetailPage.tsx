import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { CompanyId } from '../types';
import { COMPANIES_DATA, PROJECTS_DATA, INDUSTRIES_SERVED, PLACEHOLDERS } from '../data/groupData';
import { Building2, Layers, Zap, CheckCircle2, ArrowRight, FileText, Phone, Mail, MapPin, HardHat } from 'lucide-react';
import { SRGroupLogo, SuhelEngineeringLogo, CompanyLogo } from '../components/logos/CompanyLogos';

interface CompanyDetailPageProps {
  companyId: CompanyId;
  onNavigate: (path: string) => void;
  onSelectCompany: (companyId: CompanyId) => void;
}

export const CompanyDetailPage: React.FC<CompanyDetailPageProps> = ({
  companyId,
  onNavigate,
  onSelectCompany,
}) => {
  const profile = COMPANIES_DATA[companyId] || COMPANIES_DATA['sr-infra'];

  const companyProjects = PROJECTS_DATA.filter((p) => p.companyId === companyId);
  const companyIndustries = INDUSTRIES_SERVED.filter((i) => i.relevantCompanies.includes(companyId));

  const getCompanyIcon = () => {
    switch (companyId) {
      case 'sr-infra':
        return <Building2 className="w-8 h-8 text-blue-400" />;
      case 'suhel-engineering':
        return <Layers className="w-8 h-8 text-orange-400" />;
      case 'sr-power-solution':
        return <Zap className="w-8 h-8 text-emerald-400" />;
      default:
        return <HardHat className="w-8 h-8 text-amber-400" />;
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title={`${profile.name} | ${profile.category} - SR GROUP`}
        description={profile.shortDesc}
      />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Company Hero Header */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
          <div className="relative h-64 sm:h-80 overflow-hidden">
            <img
              src={profile.heroImage}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
            
            <div className="absolute bottom-8 left-6 sm:left-10 right-6 text-left space-y-3">
              <div className="flex items-center gap-3">
                <span className="bg-amber-500 text-slate-950 text-xs font-black px-3 py-1 rounded uppercase tracking-wider">
                  {profile.badge}
                </span>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">
                  SR GROUP SUBSIDIARY
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <CompanyLogo companyId={companyId} size="lg" showText={false} />
                <h1 className="text-3xl sm:text-5xl font-black text-white font-mono uppercase tracking-tight">
                  {profile.name}
                </h1>
              </div>

              <p className="text-sm sm:text-lg text-amber-400 font-semibold max-w-2xl">
                {profile.tagline}
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 bg-slate-900 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-xs text-slate-300 space-y-1 text-left">
              <span className="font-bold text-slate-400 uppercase tracking-wider block">Category:</span>
              <p className="text-sm font-semibold text-white">{profile.category}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('/request-quote')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs px-6 py-3 rounded flex items-center gap-2 uppercase tracking-wider shadow-lg"
              >
                <FileText className="w-4 h-4" />
                <span>Submit {profile.name} Enquiry</span>
              </button>
            </div>
          </div>
        </div>

        {/* Overview & About */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-8 space-y-6 text-left">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">COMPANY PROFILE</span>
              <h2 className="text-2xl font-black uppercase font-mono text-white">ABOUT {profile.name}</h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {profile.fullDesc}
              </p>
            </div>

            {/* Key Service Breakdown */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 border-l-2 border-amber-500 pl-2">
                Services & Capabilities
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-200">
                {profile.services.map((serv, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-slate-950 p-2.5 rounded border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span className="font-medium">{serv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Execution Highlights */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Execution Highlights</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profile.keyHighlights.map((hl, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 p-3 rounded text-xs text-slate-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6 text-left">
            {/* Contact Card */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-l-2 border-amber-500 pl-2">
                Contact {profile.name}
              </h3>
              <div className="space-y-3 text-xs text-slate-300">
                {profile.vendorCode && (
                  <div className="flex items-center justify-between pb-1 text-[11px] text-slate-400 border-b border-slate-800">
                    <span>Vendor ID:</span>
                    <span className="font-mono font-bold text-amber-400">{profile.vendorCode}</span>
                  </div>
                )}
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{profile.officeLocation}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{profile.primaryPhone} {profile.secondaryPhone ? ` / ${profile.secondaryPhone}` : ''}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{profile.primaryEmail} {profile.secondaryEmail ? ` / ${profile.secondaryEmail}` : ''}</span>
                </div>
                {profile.website && (
                  <div className="flex items-center gap-2.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">WEB:</span>
                    <a href={`https://${profile.website}`} target="_blank" rel="noreferrer" className="text-amber-400 hover:underline">
                      {profile.website}
                    </a>
                  </div>
                )}
                {profile.gstin && (
                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400 border-t border-slate-800">
                    <span>GSTIN:</span>
                    <span className="font-mono font-bold text-amber-400">{profile.gstin}</span>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/request-quote')}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-3 rounded flex items-center justify-center gap-2 uppercase tracking-wider shadow"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request a Quote</span>
                </button>
              </div>
            </div>

            {/* Parent Group Badge */}
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-2 text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">MEMBER OF</span>
              <h4 className="text-xl font-black text-white font-mono">SR GROUP</h4>
              <p className="text-[11px] text-slate-400">
                Engineering • Infrastructure • Power Solutions
              </p>
            </div>
          </div>
        </div>

        {/* Relevant Industries */}
        {companyIndustries.length > 0 && (
          <div className="space-y-6 text-left border-t border-slate-800 pt-12">
            <h2 className="text-2xl font-black uppercase font-mono text-white">INDUSTRIES SERVED BY {profile.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyIndustries.map((ind) => (
                <div key={ind.id} className="bg-slate-900 border border-slate-800 rounded-lg p-5 space-y-2">
                  <h3 className="text-base font-bold text-white font-mono">{ind.title}</h3>
                  <p className="text-xs text-slate-300">{ind.shortDesc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Representative Projects */}
        {companyProjects.length > 0 && (
          <div className="space-y-6 text-left border-t border-slate-800 pt-12">
            <h2 className="text-2xl font-black uppercase font-mono text-white">REPRESENTATIVE PROJECTS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {companyProjects.map((p) => (
                <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between">
                  <div className="h-44 relative">
                    <img src={p.image} alt={p.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-slate-950/80 text-amber-400 font-bold text-[10px] uppercase px-2.5 py-1 rounded">
                      {p.completionStatus}
                    </span>
                  </div>
                  <div className="p-5 space-y-2 text-left">
                    <h3 className="text-sm font-bold text-white font-mono">{p.title}</h3>
                    <p className="text-xs text-slate-300">{p.scopeOfWork}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
