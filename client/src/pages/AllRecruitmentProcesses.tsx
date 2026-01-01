import React from 'react';
import { Search, Building2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import BankCard from '@/components/BankCard';
import { banksData } from '@/data/banksData';

export default function AllRecruitmentProcesses() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredBanks = banksData.filter(
    (bank) =>
      bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bank.positions.some((pos) =>
        pos.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F2F6FF] via-[#E7EEFF] to-white">
      {/* Header */}
      <div className="relative bg-white border-b border-gray-200 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-blue-500/5" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                Bangladesh's Premier Banking Institutions
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Explore Bank
              <span className="text-primary"> Recruitment Programs</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover comprehensive recruitment information, requirements, and processes for leading banks in Bangladesh
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search banks, positions, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-14 pr-6 py-7 text-base rounded-2xl border-2 border-gray-200 focus:border-primary shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Results count */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <p className="text-gray-600 text-lg">
              <span className="font-bold text-gray-900 text-2xl">{filteredBanks.length}</span>{' '}
              {filteredBanks.length === 1 ? 'bank' : 'banks'} available
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Clear search
              </button>
            )}
          </div>
        </div>

        {/* Cards Grid */}
        {filteredBanks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBanks.map((bank) => (
              <BankCard
                key={bank.id}
                id={bank.id}
                name={bank.name}
                shortName={bank.shortName}
                logo={bank.logo}
                color={bank.color}
                bgColor={bank.bgColor}
                description={bank.description}
                positions={bank.positions}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-6">
              <Search className="w-20 h-20 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No banks found</h3>
            <p className="text-gray-600 text-lg mb-6">
              We couldn't find any banks matching "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              View All Banks
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
