export interface Program {
  id: string;
  name: string;
  stars: number; // 1 to 4 representing Playgroup to UKG
  ageRange: string;
  highlights: string[];
  timing: string;
  annualFee: number;
}

export interface WhyUsCard {
  id: string;
  title: string;
  description: string;
  accentColor: 'marigold' | 'coral' | 'meadow' | 'twilight';
}

export interface DayStop {
  id: string;
  time: string;
  title: string;
  description: string;
  category: string; // e.g. "Morning Drop-off", "Free Play", "Storytelling"
}

export interface MomentVignette {
  id: string;
  caption: string;
  illustrationType: 'story' | 'outdoor' | 'art' | 'blocks' | 'snack' | 'science';
}

export interface Teacher {
  id: string;
  initials: string;
  name: string;
  role: string;
  quote: string;
  experienceYears: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  parentName: string;
  programName: string;
  rating: number; // defaults to 5
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface VisitInquiry {
  parentName: string;
  phone: string;
  childAge: string;
  preferredProgram: string;
  visitDate: string;
  message: string;
}
