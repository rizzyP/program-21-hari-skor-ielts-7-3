
import { TestResult, Feedback } from '@/types/test';

interface EvaluationScores {
  listening: number;
  reading: number;
  writing: number; 
  speaking: number;
}

// This function would ideally call an API to get AI evaluation
export const evaluateSpeakingResponse = async (
  transcripts: Record<string, string>
): Promise<Feedback> => {
  // In a real application, this would send the responses to an API for evaluation
  console.log('Evaluating speaking responses:', transcripts);
  
  // Simulate evaluation processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // For demonstration purposes, return mock feedback
  return {
    criteria: [
      { 
        name: 'Fluency and Coherence', 
        score: 7.0, 
        feedback: 'Good flow of speech with only occasional repetition. Ideas are generally well-connected.' 
      },
      { 
        name: 'Lexical Resource', 
        score: 7.0, 
        feedback: 'Uses vocabulary with flexibility and some precision. Some less common items used correctly.' 
      },
      { 
        name: 'Grammatical Range and Accuracy', 
        score: 6.5, 
        feedback: 'A mix of simple and complex structures, but with some errors in complex sentences.' 
      },
      { 
        name: 'Pronunciation', 
        score: 7.5, 
        feedback: 'Clear pronunciation with good control of stress and intonation. Some features of native-like speech.' 
      }
    ],
    overallScore: 7.0,
    strengths: [
      'Good fluency with minimal hesitation',
      'Clear pronunciation',
      'Good variety of vocabulary'
    ],
    weaknesses: [
      'Occasional grammatical errors',
      'Limited use of complex vocabulary'
    ],
    recommendations: 'Focus on using more complex grammatical structures accurately and expand your advanced vocabulary. Practice speaking about unfamiliar topics to improve flexibility.'
  };
};

export const evaluateWritingResponse = async (
  essays: Record<string, string>
): Promise<Feedback> => {
  // In a real application, this would send the essays to an API for evaluation
  console.log('Evaluating writing responses:', essays);
  
  // Simulate evaluation processing time
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // For demonstration purposes, return mock feedback
  return {
    criteria: [
      { 
        name: 'Task Achievement', 
        score: 6.5, 
        feedback: 'Addresses requirements of the task. Some parts more fully covered than others.' 
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
};

export const evaluateReadingAnswers = (
  userAnswers: Record<string, string>,
  correctAnswers: Record<string, string>
): Feedback => {
  const userResponseEntries = Object.entries(userAnswers);
  const totalQuestions = userResponseEntries.length;
  
  let correctCount = 0;
  
  userResponseEntries.forEach(([questionId, userResponse]) => {
    if (correctAnswers[questionId]?.toLowerCase() === userResponse.toLowerCase()) {
      correctCount++;
    }
  });
  
  const percentageCorrect = (correctCount / totalQuestions) * 100;
  
  // Map percentage to IELTS band score (approximate conversion)
  let bandScore = 0;
  
  if (percentageCorrect >= 90) bandScore = 9.0;
  else if (percentageCorrect >= 85) bandScore = 8.5;
  else if (percentageCorrect >= 80) bandScore = 8.0;
  else if (percentageCorrect >= 75) bandScore = 7.5;
  else if (percentageCorrect >= 70) bandScore = 7.0;
  else if (percentageCorrect >= 65) bandScore = 6.5;
  else if (percentageCorrect >= 60) bandScore = 6.0;
  else if (percentageCorrect >= 55) bandScore = 5.5;
  else if (percentageCorrect >= 50) bandScore = 5.0;
  else if (percentageCorrect >= 40) bandScore = 4.0;
  else if (percentageCorrect >= 30) bandScore = 3.0;
  else bandScore = 2.0;
  
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
      'Good understanding of main ideas',
      'Ability to locate specific information'
    ],
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
  
  userResponseEntries.forEach(([questionId, userResponse]) => {
    if (correctAnswers[questionId]?.toLowerCase() === userResponse.toLowerCase()) {
      correctCount++;
    }
  });
  
  const percentageCorrect = (correctCount / totalQuestions) * 100;
  
  // Map percentage to IELTS band score (approximate conversion)
  let bandScore = 0;
  
  if (percentageCorrect >= 90) bandScore = 9.0;
  else if (percentageCorrect >= 85) bandScore = 8.5;
  else if (percentageCorrect >= 80) bandScore = 8.0;
  else if (percentageCorrect >= 75) bandScore = 7.5;
  else if (percentageCorrect >= 70) bandScore = 7.0;
  else if (percentageCorrect >= 65) bandScore = 6.5;
  else if (percentageCorrect >= 60) bandScore = 6.0;
  else if (percentageCorrect >= 55) bandScore = 5.5;
  else if (percentageCorrect >= 50) bandScore = 5.0;
  else if (percentageCorrect >= 40) bandScore = 4.0;
  else if (percentageCorrect >= 30) bandScore = 3.0;
  else bandScore = 2.0;
  
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

// Correct answers for the listening test
export const listeningCorrectAnswers: Record<string, string> = {
  'l-q1': 'C', // Digital Art classes
  'l-q2': 'E', // Fine Art classes
  'l-q3': 'F', // Photography classes
  'l-q4': 'H', // Ceramic and Pottery classes
  'l-q5': 'I', // Jewellery design classes
  'l-q6': 'three',
  'l-q7': '$350',
  'l-q8': '$250',
  'l-q9': '15th',
  'l-q10': 'Robertson',
  'l-q11': 'boundary between',
  'l-q12': 'market',
  'l-q13': 'religion',
  'l-q14': 'the scope',
  'l-q15': 'internationally'
};

// Correct answers for the reading test
export const readingCorrectAnswers: Record<string, string> = {
  'r-q1': 'true',
  'r-q2': 'false',
  'r-q3': 'not given',
  'r-q4': 'B',
  'r-q5': 'E',
  'r-q6': 'C',
  'r-q7': 'invasive',
  'r-q8': 'radiation',
  'r-q9': 'false',
  'r-q10': 'true'
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
