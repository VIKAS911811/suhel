import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  X,
  Trash2,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  Check,
  Maximize2,
  Sparkles,
  Info,
} from 'lucide-react';
import { useLogos } from '../../context/LogoContext';

interface CompanyOption {
  id: string;
  name: string;
  tagline: string;
  badgeColor: string;
}

const COMPANIES: CompanyOption[] = [
  {
    id: 'sr-group',
    name: 'SR GROUP',
    tagline: 'Parent Group & Engineering',
    badgeColor: 'bg-blue-600 text-white',
  },
  {
    id: 'suhel-engineering',
    name: 'SUHEL ENGINEERING',
    tagline: 'Process Plant & Piping',
    badgeColor: 'bg-sky-500 text-white',
  },
  {
    id: 'sr-infra',
    name: 'NEW SR INFRA',
    tagline: 'Infrastructure & Structural',
    badgeColor: 'bg-indigo-600 text-white',
  },
  {
    id: 'sr-power-solution',
    name: 'SR POWER SOLUTION',
    tagline: 'Electrical & Power Systems',
    badgeColor: 'bg-emerald-600 text-white',
  },
];

export const LogoUploadModal: React.FC = () => {
  const {
    isLogoModalOpen,
    activeModalCompany,
    closeLogoModal,
    getCustomLogo,
    uploadLogo,
    removeLogo,
    updateBgStyle,
  } = useLogos();

  const [selectedCompany, setSelectedCompany] = useState<string>(activeModalCompany);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setSelectedCompany(activeModalCompany);
    setErrorMsg(null);
    setSuccessMsg(null);
  }, [activeModalCompany, isLogoModalOpen]);

  if (!isLogoModalOpen) return null;

  const currentLogo = getCustomLogo(selectedCompany);
  const companyInfo = COMPANIES.find((c) => c.id === selectedCompany) || COMPANIES[0];

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];

    setErrorMsg(null);
    setSuccessMsg(null);
    setIsUploading(true);

    try {
      const uploaded = await uploadLogo(selectedCompany, file);
      setSuccessMsg(
        `High-quality logo uploaded successfully! (${uploaded.width}×${uploaded.height} px, ${(uploaded.fileSize / (1024 * 1024)).toFixed(2)} MB)`
      );
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to upload logo.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleRemoveLogo = async () => {
    try {
      await removeLogo(selectedCompany);
      setSuccessMsg('Reset to official vector logo.');
      setErrorMsg(null);
    } catch (err) {
      setErrorMsg('Failed to remove custom logo.');
    }
  };

  const handleBgStyleChange = async (style: 'transparent' | 'white' | 'dark' | 'auto') => {
    try {
      await updateBgStyle(selectedCompany, style);
    } catch (err) {
      // ignore
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const getAspectRatioLabel = (ratio: number): string => {
    if (Math.abs(ratio - 1) < 0.15) return '1:1 Square';
    if (ratio > 1.2) return `${ratio.toFixed(2)}:1 Landscape`;
    if (ratio < 0.8) return `1:${(1 / ratio).toFixed(2)} Portrait`;
    return `${ratio.toFixed(2)}:1 Custom`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-950/90 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Logo Upload & Manager
                <span className="text-[10px] font-semibold tracking-wider uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full">
                  Up to 10 MB
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Preserves 100% original aspect ratio, image quality, and resolution without distortion.
              </p>
            </div>
          </div>
          <button
            onClick={closeLogoModal}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Company Selector Tabs */}
        <div className="bg-slate-950/50 border-b border-slate-800 p-2 sm:p-3 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {COMPANIES.map((company) => {
              const isSelected = company.id === selectedCompany;
              const hasCustom = !!getCustomLogo(company.id);

              return (
                <button
                  key={company.id}
                  onClick={() => {
                    setSelectedCompany(company.id);
                    setErrorMsg(null);
                    setSuccessMsg(null);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 ring-1 ring-blue-400/50'
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span>{company.name}</span>
                  {hasCustom && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="Custom Logo Active" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 text-slate-200">
          {/* Status Alerts */}
          {errorMsg && (
            <div className="flex items-start gap-3 p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs animate-shake">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-start gap-3 p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Active Company Info */}
          <div className="flex items-center justify-between p-3.5 bg-slate-800/40 border border-slate-700/60 rounded-xl">
            <div>
              <div className="text-xs text-slate-400 font-medium">Selected Profile</div>
              <div className="text-sm font-extrabold text-white">{companyInfo.name}</div>
              <div className="text-[11px] text-slate-400">{companyInfo.tagline}</div>
            </div>
            <div className="text-right">
              <span className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-lg ${
                currentLogo ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-slate-700 text-slate-300'
              }`}>
                {currentLogo ? 'Custom Uploaded' : 'Default Official Logo'}
              </span>
            </div>
          </div>

          {/* Upload Drop Zone / High-Res Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Upload Area */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Upload New Logo</span>
                <span className="text-[11px] font-normal text-slate-400">JPG, PNG, WEBP</span>
              </div>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[220px] ${
                  isDragging
                    ? 'border-blue-500 bg-blue-500/10 scale-[1.01]'
                    : 'border-slate-700 hover:border-slate-500 bg-slate-950/40 hover:bg-slate-950/70'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/jpg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e.target.files)}
                />

                <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 mb-3 shadow-inner">
                  {isUploading ? (
                    <RefreshCw className="w-6 h-6 animate-spin text-blue-400" />
                  ) : (
                    <Upload className="w-6 h-6" />
                  )}
                </div>

                <div className="text-sm font-semibold text-white mb-1">
                  {isUploading ? 'Processing High-Res Image...' : 'Click or Drag & Drop Logo Here'}
                </div>
                <p className="text-xs text-slate-400 max-w-xs mb-3">
                  Upload portrait, square, or wide landscape logos up to <strong className="text-slate-200">10 MB</strong>.
                </p>

                <div className="flex flex-wrap justify-center gap-1.5 text-[10px] text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">PNG</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">JPG / JPEG</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">WEBP</span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700">Aspect Ratio Preserved</span>
                </div>
              </div>
            </div>

            {/* High Quality Live Preview Panel */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>Live Logo Preview</span>
                <span className="text-[11px] text-blue-400 font-mono">object-fit: contain</span>
              </div>

              <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 space-y-4 flex flex-col justify-between min-h-[220px]">
                {/* Preview Box with Strict object-fit: contain */}
                <div
                  className={`w-full h-40 rounded-xl flex items-center justify-center p-3 relative overflow-hidden transition-colors border ${
                    currentLogo?.bgStyle === 'white'
                      ? 'bg-white border-slate-300'
                      : currentLogo?.bgStyle === 'dark'
                      ? 'bg-slate-950 border-slate-800'
                      : 'bg-slate-900/90 border-slate-800'
                  }`}
                >
                  {currentLogo ? (
                    <img
                      src={currentLogo.dataUrl}
                      alt={`${companyInfo.name} Custom Logo`}
                      className="w-full h-full transition-all"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        objectPosition: 'center',
                      }}
                    />
                  ) : (
                    <div className="text-center text-slate-400 space-y-1">
                      <ImageIcon className="w-8 h-8 mx-auto text-slate-400 opacity-80" />
                      <div className="text-xs font-medium text-slate-400">Default Official Logo Active</div>
                      <div className="text-[10px] text-slate-400">Upload an image to override</div>
                    </div>
                  )}
                </div>

                {/* Metadata & Controls */}
                {currentLogo ? (
                  <div className="space-y-3 pt-2 border-t border-slate-800/80 text-xs">
                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                      <div>
                        <span className="text-slate-400 block">Dimensions:</span>
                        <strong className="text-white font-mono">{currentLogo.width} × {currentLogo.height} px</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Aspect Ratio:</span>
                        <strong className="text-white font-mono">{getAspectRatioLabel(currentLogo.aspectRatio)}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">File Size:</span>
                        <strong className="text-white font-mono">{formatFileSize(currentLogo.fileSize)}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Format:</span>
                        <strong className="text-white font-mono uppercase">{currentLogo.mimeType.replace('image/', '')}</strong>
                      </div>
                    </div>

                    {/* Container Background Options */}
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Background Card:</span>
                      <div className="flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleBgStyleChange('auto')}
                          className={`px-2 py-1 rounded text-[10px] font-semibold border transition-all ${
                            (!currentLogo.bgStyle || currentLogo.bgStyle === 'auto')
                              ? 'bg-blue-600 text-white border-blue-500'
                              : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                          }`}
                        >
                          Auto / Transparent
                        </button>
                        <button
                          type="button"
                          onClick={() => handleBgStyleChange('white')}
                          className={`px-2 py-1 rounded text-[10px] font-semibold border transition-all ${
                            currentLogo.bgStyle === 'white'
                              ? 'bg-white text-slate-900 border-white font-bold'
                              : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                          }`}
                        >
                          White Card
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-[11px] text-slate-400 flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <Info className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>Uploaded logos fit automatically using <code className="text-slate-200">object-fit: contain</code>.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Guarantees & Features */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="text-slate-300">No cropping, stretch, or blur</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="text-slate-300">Original aspect ratio kept</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span className="text-slate-300">100% Mobile & Desktop fit</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-5 py-4 bg-slate-950 border-t border-slate-800">
          <div>
            {currentLogo && (
              <button
                type="button"
                onClick={handleRemoveLogo}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Custom Logo & Reset</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 border border-slate-700 hover:bg-slate-700 hover:text-white transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentLogo ? 'Replace Logo' : 'Select File'}</span>
            </button>

            <button
              type="button"
              onClick={closeLogoModal}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/20 transition-all"
            >
              <span>Done</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
