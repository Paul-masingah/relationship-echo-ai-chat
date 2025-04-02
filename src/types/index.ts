export interface Relationship {
  id: string;
  name: string;
  relationshipType: string;
  meetingStory?: string;
  timeKnown?: string;
  interactionFrequency?: string;
  lastInteraction?: string;
}

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  autoplay?: boolean;
}

export interface Conversation {
  id: string;
  relationshipId: string;
  messages: Message[];
  phase: ConversationPhase;
}

export type ConversationPhase = 
  | 'onboarding' 
  | 'emotional-mapping' 
  | 'dynamics-tensions' 
  | 'dual-lens-reflection' 
  | 'summary';

export interface ReflectionSummary {
  id: string;
  relationshipId: string;
  conversationId: string;
  insights: string[];
  emotionalTone: string;
  timestamp: Date;
}
