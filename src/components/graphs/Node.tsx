import React from 'react';

interface NodeProps {
  x: number;
  y: number;
  label: string;
  radius?: number;
  selected?: boolean;
}

const Node = ({ x, y, label, radius = 20, selected = false }: NodeProps) => {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={radius}
        className={`${
          selected ? 'fill-blue-200 stroke-blue-500' : 'fill-white stroke-gray-700'
        } stroke-2`}
      />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-sm font-medium fill-gray-900"
      >
        {label}
      </text>
    </g>
  );
};

export default Node;