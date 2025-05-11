export interface QuizOption {
  id: string;
  text: string;
}

export interface MultipleChoiceQuestion {
  id: number;
  type: 'multipleChoice';
  question: string;
  options: QuizOption[];
  correctAnswer: string;
}

export interface DragDropQuestion {
  id: number;
  type: 'dragDrop';
  instruction: string;
  sentence: string;
  options: string[];
  correctAnswer: string[];
}

export type Question = MultipleChoiceQuestion | DragDropQuestion;

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: Record<number, QuizAnswer>;
  isAdminMode: boolean;
  quizStarted: boolean;
  quizCompleted: boolean;
}

export interface QuizAnswer {
  correct: boolean;
  selected?: string;
  correctAnswer?: string | string[];
}
