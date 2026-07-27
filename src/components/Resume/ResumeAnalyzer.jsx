import React, { useState } from 'react';
import { FileText, CheckCircle2, AlertTriangle, Search, Sparkles, UploadCloud, ArrowRight, Bookmark } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { JOB_ROLES } from '../../data/mockData';

export const ResumeAnalyzer = () => {
  const [resumeText, setResumeText] = useState('');
  const [targetRole, setTargetRole] = useState('fullstack');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const { addHistoryItem } = useAuth();
  const { addToast } = useToast();

  const sampleResumeData = `AMAN SHARMA
Email: aman.sharma@gmail.com | Phone: +91 9876543210 | GitHub: github.com/amansharma | LinkedIn: linkedin.com/in/amansharma

SUMMARY
Passionate Full Stack Software Engineer with 2+ years of hands-on experience building scalable web applications using React, Node.js, Express, Python, and SQL databases. Demonstrated expertise in REST API optimization, Docker containerization, and AWS cloud deployment.

SKILLS
• Languages: JavaScript, TypeScript, Python, SQL, HTML5, CSS3
• Frameworks/Tools: React.js, Node.js, Express.js, Tailwind CSS, Git, Docker, AWS (S3, EC2), Jest

EXPERIENCE
Software Engineering Intern | TechCorp Solutions (Jan 2025 – Present)
• Architected and deployed microservices backend using Node.js and PostgreSQL, reducing latency by 35%.
• Developed responsive frontend dashboard with React and Recharts, servicing over 10,000 active daily users.

PROJECTS
Smart AI Analytics Dashboard (React, Node, Scikit-learn)
• Built predictive machine learning pipeline using Python & Scikit-learn integrated into full-stack web UI.
`;

  const handleScan = () => {
    if (!resumeText.trim()) {
      addToast('Please paste your resume text or click Load Sample Resume', 'error');
      return;
    }

    setIsScanning(true);

    setTimeout(() => {
      const text = resumeText.toLowerCase();
      const role = JOB_ROLES[targetRole] || JOB_ROLES['fullstack'];
      const requiredKeywords = Object.keys(role.skills).map(s => s.split(' ')[0].toLowerCase());

      const found = [];
      const missing = [];

      requiredKeywords.forEach(kw => {
        if (text.includes(kw)) {
          found.push(kw);
        } else {
          missing.push(kw);
        }
      });

      const matchPct = Math.min(95, Math.max(40, Math.round((found.length / requiredKeywords.length) * 100)));
      const atsScore = Math.round((matchPct * 0.7) + (text.length > 500 ? 25 : 10));

      const result = {
        atsScore,
        matchPct,
        foundKeywords: found,
        missingKeywords: missing.length > 0 ? missing : ['GraphQL', 'Kubernetes', 'Redis Caching'],
        formattingScore: text.includes('summary') && text.includes('projects') ? 'High (Clear Sections)' : 'Medium',
        suggestions: [
          'Add quantitative metrics (e.g. "Increased speed by 30%")',
          'Include direct links to live working GitHub projects',
          `Add missing core keywords: ${missing.slice(0, 3).join(', ') || 'Docker, CI/CD'}`
        ]
      };

      setAnalysisResult(result);
      setIsScanning(false);
      addToast(`ATS Scan Complete! Score: ${atsScore}/100`, 'success');

      // Save item to profile history
      addHistoryItem({
        type: 'ATS Resume Scan',
        score: `${atsScore}%`,
        title: `${role.name} Resume Analysis`
      });
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-400" /> AI ATS Resume Scanner & Keyword Matcher
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Evaluates ATS (Applicant Tracking System) compatibility, keyword density, section formatting, and recruiter readiness.
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-xl p-1.5">
          <Search className="w-4 h-4 text-indigo-400 ml-2" />
          <span className="text-xs font-semibold text-slate-400">Target Role:</span>
          <select 
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="bg-slate-950 text-xs font-bold text-indigo-300 border-none rounded-lg focus:ring-1 focus:ring-indigo-500 py-1.5 px-3 cursor-pointer"
          >
            {Object.entries(JOB_ROLES).map(([k, r]) => (
              <option key={k} value={k}>{r.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Input Textarea */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Paste Resume Plain Text</span>
              <button 
                onClick={() => setResumeText(sampleResumeData)}
                className="text-[11px] font-semibold text-indigo-400 hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-amber-400" /> Load Sample Resume
              </button>
            </div>

            <textarea 
              rows={14}
              placeholder="Paste your full resume text here (Summary, Skills, Work Experience, Projects, Education)..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono leading-relaxed resize-none"
            />
          </div>

          <button
            onClick={handleScan}
            disabled={isScanning}
            className="w-full py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center space-x-2"
          >
            {isScanning ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin text-amber-400" /> Analyzing ATS Compatibility...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Search className="w-4 h-4" /> Run ATS Resume Scan
              </span>
            )}
          </button>
        </div>

        {/* Results Card */}
        <div className="space-y-6">
          {analysisResult ? (
            <div className="glass-panel p-6 rounded-2xl border-2 border-indigo-500/40 space-y-5 bg-gradient-to-b from-slate-900 to-indigo-950/30">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">ATS Score</span>
                  <div className="text-5xl font-black text-white tracking-tight mt-1">
                    {analysisResult.atsScore} <span className="text-xl font-normal text-slate-500">/ 100</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {analysisResult.matchPct}% Keyword Match
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1 block">Formatting: {analysisResult.formattingScore}</span>
                </div>
              </div>

              {/* Suggestions */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Critical Improvement Suggestions:</span>
                {analysisResult.suggestions.map((s, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                    <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>

              {/* Missing Keywords */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">Recommended High-Value Keywords to Add:</span>
                <div className="flex flex-wrap gap-1.5">
                  {analysisResult.missingKeywords.map((kw, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-500/10 border border-rose-500/20 text-rose-300">
                      + {kw}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="glass-panel p-12 rounded-2xl border border-slate-800 text-center space-y-3">
              <UploadCloud className="w-12 h-12 text-slate-600 mx-auto" />
              <h4 className="text-base font-bold text-white">No Scan Performed Yet</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Paste your resume content on the left and click **Run ATS Resume Scan** to get instant recruiter feedback and keyword analysis.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
