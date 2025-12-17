import React, { useState } from 'react';
import { UserProfile } from '../types';

interface OnboardingProps {
  onStart: (profile: UserProfile) => void;
  error: string | null;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onStart, error }) => {
  const [name, setName] = useState('');
  const [interests, setInterests] = useState('');
  const [context, setContext] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && interests.trim()) {
      onStart({ name, interests, context });
    }
  };

  return (
    // Card Background: #f1f3de (Licht greige)
    <div className="bg-[#f1f3de] rounded-3xl p-8 shadow-2xl border-b-4 border-[#dadcd1]">
      <h2 className="text-2xl font-black mb-6 text-[#1c3047]">Vertel kort wie je bent</h2>
      
      {error && (
        <div className="mb-6 p-4 bg-[#c52e26]/10 border border-[#c52e26]/30 rounded-xl text-[#c52e26] text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
          <label className="block text-sm font-bold text-[#566171] mb-2 uppercase tracking-wide">Naam</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Bijv. Lotte"
            className="w-full bg-white border border-[#dadcd1] rounded-xl px-4 py-3 text-[#1c3047] placeholder-[#566171]/50 focus:outline-none focus:ring-2 focus:ring-[#7b963a] transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-[#566171] mb-2 uppercase tracking-wide">Belangrijkste interesse(s)</label>
          <input
            type="text"
            required
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="Duurzaamheid, jeugdwerk..."
            className="w-full bg-white border border-[#dadcd1] rounded-xl px-4 py-3 text-[#1c3047] placeholder-[#566171]/50 focus:outline-none focus:ring-2 focus:ring-[#7b963a] transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-[#566171] mb-2 uppercase tracking-wide">Wat is je achtergrond?</label>
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Vertel kort iets over je opleiding, werk of vaardigheden."
            className="w-full bg-white border border-[#dadcd1] rounded-xl px-4 py-3 text-[#1c3047] placeholder-[#566171]/50 focus:outline-none focus:ring-2 focus:ring-[#7b963a] transition-all min-h-[100px] resize-none"
          />
        </div>

        <button
          type="submit"
          // Button: Groen (#7b963a)
          className="w-full bg-[#7b963a] hover:bg-[#6a8532] text-white font-bold py-4 rounded-xl shadow-lg transform transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start Matching
        </button>
      </form>
    </div>
  );
};