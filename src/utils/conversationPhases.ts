
import { ConversationPhase } from '@/types';

export function getPhaseDisplayName(phase: ConversationPhase): string {
  switch (phase) {
    case 'emotional-mapping':
      return 'Emotional Mapping';
    case 'dynamics-tensions':
      return 'Dynamics & Tensions';
    case 'dual-lens-reflection':
      return 'Dual-Lens Reflection';
    case 'summary':
      return 'Reflection Summary';
    case 'onboarding':
    default:
      return 'Onboarding';
  }
}

export function getNextPhase(currentPhase: ConversationPhase): string {
  const phases: ConversationPhase[] = [
    'onboarding',
    'emotional-mapping',
    'dynamics-tensions',
    'dual-lens-reflection',
    'summary'
  ];
  
  const currentIndex = phases.indexOf(currentPhase);
  if (currentIndex < phases.length - 1) {
    return getPhaseDisplayName(phases[currentIndex + 1]);
  }
  return 'Final Phase';
}
