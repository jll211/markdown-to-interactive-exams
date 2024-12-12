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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Prüfungsvorbereitung
          </h1>

          {!showExam ? (
            <Card className="p-8 bg-white shadow-lg">
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    Prüfung hochladen
                  </h2>
                  <ExamUploader
                    onUpload={handleExamUpload}
                    icon={<Upload className="w-8 h-8 text-gray-400" />}
                    accept=".md"
                    label="Prüfungsdatei"
                  />
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                    Lösung hochladen
                  </h2>
                  <ExamUploader
                    onUpload={handleSolutionUpload}
                    icon={<Upload className="w-8 h-8 text-gray-400" />}
                    accept=".md"
                    label="Lösungsdatei"
                  />
                </div>

                <Button
                  className="w-full py-6 text-lg"
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
    </div>
  );
};

export default Index;