import React from 'react';
import { BrainCircuit, Target, CheckCircle2, AlertTriangle, ArrowUpRight, Sparkles } from 'lucide-react';
import { 
  RadarChart, 
  Radar, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import { JOB_ROLES } from '../../data/mockData';
import { calculateSkillGap } from '../../utils/mlEngine';

export const SkillGapAnalyzer = ({ student, setStudent }) => {
  const currentRole = student.targetRole || 'fullstack';
  const gapData = calculateSkillGap(student.skills, currentRole);

  const handleRoleChange = (roleKey) => {
    setStudent(prev => ({
      ...prev,
      targetRole: roleKey
    }));
  };

  const handleSkillChange = (skillName, value) => {
    setStudent(prev => ({
      ...prev,
      skills: {
        ...(prev.skills || {}),
        [skillName]: parseInt(value, 10)
      }
    }));
  };

  const chartData = gapData.gapAnalysis.map(item => ({
    skill: item.skill,
    Student: item.studentLevel,
    Required: item.requiredLevel,
    Gap: item.gap
  }));

  return (
    <div className="space-y-6">
      
      {/* Header & Target Role Selector */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-cyan-400" /> Skill Gap Radar & Competency Analyzer
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Compare your current technical proficiencies against industry job descriptions to pinpoint high-value skill gaps.
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-xl p-1.5 w-full md:w-auto">
          <Target className="w-4 h-4 text-cyan-400 ml-2" />
          <span className="text-xs font-semibold text-slate-400">Target Role:</span>
          <select 
            value={currentRole}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="bg-slate-950 text-xs font-bold text-cyan-300 border-none rounded-lg focus:ring-1 focus:ring-cyan-500 py-1.5 px-3 cursor-pointer"
          >
            {Object.entries(JOB_ROLES).map(([key, role]) => (
              <option key={key} value={key}>{role.name} ({role.category})</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Large Radar Chart */}
        <div className="glass-panel p-6 rounded-2xl lg:col-span-2 space-y-4 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Competency Overlay Matrix
              </h3>
              <p className="text-xs text-slate-400">Cyan: Your Current Proficiency • Purple: Industry Required Baseline</p>
            </div>
            <div className="bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-lg text-right">
              <span className="text-xs font-bold text-cyan-300">{gapData.overallMatchPct}% Role Match</span>
            </div>
          </div>

          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="skill" stroke="#cbd5e1" fontSize={11} />
                <PolarRadiusAxis domain={[0, 100]} stroke="#475569" fontSize={9} />
                <Radar name="Student Proficiency" dataKey="Student" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.45} strokeWidth={2} />
                <Radar name="Industry Standard" dataKey="Required" stroke="#a855f7" fill="#a855f7" fillOpacity={0.15} strokeWidth={2} strokeDasharray="3 3" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '10px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Bar chart comparison */}
          <div className="h-44 w-full border-t border-slate-800 pt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="skill" stroke="#64748b" fontSize={10} tickFormatter={(v) => v.split(' ')[0]} />
                <YAxis domain={[0, 100]} stroke="#64748b" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '10px' }} />
                <Bar dataKey="Student" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Your Level" />
                <Bar dataKey="Required" fill="#a855f7" radius={[4, 4, 0, 0]} name="Target Baseline" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Rating Inputs & Gap Breakdown */}
        <div className="glass-panel p-6 rounded-2xl space-y-5">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            Adjust Skill Self-Assessment
          </h3>

          <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
            {gapData.gapAnalysis.map((item, idx) => (
              <div key={idx} className="space-y-1.5 bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-200">{item.skill}</span>
                  <span className={`font-extrabold ${item.gap > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {item.studentLevel} / {item.requiredLevel}
                  </span>
                </div>
                <input 
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={item.studentLevel}
                  onChange={(e) => handleSkillChange(item.skill, e.target.value)}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between items-center text-[10px]">
                  <span className={item.gap > 0 ? 'text-rose-400' : 'text-emerald-400 font-semibold'}>
                    {item.gap > 0 ? `Gap: -${item.gap} points` : '✓ Standard Satisfied'}
                  </span>
                  <span className="text-slate-500">{item.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Actionable focus */}
          <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs space-y-1">
            <span className="font-bold text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> High-Yield Learning Focus:
            </span>
            <p className="text-slate-300">
              Focus next 2 weeks on <span className="text-white font-bold">{gapData.suggestedFocus}</span> to increase overall market match to <span className="text-emerald-400 font-bold">{Math.min(100, gapData.overallMatchPct + 15)}%</span>.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
