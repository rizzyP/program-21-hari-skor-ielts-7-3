
import { useNavigate } from 'react-router-dom';
import { useCurriculumStorage } from './useCurriculumStorage';
import { Day } from '../types/curriculum';

export function useCurriculum() {
  const navigate = useNavigate();
  const { days, setDays } = useCurriculumStorage();

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

  // Function to navigate to a specific path if provided
  const navigateToMaterial = (dayNumber: number, materialIndex: number) => {
    const material = days[dayNumber - 1].materials[materialIndex];
    if (material.path) {
      navigate(material.path);
    }
  };

  return { days, markAsCompleted, isAccessible, navigateToMaterial };
}
