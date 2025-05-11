import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { LockKeyhole, Unlock } from "lucide-react";
import { Question } from "@/types/quiz";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AdminPanelProps {
  questions: Question[];
  isAdminMode: boolean;
  toggleAdminMode: () => void;
  onQuestionUpdated: () => void;
}

const AdminPanel = ({ 
  questions, 
  isAdminMode, 
  toggleAdminMode,
  onQuestionUpdated
}: AdminPanelProps) => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>("");
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const { toast } = useToast();

  // Reset selected answer when question changes
  useEffect(() => {
    if (selectedQuestionId) {
      const question = questions.find(q => q.id.toString() === selectedQuestionId);
      if (question) {
        if (question.type === 'multipleChoice') {
          setSelectedAnswer(question.correctAnswer);
        } else if (question.type === 'dragDrop' && question.correctAnswer.length > 0) {
          setSelectedAnswer(question.correctAnswer[0]);
        }
      }
    } else {
      setSelectedAnswer("");
    }
  }, [selectedQuestionId, questions]);

  const handleQuestionSelect = (value: string) => {
    setSelectedQuestionId(value);
  };

  const handleSaveChanges = async () => {
    if (!selectedQuestionId || !selectedAnswer) {
      toast({
        title: "Error",
        description: "Please select a question and answer",
        variant: "destructive",
      });
      return;
    }

    try {
      const question = questions.find(q => q.id.toString() === selectedQuestionId);
      if (!question) return;

      const updateData = question.type === 'multipleChoice' 
        ? { correctAnswer: selectedAnswer } 
        : { correctAnswer: [selectedAnswer] };

      await apiRequest("PATCH", `/api/questions/${selectedQuestionId}`, updateData);
      
      toast({
        title: "Success",
        description: `Answer for question ${selectedQuestionId} updated successfully`,
        variant: "default",
      });

      onQuestionUpdated();
    } catch (error) {
      console.error("Error updating question:", error);
      toast({
        title: "Error",
        description: "Failed to update question",
        variant: "destructive",
      });
    }
  };

  const renderAnswerEditor = () => {
    if (!selectedQuestionId) return null;

    const question = questions.find(q => q.id.toString() === selectedQuestionId);
    if (!question) return null;

    if (question.type === 'multipleChoice') {
      return (
        <div className="mt-3">
          <p className="text-sm font-medium mb-2">{question.question}</p>
          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} className="space-y-2">
            {question.options.map(option => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                <Label htmlFor={`option-${option.id}`} className="cursor-pointer">
                  {option.id}: {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      );
    } else if (question.type === 'dragDrop') {
      return (
        <div className="mt-3">
          <p className="text-sm font-medium mb-2">{question.sentence}</p>
          <Select value={selectedAnswer} onValueChange={setSelectedAnswer}>
            <SelectTrigger>
              <SelectValue placeholder="Select correct answer" />
            </SelectTrigger>
            <SelectContent>
              {question.options.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="fixed top-4 right-4 z-10">
      <Button
        variant={isAdminMode ? "default" : "secondary"}
        className={`flex items-center space-x-2 ${isAdminMode ? "bg-primary text-white" : "bg-gray-800 text-white"}`}
        onClick={toggleAdminMode}
      >
        {isAdminMode ? <Unlock size={16} /> : <LockKeyhole size={16} />}
        <span>{isAdminMode ? "Admin Mode: ON" : "Admin Mode"}</span>
      </Button>

      {isAdminMode && (
        <div className="bg-white p-4 mt-2 rounded-lg shadow-lg border border-gray-200">
          <h3 className="font-semibold text-lg mb-2">Admin Controls</h3>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Edit Question:</label>
            <Select value={selectedQuestionId} onValueChange={handleQuestionSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select a question" />
              </SelectTrigger>
              <SelectContent>
                {questions.map(question => (
                  <SelectItem key={question.id} value={question.id.toString()}>
                    Q{question.id}: {question.type === 'multipleChoice' 
                      ? question.question.substring(0, 30) 
                      : question.sentence.substring(0, 30)}
                    {(question.question?.length > 30 || question.sentence?.length > 30) ? '...' : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Correct Answer:</label>
            {renderAnswerEditor()}
          </div>
          <div className="flex justify-end">
            <Button 
              onClick={handleSaveChanges}
              disabled={!selectedQuestionId || !selectedAnswer}
              className="bg-primary hover:bg-primary/90"
            >
              Save Changes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
