'use client';

import React, { memo, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface TopicNodeData {
  label: string;
  color?: string;
  isSearchHighlighted?: boolean;
}

const TopicNode = ({ data, selected }: NodeProps<TopicNodeData>) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      data.label = label;
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
      setLabel(data.label);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    data.label = label;
  };

  const isHighlighted = data.isSearchHighlighted;

  return (
    <div
      className={`px-8 py-5 rounded-full min-w-[160px] transition-all duration-300 font-semibold text-lg relative ${
        selected ? 'ring-2 ring-coffee shadow-lg' :
        isHighlighted ? 'ring-2 ring-coffee shadow-lg' :
        'shadow-paper'
      }`}
      style={{
        backgroundColor: '#e7dcc0', // cream
        color: '#4a3d34', // coffee brown
        boxShadow: selected || isHighlighted ?
          '0 4px 12px rgba(74, 61, 52, 0.2)' :
          '0 2px 8px rgba(0, 0, 0, 0.05)',
      }}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={(e) => {
        if (!selected && !isHighlighted) {
          e.currentTarget.style.backgroundColor = '#f0e5d0';
        }
      }}
      onMouseLeave={(e) => {
        if (!selected && !isHighlighted) {
          e.currentTarget.style.backgroundColor = '#e7dcc0';
        }
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-coffee !border-0 opacity-0 hover:opacity-100 transition-opacity"
      />

      {isEditing ? (
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onKeyDown={handleKeyPress}
          onBlur={handleBlur}
          className="bg-transparent border-none outline-none text-coffee placeholder-coffee/50 font-semibold text-center w-full text-lg"
          autoFocus
        />
      ) : (
        <div className="font-semibold text-center">
          {data.label}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 !bg-coffee !border-0 opacity-0 hover:opacity-100 transition-opacity"
      />
      <Handle
        type="source"
        position={Position.Left}
        className="w-2 h-2 !bg-coffee !border-0 opacity-0 hover:opacity-100 transition-opacity"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="w-2 h-2 !bg-coffee !border-0 opacity-0 hover:opacity-100 transition-opacity"
      />
    </div>
  );
};

export default memo(TopicNode);
