import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { DragDropQuestion as DDQuestion, QuizAnswer } from "@/types/quiz";
import { useDragDrop } from "@/utils/dragDrop";

interface DragDropQuestionProps {
  question: DDQuestion;
  onAnswer: (questionId: number, answer: QuizAnswer) => void;
  onNext: () => void;
}

const DragDropQuestion = ({ 
  question, 
  onAnswer,
  onNext
}: DragDropQuestionProps) => {
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const dropTargetRef = useRef<HTMLSpanElement>(null);
  const [filledAnswer, setFilledAnswer] = useState<string | null>(null);
  const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);

  const { 
    handleDragStart, 
    handleDragEnd, 
    handleDragOver, 
    handleDragLeave, 
    handleDrop,
    draggingItem,
    resetDragState
  } = useDragDrop({
    onItemDropped: (item: string) => {
      setFilledAnswer(item);
    }
  });

  const handleCheckAnswer = () => {
    if (!filledAnswer) return;

    const correct = question.correctAnswer.includes(filledAnswer);
    setIsCorrect(correct);
    setIsAnswered(true);

    onAnswer(question.id, {
      correct,
      selected: filledAnswer,
      correctAnswer: question.correctAnswer
    });
  };

  // Reset drag state when the question changes
  useEffect(() => {
    resetDragState();
    setIsAnswered(false);
    setIsCorrect(false);
    setFilledAnswer(null);
  }, [question.id, resetDragState]);

  // Render sentence with drop target
  const renderSentenceWithDropTarget = () => {
    const parts = question.sentence.split('____');
    
    return (
      <div className="sentence-container mb-6 text-lg">
        {parts[0]}
        <span
          ref={dropTargetRef}
          className={`drop-target inline-block min-w-[80px] mx-1 align-bottom rounded-md ${filledAnswer ? 'filled' : ''} ${isAnswered && isCorrect ? 'border-green-500 bg-green-50' : ''} ${isAnswered && !isCorrect ? 'border-red-500 bg-red-50' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, dropTargetRef.current)}
        >
          {filledAnswer && (
            <span 
              className={`draggable-item inline-block px-3 py-1.5 m-0.5 rounded-md font-medium ${isAnswered && isCorrect ? 'bg-green-100 text-green-700 border border-green-300' : ''} ${isAnswered && !isCorrect ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-primary-50 text-primary-700 border border-primary-200'}`}
            >
              {filledAnswer}
            </span>
          )}
        </span>
        {parts[1]}
      </div>
    );
  };

  return (
    <div className="question-card mb-8 bg-white rounded-xl shadow-md overflow-hidden transition-all">
      <div className="border-b border-gray-100 px-6 py-4 bg-gray-50">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium">Question {question.id}</h3>
          {isAnswered && (
            <span className={isCorrect ? "text-green-600" : "text-red-600"}>
              {isCorrect ? "Correct" : "Incorrect"}
            </span>
          )}
        </div>
      </div>
      <div className="px-6 py-4">
        <p className="mb-4">{question.instruction}</p>
        {renderSentenceWithDropTarget()}
        
        <div className="draggable-items-container flex flex-wrap gap-2">
          {shuffledOptions.map((option, index) => (
            <div
              key={index}
              className={`draggable-item bg-primary-50 text-primary-700 px-3 py-1.5 rounded-md border border-primary-200 font-medium inline-block select-none ${draggingItem === option ? 'dragging' : ''} ${filledAnswer === option ? 'hidden' : ''} ${isAnswered ? 'pointer-events-none opacity-70' : ''}`}
              draggable={!isAnswered}
              onDragStart={(e) => handleDragStart(e, option)}
              onDragEnd={handleDragEnd}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 py-4 mt-4 border-t border-gray-100">
        {!isAnswered ? (
          <Button
            onClick={handleCheckAnswer}
            disabled={!filledAnswer}
            className="bg-primary hover:bg-primary/90"
          >
            Check Answer
          </Button>
        ) : (
          <div>
            <div className={`flex items-center mb-4 ${isCorrect ? "text-green-600" : "text-red-600"}`}>
              {isCorrect ? (
                <>
                  <Check className="mr-2" />
                  <span>Correct! Well done.</span>
                </>
              ) : (
                <>
                  <X className="mr-2" />
                  <div>
                    <p>Incorrect. The correct answer is:</p>
                    <div className="mt-2 p-2 bg-gray-50 rounded">
                      {question.sentence.split('____')[0]}
                      <span className="font-bold text-green-600">{question.correctAnswer[0]}</span>
                      {question.sentence.split('____')[1]}
                    </div>
                  </div>
                </>
              )}
            </div>
            <Button 
              onClick={onNext}
              className="bg-primary hover:bg-primary/90"
            >
              Next Question
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DragDropQuestion;
