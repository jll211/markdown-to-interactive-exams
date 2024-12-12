import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { marked } from "marked";
import { renderToString } from "react-dom/server";
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

  // Create a custom renderer
  const renderer = new marked.Renderer();
  
  // Override the code rendering method
  renderer.code = function(code: string, language?: string): string {
    if (language === 'graph') {
      try {
        let graphData;
        // Check if the code contains specific markers for our predefined graphs
        if (code.includes('GRAPH_9')) {
          graphData = graph9Data;
        } else if (code.includes('GRAPH_10')) {
          graphData = graph10Data;
        } else {
          // If no specific marker, try to parse the code as JSON
          graphData = JSON.parse(code);
        }
        
        const graphComponent = (
          <div className="my-6">
            <Graph
              nodes={graphData.nodes}
              edges={graphData.edges}
              width={400}
              height={300}
              className="mx-auto"
            />
          </div>
        );
        return renderToString(graphComponent);
      } catch (e) {
        console.error('Failed to parse graph data:', e);
        return `<pre><code>${code}</code></pre>`;
      }
    }
    return `<pre class="bg-gray-50 p-4 rounded-lg overflow-x-auto"><code>${code}</code></pre>`;
  };

  // Process the markdown content
  const processContent = (content: string) => {
    // Replace the ASCII graph with our SVG graph
    content = content.replace(
      /A --- 2 --- B[\s\S]*?C --- 1 --- D/g,
      '```graph\nGRAPH_9\n```'
    );
    content = content.replace(
      /A --- B --- C[\s\S]*?D --- E --- F/g,
      '```graph\nGRAPH_10\n```'
    );
    return marked(content, { renderer });
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
          <div
            className="markdown-content space-y-8"
            dangerouslySetInnerHTML={{ 
              __html: processContent(examContent)
            }}
          />
        </div>

        {showSolution && solutionContent && (
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-4">Lösung</h3>
            <div
              className="markdown-content space-y-4"
              dangerouslySetInnerHTML={{
                __html: processContent(solutionContent)
              }}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default ExamViewer;