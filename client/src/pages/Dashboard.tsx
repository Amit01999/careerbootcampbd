import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  Calendar,
  ArrowRight,
  Loader2,
  BarChart2,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { examService } from '@/services/exam.service';
import { toast } from 'sonner';

/* ─── Design tokens ──────────────────────────────────────────────────────── */
const BG       = '#111110';
const SURFACE  = '#1C1B18';
const CARD     = '#1E1D1B';
const BORDER   = 'rgba(255,255,255,0.07)';
const GOLD     = '#C49B4B';
const GOLD_DIM = 'rgba(196,155,75,0.12)';
const TEXT     = '#F0EBE1';
const MUTED    = '#8A8278';

/* ─── Stat Card ──────────────────────────────────────────────────────────── */
function StatCard({
  title,
  value,
  icon: Icon,
  accent = GOLD,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  accent?: string;
}) {
  return (
    <div
      style={{ background: CARD, border: `1px solid ${BORDER}` }}
      className="rounded-2xl p-5 flex items-center gap-4"
    >
      <div
        style={{ background: `${accent}18`, border: `1px solid ${accent}22` }}
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
      >
        <Icon style={{ color: accent }} className="w-5 h-5" />
      </div>
      <div>
        <p style={{ color: MUTED }} className="text-xs font-medium tracking-wide uppercase mb-0.5">
          {title}
        </p>
        <p style={{ color: TEXT }} className="text-2xl font-bold tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );
}

/* ─── Tooltip style for charts ───────────────────────────────────────────── */
const chartTooltipStyle = {
  backgroundColor: SURFACE,
  border: `1px solid ${BORDER}`,
  borderRadius: '10px',
  color: TEXT,
  fontSize: 13,
};

/* ─── Dashboard ─────────────────────────────────────────────────────────── */
const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await examService.getDashboardStats();
        setStats(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load dashboard');
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardStats();
  }, []);

  const performanceData = stats?.performanceData || [];
  const subjectData     = stats?.subjectPerformance || [];
  const recentExams     = stats?.recentAttempts || [];

  return (
    <div style={{ background: BG }} className="min-h-screen mt-20">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">

        {/* ── Page header ── */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 style={{ color: TEXT }} className="text-2xl font-bold tracking-tight">
              My Dashboard
            </h1>
            <p style={{ color: MUTED }} className="text-sm mt-1">
              Track your progress and performance at a glance
            </p>
          </div>
          {/* <Link to="/exams">
            <button
              style={{ background: GOLD, color: '#0A0A0A' }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Take New Exam
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link> */}
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="flex items-center justify-center py-20 gap-3">
            <Loader2 style={{ color: GOLD }} className="w-6 h-6 animate-spin" />
            <span style={{ color: MUTED }} className="text-sm">
              Loading dashboard…
            </span>
          </div>
        )}

        {/* ── Error ── */}
        {error && !loading && (
          <div className="text-center py-20">
            <p style={{ color: '#EF4444' }} className="text-sm mb-4">{error}</p>
            <button
              style={{ background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT }}
              className="px-4 py-2 rounded-xl text-sm hover:opacity-80 transition-opacity"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* ── Stat cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="Exams Completed" value={stats?.totalAttempts || 0}     icon={BookOpen}   />
              <StatCard title="Average Score"   value={`${stats?.averageScore || 0}%`} icon={Award}      accent="#7C9EE8" />
              <StatCard title="Study Hours"     value={`${stats?.totalStudyHours || 0}h`} icon={Clock}  accent="#7EC89A" />
              <StatCard title="Topics Covered"  value={stats?.subjectsCount || 0}     icon={TrendingUp} accent="#E8946A" />
            </div>

            {/* ── Charts row ── */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Performance Trend */}
              <div
                style={{ background: CARD, border: `1px solid ${BORDER}` }}
                className="rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-5">
                  <TrendingUp style={{ color: GOLD }} className="w-4 h-4" />
                  <h2 style={{ color: TEXT }} className="text-sm font-semibold">
                    Performance Trend
                  </h2>
                </div>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%"  stopColor={GOLD} stopOpacity={0.25} />
                        <stop offset="95%" stopColor={GOLD} stopOpacity={0}    />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={BORDER} />
                    <XAxis dataKey="name" stroke={MUTED} tick={{ fontSize: 11 }} />
                    <YAxis stroke={MUTED} tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={chartTooltipStyle} />
                    <Area
                      type="monotone"
                      dataKey="score"
                      stroke={GOLD}
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#goldGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Subject-wise */}
              <div
                style={{ background: CARD, border: `1px solid ${BORDER}` }}
                className="rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-5">
                  <BarChart2 style={{ color: GOLD }} className="w-4 h-4" />
                  <h2 style={{ color: TEXT }} className="text-sm font-semibold">
                    Subject-wise Performance
                  </h2>
                </div>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={subjectData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={BORDER} />
                    <XAxis dataKey="subject" stroke={MUTED} tick={{ fontSize: 11 }} />
                    <YAxis stroke={MUTED} tick={{ fontSize: 11 }} />
                    <Tooltip contentStyle={chartTooltipStyle} />
                    <Bar dataKey="score" fill={GOLD} radius={[6, 6, 0, 0]} opacity={0.85} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* ── Subject mastery ── */}
            {subjectData.length > 0 && (
              <div
                style={{ background: CARD, border: `1px solid ${BORDER}` }}
                className="rounded-2xl p-6"
              >
                <h2 style={{ color: TEXT }} className="text-sm font-semibold mb-5">
                  Subject Mastery
                </h2>
                <div className="space-y-4">
                  {subjectData.map((s: any) => (
                    <div key={s.subject}>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span style={{ color: TEXT }} className="font-medium">{s.subject}</span>
                        <span style={{ color: MUTED }}>{s.score}%</span>
                      </div>
                      <div style={{ background: SURFACE, borderRadius: 99 }} className="h-2 w-full overflow-hidden">
                        <div
                          style={{ width: `${s.score}%`, background: GOLD, borderRadius: 99 }}
                          className="h-full transition-all duration-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Recent exams ── */}
            <div
              style={{ background: CARD, border: `1px solid ${BORDER}` }}
              className="rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 style={{ color: TEXT }} className="text-sm font-semibold">
                  Recent Exams
                </h2>
                <Link to="/results">
                  <span
                    style={{ color: GOLD }}
                    className="text-xs font-medium hover:opacity-80 flex items-center gap-1"
                  >
                    View All <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              </div>

              {recentExams.length === 0 ? (
                <p style={{ color: MUTED }} className="text-sm text-center py-8">
                  No exams taken yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {recentExams.map((exam: any) => (
                    <div
                      key={exam.id}
                      style={{ background: SURFACE, border: `1px solid ${BORDER}` }}
                      className="flex items-center justify-between p-4 rounded-xl hover:border-[#C49B4B]/25 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          style={{ background: GOLD_DIM, border: `1px solid ${GOLD}22` }}
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        >
                          <BookOpen style={{ color: GOLD }} className="w-4 h-4" />
                        </div>
                        <div>
                          <p style={{ color: TEXT }} className="text-sm font-medium">
                            {exam.name}
                          </p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Calendar style={{ color: MUTED }} className="w-3 h-3" />
                            <span style={{ color: MUTED }} className="text-xs">
                              {new Date(exam.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p style={{ color: TEXT }} className="text-lg font-bold">
                          {exam.score}
                          <span style={{ color: MUTED }} className="text-sm font-normal">
                            /{exam.total}
                          </span>
                        </p>
                        <span
                          className="text-xs font-medium"
                          style={{ color: exam.status === 'Passed' ? '#7EC89A' : '#EF8888' }}
                        >
                          {exam.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Empty state ── */}
            {/* {stats?.totalAttempts === 0 && (
              <div
                style={{ background: CARD, border: `1px solid ${BORDER}` }}
                className="rounded-2xl p-14 text-center"
              >
                <div
                  style={{ background: GOLD_DIM, border: `1px solid ${GOLD}22` }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                >
                  <BookOpen style={{ color: GOLD }} className="w-7 h-7" />
                </div>
                <h3 style={{ color: TEXT }} className="text-lg font-semibold mb-2">
                  No Exam Attempts Yet
                </h3>
                <p style={{ color: MUTED }} className="text-sm mb-6 max-w-xs mx-auto">
                  Start taking exams to see your performance analytics here!
                </p>
                <Link to="/exams">
                  <button
                    style={{ background: GOLD, color: '#0A0A0A' }}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
                  >
                    Browse Exams
                  </button>
                </Link>
              </div>
            )} */}
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
