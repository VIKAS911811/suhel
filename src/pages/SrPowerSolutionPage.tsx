import React from 'react';
import { SEOHead } from '../components/SEOHead';
import { CompanyId } from '../types';
import { COMPANIES_DATA, PROJECTS_DATA, INDUSTRIES_SERVED } from '../data/groupData';
import { Zap, CheckCircle2, ArrowRight, FileText, Phone, Mail, MapPin, ShieldCheck, Wrench, ChevronRight, Cpu } from 'lucide-react';
import { SrPowerSolutionLogo } from '../components/logos/CompanyLogos';
import { SR_POWER_SOLUTION_HERO_BASE64 } from '../assets/images/srPowerSolutionHeroBase64';

interface SrPowerSolutionPageProps {
  onNavigate: (path: string) => void;
  onSelectCompany: (companyId: CompanyId) => void;
}

export const SrPowerSolutionPage: React.FC<SrPowerSolutionPageProps> = ({
  onNavigate,
  onSelectCompany,
}) => {
  const profile = COMPANIES_DATA['sr-power-solution'];
  const companyProjects = PROJECTS_DATA.filter((p) => p.companyId === 'sr-power-solution');
  const companyIndustries = INDUSTRIES_SERVED.filter((i) => i.relevantCompanies.includes('sr-power-solution'));

  const equipmentList = [
    { name: 'Primary & Secondary Current Injection Kits', spec: 'Protective Relay Calibration' },
    { name: '5kV / 10kV Digital Megger Insulation Testers', spec: 'Transformer & Cable Insulation' },
    { name: 'Thermal Imaging Infrared Cameras', spec: 'Hotspot Detection in Switchgear' },
    { name: 'High-Voltage Cable Fault Locators & Thumpers', spec: 'Underground Cable Diagnostics' },
    { name: 'Oil Breakdown Voltage (BDV) Test Bench', spec: 'Transformer Dielectric Testing' }
  ];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title="SR POWER SOLUTION | HT/LT Electrical Engineering, Substation & Power Distribution"
        description="SR POWER SOLUTION is a specialized electrical engineering division of SR GROUP delivering HT/LT panel fabrication, 33kV/11kV substation erection, transformer commissioning, and industrial earthing across India."
      />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <button onClick={() => onNavigate('/')} className="hover:text-white">HOME</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => onNavigate('/companies')} className="hover:text-white">COMPANIES</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-emerald-400 font-bold">SR POWER SOLUTION</span>
        </div>

        {/* Hero Banner Section */}
        <div className="relative rounded-2xl overflow-hidden border border-emerald-500/30 bg-slate-900 shadow-2xl">
          <div className="relative h-72 sm:h-96 overflow-hidden">
            <img
              src={profile.heroImage || SR_POWER_SOLUTION_HERO_BASE64}
              alt="SR POWER SOLUTION"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = SR_POWER_SOLUTION_HERO_BASE64;
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/40" />
            
            <div className="absolute top-6 right-6 bg-slate-900/90 backdrop-blur border border-emerald-500/40 p-3 sm:p-4 rounded-xl hidden sm:flex items-center gap-3">
              <SrPowerSolutionLogo size="md" showText={false} />
              <div>
                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest block">REGISTERED BRAND</span>
                <span className="text-sm font-black text-white font-mono">SR POWER SOLUTION</span>
              </div>
            </div>

            <div className="absolute bottom-8 left-6 sm:left-10 right-6 text-left space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-emerald-600 text-white text-xs font-black px-3 py-1 rounded uppercase tracking-wider shadow">
                  COMPANY 03
                </span>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800">
                  SR GROUP SUBSIDIARY
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <SrPowerSolutionLogo size="lg" showText={true} />
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
                <p className="text-xs font-bold text-emerald-400">HT/LT Substations & Panels</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Voltage Class</span>
                <p className="text-xs font-bold text-white">Up to 33kV Execution</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Safety Standard</span>
                <p className="text-xs font-bold text-emerald-400">CEA Compliant / ISO 9001</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 w-full md:w-auto justify-start md:justify-end">
              <button
                onClick={() => {
                  onSelectCompany('sr-power-solution');
                  onNavigate('/request-quote');
                }}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs px-6 py-3 rounded flex items-center justify-center gap-2 uppercase tracking-wider shadow-lg transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Request Electrical Quote</span>
              </button>
            </div>
          </div>
        </div>

        {/* Company Overview & Main Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-left">
          
          <div className="lg:col-span-8 space-y-8">
            {/* Overview */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-widest">
                <Cpu className="w-4 h-4" />
                <span>Company Overview & Expertise</span>
              </div>
              <h2 className="text-2xl font-black text-white font-mono">
                POWERING INDUSTRIAL INFRASTRUCTURE SECURELY
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {profile.fullDesc}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                SR POWER SOLUTION designs, manufactures, installs, and tests comprehensive electrical distribution systems for heavy industrial plants, factories, steel mills, power generation facilities, and commercial complexes across India.
              </p>
            </div>

            {/* Specialized Services Grid */}
            <div className="space-y-4">
              <h3 className="text-lg font-black text-white font-mono uppercase tracking-wider flex items-center gap-2 border-l-4 border-emerald-500 pl-3">
                SR POWER SOLUTION Services
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profile.services.map((service, idx) => (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-2 hover:border-emerald-500/50 transition-colors">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{service}</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Turnkey supply, cable layings, panel assembly, earth pit testing, and final safety inspectorate clearance.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Machinery & Electrical Testing Instruments */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 text-emerald-400">
                <Wrench className="w-5 h-5" />
                <span>Electrical Testing & Maintenance Gear</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {equipmentList.map((eq, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded border border-slate-800 space-y-1">
                    <span className="font-bold text-slate-200 block">{eq.name}</span>
                    <span className="text-[11px] text-emerald-400 font-mono block">{eq.spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Representative Projects */}
            {companyProjects.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-black text-white font-mono uppercase tracking-wider border-l-4 border-emerald-500 pl-3">
                  SR POWER SOLUTION Featured Projects
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {companyProjects.map((proj) => (
                    <div key={proj.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
                      <div className="h-48 relative">
                        <img src={proj.image} alt={proj.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 bg-emerald-600 text-white font-extrabold text-[10px] uppercase px-2.5 py-1 rounded shadow">
                          {proj.completionStatus}
                        </span>
                      </div>
                      <div className="p-5 space-y-2">
                        <h4 className="text-sm font-bold text-white font-mono">{proj.title}</h4>
                        <p className="text-xs text-slate-300">{proj.scopeOfWork}</p>
                        <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                          <span>Location: {proj.location}</span>
                          <span className="text-emerald-400 font-bold">{proj.industry}</span>
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
            <div className="bg-slate-900 border border-emerald-500/30 p-6 rounded-xl space-y-4 shadow-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 border-l-2 border-emerald-500 pl-2">
                SR POWER SOLUTION Official Contacts
              </h3>
              
              <div className="space-y-3.5 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Registered Office / Workshop</span>
                    <span className="text-white font-medium">{profile.officeLocation}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Direct Tel. / Mobile</span>
                    <div className="space-y-0.5">
                      <a href={`tel:${profile.primaryPhone}`} className="text-white hover:text-emerald-400 transition-colors block">
                        {profile.primaryPhone}
                      </a>
                      {profile.secondaryPhone && (
                        <a href={`tel:${profile.secondaryPhone}`} className="text-white hover:text-emerald-400 transition-colors block">
                          {profile.secondaryPhone}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Email Address</span>
                    <a href={`mailto:${profile.primaryEmail}`} className="text-emerald-400 hover:underline block">
                      {profile.primaryEmail}
                    </a>
                  </div>
                </div>

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
                    onSelectCompany('sr-power-solution');
                    onNavigate('/contact');
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded flex items-center justify-center gap-2 uppercase tracking-wider shadow transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Contact Division</span>
                </button>
              </div>
            </div>

            {/* Electrical Safety & Regulatory Compliance */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Electrical Inspectorate Compliance</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Licensed Class-A Electrical Contractors</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Central Electricity Authority (CEA) Rules</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>IP65 Enclosure & CPRI Type-Tested Panels</span>
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
                    onSelectCompany('suhel-engineering');
                    onNavigate('/companies/suhel-engineering');
                  }}
                  className="w-full bg-slate-900 hover:bg-orange-600/20 border border-slate-800 hover:border-orange-500/50 p-3 rounded text-left flex items-center justify-between transition-colors group"
                >
                  <div>
                    <span className="text-xs font-bold text-white group-hover:text-orange-400 block">SUHEL ENGINEERING</span>
                    <span className="text-[10px] text-slate-400">Process Plant & Piping</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-orange-400" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
