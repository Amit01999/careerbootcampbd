import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, TrendingUp, Users, Briefcase, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function AllRecruitmentProcesses() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const processes = [
    {
      id: 'mtb-mto',
      title: 'Your MTB MTO Journey',
      bank: 'Mutual Trust Bank',
      position: 'Management Trainee Officer',
      icon: Building2,
      color: '#2E81F7',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'brac-ylp',
      title: 'Be the Next Leader: BRAC Bank Young Leaders Program (YLP)',
      bank: 'BRAC Bank',
      position: 'Young Leaders Program',
      icon: TrendingUp,
      color: '#4CAF50',
      bgColor: 'bg-green-50',
    },
    {
      id: 'ebl-future-leader',
      title: 'YOUR PATH TO BANKING: EBL Future leader',
      bank: 'Eastern Bank Ltd',
      position: 'Future Leader',
      icon: Users,
      color: '#FF9800',
      bgColor: 'bg-orange-50',
    },
    {
      id: 'ific-tso',
      title: 'YOUR PATH TO A JOB: IFIC BANK TSO',
      bank: 'IFIC Bank',
      position: 'Trainee Support Officer',
      icon: Briefcase,
      color: '#9C27B0',
      bgColor: 'bg-purple-50',
    },
    {
      id: 'mercantile-mto',
      title: 'Mercantile Bank MTO Recruitment Process',
      bank: 'Mercantile Bank',
      position: 'Management Trainee Officer',
      icon: Building2,
      color: '#00BCD4',
      bgColor: 'bg-cyan-50',
    },
    {
      id: 'ebl-tao',
      title: 'Eastern Bank Ltd (EBL) – Trainee Assistant Officer (TAO) Recruitment Process',
      bank: 'Eastern Bank Ltd',
      position: 'Trainee Assistant Officer',
      icon: TrendingUp,
      color: '#FF5722',
      bgColor: 'bg-red-50',
    },
    {
      id: 'modhumoti-mto',
      title: 'Modhumoti Bank Ltd – Management Trainee Officer (MTO) Recruitment Process',
      bank: 'Modhumoti Bank Ltd',
      position: 'Management Trainee Officer',
      icon: Users,
      color: '#3F51B5',
      bgColor: 'bg-indigo-50',
    },
    {
      id: 'one-bank-sco',
      title: 'One Bank PLC – Special Cadre Officer Recruitment Process',
      bank: 'One Bank PLC',
      position: 'Special Cadre Officer',
      icon: Briefcase,
      color: '#E91E63',
      bgColor: 'bg-pink-50',
    },
    {
      id: 'trust-bank-mto',
      title: 'Trust Bank PLC – Management Trainee Officer (MTO) Recruitment Process',
      bank: 'Trust Bank PLC',
      position: 'Management Trainee Officer',
      icon: Building2,
      color: '#795548',
      bgColor: 'bg-amber-50',
    },
  ];

  const filteredProcesses = processes.filter(
    (process) =>
      process.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      process.bank.toLowerCase().includes(searchQuery.toLowerCase()) ||
      process.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2F6FF] to-[#E7EEFF]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Bank Recruitment Processes
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete step-by-step guides for Bangladesh's top bank recruitment journeys
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by bank name, position, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-base rounded-xl border-2 border-gray-200 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredProcesses.length}</span> recruitment process{filteredProcesses.length !== 1 ? 'es' : ''}
          </p>
        </div>

        {/* Cards Grid */}
        {filteredProcesses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProcesses.map((process) => (
              <Link
                key={process.id}
                to={`/recruitment-process/${process.id}`}
                className="group block"
              >
                  <div className="relative h-full bg-white border-2 border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:border-primary hover:shadow-xl hover:-translate-y-1">
                    {/* Icon */}
                    <div
                      className={`w-16 h-16 ${process.bgColor} rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
                    >
                      <process.icon
                        className="w-8 h-8"
                        style={{ color: process.color }}
                        strokeWidth={2}
                      />
                    </div>

                    {/* Bank Name */}
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      {process.bank}
                    </div>

                    {/* Position */}
                    <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700 mb-3">
                      {process.position}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 leading-snug mb-4 group-hover:text-primary transition-colors">
                      {process.title}
                    </h3>

                    {/* Arrow indicator */}
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      View Recruitment Journey
                      <ArrowRight className="w-4 h-4" />
                    </div>

                    {/* Accent line */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl transition-all duration-300 opacity-0 group-hover:opacity-100"
                      style={{ backgroundColor: process.color }}
                    />
                  </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or browse all available recruitment processes
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
