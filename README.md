# SanadTech Technical Test

## 📌 Overview
This project is designed to efficiently manage and display an extensive user list (10 million+ records) without causing performance issues. The solution employs:

- **🖥️ Backend**: Express + TypeScript for robust API handling.
- **🌐 Frontend**: React (Vite) + TypeScript for a fast and dynamic UI.
- **📦 pnpm**: Monorepo management for streamlined dependencies.

---

## 🎥 Demo

![Demo Video](sanadtech-test.mp4)

---

## 🚀 Features & Functionality

### ⚙️ Backend:

#### ✅ Lazy Loading:
- Uses `offset` and `limit` for optimized data fetching.
- Prevents overloading memory by only sending required data.

#### 🔍 Search Functionality:
- Supports partial match (`includes`) and exact match (`starts with`).
- Users can filter results based on initials (alphabetical search).

#### 💾 File-Based Storage (`users.json`):
- A lightweight approach for testing.
- Can be migrated to a database for scalability.

#### 🔗 API Endpoints:
- `/users/search-lazy`: Fetches users with support for search, pagination, and alphabetical filtering.

### 🎨 Frontend:

#### ⚡ React + Vite:
- Fast build and hot-reload during development.
- Minimal footprint for production-ready applications.

#### 🔄 Infinite Scroll (`react-infinite-scroll-component`):
- Dynamically loads more users as the user scrolls.
- Ensures a smooth user experience by preventing unnecessary re-renders and performance issues.

#### 🔠 Alphabetical Navigation:
- Allows users to jump directly to names beginning with a selected letter.

#### 🔍 Search Bar:
- Implements real-time filtering without requiring full-page reloads.

---

## 🏗️ Key Functions & How They Work

### 🏛️ Generic Data Storage Class
The `GenericData<T>` class provides a scalable way to manage any type of structured data. It is designed to efficiently search and paginate large datasets.

#### 🔹 **Key Features:**
- **Generic Implementation**: Supports any data type by utilizing TypeScript generics (`T`).
- **Efficient Searching**: Allows case-insensitive searching with optional prefix matching.
- **Lazy Loading**: Implements pagination with `offset` and `limit` to prevent unnecessary data loads.

#### 🔹 **Core Methods:**

- **`lazyLoad(offset, limit)`**:
  - Returns a sliced portion of the dataset based on `offset` and `limit`.
  - Optimized for large-scale datasets by reducing memory overhead.

- **`search(query, startsWith = false)`**:
  - Performs case-insensitive search.
  - If `startsWith = true`, filters results that start with the query.
  - Otherwise, matches any instance of the query within the data.

- **`searchLazy(query, offset, limit, startsWith = false)`**:
  - Combines searching and lazy loading.
  - Returns a paginated subset of the search results.

### 🖥️ Frontend Data Handling

- **`fetchUsers(offset, limit)`**:
  - Calls the backend API to retrieve users based on pagination.
  - Used for initial loading and infinite scrolling.

- **`searchUsers(query, startsWith)`**:
  - Sends a search request to the backend.
  - Updates the UI dynamically as results arrive.

- **`InfiniteScroll` (react-infinite-scroll-component)**:
  - Handles infinite scrolling on the frontend.
  - Automatically fetches more users when the user reaches the bottom of the list.
  - Prevents unnecessary re-renders and optimizes performance by only rendering new items as needed.

---

## 🛠️ Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/abde109/SanadTech.git
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

---

## 🎯 Key Highlights

- **Optimized Data Handling**: Avoids full data loads, leveraging pagination and search filters.
- **Scalable Architecture**: Can transition from JSON storage to a full-fledged database.
- **Efficient UI Rendering**: Uses `react-infinite-scroll-component` for smooth infinite scrolling.
- **Monorepo Setup**: Simplifies dependency management across frontend and backend.

---

## 📂 Project Structure
```
.
├── Back/       # Express (TypeScript) server
│   ├── src
│   │   ├── routes/users.ts   # API endpoints
│   │   ├── services/dataStorage.ts  # GenericData<T> class implementation
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

---

## 📬 Repo & Contact

- **📧 Contact**: [abderrahimkhadri2@gmail.com](mailto:abderrahimkhadri2@gmail.com)
- **🔗 GitHub Repository**: [SanadTech Repository](https://github.com/yourusername/SanadTech)

---

## 🏁 Summary

This project demonstrates a scalable, high-performance approach to handling massive user datasets, featuring **search, pagination, lazy loading, and infinite scrolling** while maintaining a smooth user experience. 🚀

