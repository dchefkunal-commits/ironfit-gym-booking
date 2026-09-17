import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  MessageSquare
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // FAQ open/close state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'How does the appointment booking flow work?',
      a: 'Booking is straightforward: choose your training service, pick a coach, select an open date and time slot, enter your contact details, and receive an instant unique Booking ID.',
    },
    {
      q: 'What should I bring to my first training session?',
      a: 'Bring clean athletic training shoes (flat-soled shoes for lifting or cross-trainers), workout attire, a personal water bottle, and a sweat towel. We provide chalk, lifting belts, straps, and locker amenities.',
    },
    {
      q: 'Can I cancel or reschedule my booked appointment?',
      a: 'Yes! Navigate to "My Appointment", enter your unique Booking ID or phone number, and you can cancel or check the status anytime. We ask for at least 2 hours advance notice.',
    },
    {
      q: 'Do I need a separate gym membership to book a personal training session?',
      a: 'No separate membership is required. All appointments include full access to our facility, warm-up zones, and locker rooms for the duration of your booked block.',
    },
    {
      q: 'Where is IronFit Gym located and is parking available?',
      a: 'We are located at 450 Ironworks Blvd in the Downtown Athletic District. Free validated parking is available in the adjacent Ironworks Garage for all booked clients.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
          Reach Our Front Desk
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight text-white">
          Contact IronFit Gym
        </h1>
        <p className="text-sm sm:text-base text-neutral-400">
          Have questions regarding coach availability, specialized equipment, or booking inquiries? We're here to assist.
        </p>
      </div>

      {/* Main Grid: Contact Info Cards & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Contact Cards & Hours (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl bg-[#11131a] border border-[#222432] p-6 space-y-6 shadow-xl">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider border-b border-neutral-800 pb-3">
              Facility Information
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-neutral-400 font-semibold uppercase block">
                    Address
                  </span>
                  <p className="text-white font-medium mt-0.5">
                    450 Ironworks Blvd, Suite 100<br />
                    Downtown Athletic District, NY 10001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-neutral-400 font-semibold uppercase block">
                    Phone & WhatsApp
                  </span>
                  <a href="tel:+15554766348" className="text-white font-medium hover:text-amber-400 transition-colors mt-0.5 block">
                    +1 (555) 476-6348 (IRON-FIT)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-neutral-400 font-semibold uppercase block">
                    Email
                  </span>
                  <a href="mailto:desk@ironfitgym.com" className="text-white font-medium hover:text-amber-400 transition-colors mt-0.5 block">
                    desk@ironfitgym.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Operating Hours Card */}
          <div className="rounded-2xl bg-[#11131a] border border-[#222432] p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <span>Gym Working Hours</span>
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-neutral-850">
                <span className="text-neutral-400">Monday – Friday</span>
                <span className="text-amber-400 font-bold">5:00 AM – 11:00 PM</span>
              </div>
              <div className="flex justify-between py-2 border-b border-neutral-850">
                <span className="text-neutral-400">Saturday</span>
                <span className="text-amber-400 font-bold">7:00 AM – 9:00 PM</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-neutral-400">Sunday</span>
                <span className="text-amber-400 font-bold">7:00 AM – 8:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Inquiry Message Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-[#11131a] border border-[#222432] p-6 sm:p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-400" />
              <span>Send Us a Message</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mb-6">
              Need assistance with an appointment, custom corporate training, or facility access? Send us a quick note.
            </p>

            {submitted ? (
              <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Message Dispatched</h4>
                <p className="text-sm text-neutral-300 max-w-md mx-auto">
                  Thank you, {name}! Our front desk team has received your message and will follow up via {email} shortly.
                </p>
                <button
                  id="send-another-message-btn"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="mt-2 px-5 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-bold uppercase tracking-wider text-neutral-300"
                    >
                      Your Name <span className="text-amber-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Rachel Adams"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-bold uppercase tracking-wider text-neutral-300"
                    >
                      Your Email <span className="text-amber-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="rachel@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-subject"
                    className="text-xs font-bold uppercase tracking-wider text-neutral-300"
                  >
                    Topic / Subject
                  </label>
                  <select
                    id="contact-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white text-sm focus:outline-none focus:border-amber-400"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Appointment Question">Appointment Question / Reschedule Help</option>
                    <option value="Coach Consultation">Coach Consultation</option>
                    <option value="Facility Tour">Schedule Facility Tour</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-bold uppercase tracking-wider text-neutral-300"
                  >
                    Message <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    placeholder="How can our coaches or front desk team help you?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>

                <button
                  id="contact-submit-btn"
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-sm uppercase tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="rounded-2xl bg-[#11131a] border border-[#222432] p-6 sm:p-10 space-y-6 shadow-xl">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h3 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white">
            Appointment & Facility FAQs
          </h3>
        </div>

        <div className="space-y-3 max-w-3xl mx-auto pt-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-neutral-800 bg-neutral-900/60 overflow-hidden transition-colors"
              >
                <button
                  id={`faq-toggle-btn-${idx}`}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-white hover:text-amber-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-amber-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-neutral-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-neutral-800/80 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
