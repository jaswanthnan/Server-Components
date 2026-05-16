<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# 🚀 AI-Powered Recruitment CRM

A professional, high-performance Recruitment Dashboard built with the MERN stack (MongoDB, Express, React, Node.js), featuring advanced React patterns, end-to-end type safety, real-time filtering, and global state management.

## 🌟 Key Features

- **Type-Safe Forms**: Built with React Hook Form and Zod schemas, offering end-to-end type safety, field arrays (e.g. dynamic skills), and async validation capabilities.
- **Robust Error Handling**: Implements `react-error-boundary` alongside custom class-based boundaries to catch component-level errors seamlessly, combined with `React.lazy` and `Suspense` fallbacks.
- **Predictable State Management**: Utilizes `Zustand` for complex, highly performant global state architecture, replacing prop-drilling and generic context providers.
- **Advanced Candidate Search**: Optimized server-side filtering using MongoDB regex combined with frontend `useDebounce` and `useMemo` for instant feedback.
- **Persistent Data Grids**: Integrated AG Grid with custom `localStorage` logic to remember your column arrangements, widths, and visibility.
- **Performance Monitoring**: Built-in React Profiler to track rendering efficiency and identify bottlenecks.
- **Premium UI/UX**: Crafted with Ant Design (v5) and TailwindCSS, featuring glassmorphism, smooth animations, and a sleek dark-mode compatible design system.

## 🛠️ Tech Stack

### Frontend
- **React 18 + Vite**: Fast, modern frontend framework utilizing `Suspense` and `React.lazy()`.
- **TypeScript**: Strict type-safe development environment.
- **React Hook Form + Zod**: High-performance, flexible, and extensible forms with robust schema validation.
- **Zustand**: Small, fast, and scalable bear-bones state-management.
- **AG Grid Community**: Professional data grid for complex data handling.
- **Ant Design & Tailwind CSS**: Comprehensive UI library paired with a utility-first CSS framework for enterprise applications.

### Backend
- **Node.js & Express**: Robust and scalable REST API layer.
- **MongoDB & Mongoose**: Flexible document-based data storage.
- **tsx**: Modern TypeScript execution for the server.

## 🏗️ Advanced React Patterns Implemented

- **React Hook Form + Zod Validation**: Sync/Async form validation seamlessly mapping server errors back to specific form fields.
- **Error Boundaries & Suspense**: Prevents application crashes and displays elegant skeleton/spinner fallbacks while lazily downloading bundles.
- **Compound Components**: Highly modular architectural patterns implemented for `Tabs` and `FilterPanel`.
- **`useDebounce`**: Optimizes search fields by delaying API calls until typing stops.
- **`useFetch`**: Custom hook for API calls with built-in `AbortController` to prevent memory leaks.
- **`React.memo` & `useCallback`**: Prevents unnecessary re-renders in heavy components.

## 📂 Project Structure

```text
├── backend/
│   ├── models/       # Mongoose schemas (Candidate, Job, User)
│   └── server.ts     # Express server & API routes
├── src/
│   ├── components/   # Reusable UI & Layout components
│   │   ├── common/   # Global shared components (Error Boundaries, Tables)
│   │   ├── forms/    # React Hook Form configurations
│   │   └── patterns/ # Advanced architectural pattern components
│   ├── hooks/        # Custom React hooks (Debounce, Fetch, etc.)
│   ├── pages/        # Main views (Dashboard, Candidates, Jobs)
│   ├── schemas/      # Zod validation schemas
│   ├── services/     # API interaction layer
│   ├── store/        # Zustand global state definitions
│   └── types/        # TypeScript interfaces
├── start-all.bat     # One-click start for Dev environment
└── package.json      # Project dependencies & scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB running locally (default: `mongodb://127.0.0.1:27017/hrms-dashboard`)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Setup environment:
   Create a `.env` file in the root (optional, defaults are provided in `server.ts`).

### Running the App
The easiest way to start both the frontend and backend is using the batch script:
```bash
start-all.bat
```
Alternatively:
- **Start Backend**: `npm run server`
- **Start Frontend**: `npm run dev`

## 📊 Diagnostic Outputs
Check the browser console to see the system in action:
- `FORM DATA: ...` → Detailed outputs of validated Zod schema form data payloads.
- `[Candidates] Rendering Component` → Verifies React functional component re-renders.
- `[Profiler] ... duration: ...` → Shows render performance metrics.

---
Developed as a high-performance Recruitment solution.
>>>>>>> 9089e4402fa22e944d2e4aa2bd7f5ed4f77b897d
