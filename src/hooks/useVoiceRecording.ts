
import { useState, useEffect } from 'react';

export function useVoiceRecording(isRecording: boolean, toggleRecording: () => void) {
  const [transcription, setTranscription] = useState('');
  const [recordingVolume, setRecordingVolume] = useState<number[]>([0.5, 0.3, 0.6, 0.8, 0.4]);

  // Handle recording visualization
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

  // Handle mock transcription (in a real app, this would use a real speech-to-text API)
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
        toggleRecording();
      }, 3000);
      
      return () => clearTimeout(timeout);
    }
  }, [isRecording, toggleRecording]);

  const clearTranscription = () => setTranscription('');

  return {
    transcription,
    recordingVolume,
    clearTranscription
  };
}
