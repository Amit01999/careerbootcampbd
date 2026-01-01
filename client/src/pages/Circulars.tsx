import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
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

  // Mock data - replace with API call
  const circulars = [
    {
      id: '1',
      bankName: 'Bank Asia Limited',
      position: 'Assistant Officer',
      location: 'Dhaka, Bangladesh',
      deadline: '2025-02-15',
      publishDate: '2025-01-10',
      category: 'Officer',
      isNew: true,
    },
    {
      id: '2',
      bankName: 'IFIC Bank',
      position: 'Senior Officer',
      location: 'Chittagong, Bangladesh',
      deadline: '2025-02-20',
      publishDate: '2025-01-12',
      category: 'Officer',
      isNew: true,
    },
    {
      id: '3',
      bankName: 'Prime Bank Limited',
      position: 'Probationary Officer',
      location: 'Dhaka, Bangladesh',
      deadline: '2025-01-25',
      publishDate: '2025-01-05',
      category: 'Officer',
      isNew: false,
    },
    {
      id: '4',
      bankName: 'Islami Bank Bangladesh Limited',
      position: 'Management Trainee',
      location: 'All Over Bangladesh',
      deadline: '2025-02-10',
      publishDate: '2025-01-08',
      category: 'Trainee',
      isNew: true,
    },
    {
      id: '5',
      bankName: 'Mutual Trust Bank',
      position: 'Junior Officer',
      location: 'Sylhet, Bangladesh',
      deadline: '2025-02-05',
      publishDate: '2025-01-03',
      category: 'Officer',
      isNew: false,
    },
    {
      id: '6',
      bankName: 'Brac Bank Limited',
      position: 'Executive Officer',
      location: 'Dhaka, Bangladesh',
      deadline: '2025-02-25',
      publishDate: '2025-01-14',
      category: 'Executive',
      isNew: true,
    },
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
      'Notifications enabled! You will receive alerts for new job circulars.'
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow py-8 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="text-4xl font-bold mb-2">Job Circulars</h1>
              <p className="text-xl text-muted-foreground">
                Latest private bank job opportunities in Bangladesh
              </p>
            </div>
            <Button
              onClick={handleEnableNotifications}
              className="bg-accent hover:bg-accent-hover"
            >
              <Bell className="w-4 h-4 mr-2" />
              Enable Notifications
            </Button>
          </div>

          {/* Filters */}
          <div className="bg-card p-6 rounded-xl border border-border space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Filter Job Circulars</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative md:col-span-2 lg:col-span-4">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by bank name or position..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Bank Filter */}
              <Select value={selectedBank} onValueChange={setSelectedBank}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Banks</SelectItem>
                  {banks.slice(1).map(bank => (
                    <SelectItem key={bank} value={bank}>
                      {bank}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Location Filter */}
              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(loc => (
                    <SelectItem key={loc} value={loc}>
                      {loc === 'all' ? 'All Locations' : loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Category Filter */}
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Reset Button */}
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedBank('all');
                  setSelectedLocation('all');
                  setSelectedCategory('all');
                }}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing{' '}
              <span className="font-semibold text-foreground">
                {filteredCirculars.length}
              </span>{' '}
              job circular
              {filteredCirculars.length !== 1 ? 's' : ''}
            </p>
            <p className="text-sm text-muted-foreground">
              {filteredCirculars.filter(c => c.isNew).length} new this week
            </p>
          </div>

          {/* Circulars Grid */}
          {filteredCirculars.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCirculars.map(circular => (
                <CircularCard key={circular.id} {...circular} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">
                No job circulars found matching your criteria
              </p>
              <Button
                variant="outline"
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
