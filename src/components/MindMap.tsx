'use client';

import React, { useCallback, useMemo, useState, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  Controls,
  Background,
  MiniMap,
  useReactFlow,
  BackgroundVariant,
  Panel,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useMindMapState } from '@/hooks/useMindMapState';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import Toolbar from './Toolbar';
import FloatingToolbox from './FloatingToolbox';
import SearchBar from './SearchBar';
import FloatingActionButton from './FloatingActionButton';
import ErrorBoundary from './ErrorBoundary';
import TopicNode from './CustomNodes/TopicNode';
// import MidCenturyNode, { COLORS, COLOR_OPTIONS } from './CustomNodes/MidCenturyNode';
import SubtopicNode from './CustomNodes/SubtopicNode';
import NoteNode from './CustomNodes/NoteNode';
import { captureError } from '@/lib/sentry';

// Define nodeTypes and defaultEdgeOptions outside component to prevent recreation on every render
const nodeTypes = {
  topic: TopicNode,
  subtopic: SubtopicNode,
  note: NoteNode,
  // midcentury: MidCenturyNode,
};

// Define event handlers outside component to prevent recreation on every render
const onDragOver = (event: React.DragEvent) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

const onError = (id: string, message: string) => {
  console.error('ReactFlow error:', { id, message });
  captureError(new Error(message), {
    context: 'ReactFlow',
    errorId: id,
  });
};

function MindMapFlow() {
  const {
    nodes,
    edges,
    selectedNodes,
    searchTerm,
    searchResults,
    currentSearchIndex,
    canUndo,
    canRedo,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    deleteSelectedNodes,

    clearMindMap,
    resetMindMap,
    undo,
    redo,
    setSelectedNodes,
    performSearch,
    nextSearchResult,
  } = useMindMapState();

  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [backgroundVariant, setBackgroundVariant] = useState<'dots' | 'lines'>('dots');

  const { screenToFlowPosition, fitView, zoomIn, zoomOut } = useReactFlow();

  // Load sidebar state from localStorage
  useEffect(() => {
    const savedSidebarState = localStorage.getItem('mindmap-sidebar-open');
    if (savedSidebarState !== null) {
      setIsSidebarOpen(JSON.parse(savedSidebarState));
    }
  }, []);

  // Save sidebar state to localStorage
  useEffect(() => {
    localStorage.setItem('mindmap-sidebar-open', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  // Enhanced keyboard shortcuts
  useKeyboardShortcuts({
    onUndo: undo,
    onRedo: redo,
    onDelete: deleteSelectedNodes,
    onSearch: () => setIsSearchVisible(true),
    onFitView: fitView,
    canUndo,
    canRedo,
  });

  // Toolbar handlers
  const handleToggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const handleToggleBackground = useCallback(() => {
    setBackgroundVariant(prev => prev === 'dots' ? 'lines' : 'dots');
  }, []);

  const handleExport = useCallback((format: 'png' | 'svg' | 'json') => {
    // TODO: Implement export functionality
    console.log(`Exporting as ${format}`);
  }, []);

  const handleImport = useCallback(() => {
    // TODO: Implement import functionality
    console.log('Importing file');
  }, []);

  const handleAddNodeAtCenter = useCallback((position: { x: number; y: number }) => {
    addNode('topic', position);
  }, [addNode]);

  // Update nodes with search highlighting
  const nodesWithHighlighting = useMemo(() => {
    return nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        isSearchHighlighted: searchResults.length > 0 &&
          searchResults[currentSearchIndex] === node.id,
      },
    }));
  }, [nodes, searchResults, currentSearchIndex]);

  // Auto-focus on current search result
  useEffect(() => {
    if (searchResults.length > 0 && searchResults[currentSearchIndex]) {
      const currentNode = nodes.find(node => node.id === searchResults[currentSearchIndex]);
      if (currentNode) {
        fitView({
          nodes: [{ id: currentNode.id, position: currentNode.position }],
          duration: 300,
          padding: 0.3,
        });
      }
    }
  }, [currentSearchIndex, searchResults, nodes, fitView]);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      try {
        const type = event.dataTransfer.getData('application/reactflow');
        
        if (!type) {
          return;
        }

        const position = screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });

        addNode(type, position);
      } catch (error) {
        console.error('Error adding node:', error);
        captureError(error as Error, {
          action: 'drop_node',
          nodeType: event.dataTransfer.getData('application/reactflow'),
        });
      }
    },
    [screenToFlowPosition, addNode]
  );

  const onNodeDoubleClick = useCallback((event: React.MouseEvent, node: Node) => {
    console.log('Double clicked node:', node);
  }, []);

  const onSelectionChange = useCallback((params: { nodes: Node[] }) => {
    setSelectedNodes(params.nodes.map(node => node.id));
  }, [setSelectedNodes]);

  const edgeOptions = useMemo(
    () => ({
      type: 'bezier',
      animated: false,
      style: {
        stroke: '#4a3d34', // coffee brown
        strokeWidth: 1,
      },
    }),
    []
  );

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: 'var(--mm-bg)' }}>
      {/* Toolbar */}
      <Toolbar
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={undo}
        onRedo={redo}
        onDelete={deleteSelectedNodes}
        onClear={clearMindMap}
        onReset={resetMindMap}
        onFitView={fitView}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onToggleBackground={handleToggleBackground}
        onToggleSidebar={handleToggleSidebar}
        onExport={handleExport}
        onImport={handleImport}
        backgroundVariant={backgroundVariant}
      />

      {/* Main content area */}
      <div className="flex-1 relative overflow-hidden">
        <SearchBar
          searchTerm={searchTerm}
          searchResults={searchResults}
          currentSearchIndex={currentSearchIndex}
          onSearch={performSearch}
          onNext={nextSearchResult}
          isVisible={isSearchVisible}
          onClose={() => {
            setIsSearchVisible(false);
            performSearch('');
          }}
        />

        <ErrorBoundary>
          <ReactFlow
            nodes={nodesWithHighlighting}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeDoubleClick={onNodeDoubleClick}
            onSelectionChange={onSelectionChange}
            onError={onError}
            nodeTypes={nodeTypes}
          defaultEdgeOptions={edgeOptions}
            fitView
            attributionPosition="bottom-left"
            multiSelectionKeyCode="Shift"
            deleteKeyCode={null} // Disable default delete to use our custom handler
            minZoom={0.3}
            maxZoom={2}
            onlyRenderVisibleElements
          >
          <Background
            variant={backgroundVariant === 'dots' ? BackgroundVariant.Dots : BackgroundVariant.Lines}
            gap={16}
            size={0.5}
            color="var(--mm-coffee)"
          />

          {/* Enhanced Controls */}
          <Controls
            className="shadow-lg border rounded-lg"
            style={{
              backgroundColor: 'var(--mm-toolbar-bg)',
              borderColor: 'var(--mm-border)',
              color: 'var(--mm-text)'
            }}
            position="bottom-left"
          />

          {/* MiniMap */}
          <MiniMap
            className="shadow-lg border rounded-lg"
            style={{
              backgroundColor: 'var(--mm-toolbar-bg)',
              borderColor: 'var(--mm-border)',
            }}
            position="top-right"
            nodeColor="var(--mm-primary)"
            maskColor="rgba(74, 61, 52, 0.1)"
            pannable
            zoomable
          />
          {/* Empty state message */}
          {nodes.length === 0 && (
            <Panel position="center" className="pointer-events-none">
              <div className="text-center p-8 rounded-lg" style={{ backgroundColor: 'var(--mm-cream)', color: 'var(--mm-text)' }}>
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-lg font-semibold mb-2">Start Your Mind Map</h3>
                <p className="text-sm opacity-75 mb-4">
                  Click the menu button to open the toolbox, then drag nodes to begin
                </p>
                <div className="text-xs opacity-60">
                  <div>• Press <kbd className="px-1 rounded bg-gray-100">Tab</kbd> to add child nodes</div>
                  <div>• Press <kbd className="px-1 rounded bg-gray-100">Enter</kbd> to add sibling nodes</div>
                </div>
              </div>
            </Panel>
          )}
          </ReactFlow>
        </ErrorBoundary>

        {/* Floating Action Button */}
        <FloatingActionButton
          onAddNode={handleAddNodeAtCenter}
          screenToFlowPosition={screenToFlowPosition}
        />

        {/* Floating Toolbox */}
        <FloatingToolbox
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </div>
    </div>
  );
}

export default function MindMap() {
  return (
    <ReactFlowProvider>
      <MindMapFlow />
    </ReactFlowProvider>
  );
}
