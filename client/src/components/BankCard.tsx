import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase } from 'lucide-react';

interface BankCardProps {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  color: string;
  bgColor: string;
  description: string;
  positions: string[];
}

export default function BankCard({
  id,
  name,
  shortName,
  logo,
  color,
  bgColor,
  description,
  positions,
}: BankCardProps) {
  return (
    <Link to={`/bank/${id}`} className="group block h-full">
      <div
        className="relative h-full rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 border"
        style={{
          background:
            'linear-gradient(165deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
          borderColor: 'rgba(255,255,255,0.08)',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = `${color}35`;
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            `0 8px 40px ${color}15, 0 0 0 1px ${color}20`;
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor =
            'rgba(255,255,255,0.08)';
          (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
        }}
      >
        {/* Gradient Header */}
        <div className="h-28 relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${color}18 0%, ${color}08 100%)`,
            }}
          />
          {/* Decorative circles */}
          <div
            className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-15"
            style={{ backgroundColor: color }}
          />
          <div
            className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full opacity-10"
            style={{ backgroundColor: color }}
          />

          {/* Logo */}
          <div className="absolute bottom-4 left-6">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2 border"
              style={{
                background: 'rgba(255,255,255,0.9)',
                borderColor: 'rgba(255,255,255,0.3)',
              }}
            >
              {logo}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pt-7">
          {/* Bank Name */}
          <div className="mb-3">
            <div
              className="text-[10px] font-extrabold uppercase tracking-[0.15em] mb-1.5"
              style={{ color }}
            >
              {shortName}
            </div>
            <h3 className="text-lg font-bold text-white leading-tight group-hover:text-opacity-90 transition-colors">
              {name}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-400 leading-relaxed mb-4 min-h-[40px]">
            {description}
          </p>

          {/* Positions */}
          <div className="mb-5">
            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">
              <Briefcase className="w-3 h-3" />
              Available Positions
            </div>
            <div className="flex flex-wrap gap-1.5">
              {positions.map((position, index) => (
                <span
                  key={index}
                  className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all duration-300"
                  style={{
                    backgroundColor: `${color}10`,
                    borderColor: `${color}20`,
                    color: color,
                  }}
                >
                  {position}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div
            className="flex items-center gap-2 text-sm font-bold opacity-60 group-hover:opacity-100 transition-all duration-300"
            style={{ color }}
          >
            View Details
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-500 opacity-0 group-hover:opacity-100"
          style={{
            background: `linear-gradient(to right, transparent, ${color}, transparent)`,
          }}
        />
      </div>
    </Link>
  );
}
