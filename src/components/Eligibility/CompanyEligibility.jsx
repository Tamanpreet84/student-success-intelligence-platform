import React from 'react';
import { Building, CheckCircle2, AlertTriangle, XCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { predictCGPA } from '../../utils/mlEngine';

export const CompanyEligibility = ({ student }) => {
  const currentCgpa = predictCGPA(student).cgpa;
  const backlogs = student.backlogs || 0;
  const aptitude = student.aptitude_score || 60;
  const projects = student.project_count || 0;

  const companies = [
    {
      name: 'Google',
      tier: 'Tier 1 Product',
      minCgpa: 8.0,
      maxBacklogs: 0,
      minAptitude: 80,
      avgPackage: '₹35 - 45 LPA',
      logo: '🌐',
      keySkills: ['Data Structures & Algorithms', 'System Design', 'C++ / Python / Java']
    },
    {
      name: 'Amazon',
      tier: 'Tier 1 Product',
      minCgpa: 7.5,
      maxBacklogs: 0,
      minAptitude: 75,
      avgPackage: '₹28 - 38 LPA',
      logo: '📦',
      keySkills: ['Leadership Principles', 'OOP & System Design', 'AWS Services']
    },
    {
      name: 'Microsoft',
      tier: 'Tier 1 Product',
      minCgpa: 7.8,
      maxBacklogs: 0,
      minAptitude: 75,
      avgPackage: '₹30 - 42 LPA',
      logo: '💻',
      keySkills: ['Algorithms', 'Cloud Computing', 'Web Frameworks']
    },
    {
      name: 'Razorpay / Zomato',
      tier: 'Tier 2 Unicorn Startup',
      minCgpa: 7.0,
      maxBacklogs: 1,
      minAptitude: 70,
      avgPackage: '₹18 - 25 LPA',
      logo: '🚀',
      keySkills: ['React / Node.js', 'PostgreSQL / Redis', 'API Design']
    },
    {
      name: 'TCS Digital / Prime',
      tier: 'Tier 3 Enterprise Services',
      minCgpa: 6.0,
      maxBacklogs: 1,
      minAptitude: 60,
      avgPackage: '₹7.0 - 9.0 LPA',
      logo: '🏢',
      keySkills: ['Quantitative Aptitude', 'Python / Java', 'SQL Basics']
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Building className="w-6 h-6 text-cyan-400" /> Company Recruitment Eligibility Checker
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Evaluates your CGPA ({currentCgpa}), Backlogs ({backlogs}), and Aptitude ({aptitude}%) against top hiring criteria.
          </p>
        </div>

        <div className="bg-cyan-950/60 border border-cyan-500/30 px-4 py-2 rounded-xl text-right">
          <span className="text-xs text-cyan-300 font-medium">Hiring Criteria Check</span>
          <p className="text-sm font-extrabold text-white">5 Major IT & Product Benchmarks</p>
        </div>
      </div>

      {/* Companies List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {companies.map((comp, idx) => {
          const meetsCgpa = currentCgpa >= comp.minCgpa;
          const meetsBacklogs = backlogs <= comp.maxBacklogs;
          const meetsAptitude = aptitude >= comp.minAptitude;

          const isEligible = meetsCgpa && meetsBacklogs && meetsAptitude;

          return (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-slate-800 glass-panel-hover space-y-4 flex flex-col justify-between">
              
              <div>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{comp.logo}</span>
                    <div>
                      <h3 className="font-extrabold text-white text-lg">{comp.name}</h3>
                      <span className="text-xs text-cyan-400 font-semibold">{comp.tier}</span>
                    </div>
                  </div>

                  <div className={`px-3 py-1 rounded-xl text-xs font-black border ${
                    isEligible 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                      : meetsCgpa 
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                  }`}>
                    {isEligible ? '100% Eligible ✓' : meetsCgpa ? 'Conditional' : 'Not Eligible'}
                  </div>
                </div>

                <div className="mt-4 space-y-2 border-y border-slate-800 py-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Min CGPA Required:</span>
                    <span className={meetsCgpa ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{comp.minCgpa} CGPA (You: {currentCgpa})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Max Active Backlogs:</span>
                    <span className={meetsBacklogs ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{comp.maxBacklogs} Backlogs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Avg Placement Package:</span>
                    <span className="text-purple-300 font-bold">{comp.avgPackage}</span>
                  </div>
                </div>

                <div className="mt-3 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Key Skill Prerequisites:</span>
                  <div className="flex flex-wrap gap-1">
                    {comp.keySkills.map((s, sIdx) => (
                      <span key={sIdx} className="px-2 py-0.5 rounded text-[10px] bg-slate-900 border border-slate-800 text-slate-300">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => alert(`Directing to placement preparation drive for ${comp.name}`)}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 border border-slate-800 text-cyan-300 transition-all flex items-center justify-center gap-1.5"
              >
                Explore Preparation Guide <ExternalLink className="w-3.5 h-3.5" />
              </button>

            </div>
          );
        })}
      </div>

    </div>
  );
};
