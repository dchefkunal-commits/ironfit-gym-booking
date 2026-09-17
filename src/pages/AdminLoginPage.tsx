import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import { Page } from '../types';
import { setAdminLoggedIn } from '../data/storage';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
  onNavigate: (page: Page) => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onNavigate,
}) => {
  const [email, setEmail] = useState('admin@ironfit.com');
  const [password, setPassword] = useState('ironfit2026');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Verification check (clean demo credentials)
    if (
      (email.trim().toLowerCase() === 'admin@ironfit.com' || email.trim().toLowerCase() === 'admin') &&
      (password === 'ironfit2026' || password === 'admin' || password === 'password')
    ) {
      setAdminLoggedIn(true);
      onLoginSuccess();
    } else {
      setError('Invalid credentials. Use demo email: admin@ironfit.com and password: ironfit2026');
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@ironfit.com');
    setPassword('ironfit2026');
    setError('');
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-[#11131a] border border-[#222432] p-6 sm:p-8 space-y-6 shadow-2xl">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto mb-2">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Staff & Operations
          </span>
          <h1 className="font-display text-3xl font-bold uppercase tracking-tight text-white">
            Admin Portal Login
          </h1>
          <p className="text-xs text-neutral-400">
            Authenticate to manage customer bookings, trainers, and gym service offerings.
          </p>
        </div>

        {/* Demo credentials tip box */}
        <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Demo Credentials:
            </span>
            <button
              id="fill-demo-creds-btn"
              type="button"
              onClick={handleFillDemo}
              className="text-neutral-300 hover:text-white underline font-semibold text-[11px]"
            >
              Fill Credentials
            </button>
          </div>
          <div className="font-mono text-neutral-400 text-[11px] space-y-0.5">
            <div>Email: <span className="text-white">admin@ironfit.com</span></div>
            <div>Password: <span className="text-white">ironfit2026</span></div>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="admin-login-email"
              className="text-xs font-bold uppercase tracking-wider text-neutral-300"
            >
              Staff Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
              <input
                id="admin-login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400"
                placeholder="admin@ironfit.com"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="admin-login-password"
              className="text-xs font-bold uppercase tracking-wider text-neutral-300"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
              <input
                id="admin-login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            id="admin-login-submit-btn"
            type="submit"
            className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-sm uppercase tracking-wide transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-2 text-center border-t border-neutral-800">
          <button
            id="back-to-client-site-btn"
            type="button"
            onClick={() => onNavigate('home')}
            className="text-xs text-neutral-400 hover:text-white transition-colors"
          >
            ← Return to IronFit Public Website
          </button>
        </div>
      </div>
    </div>
  );
};
