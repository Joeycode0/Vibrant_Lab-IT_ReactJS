// App.js
// The main application component where we manage the state and interaction of the employee management system.

// React imports
import React, { useState } from 'react';

// Component imports
import TableContent from './TableContent'; // Table to display employee data
import SearchBar from './SearchBar'; // Search bar for filtering employees
import InsertRowForm from './InsertRowForm'; // Form for adding new employees
import EditRowForm from './EditRowForm'; // Form for editing existing employees

// MUI imports for theming and layout
import { Container, Typography, createTheme, ThemeProvider } from '@mui/material';

// Static asset import (make sure the path is correct)
import VibrantAmericaLogo from './VibrantAmericaLogo.png';

// Creating a MUI theme with colors matching the company's branding
const theme = createTheme({
  palette: {
    primary: {
      main: '#005b96', // A primary color from the company logo
    },
    secondary: {
      main: '#88d8b0', // A secondary color from the company logo
    },
    // Additional theme customizations can be added here
  },
  // Define any additional theme settings as required
});

// Initial hardcoded data for employees
const initialEmployeesData = [
  { 
    id: 1, 
    name: 'John Doe', 
    position: 'Software Engineer', 
    department: 'Engineering', 
    age: 30, 
    salary: 80000, 
    experience: 5 
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    position: 'UI/UX Designer', 
    department: 'Design', 
    age: 28, 
    salary: 70000, 
    experience: 4 
  },
  { 
    id: 3, 
    name: 'Michael Johnson', 
    position: 'Product Manager', 
    department: 'Product Management', 
    age: 35, 
    salary: 100000, 
    experience: 7 
  },
  { 
    id: 4, 
    name: 'Emily Brown', 
    position: 'Marketing Specialist', 
    department: 'Marketing', 
    age: 32, 
    salary: 75000, 
    experience: 6 
  },
  { 
    id: 5, 
    name: 'William Taylor', 
    position: 'Data Analyst', 
    department: 'Analytics', 
    age: 27, 
    salary: 65000, 
    experience: 3 
  }
];

// Main App component
const App = () => {
  // State hooks for managing employees array, search term, and editing state
  const [employees, setEmployees] = useState(initialEmployeesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Event handler for search term changes
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Event handler for adding a new employee
  const handleInsert = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
  };

  // Event handler for initiating edit of an employee
  const handleEditClick = (employeeId) => {
    const employee = employees.find(e => e.id === employeeId);
    setEditingEmployee({ ...employee });
  };

  // Event handler for canceling the edit operation
  const handleCancelEdit = () => {
    setEditingEmployee(null);
  };

  // Event handler for saving edited employee data
  const handleSaveEdit = (editedEmployee) => {
    setEmployees(employees.map(emp => (emp.id === editedEmployee.id ? editedEmployee : emp)));
    handleCancelEdit();
  };

  // Event handler for deleting an employee
  const handleDelete = (employeeId) => {
    setEmployees(employees.filter(emp => emp.id !== employeeId));
  };

  // Derived state for filtering employees based on the search term
  const getFilteredEmployees = () => {
    return employees.filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Render the main application UI
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        {/* Logo and title for the Employee Management System */}
        <img src={VibrantAmericaLogo} alt="Vibrant America Logo" style={{ maxWidth: '200px', margin: '20px 0' }} />
        <Typography variant="h2" gutterBottom>
          Employee Management System
        </Typography>
        {/* Search bar component */}
        <SearchBar onSearch={handleSearch} />
        {/* Conditionally render InsertRowForm or EditRowForm based on editing state */}
        {!editingEmployee ? (
          <>
            {/* Form for inserting a new employee */}
            <InsertRowForm onInsert={handleInsert} employees={employees} />
            {/* Table displaying employees */}
            <TableContent
              data={getFilteredEmployees()}
              onEditClick={handleEditClick}
              onDeleteClick={handleDelete}
            />
          </>
        ) : (
          /* Form for editing an existing employee */
          <EditRowForm
            rowData={editingEmployee}
            onSave={handleSaveEdit}
            onCancel={handleCancelEdit}
          />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;

