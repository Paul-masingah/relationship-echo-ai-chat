
export function generateResponse(message: string, relationship: string, phase: string): string {
  const responses = {
    onboarding: [
      `Thanks for sharing that about ${relationship}. Could you tell me how you first met?`,
      `That's interesting. How long have you known ${relationship}?`,
      `I'd love to know more about your favorite memory with ${relationship}.`,
      `How often do you typically see or talk to ${relationship}?`
    ],
    'emotional-mapping': [
      `What do you appreciate most about ${relationship}?`,
      `How does ${relationship} make you feel when you spend time together?`,
      `What role does ${relationship} play in your life?`,
      `Has ${relationship} been there for you during difficult times?`
    ],
    'dynamics-tensions': [
      `Have you ever had conflicts with ${relationship}? How did you resolve them?`,
      `What's something about ${relationship} that sometimes bothers you?`,
      `Do you feel the relationship with ${relationship} is balanced?`,
      `When was the last time you felt misunderstood by ${relationship}?`
    ],
    'dual-lens-reflection': [
      `How do you think ${relationship} would describe your relationship?`,
      `What do you think ${relationship} values most about you?`,
      `Is there something you wish ${relationship} understood better about you?`,
      `From ${relationship}'s perspective, what do you bring to their life?`
    ],
    summary: [
      `Thank you for sharing about your relationship with ${relationship}. I notice you value their support and presence in your life.`,
      `Based on our conversation, it seems your relationship with ${relationship} has both meaningful connections and areas where understanding could deepen.`,
      `I appreciate your reflections on ${relationship}. Your willingness to see both perspectives shows emotional intelligence.`,
      `Our conversation reveals the depth of your connection with ${relationship}. Thank you for your openness.`
    ]
  };

  const phaseKey = phase as keyof typeof responses;
  const responseArray = responses[phaseKey] || responses.onboarding;
  return responseArray[Math.floor(Math.random() * responseArray.length)];
}
