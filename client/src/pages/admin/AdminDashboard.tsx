import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { AdminModuleTabs } from '@/components/admin/AdminModuleTabs';
import { adminModules } from '@/config/adminModules';

/* ─── Design tokens ───────────────────────────────────────────────────────── */
const CARD     = '#1E1D1B';
const BORDER   = 'rgba(255,255,255,0.07)';
const GOLD     = '#C49B4B';
const TEXT     = '#F0EBE1';
const MUTED    = '#8A8278';

/* ─── Dashboard ───────────────────────────────────────────────────────────── */
const AdminDashboard = () => {
  const [loadingCounts, setLoadingCounts] = useState(true);
  const [counts, setCounts] = useState<Record<string, number | null>>({});

  const modules = useMemo(() => adminModules, []);

  useEffect(() => {
    const run = async () => {
      try {
        setLoadingCounts(true);
        const entries = await Promise.all(
          modules.map(async (m) => {
            try {
              const c = await m.getCount();
              return [m.key, c] as const;
            } catch {
              return [m.key, null] as const;
            }
          }),
        );
        setCounts(Object.fromEntries(entries));
      } catch (e: any) {
        toast.error(e?.response?.data?.message || 'Failed to load dashboard data');
      } finally {
        setLoadingCounts(false);
      }
    };
    run();
  }, [modules]);

  return (
    <div className="space-y-7">

      {/* ── Hero header ── */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(196,155,75,0.10)_0%,_transparent_55%)]" />
        <div className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#C49B4B]/[0.06] blur-[90px]" />
        <div className="absolute -bottom-28 -left-28 w-[520px] h-[520px] rounded-full bg-[#7C9EE8]/[0.05] blur-[110px]" />
        <div className="relative p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C49B4B]/25 bg-[#C49B4B]/10 text-[#D7B46A] text-[11px] font-bold uppercase tracking-[0.18em]">
                <Sparkles className="w-3.5 h-3.5" />
                Admin Dashboard
              </div>
              <h1 style={{ color: TEXT }} className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
                Manage content, users, and resources
              </h1>
              <p style={{ color: MUTED }} className="text-sm mt-1.5 max-w-2xl">
                Everything here links to real modules. Counts are pulled from live admin APIs and remain safe if any endpoint is unavailable.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40">
                  Modules
                </p>
                <p className="text-lg font-extrabold" style={{ color: TEXT }}>
                  {modules.length}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/40">
                  Status
                </p>
                <p className="text-lg font-extrabold" style={{ color: TEXT }}>
                  {loadingCounts ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" style={{ color: GOLD }} />
                      Loading
                    </span>
                  ) : (
                    'Live'
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="mt-5">
            <p style={{ color: MUTED }} className="text-xs font-semibold uppercase tracking-widest mb-3">
              Modules
            </p>
            <AdminModuleTabs />
          </div>
        </div>
      </div>

      {/* ── Quick navigation cards + real counts ── */}
      <div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 style={{ color: TEXT }} className="text-base font-semibold tracking-tight">
              Quick Navigation
            </h2>
            <p style={{ color: MUTED }} className="text-xs mt-0.5">
              Jump directly into a module. Counts show how many items exist.
            </p>
          </div>
        </div>
        <div className="mt-4" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((m) => {
            const Icon = m.icon;
            const count = counts[m.key];
            return (
              <Link key={m.key} to={m.path}>
                <div
                  style={{ background: CARD, border: `1px solid ${BORDER}` }}
                  className="relative rounded-2xl p-5 overflow-hidden hover:border-[#C49B4B]/25 transition-all duration-200 hover:-translate-y-0.5 group cursor-pointer"
                >
                  {/* glow */}
                  <div
                    className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                    style={{
                      background: `radial-gradient(400px circle at 20% 0%, ${m.accent}25, transparent 55%)`,
                    }}
                  />
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        style={{
                          background: `${m.accent}18`,
                          border: `1px solid ${m.accent}25`,
                        }}
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                      >
                        <Icon style={{ color: m.accent }} className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p style={{ color: TEXT }} className="text-sm font-semibold truncate">
                          {m.label}
                        </p>
                        <p style={{ color: MUTED }} className="text-xs leading-snug mt-1">
                          {m.description}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div
                        style={{ color: TEXT }}
                        className="text-3xl font-extrabold tracking-tight leading-none"
                        title={count === null ? 'Unable to load count' : undefined}
                      >
                        {loadingCounts ? (
                          <span className="inline-flex items-center">
                            <Loader2 className="w-4 h-4 animate-spin" style={{ color: GOLD }} />
                          </span>
                        ) : (
                          count ?? '—'
                        )}
                      </div>
                      <div className="text-[11px] font-semibold uppercase tracking-widest text-white/35 mt-2">
                        total
                      </div>
                    </div>
                  </div>

                  <div className="relative mt-5 flex items-center justify-between">
                    <div className="text-xs font-semibold text-white/35">
                      {loadingCounts ? 'Fetching count…' : count === null ? 'Count unavailable' : 'Up to date'}
                    </div>
                    <div className="flex items-center justify-end text-xs font-semibold" style={{ color: GOLD }}>
                      Open <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
