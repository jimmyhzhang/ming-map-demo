'use client';

import { useCallback, useState, useRef } from 'react';
import {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  NodeChange,
  EdgeChange,
} from 'reactflow';

const initialNodes: Node[] = [
  // Root node - Windsurf Documentation
  {
    id: "root",
    type: "topic",
    position: { x: 100, y: 400 },
    data: { label: "Windsurf Documentation" }
  },

  // Level 2: Main sections arranged vertically
  {
    id: "get-started",
    type: "subtopic",
    data: { label: "Get Started" },
    position: { x: 400, y: 100 }
  },
  {
    id: "cascade",
    type: "subtopic",
    data: { label: "Cascade" },
    position: { x: 400, y: 220 }
  },
  {
    id: "editor",
    type: "subtopic",
    data: { label: "Windsurf Editor" },
    position: { x: 400, y: 340 }
  },
  {
    id: "context",
    type: "subtopic",
    data: { label: "Context Awareness" },
    position: { x: 400, y: 460 }
  },
  {
    id: "troubleshooting",
    type: "subtopic",
    data: { label: "Troubleshooting" },
    position: { x: 400, y: 580 }
  },

  // Level 3: Get Started subsections
  {
    id: "installation",
    type: "note",
    data: { label: "Installation & Setup" },
    position: { x: 700, y: 50 }
  },
  {
    id: "onboarding",
    type: "note",
    data: { label: "Onboarding Flow" },
    position: { x: 700, y: 120 }
  },
  {
    id: "first-steps",
    type: "note",
    data: { label: "Things to Try" },
    position: { x: 700, y: 190 }
  },

  // Level 3: Cascade subsections
  {
    id: "cascade-overview",
    type: "note",
    data: { label: "Overview" },
    position: { x: 700, y: 260 }
  },
  {
    id: "cascade-usage",
    type: "note",
    data: { label: "Usage & Credits" },
    position: { x: 700, y: 320 }
  },
  {
    id: "memories",
    type: "note",
    data: { label: "Memories & Rules" },
    position: { x: 700, y: 380 }
  },

  // Level 3: Editor subsections
  {
    id: "models",
    type: "note",
    data: { label: "AI Models" },
    position: { x: 700, y: 440 }
  },
  {
    id: "terminal",
    type: "note",
    data: { label: "Terminal" },
    position: { x: 700, y: 500 }
  },
  {
    id: "previews",
    type: "note",
    data: { label: "Previews (Beta)" },
    position: { x: 700, y: 560 }
  },

  // Level 3: Context Awareness subsections
  {
    id: "context-overview",
    type: "note",
    data: { label: "Overview" },
    position: { x: 700, y: 620 }
  },
  {
    id: "local-indexing",
    type: "note",
    data: { label: "Local Indexing" },
    position: { x: 700, y: 680 }
  },

  // Level 3: Troubleshooting subsections
  {
    id: "common-issues",
    type: "note",
    data: { label: "Common Issues" },
    position: { x: 700, y: 740 }
  },
  {
    id: "logs",
    type: "note",
    data: { label: "Gathering Logs" },
    position: { x: 700, y: 800 }
  }
];

const initialEdges: Edge[] = [
  // Level 1 to Level 2: Root to main sections
  { id: "e-root-get-started", source: "root", target: "get-started", sourceHandle: "right", targetHandle: "left" },
  { id: "e-root-cascade", source: "root", target: "cascade", sourceHandle: "right", targetHandle: "left" },
  { id: "e-root-editor", source: "root", target: "editor", sourceHandle: "right", targetHandle: "left" },
  { id: "e-root-context", source: "root", target: "context", sourceHandle: "right", targetHandle: "left" },
  { id: "e-root-troubleshooting", source: "root", target: "troubleshooting", sourceHandle: "right", targetHandle: "left" },

  // Level 2 to Level 3: Get Started subsections
  { id: "e-get-started-installation", source: "get-started", target: "installation", sourceHandle: "right", targetHandle: "left" },
  { id: "e-get-started-onboarding", source: "get-started", target: "onboarding", sourceHandle: "right", targetHandle: "left" },
  { id: "e-get-started-first-steps", source: "get-started", target: "first-steps", sourceHandle: "right", targetHandle: "left" },

  // Level 2 to Level 3: Cascade subsections
  { id: "e-cascade-overview", source: "cascade", target: "cascade-overview", sourceHandle: "right", targetHandle: "left" },
  { id: "e-cascade-usage", source: "cascade", target: "cascade-usage", sourceHandle: "right", targetHandle: "left" },
  { id: "e-cascade-memories", source: "cascade", target: "memories", sourceHandle: "right", targetHandle: "left" },

  // Level 2 to Level 3: Editor subsections
  { id: "e-editor-models", source: "editor", target: "models", sourceHandle: "right", targetHandle: "left" },
  { id: "e-editor-terminal", source: "editor", target: "terminal", sourceHandle: "right", targetHandle: "left" },
  { id: "e-editor-previews", source: "editor", target: "previews", sourceHandle: "right", targetHandle: "left" },

  // Level 2 to Level 3: Context Awareness subsections
  { id: "e-context-overview", source: "context", target: "context-overview", sourceHandle: "right", targetHandle: "left" },
  { id: "e-context-indexing", source: "context", target: "local-indexing", sourceHandle: "right", targetHandle: "left" },

  // Level 2 to Level 3: Troubleshooting subsections
  { id: "e-troubleshooting-issues", source: "troubleshooting", target: "common-issues", sourceHandle: "right", targetHandle: "left" },
  { id: "e-troubleshooting-logs", source: "troubleshooting", target: "logs", sourceHandle: "right", targetHandle: "left" }
];

interface HistoryState {
  nodes: Node[];
  edges: Edge[];
}

const MAX_HISTORY_SIZE = 100;

export const useMindMapState = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);

  // History management for undo/redo
  const history = useRef<HistoryState[]>([{ nodes: initialNodes, edges: initialEdges }]);
  const historyIndex = useRef(0);

  const saveToHistory = useCallback((newNodes: Node[], newEdges: Edge[]) => {
    // Remove any future history if we're not at the end
    history.current = history.current.slice(0, historyIndex.current + 1);

    // Add new state
    history.current.push({ nodes: newNodes, edges: newEdges });

    // Limit history size
    if (history.current.length > MAX_HISTORY_SIZE) {
      history.current = history.current.slice(-MAX_HISTORY_SIZE);
    }

    historyIndex.current = history.current.length - 1;
  }, []);

  const undo = useCallback(() => {
    if (historyIndex.current > 0) {
      historyIndex.current--;
      const state = history.current[historyIndex.current];
      setNodes(state.nodes);
      setEdges(state.edges);
    }
  }, [setNodes, setEdges]);

  const redo = useCallback(() => {
    if (historyIndex.current < history.current.length - 1) {
      historyIndex.current++;
      const state = history.current[historyIndex.current];
      setNodes(state.nodes);
      setEdges(state.edges);
    }
  }, [setNodes, setEdges]);

  const canUndo = historyIndex.current > 0;
  const canRedo = historyIndex.current < history.current.length - 1;

  // Enhanced node changes with history tracking
  const handleNodesChange = useCallback((changes: NodeChange[]) => {
    onNodesChange(changes);

    // Save to history for position changes (drag operations)
    const hasPositionChange = changes.some(change => change.type === 'position' && change.dragging === false);
    if (hasPositionChange) {
      setNodes(currentNodes => {
        setEdges(currentEdges => {
          saveToHistory(currentNodes, currentEdges);
          return currentEdges;
        });
        return currentNodes;
      });
    }
  }, [onNodesChange, setNodes, setEdges, saveToHistory]);

  // Enhanced edge changes with history tracking
  const handleEdgesChange = useCallback((changes: EdgeChange[]) => {
    onEdgesChange(changes);
  }, [onEdgesChange]);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdges = addEdge(params, edges);
      setEdges(newEdges);
      saveToHistory(nodes, newEdges);
    },
    [setEdges, edges, nodes, saveToHistory]
  );

  const addNode = useCallback(
    (type: string, position: { x: number; y: number }) => {
      const newNode: Node = {
        id: `${Date.now()}`,
        type,
        position,
        data: {
          label: type === 'topic' ? 'New Topic' :
                 type === 'subtopic' ? 'New Subtopic' :
                 'New Note'
        },
      };
      const newNodes = [...nodes, newNode];
      setNodes(newNodes);
      saveToHistory(newNodes, edges);
    },
    [setNodes, nodes, edges, saveToHistory]
  );

  // Enhanced delete with confirmation for large deletions
  const deleteSelectedNodes = useCallback(() => {
    if (selectedNodes.length === 0) return;

    // Get all nodes that will be deleted (including children)
    const getAllChildren = (nodeId: string, allNodes: Node[], allEdges: Edge[]): string[] => {
      const children = allEdges
        .filter(edge => edge.source === nodeId)
        .map(edge => edge.target);

      const allChildren = [...children];
      children.forEach(childId => {
        allChildren.push(...getAllChildren(childId, allNodes, allEdges));
      });

      return allChildren;
    };

    const nodesToDelete = new Set(selectedNodes);
    selectedNodes.forEach(nodeId => {
      getAllChildren(nodeId, nodes, edges).forEach(childId => {
        nodesToDelete.add(childId);
      });
    });

    // Confirmation for large deletions
    if (nodesToDelete.size > 10) {
      const confirmed = window.confirm(
        `This will delete ${nodesToDelete.size} topics. Are you sure?`
      );
      if (!confirmed) return;
    }

    const newNodes = nodes.filter(node => !nodesToDelete.has(node.id));
    const newEdges = edges.filter(edge =>
      !nodesToDelete.has(edge.source) && !nodesToDelete.has(edge.target)
    );

    setNodes(newNodes);
    setEdges(newEdges);
    setSelectedNodes([]);
    saveToHistory(newNodes, newEdges);
  }, [selectedNodes, nodes, edges, setNodes, setEdges, saveToHistory]);

  const updateNodeData = useCallback(
    (nodeId: string, newData: Record<string, unknown>) => {
      const newNodes = nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
      );
      setNodes(newNodes);
      saveToHistory(newNodes, edges);
    },
    [setNodes, nodes, edges, saveToHistory]
  );

  // Alias for easier use in components
  const updateNode = updateNodeData;

  // Search functionality
  const performSearch = useCallback((term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setSearchResults([]);
      setCurrentSearchIndex(0);
      return;
    }

    const results = nodes
      .filter(node =>
        node.data.label?.toString().toLowerCase().includes(term.toLowerCase())
      )
      .map(node => node.id);

    setSearchResults(results);
    setCurrentSearchIndex(0);
  }, [nodes]);

  const nextSearchResult = useCallback(() => {
    if (searchResults.length === 0) return;
    setCurrentSearchIndex((prev) => (prev + 1) % searchResults.length);
  }, [searchResults.length]);

  const clearMindMap = useCallback(() => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];
    setNodes(newNodes);
    setEdges(newEdges);
    setSelectedNodes([]);
    saveToHistory(newNodes, newEdges);
  }, [setNodes, setEdges, saveToHistory]);

  const resetMindMap = useCallback(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setSelectedNodes([]);
    saveToHistory(initialNodes, initialEdges);
  }, [setNodes, setEdges, saveToHistory]);

  return {
    nodes,
    edges,
    selectedNodes,
    searchTerm,
    searchResults,
    currentSearchIndex,
    canUndo,
    canRedo,
    onNodesChange: handleNodesChange,
    onEdgesChange: handleEdgesChange,
    onConnect,
    addNode,
    deleteSelectedNodes,
    updateNodeData,
    updateNode,
    clearMindMap,
    resetMindMap,
    undo,
    redo,
    setSelectedNodes,
    performSearch,
    nextSearchResult,
  };
};
