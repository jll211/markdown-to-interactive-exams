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

  const graphs = {
    GRAPH_9: {
      nodes: [
        { id: 'A', label: 'A', x: 100, y: 100 },
        { id: 'B', label: 'B', x: 300, y: 100 },
        { id: 'C', label: 'C', x: 100, y: 200 },
        { id: 'D', label: 'D', x: 300, y: 200 }
      ],
      edges: [
        { from: 'A', to: 'B', weight: '2', directed: true },
        { from: 'A', to: 'C', weight: '4', directed: true },
        { from: 'B', to: 'D', weight: '5', directed: true },
        { from: 'C', to: 'D', weight: '1', directed: true },
        { from: 'B', to: 'C', weight: '3', directed: true }
      ]
    },
    GRAPH_10: {
      nodes: [
        { id: 'A', label: 'A', x: 100, y: 100 },
        { id: 'B', label: 'B', x: 200, y: 100 },
        { id: 'C', label: 'C', x: 300, y: 100 },
        { id: 'D', label: 'D', x: 100, y: 200 },
        { id: 'E', label: 'E', x: 200, y: 200 },
        { id: 'F', label: 'F', x: 300, y: 200 }
      ],
      edges: [
        { from: 'A', to: 'B', directed: false },
        { from: 'B', to: 'C', directed: false },
        { from: 'D', to: 'E', directed: false },
        { from: 'E', to: 'F', directed: false },
        { from: 'A', to: 'D', directed: false },
        { from: 'B', to: 'E', directed: false },
        { from: 'C', to: 'F', directed: false }
      ]
    }
  };

  const parseMarkdown = (content: string): JSX.Element[] => {
    if (!content) return [];

    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let inCodeBlock = false;
    let currentGraphType = '';
    let key = 0;

    lines.forEach((line, index) => {
      // Handle code blocks for graphs
      if (line.trim().startsWith('```graph')) {
        inCodeBlock = true;
        currentGraphType = '';
        return;
      }
      
      if (inCodeBlock && line.trim().startsWith('```')) {
        inCodeBlock = false;
        return;
      }

      if (inCodeBlock) {
        // Check for graph type in the content
        if (line.includes('GRAPH_9')) {
          currentGraphType = 'GRAPH_9';
          elements.push(
            <div key={`graph-${key++}`} className="my-6">
              <Graph
                nodes={graphs.GRAPH_9.nodes}
                edges={graphs.GRAPH_9.edges}
                width={400}
                height={300}
                className="mx-auto border border-gray-200 rounded-lg"
              />
            </div>
          );
        } else if (line.includes('GRAPH_10')) {
          currentGraphType = 'GRAPH_10';
          elements.push(
            <div key={`graph-${key++}`} className="my-6">
              <Graph
                nodes={graphs.GRAPH_10.nodes}
                edges={graphs.GRAPH_10.edges}
                width={400}
                height={300}
                className="mx-auto border border-gray-200 rounded-lg"
              />
            </div>
          );
        }
        return;
      }

      // Handle regular markdown elements
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
      } else if (line.trim() === '') {
        elements.push(<br key={key++} />);
      } else {
        elements.push(
          <p key={key++} className="mb-4">
            {line}
          </p>
        );
      }
    });

    return elements;
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
