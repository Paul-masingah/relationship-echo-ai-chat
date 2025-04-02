
import React from 'react';
import { RelationshipForm } from '@/components/relationships/RelationshipForm';
import { User, Heart, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function AddRelationshipPage() {
  return (
    <div className="container max-w-4xl mx-auto">
      <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
        <div className="animate-fade-in">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight mb-2">Add a New Relationship</h1>
            <p className="text-muted-foreground">
              Tell us about the person you'd like to reflect on and understand better.
            </p>
          </div>
          
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5 text-primary" />
                Relationship Details
              </CardTitle>
              <CardDescription>
                Fill out the information below to start your relationship journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RelationshipForm />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Heart className="mr-2 h-5 w-5 text-primary" />
                Why Reflect?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Reflection helps deepen your understanding and appreciation of your important relationships.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0"></span>
                  <span>Gain new insights about your connections</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0"></span>
                  <span>Build empathy and understanding</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0"></span>
                  <span>Identify relationship patterns</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0"></span>
                  <span>Strengthen your emotional intelligence</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-secondary border-secondary/70">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Sparkles className="mr-2 h-5 w-5 text-primary" />
                What to Expect
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                After adding a relationship, you'll engage in a guided AI conversation that follows a structured approach:
              </p>
              <ol className="mt-4 space-y-3 text-sm">
                <li className="flex">
                  <span className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">1</span>
                  <div>
                    <span className="font-medium">Onboarding & History</span>
                    <p className="text-muted-foreground">Setting context and background</p>
                  </div>
                </li>
                <li className="flex">
                  <span className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">2</span>
                  <div>
                    <span className="font-medium">Emotional Mapping</span>
                    <p className="text-muted-foreground">Exploring feelings and memories</p>
                  </div>
                </li>
                <li className="flex">
                  <span className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">3</span>
                  <div>
                    <span className="font-medium">Dynamics & Tensions</span>
                    <p className="text-muted-foreground">Understanding patterns and challenges</p>
                  </div>
                </li>
                <li className="flex">
                  <span className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">4</span>
                  <div>
                    <span className="font-medium">Dual-Lens Reflection</span>
                    <p className="text-muted-foreground">Seeing from their perspective</p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
