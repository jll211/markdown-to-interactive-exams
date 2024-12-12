import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { marked } from "marked";
import Graph from "./graphs/Graph";

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

  // Create a custom renderer that extends the default renderer
  const renderer = new marked.Renderer();

  // Override the code rendering method
  renderer.code = (code: string, language: string | undefined) => {
    if (language === 'graph') {
      try {
        const graphData = JSON.parse(code);
        return `<div class="my-6">
          <div id="graph-container">
            ${Graph({
              nodes: graphData.nodes,
              edges: graphData.edges,
              width: graphData.width || 400,
              height: graphData.height || 300,
              className: 'mx-auto'
            })}
          </div>
        </div>`;
      } catch (e) {
        console.error('Failed to parse graph data:', e);
        return `<pre><code>${code}</code></pre>`;
      }
    }
    return `<pre class="bg-gray-50 p-4 rounded-lg overflow-x-auto"><code>${code}</code></pre>`;
  };

  // Set up marked options with the custom renderer
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    breaks: true,
    sanitize: false,
    smartLists: true,
    smartypants: true
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
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
            className="markdown-content space-y-8"
            dangerouslySetInnerHTML={{ 
              __html: marked(examContent)
            }}
          />
        </div>

        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <RadioGroup
              onValueChange={(value) => handleAnswerChange(1, value)}
              disabled={showResults}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="a" id="a" />
                <label htmlFor="a" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Option A
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="b" id="b" />
                <label htmlFor="b" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Option B
                </label>
              </div>
            </RadioGroup>

            <div className="mt-6">
              <label className="block text-lg font-medium text-gray-900 mb-2">
                Freitextantwort
              </label>
              <textarea
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[150px]"
                onChange={(e) => handleAnswerChange(2, e.target.value)}
                disabled={showResults}
                placeholder="Geben Sie hier Ihre Antwort ein..."
              />
            </div>
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