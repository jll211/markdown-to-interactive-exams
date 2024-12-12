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

  // Create a custom renderer that extends the default renderer
  const renderer = new marked.Renderer();
  
  // Override the code rendering method
  renderer.code = function({ text, lang }: { text: string, lang?: string }): string {
    if (lang === 'graph') {
      try {
        const graphData = JSON.parse(text);
        const graphComponent = (
          <div className="my-6">
            <Graph
              nodes={graphData.nodes}
              edges={graphData.edges}
              width={graphData.width || 400}
              height={graphData.height || 300}
              className="mx-auto"
            />
          </div>
        );
        return renderToString(graphComponent);
      } catch (e) {
        console.error('Failed to parse graph data:', e);
        return `<pre><code>${text}</code></pre>`;
      }
    }
    return `<pre class="bg-gray-50 p-4 rounded-lg overflow-x-auto"><code>${text}</code></pre>`;
  };

  // Example graph data for Question 9
  const graph9Data = {
    nodes: [
      { id: 'A', label: 'A', x: 200, y: 100 },
      { id: 'B', label: 'B', x: 300, y: 100 },
      { id: 'C', label: 'C', x: 200, y: 200 },
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
      { id: 'A', label: 'A', x: 150, y: 100 },
      { id: 'B', label: 'B', x: 250, y: 100 },
      { id: 'C', label: 'C', x: 350, y: 100 },
      { id: 'D', label: 'D', x: 150, y: 200 },
      { id: 'E', label: 'E', x: 250, y: 200 },
      { id: 'F', label: 'F', x: 350, y: 200 }
    ],
    edges: [
      { from: 'A', to: 'B', weight: '' },
      { from: 'B', to: 'C', weight: '' },
      { from: 'D', to: 'E', weight: '' },
      { from: 'E', to: 'F', weight: '' },
      { from: 'A', to: 'D', weight: '' },
      { from: 'B', to: 'E', weight: '' },
      { from: 'C', to: 'F', weight: '' }
    ]
  };

  // Process the markdown content and inject the graph data
  const processContent = (content: string) => {
    // Replace the ASCII graph with our SVG graph
    content = content.replace(
      /A --- 2 --- B[\s\S]*?C --- 1 --- D/g,
      '```graph\n' + JSON.stringify(graph9Data) + '\n```'
    );
    content = content.replace(
      /A --- B --- C[\s\S]*?D --- E --- F/g,
      '```graph\n' + JSON.stringify(graph10Data) + '\n```'
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