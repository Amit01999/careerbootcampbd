import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Briefcase, Loader2, AlertCircle,
  Clock, BarChart2, Hash, ChevronRight, Building2,
} from 'lucide-react';
import { jobSolutionService, JobSolutionItem } from '@/services/jobSolution.service';
import { toast } from 'sonner';

/* ─── Design tokens ──────────────────────────────────────── */
const BG      = '#111110';
const SURFACE = '#1C1B18';
const CARD    = '#1E1D1B';
const BORDER  = 'rgba(255,255,255,0.07)';
const GOLD    = '#C49B4B';
const TEXT    = '#F0EBE1';
const MUTED   = '#8A8278';

/* ─── Stat pill ──────────────────────────────────────────── */
function Pill({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value?: string | number }) {
  if (value === undefined || value === null || value === '') return null;
  return (
    <div
      style={{ background: `${GOLD}0D`, border: `1px solid ${GOLD}18` }}
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg"
    >
      <Icon style={{ color: GOLD }} className="w-3 h-3 shrink-0" />
      <span style={{ color: MUTED }} className="text-[11px]">{label}</span>
      <span style={{ color: TEXT }} className="text-[11px] font-semibold">{value}</span>
    </div>
  );
}

const JobSolutions = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<JobSolutionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await jobSolutionService.getAll();
        setItems(res.data);
      } catch (err: any) {
        const msg = err.response?.data?.message || 'Failed to load job solutions';
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = items.filter(
    (item) =>
      item.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.post.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ background: BG }} className="min-h-screen mt-20">
      {/* ── Header ── */}
      <div style={{ background: SURFACE, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-3 mb-1">
            <div
              style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}22` }}
              className="w-10 h-10 rounded-xl flex items-center justify-center"
            >
              <Briefcase style={{ color: GOLD }} className="w-5 h-5" />
            </div>
            <h1 style={{ color: TEXT }} className="text-xl font-bold tracking-tight">
              Job Solutions
            </h1>
          </div>
          <p style={{ color: MUTED }} className="text-sm mt-2 ml-[52px]">
            Previous exam question papers with full solutions and answer keys.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* ── Search ── */}
        <div className="py-5">
          <div className="relative">
            <Search style={{ color: MUTED }} className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by bank name or post…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ background: CARD, border: `1px solid ${BORDER}`, color: TEXT, outline: 'none' }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm placeholder:text-[#6A6460] focus:border-[#C49B4B]/40 transition-colors"
            />
          </div>
        </div>

        {/* ── Content ── */}
        <div className="pb-16">
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 style={{ color: GOLD }} className="w-5 h-5 animate-spin" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-3 py-24 text-center">
              <AlertCircle className="w-7 h-7 text-red-400" />
              <p style={{ color: MUTED }} className="text-sm">{error}</p>
              <button
                onClick={() => window.location.reload()}
                style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }}
                className="px-4 py-2 rounded-xl text-sm hover:opacity-80 transition-opacity"
              >
                Retry
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <p style={{ color: MUTED }} className="text-center py-24 text-sm">
              {searchQuery ? 'No results matched your search.' : 'No job solutions available yet.'}
            </p>
          ) : (
            <>
              <p style={{ color: MUTED }} className="text-xs mb-4">
                {filtered.length} solution{filtered.length !== 1 ? 's' : ''} found
              </p>

              {/* Card grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((item) => (
                  <div
                    key={item._id}
                    style={{ background: CARD, border: `1px solid ${BORDER}` }}
                    className="rounded-2xl p-5 flex flex-col gap-4 hover:border-[#C49B4B]/25 transition-all duration-200 group"
                  >
                    {/* Bank + Post */}
                    <div className="flex items-start gap-3">
                      <div
                        style={{ background: `${GOLD}14`, border: `1px solid ${GOLD}20` }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      >
                        <Building2 style={{ color: GOLD }} className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p style={{ color: TEXT }} className="text-sm font-bold truncate">
                          {item.bankName}
                        </p>
                        <p style={{ color: MUTED }} className="text-xs truncate mt-0.5">
                          {item.post}
                        </p>
                      </div>
                    </div>

                    {/* Stats pills */}
                    <div className="flex flex-wrap gap-1.5">
                      <Pill icon={Clock}    label="Time"      value={item.time} />
                      <Pill icon={BarChart2} label="Mark"     value={item.mark} />
                      <Pill icon={Hash}      label="Questions" value={item.totalQuestions} />
                    </div>

                    {/* Divider */}
                    <div style={{ background: BORDER }} className="h-px w-full" />

                    {/* See More */}
                    <button
                      onClick={() => navigate(`/job-solutions/${item._id}`)}
                      style={{ background: `${GOLD}18`, border: `1px solid ${GOLD}30`, color: GOLD }}
                      className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold hover:opacity-80 transition-opacity"
                    >
                      See More
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSolutions;
