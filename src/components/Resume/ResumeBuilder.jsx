import React, { useState } from 'react';
import { Download, Printer, Plus, Trash2, Sparkles, Check, FileText } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const ResumeBuilder = () => {
  const { addToast } = useToast();
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'Aarav Sharma',
    email: 'aarav.sharma@gmail.com',
    phone: '+91 98765 43210',
    location: 'Bengaluru, India',
    github: 'github.com/aaravsharma',
    linkedin: 'linkedin.com/in/aaravsharma',
    summary: 'Driven Software Engineer with a strong foundation in Full-Stack Web Development, Data Structures, and Predictive Analytics. Experienced in building responsive React applications and REST APIs.'
  });

  const [experience, setExperience] = useState([
    {
      id: 1,
      role: 'Full Stack Development Intern',
      company: 'NeuralTech Labs',
      duration: 'Jan 2026 – Present',
      details: 'Built automated AI analytics dashboard servicing over 5,000 active users. Optimized database queries reducing load time by 30%.'
    }
  ]);

  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Student Success Intelligence Platform',
      tech: 'React, Vite, Python, Scikit-learn, XGBoost',
      details: 'Developed a full-stack predictive web app for CGPA forecast, placement probability, and ATS resume scanning.'
    }
  ]);

  const [skills, setSkills] = useState('React.js, Node.js, Python, JavaScript, SQL, Git, Docker, Machine Learning, Tailwind CSS');

  const handlePrint = () => {
    addToast('Opening print dialog for PDF export...', 'info');
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 print:hidden">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-purple-400" /> Professional Live Resume Builder
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Build ATS-friendly clean resumes with real-time preview and instant PDF export.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/25 transition-all flex items-center gap-2"
        >
          <Printer className="w-4 h-4" /> Export as PDF / Print
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Editor Form Column */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-5 print:hidden max-h-[750px] overflow-y-auto pr-2">
          
          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">1. Personal Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <input 
              type="text" placeholder="Full Name" value={personalInfo.fullName}
              onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
              className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
            />
            <input 
              type="email" placeholder="Email" value={personalInfo.email}
              onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
              className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
            />
            <input 
              type="text" placeholder="Phone" value={personalInfo.phone}
              onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
              className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
            />
            <input 
              type="text" placeholder="Location" value={personalInfo.location}
              onChange={(e) => setPersonalInfo({ ...personalInfo, location: e.target.value })}
              className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
            />
          </div>

          <textarea
            rows={3} placeholder="Professional Summary..." value={personalInfo.summary}
            onChange={(e) => setPersonalInfo({ ...personalInfo, summary: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white resize-none"
          />

          <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2 pt-2">2. Skills</h3>
          <input 
            type="text" placeholder="Comma separated skills..." value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
          />

        </div>

        {/* Live A4 Print Preview Column */}
        <div className="bg-white text-slate-900 p-8 rounded-xl shadow-2xl space-y-4 text-xs font-sans border border-slate-200 min-h-[750px]">
          
          {/* Header */}
          <div className="border-b-2 border-indigo-600 pb-3 text-center">
            <h1 className="text-2xl font-black uppercase text-indigo-950 tracking-tight">{personalInfo.fullName || 'YOUR NAME'}</h1>
            <p className="text-[11px] text-slate-600 mt-1">
              {personalInfo.email} • {personalInfo.phone} • {personalInfo.location}
            </p>
            <p className="text-[10px] text-indigo-700 font-semibold mt-0.5">
              {personalInfo.github} • {personalInfo.linkedin}
            </p>
          </div>

          {/* Summary */}
          {personalInfo.summary && (
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 border-b border-slate-200 pb-0.5 mb-1">
                Professional Summary
              </h2>
              <p className="text-[11px] text-slate-700 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Skills */}
          {skills && (
            <div>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 border-b border-slate-200 pb-0.5 mb-1">
                Technical Skills
              </h2>
              <p className="text-[11px] text-slate-800 font-medium">{skills}</p>
            </div>
          )}

          {/* Work Experience */}
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 border-b border-slate-200 pb-0.5 mb-2">
              Work Experience
            </h2>
            {experience.map(exp => (
              <div key={exp.id} className="mb-2">
                <div className="flex justify-between font-bold text-[11px]">
                  <span>{exp.role} — {exp.company}</span>
                  <span className="text-slate-500">{exp.duration}</span>
                </div>
                <p className="text-[10px] text-slate-700 mt-0.5">{exp.details}</p>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-indigo-900 border-b border-slate-200 pb-0.5 mb-2">
              Projects
            </h2>
            {projects.map(proj => (
              <div key={proj.id} className="mb-2">
                <div className="flex justify-between font-bold text-[11px]">
                  <span>{proj.name}</span>
                  <span className="text-indigo-800 text-[10px]">{proj.tech}</span>
                </div>
                <p className="text-[10px] text-slate-700 mt-0.5">{proj.details}</p>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
};
