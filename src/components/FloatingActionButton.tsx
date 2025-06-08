'use client';

import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onAddNode: (position: { x: number; y: number }) => void;
  screenToFlowPosition: (position: { x: number; y: number }) => { x: number; y: number };
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onAddNode,
  screenToFlowPosition,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide FAB when virtual keyboard is open on mobile
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      const isKeyboardOpen = isMobile && window.innerHeight < window.screen.height * 0.75;
      setIsVisible(!isKeyboardOpen);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = () => {
    // Add node at center of viewport
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const flowPosition = screenToFlowPosition({ x: centerX, y: centerY });
    onAddNode(flowPosition);
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-30 flex items-center justify-center group"
      style={{
        backgroundColor: 'var(--mm-primary)',
        color: 'white',
      }}
      title="Add Node (Click to add at center)"
      aria-label="Add new node"
    >
      <Plus 
        size={24} 
        className="transition-transform duration-200 group-hover:scale-110" 
      />
    </button>
  );
};

export default FloatingActionButton;
