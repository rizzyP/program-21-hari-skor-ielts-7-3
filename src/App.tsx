
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TestProvider } from "@/context/TestContext";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TestSelection from "./pages/TestSelection";
import ListeningTest from "./pages/ListeningTest";
import ReadingTest from "./pages/ReadingTest";
import WritingTest from "./pages/WritingTest";
import Results from "./pages/Results";
import Curriculum from "./pages/Curriculum";
import CurriculumDay1 from "./pages/CurriculumDay1";
import CurriculumDay2 from "./pages/CurriculumDay2";
import Auth from "./pages/Auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <TestProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public Route - Authentication */}
              <Route path="/auth" element={<Auth />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Index />} />
                <Route path="/test" element={<TestSelection />} />
                <Route path="/test/listening" element={<ListeningTest />} />
                <Route path="/test/reading" element={<ReadingTest />} />
                <Route path="/test/writing" element={<WritingTest />} />
                <Route path="/results" element={<Results />} />
                <Route path="/curriculum" element={<Curriculum />} />
                <Route path="/curriculum/day1" element={<CurriculumDay1 />} />
                <Route path="/curriculum/day2" element={<CurriculumDay2 />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TestProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
