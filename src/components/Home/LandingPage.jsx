import React from 'react';
import { 
  GraduationCap, 
  Target, 
  BrainCircuit, 
  Briefcase, 
  FileText, 
  Mic, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Award,
  Users,
  ShieldCheck,
  Star
} from 'lucide-react';

export const LandingPage = ({ setActiveTab, openAuthModal }) => {
  const features = [
    {
      id: 'cgpa',
      title: 'Academic CGPA Predictor',
      description: 'Multi-variable Ridge Regression forecasting your semester GPA based on study hours, attendance & backlogs.',
      icon: GraduationCap,
      badge: 'ML Engine R² = 0.928',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'placement',
      title: 'Placement & Salary Estimator',
      description: 'XGBoost classification calculating your exact placement probability & expected starting LPA package.',
      icon: Target,
      badge: '83.66% ROC-AUC',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'resume',
      title: 'AI ATS Resume Analyzer',
      description: 'Scans your resume against target job keywords, calculates ATS compatibility score & suggests formatting fixes.',
      icon: FileText,
      badge: 'ATS Optimizer',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'mockinterview',
      title: 'AI Mock Interview Simulator',
      description: 'Interactive question simulator with real-time STAR methodology scoring & domain keyword feedback.',
      icon: Mic,
      badge: 'STAR Feedback',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'skillgap',
      title: 'Skill Gap Radar Analyzer',
      description: 'Overlays your current technical proficiency against industry benchmarks for Full Stack, Data Science & DevOps.',
      icon: BrainCircuit,
      badge: 'Radar Overlay',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'roadmap',
      title: 'Career Roadmap Generator',
      description: 'Step-by-step milestone learning path curated with resources to achieve your target tech role.',
      icon: TrendingUp,
      badge: 'Guided Path',
      color: 'from-amber-500 to-orange-600'
    }
  ];

  return (
    <div className="space-y-16 py-4">
      
      {/* Hero Section */}
      <div className="relative glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950/40 to-slate-950 text-center space-y-6">
        
        {/* Glow Spheres */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>The All-In-One AI Student Placement & Career Platform</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight">
          Maximize Your <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">CGPA & Placement</span> Potential with Machine Learning
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Predict your semester GPA, calculate company placement probability, scan ATS resumes, conduct mock interviews, and bridge critical skill gaps before campus drives.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-xl shadow-indigo-500/25 transition-all flex items-center space-x-2"
          >
            <span>Launch AI Analytics Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => openAuthModal('signup')}
            className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-all"
          >
            Create Free Account
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80 max-w-4xl mx-auto text-center">
          <div>
            <span className="text-2xl sm:text-3xl font-black text-white">0.928</span>
            <span className="text-[11px] text-slate-400 block font-medium">CGPA Regression R²</span>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">83.66%</span>
            <span className="text-[11px] text-slate-400 block font-medium">Placement Accuracy</span>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-purple-300">5,000+</span>
            <span className="text-[11px] text-slate-400 block font-medium">Student ML Records</span>
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-black text-cyan-400">100%</span>
            <span className="text-[11px] text-slate-400 block font-medium">ATS Resume Feedback</span>
          </div>
        </div>

      </div>

      {/* Feature Modules Grid */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Comprehensive AI Career Suite</h2>
          <p className="text-xs sm:text-sm text-slate-400">Everything you need to secure top-tier tech placements and master academic performance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="glass-panel p-6 rounded-2xl border border-slate-800 glass-panel-hover cursor-pointer space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <div className={`p-3 rounded-2xl bg-gradient-to-tr ${item.color} text-white shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-white text-lg mt-4">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mt-2">{item.description}</p>
                </div>

                <div className="text-xs font-bold text-indigo-400 flex items-center gap-1.5 pt-2 border-t border-slate-800/80">
                  Open Module <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
