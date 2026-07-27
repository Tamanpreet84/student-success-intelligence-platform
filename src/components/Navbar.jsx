import React from 'react';
import { 
  GraduationCap, 
  BarChart3, 
  Target, 
  BrainCircuit, 
  Briefcase, 
  Calendar, 
  Award, 
  MessageSquareCode,
  Github,
  Sparkles
} from 'lucide-react';
import { DEMO_PRESETS } from '../data/mockData';

export const Navbar = ({ activeTab, setActiveTab, currentStudent, setStudent }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'cgpa', label: 'CGPA Predictor', icon: GraduationCap },
    { id: 'placement', label: 'Placement & Salary', icon: Target },
    { id: 'skillgap', label: 'Skill Gap Radar', icon: BrainCircuit },
    { id: 'internships', label: 'Internships', icon: Briefcase },
    { id: 'studyplan', label: 'Study Plan', icon: Calendar },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'counselor', label: 'AI Counselor', icon: MessageSquareCode }
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="p-2.5 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/30">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                  StudentSuccess
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  AI v2.4
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden sm:block">Intelligence & Career Platform</p>
            </div>
          </div>

          {/* Demo Preset Selector */}
          <div className="hidden lg:flex items-center space-x-2 bg-slate-900/90 border border-slate-800 rounded-lg p-1">
            <Sparkles className="w-4 h-4 text-amber-400 ml-2" />
            <span className="text-xs font-medium text-slate-400">Load Profile:</span>
            <select 
              className="bg-slate-950 text-xs text-indigo-300 border-none rounded focus:ring-1 focus:ring-indigo-500 py-1 px-2 font-medium cursor-pointer"
              onChange={(e) => {
                if (DEMO_PRESETS[e.target.value]) {
                  setStudent(DEMO_PRESETS[e.target.value]);
                }
              }}
            >
              <option value="high_achiever">Aarav (High Achiever)</option>
              <option value="balanced">Priya (Full-Stack)</option>
              <option value="improver">Rohan (Needs Focus)</option>
            </select>
          </div>

          {/* GitHub Repository Badge */}
          <div className="flex items-center space-x-3">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 transition-all"
            >
              <Github className="w-4 h-4 text-slate-400" />
              <span className="hidden md:inline">GitHub Repo</span>
            </a>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto no-scrollbar space-x-1 py-2 border-t border-slate-800/40">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
