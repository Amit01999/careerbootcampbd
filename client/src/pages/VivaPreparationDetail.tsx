import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Loader2, AlertCircle, Clock } from 'lucide-react';
import { vivaPreparationService, VivaPreparationItem } from '@/services/vivaPreparation.service';
import { toast } from 'sonner';

const BG      = '#111110';
const SURFACE = '#1C1B18';
const BORDER  = 'rgba(255,255,255,0.07)';
const GOLD    = '#C49B4B';
const TEXT    = '#EDE8DF';
const BODY    = '#C5BDB0';
const MUTED   = '#7A7570';

function readingTime(content: string) {
  const words = content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

const VivaPreparationDetail = () => {
  const { id }     = useParams<{ id: string }>();
  const navigate   = useNavigate();
  const [item, setItem]       = useState<VivaPreparationItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchItem = async () => {
      try {
        setLoading(true);
        const response = await vivaPreparationService.getById(id);
        setItem(response.data);
      } catch (err: any) {
        const message = err.response?.data?.message || 'Failed to load content';
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  return (
    <div style={{ background: BG }} className="min-h-screen mt-20">
      {/* Sticky top bar */}
      <div
        style={{
          background: `${SURFACE}EE`,
          borderBottom: `1px solid ${BORDER}`,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
        className="sticky top-0 z-20"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-12 flex items-center gap-3">
          <button
            onClick={() => navigate('/viva-preparation')}
            style={{ color: MUTED }}
            className="flex items-center gap-1.5 text-xs hover:opacity-80 transition-opacity"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>
          {item && (
            <>
              <span style={{ color: BORDER, fontSize: 18, lineHeight: 1 }}>│</span>
              <span style={{ color: MUTED }} className="text-xs truncate max-w-[60vw]">
                {item.headline}
              </span>
            </>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 pb-20">
        {loading ? (
          <div className="flex justify-center items-center py-28">
            <Loader2 style={{ color: GOLD }} className="w-5 h-5 animate-spin" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-3 py-28 text-center">
            <AlertCircle className="w-7 h-7 text-red-400" />
            <p style={{ color: MUTED }} className="text-sm">{error}</p>
            <button
              onClick={() => navigate('/viva-preparation')}
              style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }}
              className="px-4 py-2 rounded-xl text-sm hover:opacity-80 transition-opacity"
            >
              Go Back
            </button>
          </div>
        ) : item ? (
          <article>
            {/* Tag + reading time */}
            <div className="flex items-center gap-2 mb-5">
              <div
                style={{ background: `${GOLD}14`, border: `1px solid ${GOLD}22` }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
              >
                <MessageSquare style={{ color: GOLD }} className="w-3 h-3" />
                <span style={{ color: GOLD }} className="text-[11px] font-semibold tracking-wide uppercase">
                  Viva Preparation
                </span>
              </div>
              {item.content && (
                <div className="flex items-center gap-1.5">
                  <Clock style={{ color: MUTED }} className="w-3 h-3" />
                  <span style={{ color: MUTED }} className="text-[11px]">
                    {readingTime(item.content)}
                  </span>
                </div>
              )}
            </div>

            {/* Headline */}
            <h1 style={{ color: TEXT, lineHeight: 1.35 }} className="text-[1.6rem] sm:text-3xl font-bold tracking-tight mb-6">
              {item.headline}
            </h1>

            {/* Divider */}
            <div
              style={{ background: `linear-gradient(to right, ${GOLD}40, transparent)` }}
              className="h-px w-full mb-8"
            />

            {/* Content */}
            <div
              style={{ color: BODY, fontSize: '1rem', lineHeight: 1.85, letterSpacing: '0.01em' }}
              className="whitespace-pre-wrap break-words"
            >
              {item.content}
            </div>

            {/* Bottom nav */}
            <div style={{ borderTop: `1px solid ${BORDER}` }} className="mt-14 pt-6 flex items-center justify-between">
              <button
                onClick={() => navigate('/viva-preparation')}
                style={{ color: MUTED, background: SURFACE, border: `1px solid ${BORDER}` }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm hover:border-[#C49B4B]/30 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to list
              </button>
              <p style={{ color: MUTED }} className="text-xs">
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })
                  : ''}
              </p>
            </div>
          </article>
        ) : null}
      </div>
    </div>
  );
};

export default VivaPreparationDetail;
