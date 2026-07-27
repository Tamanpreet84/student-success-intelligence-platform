import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { OverviewDashboard } from './components/Dashboard/OverviewDashboard';
import { CGPAPredictor } from './components/CGPAPredictor/CGPAPredictor';
import { PlacementPredictor } from './components/PlacementPredictor/PlacementPredictor';
import { SkillGapAnalyzer } from './components/SkillGapAnalyzer/SkillGapAnalyzer';
import { InternshipMatcher } from './components/InternshipMatcher/InternshipMatcher';
import { StudyPlanGenerator } from './components/StudyPlanGenerator/StudyPlanGenerator';
import { CertificationSuggest } from './components/CertificationSuggest/CertificationSuggest';
import { AICounselor } from './components/AICounselor/AICounselor';
import { DEMO_PRESETS } from './data/mockData';

export function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [student, setStudent] = useState(DEMO_PRESETS.high_achiever);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentStudent={student}
        setStudent={setStudent}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <OverviewDashboard student={student} setActiveTab={setActiveTab} />}
        {activeTab === 'cgpa' && <CGPAPredictor student={student} setStudent={setStudent} />}
        {activeTab === 'placement' && <PlacementPredictor student={student} setStudent={setStudent} />}
        {activeTab === 'skillgap' && <SkillGapAnalyzer student={student} setStudent={setStudent} />}
        {activeTab === 'internships' && <InternshipMatcher student={student} />}
        {activeTab === 'studyplan' && <StudyPlanGenerator student={student} />}
        {activeTab === 'certifications' && <CertificationSuggest student={student} />}
        {activeTab === 'counselor' && <AICounselor student={student} />}
      </main>

      {/* Sleek Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Student Success Intelligence Platform • AI Machine Learning & Career Analytics</span>
          <span className="text-slate-400 font-medium">Powered by Python ML (Scikit-Learn, XGBoost) & React</span>
        </div>
      </footer>

    </div>
  );
}

export default App;
