
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRelationship } from '@/context/RelationshipContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

export function Header({ toggleSidebar }: HeaderProps) {
  const { activeRelationship } = useRelationship();

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center px-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-echo-500" fill="#6366F1" />
            <span className="hidden font-bold sm:inline-block">Echo</span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-end">
          {activeRelationship && (
            <div className="mr-4 font-medium text-muted-foreground">
              {activeRelationship.name}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
