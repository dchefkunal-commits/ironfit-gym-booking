import React, { useState, useEffect } from 'react';
import {
  Search,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock4,
  Check,
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import { Appointment, Page } from '../types';
import { getAppointments, updateAppointmentStatus, getMyRecentBookingIds } from '../data/storage';

interface MyAppointmentPageProps {
  initialSearchQuery?: string;
  onNavigate: (page: Page) => void;
}

export const MyAppointmentPage: React.FC<MyAppointmentPageProps> = ({
  initialSearchQuery,
  onNavigate,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery || '');
  const [appointments, setAppointments] = useState<Appointment[]>(getAppointments());
  const [matchedAppointments, setMatchedAppointments] = useState<Appointment[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [cancelSuccessMsg, setCancelSuccessMsg] = useState<string>('');

  const recentIds = getMyRecentBookingIds();

  const handleSearch = (queryOverride?: string) => {
    const q = (queryOverride !== undefined ? queryOverride : searchQuery).trim().toLowerCase();
    setCancelSuccessMsg('');
    setHasSearched(true);

    if (!q) {
      setMatchedAppointments([]);
      return;
    }

    const all = getAppointments();
    const matches = all.filter((a) => {
      const matchId = a.id.toLowerCase().includes(q);
      const matchPhone = a.customerPhone.toLowerCase().includes(q);
      const matchEmail = a.customerEmail.toLowerCase().includes(q);
      const matchName = a.customerName.toLowerCase().includes(q);
      return matchId || matchPhone || matchEmail || matchName;
    });

    setMatchedAppointments(matches);
  };

  useEffect(() => {
    if (initialSearchQuery) {
      setSearchQuery(initialSearchQuery);
      handleSearch(initialSearchQuery);
    } else if (recentIds.length > 0) {
      // Auto-populate with the most recent user booking
      handleSearch(recentIds[0]);
      setSearchQuery(recentIds[0]);
    }
  }, [initialSearchQuery]);

  const handleConfirmCancel = (id: string) => {
    updateAppointmentStatus(id, 'Cancelled');
    setAppointments(getAppointments());
    // Update matched list as well
    setMatchedAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Cancelled' } : a))
    );
    setCancellingId(null);
    setCancelSuccessMsg(`Appointment #${id} has been cancelled successfully.`);
  };

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Confirmed</span>
          </span>
        );
      case 'Pending':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
            <Clock4 className="w-3.5 h-3.5" />
            <span>Pending Review</span>
          </span>
        );
      case 'Completed':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-sky-500/10 text-sky-400 border border-sky-500/30 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5" />
            <span>Completed</span>
          </span>
        );
      case 'Cancelled':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center gap-1.5">
            <XCircle className="w-3.5 h-3.5" />
            <span>Cancelled</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
          Client Self-Service Portal
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-tight text-white">
          My Appointments
        </h1>
        <p className="text-sm sm:text-base text-neutral-400 max-w-lg mx-auto">
          Look up your gym sessions, verify your coach assignment and time slot, or cancel upcoming appointments.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="rounded-2xl bg-[#11131a] border border-[#222432] p-5 sm:p-6 shadow-xl space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-neutral-400 absolute left-3.5 top-3.5" />
            <input
              id="my-appointment-search-input"
              type="text"
              placeholder="Search by Booking ID (e.g. IF-74819), Phone Number, or Email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
            />
          </div>
          <button
            id="my-appointment-search-btn"
            type="submit"
            className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-sm uppercase tracking-wide transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
          >
            <Search className="w-4 h-4" />
            <span>Find Booking</span>
          </button>
        </form>

        {/* Quick Recent IDs Chips */}
        {recentIds.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-neutral-400">
            <span className="font-semibold text-neutral-300">Quick Recent Bookings:</span>
            {recentIds.map((id) => (
              <button
                key={id}
                id={`recent-booking-chip-${id}`}
                onClick={() => {
                  setSearchQuery(id);
                  handleSearch(id);
                }}
                className="px-2.5 py-1 rounded-md bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-mono font-bold border border-neutral-800 transition-colors"
              >
                {id}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Success Cancellation Toast */}
      {cancelSuccessMsg && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{cancelSuccessMsg}</span>
        </div>
      )}

      {/* Results */}
      {hasSearched && matchedAppointments.length === 0 && (
        <div className="rounded-2xl bg-[#11131a] border border-[#222432] p-10 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-neutral-900 text-neutral-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">No Appointments Found</h3>
          <p className="text-sm text-neutral-400 max-w-md mx-auto">
            We couldn't find any appointment matching "{searchQuery}". Please check your Booking ID or contact our front desk.
          </p>
          <div className="pt-2">
            <button
              id="no-results-book-cta"
              onClick={() => onNavigate('book')}
              className="px-6 py-2.5 rounded-xl bg-amber-400 text-black font-bold text-sm tracking-wide inline-flex items-center gap-2"
            >
              <span>Book a New Appointment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Appointment Cards */}
      <div className="space-y-6">
        {matchedAppointments.map((appointment) => (
          <div
            key={appointment.id}
            id={`appointment-card-${appointment.id}`}
            className="rounded-2xl bg-[#11131a] border border-[#242738] p-6 sm:p-7 space-y-6 shadow-xl"
          >
            {/* Card Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
              <div>
                <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">
                  Booking Reference
                </span>
                <div className="font-display text-2xl sm:text-3xl font-bold text-amber-400 tracking-wider">
                  {appointment.id}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {getStatusBadge(appointment.status)}
              </div>
            </div>

            {/* Grid of details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 rounded-xl bg-neutral-900/70 border border-neutral-800">
                <span className="text-xs text-neutral-400 block mb-1">Training Service</span>
                <span className="font-bold text-white text-base block">
                  {appointment.serviceName}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900/70 border border-neutral-800">
                <span className="text-xs text-neutral-400 block mb-1">Assigned Coach</span>
                <span className="font-bold text-white text-base block">
                  {appointment.trainerName}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900/70 border border-neutral-800">
                <span className="text-xs text-neutral-400 block mb-1">Date & Time</span>
                <span className="font-bold text-white text-base block">
                  {appointment.date}
                </span>
                <span className="text-xs text-amber-400 font-semibold block mt-0.5">
                  {appointment.time}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900/70 border border-neutral-800 sm:col-span-2 md:col-span-3">
                <span className="text-xs text-neutral-400 block mb-1">Customer Details</span>
                <div className="text-sm font-semibold text-white">
                  {appointment.customerName}
                </div>
                <div className="text-xs text-neutral-400 flex flex-wrap gap-4 mt-1">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-neutral-500" />
                    {appointment.customerPhone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-neutral-500" />
                    {appointment.customerEmail}
                  </span>
                </div>
                {appointment.notes && (
                  <div className="mt-2 pt-2 border-t border-neutral-800 text-xs text-neutral-300">
                    <span className="text-neutral-400">Notes:</span> {appointment.notes}
                  </div>
                )}
              </div>
            </div>

            {/* Cancel Confirmation Prompt */}
            {cancellingId === appointment.id ? (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-3">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Are you sure you want to cancel this appointment?</span>
                </div>
                <p className="text-xs text-neutral-300">
                  This will release the reserved time slot for other athletes. You can re-book anytime.
                </p>
                <div className="flex gap-2 pt-1">
                  <button
                    id={`confirm-cancel-btn-${appointment.id}`}
                    onClick={() => handleConfirmCancel(appointment.id)}
                    className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors"
                  >
                    Yes, Cancel Appointment
                  </button>
                  <button
                    id={`abort-cancel-btn-${appointment.id}`}
                    onClick={() => setCancellingId(null)}
                    className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold transition-colors"
                  >
                    Keep Appointment
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  Booked on {new Date(appointment.createdAt).toLocaleDateString()}
                </span>
                {(appointment.status === 'Pending' || appointment.status === 'Confirmed') && (
                  <button
                    id={`open-cancel-dialog-btn-${appointment.id}`}
                    onClick={() => setCancellingId(appointment.id)}
                    className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-rose-950/60 text-neutral-400 hover:text-rose-400 text-xs font-semibold border border-neutral-800 hover:border-rose-800/60 transition-colors"
                  >
                    Cancel This Appointment
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
