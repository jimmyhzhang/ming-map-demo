'use client';

import React, { useState, useRef, useEffect } from 'react';

interface SearchBarProps {
  searchTerm: string;
  searchResults: string[];
  currentSearchIndex: number;
  onSearch: (term: string) => void;
  onNext: () => void;
  isVisible: boolean;
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  searchResults,
  currentSearchIndex,
  onSearch,
  onNext,
  isVisible,
  onClose,
}) => {
  const [inputValue, setInputValue] = useState(searchTerm);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isVisible]);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      onNext();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (searchResults.length > 0) {
        onNext();
      }
    }
  };

  if (!isVisible) return null;

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="shadow-lg rounded-lg border p-3 min-w-[300px]" style={{
        backgroundColor: '#f3eddc',
        borderColor: '#e7dcc0',
        boxShadow: '0 8px 25px rgba(74, 61, 52, 0.2)'
      }}>
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Search topics..."
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
              style={{
                backgroundColor: '#e7dcc0',
                borderColor: '#4a3d34',
                color: '#4a3d34',
                focusRingColor: '#71895b'
              }}
            />
            {searchResults.length > 0 && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs" style={{ color: '#4a3d34', opacity: 0.7 }}>
                {currentSearchIndex + 1} of {searchResults.length}
              </div>
            )}
          </div>
          
          <button
            type="button"
            onClick={onNext}
            disabled={searchResults.length === 0}
            className="px-3 py-2 text-white rounded-md disabled:cursor-not-allowed text-sm transition-all duration-200"
            style={{
              backgroundColor: searchResults.length === 0 ? '#e7dcc0' : '#71895b',
              color: searchResults.length === 0 ? '#4a3d34' : 'white'
            }}
          >
            Next
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 text-white rounded-md text-sm transition-all duration-200 hover:opacity-80"
            style={{ backgroundColor: '#c65a2e' }}
          >
            ✕
          </button>
        </form>
        
        {searchTerm && searchResults.length === 0 && (
          <div className="mt-2 text-sm" style={{ color: '#4a3d34', opacity: 0.7 }}>
            No topics found for &quot;{searchTerm}&quot;
          </div>
        )}

        <div className="mt-2 text-xs" style={{ color: '#4a3d34', opacity: 0.6 }}>
          Press Enter to cycle through results, Esc to close
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
