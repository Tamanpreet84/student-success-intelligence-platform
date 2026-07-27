import React from 'react';
import { GraduationCap, Code, BrainCircuit, ShieldCheck, Github, Cpu } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl text-white">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">About Student Success Intelligence Platform</h1>
            <p className="text-xs text-indigo-400 font-semibold">AI-Powered Educational Analytics & Career Acceleration Engine</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          The **Student Success Intelligence Platform** is designed to bridge the gap between academic performance and campus placement readiness. By combining machine learning regression models, classification algorithms, natural language processing for ATS resume evaluation, and interactive radar skill visualization, the platform provides students with an end-to-end career progression system.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="font-bold text-xs text-indigo-300 flex items-center gap-1.5"><Cpu className="w-4 h-4" /> Python ML Pipeline</span>
            <p className="text-[11px] text-slate-400">Ridge Regression (CGPA R²=0.928) & XGBoost Placement Classifier (Acc=83.66%).</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="font-bold text-xs text-purple-300 flex items-center gap-1.5"><Code className="w-4 h-4" /> Full-Stack Architecture</span>
            <p className="text-[11px] text-slate-400">React 18, Vite, Recharts, Tailwind CSS, Lucide Icons, and Vercel Serverless.</p>
          </div>
        </div>

      </div>
    </div>
  );
};
