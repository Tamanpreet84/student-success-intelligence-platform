import React, { useState } from 'react';
import { 
  GraduationCap, 
  BarChart3, 
  Target, 
  BrainCircuit, 
  Briefcase, 
  Calendar, 
  Award, 
  MessageSquareCode,
  FileText,
  Mic,
  Building,
  Github,
  Sun,
  Moon,
  UserCheck,
  LogOut,
  Menu,
  X,
  Home,
  HelpCircle,
  TrendingUp,
  UserPlus
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export const Navbar = ({ activeTab, setActiveTab, openAuthModal }) => {
  const { isDark, toggleTheme } = useTheme();
  const { currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'auth', label: 'Login / Details', icon: UserPlus },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'cgpa', label: 'CGPA Sim', icon: GraduationCap },
    { id: 'placement', label: 'Placement & Salary', icon: Target },
    { id: 'resume', label: 'ATS Resume', icon: FileText },
    { id: 'mockinterview', label: 'Mock Interview', icon: Mic },
    { id: 'skillgap', label: 'Skill Radar', icon: BrainCircuit },
    { id: 'roadmap', label: 'Roadmap', icon: TrendingUp },
    { id: 'eligibility', label: 'Eligibility', icon: Building },
    { id: 'trackers', label: 'GitHub/LeetCode', icon: Github },
    { id: 'internships', label: 'Jobs', icon: Briefcase },
    { id: 'studyplan', label: 'Study Plan', icon: Calendar },
    { id: 'certifications', label: 'Learning', icon: Award },
    { id: 'counselor', label: 'AI Chat', icon: MessageSquareCode },
    { id: 'about', label: 'About', icon: GraduationCap },
    { id: 'faq', label: 'FAQ', icon: HelpCircle }
  ];

  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="p-2.5 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/30">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                  StudentSuccess
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  AI PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">AI Placement & Career Intelligence</p>
            </div>
          </div>

          {/* Right Action Icons: Dark/Light Mode + Auth + Mobile Toggle */}
          <div className="flex items-center space-x-3">
            
            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            {/* Login / Sign Up CTA */}
            <button
              onClick={() => setActiveTab('auth')}
              className="px-3.5 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Login / Enter Details</span>
            </button>

            {/* Profile Avatar if logged in */}
            {currentUser && (
              <button
                onClick={() => setActiveTab('profile')}
                className="p-1 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition-all"
              >
                <img 
                  src={currentUser.avatarUrl} 
                  alt={currentUser.name} 
                  className="w-7 h-7 rounded-lg object-cover border border-indigo-500"
                />
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Desktop Tab Scrolling Navigation */}
        <div className="hidden md:flex overflow-x-auto no-scrollbar space-x-1 py-2 border-t border-slate-800/40">
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-2 animate-fade-in">
          <div className="grid grid-cols-2 gap-2">
            {mainTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-2 p-2.5 rounded-xl text-xs font-semibold ${
                    isActive ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

    </header>
  );
};
