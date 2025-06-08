'use client';

import React, { memo, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface SubtopicNodeData {
  label: string;
  color?: string;
  isSearchHighlighted?: boolean;
}

const SubtopicNode = ({ data, selected }: NodeProps<SubtopicNodeData>) => {
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
      className={`px-4 py-3 shadow-md rounded-lg border-2 text-white min-w-[100px] transition-all duration-200 ${
        selected ? 'border-yellow-400 shadow-lg' :
        isHighlighted ? 'border-orange-400 shadow-lg ring-2 ring-orange-300' :
        'border-orange-300'
      }`}
      style={{
        background: 'linear-gradient(135deg, var(--mm-secondary) 0%, #b8512a 100%)',
        borderColor: selected ? '#fbbf24' : isHighlighted ? '#fb923c' : 'var(--mm-secondary)'
      }}
      onDoubleClick={handleDoubleClick}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-white !border-2"
        style={{ borderColor: 'var(--mm-secondary)' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="w-2 h-2 !bg-white !border-2"
        style={{ borderColor: 'var(--mm-secondary)' }}
      />
      <Handle
        type="target"
        position={Position.Right}
        className="w-2 h-2 !bg-white !border-2"
        style={{ borderColor: 'var(--mm-secondary)' }}
      />
      
      {isEditing ? (
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onKeyDown={handleKeyPress}
          onBlur={handleBlur}
          className="bg-transparent border-none outline-none text-white placeholder-orange-200 font-medium text-center w-full text-sm"
          autoFocus
        />
      ) : (
        <div className="font-medium text-center text-sm">
          {data.label}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 !bg-white !border-2"
        style={{ borderColor: 'var(--mm-secondary)' }}
      />
      <Handle
        type="source"
        position={Position.Left}
        className="w-2 h-2 !bg-white !border-2"
        style={{ borderColor: 'var(--mm-secondary)' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 !bg-white !border-2"
        style={{ borderColor: 'var(--mm-secondary)' }}
      />
    </div>
  );
};

export default memo(SubtopicNode);
