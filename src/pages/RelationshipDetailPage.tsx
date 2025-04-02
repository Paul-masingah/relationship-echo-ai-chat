
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { useRelationship } from '@/context/RelationshipContext';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';

export default function RelationshipDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { relationships, activeRelationship, setActiveRelationship, startConversation } = useRelationship();
  
  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }
    
    const relationship = relationships.find(r => r.id === id);
    if (!relationship) {
      toast.error('Relationship not found');
      navigate('/');
      return;
    }
    
    setActiveRelationship(id);
    startConversation(id);
    
    // Cleanup when unmounting
    return () => {
      setActiveRelationship(null);
    };
  }, [id, navigate, relationships, setActiveRelationship, startConversation]);
  
  if (!activeRelationship) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <h2 className="text-lg font-medium">Loading conversation...</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4">
        <h1 className="text-2xl font-bold tracking-tight flex items-center">
          <span className="relative">
            Conversation with {activeRelationship.name}
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary/20 rounded-full"></span>
          </span>
        </h1>
        
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-secondary/50 rounded-full px-3 py-1">
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
          {getRelationshipTypeLabel(activeRelationship.relationshipType)}
        </div>
      </div>
      
      <Card className="flex flex-1 flex-col overflow-hidden shadow-md animate-scale-in">
        <ChatContainer />
      </Card>
    </div>
  );
}

function getRelationshipTypeLabel(type: string): string {
  switch (type) {
    case 'friend':
      return 'Friend';
    case 'family':
      return 'Family Member';
    case 'partner':
      return 'Partner';
    case 'colleague':
      return 'Colleague';
    case 'acquaintance':
      return 'Acquaintance';
    case 'other':
      return 'Other';
    default:
      return type;
  }
}
