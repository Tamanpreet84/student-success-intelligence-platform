"""
Synthetic Student Dataset Generator
Generates realistic multi-dimensional student performance data for ML model training.
"""
import random
import json
import os

def generate_student_dataset(num_records=5000):
    records = []
    random.seed(42)
    
    for i in range(1, num_records + 1):
        attendance = round(random.uniform(55.0, 99.0), 1)
        study_hours = round(random.uniform(2.0, 35.0), 1)
        prev_gpa = round(random.uniform(5.0, 9.8), 2)
        assignment_score = round(random.uniform(50.0, 100.0), 1)
        projects = random.randint(0, 6)
        internships = random.randint(0, 3)
        aptitude_score = round(random.uniform(40.0, 98.0), 1)
        coding_rating = random.randint(800, 2200) # LeetCode/CodeChef rating scale
        soft_skills = round(random.uniform(50.0, 99.0), 1)
        backlogs = random.choice([0, 0, 0, 0, 1, 1, 2])
        
        # Calculate realistic target CGPA (Regression target)
        # Weighted formula with slight gaussian noise
        cgpa_base = (
            (attendance * 0.02) + 
            (study_hours * 0.05) + 
            (prev_gpa * 0.55) + 
            (assignment_score * 0.015) - 
            (backlogs * 0.4)
        )
        noise = random.gauss(0, 0.25)
        predicted_cgpa = min(10.0, max(4.0, round(cgpa_base + noise, 2)))
        
        # Calculate Placement Probability & Status (Classification target)
        placement_score = (
            (predicted_cgpa * 10) +
            (projects * 4) +
            (internships * 8) +
            (aptitude_score * 0.3) +
            (coding_rating * 0.02) +
            (soft_skills * 0.2) -
            (backlogs * 15)
        )
        
        # Threshold for placement
        placed = 1 if placement_score > 120 and backlogs < 2 else 0
        
        # Calculate Salary in LPA (Lakhs Per Annum) / Salary Index
        if placed:
            salary = round(4.5 + (placement_score - 120) * 0.18 + random.uniform(-1.0, 3.0), 2)
            salary = max(3.5, min(45.0, salary))
        else:
            salary = 0.0
            
        records.append({
            "student_id": f"STU_{i:04d}",
            "attendance_pct": attendance,
            "study_hours_weekly": study_hours,
            "previous_gpa": prev_gpa,
            "assignment_score": assignment_score,
            "project_count": projects,
            "internship_count": internships,
            "aptitude_score": aptitude_score,
            "coding_rating": coding_rating,
            "soft_skills_score": soft_skills,
            "backlogs": backlogs,
            "predicted_cgpa": predicted_cgpa,
            "placed": placed,
            "salary_lpa": salary
        })
        
    return records

if __name__ == "__main__":
    os.makedirs("ml_engine/data", exist_ok=True)
    dataset = generate_student_dataset(5000)
    with open("ml_engine/data/student_dataset.json", "w") as f:
        json.dump(dataset, f, indent=2)
    print(f"Generated dataset with {len(dataset)} records in ml_engine/data/student_dataset.json")
