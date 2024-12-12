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
        className="mb-4"
        onClick={onBack}
        disabled={showResults}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Zurück
      </Button>

      <Card className="p-6">
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: marked(examContent) }}
        />

        <div className="mt-6 space-y-4">
          {/* Beispiel für eine Frage - In der vollständigen Implementierung würden hier die Fragen aus dem Markdown generiert */}
          <div className="space-y-2">
            <label className="block font-medium">Frage 1</label>
            <textarea
              className="w-full p-2 border rounded-md"
              rows={4}
              onChange={(e) => handleAnswerChange(1, e.target.value)}
              disabled={showResults}
            />
          </div>
        </div>

        {!showResults ? (
          <Button className="mt-6 w-full" size="lg" onClick={submitExam}>
            Prüfung abgeben
          </Button>
        ) : (
          <div className="mt-6 p-4 bg-green-50 rounded-md">
            <h3 className="font-semibold text-green-800">
              Prüfung wurde ausgewertet
            </h3>
            {/* Hier würde die Auswertung angezeigt */}
          </div>
        )}
      </Card>
    </div>
  );
};

export default ExamViewer;