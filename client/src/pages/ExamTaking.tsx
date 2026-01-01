import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
  CheckCircle,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { examService } from '@/services/exam.service';
import { toast } from 'sonner';

interface Question {
  id: string;
  questionText: string;
  options: string[];
  subject: string;
}

const ExamTaking = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  // Exam data state
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [exam, setExam] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Exam taking state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Auto-save state
  const [lastSaved, setLastSaved] = useState<Date>(new Date());

  // Fetch exam and start attempt
  useEffect(() => {
    const startExamAttempt = async () => {
      if (!examId) {
        setError('Exam ID is missing');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await examService.startExam(examId);

        setAttemptId(response.attemptId);
        setExam(response.exam);

        // Transform questions to match component format
        const transformedQuestions: Question[] = response.questions.map((q: any) => ({
          id: q._id,
          questionText: q.questionText,
          options: q.options.map((opt: any) => opt.text),
          subject: q.subject,
        }));

        setQuestions(transformedQuestions);

        // Calculate time remaining from exam duration
        const expiresAt = new Date(response.expiresAt);
        const now = new Date();
        const secondsRemaining = Math.floor((expiresAt.getTime() - now.getTime()) / 1000);
        setTimeRemaining(Math.max(0, secondsRemaining));

        toast.success('Exam started successfully!');
      } catch (err: any) {
        console.error('Failed to start exam:', err);
        const errorMsg = err.response?.data?.message || 'Failed to start exam';
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    startExamAttempt();
  }, [examId]);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining <= 0 || loading) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, loading]);

  // Auto-save progress every 30 seconds
  useEffect(() => {
    if (!attemptId || loading || Object.keys(answers).length === 0) return;

    const autoSaveInterval = setInterval(async () => {
      try {
        const answerArray = Object.entries(answers).map(([questionIndex, optionIndex]) => ({
          question: questions[parseInt(questionIndex)].id,
          selectedOption: optionIndex,
        }));

        await examService.saveProgress(attemptId, { answers: answerArray });
        setLastSaved(new Date());
      } catch (err) {
        console.error('Auto-save failed:', err);
        // Don't show error toast for auto-save failures to avoid annoying user
      }
    }, 30000); // Save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [attemptId, answers, questions, loading]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setAnswers({ ...answers, [currentQuestion]: optionIndex });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFlagQuestion = () => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(currentQuestion)) {
      newFlagged.delete(currentQuestion);
    } else {
      newFlagged.add(currentQuestion);
    }
    setFlaggedQuestions(newFlagged);
  };

  const handleAutoSubmit = async () => {
    if (!attemptId) return;

    try {
      setSubmitting(true);

      const answerArray = Object.entries(answers).map(([questionIndex, optionIndex]) => ({
        question: questions[parseInt(questionIndex)].id,
        selectedOption: optionIndex,
      }));

      await examService.submitExam(attemptId, { answers: answerArray });
      toast.info('Time expired. Exam auto-submitted.');
      navigate(`/results/${attemptId}`);
    } catch (err: any) {
      console.error('Failed to auto-submit exam:', err);
      toast.error('Failed to submit exam. Please try again.');
      setSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    if (!attemptId) return;

    try {
      setShowSubmitDialog(false);
      setSubmitting(true);

      const answerArray = Object.entries(answers).map(([questionIndex, optionIndex]) => ({
        question: questions[parseInt(questionIndex)].id,
        selectedOption: optionIndex,
      }));

      await examService.submitExam(attemptId, { answers: answerArray });
      toast.success('Exam submitted successfully!');
      navigate(`/results/${attemptId}`);
    } catch (err: any) {
      console.error('Failed to submit exam:', err);
      toast.error(err.response?.data?.message || 'Failed to submit exam. Please try again.');
      setSubmitting(false);
    }
  };

  const answeredCount = Object.keys(answers).length;
  const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Starting Exam...</h2>
          <p className="text-muted-foreground">Please wait while we prepare your questions</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !attemptId || questions.length === 0) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Unable to Start Exam</h2>
            <p className="text-muted-foreground mb-6">
              {error || 'Failed to load exam questions. Please try again.'}
            </p>
            <Button onClick={() => navigate('/exams')}>Back to Exams</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Submitting state overlay
  if (submitting) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Submitting Exam...</h2>
          <p className="text-muted-foreground">Please wait while we process your answers</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Fixed Header */}
      <div className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-bold">{exam?.title || 'Exam'}</h1>
              <div className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Timer */}
              <div
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  timeRemaining < 300 ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
                }`}
              >
                <Clock className="w-5 h-5" />
                <span className="font-bold text-lg">{formatTime(timeRemaining)}</span>
              </div>

              <Button
                onClick={() => setShowSubmitDialog(true)}
                className="bg-success hover:bg-success/90"
                disabled={submitting}
              >
                Submit Exam
              </Button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{answeredCount}/{questions.length} answered</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Question Panel */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardContent className="p-8 space-y-6">
                {/* Question Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {questions[currentQuestion].subject}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Question {currentQuestion + 1}
                      </span>
                    </div>
                    <p className="text-xl leading-relaxed">{questions[currentQuestion].questionText}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleFlagQuestion}
                    className={flaggedQuestions.has(currentQuestion) ? 'text-warning' : ''}
                  >
                    <Flag className="w-5 h-5" />
                  </Button>
                </div>

                {/* Options */}
                <RadioGroup
                  value={answers[currentQuestion]?.toString()}
                  onValueChange={(value) => handleAnswerSelect(parseInt(value))}
                >
                  <div className="space-y-4">
                    {questions[currentQuestion].options.map((option, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:border-primary/50 ${
                          answers[currentQuestion] === index
                            ? 'border-primary bg-primary/5'
                            : 'border-border'
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                      >
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                size="lg"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous
              </Button>
              
              {currentQuestion < questions.length - 1 ? (
                <Button size="lg" onClick={handleNext}>
                  Next
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              ) : (
                <Button size="lg" onClick={() => setShowSubmitDialog(true)} className="bg-success hover:bg-success/90">
                  Submit Exam
                  <CheckCircle className="w-5 h-5 ml-2" />
                </Button>
              )}
            </div>
          </div>

          {/* Question Navigator */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-4">Question Navigator</h3>
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {questions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestion(index)}
                      className={`w-10 h-10 rounded-lg font-medium text-sm transition-all ${
                        currentQuestion === index
                          ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2'
                          : answers[index]
                          ? 'bg-success text-success-foreground'
                          : flaggedQuestions.has(index)
                          ? 'bg-warning text-warning-foreground'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                
                {/* Legend */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded bg-success"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded bg-muted"></div>
                    <span>Not Answered</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded bg-warning"></div>
                    <span>Flagged</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded bg-primary"></div>
                    <span>Current</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Submit Dialog */}
      <AlertDialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <span>Submit Exam?</span>
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>Are you sure you want to submit your exam?</p>
              <div className="bg-muted p-4 rounded-lg space-y-1 text-sm">
                <p>• Total Questions: {questions.length}</p>
                <p>• Answered: {answeredCount}</p>
                <p>• Unanswered: {questions.length - answeredCount}</p>
                <p>• Flagged: {flaggedQuestions.size}</p>
              </div>
              <p className="text-warning">You cannot change your answers after submission.</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Review Answers</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit} className="bg-success hover:bg-success/90">
              Submit Now
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ExamTaking;
