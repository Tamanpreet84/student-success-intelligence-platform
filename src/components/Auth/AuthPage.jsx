import React, { useState } from 'react';
import { User, Mail, Lock, GraduationCap, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Key, Save, BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { JOB_ROLES } from '../../data/mockData';

export const AuthPage = ({ setActiveTab, setStudent }) => {
  const { login, signup, currentUser } = useAuth();
  const { addToast } = useToast();

  const [isSignUp, setIsSignUp] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);

  // Student Input Form State
  const [formData, setFormData] = useState({
    name: currentUser?.name || 'New Student',
    email: currentUser?.email || 'student@university.edu',
    password: '',
    university: currentUser?.university || 'State Tech University',
    degree: currentUser?.degree || 'B.Tech Computer Science',
    targetRole: currentUser?.targetRole || 'fullstack',
    attendance_pct: 82.0,
    study_hours_weekly: 18.0,
    previous_gpa: 8.20,
    assignment_score: 88.0,
    project_count: 3,
    internship_count: 1,
    aptitude_score: 80.0,
    coding_rating: 1450,
    soft_skills_score: 85.0,
    backlogs: 0
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email) {
      addToast('Please enter your email address', 'error');
      return;
    }

    // Save profile data into student state for immediate prediction calculation across dashboard
    const studentProfile = {
      name: formData.name,
      email: formData.email,
      university: formData.university,
      degree: formData.degree,
      targetRole: formData.targetRole,
      attendance_pct: parseFloat(formData.attendance_pct) || 75,
      study_hours_weekly: parseFloat(formData.study_hours_weekly) || 15,
      previous_gpa: parseFloat(formData.previous_gpa) || 7.5,
      assignment_score: parseFloat(formData.assignment_score) || 80,
      project_count: parseInt(formData.project_count, 10) || 0,
      internship_count: parseInt(formData.internship_count, 10) || 0,
      aptitude_score: parseFloat(formData.aptitude_score) || 60,
      coding_rating: parseInt(formData.coding_rating, 10) || 1200,
      soft_skills_score: parseFloat(formData.soft_skills_score) || 70,
      backlogs: parseInt(formData.backlogs, 10) || 0,
      skills: JOB_ROLES[formData.targetRole]?.skills || {}
    };

    setStudent(studentProfile);

    if (isSignUp) {
      signup(formData.name, formData.email, formData.password || 'password123');
      addToast('Account created & profile parameters loaded successfully!', 'success');
    } else {
      login(formData.email, formData.password || 'password123');
      addToast('Welcome back! Your academic profile predictions are ready.', 'success');
    }

    if (rememberMe) {
      localStorage.setItem('saved_student_credentials', JSON.stringify({
        email: formData.email,
        savedPassword: formData.password,
        rememberMe: true
      }));
    }

    // Direct user to AI Dashboard
    setActiveTab('dashboard');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-4">
      
      {/* Header Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-slate-800 text-center space-y-3 bg-gradient-to-r from-slate-950 via-indigo-950/40 to-slate-950">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold border border-indigo-500/20">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Student Onboarding & Live Prediction Setup
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
          {isSignUp ? 'Student Registration & Profile Setup' : 'Student Sign In'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Enter your academic details, attendance %, study hours, and coding scores to generate personalized AI predictions for CGPA, Placement Chance & Starting Salary.
        </p>

        {/* Toggle Mode Buttons */}
        <div className="flex justify-center items-center space-x-2 pt-2">
          <button 
            onClick={() => setIsSignUp(true)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              isSignUp ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Create New Profile
          </button>
          <button 
            onClick={() => setIsSignUp(false)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              !isSignUp ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Existing Student Sign In
          </button>
        </div>
      </div>

      {/* Main Student Form */}
      <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        
        {/* Section 1: Auth & Account Details */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <User className="w-5 h-5 text-indigo-400" /> 1. Account & Credential Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {isSignUp && (
              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Full Student Name</label>
                <input 
                  type="text" required
                  placeholder="e.g. Aman Sharma"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Email Address</label>
              <input 
                type="email" required
                placeholder="student@university.edu"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Password</label>
              <input 
                type="password" required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Target Career Goal</label>
              <select 
                value={formData.targetRole}
                onChange={(e) => handleChange('targetRole', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-indigo-300 font-bold focus:border-indigo-500 focus:outline-none"
              >
                {Object.entries(JOB_ROLES).map(([k, r]) => (
                  <option key={k} value={k}>{r.name} ({r.category})</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Academic & Behavioral Parameters */}
        <div className="space-y-4 border-t border-slate-800 pt-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <GraduationCap className="w-5 h-5 text-emerald-400" /> 2. Academic & Behavioral Metrics
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Class Attendance %</label>
              <input 
                type="number" min="50" max="100" step="0.5"
                value={formData.attendance_pct}
                onChange={(e) => handleChange('attendance_pct', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Weekly Study Hours</label>
              <input 
                type="number" min="2" max="40" step="1"
                value={formData.study_hours_weekly}
                onChange={(e) => handleChange('study_hours_weekly', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Previous Semester GPA</label>
              <input 
                type="number" min="4.0" max="10.0" step="0.1"
                value={formData.previous_gpa}
                onChange={(e) => handleChange('previous_gpa', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Technical & Placement Portfolio */}
        <div className="space-y-4 border-t border-slate-800 pt-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
            <BookOpen className="w-5 h-5 text-purple-400" /> 3. Technical & Placement Portfolio
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Project Count</label>
              <input 
                type="number" min="0" max="6"
                value={formData.project_count}
                onChange={(e) => handleChange('project_count', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Internship Count</label>
              <input 
                type="number" min="0" max="3"
                value={formData.internship_count}
                onChange={(e) => handleChange('internship_count', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Coding Rating</label>
              <input 
                type="number" min="800" max="2200" step="25"
                value={formData.coding_rating}
                onChange={(e) => handleChange('coding_rating', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Active Backlogs</label>
              <input 
                type="number" min="0" max="4"
                value={formData.backlogs}
                onChange={(e) => handleChange('backlogs', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center space-x-2 text-xs text-slate-300 pt-2">
          <input 
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="rounded bg-slate-900 border-slate-800 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="rememberMe" className="cursor-pointer font-medium flex items-center gap-1">
            <Save className="w-3.5 h-3.5 text-indigo-400" /> Save password & profile credentials for instant login on future visits
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center space-x-2"
        >
          <span>{isSignUp ? 'Save Details & Generate AI Predictions' : 'Sign In & Load Predictions'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>

      </form>

    </div>
  );
};
