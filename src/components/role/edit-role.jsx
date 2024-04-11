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
  Button,
  TextField,
  useMediaQuery
} from '@mui/material'
import { tokens } from '@theme/theme'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const EditRole = ({ roleData, onUpdate, onClose }) => {
  const [moduleData, setModuleData] = useState([])
  const [permissions, setPermissions] = useState({})
  const [roleName, setRoleName] = useState('')
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const colors = tokens(theme.palette.mode)

  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        if (!roleData || !roleData.u_id) {
          console.error('Role data is missing or incomplete')

          return
        }

        const roleResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/role/${roleData.u_id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        setRoleName(roleResponse.data.data.roleName)
        const rolePermissions = roleResponse.data.data.permissions

        // Initialize permissions object
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
      } catch (error) {
        console.error(error)
      }
    }
    fetchModuleData()
  }, [roleData])

  const handlePermissionChange = permission => {
    const { module_u_id: moduleId, permissionType, value } = permission

    if (!permissions[moduleId]) {
      console.error(`Module with moduleId ${moduleId} does not exist.`)

      return
    }

    if (permissionType === 'selectAll') {
      const updatedPermissions = { ...permissions }

      Object.keys(updatedPermissions[moduleId]).forEach(key => {
        if (key !== 'module_u_id' && key !== 'selectAll') {
          updatedPermissions[moduleId][key] = value
        }
      })
      updatedPermissions[moduleId].selectAll = value
      setPermissions(updatedPermissions)
    } else {
      setPermissions(prevPermissions => ({
        ...prevPermissions,
        [moduleId]: {
          ...prevPermissions[moduleId],
          [permissionType]: value
        }
      }))

      if (permissionType === 'view' && !value) {
        setPermissions(prevPermissions => ({
          ...prevPermissions,
          [moduleId]: {
            ...prevPermissions[moduleId],
            add: false,
            update: false,
            remove: false,
            notification: false
          }
        }))
      }
    }
  }

  const handleSubmit = async () => {
    try {
      const permissionsPayload = []
      Object.keys(permissions).forEach(moduleId => {
        const moduleData = permissions[moduleId]
        permissionsPayload.push({
          u_id: moduleId,
          view: moduleData.view,
          add: moduleData.add,
          update: moduleData.update,
          remove: moduleData.remove,
          notification: moduleData.notification
        })
      })

      const payload = {
        roleName: roleName.trim(),
        permissions: permissionsPayload
      }

      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/role/${roleData.u_id}`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      if (response.status === 201) {
        onUpdate()
        onClose()
        toast.success('Role updated successfully!')
      }
    } catch (error) {
      toast.error('Error updating role. Please try again later.')
      console.log('Error:', error)
    }
  }

  return (
    <>
      <div style={{ width: isSmallScreen ? '100%' : '550px', backgroundColor: colors.primary[400] }}>
        <TextField
          label='Role Name'
          value={roleName}
          onChange={e => setRoleName(e.target.value)}
          fullWidth
          margin='normal'
          required
        />

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
                    <Checkbox
                      checked={permissions[item.u_id]?.selectAll || false}
                      onChange={e =>
                        handlePermissionChange({
                          module_u_id: item.u_id,
                          permissionType: 'selectAll',
                          value: e.target.checked
                        })
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={permissions[item.u_id]?.view || false}
                      onChange={e =>
                        handlePermissionChange({
                          module_u_id: item.u_id,
                          permissionType: 'view',
                          value: e.target.checked
                        })
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={permissions[item.u_id]?.add || false}
                      onChange={e =>
                        handlePermissionChange({
                          module_u_id: item.u_id,
                          permissionType: 'add',
                          value: e.target.checked
                        })
                      }
                      disabled={!permissions[item.u_id]?.view && !permissions[item.u_id]?.selectAll}
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={permissions[item.u_id]?.update || false}
                      onChange={e =>
                        handlePermissionChange({
                          module_u_id: item.u_id,
                          permissionType: 'update',
                          value: e.target.checked
                        })
                      }
                      disabled={!permissions[item.u_id]?.view && !permissions[item.u_id]?.selectAll}
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={permissions[item.u_id]?.remove || false}
                      onChange={e =>
                        handlePermissionChange({
                          module_u_id: item.u_id,
                          permissionType: 'remove',
                          value: e.target.checked
                        })
                      }
                      disabled={!permissions[item.u_id]?.view && !permissions[item.u_id]?.selectAll}
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={permissions[item.u_id]?.notification || false}
                      onChange={e =>
                        handlePermissionChange({
                          module_u_id: item.u_id,
                          permissionType: 'notification',
                          value: e.target.checked
                        })
                      }
                      disabled={!permissions[item.u_id]?.view && !permissions[item.u_id]?.selectAll}
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
      <ToastContainer draggable closeOnClick={true} position='top-right' autoClose={3000} />
    </>
  )
}

export default EditRole
