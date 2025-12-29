import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter as BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";
import OtherProjects from "./pages/OtherProjects";
import ExploreAI from "./pages/ExploreAI";
import WatchRead from "./pages/WatchRead";
const queryClient = new QueryClient();
import ScrollToTop from './components/ScrollToTop';
import BlogDetail from './pages/BlogDetail';





const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            {/* <BrowserRouter basename="/theadventurousinvestor/">  when using github pages*/}
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="/other-projects" element={<OtherProjects />} />
              <Route path="/explore-ai" element={<ExploreAI />} />
              <Route path="/watch-read" element={<WatchRead />} />
              <Route path="/blog/:blogId" element={<BlogDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
