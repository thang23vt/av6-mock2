import { Button } from "@/components/ui/button";
import { QuizState } from "@/types/quiz";

interface QuizResultsProps {
  state: QuizState;
  totalQuestions: number;
  onRestart: () => void;
}

const QuizResults = ({ state, totalQuestions, onRestart }: QuizResultsProps) => {
  const correctAnswers = Object.values(state.answers).filter(answer => answer.correct).length;
  const incorrectAnswers = Object.values(state.answers).filter(answer => !answer.correct).length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const getResultMessage = () => {
    if (percentage >= 90) return "Excellent! Amazing work!";
    if (percentage >= 70) return "Great job! You did well!";
    if (percentage >= 50) return "Good effort! Keep practicing!";
    return "Keep studying and try again!";
  };

  return (
    <section className="bg-white rounded-xl shadow-md p-6 mb-8 transition-all">
      <h2 className="text-2xl font-bold mb-4 text-center">Quiz Results</h2>
      <div className="flex justify-center mb-6">
        <div className="w-32 h-32 rounded-full flex items-center justify-center text-3xl font-bold bg-primary-50 text-primary border-4 border-primary">
          <span>{percentage}%</span>
        </div>
      </div>
      <div className="text-center mb-6">
        <p className="text-lg">{getResultMessage()}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Correct Answers</h3>
          <p className="text-green-600 font-bold text-xl">{correctAnswers}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Incorrect Answers</h3>
          <p className="text-red-600 font-bold text-xl">{incorrectAnswers}</p>
        </div>
      </div>
      <div className="flex justify-center">
        <Button 
          onClick={onRestart} 
          className="bg-primary hover:bg-primary/90 px-6 py-6 text-base font-medium"
        >
          Restart Quiz
        </Button>
      </div>
    </section>
  );
};

export default QuizResults;
