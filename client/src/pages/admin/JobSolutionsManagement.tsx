import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, ArrowLeft, Pencil, Trash2, Eye,
  Loader2, AlertCircle, Briefcase, CheckCircle2,
  Building2, Clock, BarChart2, Hash, X,
  ChevronDown, ChevronUp, Eraser,
} from 'lucide-react';
import {
  jobSolutionService,
  JobSolutionItem,
  JobSolutionQuestion,
} from '@/services/jobSolution.service';
import { toast } from 'sonner';

/* ─── Design tokens ──────────────────────────────────────── */
const SURFACE  = '#1C1B18';
const CARD     = '#1E1D1B';
const BORDER   = 'rgba(255,255,255,0.07)';
const GOLD     = '#C49B4B';
const TEXT     = '#F0EBE1';
const MUTED    = '#8A8278';
const INPUT_BG = '#161513';

const OPTION_COLORS: Record<string, string> = {
  A: '#7C9EE8', B: '#7EC89A', C: '#E8946A', D: '#9A8ACA',
};

type View = 'list' | 'create' | 'edit';

/* ─── Shared input styles ────────────────────────────────── */
const iBase = { background: INPUT_BG, border: `1px solid ${BORDER}`, color: TEXT };
const iFoc  = { background: INPUT_BG, border: `1px solid ${GOLD}55`, color: TEXT };
const iCls  = 'w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-[#5A5450]';

function Field({ label, required, hint, children }: { label: string; required?: boolean; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label style={{ color: TEXT }} className="text-sm font-medium flex items-center gap-1">
        {label}
        {required && <span style={{ color: GOLD }}>*</span>}
      </label>
      {children}
      {hint && <p style={{ color: MUTED }} className="text-xs">{hint}</p>}
    </div>
  );
}

/* ─── Empty question factory ─────────────────────────────── */
const emptyQuestion = (): JobSolutionQuestion => ({
  question: '',
  options: { A: '', B: '', C: '', D: '' },
  correctAnswer: 'A',
});

const DEFAULT_MCQ_SLOTS = 100;

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════ */
const JobSolutionsManagement = () => {
  const navigate = useNavigate();

  /* ── state ── */
  const [view, setView]             = useState<View>('list');
  const [items, setItems]           = useState<JobSolutionItem[]>([]);
  const [loading, setLoading]       = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editTarget, setEditTarget] = useState<JobSolutionItem | null>(null);

  /* ── form fields ── */
  const [bankName, setBankName]           = useState('');
  const [post, setPost]                   = useState('');
  const [time, setTime]                   = useState('');
  const [mark, setMark]                   = useState('');
  const [totalQuestions, setTotalQuestions] = useState('');
  const [content, setContent]             = useState('');
  const [questions, setQuestions]         = useState<JobSolutionQuestion[]>([]);
  const [formError, setFormError]         = useState('');
  const [showMcq, setShowMcq]             = useState(true);

  /* ── fetch ── */
  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await jobSolutionService.adminGetAll();
      setItems(res.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchItems(); }, []);

  /* ── open create ── */
  const openCreate = () => {
    setEditTarget(null);
    setBankName(''); setPost(''); setTime(''); setMark('');
    setTotalQuestions(''); setContent(''); setQuestions([]);
    setFormError(''); setShowMcq(true); setView('create');
  };

  /* ── open edit ── */
  const openEdit = (item: JobSolutionItem) => {
    setEditTarget(item);
    setBankName(item.bankName);
    setPost(item.post);
    setTime(item.time ?? '');
    setMark(item.mark !== undefined ? String(item.mark) : '');
    setTotalQuestions(item.totalQuestions !== undefined ? String(item.totalQuestions) : '');
    setContent(item.content ?? '');
    setQuestions(item.questions ? item.questions.map(q => ({ ...q, options: { ...q.options } })) : []);
    setFormError(''); setShowMcq(true); setView('edit');
  };

  const backToList = () => { setView('list'); setEditTarget(null); };

  /* ── question helpers ── */
  const addQuestion = () => setQuestions((prev) => [...prev, emptyQuestion()]);
  const removeQuestion = (i: number) => setQuestions((prev) => prev.filter((_, idx) => idx !== i));
  const ensureQuestionIndex = (prev: JobSolutionQuestion[], i: number) => {
    if (i < prev.length) return prev;
    const next = [...prev];
    while (next.length <= i) next.push(emptyQuestion());
    return next;
  };

  const updateQuestion = (i: number, field: keyof JobSolutionQuestion, value: any) => {
    setQuestions((prev) => {
      const next = ensureQuestionIndex(prev, i);
      const copy = [...next];
      copy[i] = { ...copy[i], [field]: value };
      return copy;
    });
  };

  const updateOption = (qi: number, opt: 'A' | 'B' | 'C' | 'D', value: string) => {
    setQuestions((prev) => {
      const next = ensureQuestionIndex(prev, qi);
      const copy = [...next];
      copy[qi] = { ...copy[qi], options: { ...copy[qi].options, [opt]: value } };
      return copy;
    });
  };

  /* ── submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!bankName.trim()) { setFormError('Bank name is required.'); return; }
    if (!post.trim())     { setFormError('Post is required.');      return; }
    if (!content.trim())  { setFormError('Content is required.');   return; }

    // Validate questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question.trim()) { setFormError(`Question ${i + 1}: question text is required.`); return; }
      if (!q.options.A.trim() || !q.options.B.trim() || !q.options.C.trim() || !q.options.D.trim()) {
        setFormError(`Question ${i + 1}: all four options are required.`); return;
      }
    }

    const payload = {
      bankName: bankName.trim(),
      post: post.trim(),
      time: time.trim() || undefined,
      mark: mark ? Number(mark) : undefined,
      totalQuestions: totalQuestions ? Number(totalQuestions) : undefined,
      content: content.trim(),
      questions,
    };

    try {
      setSubmitting(true);
      if (view === 'edit' && editTarget) {
        await jobSolutionService.update(editTarget._id, payload);
        toast.success('Job solution updated');
      } else {
        await jobSolutionService.create(payload);
        toast.success('Job solution created');
      }
      backToList();
      fetchItems();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to save');
    } finally {
      setSubmitting(false);
    }
  };

  /* ── delete ── */
  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this job solution? This cannot be undone.')) return;
    try {
      setDeletingId(id);
      await jobSolutionService.delete(id);
      toast.success('Deleted');
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to delete');
    } finally {
      setDeletingId(null);
    }
  };

  /* ══════════════════════════════════════════════════════════
     FORM VIEW
  ══════════════════════════════════════════════════════════ */
  if (view === 'create' || view === 'edit') {
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 style={{ color: TEXT }} className="text-lg font-bold tracking-tight">
              {view === 'edit' ? 'Edit Job Solution' : 'New Job Solution'}
            </h1>
            <p style={{ color: MUTED }} className="text-xs mt-0.5">Job Solutions Management</p>
          </div>
          <button onClick={backToList} style={{ color: MUTED }} className="flex items-center gap-1.5 text-sm hover:opacity-75 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>

        <div style={{ borderTop: `1px solid ${BORDER}` }} />

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* ── Section 1: Basic Info ── */}
          <div style={{ background: CARD, border: `1px solid ${BORDER}` }} className="rounded-2xl p-6 space-y-5">
            <h3 style={{ color: GOLD }} className="text-xs font-semibold uppercase tracking-widest">
              Basic Information
            </h3>

            {/* Bank Name */}
            <Field label="Bank Name" required>
              <input
                type="text" placeholder="e.g. Sonali Bank Limited"
                value={bankName} onChange={(e) => setBankName(e.target.value)} disabled={submitting}
                style={iBase} className={iCls}
                onFocus={(e) => Object.assign(e.currentTarget.style, iFoc)}
                onBlur={(e)  => Object.assign(e.currentTarget.style, iBase)}
              />
            </Field>

            {/* Post */}
            <Field label="Post" required>
              <input
                type="text" placeholder="e.g. Senior Officer"
                value={post} onChange={(e) => setPost(e.target.value)} disabled={submitting}
                style={iBase} className={iCls}
                onFocus={(e) => Object.assign(e.currentTarget.style, iFoc)}
                onBlur={(e)  => Object.assign(e.currentTarget.style, iBase)}
              />
            </Field>

            {/* Time, Mark, Total Questions */}
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Time">
                <input
                  type="text" placeholder="e.g. 60 mins"
                  value={time} onChange={(e) => setTime(e.target.value)} disabled={submitting}
                  style={iBase} className={iCls}
                  onFocus={(e) => Object.assign(e.currentTarget.style, iFoc)}
                  onBlur={(e)  => Object.assign(e.currentTarget.style, iBase)}
                />
              </Field>
              <Field label="Total Mark">
                <input
                  type="number" placeholder="e.g. 100"
                  value={mark} onChange={(e) => setMark(e.target.value)} disabled={submitting}
                  style={iBase} className={iCls}
                  onFocus={(e) => Object.assign(e.currentTarget.style, iFoc)}
                  onBlur={(e)  => Object.assign(e.currentTarget.style, iBase)}
                />
              </Field>
              <Field label="Total Questions">
                <input
                  type="number" placeholder="e.g. 80"
                  value={totalQuestions} onChange={(e) => setTotalQuestions(e.target.value)} disabled={submitting}
                  style={iBase} className={iCls}
                  onFocus={(e) => Object.assign(e.currentTarget.style, iFoc)}
                  onBlur={(e)  => Object.assign(e.currentTarget.style, iBase)}
                />
              </Field>
            </div>
          </div>

          {/* ── Section 2: Content ── */}
          <div style={{ background: CARD, border: `1px solid ${BORDER}` }} className="rounded-2xl p-6 space-y-4">
            <h3 style={{ color: GOLD }} className="text-xs font-semibold uppercase tracking-widest">
              Exam Content / Details
            </h3>
            <Field label="Content" required>
              <textarea
                placeholder="Provide any additional exam details, instructions, or context…"
                value={content} onChange={(e) => setContent(e.target.value)} disabled={submitting}
                rows={6}
                style={{ ...iBase, resize: 'vertical', lineHeight: 1.7 }}
                className={iCls}
                onFocus={(e) => Object.assign(e.currentTarget.style, { ...iFoc, resize: 'vertical', lineHeight: 1.7 })}
                onBlur={(e)  => Object.assign(e.currentTarget.style, { ...iBase, resize: 'vertical', lineHeight: 1.7 })}
              />
            </Field>
          </div>

          {/* ── Section 3: Questions ── */}
          <div style={{ background: CARD, border: `1px solid ${BORDER}` }} className="rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h3 style={{ color: GOLD }} className="text-xs font-semibold uppercase tracking-widest">
                Questions ({questions.length})
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowMcq((v) => !v)}
                  disabled={submitting}
                  style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}`, color: MUTED }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-80 transition-opacity"
                  title={showMcq ? 'Hide MCQs' : 'Show MCQs'}
                >
                  {showMcq ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  {showMcq ? 'Hide' : 'Show'}
                </button>

                <button
                  type="button"
                  onClick={() => setQuestions([])}
                  disabled={submitting || questions.length === 0}
                  style={{ background: 'rgba(239,136,136,0.10)', border: '1px solid rgba(239,136,136,0.22)', color: '#EF8888' }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-80 transition-opacity disabled:opacity-40"
                  title="Clear all MCQs"
                >
                  <Eraser className="w-3.5 h-3.5" />
                  Clear
                </button>

                <button
                  type="button" onClick={addQuestion} disabled={submitting}
                  style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}30`, color: GOLD }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-80 transition-opacity"
                >
                  <Plus className="w-3.5 h-3.5" /> Add MCQ
                </button>
              </div>
            </div>

            {showMcq ? (
              <p style={{ color: MUTED }} className="text-xs">
                100 MCQ slots are shown by default. Start typing in any slot to activate it. You can also hide or clear the MCQ section anytime.
              </p>
            ) : (
              <p style={{ color: MUTED }} className="text-xs">
                MCQ section is hidden. You can submit without MCQs, or click “Show” to add them.
              </p>
            )}

            {showMcq && (
              <div className="space-y-4">
              {Array.from({ length: Math.max(DEFAULT_MCQ_SLOTS, questions.length) }, (_, qi) => {
                const q = questions[qi] || emptyQuestion();
                const isSaved = qi < questions.length;
                return (
                  <div
                    key={qi}
                    style={{ background: SURFACE, border: `1px solid ${BORDER}` }}
                    className="rounded-xl p-5 space-y-4"
                  >
                    {/* Q header */}
                    <div className="flex items-center justify-between">
                      <span style={{ color: GOLD }} className="text-xs font-bold">Q{qi + 1}</span>
                      {isSaved ? (
                        <button
                          type="button" onClick={() => removeQuestion(qi)} disabled={submitting}
                          style={{ color: '#EF8888' }}
                          className="hover:opacity-70 transition-opacity"
                          title="Remove question"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      ) : (
                        <span
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                          style={{ color: MUTED, borderColor: BORDER, background: 'rgba(255,255,255,0.02)' }}
                          title="This slot will be activated when you type"
                        >
                          Empty
                        </span>
                      )}
                    </div>

                    {/* Question text */}
                    <input
                      type="text"
                      placeholder="Question text…"
                      value={q.question}
                      onChange={(e) => updateQuestion(qi, 'question', e.target.value)}
                      disabled={submitting}
                      style={iBase} className={iCls}
                      onFocus={(e) => Object.assign(e.currentTarget.style, iFoc)}
                      onBlur={(e)  => Object.assign(e.currentTarget.style, iBase)}
                    />

                    {/* Options */}
                    <div className="grid sm:grid-cols-2 gap-3">
                      {(['A', 'B', 'C', 'D'] as const).map((opt) => (
                        <div key={opt} className="flex items-center gap-2">
                          <span
                            style={{ background: `${OPTION_COLORS[opt]}20`, color: OPTION_COLORS[opt] }}
                            className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold shrink-0"
                          >
                            {opt}
                          </span>
                          <input
                            type="text"
                            placeholder={`Option ${opt}`}
                            value={q.options[opt]}
                            onChange={(e) => updateOption(qi, opt, e.target.value)}
                            disabled={submitting}
                            style={{ ...iBase, flex: 1 }} className={iCls}
                            onFocus={(e) => Object.assign(e.currentTarget.style, { ...iFoc, flex: 1 })}
                            onBlur={(e)  => Object.assign(e.currentTarget.style, { ...iBase, flex: 1 })}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Correct answer */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <span style={{ color: MUTED }} className="text-xs font-medium">Correct Answer:</span>
                      {(['A', 'B', 'C', 'D'] as const).map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => updateQuestion(qi, 'correctAnswer', opt)}
                          style={{
                            background: q.correctAnswer === opt ? `${OPTION_COLORS[opt]}25` : 'transparent',
                            border: `1px solid ${q.correctAnswer === opt ? OPTION_COLORS[opt] : BORDER}`,
                            color: q.correctAnswer === opt ? OPTION_COLORS[opt] : MUTED,
                          }}
                          className="w-8 h-8 rounded-lg text-xs font-bold transition-all"
                        >
                          {opt}
                        </button>
                      ))}
                      {q.correctAnswer && (
                        <span style={{ color: '#7EC89A' }} className="text-xs flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Answer: {q.correctAnswer}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
              </div>
            )}
          </div>

          {/* Error */}
          {formError && (
            <div className="flex items-center gap-2 text-sm" style={{ color: '#EF8888' }}>
              <AlertCircle className="w-4 h-4 shrink-0" /> {formError}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pb-6">
            <button
              type="submit" disabled={submitting}
              style={{ background: GOLD, color: '#0A0A0A' }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              {submitting ? 'Saving…' : view === 'edit' ? 'Save Changes' : 'Create Job Solution'}
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
    );
  }

  /* ══════════════════════════════════════════════════════════
     LIST VIEW
  ══════════════════════════════════════════════════════════ */
  return (
    <div className="space-y-6">
      <div>
        <h1 style={{ color: TEXT }} className="text-lg font-bold tracking-tight">Job Solutions Content</h1>
        <p style={{ color: MUTED }} className="text-xs mt-0.5">Manage previous exam papers with questions and answers</p>
      </div>

      <div style={{ borderTop: `1px solid ${BORDER}` }} />

      {/* List header */}
      <div className="flex items-center justify-between">
        <h2 style={{ color: TEXT }} className="text-base font-semibold">
          All Solutions
          {!loading && <span style={{ color: MUTED }} className="font-normal text-sm ml-2">({items.length})</span>}
        </h2>
        <button
          onClick={openCreate}
          style={{ background: GOLD, color: '#0A0A0A' }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> New Solution
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 style={{ color: GOLD }} className="w-5 h-5 animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div style={{ background: CARD, border: `1px solid ${BORDER}` }} className="rounded-2xl p-14 text-center">
          <div style={{ background: `${GOLD}14`, border: `1px solid ${GOLD}22` }} className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Briefcase style={{ color: GOLD }} className="w-5 h-5" />
          </div>
          <p style={{ color: TEXT }} className="text-sm font-semibold mb-1">No solutions yet</p>
          <p style={{ color: MUTED }} className="text-xs mb-5">Click "+ New Solution" to add the first entry.</p>
          <button onClick={openCreate} style={{ background: GOLD, color: '#0A0A0A' }} className="px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
            + New Solution
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
              <div style={{ background: `${GOLD}14`, border: `1px solid ${GOLD}20`, color: GOLD }} className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                <Building2 className="w-4 h-4" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p style={{ color: TEXT }} className="text-sm font-semibold truncate">{item.bankName}</p>
                <p style={{ color: MUTED }} className="text-xs mt-0.5">
                  {item.post}
                  {item.totalQuestions ? ` · ${item.totalQuestions} Qs` : ''}
                  {item.mark ? ` · ${item.mark} marks` : ''}
                  {item.time ? ` · ${item.time}` : ''}
                </p>
              </div>

              {/* Status */}
              <span
                style={{
                  background: item.isActive ? 'rgba(126,200,154,0.12)' : 'rgba(239,136,136,0.12)',
                  color: item.isActive ? '#7EC89A' : '#EF8888',
                  border: `1px solid ${item.isActive ? 'rgba(126,200,154,0.25)' : 'rgba(239,136,136,0.25)'}`,
                }}
                className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold shrink-0"
              >
                {item.isActive ? 'Published' : 'Hidden'}
              </span>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  title="View on site" onClick={() => navigate(`/job-solutions/${item._id}`)}
                  style={{ color: MUTED, border: `1px solid ${BORDER}` }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium hover:border-[#C49B4B]/30 hover:text-[#F0EBE1] transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">View</span>
                </button>
                <button
                  title="Edit" onClick={() => openEdit(item)}
                  style={{ color: MUTED, border: `1px solid ${BORDER}` }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium hover:border-[#C49B4B]/30 hover:text-[#F0EBE1] transition-all"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Edit</span>
                </button>
                <button
                  title="Delete" onClick={() => handleDelete(item._id)} disabled={deletingId === item._id}
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

export default JobSolutionsManagement;
