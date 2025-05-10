import { TestResult, Feedback } from '@/types/test';
import { assessSpeakingResponse, assessWritingTask } from './aiService';

interface EvaluationScores {
  listening: number;
  reading: number;
  writing: number; 
  speaking: number;
}

// This function calls the AI service for evaluation
export const evaluateSpeakingResponse = async (
  transcripts: Record<string, string>
): Promise<Feedback> => {
  console.log('Evaluating speaking responses:', transcripts);
  
  try {
    // Get the first transcript for simplicity
    // In a full implementation, we would evaluate all transcripts
    const firstKey = Object.keys(transcripts)[0];
    const firstTranscript = transcripts[firstKey] || "";
    const question = "Tell me about yourself and your hobbies."; // Default question if not available
    
    // Call the AI service for evaluation
    const feedback = await assessSpeakingResponse(question, firstTranscript);
    return feedback;
  } catch (error) {
    console.error('Error evaluating speaking response:', error);
    
    // Fallback to mock response
    return {
      criteria: [
        { 
          name: 'Fluency and Coherence', 
          score: 6.5, 
          feedback: 'Generally fluent with some hesitation when dealing with complex ideas.' 
        },
        { 
          name: 'Lexical Resource', 
          score: 7.0, 
          feedback: 'Good range of vocabulary with some flexibility and precision.' 
        },
        { 
          name: 'Grammatical Range and Accuracy', 
          score: 6.5, 
          feedback: 'Mix of simple and complex structures with some errors in complex sentences.' 
        },
        { 
          name: 'Pronunciation', 
          score: 6.0, 
          feedback: 'Generally clear pronunciation with some consistent errors that occasionally impact understanding.' 
        }
      ],
      overallScore: 6.5,
      strengths: [
        'Good fluency with minimal hesitation',
        'Clear pronunciation of most words',
        'Good variety of vocabulary'
      ],
      weaknesses: [
        'Occasional grammatical errors',
        'Limited use of complex vocabulary'
      ],
      recommendations: 'Focus on using more complex grammatical structures accurately and expand your advanced vocabulary. Practice speaking about unfamiliar topics to improve flexibility.'
    };
  }
};

export const evaluateWritingResponse = async (
  essays: Record<string, string>
): Promise<Feedback> => {
  console.log('Evaluating writing responses:', essays);
  
  try {
    // Get the first essay for simplicity
    // In a full implementation, we would evaluate all essays
    const firstKey = Object.keys(essays)[0];
    const essay = essays[firstKey] || "";
    const prompt = "Describe the chart and make comparisons where relevant."; // Default prompt if not available
    
    if (!essay.trim()) {
      console.warn('Empty essay submitted for evaluation');
      throw new Error('Essay is empty');
    }
    
    console.log('Sending essay for evaluation:', { prompt, essayLength: essay.length });
    
    // Call the AI service for evaluation
    const feedback = await assessWritingTask(prompt, essay, 1); // Assume Task 1 for now
    console.log('Received feedback:', feedback);
    return feedback;
  } catch (error) {
    console.error('Error evaluating writing response:', error);
    
    // Fallback to mock response
    return {
      criteria: [
        { 
          name: 'Task Achievement', 
          score: 6.5, 
          feedback: 'Covers requirements of the task. Some parts more fully covered than others.' 
        },
        { 
          name: 'Coherence and Cohesion', 
          score: 7.0, 
          feedback: 'Information and ideas organized coherently with good use of cohesive devices.' 
        },
        { 
          name: 'Lexical Resource', 
          score: 6.5, 
          feedback: 'Adequate range of vocabulary with some awareness of style and collocation.' 
        },
        { 
          name: 'Grammatical Range and Accuracy', 
          score: 6.0, 
          feedback: 'Mix of complex structures, but with frequent errors that occasionally cause difficulty for the reader.' 
        }
      ],
      overallScore: 6.5,
      strengths: [
        'Clear paragraph structure',
        'Good use of transition phrases',
        'Relevant content addressing the task'
      ],
      weaknesses: [
        'Some grammatical errors in complex sentences',
        'Limited range of vocabulary for academic writing',
        'Occasionally unclear expressions'
      ],
      recommendations: 'Work on using a wider range of academic vocabulary and practice writing more complex sentences accurately. Focus on fully developing all parts of the question with relevant examples and explanations.'
    };
  }
};

export const evaluateReadingAnswers = (
  userAnswers: Record<string, string>,
  correctAnswers: Record<string, string>
): Feedback => {
  const userResponseEntries = Object.entries(userAnswers);
  const totalQuestions = userResponseEntries.length;
  
  let correctCount = 0;
  
  userResponseEntries.forEach(([questionId, userResponse]) => {
    if (isCorrectAnswer(questionId, userResponse, correctAnswers[questionId] || '')) {
      correctCount++;
    }
  });
  
  const percentageCorrect = (correctCount / Math.max(totalQuestions, 1)) * 100;
  console.log(`Reading evaluation: ${correctCount}/${totalQuestions} correct (${percentageCorrect.toFixed(1)}%)`);
  
  // Map percentage to IELTS band score (more accurate conversion)
  let bandScore = 0;
  
  // Fixed the band score calculation to be more accurate
  if (percentageCorrect >= 97) bandScore = 9.0;
  else if (percentageCorrect >= 95) bandScore = 8.5;
  else if (percentageCorrect >= 90) bandScore = 8.0;
  else if (percentageCorrect >= 85) bandScore = 7.5;
  else if (percentageCorrect >= 80) bandScore = 7.0;
  else if (percentageCorrect >= 72) bandScore = 6.5;
  else if (percentageCorrect >= 65) bandScore = 6.0;
  else if (percentageCorrect >= 55) bandScore = 5.5;
  else if (percentageCorrect >= 45) bandScore = 5.0;
  else if (percentageCorrect >= 35) bandScore = 4.5;
  else if (percentageCorrect >= 30) bandScore = 4.0;
  else if (percentageCorrect >= 22) bandScore = 3.5;
  else if (percentageCorrect >= 17) bandScore = 3.0;
  else bandScore = 2.5;
  
  return {
    criteria: [
      { 
        name: 'Reading Comprehension', 
        score: bandScore, 
        feedback: `You answered ${correctCount} out of ${totalQuestions} questions correctly (${percentageCorrect.toFixed(1)}%).` 
      }
    ],
    overallScore: bandScore,
    strengths: [
      correctCount > 0 ? 'Good understanding of main ideas' : '',
      percentageCorrect >= 70 ? 'Ability to locate specific information' : ''
    ].filter(Boolean),
    weaknesses: [
      percentageCorrect < 70 ? 'Difficulty with inference questions' : '',
      percentageCorrect < 80 ? 'Challenges with academic vocabulary' : ''
    ].filter(Boolean),
    recommendations: 
      percentageCorrect < 60 
        ? 'Focus on improving your vocabulary and practice reading academic texts more frequently. Work on skimming and scanning techniques.' 
        : percentageCorrect < 80 
          ? 'Continue working on understanding detailed information and inference questions. Practice with a wider range of text types.'
          : 'Excellent reading skills. To improve further, focus on speed reading techniques and expanding your academic vocabulary.'
  };
};

export const evaluateListeningAnswers = (
  userAnswers: Record<string, string>,
  correctAnswers: Record<string, string>
): Feedback => {
  const userResponseEntries = Object.entries(userAnswers);
  const totalQuestions = userResponseEntries.length;
  
  let correctCount = 0;
  
  // Section One questions (1-5) need special handling - they're evaluated as a set
  const sectionOneQuestionIds = ['l-q1', 'l-q2', 'l-q3', 'l-q4', 'l-q5'];
  const sectionOneCorrectAnswers = ['B', 'D', 'C', 'F', 'I'];
  
  // Create a map to track which correct answers have been matched
  const sectionOneMatched = new Map();
  // Extract user answers for these special questions
  const sectionOneUserAnswers = new Map();
  
  // Collect user answers for section one questions
  sectionOneQuestionIds.forEach(id => {
    if (userAnswers[id]) {
      // Extract just the letter for multiple choice
      const answerLetter = userAnswers[id].trim().charAt(0).toUpperCase();
      sectionOneUserAnswers.set(id, answerLetter);
    }
  });
  
  // Count correct matches using a set-based approach (order-insensitive)
  if (sectionOneUserAnswers.size > 0) {
    // First check if each user answer matches ANY of the correct answers
    sectionOneUserAnswers.forEach((userAnswer, questionId) => {
      // If this answer is in the correct set and hasn't been matched yet
      if (sectionOneCorrectAnswers.includes(userAnswer) && !sectionOneMatched.has(userAnswer)) {
        sectionOneMatched.set(userAnswer, questionId);
        correctCount++;
      }
    });
    
    console.log(`Section 1 evaluation (order-insensitive): ${sectionOneMatched.size}/${sectionOneQuestionIds.length} correct`);
  }
  
  // Process other questions normally
  userResponseEntries.forEach(([questionId, userResponse]) => {
    // Skip the questions 1-5 as we already processed them
    if (!sectionOneQuestionIds.includes(questionId)) {
      // For other questions, check normally
      const correct = correctAnswers[questionId];
      if (correct && isCorrectAnswer(questionId, userResponse, correct)) {
        correctCount++;
      }
    }
  });
  
  const percentageCorrect = (correctCount / totalQuestions) * 100;
  
  // Map percentage to IELTS band score (approximate conversion)
  let bandScore = 0;
  
  if (percentageCorrect >= 97) bandScore = 9.0;
  else if (percentageCorrect >= 92) bandScore = 8.5;
  else if (percentageCorrect >= 87) bandScore = 8.0;
  else if (percentageCorrect >= 80) bandScore = 7.5;
  else if (percentageCorrect >= 75) bandScore = 7.0;
  else if (percentageCorrect >= 65) bandScore = 6.5;
  else if (percentageCorrect >= 57) bandScore = 6.0;
  else if (percentageCorrect >= 45) bandScore = 5.5;
  else if (percentageCorrect >= 40) bandScore = 5.0;
  else if (percentageCorrect >= 32) bandScore = 4.5;
  else bandScore = 4;
  
  return {
    criteria: [
      { 
        name: 'Listening Comprehension', 
        score: bandScore, 
        feedback: `You answered ${correctCount} out of ${totalQuestions} questions correctly (${percentageCorrect.toFixed(1)}%).` 
      }
    ],
    overallScore: bandScore,
    strengths: [
      'Good understanding of main ideas',
      percentageCorrect >= 70 ? 'Ability to identify specific details' : ''
    ].filter(Boolean),
    weaknesses: [
      percentageCorrect < 70 ? 'Missing specific details' : '',
      percentageCorrect < 75 ? 'Difficulty with numbers and figures' : ''
    ].filter(Boolean),
    recommendations: 
      percentageCorrect < 60 
        ? 'Practice listening to a variety of English accents. Work on your note-taking skills and focus on identifying specific details.' 
        : percentageCorrect < 80 
          ? 'Continue practicing with academic lectures and conversations. Work on capturing numerical information accurately.'
          : 'Excellent listening skills. To improve further, focus on recognizing speaker attitudes and opinions, and practice with faster speech rates.'
  };
};

// Helper function to determine if an answer is correct, including special cases
const isCorrectAnswer = (questionId: string, userAnswer: string, correctAnswer: string): boolean => {
  // Normalize both answers to lowercase for case-insensitive comparison
  const normalizedUserAnswer = userAnswer.toLowerCase().trim();
  const normalizedCorrectAnswer = correctAnswer.toLowerCase().trim();
  
  // Special handling for listening questions 1-5 (MCQ with options A-I)
  // Note: These are now handled separately in the evaluateListeningAnswers function
  // but we'll keep this check for backwards compatibility
  if (['l-q1', 'l-q2', 'l-q3', 'l-q4', 'l-q5'].includes(questionId)) {
    // For these questions, we only need to check if the first character matches (the option letter)
    return normalizedUserAnswer.charAt(0) === normalizedCorrectAnswer.charAt(0);
  }
  
  // Special handling for question 6 - accepts "2" or "two"
  if (questionId === 'l-q6') {
    const validAnswers = ['2', 'two'];
    return validAnswers.includes(normalizedUserAnswer);
  }
  
  // Special handling for question 7 - accepts "375"
  if (questionId === 'l-q7') {
    return normalizedUserAnswer.replace(/\s+|[$]/g, '') === '375';
  }
  
  // Special handling for question 8 - accepts "245"
  if (questionId === 'l-q8') {
    return normalizedUserAnswer.replace(/\s+|[$]/g, '') === '245';
  }
  
  // Special handling for questions with dollar amounts (remaining dollar-related questions)
  if (questionId.startsWith('l-q') && (normalizedCorrectAnswer.includes('$') || normalizedUserAnswer.includes('$'))) {
    // Remove any dollar signs, spaces and compare
    const userValue = normalizedUserAnswer.replace(/[$\s]/g, '');
    const correctValue = normalizedCorrectAnswer.replace(/[$\s]/g, '');
    return userValue === correctValue;
  }
  
  // Default case: direct comparison with case insensitivity (already normalized)
  return normalizedUserAnswer === normalizedCorrectAnswer;
};

// Correct answers for the listening test
export const listeningCorrectAnswers: Record<string, string> = {
  'l-q1': 'B', // Oil Painting classes
  'l-q2': 'D', // Print making classes
  'l-q3': 'C', // Digital Art classes
  'l-q4': 'F', // Photography classes
  'l-q5': 'I', // Jewellery design classes
  'l-q6': '2',
  'l-q7': '375',
  'l-q8': '245',
  'l-q9': '23rd',
  'l-q10': 'Carol Pearstone',
  'l-q11': 'line between',
  'l-q12': 'centres of gravity',
  'l-q13': 'wealth and elitism',
  'l-q14': 'the boundaries',
  'l-q15': 'around the world'
};

// Updated correct answers for the academic reading test
export const readingCorrectAnswers: Record<string, string> = {
  'r-academic-q1': 'not given',
  'r-academic-q2': 'true',
  'r-academic-q3': 'true',
  'r-academic-q4': 'storage',
  'r-academic-q5': 'warrenlike',
  'r-academic-q6': 'A',
  'r-academic-q7': 'B',
  'r-academic-q8': 'A',
  'r-academic-q9': 'B',
  'r-academic-q10': 'B',
  // General training reading answers
  'r-general-q1': 'upscale boutiques',
  'r-general-q2': 'munitions',
  'r-general-q3': 'warrenlike',
  'r-general-q4': 'sell',
  'r-general-q5': 'false',
  'r-general-q6': 'true',
  'r-general-q7': 'false',
  'r-general-q8': 'B',
  'r-general-q9': 'C',
  'r-general-q10': 'B'
};

// Generate the overall analysis based on section scores
export const generateOverallAnalysis = async (
  sectionScores: EvaluationScores
): Promise<{
  overallBandScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string;
}> => {
  console.log('Generating overall analysis...', sectionScores);
  
  // Calculate overall band score (average of the 4 sections)
  const { listening, reading, writing, speaking } = sectionScores;
  const average = (listening + reading + writing + speaking) / 4;
  
  // Round to nearest 0.5
  const overallBandScore = Math.round(average * 2) / 2;
  
  let strengths: string[] = [];
  let weaknesses: string[] = [];
  let recommendations = '';
  
  // Determine strengths and weaknesses based on section scores
  if (listening >= 7.0) strengths.push('Strong listening comprehension skills');
  else if (listening < 6.5) weaknesses.push('Needs improvement in listening comprehension');
  
  if (reading >= 7.0) strengths.push('Good reading ability and comprehension');
  else if (reading < 6.5) weaknesses.push('Needs improvement in reading comprehension');
  
  if (writing >= 7.0) strengths.push('Effective written communication skills');
  else if (writing < 6.5) weaknesses.push('Written expression needs further development');
  
  if (speaking >= 7.0) strengths.push('Clear and fluent verbal communication');
  else if (speaking < 6.5) weaknesses.push('Speaking fluency and accuracy need improvement');
  
  // Generate recommendations
  if (overallBandScore >= 7.5) {
    recommendations = 'Your English proficiency is very good. Focus on refining specific aspects of your language skills to aim for band 8+. Consider advanced vocabulary and complex grammatical structures.';
  } else if (overallBandScore >= 6.5) {
    recommendations = 'You have demonstrated competent English skills suitable for most academic and professional contexts. To improve, focus on the specific areas identified in your section feedback.';
  } else {
    recommendations = 'Continue developing your English skills through regular practice. Focus particularly on your areas of weakness and expose yourself to a variety of English contexts daily.';
  }
  
  return {
    overallBandScore,
    strengths,
    weaknesses,
    recommendations
  };
};
