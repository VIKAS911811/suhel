import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ChevronLeft, ChevronRight, Layers, Maximize2 } from 'lucide-react';
import { CompanyId } from '../types';
import { NEW_SR_INFRA_HERO_BASE64 } from '../assets/images/newSrInfraHeroBase64';
import { SUHEL_ENGINEERING_HERO_BASE64 } from '../assets/images/suhelEngineeringHeroBase64';
import { SR_POWER_SOLUTION_HERO_BASE64 } from '../assets/images/srPowerSolutionHeroBase64';

interface ShowcaseSlide {
  id: string;
  companyId: CompanyId;
  companyName: string;
  tag: string;
  image: string;
  alt: string;
  badgeColor: string;
}

const SHOWCASE_SLIDES: ShowcaseSlide[] = [
  {
    id: 'slide-srinfra',
    companyId: 'sr-infra',
    companyName: 'NEW SR INFRA',
    tag: 'STRUCTURAL FABRICATION & ERECTION',
    image: '/images/sr-infra-home.jpg',
    alt: 'NEW SR INFRA Industrial Site Execution and Structural Framing',
    badgeColor: 'bg-blue-600 border-blue-400/40 text-blue-100'
  },
  {
    id: 'slide-suhel',
    companyId: 'suhel-engineering',
    companyName: 'SUHEL ENGINEERING',
    tag: 'PROCESS PLANT PIPING & MECHANICAL',
    image: '/images/suhel-engineering-hero.jpg',
    alt: 'SUHEL ENGINEERING Process Piping and Mechanical Assembly Site',
    badgeColor: 'bg-orange-600 border-orange-400/40 text-orange-100'
  },
  {
    id: 'slide-srpower',
    companyId: 'sr-power-solution',
    companyName: 'SR POWER SOLUTION',
    tag: 'POWER PLANT & SUBSTATION WORKS',
    image: '/images/power-plant-1.jpg',
    alt: 'SR POWER SOLUTION Plant Electrification & Substation Turnkey Works',
    badgeColor: 'bg-emerald-600 border-emerald-400/40 text-emerald-100'
  }
];

interface GroupVisualShowcaseProps {
  onSelectCompany?: (companyId: CompanyId) => void;
  onOpenLightbox?: (item: { title: string; image: string; caption: string }) => void;
}

export const GroupVisualShowcase: React.FC<GroupVisualShowcaseProps> = ({
  onSelectCompany,
  onOpenLightbox
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const currentSlide = SHOWCASE_SLIDES[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + SHOWCASE_SLIDES.length) % SHOWCASE_SLIDES.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % SHOWCASE_SLIDES.length);
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 3 Quick Navigation Tabs */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-1.5 bg-slate-950/80 backdrop-blur-md p-1.5 rounded-xl border border-slate-700/60 shadow-lg">
        {SHOWCASE_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-1 text-[10px] sm:text-[11px] font-black uppercase tracking-wider py-1.5 px-2 rounded-lg transition-all text-center truncate ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow font-extrabold scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              {slide.companyId === 'sr-infra' ? 'NEW SR INFRA' : slide.companyId === 'suhel-engineering' ? 'SUHEL ENG.' : 'SR POWER'}
            </button>
          );
        })}
      </div>

      {/* Main Image Slides with AnimatePresence */}
      <div className="relative h-[430px] sm:h-[460px] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <img
              src={
                currentSlide.companyId === 'sr-infra'
                  ? NEW_SR_INFRA_HERO_BASE64
                  : currentSlide.companyId === 'suhel-engineering'
                  ? SUHEL_ENGINEERING_HERO_BASE64
                  : currentSlide.companyId === 'sr-power-solution'
                  ? SR_POWER_SOLUTION_HERO_BASE64
                  : currentSlide.image
              }
              alt={currentSlide.alt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {/* Top Vignette for Tabs */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-transparent" />
            {/* Bottom Vignette for Caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Company Floating Badge */}
        <div className="absolute top-18 left-4 z-20">
          <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md border shadow-md ${currentSlide.badgeColor}`}>
            {currentSlide.companyName} • {currentSlide.tag}
          </span>
        </div>

        {/* Expand / Lightbox Action */}
        {onOpenLightbox && (
          <button
            onClick={() => onOpenLightbox({
              title: `${currentSlide.companyName} - ${currentSlide.tag}`,
              image: currentSlide.image,
              caption: currentSlide.alt
            })}
            className="absolute top-18 right-4 z-20 w-8 h-8 rounded-lg bg-slate-950/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-amber-500 hover:text-slate-950 transition-colors flex items-center justify-center shadow"
            title="View Full Resolution"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}

        {/* Arrow Navigation */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-950/70 border border-slate-700 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-amber-500 hover:text-slate-950"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-950/70 border border-slate-700 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-amber-500 hover:text-slate-950"
          aria-label="Next image"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Permanent Bottom Anchor Card with Requested Text */}
        <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 backdrop-blur-md border border-slate-700/90 p-4 rounded-xl text-left shadow-2xl z-20">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>COMPLETE INDUSTRIAL SOLUTIONS</span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-300 bg-slate-800/90 px-2 py-0.5 rounded border border-slate-700">
              UNIFIED GROUP
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            One Group uniting NEW SR INFRA, SUHEL ENGINEERING & SR POWER SOLUTION under a single unified standards framework.
          </p>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 pt-3 border-t border-slate-800/80 mt-2.5">
            {SHOWCASE_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'w-6 bg-amber-400'
                    : 'w-1.5 bg-slate-600 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
