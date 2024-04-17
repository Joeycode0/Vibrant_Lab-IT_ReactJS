// InsertRowForm.js
// Imports necessary React, hooks from react-hook-form for form management, and Material-UI components.
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Grid, Snackbar, Alert } from '@mui/material';

// Defines the InsertRowForm component that receives 'onInsert' and 'employees' as props.
const InsertRowForm = ({ onInsert, employees }) => {
  // useForm hook provides methods and state for form validation and submission.
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  // State to manage the visibility of the Snackbar component.
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // onSubmit is the function called when the form is submitted.
  const onSubmit = (data) => {
    // Calculate a new ID as the maximum ID present in 'employees' + 1 or 1 if no employees exist.
    const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    const newEmployee = { id: newId, ...data }; // Combines the new ID and form data into a new employee object.
    onInsert(newEmployee); // Calls the onInsert prop with the new employee object.
    reset(); // Resets the form fields to initial values.
    setOpenSnackbar(true); // Opens the Snackbar to show a success message.
  };

  // Handles closing the Snackbar when user clicks away or after the timeout.
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  // JSX for rendering the form and its fields with validation and error handling.
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Individual TextField components for each employee attribute, with validation rules. */}
          <Grid item xs={12}>
            <TextField
              {...register('name', { required: 'Name is required' })}
              label="Name"
              variant="outlined"
              fullWidth
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('position', { required: 'Position is required' })}
              label="Position"
              variant="outlined"
              fullWidth
              error={!!errors.position}
              helperText={errors.position?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('department', { required: 'Department is required' })}
              label="Department"
              variant="outlined"
              fullWidth
              error={!!errors.department}
              helperText={errors.department?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('age', { required: 'Age is required' })}
              type="number"
              label="Age"
              variant="outlined"
              fullWidth
              error={!!errors.age}
              helperText={errors.age?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('salary', { required: 'Salary is required' })}
              type="number"
              label="Salary"
              variant="outlined"
              fullWidth
              error={!!errors.salary}
              helperText={errors.salary?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register('experience', { required: 'Experience is required' })}
              type="number"
              label="Experience"
              variant="outlined"
              fullWidth
              error={!!errors.experience}
              helperText={errors.experience?.message}
            />
          </Grid>
          {/* Button to submit the form */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Add Employee
            </Button>
          </Grid>
        </Grid>
      </form>
      {/* Snackbar for displaying success messages after form submission */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Employee added successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default InsertRowForm;

