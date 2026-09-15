import React, { useEffect, useState, useMemo } from 'react';
import {
  Search,
  Download,
  Trash2,
  Eye,
  RefreshCw,
  Calendar,
  Mail,
  Phone,
  Building2,
  Briefcase,
  FileText,
  ShieldCheck,
  AlertTriangle,
  ArrowUpDown,
  Lock,
  FileSpreadsheet,
  CheckCircle2,
  ChevronLeft,
  X
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { SubmissionRecord } from '../components/admin/AdminDashboardModal';
import { WorkedWithCompaniesManager } from '../components/admin/WorkedWithCompaniesManager';

interface AdminDashboardPageProps {
  onNavigate?: (path: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  const { isAdmin, openAuthModal, username, authFetch, token } = useAdminAuth();
  const [adminActiveTab, setAdminActiveTab] = useState<'companies' | 'submissions'>('companies');

  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Search, Filters & Sorting state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'contact' | 'quote' | 'career'>('all');
  const [dateFilter, setDateFilter] = useState<'all' | 'today' | '7days' | '30days'>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Detail Modal State
  const [selectedSubmission, setSelectedSubmission] = useState<SubmissionRecord | null>(null);

  // Delete Confirmation State
  const [submissionToDelete, setSubmissionToDelete] = useState<SubmissionRecord | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);

  const fetchSubmissions = async (silent = false) => {
    if (!isAdmin) return;
    if (!silent) {
      setLoading(true);
      setError(null);
    }
    try {
      const params = new URLSearchParams();
      if (typeFilter !== 'all') params.append('type', typeFilter);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());
      params.append('sort', sortOrder);

      const now = new Date();
      if (dateFilter === 'today') {
        params.append('startDate', now.toISOString().slice(0, 10));
      } else if (dateFilter === '7days') {
        const last7 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        params.append('startDate', last7.toISOString());
      } else if (dateFilter === '30days') {
        const last30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        params.append('startDate', last30.toISOString());
      }

      const res = await authFetch(`/api/enquiries?${params.toString()}`);

      if (res.status === 401 || res.status === 403) {
        if (!silent) {
          setError('Authentication session expired or invalid. Please sign in as Admin.');
        }
        return;
      }

      if (res.status >= 500) {
        if (!silent) {
          setError('Server storage error (HTTP 500). Please try again.');
        }
        return;
      }

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      if (data && Array.isArray(data.records)) {
        setSubmissions(data.records);
        setLastUpdated(new Date());
        setError(null);
      } else {
        setSubmissions([]);
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      if (!silent) {
        setError('Unable to connect to server API.');
      }
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchSubmissions(false);

      const intervalId = setInterval(() => {
        if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
          fetchSubmissions(true);
        }
      }, 30000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isAdmin, typeFilter, dateFilter, sortOrder]);

  const handleExportCSV = async () => {
    if (!isAdmin) return;
    try {
      const params = new URLSearchParams();
      if (typeFilter !== 'all') params.append('type', typeFilter);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());
      params.append('sort', sortOrder);

      const res = await authFetch(`/api/enquiries/export/csv?${params.toString()}`);
      if (res.status === 401 || res.status === 403) {
        alert('Authentication required to export CSV.');
        return;
      }
      if (!res.ok) throw new Error('Export failed');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sr_group_submissions_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Export CSV error:', err);
      alert('Failed to download CSV export.');
    }
  };

  const handleDeleteSubmission = async () => {
    if (!submissionToDelete || !isAdmin) return;
    setIsDeleting(true);
    try {
      const res = await authFetch(`/api/enquiries/${encodeURIComponent(submissionToDelete.id)}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setSubmissions((prev) => prev.filter((item) => item.id !== submissionToDelete.id));
        setDeleteSuccess(`Submission ${submissionToDelete.id} deleted successfully.`);
        setTimeout(() => setDeleteSuccess(null), 3000);
        setSubmissionToDelete(null);
        if (selectedSubmission?.id === submissionToDelete.id) {
          setSelectedSubmission(null);
        }
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || 'Failed to delete submission.');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Network error while deleting submission.');
    } finally {
      setIsDeleting(false);
    }
  };

  const metrics = useMemo(() => {
    const total = submissions.length;
    const contacts = submissions.filter((s) => s.type === 'contact').length;
    const quotes = submissions.filter((s) => s.type === 'quote').length;
    const careers = submissions.filter((s) => s.type === 'career').length;
    return { total, contacts, quotes, careers };
  }, [submissions]);

  const filteredSubmissions = useMemo(() => {
    if (!searchQuery.trim()) return submissions;
    const q = searchQuery.toLowerCase().trim();
    return submissions.filter((s) => {
      return (
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.phone.toLowerCase().includes(q) ||
        (s.companyName && s.companyName.toLowerCase().includes(q)) ||
        (s.serviceRequired && s.serviceRequired.toLowerCase().includes(q)) ||
        (s.message && s.message.toLowerCase().includes(q)) ||
        s.id.toLowerCase().includes(q)
      );
    });
  }, [submissions, searchQuery]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          {onNavigate && (
            <button
              onClick={() => onNavigate('/')}
              className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg border border-slate-700 transition-colors"
              title="Return to Home"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black font-mono uppercase text-white tracking-wide">
                ADMIN SUBMISSIONS DASHBOARD
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
                JWT Protected
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              SR GROUP Website Inquiries, RFQs & Candidate Database
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 font-mono">
                Admin: <strong className="text-amber-400">{username}</strong>
              </span>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal()}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black px-4 py-2 rounded-lg uppercase tracking-wider font-mono flex items-center gap-1.5 transition-colors"
            >
              <Lock className="w-4 h-4" />
              <span>Admin Sign In</span>
            </button>
          )}
        </div>
      </div>

      {!isAdmin ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-xl font-black uppercase text-white font-mono">
              ACCESS RESTRICTED
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              This dashboard is strictly reserved for authorized SR GROUP administration. You must log in with valid credentials to view form submissions.
            </p>
          </div>
          <button
            onClick={() => openAuthModal()}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs px-6 py-3 rounded-xl uppercase tracking-wider shadow-lg inline-flex items-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>Sign In to Access Dashboard</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Main Module Tabs */}
          <div className="flex flex-wrap items-center gap-3 border-b border-slate-800 pb-4">
            <button
              onClick={() => setAdminActiveTab('companies')}
              className={`px-5 py-3 rounded-xl font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-md ${
                adminActiveTab === 'companies'
                  ? 'bg-amber-500 text-slate-950 shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>WORKED WITH COMPANIES (CLIENTS CMS)</span>
            </button>

            <button
              onClick={() => setAdminActiveTab('submissions')}
              className={`px-5 py-3 rounded-xl font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-md ${
                adminActiveTab === 'submissions'
                  ? 'bg-amber-500 text-slate-950 shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>SUBMISSIONS & ENQUIRIES ({submissions.length})</span>
            </button>
          </div>

          {adminActiveTab === 'companies' ? (
            <WorkedWithCompaniesManager adminToken={token} />
          ) : (
            <div className="space-y-6">
              {/* Top Metrics Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Total Submissions</span>
                <FileText className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-3xl font-black font-mono text-white">{metrics.total}</p>
              <p className="text-[10px] text-slate-500">Contact, Quote & Career forms</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Contact Enquiries</span>
                <Mail className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-3xl font-black font-mono text-blue-400">{metrics.contacts}</p>
              <p className="text-[10px] text-slate-500">General & project inquiries</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Quote Requests</span>
                <Building2 className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-3xl font-black font-mono text-amber-400">{metrics.quotes}</p>
              <p className="text-[10px] text-slate-500">Commercial RFQ packages</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1 shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Career Applications</span>
                <Briefcase className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-3xl font-black font-mono text-purple-400">{metrics.careers}</p>
              <p className="text-[10px] text-slate-500">Job applications & resumes</p>
            </div>
          </div>

          {/* Success / Error Alerts */}
          {deleteSuccess && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl flex items-center gap-3 text-xs text-emerald-400 font-mono">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{deleteSuccess}</span>
            </div>
          )}

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/30 p-4 rounded-xl flex items-center gap-3 text-xs text-rose-400 font-mono">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Controls Bar: Search, Filters & Export */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-lg">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, email, phone, company, service or message..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 pl-10 font-mono"
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-3 text-slate-500 hover:text-white text-xs font-mono"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-[10px] text-slate-400 font-mono flex items-center justify-end gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Auto-sync (30s)
                  </span>
                  <span className="text-[9px] text-slate-500 font-mono">
                    Updated: {lastUpdated.toLocaleTimeString()}
                  </span>
                </div>

                <button
                  onClick={() => fetchSubmissions(false)}
                  disabled={loading}
                  className="flex items-center gap-1.5 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-colors disabled:opacity-50"
                  title="Refresh List"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider font-mono shadow-md"
                  title="Export records to CSV"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Filter Tabs & Selectors */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/80 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-bold uppercase text-slate-400 font-mono mr-1">Type:</span>
                {(['all', 'contact', 'quote', 'career'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`px-3.5 py-1.5 rounded-lg text-[11px] font-mono uppercase font-bold transition-colors ${
                      typeFilter === t
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {t === 'all' ? 'All Forms' : t}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-[11px] font-bold uppercase text-slate-400 font-mono">Date:</span>
                  <select
                    value={dateFilter}
                    onChange={(e: any) => setDateFilter(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="7days">Last 7 Days</option>
                    <option value="30days">Last 30 Days</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-[11px] font-bold uppercase text-slate-400 font-mono">Sort:</span>
                  <select
                    value={sortOrder}
                    onChange={(e: any) => setSortOrder(e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Table List */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            {loading ? (
              <div className="py-20 text-center text-slate-400 space-y-3 font-mono">
                <RefreshCw className="w-8 h-8 animate-spin text-amber-400 mx-auto" />
                <p className="text-xs uppercase tracking-wider">Loading secured submissions...</p>
              </div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="py-20 text-center text-slate-400 space-y-2 font-mono">
                <FileText className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-base font-bold text-slate-300">No submissions found.</p>
                <p className="text-xs text-slate-500">
                  {searchQuery ? 'Try adjusting your search query or filters.' : 'No form submissions have been received yet.'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase font-mono text-[10px] tracking-wider">
                      <th className="py-4 px-5">Date / ID</th>
                      <th className="py-4 px-5">Type</th>
                      <th className="py-4 px-5">Name & Company</th>
                      <th className="py-4 px-5">Contact</th>
                      <th className="py-4 px-5">Service / Requirement</th>
                      <th className="py-4 px-5">Message Preview</th>
                      <th className="py-4 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {filteredSubmissions.map((record) => {
                      const dateObj = new Date(record.timestamp);
                      const formattedDate = !isNaN(dateObj.getTime())
                        ? dateObj.toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : record.timestamp;

                      const typeColors = {
                        contact: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                        quote: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
                        career: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
                      };

                      return (
                        <tr key={record.id} className="hover:bg-slate-800/50 transition-colors">
                          <td className="py-4 px-5 space-y-0.5 whitespace-nowrap">
                            <div className="text-slate-300 font-bold">{formattedDate}</div>
                            <div className="text-[10px] text-slate-500 font-mono">{record.id}</div>
                          </td>

                          <td className="py-4 px-5 whitespace-nowrap">
                            <span
                              className={`inline-block px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider border ${
                                typeColors[record.type] || 'bg-slate-800 text-slate-300'
                              }`}
                            >
                              {record.type}
                            </span>
                          </td>

                          <td className="py-4 px-5 space-y-0.5 max-w-[200px]">
                            <div className="text-white font-bold truncate">{record.name}</div>
                            <div className="text-[11px] text-slate-400 truncate flex items-center gap-1">
                              {record.companyName ? (
                                <>
                                  <Building2 className="w-3 h-3 text-slate-500 shrink-0" />
                                  <span>{record.companyName}</span>
                                </>
                              ) : (
                                <span className="text-slate-500">{record.companyContext}</span>
                              )}
                            </div>
                          </td>

                          <td className="py-4 px-5 space-y-0.5 whitespace-nowrap">
                            <div className="text-slate-300 flex items-center gap-1">
                              <Mail className="w-3 h-3 text-amber-400 shrink-0" />
                              <a href={`mailto:${record.email}`} className="hover:text-amber-400 hover:underline">
                                {record.email}
                              </a>
                            </div>
                            <div className="text-slate-400 flex items-center gap-1 text-[11px]">
                              <Phone className="w-3 h-3 text-amber-400 shrink-0" />
                              <a href={`tel:${record.phone}`} className="hover:text-amber-400 hover:underline">
                                {record.phone}
                              </a>
                            </div>
                          </td>

                          <td className="py-4 px-5 max-w-[220px]">
                            <div className="text-slate-300 font-semibold truncate">
                              {record.serviceRequired || record.industry || 'General Inquiry'}
                            </div>
                            {record.estimatedSize && (
                              <div className="text-[10px] text-slate-500 truncate">
                                Est: {record.estimatedSize}
                              </div>
                            )}
                          </td>

                          <td className="py-4 px-5 max-w-[240px]">
                            <p className="text-slate-400 text-xs truncate font-sans">
                              {record.message}
                            </p>
                            {record.filename && (
                              <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 font-mono mt-0.5">
                                <FileText className="w-3 h-3" />
                                <span>{record.filename}</span>
                              </span>
                            )}
                          </td>

                          <td className="py-4 px-5 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedSubmission(record)}
                                className="p-2 bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors"
                                title="View Full Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setSubmissionToDelete(record)}
                                className="p-2 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white rounded-lg border border-rose-500/20 transition-colors"
                                title="Delete Submission"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
            </div>
          )}
        </div>
      )}

      {/* Detail Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-5 text-left relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black font-mono uppercase text-white">
                    {selectedSubmission.type.toUpperCase()} SUBMISSION DETAILS
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    ID: {selectedSubmission.id} • {new Date(selectedSubmission.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase text-slate-500 font-bold block">Contact Person</span>
                <span className="text-white font-bold text-sm block">{selectedSubmission.name}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase text-slate-500 font-bold block">Company / Organization</span>
                <span className="text-slate-300 font-bold block">
                  {selectedSubmission.companyName || selectedSubmission.companyContext || 'N/A'}
                </span>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase text-slate-500 font-bold block">Email Address</span>
                <a href={`mailto:${selectedSubmission.email}`} className="text-amber-400 hover:underline block break-all font-bold">
                  {selectedSubmission.email}
                </a>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase text-slate-500 font-bold block">Phone Number</span>
                <a href={`tel:${selectedSubmission.phone}`} className="text-amber-400 hover:underline block font-bold">
                  {selectedSubmission.phone}
                </a>
              </div>

              {selectedSubmission.serviceRequired && (
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">
                    {selectedSubmission.type === 'career' ? 'Position Applied' : 'Service Required'}
                  </span>
                  <span className="text-slate-200 block">{selectedSubmission.serviceRequired}</span>
                </div>
              )}

              {selectedSubmission.industry && (
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">Industry Sector</span>
                  <span className="text-slate-200 block">{selectedSubmission.industry}</span>
                </div>
              )}

              {selectedSubmission.projectLocation && (
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">Project Site Location</span>
                  <span className="text-slate-200 block">{selectedSubmission.projectLocation}</span>
                </div>
              )}

              {selectedSubmission.estimatedSize && (
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1">
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">
                    {selectedSubmission.type === 'career' ? 'Experience Level' : 'Estimated Scope / Size'}
                  </span>
                  <span className="text-slate-200 block">{selectedSubmission.estimatedSize}</span>
                </div>
              )}

              {selectedSubmission.filename && (
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-1 sm:col-span-2">
                  <span className="text-[10px] uppercase text-slate-500 font-bold block">Attached Document / Resume</span>
                  <span className="text-amber-400 flex items-center gap-1.5 font-bold">
                    <FileText className="w-4 h-4" />
                    <span>{selectedSubmission.filename}</span>
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                Complete Message / Application Statement
              </label>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans">
                {selectedSubmission.message}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                onClick={() => setSubmissionToDelete(selectedSubmission)}
                className="flex items-center gap-1.5 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white px-4 py-2 rounded-lg text-xs font-bold font-mono transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Submission</span>
              </button>

              <button
                onClick={() => setSelectedSubmission(null)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-2 rounded-lg text-xs font-bold font-mono uppercase tracking-wider transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {submissionToDelete && (
        <div className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-rose-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h4 className="text-lg font-black uppercase text-white font-mono">
                Confirm Permanent Deletion
              </h4>
              <p className="text-xs text-slate-400">
                Are you sure you want to permanently delete submission <strong className="text-white font-mono">{submissionToDelete.id}</strong> from <strong className="text-amber-400">{submissionToDelete.name}</strong>?
              </p>
              <p className="text-[11px] text-rose-400 pt-1">
                This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setSubmissionToDelete(null)}
                disabled={isDeleting}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded-lg text-xs font-bold uppercase font-mono transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteSubmission}
                disabled={isDeleting}
                className="flex-1 bg-rose-600 hover:bg-rose-500 text-white py-2.5 rounded-lg text-xs font-black uppercase font-mono tracking-wider transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {isDeleting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                <span>{isDeleting ? 'Deleting...' : 'Delete Record'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
