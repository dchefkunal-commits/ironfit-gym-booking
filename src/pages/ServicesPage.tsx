import React, { useState } from 'react';
import { Clock, Flame, Check, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { Service } from '../types';

interface ServicesPageProps {
  services: Service[];
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  services,
  onSelectServiceForBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Strength', 'Conditioning', 'Mobility', 'Combat', 'Wellness'];

  const filteredServices = services.filter((s) => {
    if (!s.active) return false;
    if (selectedCategory === 'All') return true;
    return s.category === selectedCategory;
  });

  const getIntensityColor = (intensity: Service['intensity']) => {
    switch (intensity) {
      case 'Moderate':
        return 'text-sky-400 bg-sky-950/60 border-sky-800/60';
      case 'High':
        return 'text-amber-400 bg-amber-950/60 border-amber-800/60';
      case 'Extreme':
        return 'text-rose-400 bg-rose-950/60 border-rose-800/60';
      default:
        return 'text-neutral-300 bg-neutral-800 border-neutral-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Training Services & Disciplines</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight text-white">
          Engineered For Every Athletic Goal
        </h1>
        <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
          Select any training discipline below to view what is included and immediately reserve your preferred time slot with our certified coaching staff.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-neutral-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400 mr-2">
          <Filter className="w-3.5 h-3.5 text-amber-400" />
          <span>Category:</span>
        </div>
        {categories.map((category) => (
          <button
            key={category}
            id={`filter-category-${category.toLowerCase()}`}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              selectedCategory === category
                ? 'bg-amber-400 text-black shadow-md shadow-amber-400/20 font-bold'
                : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="rounded-2xl bg-[#11131a] border border-[#222432] overflow-hidden flex flex-col hover:border-amber-500/50 transition-all shadow-xl group"
          >
            {/* Service Image Banner */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#11131a] via-[#11131a]/30 to-transparent" />

              {/* Badges on image */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md border border-neutral-700 text-xs font-bold text-amber-400">
                  {service.category}
                </span>
              </div>

              <div className="absolute top-3 right-3 flex items-center gap-2">
                <span
                  className={`px-2.5 py-1 rounded-md text-xs font-bold border ${getIntensityColor(
                    service.intensity
                  )}`}
                >
                  {service.intensity} Intensity
                </span>
              </div>

              <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs font-semibold text-neutral-300 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>{service.durationMinutes} Minutes Session</span>
              </div>
            </div>

            {/* Service Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  {service.name}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Features list */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Program Inclusions:
                  </span>
                  <ul className="space-y-1.5">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                        <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Book button */}
              <div className="pt-4 border-t border-neutral-800">
                <button
                  id={`services-book-btn-${service.id}`}
                  onClick={() => onSelectServiceForBooking(service.id)}
                  className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-sm uppercase tracking-wide transition-all shadow-md flex items-center justify-center gap-2 group-hover:shadow-amber-500/20"
                >
                  <span>Book This Service</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
