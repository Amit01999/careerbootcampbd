import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Briefcase, ExternalLink } from 'lucide-react';

interface CircularCardProps {
  id: string;
  bankName: string;
  position: string;
  location: string;
  deadline: string;
  publishDate: string;
  category: string;
  isNew?: boolean;
}

export const CircularCard = ({
  bankName,
  position,
  location,
  deadline,
  publishDate,
  category,
  isNew = false,
}: CircularCardProps) => {
  const isDeadlineSoon = () => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    return daysLeft <= 7 && daysLeft > 0;
  };

  return (
    <Card className="transition-smooth hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-xl font-bold">{bankName}</h3>
            <p className="text-lg text-muted-foreground">{position}</p>
          </div>
          {isNew && (
            <Badge className="bg-accent text-accent-foreground">NEW</Badge>
          )}
          {isDeadlineSoon() && (
            <Badge className="bg-destructive text-destructive-foreground">Deadline Soon</Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <Briefcase className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">{category}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="w-4 h-4 text-secondary" />
            <span className="text-muted-foreground">{location}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="w-4 h-4 text-accent" />
            <span className="text-muted-foreground">Published: {new Date(publishDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="w-4 h-4 text-destructive" />
            <span className="text-muted-foreground font-medium">Deadline: {new Date(deadline).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <Button className="w-full" variant="outline">
            <ExternalLink className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
