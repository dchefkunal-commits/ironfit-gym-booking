export type Page =
  | 'home'
  | 'services'
  | 'trainers'
  | 'book'
  | 'my-appointment'
  | 'contact'
  | 'admin-login'
  | 'admin-dashboard';

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';

export interface Service {
  id: string;
  name: string;
  category: 'Strength' | 'Conditioning' | 'Mobility' | 'Combat' | 'Wellness';
  durationMinutes: number;
  intensity: 'Moderate' | 'High' | 'Extreme';
  description: string;
  image: string;
  features: string[];
  active: boolean;
}

export interface Trainer {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  experienceYears: number;
  bio: string;
  image: string;
  certifications: string[];
  workingHours: {
    days: string[]; // e.g., ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    start: string; // "06:00"
    end: string; // "18:00"
  };
  active: boolean;
}

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  trainerId: string;
  trainerName: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "09:00 AM"
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
  status: AppointmentStatus;
  createdAt: string;
}

export interface BookingState {
  serviceId: string;
  trainerId: string;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
}
