# Student Success Intelligence Platform 🎓🚀

A complete, AI-driven educational analytics and career progression platform that leverages Machine Learning algorithms, predictive analytics, and an interactive dashboard to maximize student potential and career readiness.

- **🌐 Live Demo (Vercel)**: [https://student-success-intelligence-platform-gig9tcory-taman11.vercel.app](https://student-success-intelligence-platform-gig9tcory-taman11.vercel.app)
- **🐙 GitHub Repository**: [https://github.com/Tamanpreet84/student-success-intelligence-platform](https://github.com/Tamanpreet84/student-success-intelligence-platform)

---

## 🌟 Key Features

1. **Academic CGPA Predictor & Simulator**:
   - Multi-variable Regression Model (`ml_engine/train_models.py`) trained on student dataset (R² Score: **0.9283**).
   - Real-time sliders for class attendance %, weekly self-study hours, previous GPA, assignment scores, and backlogs.
   - Granular factor impact breakdown (`+` / `-` CGPA score contribution).

2. **Placement Probability & Salary Estimator**:
   - Machine Learning Classification (ROC-AUC: **83.66%**) & Salary Regression Engine.
   - Evaluates campus recruitment readiness, tier eligibility (Tier 1 Product, Tier 2 Growth, Tier 3 Service), and expected starting salary package (`₹ LPA` & `$ USD` equivalent).

3. **Skill Gap Radar & Competency Analyzer**:
   - Overlays student technical skills against industry benchmark job roles (Full Stack Developer, Data Scientist / ML Engineer, Cloud & DevOps Engineer, Product Manager, Cybersecurity Analyst).
   - Interactive Recharts Radar & Bar charts with target skill gap highlights.

4. **Smart Internship Matcher**:
   - Algorithmic matching score calculated against live internship openings based on CGPA, project count, aptitude score, and skill requirements.

5. **Automated AI Study Plan Generator**:
   - Personalized 7-Day learning schedule targeting student's weekly study commitment with daily hour targets and interactive task checklists.

6. **Industry Certification Recommender**:
   - High-impact certification recommendations (AWS, TensorFlow/Coursera, Meta, Docker, GCP) tailored to plug specific student skill gaps.

7. **AI Career Counselor Chatbot**:
   - Profile-aware interactive counselor providing actionable academic advice, mock interview tips, and resume optimization guidelines.

---

## 🛠️ Tech Stack

- **Frontend & UI**: React 18, Vite, Tailwind CSS, Lucide Icons, Recharts Analytics.
- **Machine Learning Engine**: Python, Pandas, NumPy, Scikit-learn, XGBoost logic.
- **Deployment**: Vercel Cloud Platform.
- **Version Control**: Git & GitHub CLI (`gh`).

---

## 🚀 Quick Start & Local Setup

### 1. Install Node Dependencies
```bash
npm install
```

### 2. Run Python ML Model Pipeline
```bash
# Generate synthetic student dataset
py ml_engine/dataset_generator.py

# Train models & export weights
py ml_engine/train_models.py
```

### 3. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
