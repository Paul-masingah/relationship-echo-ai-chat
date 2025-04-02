
import { useState, useEffect } from 'react';

export function useVoiceResponseSettings() {
  const [voiceEnabled, setVoiceEnabled] = useState(() => {
    const saved = localStorage.getItem('echo-voice-enabled');
    return saved !== null ? saved === 'true' : true;
  });

  const toggleVoice = () => {
    const newState = !voiceEnabled;
    setVoiceEnabled(newState);
    localStorage.setItem('echo-voice-enabled', newState.toString());
    return newState;
  };

  return {
    voiceEnabled,
    toggleVoice
  };
}
