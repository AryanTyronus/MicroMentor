export enum ContentType {
  TEXT = 'text',
  CODE = 'code',
  VIDEO = 'video',
}

export interface ContentBlock {
  id: string;
  type: ContentType;
  value: string;
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple-choice',
  SHORT_ANSWER = 'short-answer',
}

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  options?: string[];
  correctAnswer: string;
}

export interface Quiz {
  id:string;
  questions: Question[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  author: string;
  content: ContentBlock[];
  quiz: Quiz;
}
