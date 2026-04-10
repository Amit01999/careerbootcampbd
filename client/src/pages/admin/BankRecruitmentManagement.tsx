import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  ArrowLeft,
  Pencil,
  Trash2,
  Eye,
  Loader2,
  AlertCircle,
  Landmark,
  CheckCircle2,
  Image as ImageIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  bankRecruitmentService,
  BankRecruitmentItem,
} from '@/services/bankRecruitment.service';

/* ─── Design tokens ──────────────────────────────────────── */
const SURFACE = '#1C1B18';
const CARD = '#1E1D1B';
const BORDER = 'rgba(255,255,255,0.07)';
const GOLD = '#C49B4B';
const TEXT = '#F0EBE1';
const MUTED = '#8A8278';
const INPUT_BG = '#161513';

type View = 'list' | 'create' | 'edit';

const iBase = { background: INPUT_BG, border: `1px solid ${BORDER}`, color: TEXT };
const iFoc = { background: INPUT_BG, border: `1px solid ${GOLD}55`, color: TEXT };
const iCls =
  'w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-[#5A5450]';

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        style={{ color: TEXT }}
        className="text-sm font-medium flex items-center gap-1"
      >
        {label}
        {required && <span style={{ color: GOLD }}>*</span>}
      </label>
      {children}
      {hint && (
        <p style={{ color: MUTED }} className="text-xs">
          {hint}
        </p>
      )}
    </div>
  );
}

const BankRecruitmentManagement = () => {
  const navigate = useNavigate();

  const [view, setView] = useState<View>('list');
  const [items, setItems] = useState<BankRecruitmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editTarget, setEditTarget] = useState<BankRecruitmentItem | null>(null);

  /* form fields */
  const [bankName, setBankName] = useState('');
  const [positionTitle, setPositionTitle] = useState('');
  const [details, setDetails] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [formError, setFormError] = useState('');

  const logoPreviewUrl = useMemo(() => {
    if (!logoFile) return null;
    return URL.createObjectURL(logoFile);
  }, [logoFile]);

  useEffect(() => {
    return () => {
      if (logoPreviewUrl) URL.revokeObjectURL(logoPreviewUrl);
    };
  }, [logoPreviewUrl]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await bankRecruitmentService.adminGetAll(1, 200);
      setItems(res.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to load recruitments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const backToList = () => {
    setView('list');
    setEditTarget(null);
  };

  const openCreate = () => {
    setEditTarget(null);
    setBankName('');
    setPositionTitle('');
    setDetails('');
    setLogoFile(null);
    setFormError('');
    setView('create');
  };

  const openEdit = (item: BankRecruitmentItem) => {
    setEditTarget(item);
    setBankName(item.bankName);
    setPositionTitle(item.positionTitle);
    setDetails(item.details ?? '');
    setLogoFile(null);
    setFormError('');
    setView('edit');
  };

  const validate = () => {
    const name = bankName.trim();
    const title = positionTitle.trim();
    const det = details.trim();
    if (!name) return 'Bank name is required.';
    if (name.length < 2) return 'Bank name must be at least 2 characters.';
    if (!title) return 'Position / Job title is required.';
    if (title.length < 2) return 'Position / Job title must be at least 2 characters.';
    if (!det) return 'Recruitment details are required.';
    if (det.length < 10) return 'Recruitment details must be at least 10 characters.';
    if (view === 'create' && !logoFile) return 'Bank logo image is required.';
    if (logoFile) {
      const okTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!okTypes.includes(logoFile.type)) return 'Logo must be an image (jpg/png/webp).';
      if (logoFile.size > 5 * 1024 * 1024) return 'Logo is too large (max 5MB).';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    const errMsg = validate();
    if (errMsg) {
      setFormError(errMsg);
      return;
    }

    try {
      setSubmitting(true);
      if (view === 'edit' && editTarget) {
        await bankRecruitmentService.update(editTarget._id, {
          bankName: bankName.trim(),
          positionTitle: positionTitle.trim(),
          details: details.trim(),
          logoFile,
        });
        toast.success('Recruitment updated');
      } else {
        await bankRecruitmentService.create({
          bankName: bankName.trim(),
          positionTitle: positionTitle.trim(),
          details: details.trim(),
          logoFile: logoFile as File,
        });
        toast.success('Recruitment created');
      }

      backToList();
      fetchItems();
    } catch (err: any) {
      const data = err.response?.data;
      const firstField =
        Array.isArray(data?.errors) && data.errors.length > 0
          ? data.errors[0].message
          : null;
      toast.error(firstField || data?.message || 'Failed to save');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this recruitment? This cannot be undone.')) return;
    try {
      setDeletingId(id);
      await bankRecruitmentService.delete(id);
      toast.success('Deleted');
      setItems((p) => p.filter((i) => i._id !== id));
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to delete');
    } finally {
      setDeletingId(null);
    }
  };

  if (view === 'create' || view === 'edit') {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1
              style={{ color: TEXT }}
              className="text-lg font-bold tracking-tight"
            >
              {view === 'edit' ? 'Edit Bank Recruitment' : 'New Bank Recruitment'}
            </h1>
            <p style={{ color: MUTED }} className="text-xs mt-0.5">
              Bank Recruitment Management
            </p>
          </div>
          <button
            onClick={backToList}
            style={{ color: MUTED }}
            className="flex items-center gap-1.5 text-sm hover:opacity-75 transition-opacity"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>

        <div style={{ borderTop: `1px solid ${BORDER}` }} />

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic info */}
          <div
            style={{ background: CARD, border: `1px solid ${BORDER}` }}
            className="rounded-2xl p-6 space-y-5"
          >
            <h3
              style={{ color: GOLD }}
              className="text-xs font-semibold uppercase tracking-widest"
            >
              Basic Information
            </h3>

            <Field label="Bank Name" required>
              <input
                type="text"
                placeholder="e.g. Sonali Bank Limited"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                disabled={submitting}
                style={iBase}
                className={iCls}
                onFocus={(e) => Object.assign(e.currentTarget.style, iFoc)}
                onBlur={(e) => Object.assign(e.currentTarget.style, iBase)}
              />
            </Field>

            <Field label="Position / Job Title" required>
              <input
                type="text"
                placeholder="e.g. Senior Officer"
                value={positionTitle}
                onChange={(e) => setPositionTitle(e.target.value)}
                disabled={submitting}
                style={iBase}
                className={iCls}
                onFocus={(e) => Object.assign(e.currentTarget.style, iFoc)}
                onBlur={(e) => Object.assign(e.currentTarget.style, iBase)}
              />
            </Field>

            <Field
              label="Bank Logo"
              required={view === 'create'}
              hint="PNG/JPG/WEBP up to 5MB"
            >
              <div className="flex items-center gap-4">
                <div
                  style={{
                    background: SURFACE,
                    border: `1px solid ${BORDER}`,
                  }}
                  className="w-16 h-16 rounded-2xl overflow-hidden flex items-center justify-center shrink-0"
                >
                  {logoPreviewUrl ? (
                    <img
                      src={logoPreviewUrl}
                      alt="Selected logo"
                      className="w-full h-full object-contain p-2"
                    />
                  ) : view === 'edit' && editTarget?.bankLogoUrl ? (
                    <img
                      src={editTarget.bankLogoUrl}
                      alt={`${editTarget.bankName} logo`}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <ImageIcon className="w-5 h-5" style={{ color: MUTED }} />
                  )}
                </div>

                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    disabled={submitting}
                    onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                    className="block w-full text-sm text-[#BDB6AC] file:mr-4 file:rounded-xl file:border-0 file:bg-[#C49B4B] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#0A0A0A] hover:file:opacity-90"
                  />
                  {view === 'edit' && (
                    <p className="text-xs mt-1.5" style={{ color: MUTED }}>
                      Leave empty to keep the existing logo.
                    </p>
                  )}
                </div>
              </div>
            </Field>
          </div>

          {/* Details */}
          <div
            style={{ background: CARD, border: `1px solid ${BORDER}` }}
            className="rounded-2xl p-6 space-y-4"
          >
            <h3
              style={{ color: GOLD }}
              className="text-xs font-semibold uppercase tracking-widest"
            >
              Recruitment Details
            </h3>
            <Field
              label="Details"
              required
              hint="At least 10 characters. Long description / rich text can be pasted here."
            >
              <textarea
                placeholder="Write the full recruitment details…"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                disabled={submitting}
                rows={10}
                style={{ ...iBase, resize: 'vertical', lineHeight: 1.7 }}
                className={iCls}
                onFocus={(e) =>
                  Object.assign(e.currentTarget.style, {
                    ...iFoc,
                    resize: 'vertical',
                    lineHeight: 1.7,
                  })
                }
                onBlur={(e) =>
                  Object.assign(e.currentTarget.style, {
                    ...iBase,
                    resize: 'vertical',
                    lineHeight: 1.7,
                  })
                }
              />
            </Field>
          </div>

          {formError && (
            <div
              className="flex items-center gap-2 text-sm"
              style={{ color: '#EF8888' }}
            >
              <AlertCircle className="w-4 h-4 shrink-0" /> {formError}
            </div>
          )}

          <div className="flex items-center gap-3 pb-6">
            <button
              type="submit"
              disabled={submitting}
              style={{ background: GOLD, color: '#0A0A0A' }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
              {submitting
                ? 'Saving…'
                : view === 'edit'
                  ? 'Save Changes'
                  : 'Create Recruitment'}
            </button>
            <button
              type="button"
              onClick={backToList}
              disabled={submitting}
              style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: MUTED }}
              className="px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-80 transition-opacity"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 style={{ color: TEXT }} className="text-lg font-bold tracking-tight">
          Bank Recruitment Posts
        </h1>
        <p style={{ color: MUTED }} className="text-xs mt-0.5">
          Create and manage recruitment posts (logo, bank name, position, details)
        </p>
      </div>

      <div style={{ borderTop: `1px solid ${BORDER}` }} />

      <div className="flex items-center justify-between">
        <h2 style={{ color: TEXT }} className="text-base font-semibold">
          All Posts
          {!loading && (
            <span style={{ color: MUTED }} className="font-normal text-sm ml-2">
              ({items.length})
            </span>
          )}
        </h2>
        <button
          onClick={openCreate}
          style={{ background: GOLD, color: '#0A0A0A' }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 style={{ color: GOLD }} className="w-5 h-5 animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div
          style={{ background: CARD, border: `1px solid ${BORDER}` }}
          className="rounded-2xl p-14 text-center"
        >
          <div
            style={{ background: `${GOLD}14`, border: `1px solid ${GOLD}22` }}
            className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <Landmark style={{ color: GOLD }} className="w-5 h-5" />
          </div>
          <p style={{ color: TEXT }} className="text-sm font-semibold mb-1">
            No recruitment posts yet
          </p>
          <p style={{ color: MUTED }} className="text-xs mb-5">
            Click "+ New Post" to add the first entry.
          </p>
          <button
            onClick={openCreate}
            style={{ background: GOLD, color: '#0A0A0A' }}
            className="px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            + New Post
          </button>
        </div>
      ) : (
        <div
          style={{ background: CARD, border: `1px solid ${BORDER}` }}
          className="rounded-2xl overflow-hidden"
        >
          {items.map((item, i) => (
            <div
              key={item._id}
              style={{
                borderBottom: i < items.length - 1 ? `1px solid ${BORDER}` : 'none',
              }}
              className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors"
            >
              <div
                style={{
                  background: SURFACE,
                  border: `1px solid ${BORDER}`,
                }}
                className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shrink-0"
              >
                {item.bankLogoUrl ? (
                  <img
                    src={item.bankLogoUrl}
                    alt={`${item.bankName} logo`}
                    className="w-full h-full object-contain p-1.5"
                  />
                ) : (
                  <Landmark className="w-4 h-4" style={{ color: MUTED }} />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p style={{ color: TEXT }} className="text-sm font-semibold truncate">
                  {item.bankName}
                </p>
                <p style={{ color: MUTED }} className="text-xs mt-0.5 truncate">
                  {item.positionTitle}
                </p>
              </div>

              <span
                style={{
                  background: item.isActive ? 'rgba(126,200,154,0.12)' : 'rgba(239,136,136,0.12)',
                  color: item.isActive ? '#7EC89A' : '#EF8888',
                  border: `1px solid ${
                    item.isActive ? 'rgba(126,200,154,0.25)' : 'rgba(239,136,136,0.25)'
                  }`,
                }}
                className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold shrink-0"
              >
                {item.isActive ? 'Published' : 'Hidden'}
              </span>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  title="View on site"
                  onClick={() => navigate(`/recruitment-processes/${item._id}`)}
                  style={{ color: MUTED, border: `1px solid ${BORDER}` }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium hover:border-[#C49B4B]/30 hover:text-[#F0EBE1] transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">View</span>
                </button>
                <button
                  title="Edit"
                  onClick={() => openEdit(item)}
                  style={{ color: MUTED, border: `1px solid ${BORDER}` }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium hover:border-[#C49B4B]/30 hover:text-[#F0EBE1] transition-all"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Edit</span>
                </button>
                <button
                  title="Delete"
                  onClick={() => handleDelete(item._id)}
                  disabled={deletingId === item._id}
                  style={{ color: '#EF8888', border: '1px solid rgba(239,136,136,0.2)' }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-[rgba(239,136,136,0.08)] transition-all disabled:opacity-40"
                >
                  {deletingId === item._id ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="w-3.5 h-3.5" />
                  )}
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BankRecruitmentManagement;

