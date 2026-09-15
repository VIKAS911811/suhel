import React, { useState } from 'react';
import { SEOHead } from '../components/SEOHead';
import { CompanyId, QuoteFormData } from '../types';
import { COMPANIES_DATA } from '../data/groupData';
import { CaptchaWidget } from '../components/CaptchaWidget';
import { HardHat, FileText, Upload, Send, CheckCircle2, AlertCircle, Building2, Calculator } from 'lucide-react';

interface RequestQuotePageProps {
  currentCompany: CompanyId;
  onSelectCompany: (companyId: CompanyId) => void;
}

export const RequestQuotePage: React.FC<RequestQuotePageProps> = ({ currentCompany, onSelectCompany }) => {
  const [formData, setFormData] = useState<QuoteFormData & { captchaToken?: string; captchaAnswer?: string }>({
    targetCompany: currentCompany,
    name: '',
    companyName: '',
    email: '',
    phone: '',
    industry: 'Steel Plants',
    serviceRequired: 'Structural Steel Fabrication & Erection',
    projectLocation: '',
    estimatedSize: 'Under 100 Tons / Standard',
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
    if (!formData.name || !formData.email || !formData.phone || !formData.serviceRequired) {
      setErrorMsg('Please complete all required fields (*).');
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
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit quote request.');
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

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <SEOHead
        title="Request a Quote | SR GROUP Industrial Engineering & Power Solutions"
        description="Submit your industrial quotation request for heavy structural steel fabrication, high-pressure utility piping, process plant maintenance, or HT/LT power distribution with SR GROUP."
      />

      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-left space-y-4 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded border border-amber-500/20">
            <HardHat className="w-3.5 h-3.5" />
            <span>ENGINEERING ESTIMATE DESK</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase font-mono tracking-tight text-white">
            REQUEST A QUOTE
          </h1>
          <p className="text-slate-300 text-base max-w-2xl">
            Please provide your project specifications below. Our engineering estimating team will review your drawings and requirements to issue a comprehensive technical proposal.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-slate-900 border border-slate-800 p-8 sm:p-10 rounded-2xl shadow-2xl space-y-8 text-left">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">STEP 1 OF 1</span>
              <h2 className="text-xl font-black font-mono text-white">PROJECT QUOTATION SPECIFICATIONS</h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Target Entity:</span>
              <select
                value={formData.targetCompany}
                onChange={(e) => {
                  const val = e.target.value as CompanyId;
                  setFormData({ ...formData, targetCompany: val });
                  onSelectCompany(val);
                }}
                className="bg-slate-950 border border-slate-700 text-amber-400 font-bold text-xs p-2 rounded focus:outline-none"
              >
                <option value="sr-group">SR GROUP (OVERALL)</option>
                <option value="sr-infra">NEW SR INFRA (STRUCTURAL)</option>
                <option value="suhel-engineering">SUHEL ENGINEERING (PROCESS/PIPE)</option>
                <option value="sr-power-solution">SR POWER SOLUTION (ELECTRICAL)</option>
              </select>
            </div>
          </div>

          {submitted ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-10 rounded-2xl text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
              <h2 className="text-2xl font-black text-white font-mono uppercase">Enquiry Received</h2>
              <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                Thank you. Your enquiry has been received. Our team will contact you shortly.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      targetCompany: currentCompany,
                      name: '',
                      companyName: '',
                      email: '',
                      phone: '',
                      industry: 'Steel Plants',
                      serviceRequired: 'Structural Steel Fabrication & Erection',
                      projectLocation: '',
                      estimatedSize: 'Under 100 Tons / Standard',
                      message: '',
                      fileName: ''
                    });
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs px-6 py-3 rounded uppercase tracking-wider"
                >
                  Submit Another Quote Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded text-xs text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="E.g., Vikram Singh"
                    className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Company Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="E.g., Jindal Steel / Heavy Infra Corp"
                    className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
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
                    placeholder="vikram@company.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
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
                    className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Industry Sector</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-xs text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Steel Plants">Steel Plants</option>
                    <option value="Sponge Iron Plants">Sponge Iron Plants</option>
                    <option value="Ferro Alloys">Ferro Alloys</option>
                    <option value="Power Plants">Power Plants</option>
                    <option value="Cement Plants">Cement Plants</option>
                    <option value="Rolling Mills">Rolling Mills</option>
                    <option value="Pellet Plants">Pellet Plants</option>
                    <option value="Chemical Industries">Chemical Industries</option>
                    <option value="Infrastructure Projects">Infrastructure Projects</option>
                    <option value="Manufacturing Industries">Manufacturing Industries</option>
                    <option value="Warehouses & PEB">Warehouses & PEB</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Service Required *</label>
                  <select
                    value={formData.serviceRequired}
                    onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-xs text-white focus:border-amber-500 focus:outline-none font-bold text-amber-400"
                  >
                    <option value="Structural Steel Fabrication & Erection">Structural Steel Fabrication & Erection</option>
                    <option value="Industrial & Utility Pipeline Works">Industrial & Utility Pipeline Works</option>
                    <option value="Process Plant Overhaul & Maintenance">Process Plant Overhaul & Maintenance</option>
                    <option value="HT / LT Electrical Installation & Panels">HT / LT Electrical Installation & Panels</option>
                    <option value="Industrial Solar PV Installation">Industrial Solar PV Installation</option>
                    <option value="Equipment Installation & Relocation">Equipment Installation & Relocation</option>
                    <option value="Turnkey Full Plant Infrastructure">Turnkey Full Plant Infrastructure</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Project Location</label>
                  <input
                    type="text"
                    value={formData.projectLocation}
                    onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                    placeholder="E.g., Raigarh, Chhattisgarh / Angul, Odisha"
                    className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Estimated Project Size / Tonnage</label>
                  <select
                    value={formData.estimatedSize}
                    onChange={(e) => setFormData({ ...formData, estimatedSize: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-xs text-white focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Under 100 Tons / Standard">Under 100 Tons / Small Utility</option>
                    <option value="100 Tons - 500 Tons">100 Tons - 500 Tons Structural</option>
                    <option value="500 Tons - 2000 Tons">500 Tons - 2000 Tons Medium Plant</option>
                    <option value="2000+ Tons Heavy Turnkey">2000+ Tons Heavy Turnkey Plant</option>
                  </select>
                </div>
              </div>

              {/* Document Upload Simulator */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                  Upload Project Document / BOQ / Drawings (Optional)
                </label>
                <div className="relative border-2 border-dashed border-slate-700 hover:border-amber-500/50 rounded-xl p-5 text-center cursor-pointer bg-slate-950 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.dwg,.doc,.docx,.xls,.xlsx,.zip"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload className="w-8 h-8 text-amber-400 mx-auto mb-1" />
                  <span className="text-xs text-slate-200 block font-bold">
                    {formData.fileName || 'Click or drag BOQ / CAD drawing / PDF specification document here'}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">
                    Accepted formats: PDF, DWG, DOCX, XLSX, ZIP (Max 25MB)
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">Detailed Scope & Requirements</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detail your technical parameters, structural steel grades (e.g. IS 2062 E250/E350), pipe schedules (Sch 40/80), HT panel KV ratings, or target completion schedule..."
                  className="w-full bg-slate-950 border border-slate-700 rounded p-3 text-xs text-white placeholder-slate-500 focus:border-amber-500 focus:outline-none resize-none"
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
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-sm py-4 rounded shadow-2xl flex items-center justify-center gap-2 uppercase tracking-wider transition-all transform hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Processing Quotation Request...' : 'Submit Request'}</span>
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};
