
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRelationship } from '@/context/RelationshipContext';
import { RelationshipCard } from '@/components/relationships/RelationshipCard';
import { EmptyState } from '@/components/home/EmptyState';

export default function HomePage() {
  const { relationships } = useRelationship();

  if (relationships.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Your Relationships</h1>
        <Link to="/add-relationship">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Relationship
          </Button>
        </Link>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {relationships.map((relationship) => (
          <RelationshipCard key={relationship.id} relationship={relationship} />
        ))}
      </div>
    </div>
  );
}
