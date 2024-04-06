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
    import moduleData from './a.json'; 



    const EditRole = ({roleData, onUpdate, onClose}) => {
        const [data, setData] = useState([]);
        const [userData, setUserData] = useState([]);

    const [permissions, setPermissions] = useState({});
    const [selectAll, setSelectAll] = useState(false);
    const [roleName, setRoleName] = useState(roleData?.name);
    const [formSubmitted, setFormSubmitted] = useState(false); 
        const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
    const colors = tokens(theme.palette.mode);


    //   const fetchData = async () => {
    //     try {
    //       setUserData(moduleData.data.permissions);
    //       console.log('data', moduleData);
    //       const userPermissions = userData
    //       const defaultPermissions = {};

    //       moduleData.data.permissions.forEach(module => {
    //         const userHasPermissionForModule = userPermissions.some(permission => permission.module_u_id === module.module_u_id);
    
    //         defaultPermissions[module.module_u_id] = {
    //           u_id: module.u_id,
    //           selectAll: userHasPermissionForModule,
    //           view: userData.view,
    //           add:userData.add,
    //           update: userData.update,
    //           remove: userData.remove,
    //           notification: userData.notification
    //         };
    //       });
    
    //       // Set default permissions state
    //       setPermissions(defaultPermissions);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };


    const fetchData = async () => {
        try {
        setUserData(moduleData.data.permissions); // Set user data
    
        console.log('userData', moduleData.data.permissions);
        const userPermissions = moduleData.data.permissions; // Access user data directly
        const defaultPermissions = {};
    
        moduleData.data.permissions.forEach(module => {
            const userHasPermissionForModule = userPermissions.some(permission => permission.module_u_id === module.module_u_id);
    
            defaultPermissions[module.module_u_id] = {
            u_id: module.u_id,
            selectAll: userHasPermissionForModule,
            view: userHasPermissionForModule,
            add: userHasPermissionForModule,
            update: userHasPermissionForModule,
            delete: userHasPermissionForModule,
            notification: userHasPermissionForModule
            };
        });
  
        setPermissions(defaultPermissions);
        } catch (error) {
        console.error(error);
        }
    };
    
    
    //   const fetchData = async () => {
    //     try {
    //       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/role/${roleData.u_id}`, {
    //         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    //       })
    //       setUserData(response.data.data.permissions);

    //       // Set default permissions based on user's current permissions
    //       const userPermissions = response.data.data.permissions;
    //       const defaultPermissions = {};
        
    //       // Loop through modules and set default permissions
    //       data.forEach(module => {
    //         defaultPermissions[module.u_id] = {
    //           u_id: module.u_id,
    //           selectAll: userPermissions.some(permission => permission.module_id === module.u_id), // Check if user has any permission for this module
    //           view: false, // Default to false
    //           add: false, // Default to false
    //           update: false, // Default to false
    //           delete: false, // Default to false
    //           notification: false, // Default to false
    //           imageUrl: images[Math.floor(Math.random() * images.length)] // Not sure where 'images' variable is defined in your code, please replace it accordingly
    //         };
    //       });
    //       setPermissions(defaultPermissions);
    //     } catch (error) {
    //       console.error(error)
    //     }
    // }


    const fetchModule = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/module`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setData(response.data.data.moduleData);
            const userPermissions = response.data.data.permissions;
            
          
            const defaultPermissions = {};
    
            response.data.data.moduleData.forEach(module => {
                const userHasPermissionForModule = userPermissions.some(permission => permission.module_u_id === module.u_id);
                defaultPermissions[module.u_id] = {
                    u_id: module.u_id,
                    selectAll: userHasPermissionForModule,
                    view: userHasPermissionForModule,
                    add: userHasPermissionForModule,
                    update: userHasPermissionForModule,
                    delete: userHasPermissionForModule,
                    notification: userHasPermissionForModule
                };
                console.log('defaultPermissions', defaultPermissions);
            });
    
            // Set default permissions state
            setPermissions(defaultPermissions);
        } catch (error) {
            console.error(error);
        }
    };
    
    
    

        useEffect(() => {
        fetchData(); 
        fetchModule();
        },[])

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
                    const selectedPermissions = {};
        
                    Object.keys(moduleData).forEach(permission => {
                        if (permission === 'delete') {
                            selectedPermissions['remove'] = moduleData[permission];
                        } else if (permission !== 'u_id' && permission !== 'selectAll') {
                            selectedPermissions[permission] = moduleData[permission];
                        }
                    });
        
                    if (Object.keys(selectedPermissions).length > 0) {
                        const modulePayload = {
                            u_id: moduleId,
                            ...selectedPermissions
                        };
                        permissionsPayload.push(modulePayload);
                    }
                });
        
                const payload = {
                    roleName: roleName,
                    permissions: permissionsPayload
                };
        
                if (roleName.trim() === '') {
                    return;
                }
        
                console.log('payload', payload);
        
                const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/role/${roleData.u_id}`, payload, {
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
    )
    }

    export default EditRole