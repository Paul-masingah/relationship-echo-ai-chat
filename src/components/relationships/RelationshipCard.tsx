
import React from 'react';
import { Link } from 'react-router-dom';
import { User2, Heart, MessageCircle, Calendar } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Relationship } from '@/types';
import { cn } from '@/lib/utils';

interface RelationshipCardProps {
  relationship: Relationship;
}

export function RelationshipCard({ relationship }: RelationshipCardProps) {
  // Helper to convert relationship type to icon and label
  const getRelationshipTypeInfo = (type: string) => {
    switch (type) {
      case 'friend':
        return { icon: Heart, label: 'Friend', color: 'text-emotion-500' };
      case 'family':
        return { icon: Heart, label: 'Family', color: 'text-emotion-700' };
      case 'partner':
        return { icon: Heart, label: 'Partner', color: 'text-emotion-600' };
      case 'colleague':
        return { icon: User2, label: 'Colleague', color: 'text-echo-500' };
      case 'acquaintance':
        return { icon: User2, label: 'Acquaintance', color: 'text-echo-400' };
      default:
        return { icon: User2, label: 'Other', color: 'text-muted-foreground' };
    }
  };

  const { icon: TypeIcon, label, color } = getRelationshipTypeInfo(relationship.relationshipType);

  // Helper to convert time known to readable text
  const getTimeKnownText = (timeKnown?: string) => {
    if (!timeKnown) return 'Unknown duration';
    
    switch (timeKnown) {
      case 'less-than-year':
        return 'Less than a year';
      case '1-5-years':
        return '1-5 years';
      case '5-10-years':
        return '5-10 years';
      case 'over-10-years':
        return 'Over 10 years';
      case 'lifetime':
        return 'Lifetime';
      default:
        return timeKnown;
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="bg-gradient-to-r from-echo-100 to-emotion-50 pb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow">
              <TypeIcon className={cn("h-4 w-4", color)} />
            </div>
            <span className="text-sm font-medium text-muted-foreground">{label}</span>
          </div>
        </div>
      </CardHeader>
      <div className="relative">
        <div className="absolute -top-6 left-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-echo-500 text-white shadow-sm">
            <span className="text-lg font-bold">{relationship.name.charAt(0)}</span>
          </div>
        </div>
      </div>
      <CardContent className="pt-8">
        <CardTitle className="mb-2">{relationship.name}</CardTitle>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{getTimeKnownText(relationship.timeKnown)}</span>
          </div>
          {relationship.interactionFrequency && (
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>
                Interact: {relationship.interactionFrequency.replace(/-/g, ' ')}
              </span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link to={`/relationships/${relationship.id}`}>
          <Button>
            <MessageCircle className="mr-2 h-4 w-4" />
            Start Conversation
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
