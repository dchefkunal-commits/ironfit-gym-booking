import React, { useState, useEffect } from 'react';
import { Page } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { TrainersPage } from './pages/TrainersPage';
import { BookAppointmentPage } from './pages/BookAppointmentPage';
import { MyAppointmentPage } from './pages/MyAppointmentPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { getServices, getTrainers, isAdminLoggedIn, setAdminLoggedIn } from './data/storage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [services, setServices] = useState(getServices());
  const [trainers, setTrainers] = useState(getTrainers());

  // Deep linking state for booking wizard
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>();
  const [preselectedTrainerId, setPreselectedTrainerId] = useState<string | undefined>();
  const [myApptInitialQuery, setMyApptInitialQuery] = useState<string | undefined>();

  // Refresh services & trainers from storage whenever navigating
  const refreshAppData = () => {
    setServices(getServices());
    setTrainers(getTrainers());
  };

  const handleNavigate = (page: Page) => {
    // If trying to access admin dashboard without authentication, go to login
    if (page === 'admin-dashboard' && !isAdminLoggedIn()) {
      setCurrentPage('admin-login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    refreshAppData();
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectServiceForBooking = (serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setPreselectedTrainerId(undefined);
    refreshAppData();
    setCurrentPage('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTrainerForBooking = (trainerId: string) => {
    setPreselectedTrainerId(trainerId);
    refreshAppData();
    setCurrentPage('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewBookingInMyAppointments = (bookingId: string) => {
    setMyApptInitialQuery(bookingId);
    setCurrentPage('my-appointment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLoginSuccess = () => {
    refreshAppData();
    setCurrentPage('admin-dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogout = () => {
    setAdminLoggedIn(false);
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0c10] text-[#e0e2ec]">
      {/* Navigation Header */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectServiceForBooking={handleSelectServiceForBooking}
            onSelectTrainerForBooking={handleSelectTrainerForBooking}
            services={services}
            trainers={trainers}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            services={services}
            onSelectServiceForBooking={handleSelectServiceForBooking}
          />
        )}

        {currentPage === 'trainers' && (
          <TrainersPage
            trainers={trainers}
            onSelectTrainerForBooking={handleSelectTrainerForBooking}
          />
        )}

        {currentPage === 'book' && (
          <BookAppointmentPage
            services={services}
            trainers={trainers}
            preselectedServiceId={preselectedServiceId}
            preselectedTrainerId={preselectedTrainerId}
            onNavigate={handleNavigate}
            onViewBookingInMyAppointments={handleViewBookingInMyAppointments}
          />
        )}

        {currentPage === 'my-appointment' && (
          <MyAppointmentPage
            initialSearchQuery={myApptInitialQuery}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'contact' && <ContactPage />}

        {currentPage === 'admin-login' && (
          <AdminLoginPage
            onLoginSuccess={handleAdminLoginSuccess}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'admin-dashboard' && (
          <AdminDashboardPage
            onLogout={handleAdminLogout}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
