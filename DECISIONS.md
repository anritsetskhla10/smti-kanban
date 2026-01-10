# Architectural Decisions

This document outlines the key technical choices I made while building the Inquiry Kanban Board, along with the reasoning behind them.

## 1. State Management: Why Zustand?

I considered using **React Context**, but ultimately chose **Zustand** for three main reasons:

* **Performance:** Context often causes unnecessary re-renders in child components when the provider updates. Zustand allows for selecting specific slices of state, which is crucial for keeping the drag-and-drop interactions smooth.
* **Boilerplate:** I wanted to avoid "Provider Hell." Zustand works cleanly with hooks and doesn't require wrapping the entire application tree.
* **Persistence:** The built-in `persist` middleware made it incredibly easy to save the board state to `localStorage`. This ensures users don't lose their data on refresh, which is vital given we are using a mock API.

## 2. Drag & Drop Library

I selected **@hello-pangea/dnd**.

While libraries like `dnd-kit` are excellent, `@hello-pangea/dnd` (the maintained fork of `react-beautiful-dnd`) offers the best balance of "out-of-the-box" physics and accessibility.
* **Native Feel:** The list reordering animations feel natural without requiring extensive configuration.
* **Accessibility:** It handles keyboard navigation logic internally, which would be time-consuming to implement manually using the native HTML5 Drag & Drop API.
* **React 18 Support:** Unlike the original library, this fork works seamlessly with React 18's Strict Mode.

## 3. URL Synchronization (UX Improvement)

I decided to synchronize the filter state (Search, Date Range, Value) with the URL query parameters.
**Reasoning:** This allows users to bookmark specific views or share a link with a colleague (e.g., *"Check out the high-value inquiries from March"*), and the board will load exactly as they configured it.

## 4. Styling Strategy

I used **Tailwind CSS** to maintain development speed and consistency.
* It allowed me to rapidly implement the "Dark Mode" requirement using the `dark:` modifier.
* I configured the `tailwind.config.ts` with specific color tokens (Slate/Blue) to ensure the UI maintained a professional, enterprise SaaS look rather than relying on arbitrary hex codes.

## 5. Mock API & ID Generation

To meet the assessment requirements:
* **Network Delay:** I implemented a `setTimeout` wrapper in the API routes to simulate the requested 500ms latency.
* **ID Handling:** Since there is no real database to generate sequential IDs, I moved the ID generation logic (`INQ-YYYY-XXXX`) to the client-side before sending the POST request. This ensures the UI updates immediately with the correct format, while the mock server simply accepts and stores it. In a real-world scenario, the server would handle this.