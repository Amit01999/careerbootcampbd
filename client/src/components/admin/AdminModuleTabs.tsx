import { Link, useLocation } from 'react-router-dom';
import { adminModules } from '@/config/adminModules';

const BORDER = 'rgba(255,255,255,0.07)';
const GOLD = '#C49B4B';
const TEXT = '#F0EBE1';
const MUTED = '#8A8278';

export const AdminModuleTabs = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <div
      className="flex gap-2 overflow-x-auto no-scrollbar rounded-2xl  bg-white/[0.02] p-2"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {adminModules.map((m) => {
        const active = isActive(m.path);
        return (
          <Link
            key={m.key}
            to={m.path}
            style={{
              border: `1px solid ${active ? 'rgba(196,155,75,0.35)' : BORDER}`,
              background: active ? 'rgba(196,155,75,0.14)' : 'rgba(255,255,255,0.02)',
              color: active ? TEXT : MUTED,
            }}
            className="relative px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors hover:border-[#C49B4B]/25 whitespace-nowrap"
          >
            <span className="inline-flex items-center gap-2">
              <m.icon className="w-4 h-4" style={{ color: active ? GOLD : MUTED }} />
              {m.label}
            </span>
            {active && (
              <span
                className="absolute left-3 right-3 -bottom-[7px] h-[2px] rounded-full"
                style={{ background: GOLD }}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
};

