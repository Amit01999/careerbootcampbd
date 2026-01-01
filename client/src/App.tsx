import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminRoute } from "@/components/AdminRoute";

// Student Pages
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Exams from "./pages/Exams";
import ExamStart from "./pages/ExamStart";
import ExamTaking from "./pages/ExamTaking";
import ExamResult from "./pages/ExamResult";
import Results from "./pages/Results";
import Circulars from "./pages/Circulars";
import AllRecruitmentProcesses from "./pages/AllRecruitmentProcesses";
import RecruitmentProcessDetail from "./pages/RecruitmentProcessDetail";

// Admin Pages
import { Layout } from "./components/Layout";
import { AdminLayout } from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import QuestionBank from "./pages/admin/QuestionBank";

import NotFound from "./pages/NotFound";

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
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/circulars" element={<Circulars />} />
              <Route path="/recruitment-processes" element={<AllRecruitmentProcesses />} />
              <Route path="/bank/:id" element={<RecruitmentProcessDetail />} />
              {/* Legacy route redirect */}
              <Route path="/recruitment-process/:id" element={<RecruitmentProcessDetail />} />

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
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
