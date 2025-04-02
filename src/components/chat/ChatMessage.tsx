
import React, { useState } from 'react';
import { Message } from '@/types';
import { Bot, User, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { SpeechSynthesis } from './SpeechSynthesis';
import { Button } from '@/components/ui/button';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === 'assistant';
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <div className={cn(
      "flex w-full gap-3 p-4",
      isAssistant ? "bg-secondary/50" : "bg-background"
    )}>
      <div className={cn(
        "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border",
        isAssistant ? "bg-echo-100 text-echo-700 border-echo-200" : "bg-emotion-100 text-emotion-700 border-emotion-200"
      )}>
        {isAssistant ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <div className="font-semibold">
            {isAssistant ? "Echo" : "You"}
          </div>
          <div className="text-xs text-muted-foreground">
            {format(new Date(message.timestamp), 'h:mm a')}
          </div>
          {isAssistant && (
            <div className="ml-auto">
              <SpeechSynthesis 
                text={message.content}
                autoPlay={message.autoplay || false}
                onPlayingChange={setIsPlaying}
              />
            </div>
          )}
        </div>
        <div className={cn(
          "prose prose-sm max-w-none",
          isPlaying && "text-primary"
        )}>
          {message.content}
        </div>
      </div>
    </div>
  );
}
