
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RelationshipProvider } from './context/RelationshipContext';
import { Layout } from './components/layout/Layout';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from './components/layout/ScrollToTop';

import HomePage from "./pages/HomePage";
import AddRelationshipPage from "./pages/AddRelationshipPage";
import RelationshipDetailPage from "./pages/RelationshipDetailPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <RelationshipProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-right" closeButton />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/add-relationship" element={<AddRelationshipPage />} />
              <Route path="/relationships/:id" element={<RelationshipDetailPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </RelationshipProvider>
  </QueryClientProvider>
);

export default App;
