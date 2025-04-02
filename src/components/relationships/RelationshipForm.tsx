
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRelationship } from '@/context/RelationshipContext';
import { toast } from 'sonner';
import { Relationship } from '@/types';
import { ArrowLeft, UserCheck } from 'lucide-react';

// Make sure the schema matches what's required in Relationship type
const relationshipSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  relationshipType: z.string().min(1, 'Relationship type is required'),
  timeKnown: z.string().optional(),
  interactionFrequency: z.string().optional(),
  meetingStory: z.string().optional(),
  lastInteraction: z.string().optional(),
});

type RelationshipFormValues = z.infer<typeof relationshipSchema>;

export function RelationshipForm() {
  const { addRelationship } = useRelationship();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<RelationshipFormValues>({
    resolver: zodResolver(relationshipSchema),
    defaultValues: {
      name: '',
      relationshipType: '',
      timeKnown: '',
      interactionFrequency: '',
      meetingStory: '',
      lastInteraction: '',
    },
  });

  const onSubmit = (data: RelationshipFormValues) => {
    setIsSubmitting(true);
    
    // Ensure all required fields are present - though zodResolver should already handle this
    const relationshipData: Omit<Relationship, 'id'> = {
      name: data.name,
      relationshipType: data.relationshipType,
      timeKnown: data.timeKnown,
      interactionFrequency: data.interactionFrequency,
      meetingStory: data.meetingStory,
      lastInteraction: data.lastInteraction,
    };
    
    setTimeout(() => {
      const newRelationship = addRelationship(relationshipData);
      toast.success(`Added ${data.name} to your relationships`, {
        description: "You can now start a conversation to reflect on this relationship.",
        action: {
          label: "View",
          onClick: () => navigate(`/relationships/${newRelationship.id}`),
        },
      });
      navigate(`/relationships/${newRelationship.id}`);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-fade-in">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="animate-slide-up">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter their name" 
                  {...field} 
                  className="transition-all focus-within:ring-2 focus-within:ring-primary/20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="relationshipType"
          render={({ field }) => (
            <FormItem className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <FormLabel>Relationship Type</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="transition-all focus-within:ring-2 focus-within:ring-primary/20">
                    <SelectValue placeholder="Select relationship type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="friend">Friend</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="partner">Partner</SelectItem>
                  <SelectItem value="colleague">Colleague</SelectItem>
                  <SelectItem value="acquaintance">Acquaintance</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="timeKnown"
          render={({ field }) => (
            <FormItem className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <FormLabel>How long have you known them?</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="transition-all focus-within:ring-2 focus-within:ring-primary/20">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="less-than-year">Less than a year</SelectItem>
                  <SelectItem value="1-5-years">1-5 years</SelectItem>
                  <SelectItem value="5-10-years">5-10 years</SelectItem>
                  <SelectItem value="over-10-years">Over 10 years</SelectItem>
                  <SelectItem value="lifetime">Lifetime</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="interactionFrequency"
          render={({ field }) => (
            <FormItem className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <FormLabel>How often do you interact?</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="transition-all focus-within:ring-2 focus-within:ring-primary/20">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="few-times-year">A few times a year</SelectItem>
                  <SelectItem value="rarely">Rarely</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-between gap-4 pt-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="hover:bg-transparent hover:text-primary transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <Button 
            type="submit" 
            className="relative overflow-hidden group transition-all" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 rounded-full border-2 border-white border-r-transparent animate-spin mr-2"></div>
                Adding...
              </>
            ) : (
              <>
                <UserCheck className="mr-2 h-4 w-4" />
                Add Relationship
                <span className="absolute bottom-0 left-0 h-1 bg-white/20 group-hover:w-full w-0 transition-all duration-300"></span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
