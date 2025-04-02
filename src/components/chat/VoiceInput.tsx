
import React, { useState } from 'react';
import { Mic, MicOff, Send, Wand2, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRelationship } from '@/context/RelationshipContext';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useVoiceRecording } from '@/hooks/useVoiceRecording';
import { useVoiceResponseSettings } from '@/hooks/useVoiceResponseSettings';
import { generateResponse } from '@/utils/messageGenerator';
import { getNextPhase } from '@/utils/conversationPhases';
import { RecordingVisualizer } from './RecordingVisualizer';

export function VoiceInput() {
  const { activeConversation, activeRelationship, isRecording, toggleRecording, addMessage, advancePhase } = useRelationship();
  const [userInput, setUserInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { voiceEnabled, toggleVoice } = useVoiceResponseSettings();
  const { transcription, recordingVolume, clearTranscription } = useVoiceRecording(isRecording, toggleRecording);
  
  const handleSendMessage = () => {
    if (!userInput.trim() && !transcription.trim()) return;
    if (!activeConversation || !activeRelationship) return;
    
    const message = userInput || transcription;
    addMessage(message, 'user');
    setUserInput('');
    clearTranscription();
    setIsProcessing(true);
    
    setTimeout(() => {
      const response = generateResponse(
        message, 
        activeRelationship.name,
        activeConversation.phase
      );
      
      addMessage(response, 'assistant', voiceEnabled);
      setIsProcessing(false);
      
      if (activeConversation.messages.length % 8 === 6) {
        advancePhase();
        toast.info(`Moving to next phase: ${getNextPhase(activeConversation.phase)}`);
      }
    }, 1500);
  };
  
  const handleToggleVoice = () => {
    const newState = toggleVoice();
    toast.info(newState ? "Voice responses enabled" : "Voice responses disabled");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="border-t bg-card p-4">
      {transcription && (
        <div className="mb-2 rounded-md bg-echo-50 p-2 text-sm text-echo-700 animate-fade-in">
          {transcription}
        </div>
      )}
      
      <div className="flex items-end gap-2">
        <Textarea
          placeholder="Type your message or click the mic to speak..."
          className="flex-1 resize-none transition-all focus-within:shadow-md"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleVoice}
            className="text-muted-foreground"
            title={voiceEnabled ? "Disable voice responses" : "Enable voice responses"}
          >
            {voiceEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </Button>
          <Button
            variant={isRecording ? "destructive" : "secondary"}
            size="icon"
            onClick={toggleRecording}
            disabled={!!transcription || isProcessing}
            className={isRecording ? "animate-pulse" : "hover:scale-105 transition-transform"}
          >
            {isRecording ? 
              <MicOff className="h-5 w-5" /> : 
              <Mic className="h-5 w-5" />
            }
          </Button>
          <Button 
            onClick={handleSendMessage}
            disabled={(!userInput.trim() && !transcription.trim()) || isProcessing}
            className="hover:scale-105 transition-transform"
          >
            {isProcessing ? 
              <Wand2 className="mr-2 h-4 w-4 animate-spin" /> :
              <Send className="mr-2 h-4 w-4" />
            }
            {isProcessing ? "Processing..." : "Send"}
          </Button>
        </div>
      </div>
      
      <RecordingVisualizer isRecording={isRecording} recordingVolume={recordingVolume} />
    </div>
  );
}
