export const graphs = {
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