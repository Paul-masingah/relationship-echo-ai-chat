
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
      <div className="relative mb-8 group">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl group-hover:blur-2xl transition-all duration-1000"></div>
        <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-echo-400 to-echo-600 shadow-lg hover:shadow-echo-500/20 transition-all duration-300">
          <Sparkles className="absolute h-full w-full p-2 text-white opacity-0 animate-pulse" />
          <Heart className="h-12 w-12 text-white" fill="white" />
        </div>
      </div>
      
      <h2 className="mb-3 text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-echo-600 to-echo-400">
        Welcome to Echo
      </h2>
      
      <p className="mb-8 max-w-md text-muted-foreground">
        Echo helps you explore and understand your closest relationships through 
        meaningful AI-guided conversations.
      </p>
      
      <Link to="/add-relationship" className="group">
        <Button className="text-lg py-6 px-6 shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-all duration-300 overflow-hidden relative">
          <span className="relative z-10 flex items-center">
            Add Your First Relationship
            <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-primary to-echo-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </Button>
      </Link>
    </div>
  );
}
