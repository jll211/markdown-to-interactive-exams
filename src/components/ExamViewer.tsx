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
    console.log("Solution visibility:", !showSolution);
    console.log("Solution content:", solutionContent);
  };

  // Create a custom renderer that extends the default renderer
  const renderer = new marked.Renderer();
  
  // Override the code rendering method with correct type signature
  renderer.code = function({ text, lang, escaped }: marked.Code): string {
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

  // Set up marked options with correct types
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    breaks: true
  });

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
              __html: marked(examContent) 
            }}
          />
        </div>

        {showSolution && solutionContent && (
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-4">Lösung</h3>
            <div
              className="markdown-content space-y-4"
              dangerouslySetInnerHTML={{
                __html: marked(solutionContent),
              }}
            />
          </div>
        )}
      </Card>
    </div>
  );
};

export default ExamViewer;