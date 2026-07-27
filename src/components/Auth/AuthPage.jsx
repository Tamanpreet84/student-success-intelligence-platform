import React, { useState } from 'react';
import { User, Mail, Lock, GraduationCap, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Key, Save, BookOpen, ArrowLeft, Code } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { JOB_ROLES } from '../../data/mockData';

export const AuthPage = ({ setActiveTab, setStudent }) => {
  const { login, signup, currentUser } = useAuth();
  const { addToast } = useToast();

  const [step, setStep] = useState(1); // Step 1: Auth (Login/Signup), Step 2: Student Details
  const [isSignUp, setIsSignUp] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);

  // Student Input Form State
  const [formData, setFormData] = useState({
    name: currentUser?.name || 'Aman Sharma',
    email: currentUser?.email || 'student@university.edu',
    password: '',
    university: currentUser?.university || 'State Tech University',
    degree: currentUser?.degree || 'B.Tech Computer Science',
    targetRole: currentUser?.targetRole || 'fullstack',
    attendance_pct: 85.0,
    study_hours_weekly: 18.0,
    previous_gpa: 8.20,
    assignment_score: 88.0,
    project_count: 3,
    internship_count: 1,
    aptitude_score: 80.0,
    coding_rating: 1520,
    soft_skills_score: 85.0,
    backlogs: 0
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const codingPresets = [
    { rating: 1000, label: '1000 (Beginner)' },
    { rating: 1400, label: '1400 (Specialist)' },
    { rating: 1650, label: '1650 (Knight)' },
    { rating: 1900, label: '1900 (Master)' },
    { rating: 2150, label: '2150 (Grandmaster)' }
  ];

  const handleAuthStepSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) {
      addToast('Please enter your email address', 'error');
      return;
    }

    if (isSignUp) {
      signup(formData.name, formData.email, formData.password || 'password123');
      addToast('Account created! Now please enter your academic details.', 'success');
    } else {
      login(formData.email, formData.password || 'password123');
      addToast('Sign in successful! Please verify or update your academic details.', 'success');
    }

    // Move to Step 2: Student Details Form
    setStep(2);
  };

  const handleDetailsStepSubmit = (e) => {
    e.preventDefault();

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

    if (rememberMe) {
      localStorage.setItem('saved_student_credentials', JSON.stringify({
        email: formData.email,
        savedPassword: formData.password,
        rememberMe: true
      }));
    }

    addToast('Academic details saved! Loading your personalized AI predictions...', 'success');
    
    // Move to Step 3: AI Predictor Dashboard
    setActiveTab('dashboard');
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto py-4">
      
      {/* Step Indicator Progress Bar */}
      <div className="flex items-center justify-between glass-panel p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
        <div className={`flex items-center space-x-2 ${step === 1 ? 'text-indigo-600 font-extrabold' : 'text-slate-400'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>1</span>
          <span>Login / Sign Up</span>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-400" />
        <div className={`flex items-center space-x-2 ${step === 2 ? 'text-indigo-600 font-extrabold' : 'text-slate-400'}`}>
          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>2</span>
          <span>Student Academic Details</span>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-400" />
        <div className="flex items-center space-x-2 text-slate-400">
          <span className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xs text-slate-500 dark:text-slate-400">3</span>
          <span>AI Predictor Dashboard</span>
        </div>
      </div>

      {/* STEP 1: LOGIN / SIGN UP PAGE */}
      {step === 1 && (
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 animate-fade-in">
          
          <div className="text-center space-y-2">
            <div className="p-3 bg-indigo-600 text-white rounded-2xl w-fit mx-auto shadow-lg shadow-indigo-500/20">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {isSignUp ? 'Student Registration' : 'Student Login'}
            </h1>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {isSignUp ? 'Create your student account to access AI CGPA forecasts & placement readiness.' : 'Sign in to access your saved profile & prediction analytics.'}
            </p>
          </div>

          <form onSubmit={handleAuthStepSubmit} className="space-y-4 max-w-md mx-auto">
            {isSignUp && (
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Full Student Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input 
                    type="text" required
                    placeholder="e.g. Aman Sharma"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 dark:text-white focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input 
                  type="email" required
                  placeholder="student@university.edu"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 dark:text-white focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input 
                  type="password" required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 dark:text-white focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-400 pt-1">
              <input 
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="rememberMe" className="cursor-pointer font-medium">Save password option for future visits</label>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-xs font-extrabold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center space-x-2"
            >
              <span>{isSignUp ? 'Continue to Student Details' : 'Sign In & Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800">
            {isSignUp ? (
              <p>Already registered? <button onClick={() => setIsSignUp(false)} className="text-indigo-600 font-bold hover:underline">Log in here</button></p>
            ) : (
              <p>Need an account? <button onClick={() => setIsSignUp(true)} className="text-indigo-600 font-bold hover:underline">Sign up here</button></p>
            )}
          </div>

        </div>
      )}

      {/* STEP 2: STUDENT DETAILS FORM */}
      {step === 2 && (
        <form onSubmit={handleDetailsStepSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 animate-fade-in">
          
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-indigo-600" /> Fill Academic & Technical Profile Details
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Input your current academic metrics to generate live AI CGPA & Placement predictions.</p>
            </div>
            <button 
              type="button"
              onClick={() => setStep(1)}
              className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">University / College</label>
              <input 
                type="text" required
                value={formData.university}
                onChange={(e) => handleChange('university', e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Degree & Branch</label>
              <input 
                type="text" required
                value={formData.degree}
                onChange={(e) => handleChange('degree', e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl p-2.5 text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Class Attendance %</label>
              <input 
                type="number" min="50" max="100" step="0.5" required
                value={formData.attendance_pct}
                onChange={(e) => handleChange('attendance_pct', e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl p-2.5 font-mono text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Weekly Study Hours</label>
              <input 
                type="number" min="2" max="40" step="1" required
                value={formData.study_hours_weekly}
                onChange={(e) => handleChange('study_hours_weekly', e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl p-2.5 font-mono text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Previous Semester GPA</label>
              <input 
                type="number" min="4.0" max="10.0" step="0.1" required
                value={formData.previous_gpa}
                onChange={(e) => handleChange('previous_gpa', e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl p-2.5 font-mono text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Target Job Role</label>
              <select 
                value={formData.targetRole}
                onChange={(e) => handleChange('targetRole', e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl p-2.5 text-indigo-600 font-bold"
              >
                {Object.entries(JOB_ROLES).map(([k, r]) => (
                  <option key={k} value={k}>{r.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Projects Count</label>
              <input 
                type="number" min="0" max="6" required
                value={formData.project_count}
                onChange={(e) => handleChange('project_count', e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl p-2.5 font-mono text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-700 dark:text-slate-300">Active Backlogs</label>
              <input 
                type="number" min="0" max="4" required
                value={formData.backlogs}
                onChange={(e) => handleChange('backlogs', e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl p-2.5 font-mono text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Competitive Coding Rating Control with Slider AND Presets */}
          <div className="space-y-2.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Code className="w-4 h-4 text-emerald-600" /> Competitive Coding Rating (LeetCode / CodeChef)
              </span>
              <span className="text-emerald-700 dark:text-emerald-400 font-extrabold text-sm px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                {formData.coding_rating} Rating
              </span>
            </div>

            <input 
              type="range"
              min="800"
              max="2200"
              step="25"
              value={formData.coding_rating}
              onChange={(e) => handleChange('coding_rating', parseInt(e.target.value, 10))}
              className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />

            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block w-full">Quick Preset Rating:</span>
              {codingPresets.map((preset) => (
                <button
                  key={preset.rating}
                  type="button"
                  onClick={() => handleChange('coding_rating', preset.rating)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
                    formData.coding_rating === preset.rating
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-500/20'
                      : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-800 hover:border-emerald-500'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center space-x-2"
          >
            <span>Generate AI Predictions & Open Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>
      )}

    </div>
  );
};
