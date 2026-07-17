import { Program, WhyUsCard, DayStop, MomentVignette, Teacher, Testimonial, FAQItem } from './types';

export const WHY_US_DATA: WhyUsCard[] = [
  {
    id: 'safety',
    title: 'Nurturing & Safe Haven',
    description: 'A 1:8 teacher-to-child ratio ensures eyes and hearts are on every child. Fully child-proofed indoor facilities and double-gated outdoor play zones.',
    accentColor: 'marigold'
  },
  {
    id: 'play',
    title: 'Play-First Curriculum',
    description: 'We do not drill worksheets. Our stars learn concepts like math, physics, and empathy through tactile play, building blocks, and sensory sand tables.',
    accentColor: 'coral'
  },
  {
    id: 'size',
    title: 'Cosy Cohort Groups',
    description: 'Our small class structures mean teachers can map out custom cognitive paths and adaptive emotional milestone markers for every child.',
    accentColor: 'meadow'
  },
  {
    id: 'updates',
    title: 'Daily Parent Notes',
    description: 'No opaque drop-offs. Receive daily digital digests detailing meals eaten, nap lengths, emotional highlights, and photo highlights of their discoveries.',
    accentColor: 'twilight'
  }
];

export const PROGRAMS_DATA: Program[] = [
  {
    id: 'playgroup',
    name: 'Playgroup',
    stars: 1,
    ageRange: '2 – 3 Years',
    highlights: [
      'Focus on sensory learning and simple language development',
      'Gentle transition from home with short, reassuring routines',
      'Social exposure through shared play, sharing circles, and group snacks'
    ],
    timing: '9:00 AM – 11:30 AM',
    annualFee: 45000
  },
  {
    id: 'nursery',
    name: 'Nursery',
    stars: 2,
    ageRange: '3 – 4 Years',
    highlights: [
      'Tactile pre-math concepts and alphabetic sounds via story loops',
      'Fine-motor development through clay shaping and safety cutting',
      'Independence milestones: stowing bags, washing hands, self-feeding'
    ],
    timing: '8:45 AM – 12:00 PM',
    annualFee: 55000
  },
  {
    id: 'lkg',
    name: 'Lower Kindergarten (LKG)',
    stars: 3,
    ageRange: '4 – 5 Years',
    highlights: [
      'Basic phonics progression, blending sounds, and simple sight words',
      'Mathematical logical grouping, patterns, and number matching',
      'Structured outdoor gardening and physical growth obstacles'
    ],
    timing: '8:45 AM – 12:30 PM',
    annualFee: 65000
  },
  {
    id: 'ukg',
    name: 'Upper Kindergarten (UKG)',
    stars: 4,
    ageRange: '5 – 6 Years',
    highlights: [
      'Sustained early reading, sentence structure, and simple journaling',
      'Basic addition, subtraction concepts, and environmental sciences',
      'Primary school readiness: self-regulation, time tracking, structured team tasks'
    ],
    timing: '8:45 AM – 12:30 PM',
    annualFee: 72000
  }
];

export const DAY_STOPS_DATA: DayStop[] = [
  {
    id: 'welcome',
    time: '8:45 AM',
    title: 'Warm Starry Welcomes',
    description: 'Children are received by their teachers at our double-gated twilight-blue arch. Cozy cubbies store their backpacks, transitioning gently from home to school.',
    category: 'Welcome'
  },
  {
    id: 'circle',
    time: '9:15 AM',
    title: 'Morning Circle & Songs',
    description: 'We gather on the soft sky-blue rug. A daily "Star Captain" is chosen to track the weather dial and update our interactive felt solar-system calendar.',
    category: 'Sustained Focus'
  },
  {
    id: 'sensory',
    time: '9:45 AM',
    title: 'Sensory Exploration & Play',
    description: 'Tactile play takes over. From sorting colored beans, measuring warm water patterns, to building heavy pine-block towers to explore gravity and balance.',
    category: 'Play-Based learning'
  },
  {
    id: 'snack',
    time: '10:30 AM',
    title: 'Healthy Snack & Table Talk',
    description: 'A community meal where we share fresh fruits, organic honey bread, and practice social manners like asking politely, pouring water, and thanking classmates.',
    category: 'Social Manners'
  },
  {
    id: 'outdoor',
    time: '11:00 AM',
    title: 'Wild Garden Play',
    description: 'Outdoor gross motor play. Children scale our wooden climbing dome, plant heirloom cherry tomatoes in the garden patches, and hunt for ladybugs under leaves.',
    category: 'Physical & Nature'
  },
  {
    id: 'creative',
    time: '11:45 AM',
    title: 'Creative Art Studio',
    description: 'A quiet, deeply creative zone for finger-painting, beeswax clay sculpting, or making custom collages with organic pressed leaves collected during garden play.',
    category: 'Expression'
  },
  {
    id: 'story',
    time: '12:15 PM',
    title: 'Story circle & Puppetry',
    description: 'Lights are dimmed, and we sit under our constellation canopy. Teachers lead oral storytelling paired with handmade wool felt puppets to wind down.',
    category: 'Wind Down'
  },
  {
    id: 'dismissal',
    time: '12:30 PM',
    title: 'Afternoon Dawn & Dismissal',
    description: 'Stow slippers, collect note-home envelopes, and transition back. We share a high-five and a warm hug, leaving energized for the next day.',
    category: 'Safe Departure'
  }
];

export const MOMENTS_DATA: MomentVignette[] = [
  {
    id: 'moment1',
    caption: 'Under the reading oak, where stories come alive',
    illustrationType: 'story'
  },
  {
    id: 'moment2',
    caption: 'Tiny hands exploring wormholes and wild tomato gardens',
    illustrationType: 'outdoor'
  },
  {
    id: 'moment3',
    caption: 'Mini masterworks with fingerpaint and boundless wonder',
    illustrationType: 'art'
  }
];

export const TEACHERS_DATA: Teacher[] = [
  {
    id: 'sarah',
    initials: 'SM',
    name: 'Ms. Sarah Miller',
    role: 'Nursery Lead Educator',
    quote: 'Watching a child explain their pinecone spaceship to me is the highlight of my absolute year. Every star shines on its own timeline.',
    experienceYears: 8
  },
  {
    id: 'emily',
    initials: 'EC',
    name: 'Ms. Emily Chen',
    role: 'Playgroup Co-ordinator',
    quote: 'The first drop-off can feel like a big leap, but when they feel the warmth of the sand table, their fears dissolve into wonder.',
    experienceYears: 5
  },
  {
    id: 'david',
    initials: 'DR',
    name: 'Mr. David Ross',
    role: 'Lower KG Instructor',
    quote: 'We don’t drill math. We stack heavy blocks and count ladybug spots. They discover mathematical patterns before they even know the symbol.',
    experienceYears: 6
  },
  {
    id: 'priya',
    initials: 'PP',
    name: 'Ms. Priya Patel',
    role: 'Upper KG Head Educator',
    quote: 'Our goal is not just primary school prep, but cultivating critical thinkers who raise their hand to ask "why" and "how does that work?".',
    experienceYears: 10
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test1',
    quote: 'The twilight-to-dawn branding felt poetic, but the daily reality is even warmer. Our extremely shy daughter now runs to Ms. Emily with wide-open arms.',
    parentName: 'Aarav & Meera Mehta',
    programName: 'Playgroup Parent',
    rating: 5
  },
  {
    id: 'test2',
    quote: 'The 1:8 teacher ratio is real. Ms. Sarah spotted my son’s creative clay dexterity early and supported it. The daily written digests are a masterclass in care.',
    parentName: 'Devika Sharma',
    programName: 'Nursery Parent',
    rating: 5
  },
  {
    id: 'test3',
    quote: 'Our daughter is reading complete chapter books with ease, all without facing high-pressure testing. They hold play and academic progress in perfect starry balance.',
    parentName: 'The Sterling Family',
    programName: 'UKG Parent',
    rating: 5
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq1',
    question: 'What is the teacher-to-child ratio in each classroom?',
    answer: 'We strictly maintain a 1:8 ratio for our Playgroup and Nursery programs (maximum 16 children per cohort with 2 lead educators and 1 helper). For LKG and UKG, the ratio is 1:10 (maximum 20 children per classroom with 2 educators).'
  },
  {
    id: 'faq2',
    question: 'How do you handle the morning drop-off separation anxiety?',
    answer: 'We embrace separation anxiety as a natural developmental milestone. Our gentle twilight transition allows parents to stay for a brief 5-minute comforting ritual on our outdoor deck. Teachers are highly trained in emotional grounding techniques and sensory redirections.'
  },
  {
    id: 'faq3',
    question: 'Is transportation provided by the academy?',
    answer: 'Yes! We offer air-conditioned star-shuttle buses servicing key routes within a 6km radius. Each bus is staffed by a trained female attendant, features secure seatbelts, and has live GPS tracking available for parents on our app.'
  },
  {
    id: 'faq4',
    question: 'How do parent updates work throughout the day?',
    answer: 'We utilize a private digital portal. You will receive a daily digest at 2:00 PM highlighting meal intake, nap duration, toilet milestones, and 2-3 photos of creative and sensory achievements, so you never feel disconnected.'
  },
  {
    id: 'faq5',
    question: 'What is your refund policy on fees and booking visits?',
    answer: 'Booking a visit is entirely free. If you enroll and need to withdraw before the academic year starts, we offer a 100% refund of the security deposit. Term fees are refundable on a pro-rata basis within the first 30 calendar days.'
  }
];

export const CONTACT_INFO = {
  address: '12 Starry Meadow Lane, Block C, Green Fields, [City], [Pin Code]',
  phone: '[+91 XXXXX XXXXX]',
  email: 'hello@littlestars.academy',
  hours: 'Mon – Fri: 8:00 AM – 3:30 PM | Sat: 9:00 AM – 1:00 PM',
  foundedYear: '2018'
};
