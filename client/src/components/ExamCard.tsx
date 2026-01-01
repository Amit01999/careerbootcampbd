import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, FileQuestion, Award, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ExamCardProps {
  id: string;
  title: string;
  description: string;
  duration: number;
  questions: number;
  totalMarks: number;
  price: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  isPurchased?: boolean;
  isFree?: boolean;
}

export const ExamCard = ({
  id,
  title,
  description,
  duration,
  questions,
  totalMarks,
  price,
  difficulty,
  category,
  isPurchased = false,
  isFree = false,
}: ExamCardProps) => {
  const navigate = useNavigate();

  const difficultyColor = {
    Easy: 'bg-success/10 text-success border-success/20',
    Medium: 'bg-warning/10 text-warning border-warning/20',
    Hard: 'bg-destructive/10 text-destructive border-destructive/20',
  };

  const handleAction = () => {
    if (isPurchased || isFree) {
      navigate(`/exam/${id}/start`);
    } else {
      navigate(`/exam/${id}/purchase`);
    }
  };

  return (
    <Card className="transition-smooth hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
          <Badge className={difficultyColor[difficulty]}>
            {difficulty}
          </Badge>
        </div>
        <h3 className="text-xl font-bold line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardHeader>

      <CardContent className="flex-grow space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">{duration} min</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <FileQuestion className="w-4 h-4 text-secondary" />
            <span className="text-muted-foreground">{questions} Qs</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Award className="w-4 h-4 text-accent" />
            <span className="text-muted-foreground">{totalMarks} Marks</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <TrendingUp className="w-4 h-4 text-info" />
            <span className="text-muted-foreground">Pass: 60%</span>
          </div>
        </div>

        {!isFree && (
          <div className="pt-3 border-t border-border">
            <p className="text-2xl font-bold text-primary">
              ৳{price}
              {isPurchased && (
                <span className="text-sm font-normal text-success ml-2">✓ Purchased</span>
              )}
            </p>
          </div>
        )}
        
        {isFree && (
          <div className="pt-3 border-t border-border">
            <Badge className="bg-success text-success-foreground">FREE DEMO</Badge>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button 
          onClick={handleAction} 
          className="w-full"
          variant={isPurchased || isFree ? 'default' : 'outline'}
        >
          {isPurchased || isFree ? 'Start Exam' : 'Purchase Now'}
        </Button>
      </CardFooter>
    </Card>
  );
};
