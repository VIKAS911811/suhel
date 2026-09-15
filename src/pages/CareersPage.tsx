import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { PLACEHOLDERS } from '../data/groupData';
import { CaptchaWidget } from '../components/CaptchaWidget';
import { HardHat, Briefcase, Mail, Phone, Upload, CheckCircle2, AlertCircle, Send } from 'lucide-react';

interface CareersPageProps {
  onNavigate: (path: string) => void;
}

export const CareersPage: React.FC<CareersPageProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'Site Engineer',
    experience: '3-5 Years',
    message: '',
    fileName: '',
    captchaToken: '',
    captchaAnswer: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  const handleCaptchaVerify = (token: string, answer: string) => {
    setFormData((prev) => ({
      ...prev,
      captchaToken: token,
      captchaAnswer: answer,
    }));
    setCaptchaError(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, fileName: e.target.files[0].name });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    if (!formData.captchaAnswer) {
      setErrorMsg('Please solve the anti-bot verification challenge.');
      setCaptchaError(true);
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || `Failed to submit application (HTTP ${res.status}). Please try again.`);
        if (data.error && data.error.includes('anti-bot')) {
          setCaptchaError(true);
        }
      }
    } catch (err) {
      console.error('Career form submission error:', err);
      setErrorMsg('Network error connecting to server. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title="Careers at SR GROUP | Industrial Engineering Jobs & Workforce"
        description="Build your career with SR GROUP. We hire site engineers, fabrication supervisors, 6G pipe welders, safety officers, and HT/LT electrical technicians across India."
      />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-left space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
            <HardHat className="w-3.5 h-3.5" />
            <span>JOIN OUR WORKFORCE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase font-mono tracking-tight text-white">
            BUILD YOUR CAREER WITH SR GROUP
          </h1>
          <p className="text-slate-300 text-base max-w-3xl">
            "We are always looking for skilled professionals, engineers, supervisors, technicians and dedicated industrial workforce who want to grow with us."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
              <h2 className="text-lg font-black uppercase font-mono text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-amber-400" />
                <span>Careers Desk</span>
              </h2>

              <p className="text-xs text-slate-300 leading-relaxed">
                Join a dynamic industrial engineering group operating across heavy structural steel fabrication, high-pressure utility pipelines, process plant maintenance, and turnkey power distribution.
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Official Careers / HR Email:</span>
                    <a href={`mailto:${PLACEHOLDERS.careersEmail}`} className="text-amber-400 font-mono hover:underline">
                      {PLACEHOLDERS.careersEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <div className="flex items-center gap-2 font-mono">
                    <a href="tel:+919898241068" className="hover:text-amber-400">{PLACEHOLDERS.phone}</a>
                    <span>/</span>
                    <a href="tel:+919129325506" className="hover:text-amber-400">{PLACEHOLDERS.secondaryPhone}</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 border-l-2 border-amber-500 pl-2">
                Key Professional Roles
              </h3>
              <div className="space-y-2 text-xs text-slate-300">
                {[
                  'Mechanical & Structural Site Engineers',
                  'Workshop Fabrication Supervisors',
                  'Certified AWS / ASME 6G Pipe Welders',
                  'EHS & Site Safety Officers (OSHA Certified)',
                  'HT / LT Panel & Electrical Technicians',
                  'Crane Operators & Rigging Supervisors'
                ].map((role, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Application Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase font-mono text-white">SUBMIT YOUR RESUME</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Fill in your professional details below to register your profile with SR GROUP Careers.
                </p>
              </div>

              {submitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="text-base font-bold text-white uppercase font-mono">Resume Submitted Successfully</h3>
                  <p className="text-xs text-slate-300">
                    Thank you. Your profile has been registered. Our HR department will review your application and contact you if shortlisted for open site positions.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', position: 'Site Engineer', experience: '3-5 Years', message: '', fileName: '' });
                    }}
                    className="bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded mt-2"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMsg && (
                    <div className="bg-red-500/10 border border-red-500/30 p-3 rounded text-xs text-red-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="E.g., Rajesh Sharma"
                        className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rajesh@example.com"
                        className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Applying Position</label>
                      <select
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                      >
                        <option value="Site Engineer">Site Engineer</option>
                        <option value="Fabrication Supervisor">Fabrication Supervisor</option>
                        <option value="Pipe Welder (6G)">Pipe Welder (6G)</option>
                        <option value="Safety Officer">Safety Officer</option>
                        <option value="Electrical Technician">Electrical Technician</option>
                        <option value="Project Manager">Project Manager</option>
                        <option value="Other Industrial Role">Other Industrial Role</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Total Experience</label>
                    <select
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                    >
                      <option value="1-2 Years">1-2 Years</option>
                      <option value="3-5 Years">3-5 Years</option>
                      <option value="5-10 Years">5-10 Years</option>
                      <option value="10+ Years">10+ Years Senior Experience</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Attach Resume / CV Document</label>
                    <div className="relative border-2 border-dashed border-slate-700 hover:border-amber-500/50 rounded-lg p-4 text-center cursor-pointer bg-slate-950 transition-colors">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Upload className="w-6 h-6 text-amber-400 mx-auto mb-1" />
                      <span className="text-xs text-slate-300 block font-semibold">
                        {formData.fileName || 'Click or drag PDF / Word resume file here'}
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">Max size 10MB</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Brief Message / Career Summary</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Summarize your key industrial qualifications, site safety records, or major projects executed..."
                      className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none resize-none"
                    />
                  </div>

                  {/* Anti-Bot Captcha Verification Challenge */}
                  <CaptchaWidget
                    onVerify={handleCaptchaVerify}
                    hasError={captchaError}
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs py-3.5 rounded flex items-center justify-center gap-2 uppercase tracking-wider shadow-lg transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Submitting Application...' : 'Send Your Resume'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
