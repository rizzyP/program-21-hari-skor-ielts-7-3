
// OpenRouter API service to access Gemini 2.0 Flash
const OPENROUTER_API_KEY = "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";
const SITE_URL = window.location.origin;
const SITE_NAME = "IELTS Practice Test";

interface MessageContent {
  type: 'text' | 'image_url';
  text?: string;
  image_url?: {
    url: string;
  };
}

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string | MessageContent[];
}

interface GeminiResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export const callGemini = async (messages: Message[]): Promise<string> => {
  try {
    // Log the request for debugging
    console.log("Calling OpenRouter API with messages:", JSON.stringify(messages));
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": SITE_URL,
        "X-Title": SITE_NAME,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-flash-exp:free",  // Using the free model
        "messages": messages
      })
    });

    if (!response.ok) {
      const errorData = await response.text(); // Get the error response as text
      console.error("Gemini API error:", errorData, "Status:", response.status);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    
    // Extract the content and sanitize it
    const content = data.choices[0].message.content;
    
    // Clean up the response - remove any backtick formatting that might be causing JSON parse errors
    let cleanedContent = content;
    
    // Check if the content is wrapped in markdown code blocks and remove them
    const jsonBlockRegex = /```(?:json)?\s*([\s\S]*?)```/;
    const match = jsonBlockRegex.exec(content);
    
    if (match && match[1]) {
      cleanedContent = match[1].trim();
      console.log("Extracted JSON from code block:", cleanedContent.substring(0, 100) + "...");
    }
    
    return cleanedContent;
  } catch (error) {
    console.error("Error calling Gemini:", error);
    throw error;
  }
}

// Function to evaluate writing responses
export const evaluateWritingWithGemini = async (
  prompt: string, 
  userAnswer: string,
  taskType: 1 | 2
): Promise<string> => {
  const systemPrompt = taskType === 1
    ? `Analyze this IELTS Writing Task 1 response based on official IELTS criteria. 
       Provide scores (1-9) and detailed feedback for: Task Achievement, Coherence and Cohesion, 
       Lexical Resource, and Grammatical Range and Accuracy.`
    : `Analyze this IELTS Writing Task 2 response based on official IELTS criteria. 
       Provide scores (1-9) and detailed feedback for: Task Response, Coherence and Cohesion, 
       Lexical Resource, and Grammatical Range and Accuracy.`;
  
  const messages: Message[] = [
    {
      role: 'system',
      content: systemPrompt
    },
    {
      role: 'user',
      content: `Task prompt: ${prompt}\n\nUser's response: ${userAnswer}\n\nPlease provide a detailed evaluation with individual scores for each criterion, an overall band score, strengths, weaknesses, and recommendations for improvement. Format the response as JSON with these keys: criteria (array of {name, score, feedback}), overallScore, strengths (array), weaknesses (array), recommendations.`
    }
  ];
  
  return await callGemini(messages);
}

// Function to evaluate speaking responses
export const evaluateSpeakingWithGemini = async (
  question: string,
  transcription: string
): Promise<string> => {
  const systemPrompt = `Analyze this IELTS Speaking response based on official IELTS criteria. 
                        Provide scores (1-9) and detailed feedback for: Fluency and Coherence, 
                        Lexical Resource, Grammatical Range and Accuracy, and Pronunciation.`;
  
  const messages: Message[] = [
    {
      role: 'system',
      content: systemPrompt
    },
    {
      role: 'user',
      content: `Question: ${question}\n\nTranscribed response: ${transcription}\n\nPlease provide a detailed evaluation with individual scores for each criterion, an overall band score, strengths, weaknesses, and recommendations for improvement. Format the response as JSON with these keys: criteria (array of {name, score, feedback}), overallScore, strengths (array), weaknesses (array), recommendations.`
    }
  ];
  
  return await callGemini(messages);
}

// Function to transcribe audio (simulated for now)
export const transcribeAudioWithGemini = async (prompt: string): Promise<string> => {
  // In a real implementation, this would upload the audio file to a service that can transcribe it
  // For now, we'll simulate this with a text prompt to Gemini
  const messages: Message[] = [
    {
      role: 'user',
      content: `Simulate transcription for an IELTS speaking test response to this question: ${prompt}. Create a realistic response that a test-taker might give, including natural hesitations and language patterns typical of a spoken response.`
    }
  ];
  
  return await callGemini(messages);
}
