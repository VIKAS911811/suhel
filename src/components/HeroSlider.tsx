import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';
import { CompanyId } from '../types';
import { SR_GROUP_HERO_BASE64 } from '../assets/images/srGroupHeroBase64';
import { NEW_SR_INFRA_HERO_BASE64 } from '../assets/images/newSrInfraHeroBase64';
import { SUHEL_ENGINEERING_HERO_BASE64 } from '../assets/images/suhelEngineeringHeroBase64';
import { SR_POWER_SOLUTION_HERO_BASE64 } from '../assets/images/srPowerSolutionHeroBase64';

interface HeroSliderProps {
  onNavigate: (path: string) => void;
  onSelectCompany: (companyId: CompanyId) => void;
}

const SLIDES = [
  {
    id: 1,
    image: SR_GROUP_HERO_BASE64,
    tag: 'INTEGRATED INDUSTRIAL SOLUTIONS',
    title: 'COMPLETE INDUSTRIAL SOLUTIONS',
    subtitle: "Engineering, Fabrication, Erection, Infrastructure & Power Solutions for India's Industrial Sector.",
    companyBadge: 'SR GROUP',
    companyTarget: 'sr-group' as CompanyId
  },
  {
    id: 2,
    image: NEW_SR_INFRA_HERO_BASE64,
    tag: 'COMPANY 01 • NEW SR INFRA',
    title: 'HEAVY FABRICATION & ERECTION',
    subtitle: 'Precision structural steel fabrication, plant sheds, heavy gantries, and industrial infrastructure works.',
    companyBadge: 'NEW SR INFRA',
    companyTarget: 'sr-infra' as CompanyId
  },
  {
    id: 3,
    image: SUHEL_ENGINEERING_HERO_BASE64,
    tag: 'COMPANY 02 • SUHEL ENGINEERING',
    title: 'PROCESS PLANT PIPING & ENGINEERING',
    subtitle: 'Specialized industrial pipelines, Sponge Iron, Ferro Alloys, Power & Cement Plant mechanical execution.',
    companyBadge: 'SUHEL ENGINEERING',
    companyTarget: 'suhel-engineering' as CompanyId
  },
  {
    id: 4,
    image: SR_POWER_SOLUTION_HERO_BASE64,
    tag: 'COMPANY 03 • SR POWER SOLUTION',
    title: 'HT/LT POWER & ENERGY SOLUTIONS',
    subtitle: 'Turnkey industrial electrical installations, PCC/MCC panels, transformer setups, and solar solutions.',
    companyBadge: 'SR POWER SOLUTION',
    companyTarget: 'sr-power-solution' as CompanyId
  }
];

export const HeroSlider: React.FC<HeroSliderProps> = ({ onNavigate, onSelectCompany }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const activeSlide = SLIDES[currentSlide];

  return (
    <div className="relative w-full min-h-[85vh] lg:min-h-[90vh] bg-slate-950 overflow-hidden flex flex-col justify-between">
      {/* Background Image Slider with Overlays */}
      {SLIDES.map((slide, idx) => {
        const isActive = idx === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform scale-105 transition-transform duration-10000"
            />
            {/* Dark Industrial Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
          </div>
        );
      })}

      {/* Main Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-28 pb-12 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-3xl space-y-6 text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/40 px-3.5 py-1.5 rounded-full backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              {activeSlide.tag}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none font-mono">
            {activeSlide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed border-l-4 border-amber-500 pl-4">
            {activeSlide.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={() => {
                onSelectCompany(activeSlide.companyTarget);
                onNavigate('/companies');
              }}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm px-7 py-4 rounded shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 uppercase tracking-wider transition-all transform hover:-translate-y-0.5"
            >
              <span>Explore Our Companies</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('/request-quote')}
              className="bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 font-extrabold text-sm px-7 py-4 rounded shadow-xl flex items-center justify-center gap-2 uppercase tracking-wider transition-all"
            >
              <FileText className="w-4 h-4 text-amber-500" />
              <span>Get a Quote</span>
            </button>
          </div>

          {/* Group Capability Highlights - Verified statements, no fake numbers */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-300 text-xs border-t border-slate-800/80">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-semibold">3 Specialized Entities</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-semibold">ISO & Safety Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-semibold">Pan-India Execution</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-semibold">Turnkey Capabilities</span>
            </div>
          </div>

        </div>
      </div>

      {/* Slider Controls & Indicators */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-amber-500' : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
              title={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded bg-slate-900/80 border border-slate-800 text-slate-200 hover:text-white hover:bg-amber-500 hover:border-amber-500 hover:text-slate-950 flex items-center justify-center transition-colors"
            title="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded bg-slate-900/80 border border-slate-800 text-slate-200 hover:text-white hover:bg-amber-500 hover:border-amber-500 hover:text-slate-950 flex items-center justify-center transition-colors"
            title="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
