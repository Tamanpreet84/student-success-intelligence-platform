# Student Success Intelligence Platform 🎓🚀

A complete, startup-ready AI Educational Analytics & Career Progression Platform that combines Machine Learning (CGPA Predictor, Placement Classifier, Salary Estimator), NLP-assisted ATS Resume Scanning, AI Mock Interviews, GitHub/LeetCode Trackers, Company Eligibility Checkers, and Interactive Skill Gap Radars.

- **🌐 Live Vercel App**: [https://student-success-intelligence-platfo.vercel.app](https://student-success-intelligence-platfo.vercel.app)
- **🐙 GitHub Repository**: [https://github.com/Tamanpreet84/student-success-intelligence-platform](https://github.com/Tamanpreet84/student-success-intelligence-platform)

---

## 🌟 Comprehensive Startup Feature Suite

### 1. 🔐 Authentication & User Profile System
- **Auth Flow**: Login, Sign Up, Forgot Password recovery modal, and Google OAuth simulation.
- **User Profile Page**: Personal details editor, avatar photo update simulation, security password change, and persistent prediction/scan history.

### 2. 📊 Machine Learning Core Engine (`ml_engine/`)
- **CGPA Predictor & Simulator**: Multi-variable Ridge Regression model (**R² Score = 0.9283**) with real-time sliders for attendance %, study hours, GPA, assignments, and backlog penalties.
- **Placement Probability Model**: XGBoost & Logistic Classifier (**ROC-AUC = 83.66%**) forecasting campus recruitment readiness.
- **Salary Estimator**: Gradient Boosting Regressor predicting entry-level packages (`₹ LPA` & `$ USD` equivalent).

### 3. 📄 AI ATS Resume Analyzer & Live Resume Builder
- **ATS Resume Scanner**: Evaluates ATS compatibility score (0-100%), keyword density against target role, formatting breakdown, and missing keywords.
- **Live Resume Builder**: Form fields with live A4 preview and print-optimized CSS for instant PDF export.

### 4. 🎯 Career Tools & Practice Modules
- **AI Mock Interview Simulator**: Question bank with instant STAR methodology scoring and actionable technical feedback.
- **Company Eligibility Checker**: Evaluates eligibility for Google, Amazon, Microsoft, TCS, Infosys, Zomato, Razorpay against student CGPA, backlogs, and aptitude.
- **Skill Gap Radar & Matrix**: Overlays student technical skills against industry standards for Full Stack, Data Science, DevOps, APM, and Cybersecurity.
- **Career Roadmap Generator**: Phase-by-phase tech milestone learning paths with duration and core topic checklists.
- **GitHub & LeetCode Tracker**: Evaluates open-source contribution activity, language distribution pie chart, and LeetCode problem difficulty stats.

### 5. 🎨 UI/UX & Responsive Experience
- **Dark / Light Theme System**: Built-in toggle with `localStorage` persistence.
- **Global Toast Notifications**: Floating toast system for instant user feedback (`success`, `error`, `info`, `warning`).
- **Mobile Drawer Menu**: 100% responsive navigation across mobile, tablet, and desktop viewports.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Recharts.
- **Machine Learning**: Python, Pandas, NumPy, Scikit-learn, XGBoost logic.
- **Hosting & CI/CD**: Vercel Cloud Platform connected to GitHub `main` branch.
