import React, { useState } from 'react';
import { Briefcase, Building, MapPin, DollarSign, Clock, CheckCircle2, AlertCircle, ExternalLink, Filter } from 'lucide-react';
import { matchInternships } from '../../utils/mlEngine';

export const InternshipMatcher = ({ student }) => {
  const [filterRemote, setFilterRemote] = useState(false);
  const internships = matchInternships(student, student.targetRole || 'fullstack');
  
  const filtered = filterRemote ? internships.filter(i => i.location.toLowerCase().includes('remote')) : internships;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-indigo-400" /> Smart Internship Matcher & Recommender
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Matching live openings against your academic CGPA, project portfolio, and core technical skill score.
          </p>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 rounded-xl p-2">
          <Filter className="w-4 h-4 text-indigo-400" />
          <label className="text-xs font-semibold text-slate-300 cursor-pointer flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={filterRemote}
              onChange={(e) => setFilterRemote(e.target.checked)}
              className="rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-indigo-500"
            />
            Remote Only Openings
          </label>
        </div>
      </div>

      {/* Internship Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <div key={item.id} className="glass-panel p-6 rounded-2xl border border-slate-800 glass-panel-hover flex flex-col justify-between space-y-4">
            
            <div>
              {/* Top Row: Company & Match Score Badge */}
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h3 className="font-extrabold text-white text-lg tracking-tight">{item.title}</h3>
                  <div className="flex items-center space-x-2 text-xs text-indigo-400 font-semibold mt-0.5">
                    <Building className="w-3.5 h-3.5" />
                    <span>{item.company}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`px-3 py-1 rounded-xl text-xs font-black shadow-md ${
                    item.matchPct >= 80 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    item.matchPct >= 65 ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' :
                    'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {item.matchPct}% Match
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 block">Algorithmic Score</span>
                </div>
              </div>

              {/* Meta Tags */}
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 my-4 border-y border-slate-800/80 py-3">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {item.location}</span>
                <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-emerald-400" /> {item.stipend}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-purple-400" /> {item.duration}</span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-4">{item.description}</p>

              {/* Required Skills Checklist */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Required Skills:</span>
                <div className="flex flex-wrap gap-1.5">
                  {item.requiredSkills.map((sk, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-900 border border-slate-800 text-slate-300">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row: Eligibility & Apply Button */}
            <div className="flex justify-between items-center pt-3 border-t border-slate-800/80">
              <div className="flex items-center space-x-1.5 text-xs font-semibold">
                {item.isEligible ? (
                  <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Eligible (Min CGPA {item.minCgpa})</span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> Requires CGPA ≥ {item.minCgpa}</span>
                )}
              </div>

              <button 
                onClick={() => alert(`Redirecting to application portal for ${item.title} at ${item.company}`)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5"
              >
                Apply Now <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
