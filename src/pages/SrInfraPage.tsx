import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { CompanyId } from '../types';
import { COMPANIES_DATA, PROJECTS_DATA, INDUSTRIES_SERVED, SR_INFRA_SERVICES } from '../data/groupData';
import { 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  HardHat, 
  ShieldCheck, 
  Wrench, 
  ChevronRight, 
  Globe, 
  Award,
  Layers,
  Flame,
  Zap,
  Factory,
  Boxes,
  Shield,
  Gauge,
  Leaf,
  Paintbrush,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { NewSrInfraLogo } from '../components/logos/CompanyLogos';
import { NEW_SR_INFRA_HERO_BASE64 } from '../assets/images/newSrInfraHeroBase64';
import { BOILER_BASE64 } from '../assets/images/boilerBase64';

interface SrInfraPageProps {
  onNavigate: (path: string) => void;
  onSelectCompany: (companyId: CompanyId) => void;
}

export const SrInfraPage: React.FC<SrInfraPageProps> = ({
  onNavigate,
  onSelectCompany,
}) => {
  const profile = COMPANIES_DATA['sr-infra'];
  const companyProjects = PROJECTS_DATA.filter((p) => p.companyId === 'sr-infra');
  const companyIndustries = INDUSTRIES_SERVED.filter((i) => i.relevantCompanies.includes('sr-infra'));
  const [activeServiceFilter, setActiveServiceFilter] = useState<string>('all');

  const equipmentList = [
    { name: 'Heavy Duty Overhead Gantry Cranes', spec: '20 Tons to 50 Tons Capacity' },
    { name: 'Automatic Submerged Arc Welding (SAW)', spec: 'High Penetration Structural Joints' },
    { name: 'Hydraulic Plate Bending & Shearing', spec: 'Up to 25mm Thickness Capability' },
    { name: 'Mobile Boom Cranes & Hydraulic Jacks', spec: 'Multi-stage Heavy Erection' },
    { name: 'CNC Plasma & Oxy-Fuel Cutting Systems', spec: 'Precision Structural Steel Profiling' },
    { name: 'High-Pressure Hydro-Testing Pumps', spec: 'Leak Testing up to 100+ Bar' }
  ];

  const serviceCategories = [
    { id: 'all', label: 'All Services' },
    { id: 'Steel Infrastructure', label: 'Structural Steel' },
    { id: 'Piping Engineering', label: 'Pipeline Systems' },
    { id: 'Energy & Power', label: 'Power Plants & Boilers' },
    { id: 'Process Metallurgy', label: 'DRI & Sponge Iron' },
    { id: 'Smelting & Furnaces', label: 'Furnaces & Smelters' },
    { id: 'Heavy Process Plant', label: 'Cement & Mills' },
    { id: 'Environmental Engineering', label: 'Pollution Prevention' },
    { id: 'Finishing & Maintenance', label: 'Coating & Finishing' },
  ];

  const filteredServices = activeServiceFilter === 'all'
    ? SR_INFRA_SERVICES
    : SR_INFRA_SERVICES.filter(s => s.category === activeServiceFilter);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-5 h-5 text-blue-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-amber-400" />;
      case 'Zap': return <Zap className="w-5 h-5 text-yellow-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-orange-400" />;
      case 'Factory': return <Factory className="w-5 h-5 text-indigo-400" />;
      case 'Boxes': return <Boxes className="w-5 h-5 text-cyan-400" />;
      case 'Shield': return <Shield className="w-5 h-5 text-rose-400" />;
      case 'Gauge': return <Gauge className="w-5 h-5 text-emerald-400" />;
      case 'Leaf': return <Leaf className="w-5 h-5 text-green-400" />;
      case 'Paintbrush': return <Paintbrush className="w-5 h-5 text-purple-400" />;
      default: return <Wrench className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title="NEW SR INFRA | Structural Fabrication, Pipelines & Plant Services"
        description="NEW SR INFRA (newsrinfra.com) provides complete industrial engineering, structural fabrication, pipeline networks, sponge iron, cement, ferro alloys, power plants, pollution control, and industrial coating across India."
      />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <button onClick={() => onNavigate('/')} className="hover:text-white">HOME</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <button onClick={() => onNavigate('/companies')} className="hover:text-white">COMPANIES</button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-blue-400 font-bold">NEW SR INFRA</span>
        </div>

        {/* Hero Banner Section */}
        <div className="relative rounded-2xl overflow-hidden border border-blue-500/40 bg-slate-900 shadow-2xl">
          <div className="relative h-80 sm:h-96 md:h-[420px] overflow-hidden">
            <img
              src="/images/sr-infra-home.jpg"
              alt="NEW SR INFRA Site Execution & Fabrication"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = NEW_SR_INFRA_HERO_BASE64;
              }}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20" />
            
            <div className="absolute top-6 right-6 bg-slate-900/90 backdrop-blur border border-blue-500/40 p-3 sm:p-4 rounded-xl hidden sm:flex items-center gap-3 shadow-lg">
              <NewSrInfraLogo size="md" showText={false} />
              <div>
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block">OFFICIAL DOMAIN</span>
                <span className="text-sm font-black text-white font-mono flex items-center gap-1">
                  www.newsrinfra.com
                </span>
              </div>
            </div>

            <div className="absolute bottom-8 left-6 sm:left-10 right-6 text-left space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-blue-600 text-white text-xs font-black px-3 py-1 rounded uppercase tracking-wider shadow">
                  COMPANY 01
                </span>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-950/80 px-2.5 py-1 rounded border border-blue-800">
                  SR GROUP SUBSIDIARY
                </span>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {SR_INFRA_SERVICES.length} INDUSTRIAL SERVICES (INCL. BOILERS)
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                <NewSrInfraLogo size="lg" showText={true} />
              </div>

              <p className="text-sm sm:text-base text-slate-200 font-medium max-w-3xl leading-relaxed pt-1">
                {profile.tagline}
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 bg-slate-900/95 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-left w-full md:w-auto">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Specialization</span>
                <p className="text-xs font-bold text-blue-400">Structures, Pipes & Plants</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Capacity</span>
                <p className="text-xs font-bold text-white">1000+ MT Monthly</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Official Portal</span>
                <a href="https://www.newsrinfra.com" target="_blank" rel="noreferrer" className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1">
                  newsrinfra.com <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Execution Standard</span>
                <p className="text-xs font-bold text-emerald-400">IS 800 / AWS D1.1 / IBR</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 w-full md:w-auto justify-start md:justify-end">
              <button
                onClick={() => {
                  onSelectCompany('sr-infra');
                  onNavigate('/request-quote');
                }}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs px-6 py-3 rounded flex items-center justify-center gap-2 uppercase tracking-wider shadow-lg transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Request Infrastructure Quote</span>
              </button>
            </div>
          </div>
        </div>

        {/* Company Overview & Main Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-left">
          
          <div className="lg:col-span-8 space-y-10">
            {/* Overview */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-widest">
                <Building2 className="w-4 h-4" />
                <span>Company Overview & Heritage</span>
              </div>
              <h2 className="text-2xl font-black text-white font-mono">
                COMPLETE INDUSTRIAL INFRASTRUCTURE & PROCESS PLANT EXECUTION
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {profile.fullDesc}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                NEW SR INFRA operates equipped fabrication yards with heavy lifting machinery, automated welding stations, high-pressure hydro-testing pumps, and skilled rigging teams capable of executing challenging industrial infrastructure, boiler support structures, rotary kiln alignments, conveyor gantries, and plant expansions.
              </p>
            </div>

            {/* Dedicated Power Plant Boiler Works & Overhaul Spotlight Section */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/50 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 shadow-2xl p-6 sm:p-8 space-y-6">
              {/* Top Accent & Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-widest font-mono">
                  <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
                  <span>SPECIALIZED MECHANICAL & TURNAROUND DIVISION</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-amber-500 text-slate-950 font-black text-[10px] uppercase px-3 py-1 rounded shadow font-mono">
                    IBR 1950 & ASME Sec I
                  </span>
                  <span className="bg-slate-800 text-amber-300 font-bold text-[10px] uppercase px-2.5 py-1 rounded border border-amber-500/30 font-mono">
                    100% RT Tested
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white font-mono uppercase tracking-tight">
                  POWER PLANT BOILER WORKS & OVERHAUL
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Turnkey boiler erection, maintenance shutdowns, pressure parts & tube replacement, drum, header, superheater, economizer, ducting, and overhaul works for utility, thermal, and captive power plants across India.
                </p>
              </div>

              {/* High-Resolution Boiler Site Photography Banner */}
              <div className="relative rounded-xl overflow-hidden border border-amber-500/30 shadow-xl group">
                <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-slate-950">
                  <img
                    src={BOILER_BASE64}
                    alt="Power Plant Boiler Works & Overhaul by NEW SR INFRA"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = '/images/power-plant-boiler.jpg';
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <span className="bg-slate-900/90 backdrop-blur text-amber-400 border border-amber-500/40 font-mono text-[11px] font-bold px-3 py-1 rounded">
                      High-Pressure Erection & Overhaul Site
                    </span>
                    <span className="bg-blue-900/80 backdrop-blur text-blue-200 border border-blue-500/40 font-mono text-[11px] font-bold px-3 py-1 rounded">
                      NEW SR INFRA Mechanical Division
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-left">
                    <div className="space-y-1">
                      <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-wider block">
                        Annual Plant Shutdown & Capital Overhauls
                      </span>
                      <p className="text-white font-bold text-sm sm:text-base font-mono drop-shadow">
                        Pressure Parts, Radiographic Welding, Hydrostatic Proof Testing & Turnkey Commissioning
                      </p>
                    </div>
                    <button
                      onClick={() => onNavigate('/services/power-plant-boiler')}
                      className="shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition-all"
                    >
                      <span>Full Boiler Specs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 12 Core Capabilities Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-400 uppercase tracking-wider font-mono flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-amber-400" />
                    Complete 12-Point Scope of Work
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Turnkey & Shutdown Services</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
                  {[
                    'Boiler Erection & Installation',
                    'Boiler Maintenance & Shutdown',
                    'Pressure Parts & Tube Replacement',
                    'Drum, Header, Superheater & Economizer Work',
                    'Steam & Utility Piping',
                    'Boiler Structure & Platform Fabrication',
                    'Ducting & Expansion Joint Work',
                    'FD/ID/PA Fan Maintenance',
                    'Pump, Valve & Equipment Maintenance',
                    'Ash & Coal Handling System Work',
                    'Insulation & Refractory Work',
                    'Testing, Commissioning & Overhauling'
                  ].map((scopeItem, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 p-3 rounded-lg flex items-start gap-2.5 transition-colors group"
                    >
                      <span className="text-amber-400 font-mono font-bold text-xs shrink-0 w-6 h-6 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                        {(idx + 1).toString().padStart(2, '0')}
                      </span>
                      <span className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 transition-colors leading-snug">
                        {scopeItem}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Specs & Action Bar */}
              <div className="bg-slate-950 border border-slate-800 p-4 sm:p-5 rounded-xl space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                  <div className="border-l-2 border-amber-500 pl-3">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block font-mono">Boiler Capacities</span>
                    <span className="text-xs font-bold text-slate-200">AFBC, CFBC, WHRB, Stoker & Utility</span>
                  </div>
                  <div className="border-l-2 border-blue-500 pl-3">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block font-mono">Weld Certification</span>
                    <span className="text-xs font-bold text-slate-200">IBR 6G Qualified / 100% NDT Radiography</span>
                  </div>
                  <div className="border-l-2 border-emerald-500 pl-3">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block font-mono">Testing Protocols</span>
                    <span className="text-xs font-bold text-slate-200">Hydraulic Testing up to 150+ Bar</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
                  <span className="text-xs text-slate-400 font-mono">
                    Fast mobilization for planned annual turnarounds and emergency breakdown repair across India.
                  </span>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        onSelectCompany('sr-infra');
                        onNavigate('/request-quote');
                      }}
                      className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-5 py-2.5 rounded font-mono uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Request Boiler Quote</span>
                    </button>
                    <button
                      onClick={() => onNavigate('/services/power-plant-boiler')}
                      className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-4 py-2.5 rounded font-mono uppercase tracking-wider border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Specifications</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Complete Services Section from newsrinfra.com */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-blue-500 pl-4">
                <div>
                  <h3 className="text-xl font-black text-white font-mono uppercase tracking-wider">
                    Our Services & Specializations
                  </h3>
                  <p className="text-xs text-slate-400 pt-1">
                    Complete portfolio of industrial solutions directly from www.newsrinfra.com
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/80 px-3 py-1.5 rounded border border-blue-800 shrink-0">
                  {SR_INFRA_SERVICES.length} Total Services
                </span>
              </div>

              {/* Service Filter Chips */}
              <div className="flex flex-wrap gap-2 pb-2">
                {serviceCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveServiceFilter(cat.id)}
                    className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all ${
                      activeServiceFilter === cat.id
                        ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-900/40'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Service Cards with Real Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-xl group"
                  >
                    <div>
                      {/* Service Image */}
                      <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-950">
                        <img
                          src={service.image}
                          alt={service.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                        
                        <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur border border-slate-700/60 px-2.5 py-1 rounded text-[10px] font-bold text-blue-400 uppercase tracking-wider">
                          {service.category}
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                          <div className="p-2 bg-slate-900/90 rounded-lg border border-slate-700/80 shrink-0">
                            {getServiceIcon(service.iconName)}
                          </div>
                          <h4 className="text-sm font-black text-white leading-tight font-mono drop-shadow">
                            {service.title}
                          </h4>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-5 space-y-4">
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {service.shortDesc}
                        </p>

                        {/* Scope Highlights */}
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            Key Scope of Work:
                          </span>
                          <ul className="space-y-1 text-xs text-slate-300">
                            {service.scope.slice(0, 3).map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                                <span className="text-[11px] leading-snug">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Specs Chips */}
                        {service.specs && service.specs.length > 0 && (
                          <div className="bg-slate-950 p-2.5 rounded border border-slate-800/80 space-y-1 text-[11px]">
                            {service.specs.slice(0, 2).map((spec, sIdx) => (
                              <div key={sIdx} className="flex items-center justify-between text-slate-400">
                                <span className="font-semibold text-slate-400">{spec.label}:</span>
                                <span className="text-blue-400 font-mono text-right">{spec.value}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Action Footer */}
                    <div className="p-4 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between">
                      <button
                        onClick={() => {
                          onSelectCompany('sr-infra');
                          onNavigate('/request-quote');
                        }}
                        className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                      >
                        <span>Inquire About This Service</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Machinery & Fleet Capabilities */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2 text-blue-400">
                <Wrench className="w-5 h-5" />
                <span>Machinery & Infrastructure Equipment</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {equipmentList.map((eq, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded border border-slate-800 space-y-1">
                    <span className="font-bold text-slate-200 block">{eq.name}</span>
                    <span className="text-[11px] text-blue-400 font-mono block">{eq.spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Representative Projects */}
            {companyProjects.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-black text-white font-mono uppercase tracking-wider border-l-4 border-blue-500 pl-3">
                  NEW SR INFRA Featured Projects
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {companyProjects.map((proj) => (
                    <div key={proj.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-blue-500/40 transition-colors">
                      <div className="h-48 relative">
                        <img src={proj.image} alt={proj.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 bg-blue-600 text-white font-extrabold text-[10px] uppercase px-2.5 py-1 rounded shadow">
                          {proj.completionStatus}
                        </span>
                      </div>
                      <div className="p-5 space-y-2">
                        <h4 className="text-sm font-bold text-white font-mono">{proj.title}</h4>
                        <p className="text-xs text-slate-300">{proj.scopeOfWork}</p>
                        <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                          <span>Location: {proj.location}</span>
                          <span className="text-blue-400 font-bold">{proj.industry}</span>
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
            <div className="bg-slate-900 border border-blue-500/30 p-6 rounded-xl space-y-4 shadow-xl">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 border-l-2 border-blue-500 pl-2">
                NEW SR INFRA Official Contacts
              </h3>
              
              <div className="space-y-3.5 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Registered Office</span>
                    <span className="text-white font-medium">{profile.officeLocation}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Phone / Mobile</span>
                    <div className="space-y-0.5">
                      <a href={`tel:${profile.primaryPhone}`} className="text-white hover:text-blue-400 transition-colors block font-mono">
                        {profile.primaryPhone}
                      </a>
                      {profile.secondaryPhone && (
                        <a href={`tel:${profile.secondaryPhone}`} className="text-white hover:text-blue-400 transition-colors block font-mono">
                          {profile.secondaryPhone}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Email Addresses</span>
                    <div className="space-y-0.5">
                      <a href={`mailto:${profile.primaryEmail}`} className="text-blue-400 hover:underline block font-mono">
                        {profile.primaryEmail}
                      </a>
                      {profile.secondaryEmail && (
                        <a href={`mailto:${profile.secondaryEmail}`} className="text-blue-400 hover:underline block font-mono">
                          {profile.secondaryEmail}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {profile.website && (
                  <div className="flex items-start gap-2.5">
                    <Globe className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Official Website</span>
                      <a href={`https://${profile.website}`} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline font-mono flex items-center gap-1">
                        {profile.website} <ExternalLink className="w-3 h-3" />
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
                    onSelectCompany('sr-infra');
                    onNavigate('/contact');
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 rounded flex items-center justify-center gap-2 uppercase tracking-wider shadow transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Contact Division</span>
                </button>
              </div>
            </div>

            {/* Quality & Safety Assurance */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Safety & Quality Compliance</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span>Zero Accident Workplace Commitment</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span>Ultrasonic & Radiography Weld Inspection</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span>Certified Crane Operators & Riggers</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span>Hydro-testing to 100+ Bar for Process Pipes</span>
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

