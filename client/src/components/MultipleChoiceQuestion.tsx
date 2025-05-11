import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";
import { MultipleChoiceQuestion as MCQuestion, QuizAnswer } from "@/types/quiz";

interface MultipleChoiceQuestionProps {
  question: MCQuestion;
  onAnswer: (questionId: number, answer: QuizAnswer) => void;
  onNext: () => void;
}

const MultipleChoiceQuestion = ({ 
  question, 
  onAnswer,
  onNext
}: MultipleChoiceQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleOptionChange = (value: string) => {
    if (!isAnswered) {
      setSelectedOption(value);
    }
  };

  const handleSubmit = () => {
    if (!selectedOption) return;

    const correct = selectedOption === question.correctAnswer;
    setIsCorrect(correct);
    setIsAnswered(true);

    onAnswer(question.id, {
      correct,
      selected: selectedOption,
      correctAnswer: question.correctAnswer
    });
  };

  const getOptionClassName = (optionId: string) => {
    if (!isAnswered) return "border border-gray-200 p-3 rounded-lg hover:bg-gray-50 transition";
    
    if (optionId === question.correctAnswer) {
      return "border border-green-500 bg-green-50 p-3 rounded-lg";
    }
    
    if (optionId === selectedOption && optionId !== question.correctAnswer) {
      return "border border-red-500 bg-red-50 p-3 rounded-lg";
    }
    
    return "border border-gray-200 p-3 rounded-lg";
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
        <p className="mb-4">{question.question}</p>
        <RadioGroup 
          value={selectedOption || ""} 
          onValueChange={handleOptionChange}
          className="space-y-3"
        >
          {question.options.map((option) => (
            <div 
              key={option.id} 
              className={getOptionClassName(option.id)}
            >
              <div className="flex items-center">
                <RadioGroupItem 
                  value={option.id} 
                  id={`option-${question.id}-${option.id}`} 
                  disabled={isAnswered}
                  className="h-4 w-4 text-primary"
                />
                <Label 
                  htmlFor={`option-${question.id}-${option.id}`}
                  className="ml-3 flex-1 cursor-pointer"
                >
                  {option.id}: {option.text}
                </Label>
                {isAnswered && (
                  <span className="ml-auto">
                    {option.id === question.correctAnswer && (
                      <Check className="h-5 w-5 text-green-600" />
                    )}
                    {option.id === selectedOption && option.id !== question.correctAnswer && (
                      <X className="h-5 w-5 text-red-600" />
                    )}
                  </span>
                )}
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="px-6 py-4 border-t border-gray-100">
        {!isAnswered ? (
          <Button 
            onClick={handleSubmit}
            disabled={!selectedOption}
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
                  <span>
                    Incorrect. The correct answer is:{" "}
                    <span className="font-medium">
                      {question.correctAnswer}: {question.options.find(o => o.id === question.correctAnswer)?.text}
                    </span>
                  </span>
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

export default MultipleChoiceQuestion;
