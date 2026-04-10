import { useEffect, useMemo, useState } from 'react';
import { Search, Users, Loader2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { userManagementService, AdminUserRow } from '@/services/userManagement.service';

/* ─── Design tokens ───────────────────────────────────────── */
const CARD = '#1E1D1B';
const BORDER = 'rgba(255,255,255,0.07)';
const GOLD = '#C49B4B';
const TEXT = '#F0EBE1';
const MUTED = '#8A8278';
const INPUT_BG = '#161513';

const iBase = { background: INPUT_BG, border: `1px solid ${BORDER}`, color: TEXT };
const iFoc = { background: INPUT_BG, border: `1px solid ${GOLD}55`, color: TEXT };
const iCls =
  'w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-[#5A5450]';

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

const UsersManagement = () => {
  const [rows, setRows] = useState<AdminUserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  const query = useMemo(() => search.trim(), [search]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await userManagementService.getAll({ page, limit, search: query });
      setRows(res.data);
      setTotalPages(res.pagination.totalPages || 1);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  const onPrev = () => setPage((p) => Math.max(1, p - 1));
  const onNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="space-y-6">
      <div>
        <h1 style={{ color: TEXT }} className="text-lg font-bold tracking-tight">
          User Management
        </h1>
        <p style={{ color: MUTED }} className="text-xs mt-0.5">
          View all registered users (name, email, phone, joined date)
        </p>
      </div>

      <div style={{ borderTop: `1px solid ${BORDER}` }} />

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div
            style={{ background: `${GOLD}14`, border: `1px solid ${GOLD}22`, color: GOLD }}
            className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
          >
            <Users className="w-4 h-4" />
          </div>
          <div>
            <p style={{ color: TEXT }} className="text-sm font-semibold">
              Registered Users
            </p>
            <p style={{ color: MUTED }} className="text-xs">
              Page {page} of {totalPages}
            </p>
          </div>
        </div>

        <div className="w-full sm:w-[380px] relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8278]" />
          <input
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            placeholder="Search by name, email, phone…"
            style={iBase}
            className={`${iCls} pl-10`}
            onFocus={(e) => Object.assign(e.currentTarget.style, iFoc)}
            onBlur={(e) => Object.assign(e.currentTarget.style, iBase)}
          />
        </div>
      </div>

      {/* Table */}
      <div style={{ background: CARD, border: `1px solid ${BORDER}` }} className="rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 style={{ color: GOLD }} className="w-5 h-5 animate-spin" />
          </div>
        ) : rows.length === 0 ? (
          <div className="text-center py-14">
            <div className="flex justify-center mb-3" style={{ color: MUTED }}>
              <AlertCircle className="w-5 h-5" />
            </div>
            <p style={{ color: TEXT }} className="text-sm font-semibold">
              No users found
            </p>
            <p style={{ color: MUTED }} className="text-xs mt-1">
              Try a different search.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full">
              <thead>
                <tr className="text-left text-xs uppercase tracking-widest">
                  <th className="px-5 py-4" style={{ color: MUTED }}>
                    Name
                  </th>
                  <th className="px-5 py-4" style={{ color: MUTED }}>
                    Email
                  </th>
                  <th className="px-5 py-4" style={{ color: MUTED }}>
                    Number
                  </th>
                  <th className="px-5 py-4" style={{ color: MUTED }}>
                    Joined Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((u) => (
                  <tr key={u._id} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4">
                      <div className="min-w-0">
                        <p style={{ color: TEXT }} className="text-sm font-semibold truncate">
                          {u.fullName || `${u.firstName} ${u.lastName}`}
                        </p>
                        <p style={{ color: MUTED }} className="text-xs mt-0.5 truncate">
                          {u.role}
                          {!u.isActive ? ' · inactive' : ''}
                          {u.isBlocked ? ' · blocked' : ''}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p style={{ color: TEXT }} className="text-sm truncate">
                        {u.email}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <p style={{ color: TEXT }} className="text-sm truncate">
                        {u.phone}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <p style={{ color: TEXT }} className="text-sm">
                        {formatDate(u.createdAt)}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={onPrev}
          disabled={page <= 1 || loading}
          className="px-3 py-2 rounded-xl text-sm font-semibold border border-white/10 bg-white/[0.03] text-white/70 disabled:opacity-40"
        >
          <span className="flex items-center gap-1.5">
            <ChevronLeft className="w-4 h-4" />
            Prev
          </span>
        </button>
        <button
          onClick={onNext}
          disabled={page >= totalPages || loading}
          className="px-3 py-2 rounded-xl text-sm font-semibold border border-white/10 bg-white/[0.03] text-white/70 disabled:opacity-40"
        >
          <span className="flex items-center gap-1.5">
            Next
            <ChevronRight className="w-4 h-4" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default UsersManagement;

