import { UserAnswer, Feedback } from '@/types/test';
import { 
  evaluateWritingWithGemini, 
  evaluateSpeakingWithGemini,
  evaluateOverallResultsWithGemini
} from './openRouterService';

export async function assessWritingTask(
  prompt: string,
  userAnswer: string,
  taskType: 1 | 2
): Promise<Feedback> {
  try {
    console.log('Assessing writing with Gemini...', {prompt, userAnswerLength: userAnswer.length});
    
    if (!prompt || !userAnswer.trim()) {
      console.error('Invalid input for writing assessment');
      throw new Error('Missing prompt or essay content');
    }
    
    // Call Gemini API for evaluation
    const geminiResponse = await evaluateWritingWithGemini(prompt, userAnswer, taskType);
    console.log('Raw Gemini response received:', geminiResponse.substring(0, 200) + '...');
    
    try {
      // Try different approaches to parse the response as JSON
      let parsedResponse;
      try {
        // First try direct parsing
        parsedResponse = JSON.parse(geminiResponse);
      } catch (initialParseError) {
        console.log("Initial JSON parsing failed, trying alternative methods...");
        
        // Look for a JSON object in the response string
        const jsonMatch = geminiResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            parsedResponse = JSON.parse(jsonMatch[0]);
            console.log("Successfully extracted JSON from response");
          } catch (extractError) {
            console.error("Failed to parse extracted JSON:", extractError);
            throw initialParseError;
          }
        } else {
          throw initialParseError;
        }
      }
      
      // Validate the response has the expected structure
      if (!parsedResponse.criteria || !Array.isArray(parsedResponse.criteria) || 
          parsedResponse.criteria.length === 0 || typeof parsedResponse.overallScore !== 'number') {
        console.error('Invalid Gemini response structure:', parsedResponse);
        throw new Error('Invalid response structure');
      }
      
      return parsedResponse;
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError, 'Raw response:', geminiResponse);
      // If parsing fails, return a fallback response
      return mockAIResponse(taskType);
    }
  } catch (error) {
    console.error('Error assessing writing task:', error);
    // Fallback to mock response in case of error
    return mockAIResponse(taskType);
  }
}

export async function assessSpeakingResponse(
  question: string,
  transcription: string
): Promise<Feedback> {
  try {
    console.log('Assessing speaking with Gemini...', {question, transcriptionLength: transcription.length});
    
    if (!question || !transcription.trim()) {
      console.error('Invalid input for speaking assessment');
      throw new Error('Missing question or transcription content');
    }
    
    // Call Gemini API for evaluation
    const geminiResponse = await evaluateSpeakingWithGemini(question, transcription);
    console.log('Raw Gemini response received:', geminiResponse.substring(0, 200) + '...');
    
    try {
      // Try different approaches to parse the response as JSON
      let parsedResponse;
      try {
        // First try direct parsing
        parsedResponse = JSON.parse(geminiResponse);
      } catch (initialParseError) {
        console.log("Initial JSON parsing failed, trying alternative methods...");
        
        // Look for a JSON object in the response string
        const jsonMatch = geminiResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            parsedResponse = JSON.parse(jsonMatch[0]);
            console.log("Successfully extracted JSON from response");
          } catch (extractError) {
            console.error("Failed to parse extracted JSON:", extractError);
            throw initialParseError;
          }
        } else {
          throw initialParseError;
        }
      }
      
      // Validate the response has the expected structure
      if (!parsedResponse.criteria || !Array.isArray(parsedResponse.criteria) || 
          parsedResponse.criteria.length === 0 || typeof parsedResponse.overallScore !== 'number') {
        console.error('Invalid Gemini response structure:', parsedResponse);
        throw new Error('Invalid response structure');
      }
      
      return parsedResponse;
    } catch (parseError) {
      console.error('Error parsing Gemini response:', parseError, 'Raw response:', geminiResponse);
      // If parsing fails, return a fallback response
      return mockSpeakingAIResponse();
    }
  } catch (error) {
    console.error('Error assessing speaking response:', error);
    // Fallback to mock response in case of error
    return mockSpeakingAIResponse();
  }
}

export async function generateOverallAnalysis(sectionScores: {
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
}): Promise<{
  overallBandScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string;
}> {
  try {
    // Call the Gemini API for overall analysis
    console.log('Generating overall analysis with Gemini...', sectionScores);
    
    // Calculate overall band score (rounded to nearest 0.5) as fallback
    const sum = sectionScores.listening + sectionScores.reading + sectionScores.writing + sectionScores.speaking;
    const average = sum / 4;
    const fallbackScore = Math.round(average * 2) / 2;
    
    // Call Gemini API for evaluation
    const geminiResponse = await evaluateOverallResultsWithGemini(sectionScores);
    console.log('Raw Gemini overall analysis response:', geminiResponse.substring(0, 200) + '...');
    
    try {
      // Try different approaches to parse the response as JSON
      let parsedResponse;
      try {
        // First try direct parsing
        parsedResponse = JSON.parse(geminiResponse);
      } catch (initialParseError) {
        console.log("Initial JSON parsing failed, trying alternative methods...");
        
        // Look for a JSON object in the response string
        const jsonMatch = geminiResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            parsedResponse = JSON.parse(jsonMatch[0]);
            console.log("Successfully extracted JSON from response");
          } catch (extractError) {
            console.error("Failed to parse extracted JSON:", extractError);
            throw initialParseError;
          }
        } else {
          throw initialParseError;
        }
      }
      
      // Validate the response has the expected structure
      if (typeof parsedResponse.overallBandScore !== 'number' || 
          !Array.isArray(parsedResponse.strengths) || 
          !Array.isArray(parsedResponse.weaknesses) ||
          typeof parsedResponse.recommendations !== 'string') {
        console.error('Invalid Gemini response structure for overall analysis:', parsedResponse);
        throw new Error('Invalid response structure');
      }
      
      return {
        overallBandScore: parsedResponse.overallBandScore,
        strengths: parsedResponse.strengths,
        weaknesses: parsedResponse.weaknesses,
        recommendations: parsedResponse.recommendations
      };
    } catch (parseError) {
      console.error('Error parsing Gemini overall analysis response:', parseError);
      // If parsing fails, return a fallback response
      return mockOverallAnalysis(sectionScores, fallbackScore);
    }
  } catch (error) {
    console.error('Error generating overall analysis:', error);
    
    // Calculate overall band score (rounded to nearest 0.5)
    const sum = sectionScores.listening + sectionScores.reading + sectionScores.writing + sectionScores.speaking;
    const average = sum / 4;
    const rounded = Math.round(average * 2) / 2;
    
    // Fallback to mock response in case of error
    return mockOverallAnalysis(sectionScores, rounded);
  }
}

// Mock responses for demo purposes
function mockAIResponse(taskType: 1 | 2): Feedback {
  if (taskType === 1) {
    return {
      criteria: [
        {
          name: 'Task Achievement',
          score: 6.5,
          feedback: 'The response covers the main trends in the graph but could include more specific data points and comparisons between the countries. Some key features of the data are missing.'
        },
        {
          name: 'Coherence and Cohesion',
          score: 7,
          feedback: 'The response has a clear structure with appropriate paragraphing. Cohesive devices are used effectively, though there are some instances where the flow could be improved.'
        },
        {
          name: 'Lexical Resource',
          score: 7.5,
          feedback: 'Good range of vocabulary related to trends and statistics. Some sophisticated vocabulary is used accurately, with only occasional errors in word form.'
        },
        {
          name: 'Grammatical Range and Accuracy',
          score: 6.5,
          feedback: 'A mix of complex and simple structures are used with generally good control. There are some errors with complex structures and tense consistency.'
        }
      ],
      overallScore: 6.5,
      strengths: [
        'Good vocabulary for describing trends',
        'Clear organization of information',
        'Effective use of cohesive devices'
      ],
      weaknesses: [
        'Missing some key features of the data',
        'Some grammatical errors with complex structures',
        'Limited use of specific data points'
      ],
      recommendations: 'Practice identifying and reporting all key features in graphical data. Review complex grammatical structures, especially when making comparisons between data points. Include more specific figures from the data to support your observations.'
    };
  } else {
    return {
      criteria: [
        {
          name: 'Task Response',
          score: 7,
          feedback: 'The essay addresses both views and provides your opinion. The arguments are generally well-developed, though some points could be supported with more specific examples.'
        },
        {
          name: 'Coherence and Cohesion',
          score: 7.5,
          feedback: 'The essay is well-organized with clear paragraphing and good use of linking words. Ideas progress logically throughout the essay, with effective use of referencing.'
        },
        {
          name: 'Lexical Resource',
          score: 7,
          feedback: 'Good range of vocabulary related to education and economics. Some less common vocabulary items are used effectively, with only occasional errors in word choice.'
        },
        {
          name: 'Grammatical Range and Accuracy',
          score: 6.5,
          feedback: 'A mix of complex and simple sentences with generally good control. There are some errors in more complex structures which occasionally cause confusion.'
        }
      ],
      overallScore: 7,
      strengths: [
        'Clear presentation of arguments for both sides',
        'Well-organized essay structure',
        'Good use of academic vocabulary'
      ],
      weaknesses: [
        'Some arguments lack specific examples',
        'Occasional errors in complex grammar structures',
        'Conclusion could be more decisive'
      ],
      recommendations: 'Strengthen your arguments by including more specific examples or case studies. Practice writing complex sentences with greater accuracy. Consider developing a more definitive conclusion that clearly restates your position.'
    };
  }
}

function mockSpeakingAIResponse(): Feedback {
  return {
    criteria: [
      {
        name: 'Fluency and Coherence',
        score: 6.5,
        feedback: 'You speak at a reasonable pace with some hesitation. Ideas are generally connected but sometimes rely on repetition and self-correction. Occasional lapses in coherence when discussing more complex topics.'
      },
      {
        name: 'Lexical Resource',
        score: 7,
        feedback: 'Good range of vocabulary with some flexibility and precision. You attempt to use less common vocabulary but with some inaccuracies. Good use of idiomatic expressions in familiar topics.'
      },
      {
        name: 'Grammatical Range and Accuracy',
        score: 6.5,
        feedback: 'Mix of complex and simple structures used with reasonable accuracy. Some errors persist, particularly in complex structures, but these rarely impede communication.'
      },
      {
        name: 'Pronunciation',
        score: 7,
        feedback: 'Generally clear pronunciation with some effective use of intonation and stress. There are some issues with certain sounds and occasional mispronunciations, but these don\'t significantly affect understanding.'
      }
    ],
    overallScore: 6.5,
    strengths: [
      'Good use of idiomatic expressions',
      'Effective vocabulary for topic development',
      'Clear pronunciation of most words'
    ],
    weaknesses: [
      'Hesitation when discussing complex topics',
      'Some errors in complex grammatical structures',
      'Occasional pronunciation issues with specific sounds'
    ],
    recommendations: 'Practice speaking at length about complex topics to reduce hesitation. Record yourself speaking and identify patterns of grammatical errors to work on. Focus on the specific pronunciation issues identified, particularly with certain vowel sounds.'
  };
}

// New function for fallback mock overall analysis
function mockOverallAnalysis(
  sectionScores: {
    listening: number;
    reading: number;
    writing: number;
    speaking: number;
  },
  overallScore: number
): {
  overallBandScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string;
} {
  const { listening, reading, writing, speaking } = sectionScores;
  
  let strengths: string[] = [];
  let weaknesses: string[] = [];
  
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
  let recommendations = '';
  if (overallScore >= 7.5) {
    recommendations = 'Your English proficiency is very good. Focus on refining specific aspects of your language skills to aim for band 8+. Consider advanced vocabulary and complex grammatical structures.';
  } else if (overallScore >= 6.5) {
    recommendations = 'You have demonstrated competent English skills suitable for most academic and professional contexts. To improve, focus on the specific areas identified in your section feedback.';
  } else {
    recommendations = 'Continue developing your English skills through regular practice. Focus particularly on your areas of weakness and expose yourself to a variety of English contexts daily.';
  }
  
  return {
    overallBandScore: overallScore,
    strengths,
    weaknesses,
    recommendations
  };
}
