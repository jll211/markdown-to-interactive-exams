import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { marked } from "marked";

interface ExamViewerProps {
  examContent: string;
  solutionContent: string;
  onBack: () => void;
}

interface Answer {
  questionId: number;
  answer: string;
}

const ExamViewer = ({ examContent, solutionContent, onBack }: ExamViewerProps) => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === questionId);
      if (existing) {
        return prev.map((a) =>
          a.questionId === questionId ? { ...a, answer } : a
        );
      }
      return [...prev, { questionId, answer }];
    });
  };

  const submitExam = () => {
    setShowResults(true);
    console.log("Submitted answers:", answers);
    console.log("Solution content:", solutionContent);
  };

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        className="mb-4 text-gray-600 hover:text-gray-900"
        onClick={onBack}
        disabled={showResults}
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Zurück
      </Button>

      <Card className="p-8 bg-white shadow-lg">
        <div className="prose max-w-none">
          <div
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: marked(examContent) }}
          />
        </div>

        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-900">
              Antwort
            </label>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={6}
              onChange={(e) => handleAnswerChange(1, e.target.value)}
              disabled={showResults}
              placeholder="Geben Sie hier Ihre Antwort ein..."
            />
          </div>
        </div>

        {!showResults ? (
          <Button
            className="mt-8 w-full py-6 text-lg"
            size="lg"
            onClick={submitExam}
          >
            Prüfung abgeben
          </Button>
        ) : (
          <div className="mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Prüfung wurde ausgewertet
            </h3>
            <p className="text-green-700">
              Ihre Antworten wurden erfolgreich ausgewertet.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ExamViewer;