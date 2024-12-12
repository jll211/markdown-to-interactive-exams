import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { parseMarkdown } from "@/utils/MarkdownParser";

interface ExamViewerProps {
  examContent: string;
  solutionContent?: string;
  onBack?: () => void;
}

const ExamViewer: React.FC<ExamViewerProps> = ({
  examContent,
  solutionContent,
  onBack,
}) => {
  const [showSolution, setShowSolution] = useState(false);

  const toggleSolution = () => {
    setShowSolution(!showSolution);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück
        </Button>
        {solutionContent && (
          <Button variant="outline" size="sm" onClick={toggleSolution}>
            {showSolution ? "Lösung ausblenden" : "Lösung anzeigen"}
          </Button>
        )}
      </div>

      <Card className="p-6">
        <div className="prose max-w-none">
          <div className="markdown-content space-y-8">
            {parseMarkdown(examContent)}
          </div>
        </div>

        {showSolution && solutionContent && (
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-4">Lösung</h3>
            <div className="markdown-content space-y-4">
              {parseMarkdown(solutionContent)}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ExamViewer;