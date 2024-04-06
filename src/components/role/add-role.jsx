import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  TextField,
  FormHelperText,
  useMediaQuery,

} from '@mui/material';
import { tokens } from '@theme/theme';

const AddRole = ({ onUpdate, onClose }) => {
  const [data, setData] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [roleName, setRoleName] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false); 
    const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const colors = tokens(theme.palette.mode);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/module`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setData(response.data.data.moduleData);

      const initialPermissions = {};
      response.data.data.moduleData.forEach(module => {
        initialPermissions[module.u_id] = {
          u_id: module.u_id,
          selectAll: false,
          view: false,
          add: false,
          update: false,
          delete: false,
          notification: false
        };
      });
      setPermissions(initialPermissions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePermissionChange = (moduleName, permissionType, value) => {
    if (permissionType === 'view' && !value) {
      const updatedPermissions = {
        ...permissions,
        [moduleName]: {
          ...permissions[moduleName],
          view: false,
          add: false,
          update: false,
          delete: false,
          notification: false,
          selectAll: false
        }
      };
      setPermissions(updatedPermissions);
    } else {
      setPermissions(prevPermissions => ({
        ...prevPermissions,
        [moduleName]: {
          ...prevPermissions[moduleName],
          [permissionType]: value
        }
      }));
    }
  };

  const handleSelectAllChange = (moduleName, value) => {
    setPermissions(prevPermissions => ({
      ...prevPermissions,
      [moduleName]: {
        ...prevPermissions[moduleName],
        selectAll: value,
        view: value,
        add: value,
        update: value,
        delete: value,
        notification: value
      }
    }));
  };

  const handleGlobalSelectAllChange = value => {
    setSelectAll(value);

    const updatedPermissions = {};
    Object.keys(permissions).forEach(moduleName => {
      updatedPermissions[moduleName] = {
        ...permissions[moduleName],
        selectAll: value,
        view: value,
        add: value,
        update: value,
        delete: value,
        notification: value
      };
    });
    setPermissions(updatedPermissions);
  };

  const handleSubmit = async () => {
    try {
      setFormSubmitted(true); // Set form submission status to true
      const permissionsPayload = [];

      Object.keys(permissions).forEach(moduleId => {
        const moduleData = permissions[moduleId];

        const selectedPermissions = Object.keys(moduleData)
          .filter(permission => permission !== 'u_id' && permission !== 'selectAll' && moduleData[permission])
          .map(permission => ({
            [permission]: moduleData[permission]
          }));
        if (selectedPermissions.length > 0) {
          const modulePayload = {
            u_id: moduleId,
            ...Object.assign({}, ...selectedPermissions)
          };
          permissionsPayload.push(modulePayload);
        }
      });

      const payload = {
        roleName: roleName,
        modules: permissionsPayload
      };

      if (roleName.trim() === '') {
        // If role name is empty, prevent form submission
        return;
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/role`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.status === 201) {
        onUpdate();
        onClose();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ width: isSmallScreen ? '100%' : '550px', backgroundColor: colors.primary[400] }}>
      <TextField
        label='Role Name'
        value={roleName}
        onChange={e => setRoleName(e.target.value)}
        fullWidth
        margin='normal'
        required
        error={formSubmitted && roleName.trim() === ''}  
      />
      {formSubmitted && roleName.trim() === '' && (
        <FormHelperText error>Please enter a role name</FormHelperText> // Show error message
      )}
      <Checkbox checked={selectAll} onChange={e => handleGlobalSelectAllChange(e.target.checked)} />
      Select All Permissions
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className='text-center '>
              <TableCell sx={{ width: '40%' }}>Module Name</TableCell>
              <TableCell sx={{ width: '20%' }}>Select All</TableCell>
              <TableCell sx={{ width: '10%' }}>View</TableCell>
              <TableCell sx={{ width: '10%' }}>Add</TableCell>
              <TableCell sx={{ width: '10%' }}>Update</TableCell>
              <TableCell sx={{ width: '10%' }}>Delete</TableCell>
              <TableCell sx={{ width: '10%' }}>Notification</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <TableContainer className='overflow-auto' style={{ maxHeight: 400 }}>
        <Table>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index} className=''>
                <TableCell>{item.alias_name}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={permissions[item.u_id]?.selectAll || false}
                    disabled={selectAll}
                    onChange={e => handleSelectAllChange(item.u_id, e.target.checked)}
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={permissions[item.u_id]?.view || false}
                    disabled={selectAll}
                    onChange={e => handlePermissionChange(item.u_id, 'view', e.target.checked)}
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={permissions[item.u_id]?.add || false}
                    onChange={e => handlePermissionChange(item.u_id, 'add', e.target.checked)}
                    disabled={!permissions[item.u_id]?.view || selectAll}
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={permissions[item.u_id]?.update || false}
                    onChange={e => handlePermissionChange(item.u_id, 'update', e.target.checked)}
                    disabled={!permissions[item.u_id]?.view || selectAll}
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={permissions[item.u_id]?.delete || false}
                    onChange={e => handlePermissionChange(item.u_id, 'delete', e.target.checked)}
                    disabled={!permissions[item.u_id]?.view || selectAll}
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={permissions[item.u_id]?.notification || false}
                    onChange={e => handlePermissionChange(item.u_id, 'notification', e.target.checked)}
                    disabled={!permissions[item.u_id]?.view || selectAll}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant='contained' className='mt-4 w-100' color='primary' onClick={handleSubmit}>
        Save Permissions
      </Button>
    </div>
  );
};

export default AddRole;
