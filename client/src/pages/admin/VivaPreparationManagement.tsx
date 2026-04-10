import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, ArrowLeft, Pencil, Trash2, Eye,
  Loader2, AlertCircle, MessageSquare, CheckCircle2,
} from 'lucide-react';
import { vivaPreparationService, VivaPreparationItem } from '@/services/vivaPreparation.service';
import { toast } from 'sonner';

const SURFACE  = '#1C1B18';
const CARD     = '#1E1D1B';
const BORDER   = 'rgba(255,255,255,0.07)';
const GOLD     = '#C49B4B';
const TEXT     = '#F0EBE1';
const MUTED    = '#8A8278';
const INPUT_BG = '#161513';

type View = 'list' | 'create' | 'edit';

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label style={{ color: TEXT }} className="text-sm font-medium">
        {label}{required && <span style={{ color: GOLD }} className="ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = 'w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-colors';
const iStyle   = (f?: boolean) => ({ background: INPUT_BG, border: `1px solid ${f ? `${GOLD}55` : BORDER}`, color: TEXT });

const VivaPreparationManagement = () => {
  const navigate = useNavigate();

  const [view, setView]           = useState<View>('list');
  const [items, setItems]         = useState<VivaPreparationItem[]>([]);
  const [loading, setLoading]     = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editTarget, setEditTarget] = useState<VivaPreparationItem | null>(null);
  const [headline, setHeadline]   = useState('');
  const [content, setContent]     = useState('');
  const [formError, setFormError] = useState('');

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await vivaPreparationService.adminGetAll();
      setItems(res.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const openCreate = () => {
    setEditTarget(null); setHeadline(''); setContent(''); setFormError(''); setView('create');
  };
  const openEdit = (item: VivaPreparationItem) => {
    setEditTarget(item); setHeadline(item.headline); setContent(item.content ?? ''); setFormError(''); setView('edit');
  };
  const backToList = () => { setView('list'); setEditTarget(null); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!headline.trim()) { setFormError('Headline is required.'); return; }
    if (!content.trim())  { setFormError('Content is required.');  return; }
    try {
      setSubmitting(true);
      if (view === 'edit' && editTarget) {
        await vivaPreparationService.update(editTarget._id, { headline: headline.trim(), content: content.trim() });
        toast.success('Content updated');
      } else {
        await vivaPreparationService.create({ headline: headline.trim(), content: content.trim() });
        toast.success('Content created');
      }
      backToList();
      fetchItems();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save content');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this item? This cannot be undone.')) return;
    try {
      setDeletingId(id);
      await vivaPreparationService.delete(id);
      toast.success('Content deleted');
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to delete');
    } finally {
      setDeletingId(null);
    }
  };

  /* ── Form view ── */
  if (view === 'create' || view === 'edit') {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 style={{ color: TEXT }} className="text-lg font-bold tracking-tight">
              {view === 'edit' ? 'Edit Content' : 'New Content'}
            </h1>
            <p style={{ color: MUTED }} className="text-xs mt-0.5">Viva Preparation Management</p>
          </div>
          <button onClick={backToList} style={{ color: MUTED }} className="flex items-center gap-1.5 text-sm hover:opacity-75 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>

        <div style={{ borderTop: `1px solid ${BORDER}` }} />

        <div style={{ background: CARD, border: `1px solid ${BORDER}` }} className="rounded-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Field label="Headline" required>
              <input
                type="text"
                placeholder="e.g. Common Viva Questions in Bank Exams"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                disabled={submitting}
                style={iStyle()}
                className={inputCls}
                onFocus={(e) => Object.assign(e.currentTarget.style, iStyle(true))}
                onBlur={(e)  => Object.assign(e.currentTarget.style, iStyle(false))}
              />
            </Field>

            <Field label="Content" required>
              <textarea
                placeholder="Write the full content here…"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={submitting}
                rows={12}
                style={{ ...iStyle(), resize: 'vertical', lineHeight: 1.7 }}
                className={inputCls}
                onFocus={(e) => Object.assign(e.currentTarget.style, { ...iStyle(true),  resize: 'vertical', lineHeight: 1.7 })}
                onBlur={(e)  => Object.assign(e.currentTarget.style, { ...iStyle(false), resize: 'vertical', lineHeight: 1.7 })}
              />
            </Field>

            {formError && (
              <div className="flex items-center gap-2 text-sm" style={{ color: '#EF8888' }}>
                <AlertCircle className="w-4 h-4 shrink-0" /> {formError}
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit" disabled={submitting}
                style={{ background: GOLD, color: '#0A0A0A' }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                {submitting ? 'Saving…' : view === 'edit' ? 'Save Changes' : 'Create Content'}
              </button>
              <button
                type="button" onClick={backToList} disabled={submitting}
                style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: MUTED }}
                className="px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-80 transition-opacity"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  /* ── List view ── */
  return (
    <div className="space-y-6">
      <div>
        <h1 style={{ color: TEXT }} className="text-lg font-bold tracking-tight">Viva Preparation Content</h1>
        <p style={{ color: MUTED }} className="text-xs mt-0.5">Manage viva question guides and preparation materials</p>
      </div>

      <div style={{ borderTop: `1px solid ${BORDER}` }} />

      <div className="flex items-center justify-between">
        <h2 style={{ color: TEXT }} className="text-base font-semibold">
          All Content
          {!loading && <span style={{ color: MUTED }} className="font-normal text-sm ml-2">({items.length})</span>}
        </h2>
        <button
          onClick={openCreate}
          style={{ background: GOLD, color: '#0A0A0A' }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> New Content
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 style={{ color: GOLD }} className="w-5 h-5 animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div style={{ background: CARD, border: `1px solid ${BORDER}` }} className="rounded-2xl p-14 text-center">
          <div style={{ background: `${GOLD}14`, border: `1px solid ${GOLD}22` }} className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <MessageSquare style={{ color: GOLD }} className="w-5 h-5" />
          </div>
          <p style={{ color: TEXT }} className="text-sm font-semibold mb-1">No content yet</p>
          <p style={{ color: MUTED }} className="text-xs mb-5">Click "+ New Content" to add the first entry.</p>
          <button onClick={openCreate} style={{ background: GOLD, color: '#0A0A0A' }} className="px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
            + New Content
          </button>
        </div>
      ) : (
        <div style={{ background: CARD, border: `1px solid ${BORDER}` }} className="rounded-2xl overflow-hidden">
          {items.map((item, i) => (
            <div
              key={item._id}
              style={{ borderBottom: i < items.length - 1 ? `1px solid ${BORDER}` : 'none' }}
              className="flex items-center gap-4 px-5 py-4 hover:bg-white/[0.02] transition-colors"
            >
              {/* Avatar */}
              <div
                style={{ background: `${GOLD}14`, border: `1px solid ${GOLD}20`, color: GOLD }}
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold uppercase"
              >
                {item.headline.charAt(0)}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p style={{ color: TEXT }} className="text-sm font-semibold truncate">{item.headline}</p>
                <p style={{ color: MUTED }} className="text-xs mt-0.5">
                  {new Date(item.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
              </div>

              {/* Status */}
              <span
                style={{
                  background: item.isActive ? 'rgba(126,200,154,0.12)' : 'rgba(239,136,136,0.12)',
                  color:      item.isActive ? '#7EC89A' : '#EF8888',
                  border:     `1px solid ${item.isActive ? 'rgba(126,200,154,0.25)' : 'rgba(239,136,136,0.25)'}`,
                }}
                className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold shrink-0"
              >
                {item.isActive ? 'Published' : 'Hidden'}
              </span>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  title="View on site"
                  onClick={() => navigate(`/viva-preparation/${item._id}`)}
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
                  {deletingId === item._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
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

export default VivaPreparationManagement;
