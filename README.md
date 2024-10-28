
# Kanban Dashboard Assignment

This project is a **Kanban Dashboard** application built with React, designed to manage tasks across multiple status columns: **To Do**, **In Progress**, **Blocked**, and **Done**. The application provides intuitive task management features, including task creation, status transitions, inline editing, live mode, dark/light theme switching, and advanced filtering and sorting.

## Features Implemented

### Core Functionalities

1. **Task Management Across Columns**:
   - Users can move tasks between columns using transition buttons that enforce valid status transitions according to defined rules.
   
2. **Dynamic Task Count by Status**:
   - Each column header displays the number of tasks within that status, updating in real-time as tasks are moved.

3. **Header and Theme Toggle**:
   - Main header displays the title "Kanban Dashboard" along with live mode and theme toggles.
   - Users can switch between light and dark themes.
   
4. **Live Mode**:
   - In live mode, tasks transition automatically based on pre-set rules to simulate real-time task movement.

5. **Inline Editing of Tasks**:
   - Tasks can be edited inline for quick updates to title and description without leaving the board interface.

6. **Task Details Modal**:
   - A modal opens when a task is clicked (outside of the edit button), displaying full details for better visibility.

7. **Lazy Loading with Vertical Scrolling**:
   - Tasks load incrementally within each column for performance optimization, especially useful when there are many tasks.

### Additional Functionalities

1. **Filtering and Sorting Options**:
   - Users can filter tasks by priority (High, Medium, Low) and sort by title, due date, or priority within each column, making it easier to manage tasks.

2. **Customizable Task Deletion in the Done Column**:
   - Tasks in the **Done** column include a delete button, allowing users to remove completed tasks from the board, which helps in keeping the board uncluttered.

3. **Enhanced UI and UX Styling**:
   - Styled scrollbars, animated buttons, and theme-specific color adjustments enhance user experience and make the application visually appealing.
   
## Extra Functionalities Beyond the Problem Statement

1. **Filtering by Priority and Sorting**:
   - Allows users to filter tasks within each column by priority and sort them by title, due date, or priority. This was not part of the original requirements but improves task management significantly.

2. **Dynamic Theme Customization**:
   - The application supports a dark/light theme toggle with enhanced styling for each mode, including color adjustments and smooth transitions.

3. **Advanced Task Deletion**:
   - Task deletion is limited to the **Done** column, helping to keep only completed tasks under control and preserving tasks still in progress.

4. **Additional Styling for Enhanced User Experience**:
   - Custom styles for vertical scrolling bars, button animations, and hover effects make the application more interactive and pleasing to use.

## Project Structure

```
src/
├── components/
│   ├── Header/              # Header with live mode and theme toggles
│   ├── KanbanColumn/        # Column component for each task status
│   ├── TicketCard/          # Individual task card with inline editing
│   └── TicketDetailsModal/  # Modal for detailed task view
│
├── data/
│   └── tickets.json         # JSON data file containing task information
│
├── hooks/
│   └── useFakeTicketTransition.js # Hook for automatic task transitions in live mode
│
├── utils/
│   └── transitions.js       # Transition rules and validations for task status
│
├── App.js                   # Main app component orchestrating the board
├── App.css                  # Global styling for app layout and theming
└── index.js                 # Entry point of the application
```

## Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/kanban-dashboard.git
   cd kanban-dashboard
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Application**:
   ```bash
   npm start
   ```

4. **View the App**:
   Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Future Improvements

1. **Drag-and-Drop Functionality**: Integrate a drag-and-drop library to allow easier task movement between columns.
2. **Multi-User Support and Real-Time Collaboration**: Implement WebSocket or Firebase for real-time updates across multiple users.
3. **Analytics Dashboard**: Provide task completion rates, overdue task tracking, and other productivity metrics.
