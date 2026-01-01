import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Award,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  TrendingUp,
  Download,
  Home,
  RotateCcw,
  Loader2,
  AlertTriangle,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { examService } from '@/services/exam.service';
import { toast } from 'sonner';

const ExamResult = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      if (!attemptId) {
        setError('Result ID is missing');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await examService.getAttemptResult(attemptId);
        setResult(data);
      } catch (err: any) {
        console.error('Failed to fetch result:', err);
        const errorMsg =
          err.response?.data?.message || 'Failed to load exam result';
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [attemptId]);

  const handleDownloadReport = () => {
    toast.info('Download feature coming soon!');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center bg-muted/30">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Loading Results...</h2>
            <p className="text-muted-foreground">
              Please wait while we fetch your exam results
            </p>
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (error || !result) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex items-center justify-center bg-muted/30">
          <Card className="max-w-md mx-4">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">
                Unable to Load Results
              </h2>
              <p className="text-muted-foreground mb-6">
                {error || 'Failed to load exam results. Please try again.'}
              </p>
              <Button onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  // Calculate statistics from result
  const totalQuestions = result.totalQuestions || 0;
  const correctAnswers = result.correctAnswers || 0;
  const wrongAnswers = result.wrongAnswers || 0;
  const unanswered = result.unanswered || 0;
  const score = result.score || 0;
  const percentage = result.percentage || 0;
  const isPassed = result.passed || false;

  // Format time taken
  const timeTaken = result.timeTaken
    ? `${Math.floor(result.timeTaken / 60)}:${(result.timeTaken % 60)
        .toString()
        .padStart(2, '0')}`
    : 'N/A';

  // Subject-wise analysis
  const subjectWise = result.subjectAnalysis
    ? Object.entries(result.subjectAnalysis).map(
        ([subject, data]: [string, any]) => ({
          subject:
            subject.charAt(0).toUpperCase() +
            subject.slice(1).replace('_', ' '),
          correct: data.correct || 0,
          total: data.total || 0,
          percentage:
            data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
        })
      )
    : [];

  // Questions with answers for review
  const questionsReview = result.answers || [];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow py-8 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Result Header */}
          <Card
            className={`shadow-2xl ${
              isPassed ? 'border-success' : 'border-destructive'
            }`}
          >
            <CardContent className="p-8">
              <div className="text-center space-y-6">
                {/* Pass/Fail Icon */}
                <div
                  className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center ${
                    isPassed ? 'bg-success/10' : 'bg-destructive/10'
                  }`}
                >
                  {isPassed ? (
                    <CheckCircle className="w-16 h-16 text-success" />
                  ) : (
                    <XCircle className="w-16 h-16 text-destructive" />
                  )}
                </div>

                {/* Result Status */}
                <div>
                  <h1
                    className={`text-4xl font-bold mb-2 ${
                      isPassed ? 'text-success' : 'text-destructive'
                    }`}
                  >
                    {isPassed ? 'Congratulations! 🎉' : 'Keep Trying! 💪'}
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    {isPassed
                      ? 'You have successfully passed the exam'
                      : 'You need to score at least 60% to pass'}
                  </p>
                </div>

                {/* Score Display */}
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 inline-block">
                  <div className="text-6xl font-bold mb-2">
                    {percentage.toFixed(1)}%
                  </div>
                  <p className="text-lg text-muted-foreground">
                    {score.toFixed(2)} out of {totalQuestions} marks
                  </p>
                </div>

                {/* Auto Submit Warning */}
                {result.autoSubmitted && (
                  <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                    <p className="text-warning font-medium">
                      ⏰ This exam was auto-submitted due to time expiry
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-8 h-8 text-success mx-auto mb-2" />
                <p className="text-3xl font-bold text-success">
                  {correctAnswers}
                </p>
                <p className="text-sm text-muted-foreground">Correct</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <XCircle className="w-8 h-8 text-destructive mx-auto mb-2" />
                <p className="text-3xl font-bold text-destructive">
                  {wrongAnswers}
                </p>
                <p className="text-sm text-muted-foreground">Wrong</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Target className="w-8 h-8 text-warning mx-auto mb-2" />
                <p className="text-3xl font-bold text-warning">{unanswered}</p>
                <p className="text-sm text-muted-foreground">Unanswered</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 text-info mx-auto mb-2" />
                <p className="text-3xl font-bold text-info">{timeTaken}</p>
                <p className="text-sm text-muted-foreground">Time Taken</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analysis */}
          <Tabs defaultValue="subject" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="subject">Subject-wise Analysis</TabsTrigger>
              <TabsTrigger value="answers">Answer Review</TabsTrigger>
            </TabsList>

            <TabsContent value="subject" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Subject-wise Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {subjectWise.map(subject => (
                    <div key={subject.subject} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{subject.subject}</h4>
                          <p className="text-sm text-muted-foreground">
                            {subject.correct}/{subject.total} correct
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">
                            {subject.percentage}%
                          </p>
                        </div>
                      </div>
                      <Progress value={subject.percentage} className="h-3" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="answers" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Answer Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Review your answers with detailed explanations for each
                    question
                  </p>
                  {questionsReview.length > 0 ? (
                    <div className="space-y-4 max-h-[600px] overflow-y-auto">
                      {questionsReview.map((item: any, index: number) => {
                        const isCorrect = item.isCorrect;
                        const wasAnswered =
                          item.selectedOption !== undefined &&
                          item.selectedOption !== null;

                        return (
                          <div
                            key={item.question?._id || index}
                            className={`p-4 rounded-lg border-2 ${
                              isCorrect
                                ? 'border-success/30 bg-success/5'
                                : wasAnswered
                                ? 'border-destructive/30 bg-destructive/5'
                                : 'border-warning/30 bg-warning/5'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <p className="font-medium">
                                  Question {index + 1}
                                </p>
                                <span className="text-xs px-2 py-1 rounded bg-muted">
                                  {item.question?.subject || 'N/A'}
                                </span>
                              </div>
                              {isCorrect ? (
                                <CheckCircle className="w-5 h-5 text-success" />
                              ) : wasAnswered ? (
                                <XCircle className="w-5 h-5 text-destructive" />
                              ) : (
                                <Target className="w-5 h-5 text-warning" />
                              )}
                            </div>

                            <p className="text-sm mb-3 leading-relaxed">
                              {item.question?.questionText ||
                                'Question not available'}
                            </p>

                            {/* Options */}
                            <div className="space-y-2 mb-3">
                              {item.question?.options?.map(
                                (option: any, optIndex: number) => {
                                  const isUserAnswer =
                                    item.selectedOption === optIndex;
                                  const isCorrectOption = option.isCorrect;

                                  return (
                                    <div
                                      key={optIndex}
                                      className={`p-2 rounded text-sm ${
                                        isCorrectOption
                                          ? 'bg-success/20 border border-success/40'
                                          : isUserAnswer
                                          ? 'bg-destructive/20 border border-destructive/40'
                                          : 'bg-muted/50'
                                      }`}
                                    >
                                      <div className="flex items-start space-x-2">
                                        <span className="font-medium min-w-[20px]">
                                          {String.fromCharCode(65 + optIndex)}.
                                        </span>
                                        <span className="flex-grow">
                                          {option.text}
                                        </span>
                                        {isCorrectOption && (
                                          <CheckCircle className="w-4 h-4 text-success" />
                                        )}
                                        {isUserAnswer && !isCorrectOption && (
                                          <XCircle className="w-4 h-4 text-destructive" />
                                        )}
                                      </div>
                                    </div>
                                  );
                                }
                              )}
                            </div>

                            {/* Status and Explanation */}
                            <div className="space-y-2">
                              <div className="text-sm">
                                {wasAnswered ? (
                                  <p
                                    className={
                                      isCorrect
                                        ? 'text-success'
                                        : 'text-destructive'
                                    }
                                  >
                                    <strong>Your Answer:</strong>{' '}
                                    {String.fromCharCode(
                                      65 + item.selectedOption
                                    )}{' '}
                                    {isCorrect
                                      ? '(Correct ✓)'
                                      : '(Incorrect ✗)'}
                                  </p>
                                ) : (
                                  <p className="text-warning">
                                    <strong>Not Answered</strong>
                                  </p>
                                )}
                              </div>

                              {item.question?.explanation && (
                                <div className="bg-muted/50 rounded p-3">
                                  <p className="text-xs font-semibold mb-1 text-muted-foreground">
                                    Explanation:
                                  </p>
                                  <p className="text-sm">
                                    {item.question.explanation}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      No answer details available
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={handleDownloadReport} variant="outline">
              <Download className="w-5 h-5 mr-2" />
              Download Report
            </Button>
            <Link to="/dashboard">
              <Button size="lg" variant="outline">
                <Home className="w-5 h-5 mr-2" />
                Go to Dashboard
              </Button>
            </Link>
            <Link to="/exams">
              <Button size="lg" className="bg-primary hover:bg-primary-hover">
                <RotateCcw className="w-5 h-5 mr-2" />
                Take Another Exam
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExamResult;
