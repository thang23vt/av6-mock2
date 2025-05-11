import { useState, useEffect } from "react";
import { QuizState } from "@/types/quiz";

interface QuizHeaderProps {
  state: QuizState;
  totalQuestions: number;
}

const QuizHeader = ({ state, totalQuestions }: QuizHeaderProps) => {
  const [progressWidth, setProgressWidth] = useState("0%");

  useEffect(() => {
    const progress = state.quizCompleted
      ? "100%"
      : `${(state.currentQuestionIndex / totalQuestions) * 100}%`;
    setProgressWidth(progress);
  }, [state.currentQuestionIndex, totalQuestions, state.quizCompleted]);

  if (!state.quizStarted) {
    return null;
  }

  return (
    <header className="mb-8 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Nền tảng trắc nghiệm tương tác</h1>
      <p className="text-gray-600">Hoàn thành các câu hỏi trắc nghiệm và bài tập kéo thả</p>
      
      <div className="mt-6 mb-4 max-w-md mx-auto">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Câu hỏi {state.currentQuestionIndex + 1} / {totalQuestions}</span>
          <span>Điểm: {state.score}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary h-2.5 rounded-full transition-all duration-300" 
            style={{ width: progressWidth }}
          ></div>
        </div>
      </div>
    </header>
  );
};

export default QuizHeader;
