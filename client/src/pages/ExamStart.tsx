import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Clock,
  FileQuestion,
  Award,
  AlertCircle,
  CheckCircle,
  XCircle,
  Play,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { examService } from '@/services/exam.service';
import { toast } from 'sonner';

const ExamStart = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExam = async () => {
      if (!examId) {
        setError('Exam ID is missing');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await examService.getExam(examId);
        setExam(data);
      } catch (err: any) {
        console.error('Failed to fetch exam:', err);
        const errorMsg = err.response?.data?.message || 'Failed to load exam details';
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [examId]);

  const handleStartExam = () => {
    navigate(`/exam/${examId}/taking`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-muted/30">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Loading Exam Details...</h2>
            <p className="text-muted-foreground">Please wait while we prepare your exam</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !exam) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-muted/30">
          <Card className="max-w-md mx-4">
            <CardContent className="p-8 text-center">
              <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Unable to Load Exam</h2>
              <p className="text-muted-foreground mb-6">
                {error || 'Failed to load exam details. Please try again.'}
              </p>
              <Button onClick={() => navigate('/exams')}>Back to Exams</Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  // Extract exam information
  const hasNegativeMarking = exam.sections?.some((section: any) => section.negativeMarking?.enabled);
  const negativeMarks = exam.sections?.find((section: any) => section.negativeMarking?.enabled)
    ?.negativeMarking?.marksPerWrong || 0.25;

  // Parse instructions (convert string to array if needed)
  const instructions = typeof exam.instructions === 'string'
    ? exam.instructions.split('\n').filter((line: string) => line.trim())
    : Array.isArray(exam.instructions)
    ? exam.instructions
    : [
        'Read each question carefully before selecting your answer',
        'You can skip questions and return to them later',
        hasNegativeMarking ? `Negative marking of ${negativeMarks} marks for each wrong answer` : '',
        'The exam will auto-submit when time runs out',
        'Ensure stable internet connection throughout the exam',
        'Do not refresh or close the browser during the exam',
      ].filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Exam Header */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="space-y-4">
                <h1 className="text-3xl font-bold">{exam.title}</h1>
                <p className="text-lg text-muted-foreground">{exam.description}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-primary/10">
                  <Clock className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-bold">{exam.duration || 0} min</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-secondary/10">
                  <FileQuestion className="w-6 h-6 text-secondary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Questions</p>
                    <p className="font-bold">{exam.totalQuestions || 0}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-accent/10">
                  <Award className="w-6 h-6 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Marks</p>
                    <p className="font-bold">{exam.totalMarks || 0}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 rounded-lg bg-success/10">
                  <CheckCircle className="w-6 h-6 text-success" />
                  <div>
                    <p className="text-sm text-muted-foreground">Pass Marks</p>
                    <p className="font-bold">{exam.passingMarks || 0}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Negative Marking Alert */}
          {hasNegativeMarking && (
            <Alert className="border-warning bg-warning/10">
              <XCircle className="h-4 w-4 text-warning" />
              <AlertDescription className="text-warning-foreground">
                <strong>Negative Marking:</strong> Each wrong answer will deduct {negativeMarks} marks
              </AlertDescription>
            </Alert>
          )}

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                <span>Exam Instructions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {exam.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-muted-foreground">{instruction}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Ready to Start */}
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto">
                <Play className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Ready to Begin?</h3>
                <p className="text-muted-foreground">
                  Make sure you have read all instructions carefully before starting
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button
                  size="lg"
                  onClick={handleStartExam}
                  className="bg-primary hover:bg-primary-hover text-lg px-8"
                >
                  Start Exam Now
                  <Play className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/exams')}
                  className="text-lg px-8"
                >
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ExamStart;
