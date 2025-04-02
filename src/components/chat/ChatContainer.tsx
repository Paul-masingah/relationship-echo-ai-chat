
import React, { useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { VoiceInput } from './VoiceInput';
import { useRelationship } from '@/context/RelationshipContext';
import { Mic, MoveDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ChatContainer() {
  const { activeConversation, activeRelationship, isRecording } = useRelationship();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  if (!activeConversation || !activeRelationship) {
    return (
      <Card className="h-full flex flex-col justify-center items-center p-8">
        <CardHeader>
          <CardTitle className="text-center">No Active Conversation</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          Select a relationship or create a new one to start a conversation
        </CardContent>
      </Card>
    );
  }
  
  // Determine the phase title
  const getPhaseTitle = () => {
    switch (activeConversation.phase) {
      case 'onboarding':
        return 'Getting to know your relationship';
      case 'emotional-mapping':
        return 'Emotional mapping';
      case 'dynamics-tensions':
        return 'Exploring dynamics and tensions';
      case 'dual-lens-reflection':
        return 'Seeing from both perspectives';
      case 'summary':
        return 'Reflection summary';
      default:
        return 'Conversation';
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between py-2 px-4 border-b bg-card">
        <div className="font-medium">{getPhaseTitle()}</div>
        {activeConversation.messages.length > 5 && (
          <Button variant="ghost" size="icon" onClick={scrollToBottom}>
            <MoveDown className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto" ref={containerRef}>
        {activeConversation.messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center">
            <div className="text-3xl font-bold text-echo-500 mb-4">
              Echo AI
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              I'm here to help you reflect on your relationship with {activeRelationship.name}. 
              Let's have a conversation about your connection.
            </p>
            {isRecording ? (
              <div className="flex items-center gap-2 text-echo-500">
                <Mic className="h-5 w-5 animate-pulse" />
                <span>Listening...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 bg-echo-100 rounded-full opacity-50"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Mic className="h-10 w-10 text-echo-500" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="divide-y">
            {activeConversation.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      
      <VoiceInput />
    </div>
  );
}
