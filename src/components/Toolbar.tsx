'use client';

import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import {
  File,
  Edit,
  Eye,
  Plus,
  FolderOpen,
  Save,
  Download,
  Undo,
  Redo,
  Trash2,
  ZoomIn,
  ZoomOut,
  Maximize,
  Grid,
  Menu,
} from 'lucide-react';

interface ToolbarProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onDelete: () => void;
  onClear: () => void;
  onReset: () => void;
  onFitView: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onToggleBackground: () => void;
  onToggleSidebar: () => void;
  onExport: (format: 'png' | 'svg' | 'json') => void;
  onImport: () => void;
  backgroundVariant: 'dots' | 'lines';
}

const Toolbar: React.FC<ToolbarProps> = ({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onDelete,
  onClear,
  onReset,
  onFitView,
  onZoomIn,
  onZoomOut,
  onToggleBackground,
  onToggleSidebar,
  onExport,
  onImport,
  backgroundVariant,
}) => {
  return (
    <div 
      className="flex items-center justify-between px-4 py-2 border-b shadow-sm"
      style={{ 
        backgroundColor: 'var(--mm-toolbar-bg)', 
        borderColor: 'var(--mm-border)',
        color: 'var(--mm-text)'
      }}
    >
      {/* Left side - Menu toggle and File actions */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded hover:bg-gray-100 transition-colors"
          title="Toggle Sidebar"
        >
          <Menu size={18} />
        </button>

        {/* File Menu */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="flex items-center space-x-1 px-3 py-2 rounded hover:bg-gray-100 transition-colors">
              <File size={16} />
              <span className="text-sm font-medium">File</span>
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="w-48 bg-white border rounded-lg shadow-lg p-1 z-50 text-gray-900">
              <DropdownMenu.Item
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 rounded cursor-pointer outline-none"
                onClick={onReset}
              >
                <Plus size={16} className="text-gray-700" />
                <span>New Mind Map</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 rounded cursor-pointer outline-none"
                onClick={onImport}
              >
                <FolderOpen size={16} className="text-gray-700" />
                <span>Open...</span>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="my-1 h-px bg-gray-200" />
              <DropdownMenu.Item
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 rounded cursor-pointer outline-none"
                onClick={() => onExport('json')}
              >
                <Save size={16} className="text-gray-700" />
                <span>Save as JSON</span>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="my-1 h-px bg-gray-200" />
              <DropdownMenu.Item
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 rounded cursor-pointer outline-none"
                onClick={() => onExport('png')}
              >
                <Download size={16} className="text-gray-700" />
                <span>Export as PNG</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 rounded cursor-pointer outline-none"
                onClick={() => onExport('svg')}
              >
                <Download size={16} className="text-gray-700" />
                <span>Export as SVG</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        {/* Edit Menu */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="flex items-center space-x-1 px-3 py-2 rounded hover:bg-gray-100 transition-colors">
              <Edit size={16} />
              <span className="text-sm font-medium">Edit</span>
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="w-48 bg-white border rounded-lg shadow-lg p-1 z-50 text-gray-900">
              <DropdownMenu.Item
                className={`flex items-center space-x-2 px-3 py-2 text-sm rounded cursor-pointer outline-none text-gray-900 ${
                  canUndo ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'
                }`}
                onClick={canUndo ? onUndo : undefined}
              >
                <Undo size={16} className="text-gray-700" />
                <span>Undo</span>
                <span className="ml-auto text-xs text-gray-500">Ctrl+Z</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className={`flex items-center space-x-2 px-3 py-2 text-sm rounded cursor-pointer outline-none text-gray-900 ${
                  canRedo ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'
                }`}
                onClick={canRedo ? onRedo : undefined}
              >
                <Redo size={16} className="text-gray-700" />
                <span>Redo</span>
                <span className="ml-auto text-xs text-gray-500">Ctrl+Y</span>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="my-1 h-px bg-gray-200" />
              <DropdownMenu.Item
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 rounded cursor-pointer outline-none"
                onClick={onDelete}
              >
                <Trash2 size={16} className="text-gray-700" />
                <span>Delete Selected</span>
                <span className="ml-auto text-xs text-gray-500">Del</span>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="my-1 h-px bg-gray-200" />
            <AlertDialog.Root>
              <AlertDialog.Trigger asChild>
                <DropdownMenu.Item
                  className="flex items-center space-x-2 px-3 py-2 text-sm hover:bg-red-50 text-red-600 rounded cursor-pointer outline-none"
                  onSelect={(e) => e.preventDefault()}
                >
                  <Trash2 size={16} className="text-red-600" />
                  <span>Clear All</span>
                </DropdownMenu.Item>
              </AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" />
                <AlertDialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border rounded-lg shadow-lg p-6 max-w-md z-50 text-gray-900">
                  <AlertDialog.Title className="text-lg font-semibold text-gray-900">Clear Mind Map</AlertDialog.Title>
                  <AlertDialog.Description className="text-sm text-gray-600 mt-2">
                    This will permanently delete all nodes and connections. This action cannot be undone.
                  </AlertDialog.Description>
                  <div className="flex justify-end space-x-2 mt-6">
                    <AlertDialog.Cancel asChild>
                      <button className="px-4 py-2 text-sm border rounded hover:bg-gray-50 transition-colors text-gray-700">
                        Cancel
                      </button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                      <button
                        onClick={onClear}
                        className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                      >
                        Clear All
                      </button>
                    </AlertDialog.Action>
                  </div>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog.Root>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        {/* View Menu */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="flex items-center space-x-1 px-3 py-2 rounded hover:bg-gray-100 transition-colors">
              <Eye size={16} />
              <span className="text-sm font-medium">View</span>
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="w-48 bg-white border rounded-lg shadow-lg p-1 z-50 text-gray-900">
              <DropdownMenu.Item
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 rounded cursor-pointer outline-none"
                onClick={onZoomIn}
              >
                <ZoomIn size={16} className="text-gray-700" />
                <span>Zoom In</span>
                <span className="ml-auto text-xs text-gray-500">+</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 rounded cursor-pointer outline-none"
                onClick={onZoomOut}
              >
                <ZoomOut size={16} className="text-gray-700" />
                <span>Zoom Out</span>
                <span className="ml-auto text-xs text-gray-500">-</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 rounded cursor-pointer outline-none"
                onClick={onFitView}
              >
                <Maximize size={16} className="text-gray-700" />
                <span>Fit to View</span>
                <span className="ml-auto text-xs text-gray-500">Shift+1</span>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="my-1 h-px bg-gray-200" />
              <DropdownMenu.Item
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 rounded cursor-pointer outline-none"
                onClick={onToggleBackground}
              >
                <Grid size={16} className="text-gray-700" />
                <span>Background: {backgroundVariant === 'dots' ? 'Dots' : 'Lines'}</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      {/* Right side - Quick actions */}
      <div className="flex items-center space-x-1">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`p-2 rounded transition-colors ${
            canUndo ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'
          }`}
          title="Undo (Ctrl+Z)"
        >
          <Undo size={16} />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`p-2 rounded transition-colors ${
            canRedo ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'
          }`}
          title="Redo (Ctrl+Y)"
        >
          <Redo size={16} />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-2" />
        <button
          onClick={onFitView}
          className="p-2 rounded hover:bg-gray-100 transition-colors"
          title="Fit to View (Shift+1)"
        >
          <Maximize size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
