import React from 'react';
import Node from './Node';
import Edge from './Edge';

export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  weight?: string | number;
  directed?: boolean;
}

interface GraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  width?: number;
  height?: number;
  className?: string;
}

const Graph = ({ nodes, edges, width = 400, height = 300, className = '' }: GraphProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`max-w-full ${className}`}
    >
      {edges.map((edge, index) => {
        const startNode = nodes.find((n) => n.id === edge.from);
        const endNode = nodes.find((n) => n.id === edge.to);
        
        if (!startNode || !endNode) return null;
        
        return (
          <Edge
            key={`${edge.from}-${edge.to}-${index}`}
            startX={startNode.x}
            startY={startNode.y}
            endX={endNode.x}
            endY={endNode.y}
            weight={edge.weight}
            directed={edge.directed}
          />
        );
      })}
      
      {nodes.map((node) => (
        <Node
          key={node.id}
          x={node.x}
          y={node.y}
          label={node.label}
        />
      ))}
    </svg>
  );
};

export default Graph;