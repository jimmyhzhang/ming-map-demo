'use client';

import { useEffect } from 'react';

interface KeyboardShortcutsProps {
  onUndo: () => void;
  onRedo: () => void;
  onDelete: () => void;
  onSearch: () => void;
  onFitView: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const useKeyboardShortcuts = ({
  onUndo,
  onRedo,
  onDelete,
  onSearch,
  onFitView,
  canUndo,
  canRedo,
}: KeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key, ctrlKey, metaKey, shiftKey } = event;
      const isModifierPressed = ctrlKey || metaKey;

      // Prevent shortcuts when typing in input fields
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      switch (key) {
        case 'z':
        case 'Z':
          if (isModifierPressed) {
            event.preventDefault();
            if (shiftKey && canRedo) {
              onRedo();
            } else if (!shiftKey && canUndo) {
              onUndo();
            }
          }
          break;

        case 'y':
        case 'Y':
          if (isModifierPressed && canRedo) {
            event.preventDefault();
            onRedo();
          }
          break;

        case 'Backspace':
        case 'Delete':
          event.preventDefault();
          onDelete();
          break;

        case 'f':
        case 'F':
          if (isModifierPressed) {
            event.preventDefault();
            onSearch();
          }
          break;

        case '1':
          if (shiftKey) {
            event.preventDefault();
            onFitView();
          }
          break;

        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onUndo, onRedo, onDelete, onSearch, onFitView, canUndo, canRedo]);
};
