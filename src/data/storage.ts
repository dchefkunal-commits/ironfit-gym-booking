import { Service, Trainer, Appointment, AppointmentStatus } from '../types';
import { INITIAL_SERVICES, INITIAL_TRAINERS, INITIAL_APPOINTMENTS, INITIAL_TIME_SLOTS } from './initialData';

const STORAGE_KEYS = {
  SERVICES: 'ironfit_services_v1',
  TRAINERS: 'ironfit_trainers_v1',
  APPOINTMENTS: 'ironfit_appointments_v1',
  ADMIN_AUTH: 'ironfit_admin_auth_v1',
  MY_BOOKINGS: 'ironfit_my_recent_bookings_v1',
};

// Safe localStorage wrapper
function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to storage:`, e);
  }
}

// Services CRUD
export function getServices(): Service[] {
  return getItem<Service[]>(STORAGE_KEYS.SERVICES, INITIAL_SERVICES);
}

export function saveServices(services: Service[]): void {
  setItem(STORAGE_KEYS.SERVICES, services);
}

export function addService(service: Omit<Service, 'id'>): Service {
  const current = getServices();
  const newService: Service = {
    ...service,
    id: `srv-${Date.now().toString().slice(-4)}`,
  };
  saveServices([newService, ...current]);
  return newService;
}

export function updateService(updated: Service): void {
  const current = getServices();
  const index = current.findIndex((s) => s.id === updated.id);
  if (index !== -1) {
    current[index] = updated;
    saveServices([...current]);
  }
}

export function deleteService(id: string): void {
  const current = getServices().filter((s) => s.id !== id);
  saveServices(current);
}

// Trainers CRUD
export function getTrainers(): Trainer[] {
  return getItem<Trainer[]>(STORAGE_KEYS.TRAINERS, INITIAL_TRAINERS);
}

export function saveTrainers(trainers: Trainer[]): void {
  setItem(STORAGE_KEYS.TRAINERS, trainers);
}

export function addTrainer(trainer: Omit<Trainer, 'id'>): Trainer {
  const current = getTrainers();
  const newTrainer: Trainer = {
    ...trainer,
    id: `trn-${Date.now().toString().slice(-4)}`,
  };
  saveTrainers([newTrainer, ...current]);
  return newTrainer;
}

export function updateTrainer(updated: Trainer): void {
  const current = getTrainers();
  const index = current.findIndex((t) => t.id === updated.id);
  if (index !== -1) {
    current[index] = updated;
    saveTrainers([...current]);
  }
}

export function deleteTrainer(id: string): void {
  const current = getTrainers().filter((t) => t.id !== id);
  saveTrainers(current);
}

// Appointments CRUD
export function getAppointments(): Appointment[] {
  return getItem<Appointment[]>(STORAGE_KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS);
}

export function saveAppointments(appointments: Appointment[]): void {
  setItem(STORAGE_KEYS.APPOINTMENTS, appointments);
}

export function addAppointment(newAppt: Appointment): void {
  const current = getAppointments();
  saveAppointments([newAppt, ...current]);

  // Also remember in user's recent bookings list
  try {
    const recent = getItem<string[]>(STORAGE_KEYS.MY_BOOKINGS, []);
    if (!recent.includes(newAppt.id)) {
      setItem(STORAGE_KEYS.MY_BOOKINGS, [newAppt.id, ...recent].slice(0, 10));
    }
  } catch {
    // Ignore error
  }
}

export function updateAppointmentStatus(id: string, status: AppointmentStatus): Appointment | null {
  const current = getAppointments();
  const index = current.findIndex((a) => a.id === id);
  if (index !== -1) {
    current[index] = {
      ...current[index],
      status,
    };
    saveAppointments([...current]);
    return current[index];
  }
  return null;
}

export function deleteAppointment(id: string): void {
  const current = getAppointments().filter((a) => a.id !== id);
  saveAppointments(current);
}

// User's recent bookings
export function getMyRecentBookingIds(): string[] {
  return getItem<string[]>(STORAGE_KEYS.MY_BOOKINGS, ['IF-74819', 'IF-82041']);
}

// Admin Auth
export function isAdminLoggedIn(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  } catch {
    return false;
  }
}

export function setAdminLoggedIn(status: boolean): void {
  try {
    if (status) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    }
  } catch (e) {
    console.error(e);
  }
}

// Reset data to defaults
export function resetToDefaults(): void {
  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(INITIAL_SERVICES));
  localStorage.setItem(STORAGE_KEYS.TRAINERS, JSON.stringify(INITIAL_TRAINERS));
  localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(INITIAL_APPOINTMENTS));
  localStorage.setItem(STORAGE_KEYS.MY_BOOKINGS, JSON.stringify(['IF-74819', 'IF-82041']));
}

// Dynamic available time slots calculation
export function getAvailableSlots(trainerId: string, date: string): { slot: string; available: boolean; reason?: string }[] {
  const trainers = getTrainers();
  const trainer = trainers.find((t) => t.id === trainerId);
  const appointments = getAppointments();

  // Parse day of week for the date
  let isWorkingDay = true;
  if (trainer && trainer.workingHours && trainer.workingHours.days) {
    const d = new Date(date + 'T12:00:00');
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayName = dayNames[d.getDay()];
    isWorkingDay = trainer.workingHours.days.includes(currentDayName);
  }

  // Find existing active bookings on this date for this trainer
  const bookedSlots = new Set(
    appointments
      .filter(
        (a) =>
          a.trainerId === trainerId &&
          a.date === date &&
          (a.status === 'Confirmed' || a.status === 'Pending')
      )
      .map((a) => a.time)
  );

  return INITIAL_TIME_SLOTS.map((slot) => {
    if (!isWorkingDay) {
      return { slot, available: false, reason: 'Trainer off on this day' };
    }
    if (bookedSlots.has(slot)) {
      return { slot, available: false, reason: 'Booked' };
    }
    return { slot, available: true };
  });
}
