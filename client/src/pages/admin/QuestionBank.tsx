import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileText, 
  Plus,
  Edit,
  Trash2,
  Search,
  Filter
} from 'lucide-react';
import { toast } from 'sonner';

const QuestionBank = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Mock questions data
  const questions = [
    {
      id: '1',
      question: 'What is the capital of Bangladesh?',
      subject: 'General Knowledge',
      difficulty: 'Easy',
      options: 4,
      correctAnswer: 'Dhaka',
      createdAt: '2025-01-10',
    },
    {
      id: '2',
      question: 'Calculate: 25% of 80 = ?',
      subject: 'Mathematics',
      difficulty: 'Medium',
      options: 4,
      correctAnswer: '20',
      createdAt: '2025-01-12',
    },
    {
      id: '3',
      question: 'What does ATM stand for?',
      subject: 'Banking',
      difficulty: 'Easy',
      options: 4,
      correctAnswer: 'Automated Teller Machine',
      createdAt: '2025-01-14',
    },
  ];

  const subjects = ['all', 'Mathematics', 'English', 'General Knowledge', 'Banking', 'ICT'];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast.success(`Uploading ${file.name}...`);
      // Implement upload logic
    }
  };

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch = q.question.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || q.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Question Bank Management</h1>
          <p className="text-muted-foreground">Upload, manage, and organize exam questions</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Question
        </Button>
      </div>

      {/* Upload Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="w-5 h-5 text-primary" />
              <span>Upload PDF/Excel</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="file-upload">Select File</Label>
              <div className="mt-2 flex items-center gap-4">
                <Input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.xlsx,.xls"
                  onChange={handleFileUpload}
                  className="flex-grow"
                />
                <Button>Upload</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Supported formats: PDF, Excel (.xlsx, .xls)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <p className="text-3xl font-bold text-primary">1,247</p>
                <p className="text-sm text-muted-foreground">Total Questions</p>
              </div>
              <div className="text-center p-4 bg-secondary/10 rounded-lg">
                <p className="text-3xl font-bold text-secondary">5</p>
                <p className="text-sm text-muted-foreground">Subjects</p>
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
                placeholder="Search questions..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject === 'all' ? 'All Subjects' : subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Questions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Questions ({filteredQuestions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Options</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuestions.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell className="max-w-md">
                      <p className="truncate">{question.question}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{question.subject}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          question.difficulty === 'Easy'
                            ? 'bg-success/10 text-success'
                            : question.difficulty === 'Medium'
                            ? 'bg-warning/10 text-warning'
                            : 'bg-destructive/10 text-destructive'
                        }
                      >
                        {question.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell>{question.options}</TableCell>
                    <TableCell>{new Date(question.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionBank;
