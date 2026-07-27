import React, { useState } from 'react';
import { Target, CheckCircle2, Circle, ArrowRight, BookOpen, ExternalLink, Sparkles } from 'lucide-react';
import { JOB_ROLES } from '../../data/mockData';

export const CareerRoadmap = () => {
  const [selectedRole, setSelectedRole] = useState('fullstack');

  const roadmaps = {
    fullstack: [
      { step: 1, title: 'Phase 1: Web Fundamentals & Version Control', duration: 'Weeks 1-4', topics: ['HTML5 & Semantic Markup', 'CSS3 Flexbox, Grid, Tailwind CSS', 'Modern JavaScript (ES6+, Async/Await)', 'Git branching & GitHub workflows'], completed: true },
      { step: 2, title: 'Phase 2: Frontend Frameworks & State Management', duration: 'Weeks 5-8', topics: ['React Components & Hooks (useState, useEffect)', 'Context API & Redux/Zustand', 'RESTful API integration & Axios', 'Vite & Webpack building'], completed: true },
      { step: 3, title: 'Phase 3: Backend & Database Architecture', duration: 'Weeks 9-12', topics: ['Node.js & Express REST APIs', 'SQL (PostgreSQL / MySQL) & ORMs (Prisma)', 'NoSQL (MongoDB) & Caching (Redis)', 'JWT Authentication & Security'], completed: false },
      { step: 4, title: 'Phase 4: Cloud, DevOps & Production Deployment', duration: 'Weeks 13-16', topics: ['Docker Containerization', 'CI/CD with GitHub Actions', 'AWS / Vercel deployment', 'System Architecture & Rate Limiting'], completed: false }
    ],
    datascientist: [
      { step: 1, title: 'Phase 1: Python, Math & Data Manipulation', duration: 'Weeks 1-4', topics: ['Python 3 Data Structures', 'NumPy & Pandas DataFrames', 'Linear Algebra & Probability', 'Data Visualization (Matplotlib, Seaborn)'], completed: true },
      { step: 2, title: 'Phase 2: Classical Machine Learning', duration: 'Weeks 5-8', topics: ['Supervised Learning (Regression, Classification)', 'Scikit-Learn & Feature Engineering', 'Tree Models (Random Forest, XGBoost)', 'Hyperparameter Tuning & Cross-Validation'], completed: true },
      { step: 3, title: 'Phase 3: Deep Learning & NLP', duration: 'Weeks 9-12', topics: ['PyTorch / TensorFlow Fundamentals', 'Convolutional Neural Networks (CNNs)', 'Transformers & LLM Prompting', 'Model Evaluation & Loss Functions'], completed: false },
      { step: 4, title: 'Phase 4: MLOps & Production Pipelines', duration: 'Weeks 13-16', topics: ['FastAPI Model Endpoints', 'MLflow & Pipeline Tracking', 'Docker & Model Containerization', 'Cloud Deployment (GCP / AWS)'], completed: false }
    ]
  };

  const currentSteps = roadmaps[selectedRole] || roadmaps['fullstack'];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-purple-400" /> Interactive Career Roadmap Generator
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Step-by-step milestone learning path curated for top-tier industry roles.
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-xl p-1.5">
          <select 
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="bg-slate-950 text-xs font-bold text-purple-300 border-none rounded-lg focus:ring-1 focus:ring-purple-500 py-1.5 px-3 cursor-pointer"
          >
            {Object.entries(JOB_ROLES).map(([k, r]) => (
              <option key={k} value={k}>{r.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Roadmap Timeline */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {currentSteps.map((phase) => (
          <div key={phase.step} className="glass-panel p-6 rounded-2xl border border-slate-800 glass-panel-hover flex items-start space-x-4">
            
            <div className={`p-3 rounded-2xl flex-shrink-0 font-extrabold text-sm ${
              phase.completed 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
            }`}>
              {phase.completed ? <CheckCircle2 className="w-6 h-6" /> : `0${phase.step}`}
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-extrabold text-white text-base">{phase.title}</h3>
                <span className="text-xs font-semibold text-slate-400">{phase.duration}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                {phase.topics.map((top, tIdx) => (
                  <div key={tIdx} className="flex items-center space-x-2 text-xs text-slate-300 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                    <span>{top}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
