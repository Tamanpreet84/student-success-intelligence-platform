export const JOB_ROLES = {
  "fullstack": {
    name: "Full Stack Developer",
    category: "Software Engineering",
    avgSalary: "8.5 - 18 LPA",
    skills: {
      "Frontend (React/HTML/CSS)": 85,
      "Backend (Node/Python/Java)": 80,
      "Databases (SQL/NoSQL)": 75,
      "Git & Version Control": 90,
      "Data Structures & Algo": 75,
      "System Design & APIs": 70
    }
  },
  "datascientist": {
    name: "Data Scientist / ML Engineer",
    category: "AI & Analytics",
    avgSalary: "10.0 - 24 LPA",
    skills: {
      "Python & Data Libraries": 90,
      "Machine Learning (Scikit/XGB)": 85,
      "Deep Learning (PyTorch/TF)": 75,
      "SQL & Data Pipelines": 80,
      "Statistics & Math": 85,
      "Model Deployment & MLOps": 65
    }
  },
  "devops": {
    name: "Cloud & DevOps Engineer",
    category: "Infrastructure",
    avgSalary: "9.0 - 20 LPA",
    skills: {
      "Docker & Kubernetes": 85,
      "CI/CD Pipelines (GitHub Actions)": 80,
      "Cloud Providers (AWS/GCP/Azure)": 85,
      "Linux & Bash Scripting": 90,
      "Networking & Security": 75,
      "Infrastructure as Code (Terraform)": 70
    }
  },
  "product": {
    name: "Associate Product Manager",
    category: "Product Management",
    avgSalary: "9.5 - 22 LPA",
    skills: {
      "Product Analytics (Mixpanel/SQL)": 80,
      "Wireframing & UI/UX": 75,
      "Agile & Scrum": 85,
      "Market Research & Strategy": 80,
      "Communication & Leadership": 95,
      "Technical Understanding": 65
    }
  },
  "cybersecurity": {
    name: "Cybersecurity Analyst",
    category: "Security",
    avgSalary: "8.0 - 16 LPA",
    skills: {
      "Network Security & Protocols": 90,
      "Ethical Hacking & Penetration": 80,
      "SIEM & Incident Response": 75,
      "Cryptography": 70,
      "Linux & Scripting": 85,
      "Security Governance": 70
    }
  }
};

export const SAMPLE_INTERNSHIPS = [
  {
    id: "int_01",
    title: "AI / ML Engineering Intern",
    company: "NeuralTech Labs",
    location: "Remote / Bengaluru",
    type: "Full-Time Intern",
    stipend: "₹35,000 / month",
    duration: "6 Months",
    minCgpa: 7.5,
    requiredSkills: ["Python & Data Libraries", "Machine Learning (Scikit/XGB)", "SQL & Data Pipelines"],
    description: "Work on computer vision models and Predictive Analytics pipelines using PyTorch and FastAPI.",
    applyUrl: "#"
  },
  {
    id: "int_02",
    title: "Full Stack React Developer Intern",
    company: "CloudScale Systems",
    location: "Hyderabad / Hybrid",
    type: "Part-Time / Full-Time",
    stipend: "₹30,000 / month",
    duration: "3 - 6 Months",
    minCgpa: 7.0,
    requiredSkills: ["Frontend (React/HTML/CSS)", "Backend (Node/Python/Java)", "Git & Version Control"],
    description: "Build sleek dashboard interfaces and microservices for SaaS analytics applications.",
    applyUrl: "#"
  },
  {
    id: "int_03",
    title: "Cloud Infrastructure & DevOps Intern",
    company: "Apex Cloud Innovations",
    location: "Remote",
    type: "Full-Time Intern",
    stipend: "₹40,000 / month",
    duration: "6 Months",
    minCgpa: 8.0,
    requiredSkills: ["Docker & Kubernetes", "Cloud Providers (AWS/GCP/Azure)", "Linux & Bash Scripting"],
    description: "Assist in automating CI/CD pipelines, Terraform deployments, and Kubernetes cluster monitoring.",
    applyUrl: "#"
  },
  {
    id: "int_04",
    title: "Data Analyst & Business Intelligence Intern",
    company: "Quantum Insights",
    location: "Gurugram / Hybrid",
    type: "3 Months Intern",
    stipend: "₹25,000 / month",
    duration: "3 Months",
    minCgpa: 6.5,
    requiredSkills: ["SQL & Data Pipelines", "Statistics & Math", "Python & Data Libraries"],
    description: "Analyze user churn patterns, build interactive Power BI / Recharts dashboards, and formulate SQL queries.",
    applyUrl: "#"
  }
];

export const CERTIFICATIONS = [
  {
    id: "cert_01",
    name: "AWS Certified Cloud Practitioner",
    provider: "Amazon Web Services",
    level: "Foundational",
    roleMatch: ["devops", "fullstack", "datascientist"],
    estCost: "$100",
    skillsLearned: ["Cloud Providers (AWS/GCP/Azure)", "Networking & Security"],
    badgeColor: "from-amber-500 to-orange-600"
  },
  {
    id: "cert_02",
    name: "TensorFlow Developer Certificate / ML Specialization",
    provider: "DeepLearning.AI / Google",
    level: "Intermediate",
    roleMatch: ["datascientist"],
    estCost: "Free via Coursera Financial Aid",
    skillsLearned: ["Machine Learning (Scikit/XGB)", "Deep Learning (PyTorch/TF)"],
    badgeColor: "from-blue-500 to-indigo-600"
  },
  {
    id: "cert_03",
    name: "Meta Front-End Developer Professional",
    provider: "Meta",
    level: "Intermediate",
    roleMatch: ["fullstack"],
    estCost: "Free Trial / Coursera",
    skillsLearned: ["Frontend (React/HTML/CSS)", "Git & Version Control"],
    badgeColor: "from-cyan-500 to-blue-600"
  },
  {
    id: "cert_04",
    name: "Docker Certified Associate (DCA)",
    provider: "Mirantis / Docker",
    level: "Advanced",
    roleMatch: ["devops", "fullstack"],
    estCost: "$195",
    skillsLearned: ["Docker & Kubernetes", "CI/CD Pipelines (GitHub Actions)"],
    badgeColor: "from-teal-500 to-emerald-600"
  },
  {
    id: "cert_05",
    name: "Google Professional Data Engineer",
    provider: "Google Cloud",
    level: "Advanced",
    roleMatch: ["datascientist", "devops"],
    estCost: "$200",
    skillsLearned: ["SQL & Data Pipelines", "Model Deployment & MLOps"],
    badgeColor: "from-purple-500 to-pink-600"
  }
];

export const DEMO_PRESETS = {
  high_achiever: {
    name: "Aarav Sharma (High Achiever)",
    attendance_pct: 92.5,
    study_hours_weekly: 24.0,
    previous_gpa: 8.95,
    assignment_score: 94.0,
    project_count: 4,
    internship_count: 2,
    aptitude_score: 91.0,
    coding_rating: 1780,
    soft_skills_score: 88.0,
    backlogs: 0,
    targetRole: "datascientist",
    skills: {
      "Python & Data Libraries": 88,
      "Machine Learning (Scikit/XGB)": 82,
      "Deep Learning (PyTorch/TF)": 70,
      "SQL & Data Pipelines": 85,
      "Statistics & Math": 90,
      "Model Deployment & MLOps": 60
    }
  },
  balanced: {
    name: "Priya Patel (Full-Stack Enthusiast)",
    attendance_pct: 84.0,
    study_hours_weekly: 16.5,
    previous_gpa: 7.85,
    assignment_score: 82.0,
    project_count: 3,
    internship_count: 1,
    aptitude_score: 78.0,
    coding_rating: 1520,
    soft_skills_score: 84.0,
    backlogs: 0,
    targetRole: "fullstack",
    skills: {
      "Frontend (React/HTML/CSS)": 85,
      "Backend (Node/Python/Java)": 78,
      "Databases (SQL/NoSQL)": 72,
      "Git & Version Control": 88,
      "Data Structures & Algo": 70,
      "System Design & APIs": 62
    }
  },
  improver: {
    name: "Rohan Verma (Needs Focus)",
    attendance_pct: 68.5,
    study_hours_weekly: 8.0,
    previous_gpa: 6.40,
    assignment_score: 65.0,
    project_count: 1,
    internship_count: 0,
    aptitude_score: 58.0,
    coding_rating: 1100,
    soft_skills_score: 70.0,
    backlogs: 1,
    targetRole: "devops",
    skills: {
      "Docker & Kubernetes": 45,
      "CI/CD Pipelines (GitHub Actions)": 40,
      "Cloud Providers (AWS/GCP/Azure)": 35,
      "Linux & Bash Scripting": 60,
      "Networking & Security": 50,
      "Infrastructure as Code (Terraform)": 30
    }
  }
};
