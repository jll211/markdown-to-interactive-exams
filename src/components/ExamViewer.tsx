import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Graph from "./graphs/Graph";

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

  // Example graph data for Question 9
  const graph9Data = {
    nodes: [
      { id: 'A', label: 'A', x: 100, y: 100 },
      { id: 'B', label: 'B', x: 300, y: 100 },
      { id: 'C', label: 'C', x: 100, y: 200 },
      { id: 'D', label: 'D', x: 300, y: 200 }
    ],
    edges: [
      { from: 'A', to: 'B', weight: '2' },
      { from: 'A', to: 'C', weight: '4' },
      { from: 'B', to: 'D', weight: '5' },
      { from: 'C', to: 'D', weight: '1' },
      { from: 'B', to: 'C', weight: '3' }
    ]
  };

  // Example graph data for Question 10
  const graph10Data = {
    nodes: [
      { id: 'A', label: 'A', x: 100, y: 100 },
      { id: 'B', label: 'B', x: 200, y: 100 },
      { id: 'C', label: 'C', x: 300, y: 100 },
      { id: 'D', label: 'D', x: 100, y: 200 },
      { id: 'E', label: 'E', x: 200, y: 200 },
      { id: 'F', label: 'F', x: 300, y: 200 }
    ],
    edges: [
      { from: 'A', to: 'B' },
      { from: 'B', to: 'C' },
      { from: 'D', to: 'E' },
      { from: 'E', to: 'F' },
      { from: 'A', to: 'D' },
      { from: 'B', to: 'E' },
      { from: 'C', to: 'F' }
    ]
  };

  const parseMarkdown = (content: string): JSX.Element[] => {
    if (!content) return [];

    try {
      const lines = content.split('\n');
      const elements: JSX.Element[] = [];
      let inCodeBlock = false;
      let codeContent = '';
      let key = 0;

      lines.forEach((line) => {
        // Handle code blocks
        if (line.startsWith('```')) {
          if (!inCodeBlock) {
            inCodeBlock = true;
            const lang = line.slice(3).trim();
            codeContent = '';
            if (lang !== 'graph') {
              elements.push(
                <pre key={key++} className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                  <code>{codeContent}</code>
                </pre>
              );
            }
          } else {
            inCodeBlock = false;
            if (codeContent.includes('GRAPH_9')) {
              elements.push(
                <div key={key++} className="my-6">
                  <Graph
                    nodes={graph9Data.nodes}
                    edges={graph9Data.edges}
                    width={400}
                    height={300}
                    className="mx-auto border border-gray-200 rounded-lg"
                  />
                </div>
              );
            } else if (codeContent.includes('GRAPH_10')) {
              elements.push(
                <div key={key++} className="my-6">
                  <Graph
                    nodes={graph10Data.nodes}
                    edges={graph10Data.edges}
                    width={400}
                    height={300}
                    className="mx-auto border border-gray-200 rounded-lg"
                  />
                </div>
              );
            }
          }
          return;
        }

        if (inCodeBlock) {
          codeContent += line + '\n';
          return;
        }

        // Handle headings
        if (line.startsWith('# ')) {
          elements.push(
            <h1 key={key++} className="text-3xl font-bold mb-4">
              {line.slice(2)}
            </h1>
          );
        } else if (line.startsWith('## ')) {
          elements.push(
            <h2 key={key++} className="text-2xl font-bold mb-3">
              {line.slice(3)}
            </h2>
          );
        } else if (line.startsWith('### ')) {
          elements.push(
            <h3 key={key++} className="text-xl font-bold mb-2">
              {line.slice(4)}
            </h3>
          );
        }
        // Handle empty lines as paragraph breaks
        else if (line.trim() === '') {
          elements.push(<br key={key++} />);
        }
        // Handle regular paragraphs
        else {
          elements.push(
            <p key={key++} className="mb-4">
              {line}
            </p>
          );
        }
      });

      return elements;
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return [
        <p key="error" className="text-red-500">
          Error parsing content. Please check the format.
        </p>
      ];
    }
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