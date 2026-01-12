export interface Option {
  id: string;
  text: string;
  value: number;
}

export interface Question {
  id: string;
  text: string;
  type: 'single-choice';
  options: Option[];
}

export interface Result {
  id: string;
  name: string;
  emoji: string;
  minScore: number;
  maxScore: number;
  description: string;
  insights: string[];
  recommendations: string[];
}

export interface Test {
  id: string;
  title: string;
  emoji: string;
  badge?: 'HOT' | 'NEW' | 'LIMITED';
  description: string;
  questionCount: number;
  participantCount: number;
  questions: Question[];
  results: Result[];
}

export interface HistoryEntry {
  id: string; // Unique ID for the history entry itself
  testId: string;
  testTitle: string;
  resultId: string;
  timestamp: number;
  resultData: {
    name: string;
    emoji: string;
    description: string;
    score: number;
  };
}