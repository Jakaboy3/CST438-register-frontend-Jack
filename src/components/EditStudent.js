import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { SERVER_URL } from '../constants';

function EditStudent (props) {
    const [open, setOpen] = useState(false);
    const [student, setStudent] = useState(props.editStudent);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setStudent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEdit = () => {
        props.update(student);
        handleClose();
    };



    return (
        <div>
            <Button id="editStudent" variant="outlined" color="primary" style={{ margin: 10 }} onClick={handleClickOpen}>
                Edit Student
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Student</DialogTitle>
                  <DialogContent style={{ paddingTop: 20 }}>
                      <TextField 
                          id="name" 
                          value={student.name} 
                          autoFocus 
                          fullWidth 
                          label="Student Name" 
                          name="name" 
                          onChange={handleChange} 
                      />
                      <TextField 
                          id="email" 
                          value={student.email} 
                          fullWidth 
                          label="Student Email" 
                          name="email" 
                          onChange={handleChange} 
                      />
                  </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Cancel</Button>
                    <Button id="edit" color="primary" onClick={handleEdit}>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


export default EditStudent;
