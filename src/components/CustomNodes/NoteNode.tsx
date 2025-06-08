'use client';

import React, { memo, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface NoteNodeData {
  label: string;
  color?: string;
  isSearchHighlighted?: boolean;
}

const NoteNode = ({ data, selected }: NodeProps<NoteNodeData>) => {
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
      className={`px-3 py-2 shadow-sm rounded-md border text-white min-w-[80px] transition-all duration-200 ${
        selected ? 'border-yellow-400 shadow-md' :
        isHighlighted ? 'border-orange-400 shadow-md ring-2 ring-orange-300' :
        'border-yellow-300'
      }`}
      style={{
        background: 'linear-gradient(135deg, var(--mm-accent) 0%, #c4973f 100%)',
        borderColor: selected ? '#fbbf24' : isHighlighted ? '#fb923c' : 'var(--mm-accent)'
      }}
      onDoubleClick={handleDoubleClick}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-white !border"
        style={{ borderColor: 'var(--mm-accent)' }}
      />
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 !bg-white !border"
        style={{ borderColor: 'var(--mm-accent)' }}
      />
      <Handle
        type="target"
        position={Position.Right}
        className="w-2 h-2 !bg-white !border"
        style={{ borderColor: 'var(--mm-accent)' }}
      />

      {isEditing ? (
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onKeyDown={handleKeyPress}
          onBlur={handleBlur}
          className="bg-transparent border-none outline-none text-white placeholder-yellow-200 text-center w-full text-xs"
          autoFocus
        />
      ) : (
        <div className="text-center text-xs">
          {data.label}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 !bg-white !border"
        style={{ borderColor: 'var(--mm-accent)' }}
      />
    </div>
  );
};

export default memo(NoteNode);
