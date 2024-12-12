import React from 'react';

interface EdgeProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  weight?: string | number;
  directed?: boolean;
  selected?: boolean;
}

const Edge = ({
  startX,
  startY,
  endX,
  endY,
  weight,
  directed = false,
  selected = false,
}: EdgeProps) => {
  const dx = endX - startX;
  const dy = endY - startY;
  const angle = Math.atan2(dy, dx);
  
  // Adjust start and end points to account for node radius
  const radius = 20;
  const startRadius = radius + 2;
  const endRadius = radius + (directed ? 15 : 2);
  
  const adjustedStartX = startX + Math.cos(angle) * startRadius;
  const adjustedStartY = startY + Math.sin(angle) * startRadius;
  const adjustedEndX = endX - Math.cos(angle) * endRadius;
  const adjustedEndY = endY - Math.sin(angle) * endRadius;

  // Calculate midpoint for weight label
  const midX = (adjustedStartX + adjustedEndX) / 2;
  const midY = (adjustedStartY + adjustedEndY) / 2 - 10;

  // Calculate arrow points if directed
  const arrowPoints = directed
    ? {
        x1: adjustedEndX - 15 * Math.cos(angle - Math.PI / 6),
        y1: adjustedEndY - 15 * Math.sin(angle - Math.PI / 6),
        x2: adjustedEndX,
        y2: adjustedEndY,
        x3: adjustedEndX - 15 * Math.cos(angle + Math.PI / 6),
        y3: adjustedEndY - 15 * Math.sin(angle + Math.PI / 6),
      }
    : null;

  return (
    <g>
      <line
        x1={adjustedStartX}
        y1={adjustedStartY}
        x2={adjustedEndX}
        y2={adjustedEndY}
        className={`${
          selected ? 'stroke-blue-500' : 'stroke-gray-700'
        } stroke-2`}
      />
      {directed && arrowPoints && (
        <polygon
          points={`${arrowPoints.x1},${arrowPoints.y1} ${arrowPoints.x2},${arrowPoints.y2} ${arrowPoints.x3},${arrowPoints.y3}`}
          className={`${
            selected ? 'fill-blue-500 stroke-blue-500' : 'fill-gray-700 stroke-gray-700'
          }`}
        />
      )}
      {weight && (
        <text
          x={midX}
          y={midY}
          textAnchor="middle"
          className="text-sm font-medium fill-gray-600"
        >
          {weight}
        </text>
      )}
    </g>
  );
};

export default Edge;