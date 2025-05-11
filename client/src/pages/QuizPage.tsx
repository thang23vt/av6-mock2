import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Question, QuizState, QuizAnswer } from "@/types/quiz";
import QuizHeader from "@/components/QuizHeader";
import MultipleChoiceQuestion from "@/components/MultipleChoiceQuestion";
import DragDropQuestion from "@/components/DragDropQuestion";
import QuizResults from "@/components/QuizResults";
import AdminPanel from "@/components/AdminPanel";
import { useToast } from "@/hooks/use-toast";

const QuizPage = () => {
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    answers: {},
    isAdminMode: false,
    quizStarted: false,
    quizCompleted: false
  });

  const { toast } = useToast();

  const { data: questions, refetch } = useQuery<Question[]>({
    queryKey: ['/api/questions'],
    placeholderData: [],
  });
  
  // Ensure questions is always an array
  const quizQuestions: Question[] = questions || [];

  const handleStartQuiz = () => {
    setState(prev => ({
      ...prev,
      quizStarted: true,
      currentQuestionIndex: 0,
      score: 0,
      answers: {},
      quizCompleted: false
    }));
  };

  const handleAnswer = (questionId: number, answer: QuizAnswer) => {
    setState(prev => ({
      ...prev,
      score: answer.correct ? prev.score + 1 : prev.score,
      answers: {
        ...prev.answers,
        [questionId]: answer
      }
    }));
  };

  const handleNextQuestion = () => {
    const nextIndex = state.currentQuestionIndex + 1;
    
    if (nextIndex >= questions.length) {
      setState(prev => ({
        ...prev,
        quizCompleted: true
      }));
    } else {
      setState(prev => ({
        ...prev,
        currentQuestionIndex: nextIndex
      }));
    }
  };

  const handleRestartQuiz = () => {
    setState({
      currentQuestionIndex: 0,
      score: 0,
      answers: {},
      isAdminMode: state.isAdminMode,
      quizStarted: true,
      quizCompleted: false
    });
  };

  const toggleAdminMode = () => {
    setState(prev => ({
      ...prev,
      isAdminMode: !prev.isAdminMode
    }));
  };

  const handleQuestionUpdated = () => {
    refetch();
  };

  useEffect(() => {
    if (questions.length === 0) {
      toast({
        title: "Loading questions",
        description: "Please wait while we load the quiz questions.",
      });
    }
  }, [toast, questions.length]);

  const currentQuestion = questions[state.currentQuestionIndex];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <AdminPanel 
        questions={questions} 
        isAdminMode={state.isAdminMode} 
        toggleAdminMode={toggleAdminMode} 
        onQuestionUpdated={handleQuestionUpdated}
      />

      <QuizHeader state={state} totalQuestions={questions.length} />

      <main>
        {!state.quizStarted && (
          <section className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">MOCK TEST 1</h2>
            <div className="mb-4 text-sm text-gray-700">
              <p className="font-medium mb-2">Bài kiểm tra gồm các phần:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Câu 1-4: Nghe ghi âm và quyết định xem các câu này đúng hay sai.</li>
                <li>Câu 5-8: Nghe ghi âm hai lần và chọn tùy chọn tốt nhất A, B, C, hoặc D để hoàn thành mỗi câu.</li>
                <li>Câu 9-12: Câu hỏi trắc nghiệm cơ bản.</li>
                <li>Câu 13-16: Đọc đoạn văn và điền từ thích hợp vào chỗ trống.</li>
                <li>Câu 17-20: Đọc đoạn văn và trả lời câu hỏi.</li>
              </ul>
            </div>
            <p className="mb-6">Với mỗi câu hỏi, bạn sẽ nhận được phản hồi ngay lập tức sau khi trả lời. Các câu hỏi kéo thả tương tự như Duolingo.</p>
            <Button 
              onClick={handleStartQuiz} 
              className="bg-primary hover:bg-primary/90 px-6 py-6 text-base font-medium"
            >
              Bắt đầu làm bài
            </Button>
          </section>
        )}

        {state.quizStarted && !state.quizCompleted && (
          <div>
            {currentQuestion && currentQuestion.type === 'multipleChoice' && (
              <MultipleChoiceQuestion 
                question={currentQuestion} 
                onAnswer={handleAnswer}
                onNext={handleNextQuestion}
              />
            )}
            {currentQuestion && currentQuestion.type === 'dragDrop' && (
              <DragDropQuestion 
                question={currentQuestion} 
                onAnswer={handleAnswer}
                onNext={handleNextQuestion}
              />
            )}
          </div>
        )}

        {state.quizCompleted && (
          <QuizResults 
            state={state} 
            totalQuestions={questions.length} 
            onRestart={handleRestartQuiz} 
          />
        )}
      </main>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Interactive Learning Platform</p>
      </footer>
    </div>
  );
};

export default QuizPage;
