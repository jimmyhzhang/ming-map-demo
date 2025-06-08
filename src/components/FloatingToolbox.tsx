'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const onDragStart = (event: React.DragEvent, nodeType: string) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};

interface FloatingToolboxProps {
  isOpen: boolean;
  onClose: () => void;
}

const FloatingToolbox: React.FC<FloatingToolboxProps> = ({ isOpen, onClose }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle overlay click to close
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Transparent Overlay */}
      <div
        className="fixed inset-0 z-40"
        onClick={handleOverlayClick}
      />

      {/* Floating Card */}
      <div
        className={`
          fixed z-50
          ${isMobile
            ? 'top-4 left-4 right-4 bottom-4 max-h-[calc(100vh-2rem)]'
            : 'top-20 left-6 w-80 max-h-[calc(100vh-6rem)]'
          }
          rounded-2xl shadow-2xl border
          transition-all duration-300 ease-out
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          flex flex-col overflow-hidden
        `}
        style={{
          backgroundColor: 'var(--mm-cream)',
          borderColor: 'rgba(74, 61, 52, 0.2)',
          color: 'var(--mm-text)',
          boxShadow: '0 25px 50px -12px rgba(74, 61, 52, 0.12), 0 0 0 1px rgba(74, 61, 52, 0.05)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'rgba(74, 61, 52, 0.15)' }}>
          <div>
            <h2 className="text-lg font-semibold mb-1" style={{ color: 'var(--mm-coffee)' }}>Mind Map Tools</h2>
            <p className="text-sm opacity-75">
              Drag elements to the canvas to build your mind map
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-opacity-20 hover:bg-gray-500 transition-colors"
            aria-label="Close toolbox"
            style={{ color: 'var(--mm-coffee)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Node Types Section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--mm-coffee)' }}>Node Types</h3>
            <div className="space-y-3">
              {/* Topic Node */}
              <div
                className="px-4 py-3 rounded-xl shadow-md cursor-grab active:cursor-grabbing hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                style={{ backgroundColor: 'var(--mm-primary)', color: 'white' }}
                onDragStart={(event) => onDragStart(event, 'topic')}
                draggable
              >
                <div className="font-semibold text-sm text-center">
                  📝 Topic Node
                </div>
                <div className="text-xs opacity-90 text-center mt-1">
                  Main topic or theme
                </div>
              </div>

              {/* Subtopic Node */}
              <div
                className="px-4 py-3 rounded-xl shadow-md cursor-grab active:cursor-grabbing hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                style={{ backgroundColor: 'var(--mm-secondary)', color: 'white' }}
                onDragStart={(event) => onDragStart(event, 'subtopic')}
                draggable
              >
                <div className="font-medium text-sm text-center">
                  🔗 Subtopic Node
                </div>
                <div className="text-xs opacity-90 text-center mt-1">
                  Related subtopic
                </div>
              </div>

              {/* Note Node */}
              <div
                className="px-3 py-2 rounded-xl shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 transform hover:scale-105"
                style={{ backgroundColor: 'var(--mm-accent)', color: 'white' }}
                onDragStart={(event) => onDragStart(event, 'note')}
                draggable
              >
                <div className="text-sm text-center">
                  📄 Note Node
                </div>
                <div className="text-xs opacity-90 text-center mt-1">
                  Quick note or detail
                </div>
              </div>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--mm-coffee)' }}>Instructions</h3>
            <ul className="text-xs space-y-2 opacity-80">
              <li>• Drag nodes from here to the canvas</li>
              <li>• Double-click nodes to edit text</li>
              <li>• Connect nodes by dragging from handles</li>
              <li>• Use mouse wheel to zoom</li>
              <li>• Drag canvas to pan around</li>
              <li>• Select multiple nodes with Shift+click</li>
            </ul>
          </div>

          {/* Keyboard Shortcuts Section */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--mm-coffee)' }}>Keyboard Shortcuts</h3>
            <ul className="text-xs space-y-1 opacity-80">
              <li>• <kbd className="px-1 py-0.5 rounded text-xs" style={{ backgroundColor: 'var(--mm-coffee)', color: 'var(--mm-cream)' }}>Ctrl+Z</kbd> Undo</li>
              <li>• <kbd className="px-1 py-0.5 rounded text-xs" style={{ backgroundColor: 'var(--mm-coffee)', color: 'var(--mm-cream)' }}>Ctrl+Y</kbd> Redo</li>
              <li>• <kbd className="px-1 py-0.5 rounded text-xs" style={{ backgroundColor: 'var(--mm-coffee)', color: 'var(--mm-cream)' }}>Del</kbd> Delete selected</li>
              <li>• <kbd className="px-1 py-0.5 rounded text-xs" style={{ backgroundColor: 'var(--mm-coffee)', color: 'var(--mm-cream)' }}>Ctrl+F</kbd> Search nodes</li>
              <li>• <kbd className="px-1 py-0.5 rounded text-xs" style={{ backgroundColor: 'var(--mm-coffee)', color: 'var(--mm-cream)' }}>Tab</kbd> Add child node</li>
              <li>• <kbd className="px-1 py-0.5 rounded text-xs" style={{ backgroundColor: 'var(--mm-coffee)', color: 'var(--mm-cream)' }}>Enter</kbd> Add sibling node</li>
              <li>• <kbd className="px-1 py-0.5 rounded text-xs" style={{ backgroundColor: 'var(--mm-coffee)', color: 'var(--mm-cream)' }}>Shift+1</kbd> Fit to view</li>
            </ul>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t opacity-60" style={{ borderColor: 'var(--mm-coffee)' }}>
            <div className="text-xs">
              <div className="flex items-center justify-between">
                <span>Powered by React Flow</span>
                <span>🧠</span>
              </div>
              <div className="mt-2 text-center">
                <span>Mid-Century Modern Style</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingToolbox;
