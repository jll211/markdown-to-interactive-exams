import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ExamUploader from "@/components/ExamUploader";
import ExamViewer from "@/components/ExamViewer";

const Index = () => {
  const [examContent, setExamContent] = useState<string>("");
  const [solutionContent, setSolutionContent] = useState<string>("");
  const [showExam, setShowExam] = useState(false);

  const handleExamUpload = (content: string) => {
    setExamContent(content);
    console.log("Exam uploaded:", content);
  };

  const handleSolutionUpload = (content: string) => {
    setSolutionContent(content);
    console.log("Solution uploaded:", content);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Prüfungsvorbereitung
        </h1>

        {!showExam ? (
          <Card className="p-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Prüfung hochladen</h2>
                <ExamUploader
                  onUpload={handleExamUpload}
                  icon={<Upload className="w-6 h-6" />}
                  accept=".md"
                  label="Prüfungsdatei (.md)"
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Lösung hochladen</h2>
                <ExamUploader
                  onUpload={handleSolutionUpload}
                  icon={<Upload className="w-6 h-6" />}
                  accept=".md"
                  label="Lösungsdatei (.md)"
                />
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={() => setShowExam(true)}
                disabled={!examContent || !solutionContent}
              >
                Prüfung starten
              </Button>
            </div>
          </Card>
        ) : (
          <ExamViewer
            examContent={examContent}
            solutionContent={solutionContent}
            onBack={() => setShowExam(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Index;