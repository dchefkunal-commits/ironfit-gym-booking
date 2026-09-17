import { Service, Trainer, Appointment } from '../types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: 'srv-1',
    name: '1-on-1 Strength & Hypertrophy',
    category: 'Strength',
    durationMinutes: 60,
    intensity: 'High',
    description: 'Personalized barbell and resistance programming focused on mechanical tension, progressive overload, and technical mastery.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
    features: [
      'Comprehensive movement screening',
      'Personalized exercise selection & tempo',
      'Barbell & dumbbell form optimization',
      'Post-session lifting log notes'
    ],
    active: true,
  },
  {
    id: 'srv-2',
    name: 'HIIT & Athletic Conditioning',
    category: 'Conditioning',
    durationMinutes: 45,
    intensity: 'Extreme',
    description: 'High-octane metabolic intervals combining ski-ergs, assault bikes, kettlebells, and plyometrics to maximize VO2 max.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
    features: [
      'Heart rate zone targeted conditioning',
      'Lactate threshold threshold drills',
      'Dynamic power and sprint intervals',
      'Rapid metabolic burn'
    ],
    active: true,
  },
  {
    id: 'srv-3',
    name: 'Functional Mobility & Recovery',
    category: 'Mobility',
    durationMinutes: 50,
    intensity: 'Moderate',
    description: 'Joint decompression, active myofascial release, and kinetic chain alignment to eliminate stiffness and speed recovery.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=80',
    features: [
      'Thoracic spine and hip openers',
      'PNF stretching & band distractor work',
      'Deep fascial tissue release',
      'Breathing reset & nervous system cool-down'
    ],
    active: true,
  },
  {
    id: 'srv-4',
    name: 'Boxing & Striking Conditioning',
    category: 'Combat',
    durationMinutes: 60,
    intensity: 'High',
    description: 'Authentic pugilistic footwork, heavy bag power generation, and mitt work paired with rotational core development.',
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1000&q=80',
    features: [
      'Individual pad and mitt combinations',
      'Stance, slip, and angle footwork',
      'Heavy bag cadence rounds',
      'Rotational power & rotational core drills'
    ],
    active: true,
  },
  {
    id: 'srv-5',
    name: 'Olympic Lifting & Technical Barbell',
    category: 'Strength',
    durationMinutes: 75,
    intensity: 'Extreme',
    description: 'Detailed technical instruction on the Snatch, Clean & Jerk, pull mechanics, catch positions, and overhead stability.',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1000&q=80',
    features: [
      'Slow-motion video review of bar path',
      'Position work from blocks and hang',
      'Triple extension and turnover timing',
      'Wrist, ankle, and shoulder prep'
    ],
    active: true,
  },
  {
    id: 'srv-6',
    name: 'Body Composition & Nutrition Coaching',
    category: 'Wellness',
    durationMinutes: 45,
    intensity: 'Moderate',
    description: 'Bioelectrical impedance body composition analysis, macro profiling, and sustainable nutritional strategy.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1000&q=80',
    features: [
      'InBody multi-frequency scan',
      'Calculated BMR and TDEE calculation',
      'Custom macronutrient breakdown',
      'Supplementation & hydration guidelines'
    ],
    active: true,
  },
];

export const INITIAL_TRAINERS: Trainer[] = [
  {
    id: 'trn-1',
    name: 'Marcus "Vance" Sterling',
    title: 'Head Strength Coach & Biomechanics Lead',
    specialties: ['Powerlifting', 'Hypertrophy', 'Movement Screening'],
    experienceYears: 11,
    bio: 'Former collegiate powerlifting champion with over a decade coaching elite athletes and everyday lifters. Focuses on bulletproof technique and structural balance.',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80',
    certifications: ['CSCS (NSCA)', 'USAW Level 2 Senior Coach', 'Precision Nutrition L1'],
    workingHours: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      start: '06:00',
      end: '16:00',
    },
    active: true,
  },
  {
    id: 'trn-2',
    name: 'Elena Rostova',
    title: 'Senior Athletic Performance Specialist',
    specialties: ['HIIT', 'Functional Mobility', 'Kettlebells'],
    experienceYears: 8,
    bio: 'Specializes in high-intensity conditioning and longevity. Elena blends explosive functional training with restorative joint care so clients perform at their peak.',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&q=80',
    certifications: ['NASM-CPT', 'FMS Level 2 Certified', 'StrongFirst Kettlebell SFG I'],
    workingHours: {
      days: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'],
      start: '07:30',
      end: '18:00',
    },
    active: true,
  },
  {
    id: 'trn-3',
    name: 'David Kalu',
    title: 'Striking & Combat Conditioning Coach',
    specialties: ['Boxing', 'Agility', 'Rotational Power'],
    experienceYears: 9,
    bio: 'Former golden gloves contender turned performance coach. David brings high energy, razor-sharp rhythm, and relentless cardiovascular endurance to every session.',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
    certifications: ['USA Boxing Certified Coach', 'TRX Master Trainer', 'ACE-CPT'],
    workingHours: {
      days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      start: '08:00',
      end: '19:00',
    },
    active: true,
  },
  {
    id: 'trn-4',
    name: 'Sarah Chen',
    title: 'Olympic Weightlifting & Nutrition Coach',
    specialties: ['Olympic Lifting', 'Body Recomp', 'Macro Planning'],
    experienceYears: 7,
    bio: 'National level weightlifter with an evidence-based approach to bar mechanics and body composition. Dedicated to building strength and confidence through precision.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    certifications: ['USAW Level 1', 'ISSN Sports Nutrition Specialist', 'CSCS'],
    workingHours: {
      days: ['Monday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'],
      start: '09:00',
      end: '17:30',
    },
    active: true,
  },
  {
    id: 'trn-5',
    name: 'Jaxson Thorne',
    title: 'Functional Movement & Tactical Fitness',
    specialties: ['Endurance', 'Mobility & Rehab', 'Functional Hypertrophy'],
    experienceYears: 6,
    bio: 'Former military physical training coordinator specializing in mental resilience, loaded carries, and durable, injury-resistant muscular development.',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80',
    certifications: ['CrossFit L-2 Trainer', 'Functional Range Conditioning (FRCms)', 'CPR/AED Pro'],
    workingHours: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Saturday', 'Sunday'],
      start: '06:00',
      end: '15:00',
    },
    active: true,
  },
];

export const INITIAL_TIME_SLOTS = [
  '06:00 AM',
  '07:30 AM',
  '09:00 AM',
  '10:30 AM',
  '01:00 PM',
  '02:30 PM',
  '04:00 PM',
  '05:30 PM',
  '07:00 PM',
];

// Provide helper to get formatted dates relative to today
const getRelativeDate = (offsetDays: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'IF-74819',
    serviceId: 'srv-1',
    serviceName: '1-on-1 Strength & Hypertrophy',
    trainerId: 'trn-1',
    trainerName: 'Marcus "Vance" Sterling',
    date: getRelativeDate(1), // Tomorrow
    time: '09:00 AM',
    customerName: 'Alexander Hayes',
    customerPhone: '+1 (555) 234-5678',
    customerEmail: 'alex.hayes@example.com',
    notes: 'Focusing on deadlift lockout and shoulder stability.',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'IF-82041',
    serviceId: 'srv-2',
    serviceName: 'HIIT & Athletic Conditioning',
    trainerId: 'trn-2',
    trainerName: 'Elena Rostova',
    date: getRelativeDate(2),
    time: '10:30 AM',
    customerName: 'Sophia Martinez',
    customerPhone: '+1 (555) 987-6543',
    customerEmail: 'sophia.m@example.com',
    notes: 'Training for sprint triathlon this summer.',
    status: 'Pending',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'IF-63102',
    serviceId: 'srv-4',
    serviceName: 'Boxing & Striking Conditioning',
    trainerId: 'trn-3',
    trainerName: 'David Kalu',
    date: getRelativeDate(3),
    time: '04:00 PM',
    customerName: 'Jordan Vance',
    customerPhone: '+1 (555) 456-7890',
    customerEmail: 'jordan.v@example.com',
    notes: 'Beginner boxing pad drills.',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'IF-51928',
    serviceId: 'srv-3',
    serviceName: 'Functional Mobility & Recovery',
    trainerId: 'trn-2',
    trainerName: 'Elena Rostova',
    date: getRelativeDate(-1), // Yesterday
    time: '01:00 PM',
    customerName: 'Rachel Kim',
    customerPhone: '+1 (555) 321-7654',
    customerEmail: 'rachel.k@example.com',
    notes: 'Lower back stiffness relief.',
    status: 'Completed',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: 'IF-40912',
    serviceId: 'srv-5',
    serviceName: 'Olympic Lifting & Technical Barbell',
    trainerId: 'trn-4',
    trainerName: 'Sarah Chen',
    date: getRelativeDate(0), // Today
    time: '05:30 PM',
    customerName: 'Liam O\'Connor',
    customerPhone: '+1 (555) 789-0123',
    customerEmail: 'liam.oc@example.com',
    notes: 'Emergency work conflict, will reschedule.',
    status: 'Cancelled',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
];
