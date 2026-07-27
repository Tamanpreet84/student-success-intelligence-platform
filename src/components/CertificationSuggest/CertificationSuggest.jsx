import React from 'react';
import { Award, CheckCircle2, DollarSign, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import { CERTIFICATIONS } from '../../data/mockData';
import { calculateSkillGap } from '../../utils/mlEngine';

export const CertificationSuggest = ({ student }) => {
  const currentRole = student.targetRole || 'fullstack';
  const gapInfo = calculateSkillGap(student.skills, currentRole);

  const matchedCerts = CERTIFICATIONS.filter(cert => 
    cert.roleMatch.includes(currentRole) || cert.skillsLearned.some(s => gapInfo.criticalGaps.includes(s))
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-400" /> Industry Certification Recommender
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Top recognized certifications tailored to plug your primary skill gap (<span className="text-amber-300 font-semibold">{gapInfo.suggestedFocus}</span>).
          </p>
        </div>

        <div className="bg-amber-950/60 border border-amber-500/30 px-4 py-2 rounded-xl text-right">
          <span className="text-xs text-amber-300 font-medium">Resume Impact</span>
          <p className="text-sm font-extrabold text-white">+40% Recruiter Response</p>
        </div>
      </div>

      {/* Certification Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {matchedCerts.map((cert) => (
          <div key={cert.id} className="glass-panel p-6 rounded-2xl border border-slate-800 glass-panel-hover space-y-4 flex flex-col justify-between">
            
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                    {cert.level}
                  </span>
                  <h3 className="font-extrabold text-white text-lg mt-2">{cert.name}</h3>
                  <span className="text-xs text-slate-400 font-medium">Issued by: {cert.provider}</span>
                </div>

                <div className="p-3 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30">
                  <Award className="w-6 h-6" />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Target Competencies:</span>
                <div className="flex flex-wrap gap-1.5">
                  {cert.skillsLearned.map((sk, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" /> {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-800/80">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-amber-400" /> Est Cost: {cert.estCost}
              </span>

              <button 
                onClick={() => alert(`Opening official portal for ${cert.name}`)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-500/20 transition-all flex items-center gap-1.5"
              >
                View Syllabus <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
