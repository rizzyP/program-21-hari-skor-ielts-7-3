
import { useState, useEffect } from 'react';

type MaterialType = 'video' | 'reading' | 'exercise';

interface Material {
  title: string;
  type: MaterialType;
  durationMinutes: number;
  completed: boolean;
}

interface Day {
  title: string;
  materials: Material[];
}

export function useCurriculum() {
  // Get initial curriculum data from localStorage or use default
  const [days, setDays] = useState<Day[]>(() => {
    const savedCurriculum = localStorage.getItem('ielts-curriculum');
    if (savedCurriculum) {
      return JSON.parse(savedCurriculum);
    }
    
    // Default curriculum structure
    return [
      {
        title: "IELTS Overview and Assessment",
        materials: [
          { title: "Introduction to IELTS", type: "video", durationMinutes: 15, completed: false },
          { title: "Understanding IELTS Scoring", type: "reading", durationMinutes: 20, completed: false },
          { title: "Self-Assessment Quiz", type: "exercise", durationMinutes: 18, completed: false }
        ]
      },
      {
        title: "Listening Fundamentals",
        materials: [
          { title: "Listening Strategies", type: "video", durationMinutes: 22, completed: false },
          { title: "Note-Taking Techniques", type: "video", durationMinutes: 18, completed: false },
          { title: "Listening Practice - Basic", type: "exercise", durationMinutes: 25, completed: false }
        ]
      },
      {
        title: "Reading Techniques",
        materials: [
          { title: "Skimming and Scanning", type: "video", durationMinutes: 15, completed: false },
          { title: "Vocabulary Building", type: "reading", durationMinutes: 20, completed: false },
          { title: "Reading Practice - Academic", type: "exercise", durationMinutes: 30, completed: false }
        ]
      },
      {
        title: "Writing Task 1",
        materials: [
          { title: "Data Analysis for Task 1", type: "video", durationMinutes: 25, completed: false },
          { title: "Describing Charts and Graphs", type: "reading", durationMinutes: 15, completed: false },
          { title: "Task 1 Practice", type: "exercise", durationMinutes: 30, completed: false }
        ]
      },
      {
        title: "Writing Task 2 - Basics",
        materials: [
          { title: "Essay Structure", type: "video", durationMinutes: 18, completed: false },
          { title: "Introduction and Conclusion", type: "reading", durationMinutes: 12, completed: false },
          { title: "Task 2 Practice - Opinion Essay", type: "exercise", durationMinutes: 40, completed: false }
        ]
      },
      {
        title: "Speaking Part 1",
        materials: [
          { title: "Speaking Basics", type: "video", durationMinutes: 15, completed: false },
          { title: "Common Part 1 Topics", type: "reading", durationMinutes: 20, completed: false },
          { title: "Practice Session - Part 1", type: "exercise", durationMinutes: 25, completed: false }
        ]
      },
      {
        title: "Speaking Part 2",
        materials: [
          { title: "Cue Card Strategies", type: "video", durationMinutes: 18, completed: false },
          { title: "Vocabulary for Description", type: "reading", durationMinutes: 15, completed: false },
          { title: "Practice Session - Part 2", type: "exercise", durationMinutes: 30, completed: false }
        ]
      },
      {
        title: "Speaking Part 3",
        materials: [
          { title: "Advanced Discussion Skills", type: "video", durationMinutes: 20, completed: false },
          { title: "Critical Thinking", type: "reading", durationMinutes: 15, completed: false },
          { title: "Practice Session - Part 3", type: "exercise", durationMinutes: 25, completed: false }
        ]
      },
      {
        title: "Advanced Listening",
        materials: [
          { title: "Academic Lecture Strategies", type: "video", durationMinutes: 22, completed: false },
          { title: "Multiple Speaker Tracking", type: "reading", durationMinutes: 18, completed: false },
          { title: "Listening Practice - Advanced", type: "exercise", durationMinutes: 35, completed: false }
        ]
      },
      {
        title: "Advanced Reading",
        materials: [
          { title: "Inference and Attitude", type: "video", durationMinutes: 20, completed: false },
          { title: "Academic Vocabulary", type: "reading", durationMinutes: 25, completed: false },
          { title: "Reading Practice - Advanced", type: "exercise", durationMinutes: 35, completed: false }
        ]
      },
      {
        title: "Advanced Writing Task 1",
        materials: [
          { title: "Complex Data Analysis", type: "video", durationMinutes: 25, completed: false },
          { title: "Process Diagrams", type: "reading", durationMinutes: 20, completed: false },
          { title: "Advanced Task 1 Practice", type: "exercise", durationMinutes: 30, completed: false }
        ]
      },
      {
        title: "Advanced Writing Task 2",
        materials: [
          { title: "Advanced Argumentation", type: "video", durationMinutes: 25, completed: false },
          { title: "Complex Essay Questions", type: "reading", durationMinutes: 20, completed: false },
          { title: "Advanced Task 2 Practice", type: "exercise", durationMinutes: 45, completed: false }
        ]
      },
      {
        title: "Grammar for IELTS",
        materials: [
          { title: "Key Grammar Structures", type: "video", durationMinutes: 30, completed: false },
          { title: "Common Error Patterns", type: "reading", durationMinutes: 20, completed: false },
          { title: "Grammar Practice Exercises", type: "exercise", durationMinutes: 25, completed: false }
        ]
      },
      {
        title: "Vocabulary Enhancement",
        materials: [
          { title: "Academic Word List", type: "video", durationMinutes: 15, completed: false },
          { title: "Collocations and Phrases", type: "reading", durationMinutes: 20, completed: false },
          { title: "Vocabulary Practice", type: "exercise", durationMinutes: 25, completed: false }
        ]
      },
      {
        title: "Practice Test - Listening & Reading",
        materials: [
          { title: "Full Listening Test", type: "exercise", durationMinutes: 40, completed: false },
          { title: "Full Reading Test", type: "exercise", durationMinutes: 60, completed: false },
          { title: "Performance Analysis", type: "video", durationMinutes: 20, completed: false }
        ]
      },
      {
        title: "Practice Test - Writing",
        materials: [
          { title: "Full Writing Test", type: "exercise", durationMinutes: 60, completed: false },
          { title: "Self-Assessment", type: "reading", durationMinutes: 15, completed: false },
          { title: "Performance Analysis", type: "video", durationMinutes: 25, completed: false }
        ]
      },
      {
        title: "Practice Test - Speaking",
        materials: [
          { title: "Full Speaking Test", type: "exercise", durationMinutes: 14, completed: false },
          { title: "Self-Assessment", type: "reading", durationMinutes: 15, completed: false },
          { title: "Performance Analysis", type: "video", durationMinutes: 20, completed: false }
        ]
      },
      {
        title: "One Day Before the Test",
        materials: [
          { title: "Final Preparation Tips", type: "video", durationMinutes: 20, completed: false },
          { title: "Mental Preparation", type: "reading", durationMinutes: 15, completed: false },
          { title: "Final Review", type: "exercise", durationMinutes: 30, completed: false }
        ]
      },
      {
        title: "Test Day",
        materials: [
          { title: "Test Day Procedures", type: "video", durationMinutes: 10, completed: false },
          { title: "Time Management", type: "reading", durationMinutes: 15, completed: false },
          { title: "Last-Minute Tips", type: "reading", durationMinutes: 15, completed: false }
        ]
      },
      {
        title: "After the Test",
        materials: [
          { title: "Understanding Your Score", type: "video", durationMinutes: 15, completed: false },
          { title: "Next Steps", type: "reading", durationMinutes: 20, completed: false },
          { title: "Study Abroad Preparation", type: "reading", durationMinutes: 25, completed: false }
        ]
      },
      {
        title: "Certification",
        materials: [
          { title: "Final Assessment", type: "exercise", durationMinutes: 45, completed: false },
          { title: "Program Completion", type: "video", durationMinutes: 10, completed: false },
          { title: "Certificate Guide", type: "reading", durationMinutes: 15, completed: false }
        ]
      }
    ];
  });

  // Save changes to localStorage whenever the days state changes
  useEffect(() => {
    localStorage.setItem('ielts-curriculum', JSON.stringify(days));
  }, [days]);

  // Function to mark a material as completed
  const markAsCompleted = (dayNumber: number, materialIndex: number) => {
    setDays(currentDays => {
      const newDays = [...currentDays];
      // Toggle the completed status
      newDays[dayNumber - 1].materials[materialIndex].completed = 
        !newDays[dayNumber - 1].materials[materialIndex].completed;
      return newDays;
    });
  };

  // Function to check if a day is accessible
  const isAccessible = (dayNumber: number) => {
    // Day 1 is always accessible
    if (dayNumber === 1) return true;
    
    // For other days, check if all materials in all previous days are completed
    for (let i = 0; i < dayNumber - 1; i++) {
      const allCompleted = days[i].materials.every(material => material.completed);
      if (!allCompleted) return false;
    }
    
    return true;
  };

  return { days, markAsCompleted, isAccessible };
}
