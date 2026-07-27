import modelWeights from '../data/trained_models.json';
import { JOB_ROLES, SAMPLE_INTERNSHIPS, CERTIFICATIONS } from '../data/mockData';

/**
 * High-Precision Client-Side Inference Engine using Trained Python ML Weights
 */

export const predictCGPA = (student) => {
  const w = modelWeights.cgpa_weights;
  
  const basePrediction = (
    w.intercept +
    w.attendance_pct * (student.attendance_pct || 75) +
    w.study_hours_weekly * (student.study_hours_weekly || 15) +
    w.previous_gpa * (student.previous_gpa || 7.5) +
    w.assignment_score * (student.assignment_score || 80) +
    w.backlogs * (student.backlogs || 0)
  );
  
  // Constrain between 4.0 and 10.0
  const finalCgpa = Math.min(10.0, Math.max(4.0, Math.round(basePrediction * 100) / 100));
  
  // Calculate impact breakdown
  const factors = [
    { name: 'Previous GPA', impact: Math.round((w.previous_gpa * (student.previous_gpa || 7.5)) * 10) / 10, positive: true },
    { name: 'Weekly Study Hours', impact: Math.round((w.study_hours_weekly * (student.study_hours_weekly || 15)) * 10) / 10, positive: true },
    { name: 'Class Attendance', impact: Math.round((w.attendance_pct * (student.attendance_pct || 75)) * 10) / 10, positive: true },
    { name: 'Assignments', impact: Math.round((w.assignment_score * (student.assignment_score || 80)) * 10) / 10, positive: true },
    { name: 'Backlogs Penalty', impact: Math.abs(Math.round((w.backlogs * (student.backlogs || 0)) * 10) / 10), positive: false }
  ];

  return {
    cgpa: finalCgpa,
    diffFromPrevious: Math.round((finalCgpa - (student.previous_gpa || 7.5)) * 100) / 100,
    factors
  };
};

export const predictPlacement = (student, cgpaVal) => {
  const w = modelWeights.placement_weights;
  const actualCgpa = cgpaVal || predictCGPA(student).cgpa;
  
  const logit = (
    w.intercept +
    w.predicted_cgpa * actualCgpa +
    w.project_count * (student.project_count || 0) +
    w.internship_count * (student.internship_count || 0) +
    w.aptitude_score * (student.aptitude_score || 60) +
    w.coding_rating * (student.coding_rating || 1200) +
    w.soft_skills_score * (student.soft_skills_score || 70) +
    w.backlogs * (student.backlogs || 0)
  );

  // Sigmoid transfer
  const prob = 1.0 / (1.0 + Math.exp(-Math.max(-15, Math.min(15, logit))));
  const probabilityPct = Math.min(99, Math.max(5, Math.round(prob * 100)));

  let status = 'Moderate';
  let badgeColor = 'amber';
  if (probabilityPct >= 75) {
    status = 'High Placement Chance';
    badgeColor = 'emerald';
  } else if (probabilityPct < 45) {
    status = 'Action Required';
    badgeColor = 'rose';
  }

  return {
    probabilityPct,
    status,
    badgeColor,
    tierEligibility: probabilityPct >= 80 ? 'Tier 1 (Product / MNC)' : probabilityPct >= 50 ? 'Tier 2 (Growth Startup)' : 'Tier 3 (Service / Training)'
  };
};

export const estimateSalary = (student, cgpaVal) => {
  const w = modelWeights.salary_weights;
  const actualCgpa = cgpaVal || predictCGPA(student).cgpa;

  const baseSalary = (
    w.intercept +
    w.predicted_cgpa * actualCgpa +
    w.project_count * (student.project_count || 0) +
    w.internship_count * (student.internship_count || 0) +
    w.coding_rating * (student.coding_rating || 1200) +
    w.aptitude_score * (student.aptitude_score || 60)
  );

  const minLpa = Math.max(3.6, Math.round((baseSalary * 0.85) * 10) / 10);
  const maxLpa = Math.max(minLpa + 2.5, Math.round((baseSalary * 1.25) * 10) / 10);
  const avgLpa = Math.round(((minLpa + maxLpa) / 2) * 10) / 10;

  return {
    range: `₹${minLpa} - ₹${maxLpa} LPA`,
    avgLpa,
    minLpa,
    maxLpa,
    usdEquivalent: `$${Math.round(minLpa * 1.2)}k - $${Math.round(maxLpa * 1.2)}k / yr`
  };
};

export const calculateSkillGap = (studentSkills = {}, targetRoleKey = 'fullstack') => {
  const role = JOB_ROLES[targetRoleKey] || JOB_ROLES['fullstack'];
  const roleSkills = role.skills;
  
  const gapAnalysis = [];
  let totalScore = 0;
  let totalBenchmark = 0;

  Object.entries(roleSkills).forEach(([skillName, reqLevel]) => {
    const studentLevel = studentSkills[skillName] !== undefined ? studentSkills[skillName] : Math.floor(reqLevel * 0.7);
    const gap = reqLevel - studentLevel;
    totalScore += Math.min(reqLevel, studentLevel);
    totalBenchmark += reqLevel;

    gapAnalysis.push({
      skill: skillName,
      studentLevel,
      requiredLevel: reqLevel,
      gap: gap > 0 ? gap : 0,
      status: gap <= 0 ? 'Proficient' : gap <= 20 ? 'Minor Gap' : 'Critical Gap'
    });
  });

  const overallMatchPct = Math.min(100, Math.round((totalScore / totalBenchmark) * 100));
  const criticalGaps = gapAnalysis.filter(g => g.gap > 15).map(g => g.skill);

  return {
    targetRoleName: role.name,
    targetCategory: role.category,
    overallMatchPct,
    gapAnalysis,
    criticalGaps,
    suggestedFocus: criticalGaps.length > 0 ? criticalGaps[0] : 'Advanced System Architecture'
  };
};

export const matchInternships = (student, targetRoleKey = 'fullstack') => {
  const studentCgpa = predictCGPA(student).cgpa;
  
  return SAMPLE_INTERNSHIPS.map(internship => {
    let score = 50;
    
    // CGPA criteria
    if (studentCgpa >= internship.minCgpa) {
      score += 25;
    } else {
      score -= (internship.minCgpa - studentCgpa) * 15;
    }

    // Projects bonus
    score += Math.min(15, (student.project_count || 0) * 5);
    
    // Aptitude bonus
    score += Math.min(10, ((student.aptitude_score || 60) / 100) * 10);
    
    const matchPct = Math.min(98, Math.max(35, Math.round(score)));
    
    return {
      ...internship,
      matchPct,
      isEligible: studentCgpa >= internship.minCgpa
    };
  }).sort((a, b) => b.matchPct - a.matchPct);
};

export const generateStudyPlan = (student, targetRoleKey = 'fullstack') => {
  const gapInfo = calculateSkillGap(student.skills, targetRoleKey);
  const studyHours = student.study_hours_weekly || 15;
  const dailyTarget = Math.round((studyHours / 7) * 10) / 10;
  
  const schedule = [
    { day: 'Monday', focus: gapInfo.suggestedFocus || 'Data Structures & Algorithms', duration: `${dailyTarget} hrs`, tasks: ['Solve 2 LeetCode Medium Problems', 'Review Time Complexity Analysis'], tag: 'Core CS' },
    { day: 'Tuesday', focus: 'Target Role Project Build', duration: `${dailyTarget} hrs`, tasks: ['Build REST API endpoint / UI component', 'Commit code to GitHub repository'], tag: 'Development' },
    { day: 'Wednesday', focus: 'Aptitude & Logical Reasoning', duration: `${dailyTarget} hrs`, tasks: ['Quantitative Aptitude practice (20 questions)', 'Speed Math techniques'], tag: 'Placement Prep' },
    { day: 'Thursday', focus: gapInfo.criticalGaps[1] || 'System Architecture / SQL', duration: `${dailyTarget} hrs`, tasks: ['Database query optimization', 'Read System Design case study'], tag: 'Skill Gap' },
    { day: 'Friday', focus: 'Soft Skills & Behavioral Prep', duration: `${dailyTarget} hrs`, tasks: ['Practice STAR method answers', 'Mock interview recording'], tag: 'Interview Prep' },
    { day: 'Saturday', focus: 'Hackathon / Project Sprint', duration: `${Math.round(dailyTarget * 1.5 * 10) / 10} hrs`, tasks: ['Implement advanced feature', 'Add unit tests and README documentation'], tag: 'Hands-on' },
    { day: 'Sunday', focus: 'Weekly Review & Revision', duration: `${Math.round(dailyTarget * 0.8 * 10) / 10} hrs`, tasks: ['Weekly quiz self-assessment', 'Plan upcoming week milestones'], tag: 'Review' }
  ];

  return {
    weeklyHours: studyHours,
    dailyAverage: dailyTarget,
    primaryFocus: gapInfo.targetRoleName,
    schedule
  };
};

export const getCounselorResponse = (userQuery, student) => {
  const query = userQuery.toLowerCase();
  const cgpa = predictCGPA(student).cgpa;
  const placement = predictPlacement(student, cgpa);
  const salary = estimateSalary(student, cgpa);
  
  if (query.includes('cgpa') || query.includes('grade') || query.includes('marks')) {
    return `Based on your parameters (Attendance: ${student.attendance_pct || 75}%, Study Hours: ${student.study_hours_weekly || 15}h/wk, Prev GPA: ${student.previous_gpa || 7.5}), your **predicted CGPA is ${cgpa}**. 

💡 **Actionable Tip**: Increasing your study hours by just 4 hours per week and maintaining attendance above 85% could boost your CGPA by approximately +0.3 to +0.5 points!`;
  }
  
  if (query.includes('placement') || query.includes('job') || query.includes('interview')) {
    return `Your estimated Placement Probability is **${placement.probabilityPct}%** (${placement.status}).

🎯 **Tier Eligibility**: You fit strongly into **${placement.tierEligibility}**.
🚀 **Top Recommendation**: Completing 1 more hands-on project and raising your coding score (currently ${student.coding_rating || 1200}) will significantly increase your callback rate for top-tier companies.`;
  }

  if (query.includes('salary') || query.includes('package') || query.includes('lpa') || query.includes('pay')) {
    return `Your estimated entry-level salary range is **${salary.range}** (Average: ${salary.avgLpa} LPA / ${salary.usdEquivalent}).

📈 **Salary Boosters**: Candidates with 2+ internships and a coding rating above 1600 see a **35% higher average starting package**.`;
  }

  if (query.includes('resume') || query.includes('cv') || query.includes('project')) {
    return `Here are 3 key rules to optimize your resume for your target role:
1. **Quantify Results**: Use metrics (e.g. "Optimized API response time by 40% using Redis caching").
2. **Include GitHub Links**: Direct links to working live demos and clean Git commit logs increase recruiter response by 3x.
3. **Align Tech Keywords**: Highlight key frameworks relevant to your target role (${student.targetRole || 'Full Stack Developer'}).`;
  }

  return `Hello! I am your AI Student Career Counselor. 

I analyzed your profile:
- **Predicted CGPA**: ${cgpa}
- **Placement Probability**: ${placement.probabilityPct}%
- **Expected Salary**: ${salary.range}

How can I help you today? You can ask me about **CGPA improvement**, **Placement preparation strategies**, **Resume & Portfolio tips**, or **Skill Gap roadmaps**!`;
};
