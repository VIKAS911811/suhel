import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

export interface CaptchaResponse {
  token: string;
  question: string;
}

interface CaptchaWidgetProps {
  onVerify: (token: string, answer: string) => void;
  onRefresh?: () => void;
  hasError?: boolean;
}

export const CaptchaWidget: React.FC<CaptchaWidgetProps> = ({ onVerify, onRefresh, hasError }) => {
  const [captchaData, setCaptchaData] = useState<CaptchaResponse | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchCaptcha = async () => {
    setLoading(true);
    setFetchError(null);
    setUserAnswer('');
    try {
      const res = await fetch('/api/captcha', {
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const data: CaptchaResponse = await res.json();
        setCaptchaData(data);
      } else {
        setFetchError('Failed to load verification challenge');
      }
    } catch {
      setFetchError('Verification service currently unreachable');
    } finally {
      setLoading(false);
      if (onRefresh) onRefresh();
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUserAnswer(val);
    if (captchaData) {
      onVerify(captchaData.token, val);
    }
  };

  return (
    <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl space-y-2 text-left">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Security Verification</span>
        </span>
        <button
          type="button"
          onClick={fetchCaptcha}
          disabled={loading}
          className="text-[11px] text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors disabled:opacity-50"
          title="Refresh Challenge"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          <span>New Question</span>
        </button>
      </div>

      {fetchError ? (
        <div className="text-xs text-rose-400 flex items-center gap-1.5 py-1">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{fetchError}</span>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="bg-slate-900 border border-slate-700/80 px-3.5 py-2 rounded-lg text-xs font-mono font-bold text-slate-200 flex-1 flex items-center justify-between select-none">
            <span>{loading ? 'Generating challenge...' : captchaData?.question || 'Solve challenge'}</span>
            {!loading && <span className="text-[10px] text-amber-500 font-sans uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">Anti-Bot</span>}
          </div>

          <div className="sm:w-36">
            <input
              type="text"
              value={userAnswer}
              onChange={handleInputChange}
              placeholder="Your answer"
              required
              className={`w-full bg-slate-900 border ${
                hasError ? 'border-rose-500 focus:border-rose-400' : 'border-slate-700 focus:border-amber-400'
              } text-white px-3 py-2 rounded-lg text-xs font-mono focus:outline-none transition-colors`}
            />
          </div>
        </div>
      )}
      <p className="text-[10px] text-slate-500">
        Please solve this simple industrial arithmetic challenge to prevent automated bot submissions.
      </p>
    </div>
  );
};
