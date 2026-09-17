import React from 'react';
import { 
  Dumbbell, 
  Calendar, 
  Award, 
  Users, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Flame, 
  Shield, 
  Star,
  MapPin
} from 'lucide-react';
import { Page, Service, Trainer } from '../types';

interface HomePageProps {
  onNavigate: (page: Page) => void;
  onSelectServiceForBooking: (serviceId: string) => void;
  onSelectTrainerForBooking: (trainerId: string) => void;
  services: Service[];
  trainers: Trainer[];
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectServiceForBooking,
  onSelectTrainerForBooking,
  services,
  trainers,
}) => {
  const featuredServices = services.slice(0, 3);
  const featuredTrainers = trainers.slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0b0c10] via-[#10121a] to-[#0b0c10] px-4 sm:px-6 lg:px-8 py-20">
        {/* Background Image with Dark Overlay & Texture */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=80"
            alt="IronFit Gym Training Facility"
            className="w-full h-full object-cover opacity-20 filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c10] via-[#0b0c10]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold tracking-wide uppercase">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>IronFit Gym Appointment Booking Portal</span>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-tight text-white leading-none">
              BUILT FOR THOSE WHO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
                REFUSE TO QUIT
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-neutral-300 font-normal leading-relaxed">
              Schedule elite 1-on-1 personal training, athletic conditioning, mobility, and combat sessions with accredited master coaches. Real progression starts with your next appointment.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              id="hero-book-btn"
              onClick={() => onNavigate('book')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-base tracking-wide uppercase transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-3 group"
            >
              <Calendar className="w-5 h-5 text-black" />
              <span>Book Appointment Now</span>
              <ArrowRight className="w-5 h-5 text-black transition-transform group-hover:translate-x-1" />
            </button>

            <button
              id="hero-services-btn"
              onClick={() => onNavigate('services')}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 text-white font-bold text-base tracking-wide border border-neutral-700 hover:border-neutral-500 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Programs</span>
            </button>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-neutral-800/80 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <div className="font-display text-3xl sm:text-4xl font-bold text-white leading-none">
                15+
              </div>
              <p className="text-xs uppercase tracking-wider text-neutral-400 mt-1 font-semibold">
                Accredited Coaches
              </p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <div className="font-display text-3xl sm:text-4xl font-bold text-amber-400 leading-none">
                100%
              </div>
              <p className="text-xs uppercase tracking-wider text-neutral-400 mt-1 font-semibold">
                1-on-1 Focus
              </p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <div className="font-display text-3xl sm:text-4xl font-bold text-white leading-none">
                5,000
              </div>
              <p className="text-xs uppercase tracking-wider text-neutral-400 mt-1 font-semibold">
                Sq Ft Modern Facility
              </p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <div className="font-display text-3xl sm:text-4xl font-bold text-amber-400 leading-none">
                7 DAYS
              </div>
              <p className="text-xs uppercase tracking-wider text-neutral-400 mt-1 font-semibold">
                Flexible Time Slots
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Process Flow Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#12141d] to-[#171924] border border-[#242738] p-6 sm:p-8 lg:p-10">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Effortless Scheduling
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white tracking-wide">
              How Booking Works at IronFit
            </h2>
            <p className="text-sm text-neutral-400">
              Select your program and coach in seconds. No lengthy forms or complex memberships.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {[
              { step: '1', title: 'Service', desc: 'Choose training discipline' },
              { step: '2', title: 'Trainer', desc: 'Pick your preferred coach' },
              { step: '3', title: 'Date', desc: 'Select any active day' },
              { step: '4', title: 'Time Slot', desc: 'View live open hours' },
              { step: '5', title: 'Details', desc: 'Enter contact information' },
              { step: '6', title: 'Confirm', desc: 'Receive instant Booking ID' },
            ].map((s, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#0e1017] border border-neutral-800/90 flex flex-col items-center text-center relative group hover:border-amber-500/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold text-sm flex items-center justify-center mb-2">
                  {s.step}
                </div>
                <div className="text-sm font-bold text-white tracking-wide">
                  {s.title}
                </div>
                <div className="text-xs text-neutral-400 mt-1 leading-snug">
                  {s.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              id="flow-book-cta"
              onClick={() => onNavigate('book')}
              className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm tracking-wider uppercase transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Start Booking Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Services Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Training Specializations
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase text-white tracking-tight">
              Featured Training Programs
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-1 max-w-xl">
              Each session is engineered for maximum physiological adaptation, proper biomechanics, and sustainable longevity.
            </p>
          </div>
          <button
            id="view-all-services-btn"
            onClick={() => onNavigate('services')}
            className="text-amber-400 hover:text-amber-300 text-sm font-bold flex items-center gap-1.5 transition-colors self-start md:self-auto"
          >
            <span>View All Programs ({services.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <div
              key={service.id}
              className="rounded-2xl bg-[#11131a] border border-[#222432] overflow-hidden flex flex-col hover:border-amber-500/40 transition-all group"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11131a] via-transparent to-black/30" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-neutral-700 text-xs font-bold text-amber-400">
                  {service.category}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-neutral-900/90 text-xs font-semibold text-neutral-300 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{service.durationMinutes} min</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-sm text-neutral-400 line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span>Intensity Level</span>
                    <span className="font-semibold text-amber-400">{service.intensity}</span>
                  </div>

                  <button
                    id={`book-service-${service.id}`}
                    onClick={() => onSelectServiceForBooking(service.id)}
                    className="w-full py-2.5 rounded-lg bg-neutral-800 hover:bg-amber-400 hover:text-black text-white text-sm font-bold tracking-wide transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Book This Service</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Trainers Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Master Coaches
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase text-white tracking-tight">
              Train with the Best
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-1 max-w-xl">
              Certified elite practitioners with proven track records in powerlifting, athletic conditioning, and combat sports.
            </p>
          </div>
          <button
            id="view-all-trainers-btn"
            onClick={() => onNavigate('trainers')}
            className="text-amber-400 hover:text-amber-300 text-sm font-bold flex items-center gap-1.5 transition-colors self-start md:self-auto"
          >
            <span>Meet All Coaches ({trainers.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTrainers.map((trainer) => (
            <div
              key={trainer.id}
              className="rounded-2xl bg-[#11131a] border border-[#222432] p-6 space-y-5 hover:border-amber-500/40 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-20 h-20 rounded-xl object-cover border border-neutral-700 shadow-md"
                />
                <div>
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {trainer.name}
                  </h3>
                  <p className="text-xs text-amber-400 font-semibold mt-0.5">
                    {trainer.title}
                  </p>
                  <div className="inline-flex items-center gap-1 mt-2 text-[11px] font-semibold text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded">
                    <Award className="w-3 h-3 text-amber-400" />
                    <span>{trainer.experienceYears} Years Exp</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                {trainer.bio}
              </p>

              <div className="space-y-3 pt-2 border-t border-neutral-800">
                <div className="flex flex-wrap gap-1.5">
                  {trainer.specialties.map((spec, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <button
                  id={`book-trainer-${trainer.id}`}
                  onClick={() => onSelectTrainerForBooking(trainer.id)}
                  className="w-full py-2.5 rounded-lg bg-neutral-800 hover:bg-amber-400 hover:text-black text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book with {trainer.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Facility Highlights / Standards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-neutral-900/70 border border-neutral-800 p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              The IronFit Standard
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase text-white tracking-tight">
              Why Athletes Choose IronFit
            </h2>
            <p className="text-sm sm:text-base text-neutral-400">
              Everything in our facility is curated to foster intense focus, deliberate progression, and rapid recovery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Dumbbell className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Competition Spec Gear</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Eleiko barbell platforms, calibrated steel plates, custom dumbbells up to 150 lbs, and specialty bars.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">100% Accredited Staff</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                All coaches hold master certifications (CSCS, USAW, NASM, FMS) with verified years of competitive athlete coaching.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Zero Crowding Protocol</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Strict appointment slots ensure you and your trainer have dedicated access to lifting platforms and equipment without waiting.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white">Transparent Booking</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Instant confirmation code, real-time status tracking (Pending, Confirmed, Completed), and effortless appointment lookup.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Member Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Real Member Feedback
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold uppercase text-white tracking-tight">
            Athlete Experiences
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "The 1-on-1 barbell coaching with Coach Vance completely solved my chronic lower back pinch during heavy deadlifts. Best decision I made this year.",
              author: "Marcus Brody",
              tag: "Powerlifting Client (8 mos)",
            },
            {
              quote: "Booking appointments online takes 30 seconds, and the coaches are actually waiting for you when you arrive. Elite environment with zero fluff.",
              author: "Tanya Lindqvist",
              tag: "HIIT & Conditioning Client",
            },
            {
              quote: "The boxing conditioning sessions with David are brutal in the best way. My cardiovascular endurance and reaction speed have doubled.",
              author: "Jason Mercer",
              tag: "Combat Conditioning Client",
            },
          ].map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#10121a] border border-[#202230] space-y-4 flex flex-col justify-between"
            >
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-sm text-neutral-300 italic leading-relaxed">
                "{t.quote}"
              </p>
              <div className="pt-3 border-t border-neutral-800">
                <div className="text-sm font-bold text-white">{t.author}</div>
                <div className="text-xs text-amber-400/80 font-medium">{t.tag}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-8 sm:p-12 lg:p-16 text-black shadow-2xl shadow-orange-500/10">
          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="px-3 py-1 rounded-full bg-black/15 text-xs font-black uppercase tracking-wider">
              No Walk-in Wait Times
            </span>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none">
              READY TO ELEVATE YOUR STRENGTH & PERFORMANCE?
            </h2>
            <p className="text-base sm:text-lg font-medium text-black/80 max-w-xl">
              Lock in your preferred training hour today. Choose your trainer, view open time slots, and receive an instant booking code.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <button
                id="cta-book-session"
                onClick={() => onNavigate('book')}
                className="px-8 py-4 rounded-xl bg-black hover:bg-neutral-900 text-white font-extrabold text-base tracking-wide uppercase shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5 text-amber-400" />
                <span>Book Your Session</span>
              </button>
              <button
                id="cta-view-trainers"
                onClick={() => onNavigate('trainers')}
                className="px-7 py-4 rounded-xl bg-white/20 hover:bg-white/30 text-black font-bold text-base tracking-wide transition-all border border-black/20"
              >
                Browse Coaches
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
