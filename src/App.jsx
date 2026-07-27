import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { AuthPage } from './components/Auth/AuthPage';
import { AuthModal } from './components/Auth/AuthModal';
import { ProfilePage } from './components/Auth/ProfilePage';
import { LandingPage } from './components/Home/LandingPage';
import { OverviewDashboard } from './components/Dashboard/OverviewDashboard';
import { CGPAPredictor } from './components/CGPAPredictor/CGPAPredictor';
import { PlacementPredictor } from './components/PlacementPredictor/PlacementPredictor';
import { SkillGapAnalyzer } from './components/SkillGapAnalyzer/SkillGapAnalyzer';
import { InternshipMatcher } from './components/InternshipMatcher/InternshipMatcher';
import { StudyPlanGenerator } from './components/StudyPlanGenerator/StudyPlanGenerator';
import { CertificationSuggest } from './components/CertificationSuggest/CertificationSuggest';
import { AICounselor } from './components/AICounselor/AICounselor';
import { ResumeAnalyzer } from './components/Resume/ResumeAnalyzer';
import { ResumeBuilder } from './components/Resume/ResumeBuilder';
import { MockInterview } from './components/MockInterview/MockInterview';
import { CareerRoadmap } from './components/Roadmap/CareerRoadmap';
import { CompanyEligibility } from './components/Eligibility/CompanyEligibility';
import { GithubLeetcodeTracker } from './components/Trackers/GithubLeetcodeTracker';
import { AboutPage } from './components/Pages/AboutPage';
import { FAQPage } from './components/Pages/FAQPage';

import { DEMO_PRESETS } from './data/mockData';

export function AppContent() {
  // Default active tab is 'auth' (Login / Sign Up -> Details -> AI Predictor)
  const [activeTab, setActiveTab] = useState('auth');
  const [student, setStudent] = useState(DEMO_PRESETS.high_achiever);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');

  const openAuthModal = (mode = 'login') => {
    setActiveTab('auth');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      
      {/* Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        openAuthModal={openAuthModal}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'auth' && <AuthPage setActiveTab={setActiveTab} setStudent={setStudent} />}
        {activeTab === 'home' && <LandingPage setActiveTab={setActiveTab} openAuthModal={openAuthModal} />}
        {activeTab === 'dashboard' && <OverviewDashboard student={student} setActiveTab={setActiveTab} />}
        {activeTab === 'cgpa' && <CGPAPredictor student={student} setStudent={setStudent} />}
        {activeTab === 'placement' && <PlacementPredictor student={student} setStudent={setStudent} />}
        {activeTab === 'resume' && (
          <div className="space-y-12">
            <ResumeAnalyzer />
            <ResumeBuilder />
          </div>
        )}
        {activeTab === 'mockinterview' && <MockInterview />}
        {activeTab === 'skillgap' && <SkillGapAnalyzer student={student} setStudent={setStudent} />}
        {activeTab === 'roadmap' && <CareerRoadmap />}
        {activeTab === 'eligibility' && <CompanyEligibility student={student} />}
        {activeTab === 'trackers' && <GithubLeetcodeTracker student={student} />}
        {activeTab === 'internships' && <InternshipMatcher student={student} />}
        {activeTab === 'studyplan' && <StudyPlanGenerator student={student} />}
        {activeTab === 'certifications' && <CertificationSuggest student={student} />}
        {activeTab === 'counselor' && <AICounselor student={student} />}
        {activeTab === 'profile' && <ProfilePage setActiveTab={setActiveTab} />}
        {activeTab === 'about' && <AboutPage />}
        {activeTab === 'faq' && <FAQPage />}
      </main>

      {/* Auth Modal Fallback */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-900 bg-white/80 dark:bg-slate-950/90 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Student Success Intelligence Platform • AI Placement & Career Platform v2.7</span>
          <span className="text-slate-600 dark:text-slate-400 font-medium">Powered by Python ML & React 18</span>
        </div>
      </footer>

    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
