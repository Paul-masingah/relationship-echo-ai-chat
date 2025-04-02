
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center py-12 animate-fade-in">
      <div className="relative mb-8">
        <div className="text-[150px] font-bold text-primary/10 leading-none select-none">404</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Search className="h-24 w-24 text-primary/50 animate-pulse-slow" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-2 animate-slide-up">Page Not Found</h1>
      
      <p className="text-muted-foreground max-w-md mb-8 animate-slide-up" style={{animationDelay: '0.1s'}}>
        We couldn't find the page you're looking for. It might have been moved, renamed, or removed.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{animationDelay: '0.2s'}}>
        <Button variant="outline" onClick={() => window.history.back()} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Go Back
        </Button>
        
        <Link to="/">
          <Button className="w-full gap-2">
            <Home className="h-4 w-4" />
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
