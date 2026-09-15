import React, { useState } from 'react';
import { Lock, X, ShieldAlert, KeyRound, CheckCircle2, User, Eye, EyeOff, FileSpreadsheet, LayoutDashboard } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export const AdminAuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, isAdmin, logout, username, openAdminDashboard } = useAdminAuth();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.trim() || !pass) {
      setErrorMsg('Please enter both username and password.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const result = await login({ username: user.trim(), password: pass });
    setIsSubmitting(false);

    if (result.success) {
      setSuccessMsg('Authentication successful. Admin session active.');
      setUser('');
      setPass('');
    } else {
      setErrorMsg(result.error || 'Invalid credentials or account locked.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 text-left relative">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black font-mono uppercase text-white tracking-wide">
              ADMINISTRATIVE SECURITY
            </h3>
            <p className="text-xs text-slate-400">SR GROUP Corporate Management Console</p>
          </div>
        </div>

        {isAdmin ? (
          <div className="space-y-4 py-2">
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-emerald-400 uppercase">Authenticated Session Active</p>
                <p className="text-xs text-slate-300">Logged in as <strong className="text-white font-mono">{username}</strong></p>
              </div>
            </div>
            
            <p className="text-xs text-slate-400">
              You currently have full administrative authorization to view confidential website submissions, manage logos, and edit leadership credentials.
            </p>

            {/* Direct Dashboard Opener */}
            <div className="pt-1">
              <button
                onClick={() => {
                  closeAuthModal();
                  openAdminDashboard();
                }}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs py-3 rounded-xl uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-transform hover:scale-101"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Open Submissions Dashboard</span>
              </button>
            </div>

            <div className="flex gap-3 pt-1">
              <button
                onClick={closeAuthModal}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs py-2.5 rounded-lg uppercase tracking-wider transition-colors"
              >
                Continue Working
              </button>
              <button
                onClick={logout}
                className="bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white font-bold text-xs px-4 py-2.5 rounded-lg uppercase tracking-wider transition-colors border border-rose-500/20"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-slate-300">
              Management authorization is required to modify company brand assets and leadership credentials.
            </p>

            {errorMsg && (
              <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg flex items-center gap-2 text-xs text-rose-400">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-lg flex items-center gap-2 text-xs text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                Admin Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="admin"
                  required
                  autoFocus
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 pl-9 font-mono"
                />
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                Password / Secret Key
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 pl-9 pr-9 font-mono"
                />
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs py-3 rounded-lg uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <Lock className="w-4 h-4" />
                <span>{isSubmitting ? 'Verifying...' : 'Authorize Admin Session'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
