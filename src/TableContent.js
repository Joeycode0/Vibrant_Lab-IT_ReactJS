// TableContent.js
// Imports React and Material-UI components needed for creating a stylized table.
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';  // Material-UI icon for editing actions
import DeleteIcon from '@mui/icons-material/Delete';  // Material-UI icon for delete actions
import { styled } from '@mui/material/styles';  // Utility from Material-UI for custom styling

// Custom styled component for the Paper component which will be used as the TableContainer.
// This enhances the visual aspect by removing default shadows and applying a border.
const StyledPaper = styled(Paper)(({ theme }) => ({
  boxShadow: 'none',  // Removes shadow for a cleaner look
  borderRadius: 15,  // Rounds the corners of the paper container
  border: `1px solid ${theme.palette.divider}`,  // Applies a light border using the theme's divider color
}));

// TableContent functional component takes props data, onEditClick, and onDeleteClick.
// 'data' is the array of employee data,
// 'onEditClick' is a function to handle editing of an employee,
// 'onDeleteClick' is a function to handle the deletion of an employee.
const TableContent = ({ data, onEditClick, onDeleteClick }) => {
  return (
    <TableContainer component={StyledPaper}>
      <Table sx={{ minWidth: 650 }} aria-label="employee table">
        <TableHead>
          {/* Header row defining the columns of the table */}
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Experience</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Mapping through each employee object in the data array to create a table row for each */}
          {data.map((row) => (
            <TableRow
              key={row.id}  // Unique key for each row, using the employee's ID
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  // Removes border from the last row for visual cleanliness
            >
              {/* Data cells displaying employee information */}
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.position}</TableCell>
              <TableCell>{row.department}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.salary}</TableCell>
              <TableCell>{row.experience}</TableCell>
              {/* Action cells containing icons for edit and delete operations */}
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => onEditClick(row.id)}  // Triggers the onEditClick function with the employee's ID
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => onDeleteClick(row.id)}  // Triggers the onDeleteClick function with the employee's ID
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableContent;
