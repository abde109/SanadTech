# SanadTech Technical Test – Updated Approach

## Overview

This project implements a **two-way infinite scrolling** approach for handling massive user data sets (over a million records) seamlessly on both frontend and backend.

- **Backend**: Express + TypeScript manages data slicing and the alphabetical index.
- **Frontend**: React + Vite + TypeScript, featuring a scrollable container that loads items up or down using `react-infinite-scroll-component`.
- **pnpm**: Monorepo structure for simpler dependency management.

---

## How It Works

### 1. Data Sorting (Once at Startup)
On the server (Express), user data is loaded from `users.json` and sorted **one time**. This ensures offsets remain consistent.

**GenericData Class** (`services/GenericData.ts`)
- `lazyLoad(offset, limit)`: returns a slice `[offset..offset+limit]` from the sorted data.
- `getIndexForLetter(letter)`: returns the index of the first item whose key starts with `letter`.

### 2. Lazy Loading API Endpoints

- **`GET /users/lazy?offset=...&limit=...`**:
  Returns `{ total, data }` containing the total size of the dataset and a slice of user items.

- **`GET /users/position?q=letter`**:
  Returns `{ index }`, the zero-based position for items starting with that `letter`.

### 3. Frontend Hooks

#### `useLazyFetch`
Provides a `getSlice(offset, limit)` function that fetches from `/users/lazy`.

#### `useLetterPosition`
Provides a `getLetterIndex(letter)` function that calls `/users/position`.

---

## Example Flow

1. **Initial Load**: When the React app mounts, it calls `fetchDown()` to retrieve the first chunk, typically `[0..20)`.
2. **Scrolling Down**: As the user scrolls, `react-infinite-scroll-component` triggers `fetchDown()`, requesting `[20..40)`, `[40..60)`, etc., appending items.
3. **Scrolling Up**: If the user scrolls to the top and there are items above, the code calls `fetchUp()`, requesting `[(offset-limit)..offset)` and prepending them, adjusting scroll position so the user’s view doesn’t jump.
4. **Jumping to a Letter**: The user picks a letter (e.g. `"F"`) from the sidebar, the app fetches the index from `/users/position?q=F`. Suppose it returns `45`, meaning items at `[45.....]` begin with `F`. The app then replaces the current list with items starting at index 45.

---

## Key Components

1. **Scroll Container**
   - A `<div>` that handles its own scrolling events, including upward detection.
   - Uses `id="scrollableDiv"` so `react-infinite-scroll-component` can hook into it.

2. **InfiniteScroll**
   - A library that automatically observes scroll position and calls `next={fetchDown}` when near the bottom.
   - Configured with `scrollableTarget="scrollableDiv"`.

3. **Upward Scroll Logic**
   - A simple check: `if (scrollTop <= 0 && topOffset > 0) fetchUp()`.
   - Prepends the new items to maintain continuity.

4. **Selected Letter Indicator**
   - Observes which item is at the top of the visible area.
   - Updates `selectedLetter` accordingly so the sidebar highlights the current section.

---

## Getting Started

1. **Clone & Install**:
   ```bash
   git clone https://github.com/abde109/SanadTech.git
   cd SanadTech
   pnpm install
   ```

2. **Development Mode**:
   ```bash
   pnpm run dev
   ```
   - **Backend**: [http://localhost:3000](http://localhost:3000)
   - **Frontend**: [http://localhost:5173](http://localhost:5173)

3. **Production Build**:
   ```bash
   pnpm run build
   pnpm run start
   ```

---

## Project Structure

```
.
├── Back/
│   ├── src
│   │   ├── routes/users.ts
│   │   ├── services/GenericData.ts
│   │   └── storage/users.json
├── Front/
│   ├── src
│   │   ├── components      # AlphabetSidebar, UserListItem, etc.
│   │   ├── utils           # useLazyFetch, useLetterPosition
│   │   ├── App.tsx         # The main React App with two-way scroll logic
│   │   └── api
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

---

## Why Two-Way Infinite Scrolling?
- **Memory Efficiency**: Loads only the needed slice.
- **User Experience**: Large lists are navigable from top or bottom without reloading.
- **Performance**: Minimizes re-renders and network overhead.

---

## Contact

- **Email**: [abderrahimkhadri2@gmail.com](mailto:abderrahimkhadri2@gmail.com)
- **Repo**: [SanadTech Repository](https://github.com/abde109/SanadTech)

