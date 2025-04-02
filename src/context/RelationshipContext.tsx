import React, { createContext, useContext, useState, useEffect } from 'react';
import { Relationship, Conversation, Message, ReflectionSummary, ConversationPhase } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface RelationshipContextType {
  relationships: Relationship[];
  activeRelationship: Relationship | null;
  activeConversation: Conversation | null;
  isRecording: boolean;
  reflectionSummaries: ReflectionSummary[];
  addRelationship: (relationship: Omit<Relationship, 'id'>) => Relationship;
  setActiveRelationship: (relationshipId: string | null) => void;
  startConversation: (relationshipId: string) => void;
  addMessage: (content: string, role: 'user' | 'assistant', autoplay?: boolean) => void;
  advancePhase: () => void;
  toggleRecording: () => void;
  addReflectionSummary: (summary: Omit<ReflectionSummary, 'id' | 'timestamp'>) => void;
}

const RelationshipContext = createContext<RelationshipContextType | undefined>(undefined);

export function RelationshipProvider({ children }: { children: React.ReactNode }) {
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [activeRelationship, setActiveRelationshipState] = useState<Relationship | null>(null);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [reflectionSummaries, setReflectionSummaries] = useState<ReflectionSummary[]>([]);

  useEffect(() => {
    const storedRelationships = localStorage.getItem('relationships');
    const storedSummaries = localStorage.getItem('reflectionSummaries');
    
    if (storedRelationships) {
      setRelationships(JSON.parse(storedRelationships));
    }
    
    if (storedSummaries) {
      setReflectionSummaries(JSON.parse(storedSummaries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('relationships', JSON.stringify(relationships));
  }, [relationships]);

  useEffect(() => {
    localStorage.setItem('reflectionSummaries', JSON.stringify(reflectionSummaries));
  }, [reflectionSummaries]);

  const addRelationship = (relationshipData: Omit<Relationship, 'id'>) => {
    const newRelationship = {
      id: uuidv4(),
      ...relationshipData
    };
    setRelationships([...relationships, newRelationship]);
    return newRelationship;
  };

  const setActiveRelationship = (relationshipId: string | null) => {
    if (!relationshipId) {
      setActiveRelationshipState(null);
      return;
    }
    
    const relationship = relationships.find(r => r.id === relationshipId);
    if (relationship) {
      setActiveRelationshipState(relationship);
    }
  };

  const startConversation = (relationshipId: string) => {
    const newConversation: Conversation = {
      id: uuidv4(),
      relationshipId,
      messages: [],
      phase: 'onboarding'
    };
    setActiveConversation(newConversation);
  };

  const addMessage = (content: string, role: 'user' | 'assistant', autoplay: boolean = false) => {
    if (!activeConversation) return;
    
    const newMessage: Message = {
      id: uuidv4(),
      content,
      role,
      timestamp: new Date(),
      autoplay
    };
    
    setActiveConversation({
      ...activeConversation,
      messages: [...activeConversation.messages, newMessage]
    });
  };

  const advancePhase = () => {
    if (!activeConversation) return;
    
    const phases: ConversationPhase[] = [
      'onboarding',
      'emotional-mapping',
      'dynamics-tensions',
      'dual-lens-reflection',
      'summary'
    ];
    
    const currentIndex = phases.indexOf(activeConversation.phase);
    if (currentIndex < phases.length - 1) {
      setActiveConversation({
        ...activeConversation,
        phase: phases[currentIndex + 1]
      });
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const addReflectionSummary = (summaryData: Omit<ReflectionSummary, 'id' | 'timestamp'>) => {
    const newSummary: ReflectionSummary = {
      id: uuidv4(),
      ...summaryData,
      timestamp: new Date()
    };
    setReflectionSummaries([...reflectionSummaries, newSummary]);
  };

  return (
    <RelationshipContext.Provider
      value={{
        relationships,
        activeRelationship,
        activeConversation,
        isRecording,
        reflectionSummaries,
        addRelationship,
        setActiveRelationship,
        startConversation,
        addMessage,
        advancePhase,
        toggleRecording,
        addReflectionSummary
      }}
    >
      {children}
    </RelationshipContext.Provider>
  );
}

export function useRelationship() {
  const context = useContext(RelationshipContext);
  if (context === undefined) {
    throw new Error('useRelationship must be used within a RelationshipProvider');
  }
  return context;
}
