import React from "react";
import Graph from "@/components/graphs/Graph";
import { graphs } from "@/components/GraphConfig";

export const parseMarkdown = (content: string): JSX.Element[] => {
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