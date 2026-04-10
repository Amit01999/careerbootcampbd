import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ClipboardCheck, Loader2, AlertCircle,
  Clock, BarChart2, Hash, FileText, CheckCircle2,
} from 'lucide-react';
import { modelTestService, ModelTestItem } from '@/services/modelTest.service';
import { toast } from 'sonner';

/* ─── tokens ─────────────────────────────────────────────── */
const BG      = '#111110';
const SURFACE = '#1C1B18';
const CARD    = '#1E1D1B';
const BORDER  = 'rgba(255,255,255,0.07)';
const GOLD    = '#C49B4B';
const TEXT    = '#EDE8DF';
const BODY    = '#C5BDB0';
const MUTED   = '#7A7570';

const OPT_CLR: Record<string, string> = {
  A: '#7C9EE8', B: '#7EC89A', C: '#E8946A', D: '#9A8ACA',
};

function StatTile({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value?: string | number }) {
  return (
    <div style={{ background: SURFACE, border: `1px solid ${BORDER}` }} className="rounded-xl p-4 flex items-center gap-3">
      <div style={{ background: `${GOLD}14`, border: `1px solid ${GOLD}20` }} className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0">
        <Icon style={{ color: GOLD }} className="w-4 h-4" />
      </div>
      <div>
        <p style={{ color: MUTED }} className="text-[10px] uppercase tracking-wider">{label}</p>
        <p style={{ color: TEXT }} className="text-sm font-bold mt-0.5">{value ?? '—'}</p>
      </div>
    </div>
  );
}

const ModelTestsDetail = () => {
  const { id }     = useParams<{ id: string }>();
  const navigate   = useNavigate();
  const [item, setItem]       = useState<ModelTestItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        setLoading(true);
        const res = await modelTestService.getById(id);
        setItem(res.data);
      } catch (err: any) {
        const msg = err.response?.data?.message || 'Failed to load content';
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  return (
    <div style={{ background: BG }} className="min-h-screen mt-20">
      {/* Sticky top bar */}
      <div
        style={{ background: `${SURFACE}EE`, borderBottom: `1px solid ${BORDER}`, backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
        className="sticky top-0 z-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-12 flex items-center gap-3">
          <button onClick={() => navigate('/model-tests')} style={{ color: MUTED }} className="flex items-center gap-1.5 text-xs hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Model Tests
          </button>
          {item && (
            <>
              <span style={{ color: BORDER, fontSize: 18 }}>│</span>
              <span style={{ color: MUTED }} className="text-xs truncate max-w-[50vw]">
                Model Test {item.modelTestNo} — {item.post}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-20 space-y-8">
        {loading ? (
          <div className="flex justify-center py-28">
            <Loader2 style={{ color: GOLD }} className="w-5 h-5 animate-spin" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-3 py-28 text-center">
            <AlertCircle className="w-7 h-7 text-red-400" />
            <p style={{ color: MUTED }} className="text-sm">{error}</p>
            <button onClick={() => navigate('/model-tests')} style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }} className="px-4 py-2 rounded-xl text-sm hover:opacity-80 transition-opacity">
              Go Back
            </button>
          </div>
        ) : item ? (
          <>
            {/* ══ 1. SUMMARY CARD ══ */}
            <div style={{ background: CARD, border: `1px solid ${BORDER}` }} className="rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-5">
                <div style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}25` }} className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
                  <ClipboardCheck style={{ color: GOLD }} className="w-5 h-5" />
                </div>
                <div>
                  <div style={{ color: GOLD }} className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide mb-0.5">
                    <FileText className="w-3 h-3" /> Model Test
                  </div>
                  <h1 style={{ color: TEXT }} className="text-xl font-bold tracking-tight">
                    Model Test {item.modelTestNo}
                  </h1>
                  <p style={{ color: MUTED }} className="text-sm">{item.post}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <StatTile icon={Clock}     label="Time"            value={item.time} />
                <StatTile icon={BarChart2} label="Total Mark"      value={item.mark} />
                <StatTile icon={Hash}      label="Total Questions" value={item.totalQuestions} />
                  </div>
                    {/* ══ 2. CONTENT SECTION ══ */}
            {item.content && (
              <div style={{ background: CARD,  }} className="rounded-2xl p-6 mt-2">
                <h2 style={{ color: TEXT }} className="text-base font-semibold mb-4 flex items-center gap-2">
                  <span style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}25`, color: GOLD }} className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold">i</span>
                  Instructions &amp; Details
                </h2>
                <div style={{ color: BODY, fontSize: '0.9375rem', lineHeight: 1.85, letterSpacing: '0.01em' }} className="whitespace-pre-wrap break-words">
                  {item.content}
                </div>
              </div>
            )}

            </div>

          
            {/* ══ 3. QUESTIONS SECTION ══ */}
            {item.questions && item.questions.length > 0 && (
              <div style={{ background: CARD, border: `1px solid ${BORDER}` }} className="rounded-2xl p-6">
                <h2 style={{ color: TEXT }} className="text-base font-semibold mb-5">
                  Questions
                  <span style={{ color: MUTED }} className="text-sm font-normal ml-2">({item.questions.length})</span>
                </h2>

                <div className="space-y-5">
                  {item.questions.map((q, idx) => (
                    <div key={q._id || idx} style={{ background: SURFACE, border: `1px solid ${BORDER}` }} className="rounded-xl p-4">
                      <p style={{ color: TEXT }} className="text-sm font-medium mb-3 leading-relaxed">
                        <span style={{ color: GOLD }} className="font-bold mr-2">Q{idx + 1}.</span>
                        {q.question}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {(['A', 'B', 'C', 'D'] as const).map((opt) => (
                          <div key={opt} style={{ background: `${OPT_CLR[opt]}0A`, border: `1px solid ${OPT_CLR[opt]}20` }} className="flex items-start gap-2.5 px-3 py-2 rounded-lg">
                            <span style={{ background: `${OPT_CLR[opt]}20`, color: OPT_CLR[opt] }} className="w-5 h-5 rounded flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                              {opt}
                            </span>
                            <span style={{ color: BODY }} className="text-sm leading-snug">{q.options[opt]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ══ 4. ANSWER KEY ══ */}
            {item.questions && item.questions.length > 0 && (
              <div style={{ background: CARD, border: `1px solid ${BORDER}` }} className="rounded-2xl p-6">
                <h2 style={{ color: TEXT }} className="text-base font-semibold mb-1 flex items-center gap-2">
                  <CheckCircle2 style={{ color: '#7EC89A' }} className="w-4 h-4" /> Answer Key
                </h2>
                <p style={{ color: MUTED }} className="text-xs mb-5">Correct answers for all {item.questions.length} questions</p>
                <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
                  {item.questions.map((q, idx) => (
                    <div key={q._id || idx} style={{ background: 'rgba(126,200,154,0.08)', border: '1px solid rgba(126,200,154,0.2)' }} className="rounded-xl p-2.5 flex flex-col items-center gap-1">
                      <span style={{ color: MUTED }} className="text-[10px] font-medium">Q{idx + 1}</span>
                      <span style={{ background: `${OPT_CLR[q.correctAnswer]}22`, color: OPT_CLR[q.correctAnswer] }} className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold">
                        {q.correctAnswer}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom nav */}
            <div style={{ borderTop: `1px solid ${BORDER}` }} className="pt-6 flex items-center justify-between">
              <button onClick={() => navigate('/model-tests')} style={{ color: MUTED, background: SURFACE, border: `1px solid ${BORDER}` }} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm hover:border-[#C49B4B]/30 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to list
              </button>
              <p style={{ color: MUTED }} className="text-xs">
                {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
              </p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ModelTestsDetail;
