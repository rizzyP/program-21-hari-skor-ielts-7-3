
import { useNavigate } from 'react-router-dom';
import { useCurriculumStorage } from './useCurriculumStorage';
import { Day } from '../types/curriculum';

export function useCurriculum() {
  const navigate = useNavigate();
  const { days, setDays } = useCurriculumStorage();

  // Function to mark a material as completed
  const markAsCompleted = (dayNumber: number, materialIndex: number) => {
    setDays(currentDays => {
      // Validate day number and material index to prevent errors
      if (
        dayNumber < 1 || 
        dayNumber > currentDays.length || 
        materialIndex < 0 || 
        !currentDays[dayNumber - 1]?.materials || 
        materialIndex >= currentDays[dayNumber - 1].materials.length
      ) {
        console.error(`Invalid day number (${dayNumber}) or material index (${materialIndex})`);
        return currentDays; // Return unchanged days if invalid
      }

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
      const allCompleted = days[i]?.materials?.every(material => material.completed) ?? false;
      if (!allCompleted) return false;
    }
    
    return true;
  };

  // Function to navigate to a specific path if provided
  const navigateToMaterial = (dayNumber: number, materialIndex: number) => {
    // Validate day number and material index
    if (
      dayNumber < 1 || 
      dayNumber > days.length || 
      materialIndex < 0 || 
      !days[dayNumber - 1]?.materials ||
      materialIndex >= days[dayNumber - 1].materials.length
    ) {
      console.error(`Invalid day number (${dayNumber}) or material index (${materialIndex})`);
      return;
    }

    const material = days[dayNumber - 1].materials[materialIndex];
    if (material.path) {
      navigate(material.path);
    }
  };

  return { days, markAsCompleted, isAccessible, navigateToMaterial };
}
