
import { UserAnswer, Feedback } from '@/types/test';

// Replace with your actual OpenAI API key or environment variable
const API_KEY = 'your-openai-api-key';

export async function assessWritingTask(
  prompt: string,
  userAnswer: string,
  taskType: 1 | 2
): Promise<Feedback> {
  try {
    const systemPrompt = taskType === 1
      ? `Analyze this IELTS Writing Task 1 response based on official IELTS criteria. 
         Provide scores (1-9) and detailed feedback for: Task Achievement, Coherence and Cohesion, 
         Lexical Resource, and Grammatical Range and Accuracy.`
      : `Analyze this IELTS Writing Task 2 response based on official IELTS criteria. 
         Provide scores (1-9) and detailed feedback for: Task Response, Coherence and Cohesion, 
         Lexical Resource, and Grammatical Range and Accuracy.`;
    
    // In a production app, this would make a real API call to OpenAI
    console.log('Assessing writing with AI...', {prompt, userAnswer});
    
    // This is a mock response for demonstration purposes
    // In a real app, you would call the OpenAI API here
    return mockAIResponse(taskType);
  } catch (error) {
    console.error('Error assessing writing task:', error);
    throw new Error('Failed to assess writing task');
  }
}

export async function assessSpeakingResponse(
  question: string,
  transcription: string
): Promise<Feedback> {
  try {
    const systemPrompt = `Analyze this IELTS Speaking response based on official IELTS criteria. 
                          Provide scores (1-9) and detailed feedback for: Fluency and Coherence, 
                          Lexical Resource, Grammatical Range and Accuracy, and Pronunciation.`;
    
    // In a production app, this would make a real API call to OpenAI
    console.log('Assessing speaking with AI...', {question, transcription});
    
    // This is a mock response for demonstration purposes
    return mockSpeakingAIResponse();
  } catch (error) {
    console.error('Error assessing speaking response:', error);
    throw new Error('Failed to assess speaking response');
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
    // In a production app, this would make a real API call to OpenAI
    console.log('Generating overall analysis...', sectionScores);
    
    // Calculate overall band score (rounded to nearest 0.5)
    const sum = sectionScores.listening + sectionScores.reading + sectionScores.writing + sectionScores.speaking;
    const average = sum / 4;
    const rounded = Math.round(average * 2) / 2;
    
    // This is a mock response for demonstration purposes
    return {
      overallBandScore: rounded,
      strengths: [
        'Strong vocabulary usage in speaking and writing',
        'Good comprehension skills demonstrated in reading test',
        'Effective organization of ideas in written responses'
      ],
      weaknesses: [
        'Grammar accuracy needs improvement, especially in complex sentences',
        'Listening comprehension of specific details could be enhanced',
        'Task 1 writing requires more data analysis and comparison'
      ],
      recommendations: 'Focus on improving grammar by practicing with complex sentence structures. Enhance listening skills by regularly practicing with various accents. For writing task 1, practice describing trends and making comparisons between data points. Consider dedicating 30 minutes daily to targeted practice in your weakest areas.'
    };
  } catch (error) {
    console.error('Error generating overall analysis:', error);
    throw new Error('Failed to generate overall analysis');
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
