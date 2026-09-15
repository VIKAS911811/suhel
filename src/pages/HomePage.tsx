import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HeroSlider } from '../components/HeroSlider';
import { StatsBanner } from '../components/StatsBanner';
import { SEOHead } from '../components/SEOHead';
import { CompanyId, GalleryItem } from '../types';
import { COMPANIES_DATA, SERVICES_DATA, INDUSTRIES_SERVED, PROJECTS_DATA, GALLERY_DATA, WORK_PROCESS_STEPS, QUALITY_SAFETY_CARDS, WHY_CHOOSE_US, getCompanyDisplayName } from '../data/groupData';
import { Lightbox } from '../components/Lightbox';
import { ArrowRight, Building2, Wrench, ShieldCheck, CheckCircle2, ChevronRight, FileText, PhoneCall, HardHat, Layers, Zap, Flame } from 'lucide-react';
import { SRGroupLogo, SuhelEngineeringLogo, NewSrInfraLogo, SrPowerSolutionLogo } from '../components/logos/CompanyLogos';
import { CmdSection } from '../components/cmd/CmdSection';
import { GroupVisualShowcase } from '../components/GroupVisualShowcase';
import { BOILER_BASE64 } from '../assets/images/boilerBase64';
import { CompaniesWorkedWithSection } from '../components/CompaniesWorkedWithSection';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectCompany: (companyId: CompanyId) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 24,
      stiffness: 140,
      duration: 0.5,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectCompany }) => {
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [homeGalleryCategory, setHomeGalleryCategory] = useState<string>('ALL');

  const homeGalleryCategories = ['ALL', 'FABRICATION', 'ERECTION', 'PIPELINE', 'POWER', 'SAFETY', 'PLANT'];

  const displayedGalleryItems = homeGalleryCategory === 'ALL'
    ? GALLERY_DATA.slice(0, 8)
    : GALLERY_DATA.filter((item) => item.category === homeGalleryCategory).slice(0, 8);

  const handleCompanyClick = (companyId: CompanyId) => {
    onSelectCompany(companyId);
    onNavigate(`/companies/${companyId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceClick = (slug: string) => {
    onNavigate(`/services/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen">
      <SEOHead
        title="SR GROUP | Engineering Excellence • Infrastructure • Power Solutions"
        description="SR GROUP brings together NEW SR INFRA, SUHEL ENGINEERING, and SR POWER SOLUTION delivering integrated industrial fabrication, site erection, process pipelines, plant maintenance, and HT/LT electrical engineering across India."
      />

      {/* 1. Hero Section */}
      <HeroSlider onNavigate={onNavigate} onSelectCompany={onSelectCompany} />

      {/* 2. Key Highlights Banner */}
      <StatsBanner />

      {/* 3. About SR GROUP Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
              <HardHat className="w-3.5 h-3.5" />
              <span>ABOUT SR GROUP</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-mono leading-tight">
              Engineering Strength. Industrial Experience. Trusted Execution.
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              SR GROUP is a multi-disciplinary industrial engineering group providing integrated solutions across infrastructure, engineering, fabrication, erection and power-related projects.
            </p>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              The group brings together specialized companies with complementary capabilities to support industrial clients from project execution to infrastructure and power solutions.
            </p>

            <div className="space-y-3 pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Our objective is to deliver:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Quality engineering</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Safe execution</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Timely completion</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Professional project management</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Reliable industrial solutions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Long-term customer relationships</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('/about')}
                className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold text-xs px-6 py-3 rounded flex items-center gap-2 uppercase tracking-wider transition-all"
              >
                <span>Read Group Overview</span>
                <ChevronRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </motion.div>

          {/* Right Visual Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            <GroupVisualShowcase
              onSelectCompany={onSelectCompany}
              onOpenLightbox={(item) => setSelectedGalleryItem({
                id: 'showcase-lightbox',
                title: item.title,
                category: 'PLANT',
                companyId: 'sr-group',
                image: item.image,
                caption: item.caption
              })}
            />
          </motion.div>

        </div>
      </section>

      {/* 3.5 CMD & Leadership Section */}
      <CmdSection />

      {/* 4. OUR THREE COMPANIES Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-800 bg-slate-950">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={headerVariants}
          className="text-center max-w-3xl mx-auto mb-14 space-y-3"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
            OUR GROUP STRUCTURE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase font-mono tracking-tight text-white">
            OUR THREE COMPANIES
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Specialized industrial entities combining engineering prowess, mechanical fabrication, process piping, and electrical power solutions.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          
          {/* Card 1: NEW SR INFRA */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-blue-500/50 transition-colors duration-300 flex flex-col justify-between group shadow-xl"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-slate-950">
                <img
                  src={COMPANIES_DATA['sr-infra'].heroImage}
                  alt="NEW SR INFRA"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 opacity-80 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded shadow">
                  COMPANY 01
                </span>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between bg-slate-950/80 backdrop-blur-sm p-2 rounded border border-blue-500/30">
                  <NewSrInfraLogo size="sm" showText={false} />
                  <span className="text-[11px] font-extrabold text-blue-400 tracking-wider">OFFICIAL BRAND</span>
                </div>
              </div>

              <div className="p-6 space-y-4 text-left">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <NewSrInfraLogo size="sm" showText={true} />
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  NEW SR INFRA provides industrial engineering, structural fabrication and erection, pipeline works and plant-related execution services.
                </p>

                <div className="space-y-2 pt-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Main Services:</p>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {COMPANIES_DATA['sr-infra'].services.slice(0, 5).map((s, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 text-left">
              <button
                onClick={() => handleCompanyClick('sr-infra')}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-3 rounded flex items-center justify-center gap-2 uppercase tracking-wider transition-colors shadow"
              >
                <span>Explore NEW SR INFRA</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Card 2: SUHEL ENGINEERING */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-orange-500/50 transition-colors duration-300 flex flex-col justify-between group shadow-xl"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-slate-950">
                <img
                  src={COMPANIES_DATA['suhel-engineering'].heroImage}
                  alt="SUHEL ENGINEERING"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 opacity-80 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                <span className="absolute top-3 left-3 bg-orange-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded shadow">
                  COMPANY 02
                </span>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between bg-slate-950/80 backdrop-blur-sm p-2 rounded border border-orange-500/30">
                  <SuhelEngineeringLogo size="sm" showText={false} />
                  <span className="text-[11px] font-extrabold text-orange-400 tracking-wider">OFFICIAL BRAND</span>
                </div>
              </div>

              <div className="p-6 space-y-4 text-left">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <SuhelEngineeringLogo size="sm" showText={true} />
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Suhel Engineering provides integrated industrial engineering, fabrication, erection and plant execution services for diverse industrial sectors with focus on safe execution and quality workmanship.
                </p>

                <div className="space-y-2 pt-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Main Services:</p>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {COMPANIES_DATA['suhel-engineering'].services.slice(0, 5).map((s, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 text-left">
              <button
                onClick={() => handleCompanyClick('suhel-engineering')}
                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs py-3 rounded flex items-center justify-center gap-2 uppercase tracking-wider transition-colors shadow"
              >
                <span>Explore SUHEL ENGINEERING</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Card 3: SR POWER SOLUTION */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-emerald-500/50 transition-colors duration-300 flex flex-col justify-between group shadow-xl"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-slate-950">
                <img
                  src={COMPANIES_DATA['sr-power-solution'].heroImage}
                  alt="SR POWER SOLUTION"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 opacity-80 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded shadow">
                  COMPANY 03
                </span>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between bg-slate-950/80 backdrop-blur-sm p-2 rounded border border-emerald-500/30">
                  <SrPowerSolutionLogo size="sm" showText={false} />
                  <span className="text-[11px] font-extrabold text-emerald-400 tracking-wider">OFFICIAL BRAND</span>
                </div>
              </div>

              <div className="p-6 space-y-4 text-left">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <SrPowerSolutionLogo size="sm" showText={true} />
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  SR POWER SOLUTION provides reliable electrical, power and industrial energy solutions for commercial, infrastructure and industrial applications.
                </p>

                <div className="space-y-2 pt-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Main Services:</p>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {COMPANIES_DATA['sr-power-solution'].services.slice(0, 5).map((s, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 text-left">
              <button
                onClick={() => handleCompanyClick('sr-power-solution')}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-3 rounded flex items-center justify-center gap-2 uppercase tracking-wider transition-colors shadow"
              >
                <span>Explore SR POWER SOLUTION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

        </motion.div>
      </section>

      {/* 5. SERVICES OVERVIEW Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-800">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={headerVariants}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="space-y-3 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
              CORE CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase font-mono tracking-tight text-white">
              OUR INDUSTRIAL SERVICES
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/services')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 uppercase tracking-wider"
          >
            <span>View All Service Specifications</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          {SERVICES_DATA.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-amber-500/50 transition-colors duration-300 flex flex-col justify-between text-left group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                  {service.iconName === 'Flame' || service.slug.includes('boiler') ? (
                    <Flame className="w-6 h-6" />
                  ) : service.iconName === 'Zap' ? (
                    <Zap className="w-6 h-6" />
                  ) : service.iconName === 'Pipette' ? (
                    <Layers className="w-6 h-6" />
                  ) : service.iconName === 'Building2' ? (
                    <Building2 className="w-6 h-6" />
                  ) : (
                    <Wrench className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white font-mono">{service.title}</h3>
                  <p className="text-[11px] text-amber-400 uppercase font-bold mt-0.5">
                    Executed by {getCompanyDisplayName(service.companyId)}
                  </p>
                </div>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {service.shortDesc}
                </p>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => handleServiceClick(service.slug)}
                  className="text-xs font-bold text-amber-400 group-hover:text-amber-300 flex items-center gap-1 uppercase tracking-wider"
                >
                  <span>Learn More</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5.5 SPECIALIZED POWER PLANT BOILER DIVISION SPOTLIGHT */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-800">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={headerVariants}
          className="relative rounded-2xl border border-amber-500/40 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 sm:p-10 overflow-hidden shadow-2xl"
        >
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-800/80 text-left">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
                <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>SPECIALIZED POWER & THERMAL SYSTEMS</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black uppercase font-mono tracking-tight text-white">
                POWER PLANT BOILER WORKS & OVERHAUL
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Turnkey boiler erection & installation, scheduled plant maintenance shutdowns, pressure parts & tube replacement, and complete auxiliary mechanical overhauling conforming to Indian Boiler Regulations (IBR 1950) & ASME codes.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => handleServiceClick('power-plant-boiler')}
                className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 font-bold text-xs px-4 py-2.5 rounded flex items-center gap-1.5 uppercase tracking-wider transition-colors"
              >
                <span>View Boiler Scope</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('/request-quote')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-5 py-2.5 rounded flex items-center gap-1.5 uppercase tracking-wider shadow transition-all hover:scale-105"
              >
                <FileText className="w-4 h-4" />
                <span>Request Boiler Quote</span>
              </button>
            </div>
          </div>

          {/* Featured Power Plant Boiler Site Photography Banner */}
          <div className="relative z-10 mb-8 rounded-xl overflow-hidden border border-amber-500/30 shadow-xl bg-slate-950">
            <div className="relative h-60 sm:h-72 md:h-80 w-full overflow-hidden">
              <img
                src={BOILER_BASE64}
                alt="Power Plant Boiler Works & Overhaul"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
              
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="bg-amber-500 text-slate-950 font-black text-[10px] uppercase px-3 py-1 rounded shadow-md font-mono tracking-wider">
                  IBR 1950 & ASME Sec I
                </span>
                <span className="bg-slate-900/90 text-amber-300 font-bold text-[10px] uppercase px-3 py-1 rounded border border-amber-500/30 backdrop-blur font-mono">
                  Thermal & Captive Power Plant Overhauls
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-left">
                <div className="space-y-1">
                  <h3 className="text-white font-mono font-black text-base sm:text-xl uppercase tracking-tight drop-shadow">
                    Power Plant Boiler Erection, Maintenance & Shutdowns
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm font-medium max-w-2xl">
                    High-pressure tube replacement, drum & header alignment, superheater coil revamping, and 24/7 turnaround execution across India.
                  </p>
                </div>
                <button
                  onClick={() => handleServiceClick('power-plant-boiler')}
                  className="shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs px-4 py-2 rounded shadow transition-all uppercase font-mono flex items-center gap-1.5"
                >
                  <span>Detailed Specifications</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Content Grid: 12 Execution Scope Items + Technical Badges */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            {/* Left: 12 Scope Items in 2 Columns */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-amber-400" />
                  CORE SCOPE OF BOILER SERVICES & SHUTDOWN EXECUTION:
                </span>
                <span className="text-[11px] font-mono text-slate-400">12 Certified Capabilities</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 p-3 rounded-lg hover:border-amber-500/50 hover:bg-slate-850 transition-all group"
                  >
                    <div className="w-6 h-6 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 shrink-0 transition-colors font-mono text-xs font-bold">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </div>
                    <span className="text-xs font-semibold text-slate-200 group-hover:text-white leading-tight">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Technical Badges, Compliance, & Fast Facts */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
              <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-xl space-y-4">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono border-l-2 border-amber-500 pl-2">
                  Technical Compliance & Capabilities
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Standards Compliance</span>
                    <p className="text-white font-medium">IBR 1950 & ASME Sec I Standards</p>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Quality & Inspection</span>
                    <p className="text-white font-medium">100% Radiographic (RT) & NDT Welder Qualification</p>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Boiler Types Handled</span>
                    <p className="text-white font-medium">AFBC, CFBC, WHRB, Pulverized Coal & Captive Co-gen</p>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Turnaround Readiness</span>
                    <p className="text-amber-400 font-bold">24/7 Rapid Mobilization for Planned Shutdowns</p>
                  </div>
                </div>
              </div>

              {/* Sub-card: Contact for Boiler Shutdowns */}
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">Direct Boiler Consultation</span>
                  <span className="text-xs text-white font-bold font-mono">info@srgroupone.com</span>
                </div>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded transition-colors"
                >
                  Contact HQ
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 6. INDUSTRIES WE SERVE Teaser */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-800 bg-slate-950">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={headerVariants}
          className="text-center max-w-3xl mx-auto mb-14 space-y-3"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
            SECTOR SPECIALIZATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase font-mono tracking-tight text-white">
            INDUSTRIES WE SERVE
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Delivering specialized structural, piping, mechanical and electrical engineering across India's heavy manufacturing & process sectors.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {INDUSTRIES_SERVED.slice(0, 6).map((ind) => (
            <motion.div
              key={ind.id}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden group hover:border-amber-500/40 transition-colors text-left shadow-lg"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={ind.image}
                  alt={ind.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                <h3 className="absolute bottom-3 left-4 text-base font-extrabold text-white font-mono">
                  {ind.title}
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {ind.shortDesc}
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => onNavigate('/industries')}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 uppercase tracking-wider"
                  >
                    <span>Explore Sector Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <button
            onClick={() => onNavigate('/industries')}
            className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold text-xs px-8 py-3.5 rounded inline-flex items-center gap-2 uppercase tracking-wider transition-all"
          >
            <span>View All 15 Industrial Sectors</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </motion.div>
      </section>

      {/* 7. OUR WORK PROCESS Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-800">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={headerVariants}
          className="text-center max-w-3xl mx-auto mb-16 space-y-3"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
            SYSTEMATIC EXECUTION
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase font-mono tracking-tight text-white">
            OUR WORK PROCESS
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            From initial site survey and engineering drafting to shop fabrication, site erection, testing, and final project handover.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {WORK_PROCESS_STEPS.map((step) => (
            <motion.div
              key={step.number}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-slate-900 border border-slate-800 rounded-lg p-5 text-left space-y-3 relative overflow-hidden group hover:border-amber-500/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-amber-400 font-mono">
                  {step.number}
                </span>
                <span className="w-2 h-2 rounded-full bg-amber-500/40 group-hover:bg-amber-400"></span>
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wide font-mono">
                {step.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 8. QUALITY & SAFETY Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-800 bg-slate-950">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={headerVariants}
          className="text-center max-w-3xl mx-auto mb-14 space-y-3"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
            CORE PRINCIPLES
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase font-mono tracking-tight text-white">
            QUALITY & SAFETY
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            Quality and safety are fundamental principles of SR GROUP. Our approach focuses on strict planning, NDT material checks, site safety compliance, and environmental responsibility.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {QUALITY_SAFETY_CARDS.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-left space-y-4 hover:border-amber-500/40 transition-colors shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="inline-block bg-amber-500 text-slate-950 text-xs font-black px-3 py-1 rounded uppercase tracking-wider">
                  {card.title}
                </div>
                <h3 className="text-base font-bold text-white font-mono">{card.subtitle}</h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  {card.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={() => onNavigate('/quality-safety')}
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 uppercase tracking-wider"
                >
                  <span>Read Full Safety Policy</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 8.5 COMPANIES WE HAVE WORKED WITH / CLIENT TRUST */}
      <div className="border-b border-slate-800 bg-slate-950/90 relative">
        <CompaniesWorkedWithSection onNavigate={onNavigate} />
      </div>

      {/* 9. WHY CHOOSE SR GROUP */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-800">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={headerVariants}
          className="text-center max-w-3xl mx-auto mb-14 space-y-3"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
            OUR ADVANTAGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase font-mono tracking-tight text-white">
            WHY CHOOSE SR GROUP
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {WHY_CHOOSE_US.map((item, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-slate-900 border border-slate-800 rounded-lg p-6 text-left space-y-2 hover:border-amber-500/50 transition-colors"
            >
              <div className="w-8 h-8 rounded bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-xs mb-3">
                0{idx + 1}
              </div>
              <h3 className="text-sm font-bold text-white uppercase font-mono">{item.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 10. GALLERY TEASER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-slate-800 bg-slate-950">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={headerVariants}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8"
        >
          <div className="space-y-3 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
              INDUSTRIAL PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase font-mono tracking-tight text-white">
              GALLERY SNAPSHOT
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/gallery')}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 uppercase tracking-wider"
          >
            <span>View Complete Industrial Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Category Filter Pills on HomePage */}
        <div className="flex flex-wrap items-center gap-2 mb-8 bg-slate-900/80 border border-slate-800/80 p-2 rounded-xl">
          {homeGalleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setHomeGalleryCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg uppercase tracking-wider transition-all ${
                homeGalleryCategory === cat
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div
          key={homeGalleryCategory}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {displayedGalleryItems.map((g) => (
            <motion.div
              key={g.id}
              variants={cardVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              onClick={() => setSelectedGalleryItem(g)}
              className="relative rounded-xl overflow-hidden h-60 border border-slate-800 hover:border-amber-500/50 cursor-pointer group shadow-xl bg-slate-900 text-left transition-all"
            >
              <img
                src={g.image}
                alt={g.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
              
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="text-[10px] font-black uppercase bg-amber-500 text-slate-950 px-2 py-0.5 rounded shadow">
                  {g.category}
                </span>
                <span className="text-[9px] font-black uppercase bg-slate-950/90 text-amber-400 px-2 py-0.5 rounded border border-slate-700 backdrop-blur-sm">
                  {getCompanyDisplayName(g.companyId)}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-left space-y-1">
                <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-amber-300 transition-colors">{g.title}</h4>
                <p className="text-[11px] text-slate-300 line-clamp-1 opacity-90">{g.caption}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 11. CTA Banner */}
      <motion.section
        initial={{ opacity: 0, scale: 0.96, y: 25 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-12 bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/30 rounded-2xl p-8 sm:p-12 text-center space-y-6 shadow-2xl"
      >
        <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-mono">
          HAVE AN UPCOMING INDUSTRIAL PROJECT?
        </h2>
        <p className="text-xs sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Get in touch with SR GROUP engineering leaders to discuss structural fabrication, pipeline erection, plant maintenance, or turnkey HT/LT power solutions.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('/request-quote')}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-8 py-4 rounded shadow-xl flex items-center justify-center gap-2 uppercase tracking-wider transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>REQUEST A QUOTE</span>
          </button>
          <button
            onClick={() => onNavigate('/contact')}
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold text-xs px-8 py-4 rounded flex items-center justify-center gap-2 uppercase tracking-wider transition-all"
          >
            <PhoneCall className="w-4 h-4 text-amber-400" />
            <span>CONTACT US</span>
          </button>
        </div>
      </motion.section>

      {/* Lightbox Modal */}
      <Lightbox
        item={selectedGalleryItem}
        items={GALLERY_DATA}
        onClose={() => setSelectedGalleryItem(null)}
        onSelect={(item) => setSelectedGalleryItem(item)}
        onEnquire={() => {
          setSelectedGalleryItem(null);
          onNavigate('/request-quote');
        }}
      />
    </div>
  );
};
