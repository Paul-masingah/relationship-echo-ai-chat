
import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SpeechSynthesisProps {
  text: string;
  autoPlay?: boolean;
  onPlayingChange?: (isPlaying: boolean) => void;
}

// Mock implementation - in a real app, this would connect to ElevenLabs API
export function SpeechSynthesis({ text, autoPlay = false, onPlayingChange }: SpeechSynthesisProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // In a real implementation, this would be replaced with a call to ElevenLabs API
  const getAudioUrl = (text: string) => {
    // This is a mock implementation - in production, you would call the ElevenLabs API
    // return `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?text=${encodeURIComponent(text)}`;
    
    // For demo purposes, we'll use the browser's speech synthesis
    return null;
  };
  
  useEffect(() => {
    const synth = window.speechSynthesis;
    let utterance: SpeechSynthesisUtterance | null = null;
    
    if (text && autoPlay && !isMuted) {
      // Clear any existing speech
      synth.cancel();
      
      // Create new utterance
      utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      
      // Set up event handlers
      utterance.onstart = () => {
        setIsPlaying(true);
        onPlayingChange?.(true);
      };
      
      utterance.onend = () => {
        setIsPlaying(false);
        onPlayingChange?.(false);
      };
      
      synth.speak(utterance);
    }
    
    return () => {
      if (isPlaying) {
        synth.cancel();
        setIsPlaying(false);
        onPlayingChange?.(false);
      }
    };
  }, [text, autoPlay, isMuted, onPlayingChange]);
  
  const togglePlayback = () => {
    const synth = window.speechSynthesis;
    
    if (isPlaying) {
      synth.cancel();
      setIsPlaying(false);
      onPlayingChange?.(false);
    } else if (text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => {
        setIsPlaying(false);
        onPlayingChange?.(false);
      };
      utterance.onstart = () => {
        setIsPlaying(true);
        onPlayingChange?.(true);
      };
      synth.speak(utterance);
    }
  };
  
  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    if (newMutedState && isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      onPlayingChange?.(false);
    }
    
    // Save preference
    localStorage.setItem('echo-voice-muted', newMutedState.toString());
  };
  
  // Load mute preference on mount
  useEffect(() => {
    const savedMuteState = localStorage.getItem('echo-voice-muted');
    if (savedMuteState !== null) {
      setIsMuted(savedMuteState === 'true');
    }
  }, []);
  
  return (
    <div className="inline-flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        className="text-muted-foreground"
        onClick={toggleMute}
        title={isMuted ? "Enable voice" : "Disable voice"}
      >
        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>
    </div>
  );
}
