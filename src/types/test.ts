
export interface IELTSTest {
  id: string;
  title: string;
  sections: TestSection[];
}

export interface TestSection {
  id: string;
  type: 'listening' | 'reading' | 'writing' | 'speaking';
  title: string;
  timeInMinutes: number;
  content: TestContent;
}

export type TestContent = 
  | ListeningContent
  | ReadingContent
  | WritingContent
  | SpeakingContent;

export interface ListeningContent {
  audioUrl: string;
  sections: ListeningSection[];
}

export interface ListeningSection {
  title: string;
  questions: ListeningQuestion[];
}

export type ListeningQuestion = {
  id: string;
  questionText: string;
  questionType: 'multiple-choice' | 'fill-in-blank' | 'matching';
} & (
  | {
      questionType: 'multiple-choice';
      options: string[];
      correctAnswer: string;
    }
  | {
      questionType: 'fill-in-blank';
      correctAnswer: string;
    }
  | {
      questionType: 'matching';
      options: string[];
      matches: string[];
      correctMatches: { [key: string]: string };
    }
);

export interface ReadingContent {
  passage: string;
  questions: ReadingQuestion[];
}

export type ReadingQuestion = {
  id: string;
  questionText: string;
  questionType: 'multiple-choice' | 'true-false-notgiven' | 'matching' | 'fill-in-blank';
} & (
  | {
      questionType: 'multiple-choice';
      options: string[];
      correctAnswer: string;
    }
  | {
      questionType: 'true-false-notgiven';
      correctAnswer: 'true' | 'false' | 'not given';
    }
  | {
      questionType: 'matching';
      options: string[];
      correctAnswer: string;
    }
  | {
      questionType: 'fill-in-blank';
      correctAnswer: string;
    }
);

export interface WritingContent {
  tasks: WritingTask[];
}

export interface WritingTask {
  id: string;
  taskNumber: 1 | 2;
  prompt: string;
  wordCount: number;
  timeInMinutes: number;
  resources?: string; // For Task 1, this could be a URL to an image (graph, chart, etc.)
}

export interface SpeakingContent {
  parts: SpeakingPart[];
}

export interface SpeakingPart {
  id: string;
  partNumber: 1 | 2 | 3;
  introduction: string;
  questions: string[];
  timeInMinutes: number;
  preparationTimeInSeconds?: number; // For part 2
}

export interface UserAnswer {
  questionId: string;
  userResponse: string;
}

export interface TestResult {
  testId: string;
  userId?: string;
  date: string;
  sections: SectionResult[];
  overallBandScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string;
}

export interface SectionResult {
  sectionType: 'listening' | 'reading' | 'writing' | 'speaking';
  bandScore: number;
  details?: any; // Specific feedback for each section
  userAnswers: UserAnswer[];
}

export interface Feedback {
  criteria: {
    name: string;
    score: number;
    feedback: string;
  }[];
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string;
}
