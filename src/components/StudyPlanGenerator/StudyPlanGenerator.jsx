import React, { useState } from 'react';
import { Calendar, Clock, CheckSquare, Square, Sparkles, BookOpen, Layers } from 'lucide-react';
import { generateStudyPlan } from '../../utils/mlEngine';

export const StudyPlanGenerator = ({ student }) => {
  const planData = generateStudyPlan(student, student.targetRole || 'fullstack');
  const [completedTasks, setCompletedTasks] = useState({});

  const toggleTask = (day, taskIdx) => {
    const key = `${day}_${taskIdx}`;
    setCompletedTasks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-purple-400" /> Automated AI Study Plan Generator
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Personalized weekly learning allocation tailored for your target role: <span className="text-purple-300 font-semibold">{planData.primaryFocus}</span>.
          </p>
        </div>

        <div className="flex items-center space-x-3 bg-purple-950/60 border border-purple-500/30 px-4 py-2 rounded-xl">
          <Clock className="w-5 h-5 text-purple-400" />
          <div>
            <span className="text-[10px] text-purple-300 uppercase tracking-wider block">Target Study Commitment</span>
            <span className="text-sm font-extrabold text-white">{planData.weeklyHours} hrs / week ({planData.dailyAverage} hrs/day)</span>
          </div>
        </div>
      </div>

      {/* 7-Day Schedule Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {planData.schedule.map((item, idx) => (
          <div key={idx} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="font-extrabold text-white text-base">{item.day}</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {item.tag}
                </span>
              </div>

              <div className="mt-3 space-y-1">
                <span className="text-xs font-bold text-indigo-400">{item.focus}</span>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" /> Duration: <span className="text-slate-200 font-semibold">{item.duration}</span>
                </p>
              </div>

              <div className="mt-4 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Day Action Items:</span>
                {item.tasks.map((task, tIdx) => {
                  const isDone = !!completedTasks[`${item.day}_${tIdx}`];
                  return (
                    <div 
                      key={tIdx}
                      onClick={() => toggleTask(item.day, tIdx)}
                      className={`flex items-start space-x-2 text-xs p-2 rounded-lg cursor-pointer transition-all ${
                        isDone ? 'bg-emerald-950/30 text-slate-500 line-through' : 'bg-slate-900/60 text-slate-200 hover:bg-slate-900'
                      }`}
                    >
                      {isDone ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                      )}
                      <span>{task}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Status: {item.tasks.every((_, tIdx) => completedTasks[`${item.day}_${tIdx}`]) ? 'Completed ✓' : 'In Progress'}</span>
              <span className="text-purple-400 font-semibold">Priority Module</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
