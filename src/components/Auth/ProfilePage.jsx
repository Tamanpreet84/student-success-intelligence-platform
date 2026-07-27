import React, { useState } from 'react';
import { User, Mail, GraduationCap, Award, ShieldCheck, Key, Camera, Check, History, Calendar, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { JOB_ROLES } from '../../data/mockData';

export const ProfilePage = ({ setActiveTab }) => {
  const { currentUser, updateProfile, savedHistory, logout } = useAuth();
  const { addToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [university, setUniversity] = useState(currentUser?.university || '');
  const [degree, setDegree] = useState(currentUser?.degree || '');
  const [targetRole, setTargetRole] = useState(currentUser?.targetRole || 'fullstack');
  
  // Password change state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  if (!currentUser) {
    return (
      <div className="glass-panel p-8 rounded-2xl text-center max-w-md mx-auto my-12 space-y-4">
        <User className="w-12 h-12 text-slate-500 mx-auto" />
        <h3 className="text-xl font-bold text-white">Not Signed In</h3>
        <p className="text-xs text-slate-400">Please sign in to access your student profile & saved prediction history.</p>
      </div>
    );
  }

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name,
      university,
      degree,
      targetRole
    });
    setIsEditing(false);
    addToast('Profile updated successfully!', 'success');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      addToast('Please fill out password fields', 'error');
      return;
    }
    setShowPasswordModal(false);
    setOldPassword('');
    setNewPassword('');
    addToast('Password changed successfully!', 'success');
  };

  const handleAvatarClick = () => {
    const urls = [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200'
    ];
    const nextUrl = urls[(urls.indexOf(currentUser.avatarUrl) + 1) % urls.length];
    updateProfile({ avatarUrl: nextUrl });
    addToast('Profile picture updated!', 'success');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
          
          {/* Avatar with Upload Hover */}
          <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
            <img 
              src={currentUser.avatarUrl} 
              alt={currentUser.name} 
              className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-500 shadow-xl"
            />
            <div className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* User Meta */}
          <div className="text-center sm:text-left flex-1">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <h2 className="text-2xl font-extrabold text-white">{currentUser.name}</h2>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-xs text-slate-400 mt-1">{currentUser.degree} • Class of {currentUser.graduationYear}</p>
            <p className="text-xs text-indigo-400 font-semibold mt-0.5">{currentUser.university}</p>
          </div>

          {/* Stats Badge */}
          <div className="flex items-center space-x-3 bg-slate-900/90 border border-slate-800 p-3 rounded-xl">
            <div className="text-center px-3 border-r border-slate-800">
              <span className="text-xs text-slate-400 block">Streak</span>
              <span className="text-base font-extrabold text-amber-400 flex items-center justify-center gap-1">
                🔥 {currentUser.streakDays} Days
              </span>
            </div>
            <div className="text-center px-3">
              <span className="text-xs text-slate-400 block">Target</span>
              <span className="text-xs font-bold text-indigo-300">
                {JOB_ROLES[currentUser.targetRole]?.name || 'Software Engineer'}
              </span>
            </div>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Info Form */}
        <div className="glass-panel p-6 rounded-2xl lg:col-span-2 border border-slate-800 space-y-5">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-400" /> Personal Account Details
            </h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400">Full Name</label>
                <input 
                  type="text" 
                  disabled={!isEditing}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white disabled:opacity-70 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400">Email Address</label>
                <input 
                  type="email" 
                  disabled
                  value={currentUser.email}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 cursor-not-allowed"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400">University / College</label>
                <input 
                  type="text" 
                  disabled={!isEditing}
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white disabled:opacity-70 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400">Target Career Goal</label>
                <select 
                  disabled={!isEditing}
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-indigo-300 font-semibold disabled:opacity-70 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                >
                  {Object.entries(JOB_ROLES).map(([k, r]) => (
                    <option key={k} value={k}>{r.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {isEditing && (
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" /> Save Profile Changes
              </button>
            )}
          </form>

          {/* Password & Security Actions */}
          <div className="border-t border-slate-800 pt-4 flex flex-wrap items-center justify-between gap-3">
            <button 
              onClick={() => setShowPasswordModal(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 hover:border-indigo-500/40 text-slate-300 flex items-center gap-2"
            >
              <Key className="w-4 h-4 text-indigo-400" /> Change Security Password
            </button>

            <button 
              onClick={logout}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-950/40 border border-rose-500/30 text-rose-300 hover:bg-rose-900/50"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Saved Prediction & ATS History Timeline */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <History className="w-5 h-5 text-indigo-400" /> Saved Analysis History
          </h3>

          <div className="space-y-3">
            {savedHistory.map((item) => (
              <div key={item.id} className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">{item.title}</span>
                  <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    {item.score}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-400">
                  <span>{item.type}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel max-w-sm w-full p-6 rounded-2xl border border-slate-800 space-y-4">
            <h4 className="text-lg font-bold text-white">Change Account Password</h4>
            <form onSubmit={handlePasswordChange} className="space-y-3">
              <input 
                type="password" 
                placeholder="Current Password" 
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
              <input 
                type="password" 
                placeholder="New Password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
              <div className="flex space-x-2 pt-2">
                <button type="submit" className="flex-1 py-2 rounded-xl text-xs font-bold bg-indigo-600 text-white">Update</button>
                <button type="button" onClick={() => setShowPasswordModal(false)} className="flex-1 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-slate-400">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
