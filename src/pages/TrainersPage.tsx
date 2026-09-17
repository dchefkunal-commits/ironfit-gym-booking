import React, { useState } from 'react';
import { Award, Calendar, Clock, ShieldCheck, CheckCircle2, UserCheck, Filter } from 'lucide-react';
import { Trainer } from '../types';

interface TrainersPageProps {
  trainers: Trainer[];
  onSelectTrainerForBooking: (trainerId: string) => void;
}

export const TrainersPage: React.FC<TrainersPageProps> = ({
  trainers,
  onSelectTrainerForBooking,
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');

  // Extract all unique specialties
  const allSpecialties = ['All', ...Array.from(new Set(trainers.flatMap((t) => t.specialties)))];

  const filteredTrainers = trainers.filter((trainer) => {
    if (!trainer.active) return false;
    if (selectedSpecialty === 'All') return true;
    return trainer.specialties.includes(selectedSpecialty);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <UserCheck className="w-3.5 h-3.5" />
          <span>Accredited Coaching Roster</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight text-white">
          Certified Master Coaches
        </h1>
        <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
          IronFit coaches don't count reps—they build athletic foundations. Select a coach to inspect their credentials, active coaching hours, and reserve your 1-on-1 time.
        </p>
      </div>

      {/* Specialty Filter */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-neutral-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 mr-2">
          <Filter className="w-3.5 h-3.5 text-amber-400" />
          <span>Specialty:</span>
        </div>
        {allSpecialties.map((spec) => (
          <button
            key={spec}
            id={`filter-specialty-${spec.toLowerCase().replace(/\s+/g, '-')}`}
            onClick={() => setSelectedSpecialty(spec)}
            className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              selectedSpecialty === spec
                ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20 font-bold'
                : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTrainers.map((trainer) => (
          <div
            key={trainer.id}
            className="rounded-2xl bg-[#11131a] border border-[#222432] overflow-hidden flex flex-col justify-between hover:border-amber-500/50 transition-all shadow-xl group"
          >
            <div>
              {/* Profile Image Banner */}
              <div className="relative h-64 overflow-hidden bg-neutral-900">
                <img
                  src={trainer.image}
                  alt={trainer.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11131a] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <div className="px-3 py-1 rounded-md bg-black/85 backdrop-blur-md border border-neutral-700 text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    <span>{trainer.experienceYears} Years Experience</span>
                  </div>
                </div>
              </div>

              {/* Trainer Details */}
              <div className="p-6 space-y-5">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {trainer.name}
                  </h3>
                  <p className="text-sm font-semibold text-amber-400/90 mt-0.5">
                    {trainer.title}
                  </p>
                </div>

                <p className="text-sm text-neutral-400 leading-relaxed">
                  {trainer.bio}
                </p>

                {/* Specialties */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Specialties:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {trainer.specialties.map((spec, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-xs font-semibold bg-neutral-900 text-neutral-200 border border-neutral-800"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="space-y-2 pt-2 border-t border-neutral-850">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Certifications:</span>
                  </span>
                  <ul className="space-y-1">
                    {trainer.certifications.map((cert, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                        <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Schedule Days */}
                <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-1.5 text-xs text-neutral-400">
                  <div className="flex items-center justify-between font-medium">
                    <span className="flex items-center gap-1.5 text-neutral-300">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>Coaching Hours:</span>
                    </span>
                    <span className="text-amber-400 font-semibold">
                      {trainer.workingHours.start} – {trainer.workingHours.end}
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-400 flex flex-wrap gap-1">
                    <span>Days:</span>
                    <span className="text-neutral-300">
                      {trainer.workingHours.days.join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="p-6 pt-0">
              <button
                id={`book-with-trainer-${trainer.id}`}
                onClick={() => onSelectTrainerForBooking(trainer.id)}
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment with {trainer.name.split(' ')[0]}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
