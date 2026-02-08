import { useState } from 'react';
import { CircularCard } from '@/components/CircularCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, Bell, SlidersHorizontal } from 'lucide-react';
import { toast } from 'sonner';

const Circulars = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBank, setSelectedBank] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // mock data unchanged
  const circulars = [
    /* same as before */
  ];

  const banks = ['all', ...new Set(circulars.map(c => c.bankName))];
  const locations = [
    'all',
    'Dhaka',
    'Chittagong',
    'Sylhet',
    'Rajshahi',
    'Khulna',
    'All Over Bangladesh',
  ];
  const categories = ['all', 'Officer', 'Executive', 'Trainee', 'Assistant'];

  const filteredCirculars = circulars.filter(circular => {
    const matchesSearch =
      circular.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      circular.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBank =
      selectedBank === 'all' || circular.bankName === selectedBank;
    const matchesLocation =
      selectedLocation === 'all' ||
      circular.location.includes(selectedLocation);
    const matchesCategory =
      selectedCategory === 'all' || circular.category === selectedCategory;

    return matchesSearch && matchesBank && matchesLocation && matchesCategory;
  });

  const handleEnableNotifications = () => {
    toast.success(
      'Notifications enabled! You will receive alerts for new job circulars.',
    );
  };

  return (
    <div className="min-h-screen bg-[#0F0E0D] text-[#E7E5E3]">
      <main className="pt-28 pb-20 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 border-b border-white/10 pb-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                Job Circulars
              </h1>
              <p className="text-sm text-white/60 max-w-xl">
                Verified private bank job opportunities across Bangladesh
              </p>
            </div>

            <Button
              onClick={handleEnableNotifications}
              className="h-11 px-6 bg-white/90 text-black hover:bg-white"
            >
              <Bell className="w-4 h-4 mr-2" />
              Enable Alerts
            </Button>
          </div>

          {/* Filters */}
          <div className="rounded-2xl bg-[#151413] border border-white/10 p-6 space-y-6">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-white/60" />
              <h2 className="text-xs font-semibold tracking-widest uppercase text-white/60">
                Filters
              </h2>
            </div>

            <div className="grid gap-4 lg:grid-cols-4">
              {/* Search */}
              <div className="relative lg:col-span-4">
                <Search className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                <Input
                  placeholder="Search by bank or position"
                  className="pl-10 h-11 bg-[#0F0E0D] border-white/10 text-white placeholder:text-white/40 focus:border-white/30 focus:ring-0"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={selectedBank} onValueChange={setSelectedBank}>
                <SelectTrigger className="h-11 bg-[#0F0E0D] border-white/10 text-white">
                  <SelectValue placeholder="Bank" />
                </SelectTrigger>
                <SelectContent className="bg-[#151413] border-white/10">
                  <SelectItem value="all">All Banks</SelectItem>
                  {banks.slice(1).map(bank => (
                    <SelectItem key={bank} value={bank}>
                      {bank}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger className="h-11 bg-[#0F0E0D] border-white/10 text-white">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent className="bg-[#151413] border-white/10">
                  {locations.map(loc => (
                    <SelectItem key={loc} value={loc}>
                      {loc === 'all' ? 'All Locations' : loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="h-11 bg-[#0F0E0D] border-white/10 text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-[#151413] border-white/10">
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                className="h-11 border-white/15 text-white hover:bg-white/10"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedBank('all');
                  setSelectedLocation('all');
                  setSelectedCategory('all');
                }}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {/* Meta */}
          <div className="flex items-center justify-between text-sm text-white/60">
            <p>
              Showing{' '}
              <span className="font-medium text-white">
                {filteredCirculars.length}
              </span>{' '}
              results
            </p>
            <p>{filteredCirculars.filter(c => c.isNew).length} new this week</p>
          </div>

          {/* Grid */}
          {filteredCirculars.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCirculars.map(circular => (
                <CircularCard key={circular.id} {...circular} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 p-16 text-center bg-[#151413]">
              <p className="text-white/60 mb-4">
                No job circulars match your filters
              </p>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedBank('all');
                  setSelectedLocation('all');
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Circulars;
