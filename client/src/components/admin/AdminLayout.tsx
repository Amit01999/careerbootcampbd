import { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileQuestion,
  BookOpen,
  FileText,
  Users,
  DollarSign,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  PenLine,
  MessageSquare,
  Briefcase,
  ClipboardCheck,
  Landmark 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

/* ─── Design tokens ───────────────────────────────────────────────────────── */
const BG      = '#111110';
const NAV     = '#171614';
const SIDEBAR = '#151412';
const BORDER  = 'rgba(255,255,255,0.07)';
const GOLD    = '#C49B4B';
const TEXT    = '#F0EBE1';
const MUTED   = '#8A8278';
const ACTIVE_BG   = 'rgba(196,155,75,0.14)';
const ACTIVE_BORDER = 'rgba(196,155,75,0.35)';
const HOVER_BG  = 'rgba(255,255,255,0.04)';

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard',        path: '/admin' },
    // { icon: FileQuestion,    label: 'Question Bank',    path: '/admin/questions' },
    // { icon: BookOpen,        label: 'Exam Management',  path: '/admin/exams' },
    // { icon: FileText,        label: 'Job Circulars',    path: '/admin/circulars' },
    { icon: PenLine,         label: 'Preli & Written',  path: '/admin/preli-written' },
    { icon: MessageSquare,   label: 'Viva Preparation', path: '/admin/viva-preparation' },
    { icon: Briefcase,       label: 'Job Solutions',    path: '/admin/job-solutions' },
    { icon: ClipboardCheck,  label: 'Model Tests',      path: '/admin/model-tests' },
    {icon: Landmark, label: 'Bank Recruitment',         path: '/admin/bank-recruitment'
    },
    { icon: Users,           label: 'User Management',  path: '/admin/users' },
    // { icon: DollarSign,      label: 'Payment Logs',     path: '/admin/payments' },
    // { icon: Bell,            label: 'Notifications',    path: '/admin/notifications' },
    // { icon: Settings,        label: 'System Settings',  path: '/admin/settings' },
  ];

  const isActive = (path: string) =>
    path === '/admin'
      ? location.pathname === '/admin'
      : location.pathname.startsWith(path);

  return (
    <div style={{ background: BG }} className="min-h-screen">

      {/* ── Top nav ── */}
      <nav
        style={{
          background: NAV,
          borderBottom: `1px solid ${BORDER}`,
          backdropFilter: 'blur(12px)',
        }}
        className="sticky top-0 z-50 h-14"
      >
        <div className="px-4 h-full flex items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-1.5 rounded-lg hover:opacity-70 transition-opacity"
              style={{ color: MUTED }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/admin" className="flex items-center gap-2.5">
              <div
                style={{ background: `${GOLD}22`, border: `1px solid ${GOLD}33` }}
                className="w-8 h-8 rounded-xl flex items-center justify-center"
              >
                <BookOpen style={{ color: GOLD }} className="w-4 h-4" />
              </div>
              <span style={{ color: TEXT }} className="text-sm font-bold tracking-tight">
                PBB Admin
              </span>
            </Link>
          </div>

          {/* Right */}
          <div className="flex items-center gap-1">
            <button
              style={{ color: MUTED }}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:opacity-70 transition-opacity"
            >
              <Bell className="w-4 h-4" />
            </button>
            <button
              style={{ color: MUTED }}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:opacity-70 transition-opacity disabled:opacity-40"
              onClick={async () => {
                try {
                  setLoggingOut(true);
                  await logout();
                  navigate('/auth');
                } catch (e: any) {
                  toast.error(e?.response?.data?.message || 'Logout failed');
                } finally {
                  setLoggingOut(false);
                }
              }}
              disabled={loggingOut}
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* ── Sidebar ── */}
        <aside
          style={{
            background: SIDEBAR,
            borderRight: `1px solid ${BORDER}`,
          }}
          className={`
            fixed lg:sticky top-14 left-0 h-[calc(100vh-3.5rem)] w-60
            transition-transform duration-300 z-40 flex flex-col
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3">
            {menuItems.map((item) => {
              const Icon   = item.icon;
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  style={{
                    background: active ? ACTIVE_BG : 'transparent',
                    border: `1px solid ${active ? ACTIVE_BORDER : 'transparent'}`,
                    color: active ? GOLD : MUTED,
                  }}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-150 group hover:opacity-100"
                  onMouseEnter={e => {
                    if (!active) (e.currentTarget as HTMLElement).style.background = HOVER_BG;
                  }}
                  onMouseLeave={e => {
                    if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent';
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span
                      className="text-sm font-medium"
                      style={{ color: active ? TEXT : MUTED }}
                    >
                      {item.label}
                    </span>
                  </div>
                  {active && (
                    <ChevronRight style={{ color: GOLD }} className="w-3.5 h-3.5 shrink-0" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Sidebar footer */}
          <div
            style={{ borderTop: `1px solid ${BORDER}` }}
            className="px-3 py-3"
          >
            <p style={{ color: MUTED }} className="text-[10px] text-center">
              Private Bank Bootcamp · Admin
            </p>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main
          style={{ background: BG }}
          className="flex-grow p-5 lg:p-8 min-h-[calc(100vh-3.5rem)]"
        >
          <Outlet />
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};
