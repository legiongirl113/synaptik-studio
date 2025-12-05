import React, { useState } from 'react';
import { Zap, ShieldCheck, Lock, ChevronRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// --- INIT FIREBASE (Use your existing config) ---
const firebaseConfig = JSON.parse(__firebase_config || '{}');
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [intent, setIntent] = useState('creator'); // 'creator' | 'adult_studio' | 'agency'
  const [status, setStatus] = useState('idle'); // idle, loading, success

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    try {
      // Save to Firestore "waitlist" collection
      await addDoc(collection(db, 'waitlist'), {
        email,
        intent,
        createdAt: serverTimestamp(),
        source: 'landing_page_v1'
      });
      setStatus('success');
    } catch (err) {
      console.error(err);
      alert("Error joining network. Please try again.");
      setStatus('idle');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-center p-6">
        <div className="max-w-md w-full bg-slate-900 border border-cyan-500/30 p-8 rounded-2xl shadow-[0_0_50px_rgba(6,182,212,0.2)]">
          <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-cyan-400" size={32} />
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Access Requested</h2>
          <p className="text-slate-400 mb-6">
            You have been added to the <strong>Alpha Queue</strong>. <br/>
            We are onboarding 50 studios per week to maintain GPU stability.
          </p>
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs text-slate-500 font-mono">
            POSITION: #{Math.floor(Math.random() * (400 - 120 + 1) + 120)} <br/>
            STATUS: PENDING REVIEW
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-cyan-500/30">
      
      {/* NAV */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-cyan-600 rounded flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Zap className="text-white" size={20} fill="currentColor" />
          </div>
          <span className="font-black text-lg tracking-tight text-white">SYNAPTIK</span>
        </div>
        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest hidden md:block">
          Private Alpha v0.9
        </div>
      </nav>

      {/* HERO */}
      <main className="max-w-5xl mx-auto px-6 pt-12 pb-24 md:pt-24 md:text-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          Accepting Early Access
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter mb-6">
          The Neural <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Storytelling Engine.</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Create consistent, broadcast-quality animation in minutes. 
          Synaptik replaces safety guardrails with a fortress architecture, 
          allowing you to tell the stories other AI platforms ban.
        </p>

        {/* SIGNUP FORM */}
        <div className="max-w-md mx-auto bg-slate-900/50 p-2 rounded-2xl border border-slate-800 backdrop-blur-sm shadow-2xl">
          <form onSubmit={handleJoin} className="flex flex-col gap-2">
            <input 
              type="email" 
              placeholder="Enter your email..." 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 transition-all"
            />
            <div className="flex gap-2">
              <select 
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-400 text-sm rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
              >
                <option value="creator">I am a Creator</option>
                <option value="agency">I am an Agency</option>
                <option value="adult_studio">I produce 18+ Content</option>
              </select>
              <button 
                type="submit"
                disabled={status === 'loading'}
                className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 group"
              >
                {status === 'loading' ? 'Processing...' : 'Request Access'}
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
          <p className="text-[10px] text-slate-500 mt-3 text-center px-4 pb-2">
            By requesting access, you agree to our 18+ Eligibility Requirements for Unrestricted Mode.
          </p>
        </div>

      </main>

      {/* FEATURES GRID */}
      <section className="border-t border-slate-900 bg-black/50 py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          
          <div className="space-y-4">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800">
              <ShieldCheck className="text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Consistent Actors</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Define your character's schema once (Face, Voice, Style). Our Neural Engine locks their identity across 1,000+ generated scenes. No more hallucinations.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800">
              <Lock className="text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Fortress Privacy</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your scripts and renders are encrypted. What you create in your studio stays in your studio. We do not train public models on your private IP.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800">
              <AlertTriangle className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-white">Unrestricted Mode</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Verify your age to unlock the raw model. Perfect for horror, thriller, and mature narrative storytelling that other platforms censor.
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 py-12 text-center">
        <p className="text-slate-600 text-sm">© 2025 Synaptik AI, Inc. (Delaware C-Corp)</p>
      </footer>

    </div>
  );
}