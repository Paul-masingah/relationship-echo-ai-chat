
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Voice Settings</CardTitle>
          <CardDescription>
            Configure how the voice interface works
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-listen">Auto-listen after response</Label>
            <Switch id="auto-listen" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="voice-feedback">Voice feedback (read responses aloud)</Label>
            <Switch id="voice-feedback" />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Data & Privacy</CardTitle>
          <CardDescription>
            Manage your data and privacy settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="save-conversations">Save conversations</Label>
            <Switch id="save-conversations" defaultChecked />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <Button 
            variant="destructive" 
            onClick={() => {
              localStorage.clear();
              toast.success('All data has been cleared');
              setTimeout(() => window.location.href = '/', 1500);
            }}
          >
            Clear All Data
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">
            This will remove all relationships and conversation history.
          </p>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>About Echo</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Echo is a relationship intelligence app designed to help you reflect on your closest 
            relationships through emotionally intelligent AI conversations. This is an MVP version
            focused on gathering insights.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
