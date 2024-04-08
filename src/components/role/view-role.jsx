import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
  useMediaQuery
} from '@mui/material'
import { tokens } from '@theme/theme'

const ViewRole = ({ roleData }) => {
  const [data, setData] = useState([])
  const [permissions, setPermissions] = useState({})
  const [roleName, setRoleName] = useState(roleData?.name)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const colors = tokens(theme.palette.mode)

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/module`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setData(response.data.data.moduleData)
    } catch (error) {
      console.error(error)
    }
  }

  const fetchPermissions = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/role/${roleData.u_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      const userPermissions = response.data.data.permissions
      const defaultPermissions = {}

      data.forEach(module => {
        const userHasPermissionForModule = userPermissions.some(permission => permission.module_u_id === module.u_id)
        defaultPermissions[module.u_id] = {
          u_id: module.u_id,
          selectAll: userHasPermissionForModule,
          view: userHasPermissionForModule,
          add: userHasPermissionForModule,
          update: userHasPermissionForModule,
          delete: userHasPermissionForModule,
          notification: userHasPermissionForModule
        }
      })

      setPermissions(defaultPermissions)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData();
    fetchPermissions(); // Add fetchPermissions to the dependency array
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // No dependencies


  return (
    <div style={{ width: isSmallScreen ? '100%' : '550px', backgroundColor: colors.primary[400] }}>
      <TextField
        label='Role Name'
        value={roleName}
        onChange={e => setRoleName(e.target.value)}
        fullWidth
        margin='normal'
        disabled // Disable editing the role name
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
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={permissions[item.u_id]?.view || false}
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={permissions[item.u_id]?.add || false}
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={permissions[item.u_id]?.update || false}
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={permissions[item.u_id]?.delete || false}
                    disabled
                  />
                </TableCell>
                <TableCell>
                  <Checkbox
                    checked={permissions[item.u_id]?.notification || false}
                    disabled
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

export default ViewRole
