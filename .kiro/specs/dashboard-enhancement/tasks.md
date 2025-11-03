# Implementation Plan

- [x] 1. Create backend dashboard statistics service and controller
  - Create DashboardService class with methods for statistics aggregation
  - Create DashboardController with index method for serving dashboard data
  - Add dashboard route and update existing dashboard route to use new controller
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 2. Enhance Student model and controller for sorting and pagination
  - [x] 2.1 Add query scopes to Student model for filtering and statistics
    - Add scopeByGender, scopeRecent, and other utility scopes
    - Add student_count accessor to Department model
    - _Requirements: 1.2, 1.3, 2.1, 2.4_
  
  - [x] 2.2 Update StudentController index method with sorting and filtering
    - Implement sorting logic for name, email, registration date, department, gender
    - Add search functionality for name and email fields
    - Maintain query parameters across pagination
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 3. Enhance Department model and controller for sorting and pagination
  - [x] 3.1 Add query scopes to Department model
    - Add scopeActive and other utility scopes
    - Add relationships and accessors for student counts
    - _Requirements: 4.1, 4.4_
  
  - [x] 3.2 Update DepartmentController index method with sorting and filtering
    - Implement sorting logic for name, duration, status, creation date
    - Add search functionality for department names
    - Maintain query parameters across pagination
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 4. Create reusable UI components for statistics and data display
  - [x] 4.1 Create StatisticsCard component
    - Build reusable card component for displaying numerical statistics
    - Include icon support and color theming
    - _Requirements: 1.5, 6.4_
  
  - [x] 4.2 Create SortableTable component
    - Build table component with sortable column headers
    - Include sort direction indicators and click handlers
    - _Requirements: 2.5, 4.5, 6.5_
  
  - [x] 4.3 Create PaginationControls component
    - Build pagination component with page numbers and navigation
    - Include results count display and responsive design
    - _Requirements: 3.2, 3.4, 5.2, 5.4, 6.2_

- [x] 5. Update Dashboard page with statistics widgets
  - Replace basic dashboard content with statistics cards
  - Display total students, gender distribution, and recent registrations
  - Implement responsive grid layout for statistics cards
  - _Requirements: 1.1, 1.2, 1.3, 1.5, 6.1, 6.2, 6.4_

- [x] 6. Update Students Index page with enhanced functionality
  - [x] 6.1 Integrate SortableTable component
    - Replace existing table with sortable table component
    - Configure sortable columns for all student fields
    - _Requirements: 2.1, 2.2, 2.5, 6.4, 6.5_
  
  - [x] 6.2 Add search and filter controls
    - Implement search input for name and email filtering
    - Add URL parameter management for maintaining state
    - _Requirements: 2.3, 2.4, 3.5_
  
  - [x] 6.3 Integrate PaginationControls component
    - Replace existing pagination with enhanced pagination component
    - Ensure proper state management across page changes
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 7. Update Departments Index page with enhanced functionality
  - [x] 7.1 Integrate SortableTable component
    - Replace existing table with sortable table component
    - Configure sortable columns for all department fields
    - _Requirements: 4.1, 4.2, 4.5, 6.4, 6.5_
  
  - [x] 7.2 Add search and filter controls
    - Implement search input for department name filtering
    - Add URL parameter management for maintaining state
    - _Requirements: 4.3, 4.4, 5.5_
  
  - [x] 7.3 Integrate PaginationControls component
    - Replace existing pagination with enhanced pagination component
    - Ensure proper state management across page changes
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 8. Implement TypeScript interfaces and types
  - Create comprehensive TypeScript interfaces for all data models
  - Add interfaces for component props and API responses
  - Update existing components to use proper typing
  - _Requirements: 6.1, 6.4_

- [x] 9. Add loading states and error handling
  - [x] 9.1 Implement loading indicators
    - Add skeleton loaders for table data
    - Add loading states for statistics cards
    - _Requirements: 6.3_
  
  - [x] 9.2 Add error handling and empty states
    - Implement error boundaries and error messages
    - Add empty state components for no data scenarios
    - _Requirements: 6.3, 6.4_

- [x] 10. Write comprehensive tests
  - [x] 10.1 Write backend unit tests
    - Test DashboardService statistics methods
    - Test controller sorting and filtering logic
    - _Requirements: 1.1, 1.2, 2.1, 4.1_
  
  - [x] 10.2 Write frontend component tests
    - Test StatisticsCard component rendering and props
    - Test SortableTable sorting functionality
    - Test PaginationControls navigation
    - _Requirements: 1.5, 2.5, 3.2, 4.5, 5.2_
  
  - [x] 10.3 Write integration tests
    - Test complete dashboard statistics flow
    - Test student and department listing with sorting/pagination
    - _Requirements: 1.4, 2.3, 3.3, 4.3, 5.3_

- [x] 11. Apply consistent styling and responsive design
  - Update all components to use consistent color scheme and typography
  - Ensure responsive design works across desktop, tablet, and mobile
  - Add hover states and visual feedback for interactive elements
  - _Requirements: 6.1, 6.2, 6.4, 6.5_