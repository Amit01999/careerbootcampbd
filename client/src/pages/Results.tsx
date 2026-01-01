import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BookOpen,
  Calendar,
  Award,
  Download,
  Eye,
  Search,
  TrendingUp,
  TrendingDown,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { examService } from '@/services/exam.service';
import { toast } from 'sonner';

const Results = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await examService.getMyAttempts(
          1,
          100,
          undefined,
          filterStatus === 'all' ? undefined : filterStatus.toLowerCase()
        );

        // Transform API data to match component expectations
        const transformedResults = response.data.map((attempt: any) => ({
          id: attempt._id,
          examName: attempt.exam?.title || 'Unknown Exam',
          date: attempt.submittedAt || attempt.createdAt,
          score: attempt.score || 0,
          totalMarks: attempt.exam?.totalMarks || 0,
          percentage: attempt.percentage || 0,
          status: attempt.passed ? 'Passed' : 'Failed',
          timeTaken: attempt.timeTaken
            ? `${Math.floor(attempt.timeTaken / 60)}:${(attempt.timeTaken % 60)
                .toString()
                .padStart(2, '0')}`
            : 'N/A',
          rank: attempt.rank || null,
        }));

        setResults(transformedResults);
      } catch (err: any) {
        console.error('Failed to fetch results:', err);
        const errorMsg =
          err.response?.data?.message || 'Failed to load exam results';
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [filterStatus]);

  const filteredResults = results.filter(result => {
    const matchesSearch = result.examName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const avgScore =
    results.length > 0
      ? results.reduce((acc, r) => acc + r.percentage, 0) / results.length
      : 0;
  const passRate =
    results.length > 0
      ? (results.filter(r => r.status === 'Passed').length / results.length) *
        100
      : 0;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center bg-muted/30">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Loading Results...</h2>
            <p className="text-muted-foreground">
              Please wait while we fetch your exam history
            </p>
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center bg-muted/30">
          <Card className="max-w-md mx-4">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">
                Unable to Load Results
              </h2>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow py-8 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-4xl font-bold mb-2">My Results</h1>
            <p className="text-xl text-muted-foreground">
              View your exam history and performance
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Total Exams
                    </p>
                    <p className="text-3xl font-bold">{results.length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Average Score
                    </p>
                    <p className="text-3xl font-bold">{avgScore.toFixed(1)}%</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-secondary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      Pass Rate
                    </p>
                    <p className="text-3xl font-bold">{passRate.toFixed(0)}%</p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search exams..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Results</SelectItem>
                    <SelectItem value="Passed">Passed</SelectItem>
                    <SelectItem value="Failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Results List */}
          <div className="space-y-4">
            {filteredResults.map(result => (
              <Card
                key={result.id}
                className="transition-smooth hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    {/* Left: Exam Info */}
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1">
                          {result.examName}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(result.date).toLocaleDateString()}
                            </span>
                          </div>
                          <span>Time: {result.timeTaken}</span>
                          {result.rank && <span>Rank: #{result.rank}</span>}
                        </div>
                      </div>
                    </div>

                    {/* Center: Score */}
                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <p className="text-3xl font-bold">
                          {result.percentage}%
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {result.score}/{result.totalMarks}
                        </p>
                      </div>
                      <div>
                        <span
                          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                            result.status === 'Passed'
                              ? 'bg-success/10 text-success'
                              : 'bg-destructive/10 text-destructive'
                          }`}
                        >
                          {result.status === 'Passed' ? (
                            <TrendingUp className="w-4 h-4 mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 mr-1" />
                          )}
                          {result.status}
                        </span>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center space-x-2">
                      <Link to={`/results/${result.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          toast.info('Download feature coming soon!')
                        }
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredResults.length === 0 && (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">
                No results found
              </p>
              <Link to="/exams">
                <Button>Take an Exam</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Results;
