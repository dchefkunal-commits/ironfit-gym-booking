import React from 'react';
import { Dumbbell, MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[#1e202c] bg-[#07080b] text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-black shadow-md shadow-amber-500/20">
                <Dumbbell className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-display text-2xl font-bold tracking-wider text-white">
                IRON<span className="text-amber-400">FIT</span> GYM
              </span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Premier performance facility built for disciplined athletes and everyday lifters.
              Experience high-caliber coaching, Olympic equipment, and personalized progression.
            </p>
            <div className="flex items-center gap-3 text-xs text-neutral-400 pt-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Facility Open & Accepting Appointments</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  id="footer-nav-home"
                  onClick={() => { onNavigate('home'); window.scrollTo(0, 0); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-services"
                  onClick={() => { onNavigate('services'); window.scrollTo(0, 0); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Services & Training
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-trainers"
                  onClick={() => { onNavigate('trainers'); window.scrollTo(0, 0); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Certified Coaches
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-book"
                  onClick={() => { onNavigate('book'); window.scrollTo(0, 0); }}
                  className="text-amber-400 font-semibold hover:underline"
                >
                  Book an Appointment
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-my-appointment"
                  onClick={() => { onNavigate('my-appointment'); window.scrollTo(0, 0); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  My Appointment Lookup
                </button>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              Hours of Operation
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span className="text-neutral-300">Monday – Friday</span>
                <span className="text-amber-400 font-medium">5:00 AM – 11:00 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span className="text-neutral-300">Saturday</span>
                <span className="text-amber-400 font-medium">7:00 AM – 9:00 PM</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span className="text-neutral-300">Sunday</span>
                <span className="text-amber-400 font-medium">7:00 AM – 8:00 PM</span>
              </div>
              <p className="text-xs text-neutral-500 pt-1">
                *Personal training & consult appointments scheduled within trainer working blocks.
              </p>
            </div>
          </div>

          {/* Contact & Administration */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Gym Location
            </h4>
            <div className="space-y-2.5 text-sm">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>450 Ironworks Blvd, Suite 100, Downtown Athletic District</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="tel:+15554766348" className="hover:text-white transition-colors">
                  +1 (555) 476-6348
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:desk@ironfitgym.com" className="hover:text-white transition-colors">
                  desk@ironfitgym.com
                </a>
              </p>
              <div className="pt-2">
                <button
                  id="footer-admin-link"
                  onClick={() => { onNavigate('admin-login'); window.scrollTo(0, 0); }}
                  className="text-xs text-neutral-500 hover:text-amber-400 flex items-center gap-1.5 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin / Staff Portal</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-neutral-850 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <p>© {new Date().getFullYear()} IronFit Gym. All rights reserved. Portfolio Booking Project.</p>
          <div className="flex items-center gap-6">
            <span>Clean Architecture</span>
            <span>•</span>
            <span>Mobile-First Responsive</span>
            <span>•</span>
            <span>Appointment Scheduling</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
