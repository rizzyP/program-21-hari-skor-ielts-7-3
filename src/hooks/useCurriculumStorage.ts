
import { useState, useEffect } from 'react';
import { Day } from '../types/curriculum';
import { getDefaultCurriculum } from '../data/curriculumData';

export function useCurriculumStorage() {
  // Get initial curriculum data from localStorage or use default
  const [days, setDays] = useState<Day[]>(() => {
    const savedCurriculum = localStorage.getItem('ielts-curriculum');
    if (savedCurriculum) {
      return JSON.parse(savedCurriculum);
    }
    
    // Default curriculum structure
    return getDefaultCurriculum();
  });

  // Save changes to localStorage whenever the days state changes
  useEffect(() => {
    localStorage.setItem('ielts-curriculum', JSON.stringify(days));
  }, [days]);

  return { days, setDays };
}
