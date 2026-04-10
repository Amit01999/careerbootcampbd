import React from 'react';
import { Search, Building2, AlertCircle, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { bankRecruitmentService, BankRecruitmentItem } from '@/services/bankRecruitment.service';

export default function AllRecruitmentProcesses() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [items, setItems] = React.useState<BankRecruitmentItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await bankRecruitmentService.getAll(1, 200);
        setItems(res.data);
      } catch (e: any) {
        setError(e?.response?.data?.message || 'Failed to load recruitments');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const filtered = items.filter((r) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      r.bankName.toLowerCase().includes(q) ||
      r.positionTitle.toLowerCase().includes(q) ||
      (r.details || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#09090B] mt-20">
      {/* Hero Header */}
      <div className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(99,140,255,0.08)_0%,_transparent_60%)]" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px]" />
        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 ">
          <div className="text-center mb-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-full mb-6">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-semibold text-blue-300/90 tracking-wider uppercase">
                Bangladesh's Premier Banking Institutions
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Explore Bank{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400">
                Recruitment Programs
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Discover comprehensive recruitment information, requirements, and
              processes for leading banks in Bangladesh
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 z-10" />
              <Input
                type="text"
                placeholder="Search banks, positions, or keywords..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-14 pr-6 py-7 text-base text-white placeholder:text-gray-500 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm focus:border-blue-500/40 focus:bg-white/[0.06] shadow-xl transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#09090B] to-transparent" />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Results count */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <p className="text-gray-500 text-base font-medium">
              <span className="font-extrabold text-white text-2xl">
                {loading ? '—' : filtered.length}
              </span>{' '}
              {!loading && (filtered.length === 1 ? 'recruitment' : 'recruitments')} available
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="text-red-400 mb-3 flex justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <p className="text-gray-300 font-semibold">Failed to load</p>
            <p className="text-gray-500 text-sm mt-1">{error}</p>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r) => (
              <button
                key={r._id}
                onClick={() => navigate(`/recruitment-processes/${r._id}`)}
                className="text-left group rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.05] transition-colors overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
                      <img src={r.bankLogoUrl} alt={`${r.bankName} logo`} className="w-full h-full object-contain p-2" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white font-extrabold tracking-tight text-lg truncate">{r.bankName}</p>
                      <p className="text-gray-400 font-medium text-sm mt-0.5 truncate">{r.positionTitle}</p>
                    </div>
                  </div>
                  <div className="mt-5">
                    <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold border border-blue-500/25 bg-blue-500/10 text-blue-300">
                      View Details
                    </span>
                  </div>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-600 mb-6">
              <Search className="w-20 h-20 mx-auto" />
            </div>
            <h3 className="text-2xl font-extrabold text-white mb-3">
              No banks found
            </h3>
            <p className="text-gray-400 text-lg font-medium mb-6">
              We couldn't find any banks matching "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-500 transition-colors shadow-lg"
            >
              View All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
