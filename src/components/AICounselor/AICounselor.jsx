import React, { useState, useRef, useEffect } from 'react';
import { MessageSquareCode, Send, Bot, User, Sparkles, RefreshCw, Trash2, HelpCircle } from 'lucide-react';
import { getCounselorResponse } from '../../utils/mlEngine';

export const AICounselor = ({ student }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: getCounselorResponse('hello', student)
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text: query }];
    setMessages(newMessages);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    // Simulate AI thinking and response calculation
    setTimeout(() => {
      const botAnswer = getCounselorResponse(query, student);
      setMessages([...newMessages, { sender: 'bot', text: botAnswer }]);
      setIsTyping(false);
    }, 600);
  };

  const samplePrompts = [
    'How can I boost my CGPA by +0.5 points?',
    'What placement tier do I qualify for right now?',
    'What starting salary can I expect?',
    'Give me top 3 resume optimization tips for my target role'
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageSquareCode className="w-6 h-6 text-indigo-400" /> AI Career Counselor & Mentor
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time profile-aware chatbot providing academic advice, placement strategies, and skill gap guidance.
          </p>
        </div>

        <button 
          onClick={() => setMessages([{ sender: 'bot', text: getCounselorResponse('hello', student) }])}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 flex items-center gap-1.5"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear History
        </button>
      </div>

      {/* Main Chat Interface */}
      <div className="glass-panel rounded-2xl border border-slate-800 flex flex-col h-[560px] overflow-hidden">
        
        {/* Messages Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`p-2.5 rounded-xl flex-shrink-0 ${
                msg.sender === 'user' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`p-4 rounded-2xl text-xs leading-relaxed max-w-xl whitespace-pre-line ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 text-xs text-slate-400 pl-10">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-indigo-400" />
              <span>AI Counselor is evaluating your profile...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompt Chips */}
        <div className="px-6 py-2 border-t border-slate-800/80 bg-slate-950/60 overflow-x-auto no-scrollbar flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex-shrink-0">Prompts:</span>
          {samplePrompts.map((prompt, pIdx) => (
            <button
              key={pIdx}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1 rounded-full text-[11px] font-semibold bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-indigo-300 whitespace-nowrap transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/90 flex items-center gap-3">
          <input 
            type="text"
            placeholder="Ask AI Counselor about CGPA, Placement, Resume, or Salary..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputQuery.trim()}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-bold text-xs transition-all shadow-md shadow-indigo-500/20 flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" /> Send
          </button>
        </div>

      </div>

    </div>
  );
};
