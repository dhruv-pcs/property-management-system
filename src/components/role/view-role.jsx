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
TextField,
useMediaQuery,

} from '@mui/material';
import { tokens } from '@theme/theme';
import moduleData from './a.json'; 



const EditRole = ({roleData}) => {
    const [data, setData] = useState([]);
    const [userData, setUserData] = useState([]);

const [permissions, setPermissions] = useState({});
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
    setUserData(moduleData.data.permissions); 
    const userPermissions = userData; 
    const defaultPermissions = {};

    userData?.forEach(module => {
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
    },[fetchData])
     



   
    
    

return (
    <div style={{ width: isSmallScreen ? '100%' : '550px', backgroundColor: colors.primary[400] }}>
    <TextField
        label='Role Name'
        value={roleData.name}
        className='pointer-events-none'
        fullWidth
        margin='normal'
       
    />
   
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
                
                />
                </TableCell>
                <TableCell>
                <Checkbox
                    checked={permissions[item.u_id]?.view || false}
                    
                />
                </TableCell>
                <TableCell>
                <Checkbox
                    checked={permissions[item.u_id]?.add || false}
                   
                />
                </TableCell>
                <TableCell>
                <Checkbox
                    checked={permissions[item.u_id]?.update || false}
                    
                />
                </TableCell>
                <TableCell>
                <Checkbox
                    checked={permissions[item.u_id]?.delete || false}
                    
                />
                </TableCell>
                <TableCell>
                <Checkbox
                    checked={permissions[item.u_id]?.notification || false}
                  
                />
                </TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </TableContainer>
   
    </div>
)
}

export default EditRole