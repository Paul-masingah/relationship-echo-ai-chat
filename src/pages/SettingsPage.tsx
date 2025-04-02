
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Shield, Bell, Download, Moon, Sun, Save } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

export default function SettingsPage() {
  const handleSaveSettings = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold tracking-tight flex items-center">
        <Settings className="mr-2 h-5 w-5" />
        Settings
      </h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="animate-scale-in hover-lift transition-all">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5 text-primary" />
              Notifications
            </CardTitle>
            <CardDescription>Configure how and when you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch id="email-notifications" />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="reminder-notifications">Relationship Reminders</Label>
              <Switch id="reminder-notifications" defaultChecked />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Reminder Frequency</Label>
                <span className="text-sm text-muted-foreground">Weekly</span>
              </div>
              <Slider defaultValue={[50]} max={100} step={25} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Daily</span>
                <span>Weekly</span>
                <span>Monthly</span>
                <span>Never</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-scale-in hover-lift transition-all" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              Privacy
            </CardTitle>
            <CardDescription>Control your data and privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="data-collection">Anonymous Data Collection</Label>
              <Switch id="data-collection" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="third-party">Third-party Integrations</Label>
              <Switch id="third-party" />
            </div>
            
            <div className="pt-2">
              <Button variant="outline" size="sm" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Export Your Data
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-scale-in hover-lift transition-all" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sun className="mr-2 h-5 w-5 text-primary" />
              Appearance
            </CardTitle>
            <CardDescription>Customize how Echo looks and feels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch id="dark-mode" />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="reduce-motion">Reduce Motion</Label>
              <Switch id="reduce-motion" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Font Size</Label>
                <span className="text-sm text-muted-foreground">Medium</span>
              </div>
              <Slider defaultValue={[50]} max={100} step={25} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Small</span>
                <span>Medium</span>
                <span>Large</span>
                <span>XL</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-scale-in hover-lift transition-all" style={{ animationDelay: '0.3s' }}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5 text-primary" />
              AI Assistant Settings
            </CardTitle>
            <CardDescription>Configure how the AI assistant interacts with you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="voice-enabled">Voice Interactions</Label>
              <Switch id="voice-enabled" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="advanced-insights">Advanced Insights</Label>
              <Switch id="advanced-insights" defaultChecked />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>AI Response Length</Label>
                <span className="text-sm text-muted-foreground">Balanced</span>
              </div>
              <Slider defaultValue={[50]} max={100} step={25} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Brief</span>
                <span>Balanced</span>
                <span>Detailed</span>
                <span>Comprehensive</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="animate-scale-in" style={{ animationDelay: '0.4s' }}>
          <Save className="mr-2 h-4 w-4" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
}
