// SearchBar.js
// Imports the necessary React component and Material-UI components.
import React from 'react';
import { TextField } from '@mui/material';

// Defines the SearchBar component which accepts an 'onSearch' prop. This prop is a function
// that will be called whenever the input value changes, enabling dynamic searching.
const SearchBar = ({ onSearch }) => {
  return (
    // TextField component from Material-UI is used here to create an input field styled 
    // according to Material-UI's design principles.
    <TextField
      fullWidth  // This prop makes the TextField span the full width of its parent container.
      label="Search Employees"  // Label text that appears above the TextField when it is in focus.
      variant="outlined"  // Defines the style of the TextField; "outlined" means it will have a border.
      onChange={e => onSearch(e.target.value)}  // Event handler that triggers on each keystroke to update the search term in the parent component.
      sx={{ mb: 2 }}  // Uses the 'sx' prop to apply custom styles. Here, it adds a margin bottom of 2 spacing units.
    />
  );
};

export default SearchBar;
