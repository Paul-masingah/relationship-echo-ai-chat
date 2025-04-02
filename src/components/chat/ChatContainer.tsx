
import React, { useRef, useEffect, useState } from 'react';
import { ChatMessage } from './ChatMessage';
import { VoiceInput } from './VoiceInput';
import { useRelationship } from '@/context/RelationshipContext';
import { Mic, MoveDown, Sparkles, Clock, HeartHandshake, Activity, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ChatContainer() {
  const { activeConversation, activeRelationship, isRecording } = useRelationship();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Auto-scroll when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  // Check scroll position to show/hide scroll button
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isScrolledUp = scrollHeight - scrollTop > clientHeight + 100;
      setShowScrollButton(isScrolledUp && activeConversation?.messages.length > 3);
    };
    
    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll);
    
    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, [activeConversation?.messages]);

  if (!activeConversation || !activeRelationship) {
    return (
      <Card className="h-full flex flex-col justify-center items-center p-8 animate-fade-in">
        <CardHeader>
          <CardTitle className="text-center">No Active Conversation</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          Select a relationship or create a new one to start a conversation
        </CardContent>
      </Card>
    );
  }
  
  // Determine the phase icon and title
  const getPhaseInfo = () => {
    switch (activeConversation.phase) {
      case 'onboarding':
        return { 
          title: 'Getting to know your relationship',
          icon: <Clock className="h-4 w-4 mr-2" />
        };
      case 'emotional-mapping':
        return { 
          title: 'Emotional mapping',
          icon: <HeartHandshake className="h-4 w-4 mr-2" />
        };
      case 'dynamics-tensions':
        return { 
          title: 'Exploring dynamics and tensions',
          icon: <Activity className="h-4 w-4 mr-2" />
        };
      case 'dual-lens-reflection':
        return { 
          title: 'Seeing from both perspectives',
          icon: <Eye className="h-4 w-4 mr-2" />
        };
      case 'summary':
        return { 
          title: 'Reflection summary',
          icon: <Sparkles className="h-4 w-4 mr-2" />
        };
      default:
        return { 
          title: 'Conversation',
          icon: <Mic className="h-4 w-4 mr-2" />
        };
    }
  };

  const phaseInfo = getPhaseInfo();
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between py-2 px-4 border-b bg-card shadow-sm">
        <div className="font-medium flex items-center">
          {phaseInfo.icon}
          {phaseInfo.title}
        </div>
      </div>
      
      <div 
        className="flex-1 overflow-y-auto relative scroll-smooth" 
        ref={containerRef}
      >
        {activeConversation.messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-fade-in">
            <div className="text-3xl font-bold text-echo-500 mb-4 animate-slide-up">
              Echo AI
            </div>
            <p className="text-muted-foreground mb-6 max-w-md animate-slide-up" style={{animationDelay: '0.1s'}}>
              I'm here to help you reflect on your relationship with {activeRelationship.name}. 
              Let's have a conversation about your connection.
            </p>
            {isRecording ? (
              <div className="flex items-center gap-2 text-echo-500 animate-fade-in">
                <Mic className="h-5 w-5 animate-pulse" />
                <span>Listening...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center animate-slide-up" style={{animationDelay: '0.2s'}}>
                <Button
                  className="relative overflow-hidden group"
                  onClick={toggleRecording}
                >
                  <span className="absolute inset-0 w-full h-full bg-primary opacity-20 group-hover:opacity-30 transition-opacity"></span>
                  <div className="relative flex items-center">
                    <Mic className="h-5 w-5 mr-2" />
                    <span>Start speaking</span>
                  </div>
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="divide-y">
            {activeConversation.messages.map((message, index) => (
              <div 
                key={message.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ChatMessage message={message} />
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
        
        {showScrollButton && (
          <Button 
            variant="secondary" 
            size="sm" 
            className="absolute bottom-4 right-4 rounded-full shadow-lg animate-fade-in hover:scale-105 transition-all"
            onClick={scrollToBottom}
          >
            <MoveDown className="h-4 w-4 mr-1" />
            Latest
          </Button>
        )}
      </div>
      
      <VoiceInput />
    </div>
  );
}
