'use client';

import dynamic from 'next/dynamic';
import ErrorBoundary from '@/components/ErrorBoundary';

// Dynamically import MindMap to avoid SSR issues with React Flow
const MindMap = dynamic(() => import('@/components/MindMap'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading Mind Map...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <ErrorBoundary>
      <MindMap />
    </ErrorBoundary>
  );
}
