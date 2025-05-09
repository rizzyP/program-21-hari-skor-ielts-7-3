
import { supabase } from "@/integrations/supabase/client";
import { UserAnswer } from "@/types/test";

export type AssessmentResult = {
  id?: string;
  user_id?: string;
  test_type: 'listening' | 'reading' | 'writing' | 'speaking';
  score: number;
  answers: UserAnswer[];
  created_at?: string;
};

export const saveAssessmentResult = async (result: AssessmentResult) => {
  try {
    // Get the current user session
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;
    
    if (!userId) {
      throw new Error("User must be logged in to save assessment results");
    }
    
    const { data, error } = await supabase
      .from('assessment_results')
      .insert({
        user_id: userId,
        test_type: result.test_type,
        score: result.score,
        answers: result.answers as any, // Cast to any to handle type mismatch
      })
      .select();
    
    if (error) throw error;
    
    // Cast the returned data to match our type
    return data[0] as unknown as AssessmentResult;
  } catch (error) {
    console.error('Error saving assessment result:', error);
    throw error;
  }
};

export const getAssessmentResults = async () => {
  try {
    const { data, error } = await supabase
      .from('assessment_results')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    // Cast the returned data to match our type
    return data as unknown as AssessmentResult[];
  } catch (error) {
    console.error('Error retrieving assessment results:', error);
    throw error;
  }
};

export const getLatestAssessmentResult = async (testType: string) => {
  try {
    const { data, error } = await supabase
      .from('assessment_results')
      .select('*')
      .eq('test_type', testType)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    
    if (error) throw error;
    
    // Cast the returned data to match our type
    return data as unknown as AssessmentResult | null;
  } catch (error) {
    console.error(`Error retrieving latest ${testType} assessment result:`, error);
    throw error;
  }
};
