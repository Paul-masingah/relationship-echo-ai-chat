
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-echo-100">
        <Heart className="h-12 w-12 text-echo-500" fill="#6366F1" />
      </div>
      <h2 className="mb-3 text-2xl font-bold">Welcome to Echo</h2>
      <p className="mb-6 max-w-md text-muted-foreground">
        Echo helps you explore and understand your closest relationships through 
        meaningful AI-guided conversations.
      </p>
      <Link to="/add-relationship">
        <Button className="gap-2">
          Add Your First Relationship
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
