import React, { useState } from 'react';
import { useCmd } from '../../context/CmdContext';
import { Quote, Award, Sparkles, CheckCircle2, Mail, Phone, Building2, User, UserCheck } from 'lucide-react';
import cmdPhotoAsset from '../../assets/images/cmd_rk_ansari.jpg';
import { CMD_PHOTO_DATA_URL } from '../../assets/images/cmdBase64';
import { MD_PHOTO_DATA_URL } from '../../assets/images/mdBase64';

interface CmdSectionProps {
  title?: string;
  subtitle?: string;
  showFullDetails?: boolean;
}

export const CmdSection: React.FC<CmdSectionProps> = ({
  title = "EXECUTIVE LEADERSHIP & BOARD",
  subtitle = "CMD & MD Leadership of SR GROUP",
  showFullDetails = true,
}) => {
  const { cmdData, mdData } = useCmd();
  const [selectedRole, setSelectedRole] = useState<'cmd' | 'md'>('cmd');

  const activeLeader = selectedRole === 'md' ? mdData : cmdData;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Subtle Background Accent */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-800">
          <div className="space-y-1 text-left">
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{title}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase font-mono tracking-tight text-white">
              {subtitle}
            </h2>
          </div>

          <div className="text-xs text-slate-400 font-mono flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>SR GROUP Executive Board</span>
          </div>
        </div>

        {/* Executive Leader Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 text-left border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setSelectedRole('cmd')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md ${
                selectedRole === 'cmd'
                  ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400 scale-102'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>CMD: R. K. ANSARI</span>
            </button>

            <button
              onClick={() => setSelectedRole('md')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md ${
                selectedRole === 'md'
                  ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400 scale-102'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <User className="w-4 h-4" />
              <span>MD: SUHEL ANSARI</span>
            </button>
          </div>

          {/* Direct Trigger Label */}
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Active View: <strong className="text-amber-400 uppercase">{selectedRole} Profile</strong></span>
          </div>
        </div>

        {/* Main Leader Profile Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: High-Impact Photo Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl bg-slate-950 group">
              <img
                src={
                  selectedRole === 'cmd'
                    ? CMD_PHOTO_DATA_URL
                    : (MD_PHOTO_DATA_URL || activeLeader.photoDataUrl)
                }
                alt={activeLeader.name}
                referrerPolicy="no-referrer"
                className="w-full h-[460px] object-cover object-top group-hover:scale-102 transition-transform duration-500"
                onError={(e) => {
                  if (selectedRole === 'cmd') {
                    e.currentTarget.src = CMD_PHOTO_DATA_URL;
                  } else {
                    e.currentTarget.src = MD_PHOTO_DATA_URL;
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

              {/* Experience Badge */}
              <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-md shadow-lg flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>{activeLeader.experience}</span>
              </div>

              {/* Overlay Details */}
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-4 rounded-xl text-left space-y-1">
                <h3 className="text-lg font-black text-white font-mono tracking-tight">
                  {activeLeader.name}
                </h3>
                <p className="text-xs font-bold text-amber-400">
                  {activeLeader.title}
                </p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1 pt-1">
                  <Building2 className="w-3 h-3 text-slate-500 shrink-0" />
                  <span>{activeLeader.companyName}</span>
                </p>
              </div>
            </div>

            {/* Quick Contact Bar */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] font-mono">{activeLeader.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] font-mono">{activeLeader.phone}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Message, Bio & Achievements */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Vision Quote Block */}
            <div className="bg-slate-950 border-l-4 border-amber-500 border-y border-r border-slate-800/80 p-6 rounded-r-xl space-y-3 relative">
              <Quote className="w-8 h-8 text-amber-500/20 absolute top-4 right-4" />
              <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
                {selectedRole.toUpperCase()} VISION & STATEMENT
              </p>
              <p className="text-sm sm:text-base text-slate-200 italic font-serif leading-relaxed">
                "{activeLeader.message}"
              </p>
            </div>

            {/* Biography */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-1.5">
                Executive Leadership Background
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeLeader.bio}
              </p>
              {activeLeader.qualification && (
                <p className="text-xs text-amber-300 font-semibold pt-1">
                  🎓 Qualification: {activeLeader.qualification}
                </p>
              )}
            </div>

            {/* Key Achievements */}
            {showFullDetails && activeLeader.achievements && activeLeader.achievements.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-slate-800 pb-1.5">
                  Key Milestones & Responsibilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {activeLeader.achievements.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 bg-slate-950 p-2.5 rounded border border-slate-800/60">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
