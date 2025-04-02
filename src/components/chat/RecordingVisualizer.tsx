
import React from 'react';

interface RecordingVisualizerProps {
  isRecording: boolean;
  recordingVolume: number[];
}

export function RecordingVisualizer({ isRecording, recordingVolume }: RecordingVisualizerProps) {
  if (!isRecording) return null;

  return (
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
  );
}
