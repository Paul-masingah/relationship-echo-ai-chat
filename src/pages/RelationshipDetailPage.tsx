
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { useRelationship } from '@/context/RelationshipContext';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

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
          <h2 className="text-lg font-medium">Loading...</h2>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col">
      <h1 className="mb-4 text-2xl font-bold tracking-tight">
        Conversation with {activeRelationship.name}
      </h1>
      <Card className="flex flex-1 flex-col overflow-hidden">
        <ChatContainer />
      </Card>
    </div>
  );
}
