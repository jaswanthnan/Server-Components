# ⚡ HireSync - Full-Stack Recruitment CRM (Next.js App Router)

HireSync is a high-performance, modern Recruitment CRM and HRMS Dashboard built using Next.js 15+, React, Tailwind CSS, and MongoDB. 

This project demonstrates the peak capabilities of the **Next.js App Router**, leveraging advanced features like **Partial Prerendering (PPR)**, **React Suspense Streaming**, **Server Components**, and custom **Shadcn-style Skeleton animations**.

---

## ✨ Features & Architecture Highlights

### ⚡ 1. Native Full-Stack Architecture (Zero Express)
We migrated away from the traditional separate frontend/backend architecture. All database controllers, models, and routes now run natively inside Next.js.
*   **API Route Handlers**: Authentication routes (`/api/auth/login`, `/api/auth/register`) and candidates routes are built directly into `src/app/api`.
*   **Mongoose Models**: Hotswappable Mongoose schemas with connection caching to optimize serverless execution.

### ◐ 2. Partial Prerendering (PPR)
Configured using `cacheComponents: true` in `next.config.ts`.
*   **Instant Shells**: The static parts of the layout (Sidebar, navigation, and page containers) are compiled at build time and served instantly from the edge cache.
*   **Dynamic Chunks**: Interactive pages like the Search Dashboard and Candidates List load dynamic database content inside targeted placeholders, creating a blazing-fast user experience.

### 🌊 3. React Suspense Streaming
Slow database fetches are isolated into nested Server Components and wrapped inside React `<Suspense>` boundaries.
*   **Non-Blocking SSR**: High-latency MongoDB queries no longer block the page load.
*   **Table-to-Grid Streaming**: Features like the `/candidates` list table stream directly into the UI over the network.

### 🎨 4. Custom Shadcn-Style Skeleton Placeholders
To eliminate layout shifts (CLS) and keep the UI feeling premium:
*   We created an atomic `<Skeleton />` component featuring custom keyframe-pulsing animations.
*   Tailored page skeletons (like `<CandidatesTableSkeleton />`) precisely mimic the geometry of the target grids while they load.

---

## 🛠️ Technology Stack
*   **Core**: Next.js 15+ (App Router), React 19, TypeScript
*   **Styling**: Tailwind CSS (PostCSS)
*   **Database**: MongoDB, Mongoose
*   **UI Components**: AG-Grid Community (React), Lucide React, Recharts
*   **State Management**: Zustand

---

## 📂 Folder Structure

```text
Server-Components/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (admin)/         # Route Group: Authenticated dashboard pages
│   │   │   ├── candidates/  # Candidates list with Streaming & custom Skeletons
│   │   │   └── search/      # Global Search with PPR & Simulated Async Streams
│   │   ├── (public)/        # Route Group: Public Careers/Jobs pages
│   │   ├── api/             # Next.js Serverless API Endpoints
│   │   └── globals.css      # Custom Tailwind styling variables
│   │
│   ├── components/          # Presentation and Business Logic React components
│   │   ├── candidates/      # AG-Grid Table components & form filters
│   │   └── ui/              # Atomized UI components (Skeleton, Modal, Badge)
│   │
│   └── lib/                 # Core utilities
│       ├── models/          # Mongoose Database Models (Candidate, Job, User)
│       ├── mongodb.ts       # Cached MongoDB Mongoose connection utility
│       └── utils.ts         # Global utility helpers (cn merger)
│
├── next.config.ts           # Next.js engine configuration (PPR enabled)
├── tailwind.config.js       # Tailwind configuration
└── package.json             # Scripts & Dependency manifest
```

---

## 🚀 Getting Started

### 1. Prerequisites
*   Node.js (v18.x or higher)
*   MongoDB running locally or a MongoDB Atlas URI string.

### 2. Environment Configuration
Create a `.env.local` file in the root of the project:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/recruitment
```

### 3. Installation
Install all NPM packages:
```bash
npm install
```

### 4. Running the Development Server
You only need to run a single server now! This spins up the full-stack app on port `3000`:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
To test optimization and generate static/partial pre-render segments:
```bash
npm run build
```
Start the compiled production bundle:
```bash
npm run start
```

---

## 🏆 Key Demonstration Pages

*   **Global Search (`/search`)**: Demonstrates **PPR + simulated Async Server Component search streams** using an artificial 1-second delay. See the static search box render immediately, followed by pulsing skeletons, and finally, structured results directly from MongoDB.
*   **Candidates (`/candidates`)**: Showcases true **React Suspense streaming** of complex data grids (AG-Grid). The filters load instantly while the grid skeleton handles database resolving.
*   **Dashboard (`/dashboard`)**: Demonstrates dynamic connection handling and responsive Server Component rendering.
