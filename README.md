# Inquiry Kanban Board

A robust, interactive Kanban board module designed for the SMTI ERP system to manage event inquiries. This application allows staff to track requests through multiple phases using a drag-and-drop interface.

## 🚀 Features

* **Interactive Kanban Board:** Drag and drop inquiries between columns (New, Sent to Hotels, Offers Received, Completed) using `@hello-pangea/dnd`.
* **Deep Filtering:** Filter by Client Name, Date Range, and Minimum Value. **Filters are synchronized with the URL**, allowing users to bookmark or share specific views.
* **Inquiry Management:** Full CRUD capabilities—create new inquiries and edit existing details via a modal.
* **Optimistic UI:** Phase updates are reflected immediately in the UI while the API syncs in the background, ensuring a snappy user experience.
* **Mock API:** Simulated 500ms network latency to demonstrate loading states and error handling.
* **Dark Mode:** Fully responsive design with native dark mode support.

## 🛠️ Tech Stack

* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **State Management:** Zustand (chosen for performance and simplicity)
* **Styling:** Tailwind CSS
* **Drag & Drop:** @hello-pangea/dnd
* **Icons:** Lucide React

## 📦 Getting Started

### Prerequisites
Ensure you have **Node.js 18.17** or later installed.

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/anritsetskhla10/smti-kanban.git
    cd smti-kanban
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the app:**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

Here is a quick overview of the top-level directory structure:

* `src/store` - Global state management (Zustand). Contains `useInquiryStore` with persistence logic.
* `src/components/board` - Core Kanban components (Board, Columns, Cards) and Modals (Create/Edit).
* `src/components/ui` - Reusable atomic components (Buttons, Inputs, Badges).
* `src/app/api` - Mock API routes handling GET, POST, and PATCH requests with simulated delay.
* `src/hooks` - Custom hooks like `useUrlSync` (for URL state) and `useDebounce`.
* `src/lib` - Utility functions and mock data definitions.

## 📝 Design Decisions

For a detailed explanation of the architectural choices , please refer to [DECISIONS.md](./DECISIONS.md).
