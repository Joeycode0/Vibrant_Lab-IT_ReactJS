// EditRowForm.js
// Imports necessary React component and Material-UI components for building the form.
import React, { useState } from 'react';
import { Button, TextField, Grid, Snackbar, Alert } from '@mui/material';

// Defines the EditRowForm component with props for current row data, save handler, and cancel handler.
const EditRowForm = ({ rowData, onSave, onCancel }) => {
  // State to manage the form data as it is being edited.
  const [editData, setEditData] = useState(rowData);
  // State to manage the visibility of the Snackbar for feedback.
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Function to handle changes in form inputs and update state accordingly.
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure the name and value from the event target.
    setEditData(prevData => ({ ...prevData, [name]: value })); // Update the editData state with new values.
  };

  // Function to handle form submission.
  const handleSave = () => {
    onSave(editData); // Calls the onSave function passed as a prop with the updated data.
    setOpenSnackbar(true); // Triggers the Snackbar to open showing a success message.
  };

  // Function to handle the closing of the Snackbar.
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return; // If the Snackbar is closed by clicking away, do nothing.
    }
    setOpenSnackbar(false); // Otherwise, close the Snackbar.
  };

  // Render the form UI using Material-UI components structured in a Grid layout.
  return (
    <Grid container spacing={2}>
      {/* Iterates over the rowData object keys to generate TextField components dynamically. */}
      {Object.keys(rowData).map((key) => (
        key !== 'id' && ( // Excludes the 'id' field from being editable.
          <Grid item xs={12} sm={6} key={key}>
            <TextField
              label={key.charAt(0).toUpperCase() + key.slice(1)} // Capitalizes the first letter of the label.
              name={key} // Name attribute matches the key of rowData.
              value={editData[key]} // Value is taken from the editData state.
              onChange={handleChange} // Registers the handleChange function to update state on user input.
              fullWidth // Makes the TextField take the full width of its container.
            />
          </Grid>
        )
      ))}
      <Grid item xs={12}>
        {/* Save button to submit changes */}
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
        {/* Cancel button to revert changes and close the form */}
        <Button variant="contained" color="secondary" onClick={() => {
          onCancel(); // Calls the onCancel function passed as a prop.
          setOpenSnackbar(false); // Closes the Snackbar if open.
        }}>
          Cancel
        </Button>
      </Grid>
      {/* Snackbar component to give feedback when an action is completed */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Employee updated successfully!
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default EditRowForm;
