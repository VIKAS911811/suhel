import React from 'react';
import { Building2, ShieldCheck, Flame, Wrench, Globe2, Award } from 'lucide-react';

export const StatsBanner: React.FC = () => {
  const highlights = [
    {
      title: 'Integrated Group Strength',
      desc: '3 Specialized Subsidiaries under SR GROUP',
      icon: Building2,
    },
    {
      title: 'Full Life-Cycle Execution',
      desc: 'Fabrication, Piping, Erection & HT/LT Power',
      icon: Wrench,
    },
    {
      title: 'Zero-Incident Safety Culture',
      desc: 'Strict Site PPE & Permit-to-Work Standards',
      icon: ShieldCheck,
    },
    {
      title: 'Heavy Industry Specialization',
      desc: 'Steel, Power, Sponge Iron, Cement & Chemical',
      icon: Flame,
    },
    {
      title: 'Pan-India Site Mobility',
      desc: 'Dedicated Engineering Crews & Site Logistics',
      icon: Globe2,
    },
    {
      title: 'Quality First Commitment',
      desc: 'Strict QAP & NDT Certified Welders',
      icon: Award,
    },
  ];

  return (
    <section className="bg-slate-900 border-y border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-amber-500/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all mb-2">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-tight">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
