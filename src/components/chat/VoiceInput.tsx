
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Send, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRelationship } from '@/context/RelationshipContext';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

// Mock response generator
function generateResponse(message: string, relationship: string, phase: string): string {
  const responses = {
    onboarding: [
      `Thanks for sharing that about ${relationship}. Could you tell me how you first met?`,
      `That's interesting. How long have you known ${relationship}?`,
      `I'd love to know more about your favorite memory with ${relationship}.`,
      `How often do you typically see or talk to ${relationship}?`
    ],
    'emotional-mapping': [
      `What do you appreciate most about ${relationship}?`,
      `How does ${relationship} make you feel when you spend time together?`,
      `What role does ${relationship} play in your life?`,
      `Has ${relationship} been there for you during difficult times?`
    ],
    'dynamics-tensions': [
      `Have you ever had conflicts with ${relationship}? How did you resolve them?`,
      `What's something about ${relationship} that sometimes bothers you?`,
      `Do you feel the relationship with ${relationship} is balanced?`,
      `When was the last time you felt misunderstood by ${relationship}?`
    ],
    'dual-lens-reflection': [
      `How do you think ${relationship} would describe your relationship?`,
      `What do you think ${relationship} values most about you?`,
      `Is there something you wish ${relationship} understood better about you?`,
      `From ${relationship}'s perspective, what do you bring to their life?`
    ],
    summary: [
      `Thank you for sharing about your relationship with ${relationship}. I notice you value their support and presence in your life.`,
      `Based on our conversation, it seems your relationship with ${relationship} has both meaningful connections and areas where understanding could deepen.`,
      `I appreciate your reflections on ${relationship}. Your willingness to see both perspectives shows emotional intelligence.`,
      `Our conversation reveals the depth of your connection with ${relationship}. Thank you for your openness.`
    ]
  };

  const phaseKey = phase as keyof typeof responses;
  const responseArray = responses[phaseKey] || responses.onboarding;
  return responseArray[Math.floor(Math.random() * responseArray.length)];
}

export function VoiceInput() {
  const { activeConversation, activeRelationship, isRecording, toggleRecording, addMessage, advancePhase } = useRelationship();
  const [userInput, setUserInput] = useState('');
  const [transcription, setTranscription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingVolume, setRecordingVolume] = useState<number[]>([0.5, 0.3, 0.6, 0.8, 0.4]);

  const handleSendMessage = () => {
    if (!userInput.trim() && !transcription.trim()) return;
    if (!activeConversation || !activeRelationship) return;
    
    const message = userInput || transcription;
    addMessage(message, 'user');
    setUserInput('');
    setTranscription('');
    setIsProcessing(true);
    
    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(
        message, 
        activeRelationship.name,
        activeConversation.phase
      );
      addMessage(response, 'assistant');
      setIsProcessing(false);
      
      // Check if we should advance to the next phase (every 4 message exchanges)
      if (activeConversation.messages.length % 8 === 6) {
        advancePhase();
        toast.info(`Moving to next phase: ${getNextPhase(activeConversation.phase)}`);
      }
    }, 1500);
  };

  const getNextPhase = (currentPhase: string) => {
    const phases = [
      'onboarding',
      'emotional-mapping',
      'dynamics-tensions',
      'dual-lens-reflection',
      'summary'
    ];
    
    const currentIndex = phases.indexOf(currentPhase);
    if (currentIndex < phases.length - 1) {
      switch(phases[currentIndex + 1]) {
        case 'emotional-mapping':
          return 'Emotional Mapping';
        case 'dynamics-tensions':
          return 'Dynamics & Tensions';
        case 'dual-lens-reflection':
          return 'Dual-Lens Reflection';
        case 'summary':
          return 'Reflection Summary';
        default:
          return 'Next Phase';
      }
    }
    return 'Final Phase';
  };

  // Simulate microphone audio levels
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setRecordingVolume([
          Math.random() * 0.5 + 0.3,
          Math.random() * 0.5 + 0.2,
          Math.random() * 0.5 + 0.4,
          Math.random() * 0.5 + 0.3,
          Math.random() * 0.5 + 0.2,
        ]);
      }, 150);
      
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  // Mock voice transcription
  useEffect(() => {
    if (isRecording) {
      const mockPhrases = [
        "I've known them for about five years now.",
        "We met through mutual friends at a party.",
        "They always make me laugh when I'm feeling down.",
        "Sometimes I feel like they don't really listen to me.",
        "We had a big argument last month about communication.",
        "I think they would say I'm a good friend to them.",
        "I appreciate how they're always there for me."
      ];
      
      const randomPhrase = mockPhrases[Math.floor(Math.random() * mockPhrases.length)];
      
      const timeout = setTimeout(() => {
        setTranscription(randomPhrase);
        toggleRecording(); // Stop recording after getting "transcription"
      }, 3000);
      
      return () => clearTimeout(timeout);
    }
  }, [isRecording, toggleRecording]);
  
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
      
      {isRecording && (
        <div className="mt-4 flex justify-center animate-fade-in">
          <div className="flex items-end gap-1 h-12">
            {recordingVolume.map((volume, i) => (
              <div 
                key={i}
                className="w-2 bg-echo-500 rounded-full transition-all duration-150"
                style={{ 
                  height: `${volume * 100}%`,
                  animationDuration: `${0.7 + i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
