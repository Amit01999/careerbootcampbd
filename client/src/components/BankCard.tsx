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
      <div className="relative h-full bg-white border-2 border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-2xl hover:-translate-y-2">
        {/* Gradient Header */}
        <div
          className={`h-32 ${bgColor} relative overflow-hidden`}
          style={{
            background: `linear-gradient(135deg, ${color}15 0%, ${color}30 100%)`,
          }}
        >
          {/* Decorative circles */}
          <div
            className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20"
            style={{ backgroundColor: color }}
          />
          <div
            className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full opacity-10"
            style={{ backgroundColor: color }}
          />

          {/* Logo */}
          <div className="absolute bottom-4 left-6">
            <div
              className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
            >
              {logo}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pt-8">
          {/* Bank Name */}
          <div className="mb-2">
            <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color }}>
              {shortName}
            </div>
            <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-primary transition-colors">
              {name}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed mb-4 min-h-[40px]">
            {description}
          </p>

          {/* Positions */}
          <div className="mb-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-2">
              <Briefcase className="w-3.5 h-3.5" />
              Available Positions
            </div>
            <div className="flex flex-wrap gap-2">
              {positions.map((position, index) => (
                <span
                  key={index}
                  className="inline-block px-3 py-1.5 bg-gray-100 rounded-full text-xs font-medium text-gray-700 group-hover:bg-primary group-hover:text-white transition-colors"
                >
                  {position}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color }}>
            View Requirements & Process
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1.5 transition-all duration-300 opacity-0 group-hover:opacity-100"
          style={{ backgroundColor: color }}
        />
      </div>
    </Link>
  );
}
