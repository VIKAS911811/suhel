import React, { useState, useEffect, useRef } from 'react';
import { WorkedWithCompany, CompanyCategory, CompanyProject } from '../../types';
import {
  Building2,
  Plus,
  Edit2,
  Trash2,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  ArrowUpDown,
  MoveUp,
  MoveDown,
  Eye,
  RefreshCw,
  Layers,
  Wrench,
  MapPin,
  Calendar,
  Zap,
  Factory,
  Check,
  X
} from 'lucide-react';

interface WorkedWithCompaniesManagerProps {
  adminToken?: string | null;
}

const CATEGORIES: CompanyCategory[] = [
  'All',
  'Power',
  'Steel',
  'Manufacturing',
  'Infrastructure',
  'Oil & Gas',
  'Chemical',
  'Refinery',
  'Engineering',
  'Construction',
  'Other'
];

export const WorkedWithCompaniesManager: React.FC<WorkedWithCompaniesManagerProps> = ({ adminToken }) => {
  const [companies, setCompanies] = useState<WorkedWithCompany[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<CompanyCategory>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [sortBy, setSortBy] = useState<'display_order' | 'name' | 'latest'>('display_order');

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingCompany, setEditingCompany] = useState<WorkedWithCompany | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form Fields
  const [formName, setFormName] = useState<string>('');
  const [formCategory, setFormCategory] = useState<CompanyCategory>('Power');
  const [formIndustry, setFormIndustry] = useState<string>('');
  const [formProjectName, setFormProjectName] = useState<string>('');
  const [formScopeOfWork, setFormScopeOfWork] = useState<string>('');
  const [formLocation, setFormLocation] = useState<string>('');
  const [formYear, setFormYear] = useState<string>('');
  const [formDescription, setFormDescription] = useState<string>('');
  const [formDisplayOrder, setFormDisplayOrder] = useState<number>(1);
  const [formStatus, setFormStatus] = useState<'active' | 'inactive'>('active');
  const [formLogoUrl, setFormLogoUrl] = useState<string>('');
  const [formProjects, setFormProjects] = useState<CompanyProject[]>([]);

  // Sub-project addition inputs
  const [newSubProjectName, setNewSubProjectName] = useState<string>('');
  const [newSubScope, setNewSubScope] = useState<string>('');
  const [newSubYear, setNewSubYear] = useState<string>('');
  const [newSubLocation, setNewSubLocation] = useState<string>('');
  const [showSubProjectForm, setShowSubProjectForm] = useState<boolean>(false);

  // Logo file upload
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getHeaders = () => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (adminToken) {
      headers['Authorization'] = `Bearer ${adminToken}`;
      headers['x-admin-token'] = adminToken;
    }
    return headers;
  };

  const fetchAdminCompanies = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (categoryFilter !== 'All') params.append('category', categoryFilter);
      if (statusFilter !== 'all') params.append('status', statusFilter);
      if (searchQuery.trim()) params.append('search', searchQuery.trim());
      params.append('sort', sortBy);

      const res = await fetch(`/api/admin/companies-worked-with?${params.toString()}`, {
        headers: getHeaders()
      });

      if (!res.ok) {
        throw new Error(`Failed to load: HTTP ${res.status}`);
      }

      const data = await res.json();
      if (data && Array.isArray(data.companies)) {
        setCompanies(data.companies);
      }
    } catch (err: any) {
      console.error('[SR GROUP ADMIN] Error fetching companies:', err);
      setFeedback({ type: 'error', message: err?.message || 'Failed to fetch companies from server.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminCompanies();
  }, [categoryFilter, statusFilter, sortBy]);

  // Handle Search Debounce or submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAdminCompanies();
  };

  // Open Create Modal
  const openCreateModal = () => {
    setEditingCompany(null);
    setFormName('');
    setFormCategory('Power');
    setFormIndustry('Power Generation & Energy');
    setFormProjectName('');
    setFormScopeOfWork('');
    setFormLocation('');
    setFormYear(new Date().getFullYear().toString());
    setFormDescription('');
    const maxOrder = companies.reduce((max, c) => Math.max(max, c.display_order || 0), 0);
    setFormDisplayOrder(maxOrder + 1);
    setFormStatus('active');
    setFormLogoUrl('');
    setLogoPreview('');
    setFormProjects([]);
    setUploadError(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (comp: WorkedWithCompany) => {
    setEditingCompany(comp);
    setFormName(comp.company_name);
    setFormCategory(comp.category || 'Other');
    setFormIndustry(comp.industry || '');
    setFormProjectName(comp.project_name || '');
    setFormScopeOfWork(comp.scope_of_work || '');
    setFormLocation(comp.location || '');
    setFormYear(comp.year || '');
    setFormDescription(comp.description || '');
    setFormDisplayOrder(comp.display_order || 1);
    setFormStatus(comp.status);
    setFormLogoUrl(comp.logo_url || '');
    setLogoPreview(comp.logo_url || '');
    setFormProjects(comp.projects ? [...comp.projects] : []);
    setUploadError(null);
    setIsModalOpen(true);
  };

  // Handle Logo Upload via file reader
  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setUploadError(null);
    if (!file) return;

    // Validate type
    const validMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validMimes.includes(file.type)) {
      setUploadError('Invalid format. Please upload JPG, PNG, or WEBP only.');
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File exceeds 5MB limit. Please upload a smaller image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setFormLogoUrl(result);
      setLogoPreview(result);
    };
    reader.onerror = () => {
      setUploadError('Failed to read file.');
    };
    reader.readAsDataURL(file);
  };

  // Remove Logo
  const handleRemoveLogo = () => {
    setFormLogoUrl('');
    setLogoPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Add Sub-project
  const handleAddSubProject = () => {
    if (!newSubProjectName.trim()) return;
    setFormProjects((prev) => [
      ...prev,
      {
        projectName: newSubProjectName.trim(),
        scopeOfWork: newSubScope.trim() || undefined,
        year: newSubYear.trim() || undefined,
        location: newSubLocation.trim() || undefined
      }
    ]);
    setNewSubProjectName('');
    setNewSubScope('');
    setNewSubYear('');
    setNewSubLocation('');
    setShowSubProjectForm(false);
  };

  // Remove Sub-project
  const handleRemoveSubProject = (index: number) => {
    setFormProjects((prev) => prev.filter((_, i) => i !== index));
  };

  // Save Company (POST or PUT)
  const handleSaveCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || formName.trim().length < 2) {
      setUploadError('Company name is required (min 2 characters).');
      return;
    }

    try {
      setActionLoading(true);
      setUploadError(null);

      const payload = {
        company_name: formName.trim(),
        industry: formIndustry.trim() || 'Industrial Engineering',
        category: formCategory,
        project_name: formProjectName.trim() || undefined,
        scope_of_work: formScopeOfWork.trim() || undefined,
        location: formLocation.trim() || undefined,
        year: formYear.trim() || undefined,
        description: formDescription.trim() || undefined,
        display_order: Number(formDisplayOrder) || 1,
        status: formStatus,
        logo_url: formLogoUrl || undefined,
        projects: formProjects.length > 0 ? formProjects : undefined
      };

      const url = editingCompany
        ? `/api/admin/companies-worked-with/${editingCompany.id}`
        : '/api/admin/companies-worked-with';
      const method = editingCompany ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: getHeaders(),
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Server error saving company record.');
      }

      setFeedback({
        type: 'success',
        message: editingCompany
          ? `Company '${formName}' updated successfully!`
          : `Company '${formName}' created and added to database!`
      });

      setIsModalOpen(false);
      fetchAdminCompanies();
    } catch (err: any) {
      console.error('[SR GROUP ADMIN] Error saving company:', err);
      setUploadError(err?.message || 'Failed to save company.');
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Company
  const handleDeleteCompany = async (id: string) => {
    try {
      setActionLoading(true);
      const res = await fetch(`/api/admin/companies-worked-with/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete company.');
      }

      setFeedback({ type: 'success', message: data.message || 'Company deleted.' });
      setDeleteConfirmId(null);
      fetchAdminCompanies();
    } catch (err: any) {
      console.error('[SR GROUP ADMIN] Delete error:', err);
      setFeedback({ type: 'error', message: err?.message || 'Failed to delete company.' });
    } finally {
      setActionLoading(false);
    }
  };

  // Fast Toggle Status (Active / Inactive)
  const handleToggleStatus = async (comp: WorkedWithCompany) => {
    try {
      const res = await fetch(`/api/admin/companies-worked-with/${comp.id}/toggle-status`, {
        method: 'PATCH',
        headers: getHeaders()
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to toggle status.');
      }

      setCompanies((prev) =>
        prev.map((c) => (c.id === comp.id ? { ...c, status: data.status } : c))
      );
      setFeedback({ type: 'success', message: `${comp.company_name} is now ${data.status.toUpperCase()}` });
    } catch (err: any) {
      console.error('[SR GROUP ADMIN] Toggle status error:', err);
      setFeedback({ type: 'error', message: err?.message || 'Failed to toggle status.' });
    }
  };

  // Reorder Item (Move Up or Down)
  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === companies.length - 1)
    ) {
      return;
    }

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const currentList = [...companies];
    const itemA = currentList[index];
    const itemB = currentList[targetIndex];

    // Swap display_orders
    const tempOrder = itemA.display_order;
    itemA.display_order = itemB.display_order;
    itemB.display_order = tempOrder;

    currentList[index] = itemB;
    currentList[targetIndex] = itemA;

    setCompanies(currentList);

    try {
      await fetch('/api/admin/companies-worked-with/reorder', {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({
          orders: [
            { id: itemA.id, display_order: itemA.display_order },
            { id: itemB.id, display_order: itemB.display_order }
          ]
        })
      });
    } catch (err: any) {
      console.error('[SR GROUP ADMIN] Reorder error:', err);
    }
  };

  return (
    <div className="space-y-6 text-left font-sans">
      {/* Top Banner / Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-black font-mono uppercase text-white tracking-wide">
              WORKED WITH COMPANIES (CLIENTS CMS)
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Manage partner & client companies displayed on the public website. Add, edit, reorder, or toggle visibility.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAdminCompanies}
            disabled={loading}
            className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
            title="Refresh database"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={openCreateModal}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-black uppercase tracking-wider flex items-center gap-2 shadow-lg transition-transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Company</span>
          </button>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs font-mono flex items-center justify-between gap-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-slate-400 hover:text-white text-sm"
          >
            ✕
          </button>
        </div>
      )}

      {/* Search & Filters Toolbar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative md:col-span-2">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by company name, project, or location..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-20 py-2 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            className="absolute right-2 top-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono rounded-lg"
          >
            Find
          </button>
        </form>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as CompanyCategory)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                Category: {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
          >
            <option value="all">Status: All (Active & Inactive)</option>
            <option value="active">Status: Active Only</option>
            <option value="inactive">Status: Inactive Only</option>
          </select>
        </div>
      </div>

      {/* Companies List / Table */}
      {loading ? (
        <div className="bg-slate-900 border border-slate-800 p-12 rounded-2xl text-center space-y-3">
          <RefreshCw className="w-6 h-6 text-amber-400 animate-spin mx-auto" />
          <p className="text-xs font-mono text-slate-400">Loading companies from database...</p>
        </div>
      ) : companies.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 p-12 rounded-2xl text-center space-y-4">
          <Building2 className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-black font-mono uppercase text-white">
            No Companies Found
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto font-mono">
            {searchQuery || categoryFilter !== 'All' || statusFilter !== 'all'
              ? 'No records match your filter criteria. Try adjusting your search query or filters.'
              : 'No companies have been added yet. Click the "Add Company" button above to add your first client record.'}
          </p>
          <button
            onClick={openCreateModal}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-mono font-black uppercase tracking-wider rounded-xl inline-flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Company</span>
          </button>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-[11px] text-slate-400 uppercase tracking-wider font-bold">
                  <th className="py-3.5 px-4 w-14 text-center">Order</th>
                  <th className="py-3.5 px-4 w-20 text-center">Logo</th>
                  <th className="py-3.5 px-4">Company & Industry</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Category</th>
                  <th className="py-3.5 px-4 hidden lg:table-cell">Key Project / Scope</th>
                  <th className="py-3.5 px-4 text-center w-28">Status</th>
                  <th className="py-3.5 px-4 text-right w-40">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {companies.map((comp, idx) => {
                  const isSample = comp.company_name.toUpperCase().includes('SAMPLE');
                  return (
                    <tr
                      key={comp.id}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Order & Move buttons */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex flex-col items-center justify-center gap-0.5">
                          <span className="font-black text-amber-400">
                            #{comp.display_order}
                          </span>
                          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleMoveOrder(idx, 'up')}
                              disabled={idx === 0}
                              className="p-1 hover:text-amber-300 text-slate-500 disabled:opacity-30"
                              title="Move up"
                            >
                              <MoveUp className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleMoveOrder(idx, 'down')}
                              disabled={idx === companies.length - 1}
                              className="p-1 hover:text-amber-300 text-slate-500 disabled:opacity-30"
                              title="Move down"
                            >
                              <MoveDown className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Logo Thumbnail */}
                      <td className="py-3 px-4 text-center">
                        <div className="w-12 h-10 rounded-lg bg-white p-1 border border-slate-700 flex items-center justify-center mx-auto overflow-hidden shadow-sm">
                          {comp.logo_url ? (
                            <img
                              src={comp.logo_url}
                              alt={comp.company_name}
                              referrerPolicy="no-referrer"
                              className="max-h-8 max-w-full object-contain"
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-900 text-amber-400 flex items-center justify-center font-black text-[10px] rounded">
                              {comp.company_name.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Name & Industry */}
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">
                              {comp.company_name}
                            </span>
                            {isSample && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">
                                SAMPLE
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400">{comp.industry}</p>
                          {comp.location && (
                            <p className="text-[10px] text-slate-500 flex items-center gap-1">
                              <MapPin className="w-2.5 h-2.5" />
                              <span>{comp.location}</span>
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4 hidden md:table-cell">
                        <span className="px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-bold">
                          {comp.category}
                        </span>
                      </td>

                      {/* Key Project / Scope */}
                      <td className="py-3 px-4 hidden lg:table-cell max-w-xs">
                        {comp.project_name ? (
                          <div className="space-y-0.5">
                            <p className="text-white font-semibold truncate">
                              {comp.project_name}
                            </p>
                            {comp.scope_of_work && (
                              <p className="text-slate-400 text-[11px] truncate">
                                {comp.scope_of_work}
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-600">—</span>
                        )}
                      </td>

                      {/* Status Toggle Switch */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleToggleStatus(comp)}
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border ${
                            comp.status === 'active'
                              ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25'
                              : 'bg-rose-500/15 text-rose-400 border-rose-500/30 hover:bg-rose-500/25'
                          }`}
                          title="Click to toggle status"
                        >
                          {comp.status === 'active' ? '● Active' : '○ Inactive'}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditModal(comp)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                            title="Edit Company"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => setDeleteConfirmId(comp.id)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 transition-colors"
                            title="Delete Company"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertCircle className="w-6 h-6" />
              <h3 className="text-base font-black font-mono uppercase text-white">
                Confirm Company Deletion
              </h3>
            </div>
            <p className="text-xs text-slate-300 font-mono leading-relaxed">
              Are you sure you want to delete this company from the database? This action will permanently remove it from both the Admin Console and the public website.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteCompany(deleteConfirmId)}
                disabled={actionLoading}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold uppercase rounded-xl flex items-center gap-1.5 shadow"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{actionLoading ? 'Deleting...' : 'Yes, Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto text-left">
            {/* Header */}
            <div className="p-5 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black font-mono uppercase text-white">
                    {editingCompany ? 'Edit Client Company' : 'Add New Client Company'}
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400">
                    Configure company details, logo, industry sector, and executed projects.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSaveCompany} className="flex-1 overflow-y-auto p-6 space-y-6">
              {uploadError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Grid 1: Basic Info */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                  1. Company Overview
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Company Name */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[11px] font-bold font-mono text-slate-300 uppercase">
                      Company Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. BHARAT HEAVY ELECTRICALS LTD"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold font-mono text-slate-300 uppercase">
                      Sector / Category <span className="text-rose-400">*</span>
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as CompanyCategory)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                    >
                      {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Industry Label */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold font-mono text-slate-300 uppercase">
                      Industry Sub-title
                    </label>
                    <input
                      type="text"
                      value={formIndustry}
                      onChange={(e) => setFormIndustry(e.target.value)}
                      placeholder="e.g. Power Generation & Energy"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Display Order */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold font-mono text-slate-300 uppercase">
                      Display Order (Sort Position)
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={formDisplayOrder}
                      onChange={(e) => setFormDisplayOrder(parseInt(e.target.value, 10) || 1)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Status Toggle */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold font-mono text-slate-300 uppercase">
                      Publication Status
                    </label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as 'active' | 'inactive')}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="active">Active (Visible to Website Visitors)</option>
                      <option value="inactive">Inactive (Hidden Draft)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Logo Upload */}
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>2. Company Logo (Upload or URL)</span>
                </h4>

                <div className="flex flex-col sm:flex-row items-start gap-4">
                  {/* Preview Box */}
                  <div className="w-32 h-24 rounded-xl bg-white border border-slate-700 p-2 flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Logo Preview"
                        className="max-h-16 max-w-full object-contain"
                      />
                    ) : (
                      <div className="text-center text-slate-400 space-y-1">
                        <Building2 className="w-6 h-6 mx-auto opacity-50" />
                        <span className="text-[9px] font-mono block">No Logo</span>
                      </div>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="space-y-2.5 flex-1">
                    <div className="flex items-center gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleLogoFileChange}
                        className="hidden"
                        id="company-logo-upload"
                      />
                      <label
                        htmlFor="company-logo-upload"
                        className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono font-bold cursor-pointer inline-flex items-center gap-1.5 border border-slate-700 transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>Upload Logo File</span>
                      </label>

                      {logoPreview && (
                        <button
                          type="button"
                          onClick={handleRemoveLogo}
                          className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-mono transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 font-mono">
                      Accepts JPG, PNG, WEBP. Sanitized & metadata stripped automatically by server. Max 5MB.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3: Project & Scope Details */}
              <div className="space-y-4 pt-3 border-t border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>3. Executed Contract / Scope of Work</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Project Name */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold font-mono text-slate-300 uppercase">
                      Primary Project Name
                    </label>
                    <input
                      type="text"
                      value={formProjectName}
                      onChange={(e) => setFormProjectName(e.target.value)}
                      placeholder="e.g. 2x660 MW Thermal Boiler Erection"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Year / Period */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold font-mono text-slate-300 uppercase">
                      Year / Execution Period
                    </label>
                    <input
                      type="text"
                      value={formYear}
                      onChange={(e) => setFormYear(e.target.value)}
                      placeholder="e.g. 2022 - 2024"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[11px] font-bold font-mono text-slate-300 uppercase">
                      Project Location / State
                    </label>
                    <input
                      type="text"
                      value={formLocation}
                      onChange={(e) => setFormLocation(e.target.value)}
                      placeholder="e.g. Panipat, Haryana / Mundra, Gujarat"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Scope of Work */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[11px] font-bold font-mono text-slate-300 uppercase">
                      Scope of Work & Deliverables
                    </label>
                    <textarea
                      rows={2}
                      value={formScopeOfWork}
                      onChange={(e) => setFormScopeOfWork(e.target.value)}
                      placeholder="e.g. Heavy structural fabrication, high-pressure piping, equipment alignment and pre-commissioning."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Short Description */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[11px] font-bold font-mono text-slate-300 uppercase">
                      Company Profile / Engagement Summary
                    </label>
                    <textarea
                      rows={2}
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      placeholder="Brief note about the partnership, safety milestones, or quality standards achieved."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Multiple Sub-Projects (Future Scalability) */}
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>4. Multiple Projects Architecture ({formProjects.length})</span>
                  </h4>
                  <button
                    type="button"
                    onClick={() => setShowSubProjectForm(!showSubProjectForm)}
                    className="text-xs font-mono text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>{showSubProjectForm ? 'Hide Form' : 'Add Project'}</span>
                  </button>
                </div>

                {showSubProjectForm && (
                  <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                      <input
                        type="text"
                        placeholder="Sub-project Name *"
                        value={newSubProjectName}
                        onChange={(e) => setNewSubProjectName(e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                      />
                      <input
                        type="text"
                        placeholder="Year (e.g. 2024)"
                        value={newSubYear}
                        onChange={(e) => setNewSubYear(e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                      />
                      <input
                        type="text"
                        placeholder="Location"
                        value={newSubLocation}
                        onChange={(e) => setNewSubLocation(e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                      />
                      <input
                        type="text"
                        placeholder="Scope of work"
                        value={newSubScope}
                        onChange={(e) => setNewSubScope(e.target.value)}
                        className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowSubProjectForm(false)}
                        className="px-2.5 py-1 bg-slate-800 text-slate-400 text-xs rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleAddSubProject}
                        className="px-3 py-1 bg-amber-500 text-slate-950 font-bold text-xs rounded-lg"
                      >
                        Add to List
                      </button>
                    </div>
                  </div>
                )}

                {/* Sub-projects list */}
                {formProjects.length > 0 && (
                  <div className="space-y-1.5">
                    {formProjects.map((p, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-950/70 border border-slate-800 p-2.5 rounded-xl flex items-center justify-between text-xs font-mono"
                      >
                        <div>
                          <span className="font-bold text-white">{p.projectName}</span>
                          {p.year && <span className="text-slate-400 ml-2">({p.year})</span>}
                          {p.scopeOfWork && <p className="text-slate-400 text-[11px]">{p.scopeOfWork}</p>}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveSubProject(idx)}
                          className="text-rose-400 hover:text-rose-300 p-1"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="p-4 bg-slate-950 border-t border-slate-800 -mx-6 -mb-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
                >
                  <Check className="w-4 h-4" />
                  <span>{actionLoading ? 'Saving...' : editingCompany ? 'Save Changes' : 'Create Company'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
