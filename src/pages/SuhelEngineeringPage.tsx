import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { CompanyId } from '../types';
import { COMPANIES_DATA, PROJECTS_DATA, INDUSTRIES_SERVED } from '../data/groupData';
import { Layers, CheckCircle2, ArrowRight, FileText, Phone, Mail, MapPin, ShieldCheck, Wrench, ChevronRight, Activity, Globe, Award } from 'lucide-react';
import { SuhelEngineeringLogo } from '../components/logos/CompanyLogos';
import { SUHEL_ENGINEERING_HERO_BASE64 } from '../assets/images/suhelEngineeringHeroBase64';

interface SuhelEngineeringPageProps {
  onNavigate: (path: string) => void;
  onSelectCompany: (companyId: CompanyId) => void;
}

export const SuhelEngineeringPage: React.FC<SuhelEngineeringPageProps> = ({
  onNavigate,
  onSelectCompany,
}) => {
  const profile = COMPANIES_DATA['suhel-engineering'];
  const companyProjects = PROJECTS_DATA.filter((p) => p.companyId === 'suhel-engineering');
  const companyIndustries = INDUSTRIES_SERVED.filter((i) => i.relevantCompanies.includes('suhel-engineering'));

  const equipmentList = [
    { name: 'Heavy Hydraulic Pipe Bending Machines', spec: 'Up to 12" Diameter Pipes' },
    { name: 'Inverter TIG & MIG Welding Rigs', spec: 'High Purity & Stainless Steel Joints' },
    { name: 'Hydro-Testing Pump Units', spec: 'Up to 350 Bar Pressure Testing' },
    { name: 'Ultrasonic Thickness & Weld Gauges', spec: 'Non-Destructive Testing (NDT)' },
    { name: 'Pneumatic Beveling & Pipe Facing Tools', spec: 'Precision Joint Preparation' }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title="SUHEL ENGINEERING | Process Plant Fabrication, Piping Execution & Heavy Plant Engineering"
        description="SUHEL ENGINEERING is a specialized division of SR GROUP delivering process plant fabrication, high-pressure utility & steam pipelines, chemical equipment erection, and plant maintenance across India."
      />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <button onClick={() => onNavigate('/')} className="hover:text-white">HOME</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => onNavigate('/companies')} className="hover:text-white">COMPANIES</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-orange-400 font-bold">SUHEL ENGINEERING</span>
        </div>

        {/* Hero Banner Section */}
        <div className="relative rounded-2xl overflow-hidden border border-orange-500/30 bg-slate-900 shadow-2xl">
          <div className="relative h-80 sm:h-[420px] overflow-hidden bg-slate-950">
            <img
              src={profile.heroImage || SUHEL_ENGINEERING_HERO_BASE64}
              alt="SUHEL ENGINEERING"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = SUHEL_ENGINEERING_HERO_BASE64;
              }}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
            
            <div className="absolute top-6 right-6 bg-slate-900/90 backdrop-blur border border-orange-500/40 p-3 sm:p-4 rounded-xl hidden sm:flex items-center gap-3">
              <SuhelEngineeringLogo size="md" showText={false} />
              <div>
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block">REGISTERED BRAND</span>
                <span className="text-sm font-black text-white font-mono">SUHEL ENGINEERING</span>
              </div>
            </div>

            <div className="absolute bottom-8 left-6 sm:left-10 right-6 text-left space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-orange-600 text-white text-xs font-black px-3 py-1 rounded uppercase tracking-wider shadow">
                  COMPANY 02
                </span>
                <span className="text-xs font-bold text-orange-400 uppercase tracking-widest bg-orange-950/80 px-2.5 py-1 rounded border border-orange-800">
                  SR GROUP SUBSIDIARY
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <SuhelEngineeringLogo size="lg" showText={true} />
              </div>

              <p className="text-sm sm:text-base text-slate-200 font-medium max-w-3xl leading-relaxed pt-2">
                {profile.tagline}
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 bg-slate-900/90 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-left w-full md:w-auto">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Specialization</span>
                <p className="text-xs font-bold text-orange-400">Process Piping & Plant Fabrication</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Quality Certs</span>
                <p className="text-xs font-bold text-white">ASME / IBR Standards</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">NDT Qualification</span>
                <p className="text-xs font-bold text-emerald-400">100% X-Ray / Hydro Tested</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 w-full md:w-auto justify-start md:justify-end">
              <button
                onClick={() => {
                  onSelectCompany('suhel-engineering');
                  onNavigate('/request-quote');
                }}
                className="w-full sm:w-auto bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-xs px-6 py-3 rounded flex items-center justify-center gap-2 uppercase tracking-wider shadow-lg transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Request Fabrication Quote</span>
              </button>
            </div>
          </div>
        </div>

        {/* Company Overview & Main Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-left">
          
          <div className="lg:col-span-8 space-y-8">
            {/* Overview */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-widest">
                <Activity className="w-4 h-4" />
                <span>Company Profile & Scope</span>
              </div>
              <h2 className="text-2xl font-black text-white font-mono">
                PRECISION PLANT ENGINEERING & PIPING EXECUTION
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {profile.fullDesc}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                SUHEL ENGINEERING brings technical expertise in handling alloy steel, carbon steel, and stainless steel fabrication for complex process units, refinery piping networks, steam systems, heat exchangers, pressure vessels, and emergency plant shutdown overhauls.
              </p>
            </div>

            {/* Specialized Services Grid */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-white font-mono uppercase tracking-wider flex items-center gap-2 border-l-4 border-orange-500 pl-3">
                SUHEL ENGINEERING Services
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profile.services.map((service, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-2 hover:border-orange-500/50 transition-colors">
                    <div className="flex items-center gap-2 text-orange-400 font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{service}</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Executed according to approved WPS/PQR procedures with qualified high-pressure welders and rigorous NDT inspections.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Machinery & Testing Equipment */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 text-orange-400">
                <Wrench className="w-5 h-5" />
                <span>Machinery & Testing Fleet</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {equipmentList.map((eq, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded border border-slate-800 space-y-1">
                    <span className="font-bold text-slate-200 block">{eq.name}</span>
                    <span className="text-[11px] text-orange-400 font-mono block">{eq.spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Representative Projects */}
            {companyProjects.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-black text-white font-mono uppercase tracking-wider border-l-4 border-orange-500 pl-3">
                  SUHEL ENGINEERING Featured Projects
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {companyProjects.map((proj) => (
                    <div key={proj.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-orange-500/40 transition-colors">
                      <div className="h-48 relative">
                        <img src={proj.image} alt={proj.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 bg-orange-600 text-white font-extrabold text-[10px] uppercase px-2.5 py-1 rounded shadow">
                          {proj.completionStatus}
                        </span>
                      </div>
                      <div className="p-5 space-y-2">
                        <h4 className="text-sm font-bold text-white font-mono">{proj.title}</h4>
                        <p className="text-xs text-slate-300">{proj.scopeOfWork}</p>
                        <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                          <span>Location: {proj.location}</span>
                          <span className="text-orange-400 font-bold">{proj.industry}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Contact Card */}
            <div className="bg-slate-900 border border-orange-500/30 p-6 rounded-xl space-y-4 shadow-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-orange-400 border-l-2 border-orange-500 pl-2">
                SUHEL ENGINEERING Official Contacts
              </h3>
              
              <div className="space-y-3.5 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Registered Office / Workshop</span>
                    <span className="text-white font-medium">{profile.officeLocation}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Vendor Tel. / Mobile</span>
                    <div className="space-y-0.5">
                      <a href={`tel:${profile.primaryPhone}`} className="text-white hover:text-orange-400 transition-colors block">
                        {profile.primaryPhone}
                      </a>
                      {profile.secondaryPhone && (
                        <a href={`tel:${profile.secondaryPhone}`} className="text-white hover:text-orange-400 transition-colors block">
                          {profile.secondaryPhone}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Vendor Email</span>
                    <div className="space-y-0.5">
                      <a href={`mailto:${profile.primaryEmail}`} className="text-orange-400 hover:underline block">
                        {profile.primaryEmail}
                      </a>
                      {profile.secondaryEmail && (
                        <a href={`mailto:${profile.secondaryEmail}`} className="text-orange-400 hover:underline block">
                          {profile.secondaryEmail}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {profile.vendorCode && (
                  <div className="flex items-start gap-2.5">
                    <Award className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Vendor Registration</span>
                      <span className="text-white font-mono font-medium">{profile.vendorCode}</span>
                    </div>
                  </div>
                )}

                {profile.website && (
                  <div className="flex items-start gap-2.5">
                    <Globe className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Official Website</span>
                      <a href={`https://${profile.website}`} target="_blank" rel="noreferrer" className="text-orange-400 hover:underline font-mono">
                        {profile.website}
                      </a>
                    </div>
                  </div>
                )}

                {profile.gstin && (
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">GSTIN:</span>
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      {profile.gstin}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    onSelectCompany('suhel-engineering');
                    onNavigate('/contact');
                  }}
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs py-3 rounded flex items-center justify-center gap-2 uppercase tracking-wider shadow transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Contact Division</span>
                </button>
              </div>
            </div>

            {/* Quality & Welding Assurance */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Welding & ASME Protocols</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  <span>Welder Performance Qualification (WPQ)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  <span>100% Hydrostatic Pressure Testing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  <span>Radiography & Dye Penetrant Inspections</span>
                </li>
              </ul>
            </div>

            {/* Other Group Companies Switcher */}
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl space-y-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block text-center">
                EXPLORE OTHER GROUP COMPANIES
              </span>
              
              <div className="space-y-2">
                <button
                  onClick={() => {
                    onSelectCompany('sr-infra');
                    onNavigate('/companies/sr-infra');
                  }}
                  className="w-full bg-slate-900 hover:bg-blue-600/20 border border-slate-800 hover:border-blue-500/50 p-3 rounded text-left flex items-center justify-between transition-colors group"
                >
                  <div>
                    <span className="text-xs font-bold text-white group-hover:text-blue-400 block">NEW SR INFRA</span>
                    <span className="text-[10px] text-slate-400">Infrastructure & Fabrication</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400" />
                </button>

                <button
                  onClick={() => {
                    onSelectCompany('sr-power-solution');
                    onNavigate('/companies/sr-power-solution');
                  }}
                  className="w-full bg-slate-900 hover:bg-emerald-600/20 border border-slate-800 hover:border-emerald-500/50 p-3 rounded text-left flex items-center justify-between transition-colors group"
                >
                  <div>
                    <span className="text-xs font-bold text-white group-hover:text-emerald-400 block">SR POWER SOLUTION</span>
                    <span className="text-[10px] text-slate-400">HT/LT Power Electrical</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
