
export type MaterialType = 'video' | 'reading' | 'exercise' | 'test';

export interface Material {
  title: string;
  type: MaterialType;
  durationMinutes: number;
  completed: boolean;
  path?: string; // Optional path for navigation
}

export interface Day {
  title: string;
  materials: Material[];
}
