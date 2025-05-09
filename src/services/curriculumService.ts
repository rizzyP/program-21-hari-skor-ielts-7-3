
import { supabase } from "@/integrations/supabase/client";

export type CurriculumProgress = {
  id?: string;
  user_id?: string;
  day: number;
  section: string;
  completed: boolean;
  completed_at?: string | null;
  created_at?: string;
};

export const markSectionCompleted = async (day: number, section: string) => {
  try {
    // Get the current user session
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;
    
    if (!userId) {
      throw new Error("User must be logged in to mark sections as completed");
    }
    
    // Check if there's already an entry
    const { data: existingEntry } = await supabase
      .from('curriculum_progress')
      .select('*')
      .eq('day', day)
      .eq('section', section)
      .eq('user_id', userId)
      .maybeSingle();
    
    if (existingEntry) {
      // Update existing entry
      const { data, error } = await supabase
        .from('curriculum_progress')
        .update({
          completed: true,
          completed_at: new Date().toISOString(),
        })
        .eq('id', existingEntry.id)
        .select();
      
      if (error) throw error;
      return data[0] as CurriculumProgress;
    } else {
      // Create new entry
      const { data, error } = await supabase
        .from('curriculum_progress')
        .insert({
          user_id: userId,
          day,
          section,
          completed: true,
          completed_at: new Date().toISOString(),
        })
        .select();
      
      if (error) throw error;
      return data[0] as CurriculumProgress;
    }
  } catch (error) {
    console.error('Error marking section as completed:', error);
    throw error;
  }
};

export const getUserCurriculumProgress = async () => {
  try {
    const { data, error } = await supabase
      .from('curriculum_progress')
      .select('*')
      .order('day', { ascending: true });
    
    if (error) throw error;
    
    return data as CurriculumProgress[];
  } catch (error) {
    console.error('Error retrieving curriculum progress:', error);
    throw error;
  }
};

export const getDayProgress = async (day: number) => {
  try {
    const { data, error } = await supabase
      .from('curriculum_progress')
      .select('*')
      .eq('day', day);
    
    if (error) throw error;
    
    return data as CurriculumProgress[];
  } catch (error) {
    console.error(`Error retrieving day ${day} progress:`, error);
    throw error;
  }
};
