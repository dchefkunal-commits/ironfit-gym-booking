import React, { useState } from 'react';
import { Dumbbell, Calendar, User, ShieldCheck, Menu, X, Clock, MapPin } from 'lucide-react';
import { Page } from '../types';
import { isAdminLoggedIn } from '../data/storage';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isAdmin = isAdminLoggedIn();

  const navItems: { id: Page; label: string; icon?: React.ReactNode }[] = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'trainers', label: 'Trainers' },
    { id: 'book', label: 'Book Appointment' },
    { id: 'my-appointment', label: 'My Appointment' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#222430] bg-[#0b0c10]/95 backdrop-blur-md">
      {/* Top micro-bar for quick hours & address */}
      <div className="hidden lg:block border-b border-[#1b1d28] bg-[#08080c] py-1.5 px-6 text-xs text-neutral-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              Mon–Fri: 5:00 AM – 11:00 PM | Sat–Sun: 7:00 AM – 9:00 PM
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              450 Ironworks Blvd, Downtown District
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-neutral-500">Need immediate assistance?</span>
            <a href="tel:+15554766348" className="text-amber-400 font-medium hover:underline">
              +1 (555) IRON-FIT
            </a>
          </div>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo */}
        <button
          id="nav-logo-btn"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-black shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Dumbbell className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-3xl font-bold tracking-wider text-white leading-none">
                IRON<span className="text-amber-400">FIT</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-neutral-800 text-amber-400 border border-amber-500/20">
                GYM
              </span>
            </div>
            <span className="text-[11px] tracking-widest uppercase text-neutral-400 font-semibold">
              Performance & Conditioning
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            const isBook = item.id === 'book';

            if (isBook) {
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`ml-2 px-4 py-2 rounded-lg text-sm font-bold tracking-wide transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/25 ring-2 ring-amber-300'
                      : 'bg-amber-500 hover:bg-amber-400 text-black shadow-md hover:shadow-amber-500/20'
                  }`}
                >
                  <Calendar className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-amber-400 bg-neutral-800/80 font-semibold'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-850'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {/* Admin link button */}
          <button
            id="nav-admin-btn"
            onClick={() => handleNavClick(isAdmin ? 'admin-dashboard' : 'admin-login')}
            className={`ml-2 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              currentPage === 'admin-login' || currentPage === 'admin-dashboard'
                ? 'bg-neutral-800 text-amber-400 border border-amber-500/40'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-850 border border-transparent'
            }`}
            title="Gym Administration"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
            <span>{isAdmin ? 'Dashboard' : 'Admin'}</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            id="nav-mobile-book-btn"
            onClick={() => handleNavClick('book')}
            className="px-3 py-1.5 bg-amber-500 text-black text-xs font-bold rounded-md flex items-center gap-1"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book</span>
          </button>
          <button
            id="nav-mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-[#0d0e14] px-4 pt-3 pb-6 space-y-1.5 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-medium transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-neutral-800 text-amber-400 font-semibold'
                    : 'text-neutral-300 hover:bg-neutral-850 hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {item.id === 'book' && (
                  <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold">
                    Book Now
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 mt-2 border-t border-neutral-800 flex items-center justify-between px-2">
            <button
              id="mobile-nav-admin"
              onClick={() => handleNavClick(isAdmin ? 'admin-dashboard' : 'admin-login')}
              className="text-xs text-neutral-400 hover:text-amber-400 flex items-center gap-2 py-2"
            >
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>{isAdmin ? 'Go to Admin Dashboard' : 'Staff / Admin Portal'}</span>
            </button>
            <span className="text-[11px] text-neutral-500">IronFit Gym v1.0</span>
          </div>
        </div>
      )}
    </header>
  );
};
