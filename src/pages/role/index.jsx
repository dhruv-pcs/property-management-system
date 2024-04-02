import React, { useState } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, TextField,
FormControlLabel, Checkbox, Box } from '@mui/material';

const Roles = () => {
  const [open, setOpen] = useState(false);
  const [roleName, setRoleName] = useState('');

  const [rolePermissions, setRolePermissions] = useState({
    selectAll: false,
    add: false,
    view: false,
    update: false,
    remove: false,
    notification: false
  });
  const [rolesList, setRolesList] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRolePermissionChange = (permission) => {
    setRolePermissions(prevState => ({
      ...prevState,
      [permission]: !prevState[permission]
    }));
  };

  const handleSelectAllChange = () => {
    setRolePermissions(prevState => ({
      selectAll: !prevState.selectAll,
      add: !prevState.selectAll,
      view: !prevState.selectAll,
      update: !prevState.selectAll,
      remove: !prevState.selectAll,
      notification: !prevState.selectAll
    }));
  };

  const handleAddRole = () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1cGVyQGdtYWlsLmNvbSIsImlhdCI6MTY2NDk1NDMzNCwiZXhwIjoxNjY1MDQwNzM0fQ.rHpnBA_MV89Cne24wCVLy70xLmPa0yED0z-iTk5n7so";
    
    axios.get("https://31e2-2405-201-2006-7d89-598a-147f-7377-11d0.ngrok-free.app/api/role", {
      name: roleName,
      permissions: rolePermissions,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      console.log('Role added successfully:', response.data);
      setRolesList(prevRoles => [...prevRoles, response.data]);
    })
    .catch(error => {
      console.error('Error adding role:', error);
    });
  
    handleClose();
  };
  

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Button variant="contained" onClick={handleClickOpen}>Add Role</Button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Role</DialogTitle>
        <DialogContent>
          <TextField 
            label="Role Name" 
            variant="outlined" 
            fullWidth 
            value={roleName} 
            onChange={(e) => setRoleName(e.target.value)} 
            sx={{ mb: 2 }}
          />
          <Typography>Role Permissions</Typography>
          <Box sx={{ ml: 5 }}>
            <FormControlLabel
              control={<Checkbox checked={rolePermissions.selectAll} onChange={handleSelectAllChange} />}
              label="Select All"
            />
            <FormControlLabel
              control={<Checkbox checked={rolePermissions.add} onChange={() => handleRolePermissionChange('add')} />}
              label="Add"
            />
            <FormControlLabel
              control={<Checkbox checked={rolePermissions.view} onChange={() => handleRolePermissionChange('view')} />}
              label="View"
            />
            <FormControlLabel
              control={<Checkbox checked={rolePermissions.update} onChange={() => handleRolePermissionChange('update')} />}
              label="Update"
            />
            <FormControlLabel
              control={<Checkbox checked={rolePermissions.remove} onChange={() => handleRolePermissionChange('remove')} />}
              label="Remove"
            />
            <FormControlLabel
              control={<Checkbox checked={rolePermissions.notification} onChange={() => handleRolePermissionChange('notification')} />}
              label="Notification"
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button className='text-white' onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button className='text-white' onClick={handleAddRole} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Display added roles */}
      <div>
        <Typography variant="h6">Roles List</Typography>
        <ul>
          {rolesList.map(role => (
            <li key={role.id}>{role.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Roles;
