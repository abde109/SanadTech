# SanadTech Technical Test – Updated Approach

## Overview

This project demonstrates an efficient, two-way infinite scrolling solution for navigating and displaying a large user list (potentially 1 million+ records) without performance bottlenecks.

- **Backend**: Express + TypeScript for the server and data APIs.
- **Frontend**: React (Vite) + TypeScript for a responsive UI.
- **pnpm**: Monorepo management for consistent dependencies.

---

## Features

### Lazy Loading (Backend)
- **Offset & Limit**: The server uses these parameters to provide only as much data as needed.
- **File-based Storage** (`users.json`): Simple for testing, easily migratable to a database.
- **Alphabetical Index**: A dedicated `/users/position` endpoint returns the correct index for each letter.

### Two-Way Infinite Scroll (Frontend)
- **Scrolling Up & Down**: Dynamically fetches new slices of data in either direction.
- **Smooth Transitions**: Retains scroll position when items are prepended.
- **Alphabet Sidebar**: Jump directly to a specified letter.

---

## Key Components

1. **GenericData Class** (Backend)
   - Sorts data once at initialization.
   - Provides `lazyLoad(offset, limit)` for slicing.
   - Offers `getIndexForLetter(letter)` to handle alphabetical jumps.

2. **useLazyFetch Hook** (Frontend)
   - Abstracts away the API calls for slicing data.
   - Accepts `offset` and `limit`, returning only the requested subset.

3. **useLetterPosition Hook** (Frontend)
   - Fetches the index of the first occurrence of a letter.
   - Powers the quick-jump functionality.

4. **React App**
   - Contains a scrollable `<div>` using `react-infinite-scroll-component`.
   - Loads more data when scrolling down.
   - Loads previous data when scrolling up.
   - Updates the selected letter based on the first visible element.

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
│   │   ├── components
│   │   ├── hooks (useLazyFetch, useLetterPosition)
│   │   ├── App.tsx
│   │   └── api
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

---

## Highlights

- **Efficient & Scalable**: Designed for extremely large datasets.
- **Smooth User Experience**: Seamless scrolling in both directions.
- **Straightforward**: Minimal code repetition, easily maintainable.

---

## Contact

- **Email**: [abderrahimkhadri2@gmail.com](mailto:abderrahimkhadri2@gmail.com)
- **Repo**: [SanadTech Repository](https://github.com/yourusername/SanadTech)

