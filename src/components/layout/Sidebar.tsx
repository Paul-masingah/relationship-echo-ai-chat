
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Plus, User2, Settings, HomeIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRelationship } from '@/context/RelationshipContext';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();
  const { relationships } = useRelationship();

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r bg-background transition-transform duration-300 md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/" className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-echo-500" fill="#6366F1" />
          <span className="font-bold">Echo</span>
        </Link>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <nav className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xs font-medium text-muted-foreground">Navigation</h3>
            <div className="space-y-1">
              <Link to="/" className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                location.pathname === "/" && "bg-accent text-accent-foreground"
              )}>
                <HomeIcon className="h-4 w-4" />
                Home
              </Link>
              <Link to="/settings" className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                location.pathname === "/settings" && "bg-accent text-accent-foreground"
              )}>
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-medium text-muted-foreground">Relationships</h3>
              <Link to="/add-relationship">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Add relationship</span>
                </Button>
              </Link>
            </div>
            <div className="space-y-1">
              {relationships.map((relationship) => (
                <Link
                  key={relationship.id}
                  to={`/relationships/${relationship.id}`}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    location.pathname === `/relationships/${relationship.id}` && "bg-accent text-accent-foreground"
                  )}
                >
                  <User2 className="h-4 w-4" />
                  {relationship.name}
                </Link>
              ))}
              {relationships.length === 0 && (
                <div className="flex flex-col items-center justify-center py-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    No relationships yet
                  </p>
                  <Link to="/add-relationship" className="mt-2">
                    <Button size="sm" variant="outline">
                      Add your first relationship
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      </ScrollArea>
    </aside>
  );
}
