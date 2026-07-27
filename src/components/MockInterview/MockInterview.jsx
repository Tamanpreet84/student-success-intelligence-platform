import React, { useState } from 'react';
import { MessageSquareCode, Mic, Play, CheckCircle2, Award, Sparkles, RefreshCcw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const MockInterview = () => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const { addHistoryItem } = useAuth();
  const { addToast } = useToast();

  const questions = [
    {
      id: 1,
      category: 'System Design & React',
      question: 'How do you optimize state management and prevent unnecessary re-renders in a complex React dashboard application?',
      sampleKeywords: ['useMemo', 'useCallback', 'React.memo', 'Context API', 'Zustand', 'virtualization']
    },
    {
      id: 2,
      category: 'Data Structures & Algorithms',
      question: 'Explain the difference between BFS and DFS traversal in a graph. When would you prefer BFS over DFS?',
      sampleKeywords: ['queue', 'stack', 'shortest path', 'unweighted graph', 'recursion', 'memory']
    },
    {
      id: 3,
      category: 'Behavioral & STAR Method',
      question: 'Describe a situation where a technical project deadline was at risk. What steps did you take to deliver successfully?',
      sampleKeywords: ['prioritized', 'communicated', 'refactored', 'delivered', 'stakeholders', 'tradeoffs']
    }
  ];

  const currentQ = questions[currentQuestionIdx];

  const handleEvaluate = () => {
    if (!userAnswer.trim()) {
      addToast('Please enter your response before submitting for AI feedback', 'error');
      return;
    }

    setIsEvaluating(true);

    setTimeout(() => {
      const text = userAnswer.toLowerCase();
      let matchedCount = 0;
      currentQ.sampleKeywords.forEach(kw => {
        if (text.includes(kw.toLowerCase())) matchedCount++;
      });

      const score = Math.min(96, Math.max(55, Math.round((matchedCount / currentQ.sampleKeywords.length) * 100)));

      const evalFeedback = {
        score,
        starStructureScore: text.length > 200 ? 'Excellent Structure' : 'Needs More Quantitative Context',
        positives: [
          'Demonstrated clear technical vocabulary and domain terminology.',
          'Addressed core concept requirements effectively.'
        ],
        improvements: [
          'Quantify impact using STAR metrics (e.g., "Reduced response latency by 25%")',
          `Consider mentioning: ${currentQ.sampleKeywords.filter(k => !text.includes(k.toLowerCase())).join(', ') || 'production monitoring'}`
        ]
      };

      setFeedback(evalFeedback);
      setIsEvaluating(false);
      addToast(`Evaluation Complete! Technical Score: ${score}/100`, 'success');

      addHistoryItem({
        type: 'Mock Interview',
        score: `${score}%`,
        title: currentQ.category
      });
    }, 1000);
  };

  const handleNext = () => {
    setFeedback(null);
    setUserAnswer('');
    setCurrentQuestionIdx((prev) => (prev + 1) % questions.length);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Mic className="w-6 h-6 text-indigo-400" /> AI Interactive Mock Interview Simulator
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Simulates real-world technical and behavioral rounds with instant AI STAR feedback and keyword scoring.
          </p>
        </div>

        <button 
          onClick={handleNext}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 flex items-center gap-1.5"
        >
          <RefreshCcw className="w-3.5 h-3.5" /> Next Question
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Question & Answer Card */}
        <div className="glass-panel p-6 rounded-2xl lg:col-span-2 border border-slate-800 space-y-5">
          
          <div className="space-y-2 border-b border-slate-800 pb-4">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-indigo-400 uppercase tracking-wider bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                Question {currentQuestionIdx + 1} of {questions.length} • {currentQ.category}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white leading-snug">{currentQ.question}</h3>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Your Response (Text / Audio Simulation):</label>
            <textarea
              rows={8}
              placeholder="Type your response using the STAR method (Situation, Task, Action, Result)..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-sans leading-relaxed resize-none"
            />
          </div>

          <button
            onClick={handleEvaluate}
            disabled={isEvaluating}
            className="w-full py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center space-x-2"
          >
            {isEvaluating ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin text-amber-400" /> Evaluating Answer Quality...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Play className="w-4 h-4" /> Submit for AI STAR Assessment
              </span>
            )}
          </button>

        </div>

        {/* AI Feedback Panel */}
        <div className="space-y-6">
          {feedback ? (
            <div className="glass-panel p-6 rounded-2xl border-2 border-emerald-500/40 space-y-4 bg-gradient-to-b from-slate-900 to-emerald-950/30">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">AI Interview Feedback</span>
              <div className="text-5xl font-black text-white">{feedback.score} <span className="text-base text-slate-400 font-normal">/ 100</span></div>
              
              <div className="space-y-2 border-t border-slate-800 pt-3 text-xs">
                <span className="font-semibold text-slate-300 block">Positives:</span>
                {feedback.positives.map((p, idx) => (
                  <p key={idx} className="text-emerald-400 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 flex-shrink-0" /> {p}</p>
                ))}
              </div>

              <div className="space-y-2 border-t border-slate-800 pt-3 text-xs">
                <span className="font-semibold text-slate-300 block">Actionable Refinements:</span>
                {feedback.improvements.map((imp, idx) => (
                  <p key={idx} className="text-amber-300">• {imp}</p>
                ))}
              </div>
            </div>
          ) : (
            <div className="glass-panel p-8 rounded-2xl border border-slate-800 text-center space-y-3">
              <Award className="w-10 h-10 text-slate-600 mx-auto" />
              <h4 className="text-sm font-bold text-white">Awaiting Answer Submission</h4>
              <p className="text-xs text-slate-400">Answer the interview question and click submit to receive detailed STAR methodology feedback.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
