
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, MessageCircle, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useVoiceResponseSettings } from '@/hooks/useVoiceResponseSettings';
import { RecordingVisualizer } from '@/components/chat/RecordingVisualizer';
import { useVoiceRecording } from '@/hooks/useVoiceRecording';

const Index = () => {
  const [isRecording, setIsRecording] = useState(false);
  const { voiceEnabled, toggleVoice } = useVoiceResponseSettings();
  
  const toggleRecording = () => setIsRecording(prev => !prev);
  
  const {
    transcription,
    recordingVolume,
    clearTranscription
  } = useVoiceRecording(isRecording, toggleRecording);
  
  const handleStartDemo = () => {
    if (!isRecording) {
      setIsRecording(true);
      clearTranscription();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-background to-secondary/30">
      {/* Logo and Header Section */}
      <div className="w-full max-w-3xl text-center mb-12">
        <div className="relative mx-auto mb-8 inline-block">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl group-hover:blur-2xl transition-all duration-1000"></div>
          <div className="relative flex h-24 w-24 mx-auto items-center justify-center rounded-full bg-gradient-to-br from-echo-400 to-echo-600 shadow-lg hover:shadow-echo-500/20 transition-all duration-300">
            <Sparkles className="absolute h-full w-full p-3 text-white animate-pulse-slow" />
            <Heart className="h-12 w-12 text-white" fill="white" />
          </div>
          <h1 className="mt-6 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-echo-600 to-echo-400">
            Echo
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-xl mx-auto">
          Understand your relationships through AI-guided conversations
        </p>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-3xl grid gap-8 md:grid-cols-2">
        {/* AI Demo Card */}
        <Card className="shadow-lg border-2 border-primary/10 bg-card/95 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-echo-500" />
              Try Echo AI
            </CardTitle>
            <CardDescription>
              Experience how Echo helps you understand your relationships
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted rounded-lg p-4 min-h-24 flex items-center justify-center">
              {transcription ? (
                <p className="text-center animate-fade-in">{transcription}</p>
              ) : (
                <p className="text-center text-muted-foreground">
                  {isRecording ? "Listening..." : "Start demo to try Echo AI"}
                </p>
              )}
            </div>
            
            <RecordingVisualizer 
              isRecording={isRecording} 
              recordingVolume={recordingVolume} 
            />
            
            <div className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={toggleVoice}
              >
                {voiceEnabled ? (
                  <>
                    <Volume2 className="h-4 w-4" />
                    Voice On
                  </>
                ) : (
                  <>
                    <VolumeX className="h-4 w-4" />
                    Voice Off
                  </>
                )}
              </Button>
              
              <Button 
                onClick={handleStartDemo}
                disabled={isRecording}
                className="gap-1"
              >
                <MessageCircle className="h-4 w-4" />
                Start Demo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Get Started Card */}
        <Card className="shadow-lg border-2 border-primary/10 bg-card/95 backdrop-blur">
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>
              Begin your journey to better relationships
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-left">
              <li className="flex items-start gap-2">
                <span className="h-5 w-5 bg-echo-500 rounded-full flex-shrink-0 mt-1" />
                <span>Create profiles for your most important relationships</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-5 w-5 bg-echo-500 rounded-full flex-shrink-0 mt-1" />
                <span>Have guided conversations with AI to explore dynamics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="h-5 w-5 bg-echo-500 rounded-full flex-shrink-0 mt-1" />
                <span>Gain insights and improve communication</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link to="/add-relationship" className="w-full">
              <Button size="lg" className="w-full group">
                Start Now
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
