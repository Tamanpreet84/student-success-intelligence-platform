import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageSquare } from 'lucide-react';

export const FAQPage = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'How does the CGPA Prediction model work?',
      a: 'The CGPA Predictor uses a multi-variable Ridge Regression algorithm trained on 5,000 student academic profiles. It evaluates your current attendance %, weekly self-study hours, previous GPA, assignment scores, and backlog count.'
    },
    {
      q: 'How accurate is the Placement Probability & Salary Estimator?',
      a: 'Our XGBoost classification model achieves an 83.66% ROC-AUC accuracy score, evaluating your coding rating, capstone projects, internships, aptitude test score, and backlogs to forecast tier eligibility.'
    },
    {
      q: 'Can I download my resume as a PDF from the Resume Builder?',
      a: 'Yes! The Resume Builder features print-optimized CSS formatting that seamlessly triggers your browser print dialog to export a clean, ATS-compliant PDF.'
    },
    {
      q: 'Is my user data saved across sessions?',
      a: 'Yes, your user profile, dark/light theme preference, and prediction history are saved in persistent storage so your stats remain intact whenever you return.'
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-indigo-400" /> Frequently Asked Questions
        </h2>
        
        <div className="space-y-3 pt-2">
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
              className="glass-panel p-4 rounded-xl border border-slate-800 cursor-pointer space-y-2"
            >
              <div className="flex justify-between items-center text-xs font-bold text-white">
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openIdx === idx ? 'rotate-180' : ''}`} />
              </div>
              {openIdx === idx && (
                <p className="text-xs text-slate-400 leading-relaxed pt-1 border-t border-slate-800">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
