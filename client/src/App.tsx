import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AdminRoute } from '@/components/AdminRoute';

// Student Pages
import Index from './pages/Index';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Exams from './pages/Exams';
import ExamStart from './pages/ExamStart';
import ExamTaking from './pages/ExamTaking';
import ExamResult from './pages/ExamResult';
import Results from './pages/Results';
import Circulars from './pages/Circulars';
import AllRecruitmentProcesses from './pages/AllRecruitmentProcesses';
import RecruitmentProcessDetail from './pages/RecruitmentProcessDetail';

// Preli & Written Pages
import PreliWritten from './pages/PreliWritten';
import PreliWrittenDetail from './pages/PreliWrittenDetail';

// Viva Preparation Pages
import VivaPreparation from './pages/VivaPreparation';
import VivaPreparationDetail from './pages/VivaPreparationDetail';

// Job Solutions Pages
import JobSolutions from './pages/JobSolutions';
import JobSolutionsDetail from './pages/JobSolutionsDetail';

// Model Tests Pages
import ModelTests from './pages/ModelTests';
import ModelTestsDetail from './pages/ModelTestsDetail';

// Admin Pages
import { Layout } from './components/Layout';
import { AdminLayout } from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import QuestionBank from './pages/admin/QuestionBank';
import PreliWrittenManagement from './pages/admin/PreliWrittenManagement';
import VivaPreparationManagement from './pages/admin/VivaPreparationManagement';
import JobSolutionsManagement from './pages/admin/JobSolutionsManagement';
import ModelTestsManagement from './pages/admin/ModelTestsManagement';
import BankRecruitmentManagement from './pages/admin/BankRecruitmentManagement';
import UsersManagement from './pages/admin/UsersManagement';

import NotFound from './pages/NotFound';
import Home1 from './components/Home1/Homepage1';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              {/* Public Routes */}
              {/* <Route path="/" element={<Index />} /> */}
              <Route path="/" element={<Home1 />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/circulars" element={<Circulars />} />
              <Route
                path="/recruitment-processes"
                element={<AllRecruitmentProcesses />}
              />
              <Route path="/recruitment-processes/:id" element={<RecruitmentProcessDetail />} />
              {/* Backward-compatible aliases */}
              <Route path="/bank/:id" element={<RecruitmentProcessDetail />} />
              {/* Legacy route redirect */}
              <Route
                path="/recruitment-process/:id"
                element={<RecruitmentProcessDetail />}
              />
              <Route path="/preli-written" element={<PreliWritten />} />
              <Route path="/preli-written/:id" element={<PreliWrittenDetail />} />
              <Route path="/viva-preparation" element={<VivaPreparation />} />
              <Route path="/viva-preparation/:id" element={<VivaPreparationDetail />} />
              <Route path="/job-solutions" element={<JobSolutions />} />
              <Route path="/job-solutions/:id" element={<JobSolutionsDetail />} />
              <Route path="/model-tests" element={<ModelTests />} />
              <Route path="/model-tests/:id" element={<ModelTestsDetail />} />

              {/* Protected Student Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/exams"
                element={
                  <ProtectedRoute>
                    <Exams />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/exam/:examId/start"
                element={
                  <ProtectedRoute>
                    <ExamStart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/exam/:examId/taking"
                element={
                  <ProtectedRoute>
                    <ExamTaking />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/exam/:examId/result"
                element={
                  <ProtectedRoute>
                    <ExamResult />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/results/:attemptId"
                element={
                  <ProtectedRoute>
                    <ExamResult />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/results"
                element={
                  <ProtectedRoute>
                    <Results />
                  </ProtectedRoute>
                }
              />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminLayout />
                </AdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="questions" element={<QuestionBank />} />
              <Route path="preli-written" element={<PreliWrittenManagement />} />
              <Route path="viva-preparation" element={<VivaPreparationManagement />} />
              <Route path="job-solutions" element={<JobSolutionsManagement />} />
              <Route path="model-tests" element={<ModelTestsManagement />} />
              <Route path="bank-recruitment" element={<BankRecruitmentManagement />} />
              <Route path="users" element={<UsersManagement />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
