# SanadTech Technical Test – Comprehensive README

## Overview
This project is designed to efficiently manage and display an extensive user list (10 million+ records) without causing performance issues. The solution employs:

- **Backend**: Express + TypeScript for robust API handling.
- **Frontend**: React (Vite) + TypeScript for a fast and dynamic UI.
- **pnpm**: Monorepo management for streamlined dependencies.

## Features & Functionality
### Backend:
1. **Lazy Loading**: 
   - Uses `offset` and `limit` for optimized data fetching.
   - Prevents overloading memory by only sending required data.

2. **Search Functionality**:
   - Supports partial match (`includes`) and exact match (`starts with`).
   - Users can filter results based on initials (alphabetical search).

3. **File-Based Storage** (`users.json`):
   - A lightweight approach for testing.
   - Can be migrated to a database for scalability.

4. **API Endpoints**:
   - `/users/search-lazy`: Fetches users with support for search, pagination, and alphabetical filtering.

### Frontend:
1. **React + Vite**:
   - Fast build and hot-reload during development.
   - Minimal footprint for production-ready applications.

2. **Infinite Scroll**:
   - Dynamically loads more users as the user scrolls.
   - Reduces initial payload for improved performance.

3. **Alphabetical Navigation**:
   - Allows users to jump directly to names beginning with a selected letter.

4. **Search Bar**:
   - Implements real-time filtering without requiring full-page reloads.

## Getting Started
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/SanadTech.git
   cd SanadTech
   ```
2. **Install Dependencies** (root folder):
   ```bash
   pnpm install
   ```
3. **Run Development Mode**:
   ```bash
   pnpm run dev
   ```
   - **Backend**: Runs on [http://localhost:3000](http://localhost:3000)
   - **Frontend**: Runs on [http://localhost:5173](http://localhost:5173)

4. **Production Build**:
   ```bash
   pnpm run build
   ```
   - Compiles backend (TypeScript) and frontend (Vite).

5. **Start in Production Mode**:
   ```bash
   pnpm run start
   ```

## Key Highlights
- **Optimized Data Handling**: Avoids full data loads, leveraging pagination and search filters.
- **Scalable Architecture**: Can transition from JSON storage to a full-fledged database.
- **Efficient UI Rendering**: Uses infinite scrolling and React state management for performance.
- **Monorepo Setup**: Simplifies dependency management across frontend and backend.

## Project Structure
```
.
├── Back/       # Express (TypeScript) server
│   ├── src
│   │   ├── routes/users.ts   # API endpoints
│   │   ├── services/dataStorage.ts  # Data handling logic
│   │   └── storage/users.json  # Sample user data
├── Front/      # React Vite app
│   ├── src
│   │   ├── components         # UI elements (search bar, sidebar, loader, etc.)
│   │   ├── api/index.ts       # API call functions
│   │   └── utils/useSearchUsers.ts  # Custom hook for fetching users
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

## Contribution & Contact
- **Contributions**: Feel free to fork this project and propose improvements.
- **Contact**: If you have any questions, reach out via GitHub Issues or email.
- **GitHub Repository**: [SanadTech Repository](https://github.com/yourusername/SanadTech)

## Summary
This project demonstrates a practical and efficient approach to handling massive user datasets, featuring **search, pagination, and smooth UI rendering** while maintaining performance. 🚀

