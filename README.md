# 🧠 Mind Map - Beautiful Interactive Mind Maps

A modern, interactive mind mapping application built with Next.js, React Flow, and Sentry for error tracking.

## ✨ Features

- **Beautiful Interactive Mind Maps**: Create stunning mind maps with drag-and-drop functionality
- **Three Node Types**: Topic (purple), Subtopic (blue), and Note (green) nodes with gradient designs
- **Real-time Editing**: Double-click any node to edit text inline
- **Smooth Connections**: Connect nodes with animated edges
- **Error Tracking**: Integrated Sentry.io for comprehensive crash tracking
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **TypeScript**: Full type safety throughout the application

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file and add your Sentry DSN:

```env
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@sentry.io/project-id
SENTRY_ORG=your-org
SENTRY_PROJECT=mindmap-app
NODE_ENV=development
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 How to Use

1. **Add Nodes**: Drag node types from the left sidebar to the canvas
2. **Edit Text**: Double-click any node to edit its text
3. **Connect Nodes**: Drag from the small circles (handles) on nodes to create connections
4. **Navigate**: Use mouse wheel to zoom, drag canvas to pan
5. **Controls**: Use Reset/Clear buttons in the top-right panel

## 🏗️ Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Sentry
│   ├── page.tsx            # Main page with error boundary
│   └── globals.css         # Global styles
├── components/
│   ├── MindMap.tsx         # Main mind map component
│   ├── Sidebar.tsx         # Node palette sidebar
│   ├── ErrorBoundary.tsx   # Error handling component
│   └── CustomNodes/        # Custom node components
├── hooks/
│   └── useMindMapState.ts  # State management hook
└── lib/
    └── sentry.ts           # Sentry configuration
```

## 🛠️ Built With

- **Next.js 15** - React framework with App Router
- **React Flow** - Interactive node-based UI library
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type safety and better DX
- **Sentry** - Error tracking and performance monitoring

## 🔧 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📝 Error Tracking

This application includes comprehensive error tracking with Sentry:

- Automatic error capture and reporting
- Custom error boundary with graceful fallbacks
- Development-friendly error display
- Context-rich error reports

## 🚀 Deployment

The application is ready for deployment on platforms like Vercel, Netlify, or any Node.js hosting service.

For Vercel deployment:
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
