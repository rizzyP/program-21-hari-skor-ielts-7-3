
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TestProvider } from "@/context/TestContext";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TestSelection from "./pages/TestSelection";
import ListeningTest from "./pages/ListeningTest";
import ReadingTest from "./pages/ReadingTest";
import WritingTest from "./pages/WritingTest";
import SpeakingTest from "./pages/SpeakingTest";
import Results from "./pages/Results";
import Curriculum from "./pages/Curriculum";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TestProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/test" element={<TestSelection />} />
            <Route path="/test/listening" element={<ListeningTest />} />
            <Route path="/test/reading" element={<ReadingTest />} />
            <Route path="/test/writing" element={<WritingTest />} />
            <Route path="/test/speaking" element={<SpeakingTest />} />
            <Route path="/results" element={<Results />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TestProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
