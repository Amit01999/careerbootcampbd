import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ExamCard } from '@/components/ExamCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter, SlidersHorizontal, Loader2 } from 'lucide-react';
import { examService } from '@/services/exam.service';
import { toast } from 'sonner';

const Exams = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch exams from API
  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await examService.getExams({
          page: 1,
          limit: 100, // Fetch all exams for now
        });

        // Transform API data to match component expectations
        const transformedExams = response.data.map((exam: any) => ({
          id: exam._id,
          title: exam.title,
          description: exam.description,
          duration: exam.duration,
          questions: exam.totalQuestions,
          totalMarks: exam.totalMarks,
          price: exam.pricing?.price || 0,
          difficulty: exam.sections?.[0]?.difficulty || 'medium',
          category: exam.examType || exam.category,
          isFree: exam.pricing?.isFree || false,
          isPurchased: false, // TODO: Check if user has purchased
        }));

        setExams(transformedExams);
      } catch (err: any) {
        console.error('Failed to fetch exams:', err);
        setError(err.response?.data?.message || 'Failed to load exams');
        toast.error('Failed to load exams. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  // Extract unique categories and difficulties from exams
  const categories = ['all', ...new Set(exams.map(exam => exam.category))];
  const difficulties = ['all', 'easy', 'medium', 'hard', 'mixed'];

  const filteredExams = exams.filter(exam => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || exam.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === 'all' ||
      exam.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow py-8 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Practice Exams</h1>
            <p className="text-xl text-muted-foreground">
              Choose from our extensive collection of bank job preparation exams
            </p>
          </div>

          {/* Filters */}
          <div className="bg-card p-6 rounded-xl border border-border space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Filter Exams</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative md:col-span-3">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search exams..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

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

              {/* Difficulty Filter */}
              <Select
                value={selectedDifficulty}
                onValueChange={setSelectedDifficulty}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map(diff => (
                    <SelectItem key={diff} value={diff}>
                      {diff === 'all' ? 'All Difficulties' : diff}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Reset Button */}
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedDifficulty('all');
                }}
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Results Count */}
          {!loading && !error && (
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground">
                Showing{' '}
                <span className="font-semibold text-foreground">
                  {filteredExams.length}
                </span>{' '}
                exam
                {filteredExams.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-3 text-lg text-muted-foreground">
                Loading exams...
              </span>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-16">
              <p className="text-lg text-destructive mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          )}

          {/* Exams Grid */}
          {!loading && !error && filteredExams.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExams.map(exam => (
                <ExamCard key={exam.id} {...exam} />
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading &&
            !error &&
            filteredExams.length === 0 &&
            exams.length > 0 && (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-4">
                  No exams found matching your criteria
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedDifficulty('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}

          {/* Empty State */}
          {!loading && !error && exams.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">
                No exams available at this time
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Exams;
