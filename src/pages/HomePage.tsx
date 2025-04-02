
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ChevronDown, Heart, MessageSquare, User, BarChart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRelationship } from '@/context/RelationshipContext';
import { RelationshipCard } from '@/components/relationships/RelationshipCard';
import { EmptyState } from '@/components/home/EmptyState';
import { Card, CardContent } from '@/components/ui/card';

export default function HomePage() {
  const { relationships } = useRelationship();
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  
  // Scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.scroll-animate').forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);
  
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (relationships.length === 0) {
    return (
      <div className="space-y-24 pb-24">
        <section className="relative overflow-hidden py-24">
          <div className="absolute -top-24 left-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5"></div>
          <div className="absolute -bottom-40 left-1/3 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10"></div>
          
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="animate-fade-in">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Introducing Echo
                </div>
              </div>
              
              <h1 className="animate-fade-in text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Understand Your <span className="text-primary">Relationships</span> Better
              </h1>
              
              <p className="animate-fade-in max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have meaningful conversations about your relationships with our emotionally intelligent AI. Get insights and grow deeper connections.
              </p>
              
              <div className="animate-fade-in flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/add-relationship">
                  <Button size="lg" className="animate-pulse-slow">
                    <Plus className="mr-2 h-4 w-4" />
                    Start Your First Relationship
                  </Button>
                </Link>
                
                <Button variant="outline" size="lg" onClick={() => scrollToSection(howItWorksRef)}>
                  Learn How It Works
                </Button>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => scrollToSection(featuresRef)}
              className="rounded-full h-10 w-10"
            >
              <ChevronDown />
            </Button>
          </div>
        </section>
        
        <section ref={featuresRef} className="py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="scroll-animate">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Features
                </div>
              </div>
              
              <h2 className="scroll-animate text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Everything You Need for Relationship Intelligence
              </h2>
              
              <p className="scroll-animate max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our AI-powered platform helps you understand, nurture, and grow all your relationships.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12 stagger-animation">
              <Card className="scroll-animate hover-lift">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="rounded-full bg-primary/10 p-3">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Voice Conversations</h3>
                  <p className="text-muted-foreground text-center">
                    Have natural voice conversations with our emotionally intelligent AI assistant.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="scroll-animate hover-lift">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Emotional Mapping</h3>
                  <p className="text-muted-foreground text-center">
                    Explore the emotional dynamics of your relationships through guided reflection.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="scroll-animate hover-lift">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="rounded-full bg-primary/10 p-3">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Perspective Shifting</h3>
                  <p className="text-muted-foreground text-center">
                    See your relationships from different perspectives to build empathy and understanding.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="scroll-animate hover-lift">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="rounded-full bg-primary/10 p-3">
                    <BarChart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Relationship Insights</h3>
                  <p className="text-muted-foreground text-center">
                    Track patterns, sentiment, and growth in your relationships over time.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="scroll-animate hover-lift">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Privacy First</h3>
                  <p className="text-muted-foreground text-center">
                    Your relationship data is private and secure, giving you peace of mind.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="scroll-animate hover-lift">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Start Now</h3>
                  <p className="text-muted-foreground text-center">
                    Begin your relationship reflection journey with just a few clicks.
                  </p>
                  <Link to="/add-relationship">
                    <Button>Get Started</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        <section ref={howItWorksRef} className="py-20 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="scroll-animate">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  How It Works
                </div>
              </div>
              
              <h2 className="scroll-animate text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                A Four-Phase Journey of Reflection
              </h2>
              
              <p className="scroll-animate max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our structured conversation system helps you explore relationships deeply and meaningfully.
              </p>
            </div>
            
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="scroll-animate flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold">Onboarding & History</h3>
                <p className="mt-2 text-muted-foreground">
                  Set context and break the ice with light, open-ended questions about your relationship's history.
                </p>
              </div>
              
              <div className="scroll-animate flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold">Emotional Mapping</h3>
                <p className="mt-2 text-muted-foreground">
                  Explore feelings, memories, and the emotional depth of your connection.
                </p>
              </div>
              
              <div className="scroll-animate flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold">Dynamics & Tensions</h3>
                <p className="mt-2 text-muted-foreground">
                  Surface patterns, roles, and conflicts to understand relationship challenges.
                </p>
              </div>
              
              <div className="scroll-animate flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  4
                </div>
                <h3 className="text-xl font-bold">Dual-Lens Reflection</h3>
                <p className="mt-2 text-muted-foreground">
                  Reduce bias and increase empathy by seeing the relationship from both perspectives.
                </p>
              </div>
            </div>
            
            <div className="mt-12 flex justify-center">
              <Link to="/add-relationship">
                <Button size="lg" className="animate-pulse-slow">
                  Start Your Journey
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Your Relationships</h1>
        <Link to="/add-relationship">
          <Button className="hover-lift transition-all">
            <Plus className="mr-2 h-4 w-4" />
            Add Relationship
          </Button>
        </Link>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-animation">
        {relationships.map((relationship) => (
          <div key={relationship.id} className="animate-scale-in">
            <RelationshipCard relationship={relationship} />
          </div>
        ))}
      </div>
    </div>
  );
}
