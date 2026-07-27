import React from 'react';
import { Target, DollarSign, Award, Briefcase, Code, UserCheck, ShieldAlert, Sparkles, Building } from 'lucide-react';
import { predictCGPA, predictPlacement, estimateSalary } from '../../utils/mlEngine';

export const PlacementPredictor = ({ student, setStudent }) => {
  const currentCgpa = predictCGPA(student).cgpa;
  const placementResult = predictPlacement(student, currentCgpa);
  const salaryResult = estimateSalary(student, currentCgpa);

  const handleChange = (field, value) => {
    setStudent(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const codingPresets = [
    { rating: 1000, label: '1000 (Beginner)' },
    { rating: 1400, label: '1400 (Specialist)' },
    { rating: 1650, label: '1650 (Knight)' },
    { rating: 1900, label: '1900 (Master)' },
    { rating: 2150, label: '2150 (Grandmaster)' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-emerald-500" /> Placement Probability & Salary Estimator
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            XGBoost Classification & Gradient Boosting Regression models evaluating campus recruitment readiness and starting package.
          </p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 px-4 py-2 rounded-xl text-right">
          <span className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">Model Accuracy</span>
          <p className="text-sm font-extrabold text-slate-900 dark:text-white">83.66% Placement ROC-AUC</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Placement Sliders */}
        <div className="glass-panel p-6 rounded-2xl lg:col-span-2 space-y-6 border border-slate-200 dark:border-slate-800">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <Briefcase className="w-5 h-5 text-emerald-500" /> Technical & Professional Profile Inputs
          </h3>

          {/* Slider 1: Projects Count */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Completed Capstone & Minor Projects</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{student.project_count || 0} Project(s)</span>
            </div>
            <input 
              type="range"
              min="0"
              max="6"
              step="1"
              value={student.project_count || 0}
              onChange={(e) => handleChange('project_count', e.target.value)}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0 (None)</span>
              <span>3 (Recommended)</span>
              <span>6 (Exceptional)</span>
            </div>
          </div>

          {/* Slider 2: Internships Count */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Previous Internship Experience</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{student.internship_count || 0} Internship(s)</span>
            </div>
            <input 
              type="range"
              min="0"
              max="3"
              step="1"
              value={student.internship_count || 0}
              onChange={(e) => handleChange('internship_count', e.target.value)}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Slider 3: Competitive Coding Rating (WITH PRESETS & SMOOTH SLIDER) */}
          <div className="space-y-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Code className="w-4 h-4 text-emerald-500" /> Competitive Coding Rating (LeetCode / CodeChef)
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm px-2.5 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                {student.coding_rating || 1200} Rating
              </span>
            </div>
            
            <input 
              type="range"
              min="800"
              max="2200"
              step="25"
              value={student.coding_rating || 1200}
              onChange={(e) => handleChange('coding_rating', e.target.value)}
              className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            
            <div className="flex justify-between text-[10px] text-slate-500 pb-1">
              <span>800 (Beginner)</span>
              <span>1500 (Knight)</span>
              <span>2200 (Grandmaster)</span>
            </div>

            {/* Interactive Rating Preset Buttons */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Quick Select Rating Preset:</span>
              <div className="flex flex-wrap gap-1.5">
                {codingPresets.map((preset) => (
                  <button
                    key={preset.rating}
                    type="button"
                    onClick={() => handleChange('coding_rating', preset.rating)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
                      (student.coding_rating || 1200) === preset.rating
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-500/20'
                        : 'bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-800 hover:border-emerald-500'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Slider 4: Aptitude Test Score */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Aptitude & Reasoning Test Score</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{student.aptitude_score || 60}%</span>
            </div>
            <input 
              type="range"
              min="40"
              max="100"
              step="1"
              value={student.aptitude_score || 60}
              onChange={(e) => handleChange('aptitude_score', e.target.value)}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Slider 5: Soft Skills */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">Soft Skills & Communication Score</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{student.soft_skills_score || 70}%</span>
            </div>
            <input 
              type="range"
              min="50"
              max="100"
              step="1"
              value={student.soft_skills_score || 70}
              onChange={(e) => handleChange('soft_skills_score', e.target.value)}
              className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

        </div>

        {/* Prediction Results */}
        <div className="space-y-6">
          
          {/* Probability Gauge Card */}
          <div className="glass-panel p-6 rounded-2xl border-2 border-emerald-500/40 text-center space-y-4 bg-gradient-to-b from-white to-emerald-50/50 dark:from-slate-900 dark:to-emerald-950/30">
            <span className="text-xs font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">Placement Probability</span>
            <div className="relative flex items-center justify-center my-2">
              <div className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                {placementResult.probabilityPct}%
              </div>
            </div>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40">
              {placementResult.status}
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 text-left">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Estimated Compensation Range:</span>
              <div className="text-2xl font-extrabold text-purple-700 dark:text-purple-300 mt-1">{salaryResult.range}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{salaryResult.usdEquivalent}</p>
            </div>
          </div>

          {/* Company Tier Eligibility */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-wider">
              <Building className="w-4 h-4 text-indigo-500" /> Tier Company Eligibility
            </h4>
            <div className="space-y-2">
              <div className={`p-2.5 rounded-xl border text-xs flex justify-between items-center ${
                placementResult.probabilityPct >= 75 ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/30 text-emerald-700 dark:text-emerald-300' : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500'
              }`}>
                <span className="font-semibold">Tier 1: Product / Big Tech</span>
                <span>{placementResult.probabilityPct >= 75 ? 'Eligible' : 'High Competition'}</span>
              </div>
              <div className={`p-2.5 rounded-xl border text-xs flex justify-between items-center ${
                placementResult.probabilityPct >= 50 ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500/30 text-indigo-700 dark:text-indigo-300' : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500'
              }`}>
                <span className="font-semibold">Tier 2: Mid-Size & Unicorns</span>
                <span>{placementResult.probabilityPct >= 50 ? 'Strong Chance' : 'Moderate'}</span>
              </div>
              <div className="p-2.5 rounded-xl border text-xs flex justify-between items-center bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                <span className="font-semibold">Tier 3: Enterprise Services</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% Eligible</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
