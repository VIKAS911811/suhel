import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, User, Check, RefreshCw, AlertCircle, Award, Sparkles, Building2, Phone, Mail, FileText, Image as ImageIcon, UserCheck } from 'lucide-react';
import { useCmd } from '../../context/CmdContext';
import cmdPhotoAsset from '../../assets/images/cmd_rk_ansari.jpg';

export const CmdUploadModal: React.FC = () => {
  const {
    cmdData,
    mdData,
    activeRole,
    setActiveRole,
    isModalOpen,
    closeCmdModal,
    updateCmdProfile,
    uploadCmdPhoto,
    resetToDefaultCmd,
  } = useCmd();

  const [activeTab, setActiveTab] = useState<'photo' | 'details'>('photo');

  const currentLeader = activeRole === 'md' ? mdData : cmdData;

  const [formData, setFormData] = useState({
    name: currentLeader.name,
    title: currentLeader.title,
    companyName: currentLeader.companyName,
    message: currentLeader.message,
    bio: currentLeader.bio,
    experience: currentLeader.experience,
    qualification: currentLeader.qualification,
    achievementsText: currentLeader.achievements.join('\n'),
    email: currentLeader.email,
    phone: currentLeader.phone,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync formData whenever activeRole, modal state, or leader data changes
  useEffect(() => {
    const leader = activeRole === 'md' ? mdData : cmdData;
    setFormData({
      name: leader.name,
      title: leader.title,
      companyName: leader.companyName,
      message: leader.message,
      bio: leader.bio,
      experience: leader.experience,
      qualification: leader.qualification,
      achievementsText: leader.achievements.join('\n'),
      email: leader.email,
      phone: leader.phone,
    });
  }, [activeRole, cmdData, mdData, isModalOpen]);

  if (!isModalOpen) return null;

  const handleFileSelect = async (file: File) => {
    setIsUploading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await uploadCmdPhoto(file, activeRole);
      setSuccessMessage(`${activeRole.toUpperCase()} Photo uploaded successfully!`);
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setErrorMessage(err?.message || `Failed to process ${activeRole.toUpperCase()} photo.`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSaveDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const achievementsList = formData.achievementsText
        .split('\n')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      await updateCmdProfile(
        {
          name: formData.name,
          title: formData.title,
          companyName: formData.companyName,
          message: formData.message,
          bio: formData.bio,
          experience: formData.experience,
          qualification: formData.qualification,
          achievements: achievementsList,
          email: formData.email,
          phone: formData.phone,
        },
        activeRole
      );

      setSuccessMessage(`${activeRole.toUpperCase()} details updated successfully!`);
      setTimeout(() => {
        setSuccessMessage(null);
        closeCmdModal();
      }, 1500);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to update details.');
    }
  };

  const handleReset = async () => {
    if (window.confirm(`Are you sure you want to reset ${activeRole.toUpperCase()} photo & details to default?`)) {
      await resetToDefaultCmd(activeRole);
      setSuccessMessage(`${activeRole.toUpperCase()} Profile reset to defaults.`);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <UserCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold text-white font-mono uppercase tracking-wide">
                Leadership Photo & Profile Manager
              </h3>
              <p className="text-xs text-slate-400">
                Upload photos and manage executive profiles for CMD & MD of SR GROUP
              </p>
            </div>
          </div>
          <button
            onClick={closeCmdModal}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Executive Role Switcher (CMD vs MD) */}
        <div className="bg-slate-950 border-b border-slate-800 px-6 py-3 flex items-center justify-between flex-wrap gap-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Leader Profile:</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveRole('cmd')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all shadow-md ${
                activeRole === 'cmd'
                  ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <User className="w-4 h-4" />
              <span>1. CMD (R. K. ANSARI)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveRole('md')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all shadow-md ${
                activeRole === 'md'
                  ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <User className="w-4 h-4" />
              <span>2. MD (SUHEL ANSARI)</span>
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-800 bg-slate-900/50 px-6 pt-2">
          <button
            onClick={() => setActiveTab('photo')}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'photo'
                ? 'border-amber-500 text-amber-400 bg-amber-500/10 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Upload {activeRole.toUpperCase()} Photo</span>
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'details'
                ? 'border-amber-500 text-amber-400 bg-amber-500/10 rounded-t-lg'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Edit {activeRole.toUpperCase()} Details</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Notifications */}
          {errorMessage && (
            <div className="flex items-center gap-3 p-3.5 rounded-lg bg-red-950/80 border border-red-500/40 text-red-200 text-xs">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <p className="flex-1 text-left">{errorMessage}</p>
            </div>
          )}

          {successMessage && (
            <div className="flex items-center gap-3 p-3.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <p className="flex-1 text-left">{successMessage}</p>
            </div>
          )}

          {/* TAB 1: PHOTO UPLOAD */}
          {activeTab === 'photo' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Photo Upload Dropzone */}
              <div className="md:col-span-7 space-y-4 text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Select {activeRole.toUpperCase()} Official Photo
                </p>

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 ${
                    isDragging
                      ? 'border-amber-400 bg-amber-500/10 scale-[1.01]'
                      : 'border-slate-700 bg-slate-950/60 hover:border-amber-500/60 hover:bg-slate-950/90'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileSelect(e.target.files[0]);
                      }
                    }}
                  />

                  <div className="p-4 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-lg">
                    <Upload className="w-8 h-8" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white mb-1">
                      Click or Drag & Drop {activeRole.toUpperCase()} Photo Here
                    </p>
                    <p className="text-xs text-slate-400">
                      Supports high-resolution JPG, PNG, or WEBP (Up to 10 MB)
                    </p>
                  </div>

                  <span className="inline-block mt-2 px-4 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-slate-950 uppercase tracking-wider hover:bg-amber-400 transition-colors">
                    Choose Photo File
                  </span>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <p className="font-semibold text-slate-300">💡 Tip for Best Quality:</p>
                  <p>• High-resolution portrait or executive office photo (min 600×600 px).</p>
                  <p>• Bright clear lighting with a professional background.</p>
                </div>
              </div>

              {/* Photo Live Preview */}
              <div className="md:col-span-5 text-center space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Current {activeRole.toUpperCase()} Photo Preview
                </p>

                <div className="relative mx-auto w-48 h-56 rounded-2xl overflow-hidden border-2 border-amber-500/50 shadow-2xl bg-slate-950">
                  <img
                    src={
                      activeRole === 'cmd'
                        ? (currentLeader.photoDataUrl && currentLeader.photoDataUrl.startsWith('data:image/')
                            ? currentLeader.photoDataUrl
                            : cmdPhotoAsset)
                        : (currentLeader.photoDataUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80')
                    }
                    alt={currentLeader.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      if (activeRole === 'cmd') {
                        e.currentTarget.src = cmdPhotoAsset;
                      }
                    }}
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-amber-500/30 rounded-2xl pointer-events-none" />
                </div>

                <p className="text-xs font-bold text-white font-mono">{currentLeader.name}</p>
                <p className="text-[11px] text-amber-400">{currentLeader.title}</p>
              </div>

            </div>
          )}

          {/* TAB 2: DETAILS EDIT FORM */}
          {activeTab === 'details' && (
            <form onSubmit={handleSaveDetails} className="space-y-5 text-left">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span>{activeRole.toUpperCase()} Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. R. K. ANSARI"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500 font-semibold"
                  />
                </div>

                {/* Designation / Title */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    <span>Title / Designation</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. CHAIRMAN & MANAGING DIRECTOR (CMD)"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500 font-semibold"
                  />
                </div>

                {/* Company Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Group Name</span>
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Experience Badge */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Experience Highlight</span>
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g. 30+ YEARS OF LEGACY • EXPERIENCE • LEADERSHIP"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

              </div>

              {/* Qualification */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Qualifications & Background
                </label>
                <input
                  type="text"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  placeholder="e.g. Visionary Leader & Heavy Industrial Engineering Expert"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Vision Message / Quote */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Leadership Vision Message / Quote
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Enter Vision Statement..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500 leading-relaxed font-serif"
                />
              </div>

              {/* Detailed Biography */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Detailed Biography & Background
                </label>
                <textarea
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Enter biography details..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500 leading-relaxed"
                />
              </div>

              {/* Key Achievements (One per line) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Key Milestones & Strengths (One per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.achievementsText}
                  onChange={(e) => setFormData({ ...formData, achievementsText: e.target.value })}
                  placeholder="Enter achievements separated by new lines..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500 leading-relaxed font-mono"
                />
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>Email</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Phone / Office Line</span>
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-lg"
                >
                  Save {activeRole.toUpperCase()} Details
                </button>
              </div>
            </form>
          )}

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-800 bg-slate-950 text-xs">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-slate-400 hover:text-red-400 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset {activeRole.toUpperCase()} to Default</span>
          </button>
          
          <button
            onClick={closeCmdModal}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
