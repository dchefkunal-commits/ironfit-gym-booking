import React, { useState, useEffect } from 'react';
import {
  Check,
  Calendar,
  Clock,
  User,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Copy,
  Printer,
  Sparkles,
  Dumbbell,
  Phone,
  Mail,
  ArrowRight
} from 'lucide-react';
import { Service, Trainer, Appointment, Page } from '../types';
import { addAppointment, getAvailableSlots } from '../data/storage';

interface BookAppointmentPageProps {
  services: Service[];
  trainers: Trainer[];
  preselectedServiceId?: string;
  preselectedTrainerId?: string;
  onNavigate: (page: Page) => void;
  onViewBookingInMyAppointments?: (bookingId: string) => void;
}

export const BookAppointmentPage: React.FC<BookAppointmentPageProps> = ({
  services,
  trainers,
  preselectedServiceId,
  preselectedTrainerId,
  onNavigate,
  onViewBookingInMyAppointments,
}) => {
  // Step state: 1: Service, 2: Trainer, 3: Date, 4: Time Slot, 5: Customer Details, 6: Confirm
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preselectedServiceId || (services[0]?.id ?? '')
  );
  const [selectedTrainerId, setSelectedTrainerId] = useState<string>(
    preselectedTrainerId || (trainers[0]?.id ?? '')
  );

  // Date setup: default to tomorrow
  const getInitialDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [selectedDate, setSelectedDate] = useState<string>(getInitialDate());
  const [selectedTime, setSelectedTime] = useState<string>('09:00 AM');

  // Customer Details
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerNotes, setCustomerNotes] = useState<string>('');

  // Confirmation result
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Handle incoming props if pre-selected
  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  useEffect(() => {
    if (preselectedTrainerId) {
      setSelectedTrainerId(preselectedTrainerId);
    }
  }, [preselectedTrainerId]);

  const selectedService = services.find((s) => s.id === selectedServiceId) || services[0];
  const selectedTrainer = trainers.find((t) => t.id === selectedTrainerId) || trainers[0];

  // Available slots for selected trainer and date
  const availableSlots = selectedTrainerId && selectedDate
    ? getAvailableSlots(selectedTrainerId, selectedDate)
    : [];

  // Generate next 14 days for quick date picker
  const upcomingDays = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1); // starting tomorrow
    const iso = d.toISOString().split('T')[0];
    const weekday = d.toLocaleDateString('en-US', { weekday: 'short' });
    const month = d.toLocaleDateString('en-US', { month: 'short' });
    const day = d.getDate();
    return { iso, weekday, month, day, dateObj: d };
  });

  // Step validation
  const canGoNext = () => {
    switch (currentStep) {
      case 1:
        return !!selectedServiceId;
      case 2:
        return !!selectedTrainerId;
      case 3:
        return !!selectedDate;
      case 4:
        return !!selectedTime;
      case 5:
        return (
          customerName.trim().length >= 2 &&
          customerPhone.trim().length >= 7 &&
          customerEmail.trim().includes('@')
        );
      default:
        return true;
    }
  };

  const handleNext = () => {
    setErrorMsg('');
    if (currentStep === 5) {
      if (!customerName.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      if (!customerPhone.trim() || customerPhone.length < 7) {
        setErrorMsg('Please enter a valid phone number.');
        return;
      }
      if (!customerEmail.trim() || !customerEmail.includes('@')) {
        setErrorMsg('Please enter a valid email address.');
        return;
      }
    }
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setErrorMsg('');
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleConfirmAppointment = () => {
    if (!selectedService || !selectedTrainer) return;

    // Generate unique ID
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newId = `IF-${randomSuffix}`;

    const newAppointment: Appointment = {
      id: newId,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      trainerId: selectedTrainer.id,
      trainerName: selectedTrainer.name,
      date: selectedDate,
      time: selectedTime,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail.trim().toLowerCase(),
      notes: customerNotes.trim() || undefined,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    addAppointment(newAppointment);
    setConfirmedBooking(newAppointment);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyBookingId = () => {
    if (confirmedBooking) {
      navigator.clipboard.writeText(confirmedBooking.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleResetForNewBooking = () => {
    setConfirmedBooking(null);
    setCurrentStep(1);
    setCustomerNotes('');
  };

  // If appointment confirmed, render the Confirmation Screen
  if (confirmedBooking) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="rounded-3xl bg-[#11131b] border border-[#26283b] p-6 sm:p-10 space-y-8 shadow-2xl">
          {/* Header check */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Booking Received
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase text-white tracking-tight">
              Appointment Scheduled!
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 max-w-lg mx-auto">
              Your session has been securely registered in the IronFit booking schedule. A confirmation copy will be sent to your email.
            </p>
          </div>

          {/* Unique Booking ID Banner */}
          <div className="rounded-2xl bg-neutral-900/90 border border-neutral-800 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Official Booking Reference ID
              </span>
              <div className="font-display text-3xl sm:text-4xl font-bold text-amber-400 tracking-wider">
                {confirmedBooking.id}
              </div>
              <span className="text-xs text-neutral-400">
                Keep this code to look up or cancel your appointment anytime.
              </span>
            </div>
            <button
              id="copy-booking-id-btn"
              onClick={handleCopyBookingId}
              className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold flex items-center gap-2 border border-neutral-700 transition-colors shrink-0"
            >
              <Copy className="w-4 h-4 text-amber-400" />
              <span>{copiedId ? 'Copied to Clipboard!' : 'Copy Booking ID'}</span>
            </button>
          </div>

          {/* Appointment Details Receipt */}
          <div className="rounded-2xl bg-[#0d0e14] border border-neutral-800/80 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <span className="text-sm font-bold uppercase tracking-wider text-white">
                Session Summary
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30">
                Status: {confirmedBooking.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-850">
                <span className="text-xs text-neutral-400 block">Training Service</span>
                <span className="font-bold text-white text-base">
                  {confirmedBooking.serviceName}
                </span>
                <span className="text-xs text-amber-400 mt-1 block">
                  {selectedService?.durationMinutes} min session • {selectedService?.intensity} Intensity
                </span>
              </div>

              <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-850">
                <span className="text-xs text-neutral-400 block">Assigned Coach</span>
                <span className="font-bold text-white text-base">
                  {confirmedBooking.trainerName}
                </span>
                <span className="text-xs text-neutral-400 mt-1 block">
                  {selectedTrainer?.title}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-850">
                <span className="text-xs text-neutral-400 block">Date & Time</span>
                <span className="font-bold text-white text-base">
                  {confirmedBooking.date}
                </span>
                <span className="text-xs text-amber-400 font-semibold block mt-1">
                  {confirmedBooking.time}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-850">
                <span className="text-xs text-neutral-400 block">Customer Information</span>
                <span className="font-bold text-white text-base">
                  {confirmedBooking.customerName}
                </span>
                <span className="text-xs text-neutral-400 block mt-1">
                  {confirmedBooking.customerPhone} • {confirmedBooking.customerEmail}
                </span>
              </div>
            </div>

            {confirmedBooking.notes && (
              <div className="p-3 rounded-lg bg-neutral-900/40 border border-neutral-850 text-xs">
                <span className="text-neutral-400 font-semibold">Special Notes / Goals: </span>
                <span className="text-neutral-300">{confirmedBooking.notes}</span>
              </div>
            )}

            {/* Arrival Guidelines */}
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-neutral-300 space-y-1">
              <div className="font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Facility Arrival Guidelines</span>
              </div>
              <p>
                Please arrive 10 minutes prior to your session time at 450 Ironworks Blvd. Locker rooms, water stations, and warm-up platforms will be open for you.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              id="view-in-my-appointments-btn"
              onClick={() => {
                if (onViewBookingInMyAppointments) {
                  onViewBookingInMyAppointments(confirmedBooking.id);
                } else {
                  onNavigate('my-appointment');
                }
              }}
              className="flex-1 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-sm uppercase tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>View in My Appointments</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="print-confirmation-btn"
              onClick={handlePrint}
              className="py-3.5 px-5 rounded-xl bg-neutral-850 hover:bg-neutral-800 text-neutral-200 text-sm font-semibold border border-neutral-700 transition-colors flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4 text-neutral-400" />
              <span>Print Receipt</span>
            </button>

            <button
              id="book-another-appointment-btn"
              onClick={handleResetForNewBooking}
              className="py-3.5 px-5 rounded-xl bg-neutral-900 hover:bg-neutral-850 text-neutral-300 text-sm font-semibold border border-neutral-800 transition-colors"
            >
              Book Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  const stepsList = [
    { num: 1, label: 'Service' },
    { num: 2, label: 'Trainer' },
    { num: 3, label: 'Date' },
    { num: 4, label: 'Time' },
    { num: 5, label: 'Details' },
    { num: 6, label: 'Confirm' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
          IronFit Scheduling System
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white">
          Book Your Training Session
        </h1>
        <p className="text-sm text-neutral-400 max-w-xl mx-auto">
          Complete the steps below to reserve your dedicated coach and training platform.
        </p>
      </div>

      {/* Progress Wizard Steps */}
      <div className="bg-[#10121a] border border-[#222432] rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="grid grid-cols-6 gap-2 sm:gap-4">
          {stepsList.map((step) => {
            const isDone = currentStep > step.num;
            const isCurrent = currentStep === step.num;

            return (
              <button
                key={step.num}
                id={`wizard-step-btn-${step.num}`}
                onClick={() => {
                  if (step.num < currentStep) {
                    setCurrentStep(step.num);
                  }
                }}
                disabled={step.num > currentStep}
                className={`flex flex-col items-center text-center transition-all ${
                  isCurrent
                    ? 'opacity-100 scale-105'
                    : isDone
                    ? 'opacity-90 hover:opacity-100 cursor-pointer'
                    : 'opacity-40 cursor-not-allowed'
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mb-1 transition-all ${
                    isDone
                      ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                      : isCurrent
                      ? 'bg-amber-400 text-black ring-4 ring-amber-400/20 font-extrabold'
                      : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                  }`}
                >
                  {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : step.num}
                </div>
                <span
                  className={`text-[10px] sm:text-xs font-semibold tracking-wide uppercase truncate max-w-full ${
                    isCurrent ? 'text-amber-400 font-bold' : 'text-neutral-400'
                  }`}
                >
                  {step.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Error notification if any */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Wizard Content Card */}
      <div className="rounded-2xl bg-[#11131a] border border-[#222432] p-6 sm:p-8 shadow-xl space-y-6">
        {/* STEP 1: SERVICE SELECTION */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-neutral-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-amber-400" />
                <span>Step 1: Select Training Service</span>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Choose the program discipline tailored to your fitness objectives.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => {
                const isSelected = selectedServiceId === service.id;
                return (
                  <div
                    key={service.id}
                    id={`select-service-card-${service.id}`}
                    onClick={() => setSelectedServiceId(service.id)}
                    className={`cursor-pointer rounded-xl p-4 border transition-all flex gap-4 ${
                      isSelected
                        ? 'bg-neutral-900 border-amber-400 ring-2 ring-amber-400/20 shadow-lg'
                        : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-20 h-20 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-400 uppercase">
                          {service.category}
                        </span>
                        <span className="text-[11px] text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
                          {service.durationMinutes} min
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-base leading-snug">
                        {service.name}
                      </h4>
                      <p className="text-xs text-neutral-400 line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: TRAINER SELECTION */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-neutral-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-amber-400" />
                <span>Step 2: Select Your Coach</span>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Choose your master instructor for this session.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {trainers.map((trainer) => {
                const isSelected = selectedTrainerId === trainer.id;
                return (
                  <div
                    key={trainer.id}
                    id={`select-trainer-card-${trainer.id}`}
                    onClick={() => setSelectedTrainerId(trainer.id)}
                    className={`cursor-pointer rounded-xl p-4 border transition-all flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? 'bg-neutral-900 border-amber-400 ring-2 ring-amber-400/20 shadow-lg'
                        : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={trainer.image}
                        alt={trainer.name}
                        className="w-14 h-14 rounded-lg object-cover shrink-0 border border-neutral-700"
                      />
                      <div>
                        <h4 className="font-bold text-white text-base leading-tight">
                          {trainer.name}
                        </h4>
                        <span className="text-xs text-amber-400 font-semibold block mt-0.5">
                          {trainer.title}
                        </span>
                        <span className="text-[11px] text-neutral-400">
                          {trainer.experienceYears} Years Exp
                        </span>
                      </div>
                    </div>

                    <div className="text-[11px] text-neutral-400 bg-neutral-900 p-2 rounded border border-neutral-800 space-y-1">
                      <div className="font-semibold text-neutral-300">Days Active:</div>
                      <div>{trainer.workingHours.days.slice(0, 3).join(', ')} +more</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: DATE SELECTION */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-neutral-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber-400" />
                  <span>Step 3: Select Appointment Date</span>
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                  Choose a date over the next 14 days or pick a specific date.
                </p>
              </div>

              {/* Native date picker input */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-neutral-400">Custom Date:</span>
                <input
                  id="booking-custom-date-input"
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Quick 14-day calendar grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
              {upcomingDays.map((day) => {
                const isSelected = selectedDate === day.iso;
                return (
                  <button
                    key={day.iso}
                    id={`date-tile-${day.iso}`}
                    onClick={() => setSelectedDate(day.iso)}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-amber-400 text-black border-amber-400 font-bold shadow-lg shadow-amber-400/20'
                        : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850'
                    }`}
                  >
                    <span className="text-xs uppercase tracking-wider font-semibold opacity-80">
                      {day.weekday}
                    </span>
                    <span className="text-2xl font-bold my-0.5">{day.day}</span>
                    <span className="text-[10px] uppercase tracking-wider opacity-80">
                      {day.month}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs text-neutral-400 flex items-center justify-between">
              <span>Selected Date:</span>
              <span className="text-amber-400 font-bold">{selectedDate}</span>
            </div>
          </div>
        )}

        {/* STEP 4: TIME SLOT SELECTION */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-neutral-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                <span>Step 4: Select Available Time Slot</span>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Showing live open slots for {selectedTrainer?.name} on {selectedDate}.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {availableSlots.map((slotInfo, idx) => {
                const isSelected = selectedTime === slotInfo.slot;
                const isAvailable = slotInfo.available;

                return (
                  <button
                    key={idx}
                    id={`time-slot-${slotInfo.slot.replace(/\s+/g, '-').toLowerCase()}`}
                    disabled={!isAvailable}
                    onClick={() => isAvailable && setSelectedTime(slotInfo.slot)}
                    className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${
                      !isAvailable
                        ? 'opacity-40 bg-neutral-950 border-neutral-850 cursor-not-allowed text-neutral-500'
                        : isSelected
                        ? 'bg-amber-400 text-black border-amber-400 font-bold shadow-lg shadow-amber-400/20'
                        : 'bg-neutral-900 text-neutral-200 border-neutral-800 hover:border-amber-400 hover:bg-neutral-850 cursor-pointer'
                    }`}
                  >
                    <span className="text-base font-bold">{slotInfo.slot}</span>
                    <span className="text-[10px] uppercase font-semibold mt-1">
                      {isAvailable ? 'Available' : slotInfo.reason || 'Unavailable'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: CUSTOMER DETAILS */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-neutral-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <User className="w-5 h-5 text-amber-400" />
                <span>Step 5: Customer Contact Details</span>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Please enter your information so we can reserve your slot and send your booking confirmation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5 sm:col-span-2">
                <label
                  htmlFor="booking-fullname-input"
                  className="text-xs font-bold uppercase tracking-wider text-neutral-300"
                >
                  Full Name <span className="text-amber-400">*</span>
                </label>
                <input
                  id="booking-fullname-input"
                  type="text"
                  placeholder="e.g. Johnathan Miller"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="booking-phone-input"
                  className="text-xs font-bold uppercase tracking-wider text-neutral-300"
                >
                  Phone Number <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                  <input
                    id="booking-phone-input"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="booking-email-input"
                  className="text-xs font-bold uppercase tracking-wider text-neutral-300"
                >
                  Email Address <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                  <input
                    id="booking-email-input"
                    type="email"
                    placeholder="john@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label
                  htmlFor="booking-notes-input"
                  className="text-xs font-bold uppercase tracking-wider text-neutral-300"
                >
                  Fitness Goals or Specific Notes (Optional)
                </label>
                <textarea
                  id="booking-notes-input"
                  rows={3}
                  placeholder="e.g. Previous shoulder rotator impingement; looking to test 1RM bench press safely."
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: REVIEW & CONFIRM */}
        {currentStep === 6 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="border-b border-neutral-800 pb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-400" />
                <span>Step 6: Review & Confirm Appointment</span>
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Please verify your appointment summary before submitting.
              </p>
            </div>

            <div className="rounded-xl bg-neutral-900/90 border border-neutral-800 p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-xs text-neutral-400 block">Service:</span>
                  <span className="font-bold text-white text-base">
                    {selectedService?.name}
                  </span>
                  <span className="text-xs text-amber-400 block">
                    {selectedService?.durationMinutes} min • {selectedService?.intensity} Intensity
                  </span>
                </div>

                <div>
                  <span className="text-xs text-neutral-400 block">Trainer:</span>
                  <span className="font-bold text-white text-base">
                    {selectedTrainer?.name}
                  </span>
                  <span className="text-xs text-neutral-400 block">
                    {selectedTrainer?.title}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-neutral-400 block">Date & Time:</span>
                  <span className="font-bold text-white text-base">
                    {selectedDate}
                  </span>
                  <span className="text-xs text-amber-400 font-bold block">
                    {selectedTime}
                  </span>
                </div>

                <div>
                  <span className="text-xs text-neutral-400 block">Customer:</span>
                  <span className="font-bold text-white text-base">{customerName}</span>
                  <span className="text-xs text-neutral-400 block">
                    {customerPhone} • {customerEmail}
                  </span>
                </div>
              </div>

              {customerNotes && (
                <div className="pt-2 border-t border-neutral-800 text-xs text-neutral-400">
                  <span className="font-semibold text-neutral-300">Notes: </span>
                  <span>{customerNotes}</span>
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 space-y-1">
              <span className="font-semibold text-neutral-300">Appointment Policy:</span>
              <p>
                Appointments can be rescheduled or cancelled through the "My Appointment" portal with your Booking ID up to 2 hours in advance.
              </p>
            </div>
          </div>
        )}

        {/* Wizard Navigation Footer */}
        <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
          {currentStep > 1 ? (
            <button
              id="wizard-prev-btn"
              onClick={handlePrev}
              className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-sm font-semibold border border-neutral-700 flex items-center gap-2 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 6 ? (
            <button
              id="wizard-next-btn"
              onClick={handleNext}
              disabled={!canGoNext()}
              className={`px-7 py-3 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center gap-2 transition-all ${
                canGoNext()
                  ? 'bg-amber-400 hover:bg-amber-300 text-black shadow-md shadow-amber-400/20 cursor-pointer'
                  : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
              }`}
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="wizard-confirm-booking-btn"
              onClick={handleConfirmAppointment}
              className="px-8 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-amber-400/25 flex items-center gap-2 transition-all"
            >
              <Check className="w-5 h-5 stroke-[2.5]" />
              <span>Confirm Appointment</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
