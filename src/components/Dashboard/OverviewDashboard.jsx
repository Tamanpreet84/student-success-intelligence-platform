import React from 'react';
import { 
  GraduationCap, 
  Target, 
  DollarSign, 
  BrainCircuit, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  BookOpen,
  Award
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { predictCGPA, predictPlacement, estimateSalary, calculateSkillGap } from '../../utils/mlEngine';

export const OverviewDashboard = ({ student, setActiveTab }) => {
  const cgpaData = predictCGPA(student);
  const placementData = predictPlacement(student, cgpaData.cgpa);
  const salaryData = estimateSalary(student, cgpaData.cgpa);
  const skillGapData = calculateSkillGap(student.skills, student.targetRole || 'fullstack');

  // Trend data simulation
  const trendData = [
    { sem: 'Sem 1', cgpa: (student.previous_gpa || 7.5) - 0.6, studyHrs: (student.study_hours_weekly || 15) - 6 },
    { sem: 'Sem 2', cgpa: (student.previous_gpa || 7.5) - 0.3, studyHrs: (student.study_hours_weekly || 15) - 3 },
    { sem: 'Sem 3', cgpa: student.previous_gpa || 7.5, studyHrs: student.study_hours_weekly || 15 },
    { sem: 'Sem 4 (Pred)', cgpa: cgpaData.cgpa, studyHrs: (student.study_hours_weekly || 15) + 4 },
  ];

  // Mini radar data
  const radarData = skillGapData.gapAnalysis.map(item => ({
    subject: item.skill.split(' ')[0],
    Student: item.studentLevel,
    Required: item.requiredLevel
  }));

  return (
    <div className="space-y-6">
      
      {/* Student Welcome Header */}
      <div className="glass-panel p-6 rounded-2xl relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-3 mb-1">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Active Student Profile
              </span>
              <span className="text-xs text-slate-400">ID: STU_2026_8941</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {student.name || 'Student Analytics Overview'}
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Target Role: <span className="text-indigo-400 font-semibold">{skillGapData.targetRoleName}</span> • Attendance: {student.attendance_pct || 75}% • Weekly Study: {student.study_hours_weekly || 15} hrs
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('counselor')}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" /> Ask AI Counselor
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core AI Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Predicted CGPA */}
        <div className="glass-panel p-5 rounded-2xl glass-panel-hover border-l-4 border-l-indigo-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Predicted CGPA</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <GraduationCap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white tracking-tight">{cgpaData.cgpa}</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${cgpaData.diffFromPrevious >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
              {cgpaData.diffFromPrevious >= 0 ? `+${cgpaData.diffFromPrevious}` : cgpaData.diffFromPrevious} vs Prev
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">ML Regression Model (R² = 0.928)</p>
        </div>

        {/* Card 2: Placement Probability */}
        <div className="glass-panel p-5 rounded-2xl glass-panel-hover border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Placement Chance</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Target className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white tracking-tight">{placementData.probabilityPct}%</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
              placementData.probabilityPct >= 75 ? 'bg-emerald-500/20 text-emerald-400' : 
              placementData.probabilityPct >= 45 ? 'bg-amber-500/20 text-amber-400' : 'bg-rose-500/20 text-rose-400'
            }`}>
              {placementData.status}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">{placementData.tierEligibility}</p>
        </div>

        {/* Card 3: Estimated Package */}
        <div className="glass-panel p-5 rounded-2xl glass-panel-hover border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Estimated Salary</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white tracking-tight">{salaryData.range}</span>
          </div>
          <p className="text-xs text-purple-300 font-medium mt-2">{salaryData.usdEquivalent}</p>
        </div>

        {/* Card 4: Skill Match */}
        <div className="glass-panel p-5 rounded-2xl glass-panel-hover border-l-4 border-l-cyan-500">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Skill Compatibility</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <BrainCircuit className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-white tracking-tight">{skillGapData.overallMatchPct}%</span>
            <span className="text-xs font-semibold text-cyan-400">vs Market Benchmark</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">Critical Focus: {skillGapData.suggestedFocus}</p>
        </div>

      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CGPA Trajectory Chart */}
        <div className="glass-panel p-6 rounded-2xl lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-400" /> Academic CGPA Trajectory
              </h3>
              <p className="text-xs text-slate-400">Semester progression & weekly study hours correlation</p>
            </div>
            <button 
              onClick={() => setActiveTab('cgpa')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              Simulate Grades <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <XAxis dataKey="sem" stroke="#64748b" fontSize={12} />
                <YAxis domain={[5, 10]} stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                />
                <Line type="monotone" dataKey="cgpa" stroke="#6366f1" strokeWidth={3} dot={{ r: 6, fill: '#6366f1' }} name="CGPA" />
                <Line type="monotone" dataKey="studyHrs" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="Study Hours/Wk" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Gap Radar Preview */}
        <div className="glass-panel p-6 rounded-2xl space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-cyan-400" /> Skill Competency Radar
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">Comparing your skills against <span className="text-cyan-400 font-semibold">{skillGapData.targetRoleName}</span></p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={10} />
                <PolarRadiusAxis domain={[0, 100]} stroke="#475569" fontSize={9} />
                <Radar name="Student" dataKey="Student" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.4} />
                <Radar name="Required" dataKey="Required" stroke="#a855f7" fill="#a855f7" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <button 
            onClick={() => setActiveTab('skillgap')}
            className="w-full py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-cyan-300 transition-all flex items-center justify-center gap-2"
          >
            View Full Skill Matrix <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Recommendations & Quick Action Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Internship Card */}
        <div 
          onClick={() => setActiveTab('internships')}
          className="glass-panel p-5 rounded-2xl glass-panel-hover cursor-pointer border border-slate-800 hover:border-indigo-500/40 space-y-3"
        >
          <div className="p-3 w-fit rounded-xl bg-indigo-500/10 text-indigo-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-white text-base">Recommended Internships</h4>
          <p className="text-xs text-slate-400">4 Top matched internship openings curated for your CGPA ({cgpaData.cgpa}) and skill set.</p>
          <div className="text-xs font-semibold text-indigo-400 flex items-center gap-1 pt-1">
            Explore Openings <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Study Plan Card */}
        <div 
          onClick={() => setActiveTab('studyplan')}
          className="glass-panel p-5 rounded-2xl glass-panel-hover cursor-pointer border border-slate-800 hover:border-purple-500/40 space-y-3"
        >
          <div className="p-3 w-fit rounded-xl bg-purple-500/10 text-purple-400">
            <Award className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-white text-base">7-Day AI Study Roadmap</h4>
          <p className="text-xs text-slate-400">Personalized weekly study allocation targetting {student.study_hours_weekly || 15} hrs/week.</p>
          <div className="text-xs font-semibold text-purple-400 flex items-center gap-1 pt-1">
            View Weekly Schedule <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Certification Suggestion Card */}
        <div 
          onClick={() => setActiveTab('certifications')}
          className="glass-panel p-5 rounded-2xl glass-panel-hover cursor-pointer border border-slate-800 hover:border-amber-500/40 space-y-3"
        >
          <div className="p-3 w-fit rounded-xl bg-amber-500/10 text-amber-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-white text-base">Top Certifications</h4>
          <p className="text-xs text-slate-400">Industry recognized credentials to bridge your key skill gap: <span className="text-amber-300 font-semibold">{skillGapData.suggestedFocus}</span>.</p>
          <div className="text-xs font-semibold text-amber-400 flex items-center gap-1 pt-1">
            See Recommended Courses <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

    </div>
  );
};
