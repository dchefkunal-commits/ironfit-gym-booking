import React, { useState } from 'react';
import {
  Calendar,
  Users,
  Dumbbell,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  Plus,
  Trash2,
  Edit2,
  RefreshCw,
  LogOut,
  ShieldCheck,
  Check,
  AlertCircle,
  Phone,
  Mail,
  ChevronRight,
  Eye,
  X
} from 'lucide-react';
import { Appointment, Service, Trainer, AppointmentStatus, Page } from '../types';
import {
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
  getServices,
  saveServices,
  addService,
  updateService,
  deleteService,
  getTrainers,
  saveTrainers,
  addTrainer,
  updateTrainer,
  deleteTrainer,
  resetToDefaults,
  setAdminLoggedIn
} from '../data/storage';

interface AdminDashboardPageProps {
  onLogout: () => void;
  onNavigate: (page: Page) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onLogout,
  onNavigate,
}) => {
  // Active Tab
  const [activeTab, setActiveTab] = useState<'appointments' | 'trainers' | 'services'>('appointments');

  // Appointments State
  const [appointments, setAppointments] = useState<Appointment[]>(getAppointments());
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [selectedApptForDetails, setSelectedApptForDetails] = useState<Appointment | null>(null);

  // Services State
  const [services, setServices] = useState<Service[]>(getServices());
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isAddingService, setIsAddingService] = useState<boolean>(false);

  // Trainers State
  const [trainers, setTrainers] = useState<Trainer[]>(getTrainers());
  const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null);
  const [isAddingTrainer, setIsAddingTrainer] = useState<boolean>(false);

  // Status message
  const [alertMessage, setAlertMessage] = useState<string>('');

  const showAlert = (msg: string) => {
    setAlertMessage(msg);
    setTimeout(() => setAlertMessage(''), 3500);
  };

  // Appointment Actions
  const handleStatusChange = (id: string, newStatus: AppointmentStatus) => {
    updateAppointmentStatus(id, newStatus);
    const updated = getAppointments();
    setAppointments(updated);
    if (selectedApptForDetails && selectedApptForDetails.id === id) {
      setSelectedApptForDetails({ ...selectedApptForDetails, status: newStatus });
    }
    showAlert(`Appointment #${id} updated to "${newStatus}"`);
  };

  const handleDeleteAppt = (id: string) => {
    if (window.confirm(`Delete appointment #${id} permanently?`)) {
      deleteAppointment(id);
      setAppointments(getAppointments());
      if (selectedApptForDetails?.id === id) setSelectedApptForDetails(null);
      showAlert(`Appointment #${id} deleted.`);
    }
  };

  // Reset demo data
  const handleResetData = () => {
    if (window.confirm('Reset all gym appointments, trainers, and services back to initial sample dataset?')) {
      resetToDefaults();
      setAppointments(getAppointments());
      setServices(getServices());
      setTrainers(getTrainers());
      showAlert('All gym records reset to default sample data.');
    }
  };

  // Filtered Appointments
  const filteredAppointments = appointments.filter((appt) => {
    if (statusFilter !== 'All' && appt.status !== statusFilter) return false;
    if (dateFilter && appt.date !== dateFilter) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchId = appt.id.toLowerCase().includes(q);
      const matchName = appt.customerName.toLowerCase().includes(q);
      const matchPhone = appt.customerPhone.toLowerCase().includes(q);
      const matchEmail = appt.customerEmail.toLowerCase().includes(q);
      const matchService = appt.serviceName.toLowerCase().includes(q);
      const matchTrainer = appt.trainerName.toLowerCase().includes(q);
      if (!matchId && !matchName && !matchPhone && !matchEmail && !matchService && !matchTrainer) {
        return false;
      }
    }
    return true;
  });

  // Calculate Metrics
  const totalCount = appointments.length;
  const pendingCount = appointments.filter((a) => a.status === 'Pending').length;
  const confirmedCount = appointments.filter((a) => a.status === 'Confirmed').length;
  const completedCount = appointments.filter((a) => a.status === 'Completed').length;
  const cancelledCount = appointments.filter((a) => a.status === 'Cancelled').length;

  // New Service Form State
  const [serviceFormData, setServiceFormData] = useState({
    name: '',
    category: 'Strength' as Service['category'],
    durationMinutes: 60,
    intensity: 'High' as Service['intensity'],
    description: '',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
    featuresText: '1-on-1 progressive lifting\nForm analysis\nPost-session notes',
  });

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    const features = serviceFormData.featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    if (editingService) {
      updateService({
        ...editingService,
        name: serviceFormData.name,
        category: serviceFormData.category,
        durationMinutes: Number(serviceFormData.durationMinutes),
        intensity: serviceFormData.intensity,
        description: serviceFormData.description,
        image: serviceFormData.image,
        features,
      });
      showAlert(`Updated service: ${serviceFormData.name}`);
    } else {
      addService({
        name: serviceFormData.name,
        category: serviceFormData.category,
        durationMinutes: Number(serviceFormData.durationMinutes),
        intensity: serviceFormData.intensity,
        description: serviceFormData.description,
        image: serviceFormData.image,
        features,
        active: true,
      });
      showAlert(`Added new service: ${serviceFormData.name}`);
    }

    setServices(getServices());
    setIsAddingService(false);
    setEditingService(null);
  };

  const handleStartEditService = (service: Service) => {
    setEditingService(service);
    setServiceFormData({
      name: service.name,
      category: service.category,
      durationMinutes: service.durationMinutes,
      intensity: service.intensity,
      description: service.description,
      image: service.image,
      featuresText: service.features.join('\n'),
    });
    setIsAddingService(true);
  };

  const handleDeleteService = (id: string, name: string) => {
    if (window.confirm(`Delete service "${name}"?`)) {
      deleteService(id);
      setServices(getServices());
      showAlert(`Service "${name}" removed.`);
    }
  };

  // New Trainer Form State
  const [trainerFormData, setTrainerFormData] = useState({
    name: '',
    title: '',
    specialtiesText: 'Strength, Hypertrophy, Mobility',
    experienceYears: 5,
    bio: '',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80',
    certificationsText: 'CSCS (NSCA)\nUSAW Level 1',
    startHour: '07:00',
    endHour: '17:00',
  });

  const handleSaveTrainer = (e: React.FormEvent) => {
    e.preventDefault();
    const specialties = trainerFormData.specialtiesText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const certifications = trainerFormData.certificationsText
      .split('\n')
      .map((c) => c.trim())
      .filter(Boolean);

    if (editingTrainer) {
      updateTrainer({
        ...editingTrainer,
        name: trainerFormData.name,
        title: trainerFormData.title,
        specialties,
        experienceYears: Number(trainerFormData.experienceYears),
        bio: trainerFormData.bio,
        image: trainerFormData.image,
        certifications,
        workingHours: {
          ...editingTrainer.workingHours,
          start: trainerFormData.startHour,
          end: trainerFormData.endHour,
        },
      });
      showAlert(`Updated trainer: ${trainerFormData.name}`);
    } else {
      addTrainer({
        name: trainerFormData.name,
        title: trainerFormData.title,
        specialties,
        experienceYears: Number(trainerFormData.experienceYears),
        bio: trainerFormData.bio,
        image: trainerFormData.image,
        certifications,
        workingHours: {
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          start: trainerFormData.startHour,
          end: trainerFormData.endHour,
        },
        active: true,
      });
      showAlert(`Added new coach: ${trainerFormData.name}`);
    }

    setTrainers(getTrainers());
    setIsAddingTrainer(false);
    setEditingTrainer(null);
  };

  const handleStartEditTrainer = (trainer: Trainer) => {
    setEditingTrainer(trainer);
    setTrainerFormData({
      name: trainer.name,
      title: trainer.title,
      specialtiesText: trainer.specialties.join(', '),
      experienceYears: trainer.experienceYears,
      bio: trainer.bio,
      image: trainer.image,
      certificationsText: trainer.certifications.join('\n'),
      startHour: trainer.workingHours.start,
      endHour: trainer.workingHours.end,
    });
    setIsAddingTrainer(true);
  };

  const handleDeleteTrainer = (id: string, name: string) => {
    if (window.confirm(`Delete coach "${name}"?`)) {
      deleteTrainer(id);
      setTrainers(getTrainers());
      showAlert(`Coach "${name}" removed.`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Admin Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-white">
                IronFit Operations & Admin
              </h1>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                Staff Online
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Manage booking reservations, certified trainer schedules, and service catalog.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            id="admin-reset-sample-data-btn"
            onClick={handleResetData}
            className="px-3 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold border border-neutral-700 flex items-center gap-1.5 transition-colors"
            title="Reload initial realistic sample data"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span>Reset Sample Data</span>
          </button>

          <button
            id="admin-logout-btn"
            onClick={() => {
              setAdminLoggedIn(false);
              onLogout();
            }}
            className="px-3.5 py-2 rounded-lg bg-neutral-900 hover:bg-rose-950/50 text-neutral-400 hover:text-rose-400 text-xs font-semibold border border-neutral-700 hover:border-rose-800/60 flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Alert Banner */}
      {alertMessage && (
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{alertMessage}</span>
        </div>
      )}

      {/* Metric Counters Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-[#11131a] border border-[#222432] space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
            Total Bookings
          </span>
          <div className="font-display text-3xl font-bold text-white leading-none">
            {totalCount}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#11131a] border border-[#222432] space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
            Pending
          </span>
          <div className="font-display text-3xl font-bold text-amber-400 leading-none">
            {pendingCount}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#11131a] border border-[#222432] space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Confirmed
          </span>
          <div className="font-display text-3xl font-bold text-emerald-400 leading-none">
            {confirmedCount}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#11131a] border border-[#222432] space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
            Completed
          </span>
          <div className="font-display text-3xl font-bold text-sky-400 leading-none">
            {completedCount}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#11131a] border border-[#222432] space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
            Cancelled
          </span>
          <div className="font-display text-3xl font-bold text-rose-400 leading-none">
            {cancelledCount}
          </div>
        </div>
      </div>

      {/* Admin Tab Navigation */}
      <div className="flex border-b border-neutral-800 gap-2">
        <button
          id="admin-tab-appointments"
          onClick={() => setActiveTab('appointments')}
          className={`px-5 py-3 text-sm font-bold tracking-wide transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'appointments'
              ? 'border-amber-400 text-amber-400 bg-neutral-900/50'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Appointments ({appointments.length})</span>
        </button>

        <button
          id="admin-tab-trainers"
          onClick={() => setActiveTab('trainers')}
          className={`px-5 py-3 text-sm font-bold tracking-wide transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'trainers'
              ? 'border-amber-400 text-amber-400 bg-neutral-900/50'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Trainers ({trainers.length})</span>
        </button>

        <button
          id="admin-tab-services"
          onClick={() => setActiveTab('services')}
          className={`px-5 py-3 text-sm font-bold tracking-wide transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'services'
              ? 'border-amber-400 text-amber-400 bg-neutral-900/50'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <Dumbbell className="w-4 h-4" />
          <span>Services ({services.length})</span>
        </button>
      </div>

      {/* ================= APPOINTMENTS MANAGEMENT TAB ================= */}
      {activeTab === 'appointments' && (
        <div className="space-y-6">
          {/* Filters and Search Bar */}
          <div className="rounded-2xl bg-[#11131a] border border-[#222432] p-4 sm:p-5 flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
              <input
                id="admin-appointment-search"
                type="text"
                placeholder="Search appointments by ID, customer name, phone, email, service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((status) => (
                <button
                  key={status}
                  id={`admin-filter-${status.toLowerCase()}`}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    statusFilter === status
                      ? 'bg-amber-400 text-black shadow-md'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Date filter */}
            <div className="flex items-center gap-2">
              <input
                id="admin-filter-date"
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="bg-neutral-900 border border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
              {dateFilter && (
                <button
                  id="admin-clear-date-filter"
                  onClick={() => setDateFilter('')}
                  className="text-xs text-neutral-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Appointments Table / Cards */}
          {filteredAppointments.length === 0 ? (
            <div className="rounded-2xl bg-[#11131a] border border-[#222432] p-12 text-center text-neutral-400 space-y-2">
              <Calendar className="w-8 h-8 text-neutral-600 mx-auto" />
              <p className="text-base font-bold text-white">No Appointments Found</p>
              <p className="text-xs">Try adjusting your search query or status filter.</p>
            </div>
          ) : (
            <div className="rounded-2xl bg-[#11131a] border border-[#222432] overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-neutral-800 bg-neutral-900/80 text-neutral-400 text-[11px] font-bold uppercase tracking-wider">
                      <th className="py-3.5 px-4">Booking ID</th>
                      <th className="py-3.5 px-4">Customer</th>
                      <th className="py-3.5 px-4">Service & Coach</th>
                      <th className="py-3.5 px-4">Date & Time</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Quick Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800/60">
                    {filteredAppointments.map((appt) => (
                      <tr
                        key={appt.id}
                        id={`admin-appt-row-${appt.id}`}
                        className="hover:bg-neutral-900/40 transition-colors"
                      >
                        {/* ID */}
                        <td className="py-3.5 px-4 font-mono font-bold text-amber-400 whitespace-nowrap">
                          {appt.id}
                        </td>

                        {/* Customer */}
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-white leading-tight">
                            {appt.customerName}
                          </div>
                          <div className="text-[11px] text-neutral-400 mt-0.5">
                            {appt.customerPhone}
                          </div>
                        </td>

                        {/* Service & Coach */}
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-neutral-200">
                            {appt.serviceName}
                          </div>
                          <div className="text-[11px] text-amber-400/80">
                            Coach: {appt.trainerName}
                          </div>
                        </td>

                        {/* Date & Time */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="text-white font-medium">{appt.date}</div>
                          <div className="text-[11px] text-neutral-400">{appt.time}</div>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase ${
                              appt.status === 'Confirmed'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                : appt.status === 'Pending'
                                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                                : appt.status === 'Completed'
                                ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                            }`}
                          >
                            {appt.status}
                          </span>
                        </td>

                        {/* Action buttons */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1">
                          {appt.status === 'Pending' && (
                            <button
                              id={`admin-confirm-btn-${appt.id}`}
                              onClick={() => handleStatusChange(appt.id, 'Confirmed')}
                              className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                              title="Confirm appointment"
                            >
                              Confirm
                            </button>
                          )}

                          {appt.status === 'Confirmed' && (
                            <button
                              id={`admin-complete-btn-${appt.id}`}
                              onClick={() => handleStatusChange(appt.id, 'Completed')}
                              className="px-2.5 py-1 rounded bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors"
                              title="Mark as completed"
                            >
                              Mark Completed
                            </button>
                          )}

                          {appt.status !== 'Cancelled' && appt.status !== 'Completed' && (
                            <button
                              id={`admin-cancel-btn-${appt.id}`}
                              onClick={() => handleStatusChange(appt.id, 'Cancelled')}
                              className="px-2 py-1 rounded bg-neutral-800 hover:bg-rose-950/60 text-neutral-400 hover:text-rose-400 text-xs font-medium border border-neutral-700 transition-colors"
                              title="Cancel appointment"
                            >
                              Cancel
                            </button>
                          )}

                          <button
                            id={`admin-view-details-btn-${appt.id}`}
                            onClick={() => setSelectedApptForDetails(appt)}
                            className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
                            title="View Customer Notes & Full Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            id={`admin-delete-btn-${appt.id}`}
                            onClick={() => handleDeleteAppt(appt.id)}
                            className="p-1 text-neutral-500 hover:text-rose-400 rounded hover:bg-neutral-800 transition-colors"
                            title="Delete permanently"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= TRAINERS MANAGEMENT TAB ================= */}
      {activeTab === 'trainers' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">Coaching Roster Management</h2>
              <p className="text-xs text-neutral-400">
                Add, update credentials, working hours, and manage active gym trainers.
              </p>
            </div>
            <button
              id="admin-add-trainer-btn"
              onClick={() => {
                setEditingTrainer(null);
                setTrainerFormData({
                  name: '',
                  title: 'Strength & Conditioning Coach',
                  specialtiesText: 'Strength, Hypertrophy, Mobility',
                  experienceYears: 5,
                  bio: 'Certified strength practitioner with extensive lifting coaching experience.',
                  image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80',
                  certificationsText: 'CSCS (NSCA)\nUSAW Level 1',
                  startHour: '07:00',
                  endHour: '17:00',
                });
                setIsAddingTrainer(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add New Trainer</span>
            </button>
          </div>

          {/* Trainer Add/Edit Form Modal */}
          {isAddingTrainer && (
            <div className="rounded-2xl bg-neutral-900 border border-amber-500/40 p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <h3 className="font-bold text-white text-base">
                  {editingTrainer ? `Edit Coach: ${editingTrainer.name}` : 'Add New Coach'}
                </h3>
                <button
                  id="admin-close-trainer-modal-btn"
                  onClick={() => setIsAddingTrainer(false)}
                  className="text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveTrainer} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-neutral-300 uppercase">Coach Name *</label>
                    <input
                      id="trainer-form-name"
                      type="text"
                      required
                      value={trainerFormData.name}
                      onChange={(e) => setTrainerFormData({ ...trainerFormData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white text-xs"
                      placeholder="e.g. Liam Cross"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-neutral-300 uppercase">Title *</label>
                    <input
                      id="trainer-form-title"
                      type="text"
                      required
                      value={trainerFormData.title}
                      onChange={(e) => setTrainerFormData({ ...trainerFormData, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white text-xs"
                      placeholder="e.g. Senior Strength Specialist"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-neutral-300 uppercase">Experience (Years) *</label>
                    <input
                      id="trainer-form-experience"
                      type="number"
                      required
                      min={1}
                      max={40}
                      value={trainerFormData.experienceYears}
                      onChange={(e) => setTrainerFormData({ ...trainerFormData, experienceYears: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-neutral-300 uppercase">Photo Image URL</label>
                    <input
                      id="trainer-form-image"
                      type="url"
                      value={trainerFormData.image}
                      onChange={(e) => setTrainerFormData({ ...trainerFormData, image: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-bold text-neutral-300 uppercase">Specialties (comma separated)</label>
                    <input
                      id="trainer-form-specialties"
                      type="text"
                      value={trainerFormData.specialtiesText}
                      onChange={(e) => setTrainerFormData({ ...trainerFormData, specialtiesText: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white text-xs"
                      placeholder="Powerlifting, Hypertrophy, Conditioning"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-bold text-neutral-300 uppercase">Coach Bio</label>
                    <textarea
                      id="trainer-form-bio"
                      rows={2}
                      value={trainerFormData.bio}
                      onChange={(e) => setTrainerFormData({ ...trainerFormData, bio: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-bold text-neutral-300 uppercase">Certifications (1 per line)</label>
                    <textarea
                      id="trainer-form-certifications"
                      rows={2}
                      value={trainerFormData.certificationsText}
                      onChange={(e) => setTrainerFormData({ ...trainerFormData, certificationsText: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-neutral-800">
                  <button
                    id="trainer-form-cancel-btn"
                    type="button"
                    onClick={() => setIsAddingTrainer(false)}
                    className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    id="trainer-form-save-btn"
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-extrabold uppercase tracking-wide"
                  >
                    Save Coach
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Trainers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainers.map((trainer) => (
              <div
                key={trainer.id}
                id={`admin-trainer-card-${trainer.id}`}
                className="rounded-2xl bg-[#11131a] border border-[#222432] p-5 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-14 h-14 rounded-xl object-cover border border-neutral-700"
                    />
                    <div>
                      <h3 className="font-bold text-white text-base leading-tight">
                        {trainer.name}
                      </h3>
                      <span className="text-xs text-amber-400 font-medium block">
                        {trainer.title}
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        {trainer.experienceYears} Years Exp
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {trainer.bio}
                  </p>

                  <div className="text-[11px] text-neutral-400 bg-neutral-900 p-2.5 rounded-lg space-y-1">
                    <div className="font-semibold text-neutral-300">Active Days:</div>
                    <div className="text-amber-400">{trainer.workingHours.days.join(', ')}</div>
                    <div>Hours: {trainer.workingHours.start} – {trainer.workingHours.end}</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-850 flex items-center justify-between">
                  <button
                    id={`admin-edit-trainer-${trainer.id}`}
                    onClick={() => handleStartEditTrainer(trainer)}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 flex items-center gap-1 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    id={`admin-delete-trainer-${trainer.id}`}
                    onClick={() => handleDeleteTrainer(trainer.id, trainer.name)}
                    className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-rose-950/60 text-xs font-semibold text-neutral-400 hover:text-rose-400 border border-neutral-800 transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= SERVICES MANAGEMENT TAB ================= */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white">Gym Training Services</h2>
              <p className="text-xs text-neutral-400">
                Manage appointment programs, session durations, and training intensity levels.
              </p>
            </div>
            <button
              id="admin-add-service-btn"
              onClick={() => {
                setEditingService(null);
                setServiceFormData({
                  name: '',
                  category: 'Strength',
                  durationMinutes: 60,
                  intensity: 'High',
                  description: 'Comprehensive personalized training block designed for athletic performance.',
                  image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
                  featuresText: '1-on-1 coaching\nTechnique refinement\nProgressive overload',
                });
                setIsAddingService(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add New Service</span>
            </button>
          </div>

          {/* Service Add/Edit Form Modal */}
          {isAddingService && (
            <div className="rounded-2xl bg-neutral-900 border border-amber-500/40 p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <h3 className="font-bold text-white text-base">
                  {editingService ? `Edit Service: ${editingService.name}` : 'Add New Service'}
                </h3>
                <button
                  id="admin-close-service-modal-btn"
                  onClick={() => setIsAddingService(false)}
                  className="text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveService} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-neutral-300 uppercase">Service Name *</label>
                    <input
                      id="service-form-name"
                      type="text"
                      required
                      value={serviceFormData.name}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white text-xs"
                      placeholder="e.g. Kettlebell Power & Flow"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-neutral-300 uppercase">Category *</label>
                    <select
                      id="service-form-category"
                      value={serviceFormData.category}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, category: e.target.value as Service['category'] })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white text-xs"
                    >
                      <option value="Strength">Strength</option>
                      <option value="Conditioning">Conditioning</option>
                      <option value="Mobility">Mobility</option>
                      <option value="Combat">Combat</option>
                      <option value="Wellness">Wellness</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-neutral-300 uppercase">Duration (Minutes) *</label>
                    <input
                      id="service-form-duration"
                      type="number"
                      required
                      min={15}
                      max={180}
                      value={serviceFormData.durationMinutes}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, durationMinutes: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-neutral-300 uppercase">Intensity *</label>
                    <select
                      id="service-form-intensity"
                      value={serviceFormData.intensity}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, intensity: e.target.value as Service['intensity'] })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white text-xs"
                    >
                      <option value="Moderate">Moderate</option>
                      <option value="High">High</option>
                      <option value="Extreme">Extreme</option>
                    </select>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-bold text-neutral-300 uppercase">Banner Image URL</label>
                    <input
                      id="service-form-image"
                      type="url"
                      value={serviceFormData.image}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, image: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-bold text-neutral-300 uppercase">Description</label>
                    <textarea
                      id="service-form-desc"
                      rows={2}
                      value={serviceFormData.description}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white text-xs"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="font-bold text-neutral-300 uppercase">Features & Inclusions (1 per line)</label>
                    <textarea
                      id="service-form-features"
                      rows={3}
                      value={serviceFormData.featuresText}
                      onChange={(e) => setServiceFormData({ ...serviceFormData, featuresText: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-neutral-700 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-neutral-800">
                  <button
                    id="service-form-cancel-btn"
                    type="button"
                    onClick={() => setIsAddingService(false)}
                    className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    id="service-form-save-btn"
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-extrabold uppercase tracking-wide"
                  >
                    Save Service
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                id={`admin-service-card-${service.id}`}
                className="rounded-2xl bg-[#11131a] border border-[#222432] overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#11131a] via-transparent to-transparent" />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-amber-400 border border-neutral-700">
                      {service.category}
                    </div>
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-neutral-900/90 text-[10px] font-semibold text-neutral-300">
                      {service.durationMinutes} min
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h3 className="font-bold text-white text-base">{service.name}</h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="text-[11px] text-neutral-400 flex items-center justify-between">
                      <span>Intensity: <span className="font-bold text-amber-400">{service.intensity}</span></span>
                      <span>{service.features.length} Features</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-neutral-850 flex items-center justify-between">
                  <button
                    id={`admin-edit-service-${service.id}`}
                    onClick={() => handleStartEditService(service)}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 flex items-center gap-1 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    id={`admin-delete-service-${service.id}`}
                    onClick={() => handleDeleteService(service.id, service.name)}
                    className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-rose-950/60 text-xs font-semibold text-neutral-400 hover:text-rose-400 border border-neutral-800 transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Appointment Full Details Modal */}
      {selectedApptForDetails && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#11131a] border border-[#2e3146] p-6 space-y-5 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div>
                <span className="text-xs text-neutral-400 uppercase font-semibold">Appointment Record</span>
                <div className="font-display text-2xl font-bold text-amber-400">
                  {selectedApptForDetails.id}
                </div>
              </div>
              <button
                id="close-appt-details-modal-btn"
                onClick={() => setSelectedApptForDetails(null)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-neutral-850">
                <span className="text-neutral-400">Current Status:</span>
                <span className="font-bold text-white">{selectedApptForDetails.status}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-850">
                <span className="text-neutral-400">Customer Name:</span>
                <span className="font-bold text-white">{selectedApptForDetails.customerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-850">
                <span className="text-neutral-400">Customer Phone:</span>
                <span className="font-mono text-neutral-200">{selectedApptForDetails.customerPhone}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-850">
                <span className="text-neutral-400">Customer Email:</span>
                <span className="text-neutral-200">{selectedApptForDetails.customerEmail}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-850">
                <span className="text-neutral-400">Service:</span>
                <span className="font-bold text-amber-400">{selectedApptForDetails.serviceName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-850">
                <span className="text-neutral-400">Assigned Coach:</span>
                <span className="text-white font-semibold">{selectedApptForDetails.trainerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-850">
                <span className="text-neutral-400">Date & Slot:</span>
                <span className="text-white">{selectedApptForDetails.date} at {selectedApptForDetails.time}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-850">
                <span className="text-neutral-400">Created At:</span>
                <span className="text-neutral-400 text-xs">
                  {new Date(selectedApptForDetails.createdAt).toLocaleString()}
                </span>
              </div>
              {selectedApptForDetails.notes && (
                <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 mt-2">
                  <span className="text-xs font-semibold text-neutral-400 block mb-1">Customer Goals / Notes:</span>
                  <p className="text-xs text-neutral-200">{selectedApptForDetails.notes}</p>
                </div>
              )}
            </div>

            <div className="flex justify-between gap-2 pt-2 border-t border-neutral-800">
              <div className="flex gap-2">
                {selectedApptForDetails.status !== 'Confirmed' && (
                  <button
                    id="modal-confirm-appt-btn"
                    onClick={() => handleStatusChange(selectedApptForDetails.id, 'Confirmed')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                  >
                    Confirm
                  </button>
                )}
                {selectedApptForDetails.status !== 'Completed' && (
                  <button
                    id="modal-complete-appt-btn"
                    onClick={() => handleStatusChange(selectedApptForDetails.id, 'Completed')}
                    className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold"
                  >
                    Complete
                  </button>
                )}
                {selectedApptForDetails.status !== 'Cancelled' && (
                  <button
                    id="modal-cancel-appt-btn"
                    onClick={() => handleStatusChange(selectedApptForDetails.id, 'Cancelled')}
                    className="px-3 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-600 text-white text-xs font-bold"
                  >
                    Cancel
                  </button>
                )}
              </div>
              <button
                id="modal-close-btn"
                onClick={() => setSelectedApptForDetails(null)}
                className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
