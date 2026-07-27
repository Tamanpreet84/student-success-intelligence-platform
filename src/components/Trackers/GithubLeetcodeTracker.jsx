import React, { useState } from 'react';
import { Github, Code, CheckCircle2, Award, ExternalLink, TrendingUp, Sparkles } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

export const GithubLeetcodeTracker = ({ student }) => {
  const [githubUser, setGithubUser] = useState('tamanpreet84');
  const [leetcodeUser, setLeetcodeUser] = useState('aarav_coder');
  
  const githubStats = {
    repos: 18,
    stars: 42,
    contributionsThisYear: 482,
    qualityScore: 88,
    languages: [
      { name: 'JavaScript / React', value: 45, color: '#f7df1e' },
      { name: 'Python / ML', value: 30, color: '#3572A5' },
      { name: 'HTML/CSS', value: 15, color: '#e34c26' },
      { name: 'TypeScript', value: 10, color: '#3178c6' }
    ]
  };

  const leetcodeStats = {
    totalSolved: 245,
    easy: 110,
    medium: 115,
    hard: 20,
    contestRating: student.coding_rating || 1580,
    globalRank: 'Top 12%',
    badges: ['50 Days Badge 2026', 'Knight', 'LeetCode 100 Days']
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Github className="w-6 h-6 text-indigo-400" /> GitHub & LeetCode Progress Tracker
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Tracks open-source contribution metrics, repository impact scores, and competitive coding ratings.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-indigo-950/60 border border-indigo-500/30 px-4 py-2 rounded-xl">
          <Award className="w-5 h-5 text-amber-400" />
          <div>
            <span className="text-[10px] text-indigo-300 uppercase tracking-wider block">Combined Profile Score</span>
            <span className="text-sm font-extrabold text-white">89 / 100 (Recruiter Ready)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* GitHub Column */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
          
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Github className="w-5 h-5 text-white" />
              <h3 className="text-base font-bold text-white">GitHub Open Source Metrics</h3>
            </div>
            <a 
              href={`https://github.com/${githubUser}`} 
              target="_blank" 
              rel="noreferrer"
              className="text-xs font-semibold text-indigo-400 flex items-center gap-1 hover:underline"
            >
              @{githubUser} <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block">Repositories</span>
              <span className="text-xl font-extrabold text-white">{githubStats.repos}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block">Stars Earned</span>
              <span className="text-xl font-extrabold text-amber-400">{githubStats.stars} ★</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block">Commits (2026)</span>
              <span className="text-xl font-extrabold text-emerald-400">{githubStats.contributionsThisYear}</span>
            </div>
          </div>

          {/* Language distribution chart */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Language Breakdown:</span>
            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={githubStats.languages} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} innerRadius={35}>
                    {githubStats.languages.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '10px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* LeetCode Column */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-5">
          
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <Code className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">LeetCode Solver Analytics</h3>
            </div>
            <span className="text-xs font-bold text-amber-400">@{leetcodeUser}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block">Total Solved</span>
              <span className="text-2xl font-black text-white">{leetcodeStats.totalSolved}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
              <span className="text-xs text-slate-400 block">Contest Rating</span>
              <span className="text-2xl font-black text-indigo-400">{leetcodeStats.contestRating}</span>
            </div>
          </div>

          {/* Difficulty breakdown */}
          <div className="space-y-2 border-t border-slate-800 pt-3">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Solved Problems by Difficulty:</span>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-emerald-300">
                <span>Easy Problems</span>
                <span className="font-bold">{leetcodeStats.easy} Solved</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-amber-950/30 border border-amber-500/20 text-amber-300">
                <span>Medium Problems</span>
                <span className="font-bold">{leetcodeStats.medium} Solved</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-rose-950/30 border border-rose-500/20 text-rose-300">
                <span>Hard Problems</span>
                <span className="font-bold">{leetcodeStats.hard} Solved</span>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="space-y-1 pt-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Earned Badges:</span>
            <div className="flex flex-wrap gap-1.5">
              {leetcodeStats.badges.map((b, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" /> {b}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
