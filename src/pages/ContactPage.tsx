import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { CompanyId } from '../types';
import { PLACEHOLDERS, COMPANIES_DATA } from '../data/groupData';
import { CaptchaWidget } from '../components/CaptchaWidget';
import { MapPin, Phone, Mail, MessageSquare, Send, CheckCircle2, AlertCircle, HardHat, Building2, Clock, ExternalLink } from 'lucide-react';

interface ContactPageProps {
  currentCompany: CompanyId;
  onSelectCompany: (companyId: CompanyId) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ currentCompany, onSelectCompany }) => {
  const [formData, setFormData] = useState({
    companyContext: currentCompany,
    name: '',
    companyName: '',
    email: '',
    phone: '',
    projectType: 'Structural Fabrication',
    message: '',
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setErrorMsg('Please fill in all required fields.');
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
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit enquiry.');
        if (data.error && data.error.includes('anti-bot')) {
          setCaptchaError(true);
        }
      }
    } catch {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(`Hello SR Group, I would like to inquire regarding ${formData.projectType || 'industrial engineering services'}. My name is ${formData.name || 'Client'}.`);
    window.open(`https://wa.me/${PLACEHOLDERS.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title="Contact SR GROUP | Industrial Engineering & Power Enquiries"
        description="Get in touch with SR GROUP. Contact our offices for structural fabrication, pipeline erection, plant maintenance, and HT/LT electrical engineering quotes across India."
      />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-left space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
            <HardHat className="w-3.5 h-3.5" />
            <span>DIRECT COMMUNICATION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase font-mono tracking-tight text-white">
            CONTACT SR GROUP
          </h1>
          <p className="text-slate-300 text-base max-w-3xl">
            Reach out to our group engineering offices or submit an enquiry regarding structural fabrication, process plant erection, industrial piping, or HT/LT power distribution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          
          {/* Left Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-black uppercase font-mono text-white">ENQUIRY FORM</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Submit your query directly to our project coordination team.</p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400 font-bold uppercase">Target:</span>
                  <select
                    value={formData.companyContext}
                    onChange={(e) => {
                      const val = e.target.value as CompanyId;
                      setFormData({ ...formData, companyContext: val });
                      onSelectCompany(val);
                    }}
                    className="bg-slate-950 border border-slate-700 text-amber-400 font-bold text-xs p-2 rounded focus:outline-none"
                  >
                    <option value="sr-group">SR GROUP (OVERALL)</option>
                    <option value="sr-infra">NEW SR INFRA</option>
                    <option value="suhel-engineering">SUHEL ENGINEERING</option>
                    <option value="sr-power-solution">SR POWER SOLUTION</option>
                  </select>
                </div>
              </div>

              {submitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-8 rounded-xl text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h3 className="text-lg font-black text-white font-mono uppercase">Enquiry Received</h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you. Your enquiry has been received. Our engineering team will review your requirements and contact you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ ...formData, name: '', email: '', phone: '', message: '' });
                    }}
                    className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-6 py-2.5 rounded uppercase tracking-wider"
                  >
                    Submit Another Enquiry
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
                        placeholder="E.g., Anish Kumar"
                        className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Company Name</label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="E.g., Steel Manufacturing Corp"
                        className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="anish@company.com"
                        className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                      />
                    </div>

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
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Project Type / Category</label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-xs text-white focus:border-amber-500 focus:outline-none"
                    >
                      <option value="Structural Fabrication & Erection">Structural Fabrication & Erection</option>
                      <option value="Industrial Pipeline Works">Industrial Pipeline Works</option>
                      <option value="Process Plant Overhaul / Shutdown">Process Plant Overhaul / Shutdown</option>
                      <option value="HT / LT Electrical Distribution">HT / LT Electrical Distribution</option>
                      <option value="Industrial Solar Solution">Industrial Solar Solution</option>
                      <option value="General Industrial Enquiry">General Industrial Enquiry</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Project Details / Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify your project requirements, technical parameters, estimated timeline, or location..."
                      className="w-full bg-slate-950 border border-slate-700 rounded p-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none resize-none"
                    />
                  </div>

                  {/* Anti-Bot Captcha Verification Challenge */}
                  <CaptchaWidget
                    onVerify={handleCaptchaVerify}
                    hasError={captchaError}
                  />

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs py-3.5 rounded flex items-center justify-center gap-2 uppercase tracking-wider shadow-lg transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>{submitting ? 'Submitting...' : 'Submit Enquiry'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={openWhatsApp}
                      className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-3.5 rounded flex items-center justify-center gap-2 uppercase tracking-wider shadow"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp Quick Query</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Info Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Contact Card (Matching User Image Theme) */}
            <div className="bg-gradient-to-b from-[#0a2540] via-[#081b2f] to-[#040f1a] border border-cyan-500/30 p-7 rounded-2xl space-y-6 shadow-2xl relative overflow-hidden text-left">
              {/* Subtle background tech pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:18px_18px] opacity-15 pointer-events-none" />

              <div className="relative z-10 space-y-6">
                
                {/* 1. Phone number */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-base sm:text-lg font-extrabold text-cyan-400 font-sans tracking-tight">
                      Phone number
                    </h3>
                  </div>
                  <div className="space-y-1 pl-6 text-sm text-slate-100 font-medium font-mono">
                    <div>
                      <a href="tel:+919898241068" className="hover:text-cyan-300 transition-colors block">
                        (+91) 9898 241 068
                      </a>
                    </div>
                    <div>
                      <a href="tel:+919129325506" className="hover:text-cyan-300 transition-colors block">
                        (+91) 9129 325 506
                      </a>
                    </div>
                  </div>
                </div>

                {/* 2. Email address - Departmental Directory */}
                <div className="space-y-2.5 pt-1 border-t border-cyan-900/40">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-cyan-400" />
                      <h3 className="text-base sm:text-lg font-extrabold text-cyan-400 font-sans tracking-tight">
                        Official Email Directory
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30">
                      5 DEPARTMENTS
                    </span>
                  </div>
                  
                  <div className="pl-2 sm:pl-6 space-y-2 text-xs font-mono">
                    {/* 1. General & Head Office */}
                    <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <span className="text-[10px] font-sans text-slate-400 uppercase font-bold block">General & Head Office:</span>
                        <a href="mailto:info@srgroupone.com" className="text-slate-100 hover:text-cyan-300 transition-colors underline decoration-cyan-500/40 text-xs sm:text-sm font-bold">
                          info@srgroupone.com
                        </a>
                      </div>
                      <span className="text-[9px] font-sans text-slate-500 uppercase self-start sm:self-center bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                        General HQ
                      </span>
                    </div>

                    {/* 2. Projects & Tenders */}
                    <div className="bg-slate-950/70 p-2 rounded-lg border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <span className="text-[10px] font-sans text-amber-400 uppercase font-bold block">Projects & Industrial Tenders:</span>
                        <a href="mailto:project@srgroupone.com" className="text-amber-300 hover:text-amber-200 transition-colors underline decoration-amber-500/40 text-xs sm:text-sm font-bold">
                          project@srgroupone.com
                        </a>
                      </div>
                      <span className="text-[9px] font-sans text-amber-400 uppercase self-start sm:self-center bg-amber-500/20 px-1.5 py-0.5 rounded border border-amber-500/40 font-bold">
                        Projects
                      </span>
                    </div>

                    {/* 3. Accounts & Finance */}
                    <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <span className="text-[10px] font-sans text-emerald-400 uppercase font-bold block">Accounts & Finance Department:</span>
                        <a href="mailto:account@srgroupone.com" className="text-emerald-300 hover:text-emerald-200 transition-colors underline decoration-emerald-500/40 text-xs sm:text-sm font-bold">
                          account@srgroupone.com
                        </a>
                      </div>
                      <span className="text-[9px] font-sans text-emerald-400 uppercase self-start sm:self-center bg-emerald-500/20 px-1.5 py-0.5 rounded border border-emerald-500/40 font-bold">
                        Accounts
                      </span>
                    </div>

                    {/* 4. Billing & Invoicing */}
                    <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <span className="text-[10px] font-sans text-sky-400 uppercase font-bold block">Billing, Invoicing & GST:</span>
                        <a href="mailto:bill@srgroupone.com" className="text-sky-300 hover:text-sky-200 transition-colors underline decoration-sky-500/40 text-xs sm:text-sm font-bold">
                          bill@srgroupone.com
                        </a>
                      </div>
                      <span className="text-[9px] font-sans text-sky-400 uppercase self-start sm:self-center bg-sky-500/20 px-1.5 py-0.5 rounded border border-sky-500/40 font-bold">
                        Billing
                      </span>
                    </div>

                    {/* 5. Procurement & Purchase */}
                    <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <span className="text-[10px] font-sans text-orange-400 uppercase font-bold block">Procurement & Purchase Department:</span>
                        <a href="mailto:purchase@srgroupone.com" className="text-orange-300 hover:text-orange-200 transition-colors underline decoration-orange-500/40 text-xs sm:text-sm font-bold">
                          purchase@srgroupone.com
                        </a>
                      </div>
                      <span className="text-[9px] font-sans text-orange-400 uppercase self-start sm:self-center bg-orange-500/20 px-1.5 py-0.5 rounded border border-orange-500/40 font-bold">
                        Purchase
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Address info */}
                <div className="space-y-3 pt-1 border-t border-cyan-900/40">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-base sm:text-lg font-extrabold text-cyan-400 font-sans tracking-tight">
                      Address info
                    </h3>
                  </div>

                  <div className="pl-6 space-y-4 text-xs text-slate-200">
                    {/* Registered Office */}
                    <div className="space-y-1">
                      <h4 className="text-cyan-400 font-bold text-xs uppercase tracking-wide">
                        Registered Office :
                      </h4>
                      <p className="text-slate-300 leading-relaxed">
                        Plot No.295, Sector 7, G.F. 02, Gandhidham(Kutch) Gujarat.
                      </p>
                    </div>

                    {/* Corporate Office */}
                    <div className="space-y-1">
                      <h4 className="text-cyan-400 font-bold text-xs uppercase tracking-wide">
                        Corporate Office :
                      </h4>
                      <p className="text-slate-300 leading-relaxed">
                        Plot No.102, F/F, Patel Chamber, Opp. Jay Residency Gandhidham(Kutch) Gujarat.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4. Opening Hours */}
                <div className="space-y-2 pt-1 border-t border-cyan-900/40">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-base sm:text-lg font-extrabold text-cyan-400 font-sans tracking-tight">
                      Opening Hours
                    </h3>
                  </div>

                  <div className="pl-6 space-y-1 text-xs text-slate-200">
                    <p className="text-slate-300">Mon-Fri: 9 am – 6 pm</p>
                    <p className="text-slate-300">Saturday: 9 am – 4 pm</p>
                    <p className="text-slate-400">Sunday: Closed</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Subsidiary Direct Contacts */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 shadow-xl">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block font-mono border-l-2 border-amber-500 pl-2">
                Subsidiary Operations & Branches:
              </span>
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-blue-500/30 space-y-1">
                  <p className="font-bold text-blue-400 uppercase tracking-wide">NEW SR INFRA</p>
                  <p className="text-[11px] text-slate-300">Plot No.295, Sector 7, G.F. 02, Gandhidham(Kutch) Gujarat.</p>
                  <p className="text-[11px] text-slate-300 font-mono">Tel: (+91) 9898 241 068 / (+91) 9129 325 506</p>
                  <p className="text-[11px] text-slate-300 font-mono">Email: info@newsrinfra.com | GSTIN: 24CTGPR1641K1ZJ</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-orange-500/30 space-y-1">
                  <p className="font-bold text-orange-400 uppercase tracking-wide">SUHEL ENGINEERING <span className="text-[10px] text-slate-400 font-normal">(Vendor ID: 10001847-Suhel Engineering)</span></p>
                  <p className="text-[11px] text-slate-300">Firdous Nagar G T Road Neamatpur 123/38N, Asansol, Paschim Bardhaman, West Bengal - 713359</p>
                  <p className="text-[11px] text-slate-300 font-mono">Vendor Tel: +91 63863 17157 / +91 91293 25506</p>
                  <p className="text-[11px] text-slate-300 font-mono">Vendor Email: suhelengineering7@rediffmail.com | GSTIN: 19BXVPA8671E1ZY</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1">
                  <p className="font-bold text-emerald-400 uppercase tracking-wide">SR POWER SOLUTION</p>
                  <p className="text-[11px] text-slate-300">12N, Seetalpur, P.O:- Disergarh SO, P.S:- Kulti, Paschim Bardhaman, WB - 713333</p>
                  <p className="text-[11px] text-slate-300 font-mono">Tel: +91 91293 25506 / +91 99780 18354</p>
                  <p className="text-[11px] text-slate-300 font-mono">Email: power@srgroup.com | GSTIN: 19BXVPA8671E2ZX</p>
                </div>
              </div>
            </div>

            {/* Google Map Location Frame for Gandhidham, Gujarat */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl p-3 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-white font-mono uppercase">
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <span>Gandhidham (Kutch) Gujarat Location</span>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Plot+No+102+Patel+Chamber+Gandhidham+Kutch+Gujarat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold underline"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="relative w-full h-52 bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
                <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
                
                <div className="relative z-10 text-center space-y-2 p-4 max-w-xs">
                  <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center mx-auto font-bold shadow-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-white font-mono uppercase">SR GROUP Corporate Office</h4>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    Plot No.102, F/F, Patel Chamber, Opp. Jay Residency, Gandhidham (Kutch) Gujarat.
                  </p>
                  <span className="inline-block bg-slate-800 text-cyan-400 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700">
                    Gandhidham(Kutch), Gujarat
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
