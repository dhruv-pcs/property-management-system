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
  const [moduleData, setModuleData] = useState([])
  const [permissions, setPermissions] = useState({})
  const [roleName, setRoleName] = useState('')
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const colors = tokens(theme.palette.mode)

  useEffect(() => {
    const fetchModuleData = async () => {
      const roleResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/role/${roleData.u_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setRoleName(roleResponse.data.data.roleName)
      const rolePermissions = roleResponse.data.data.permissions

      const initialPermissions = {}
      const moduleData = []
      rolePermissions.forEach(permission => {
        const moduleId = permission.u_id
        if (!initialPermissions[moduleId]) {
          initialPermissions[moduleId] = {
            selectAll:
              permission.view && permission.add && permission.update && permission.remove && permission.notification,
            view: permission.view,
            add: permission.add,
            update: permission.update,
            remove: permission.remove,
            notification: permission.notification
          }
          moduleData.push(permission)
        }
      })
      setPermissions(initialPermissions)
      setModuleData(moduleData)
    }
    fetchModuleData()
  }, [roleData])

  return (
    <>
      <div style={{ width: isSmallScreen ? '100%' : '550px', backgroundColor: colors.primary[400] }}>
        <TextField label='Role Name' value={roleName} fullWidth margin='normal' disabled />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className='text-center'>
                <TableCell sx={{ width: '40%' }}>Module Name</TableCell>
                <TableCell sx={{ width: '20%' }}>Select All</TableCell>
                <TableCell sx={{ width: '10%' }}>View</TableCell>
                <TableCell sx={{ width: '10%' }}>Add</TableCell>
                <TableCell sx={{ width: '10%' }}>Update</TableCell>
                <TableCell sx={{ width: '10%' }}>Delete</TableCell>
                <TableCell sx={{ width: '10%' }}>Notification</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {moduleData.map(item => (
                <TableRow key={item.u_id}>
                  <TableCell>{item.module.alias_name}</TableCell>
                  <TableCell>
                    <Checkbox checked={permissions[item.u_id]?.selectAll || false} disabled />
                  </TableCell>
                  <TableCell>
                    <Checkbox checked={permissions[item.u_id]?.view || false} disabled />
                  </TableCell>
                  <TableCell>
                    <Checkbox checked={permissions[item.u_id]?.add || false} disabled />
                  </TableCell>
                  <TableCell>
                    <Checkbox checked={permissions[item.u_id]?.update || false} disabled />
                  </TableCell>
                  <TableCell>
                    <Checkbox checked={permissions[item.u_id]?.remove || false} disabled />
                  </TableCell>
                  <TableCell>
                    <Checkbox checked={permissions[item.u_id]?.notification || false} disabled />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}

export default ViewRole
