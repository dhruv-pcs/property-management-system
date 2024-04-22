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
  Button,
  useMediaQuery
} from '@mui/material'
import { tokens } from '@theme/theme'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useForm } from 'react-hook-form'
import { Form } from 'react-bootstrap'

export const handlePermissionChange = (permissions, setPermissions, permission) => {
  const { module_u_id: moduleId, permissionType, value } = permission;

 

  if (permissionType === 'selectAll') {
    const updatedPermissions = { ...permissions };
    Object.keys(updatedPermissions[moduleId]).forEach(key => {
      if (key !== 'module_u_id' && key !== 'selectAll') {
        updatedPermissions[moduleId][key] = value;
      }
    });
    updatedPermissions[moduleId].selectAll = value;
    setPermissions(updatedPermissions);
  } else {
    setPermissions(prevPermissions => ({
      ...prevPermissions,
      [moduleId]: {
        ...prevPermissions[moduleId],
        [permissionType]: value
      }
    }));

    if (permissionType === 'view') {
      const existingPermissions = permissions[moduleId];

      const updatedPermissions = {
        ...permissions,
        [moduleId]: {
          ...existingPermissions,
          view: value,
          add: false,
          update: false,
          remove: false,
          notification: false
        }
      };
      setPermissions(updatedPermissions);
    }
    
  }
};

export const handleGlobalSelectAllChange = (value, permissions, setPermissions, moduleData) => {
  const updatedPermissions = {}
  moduleData.forEach(item => {
    updatedPermissions[item.u_id] = {
      ...permissions[item.u_id],
      selectAll: value,
      view: value,
      add: value,
      update: value,
      remove: value,
      notification: value
    }
  })
  setPermissions(updatedPermissions)
}


const EditRole = ({ roleData, onUpdate, onClose }) => {
  const [moduleData, setModuleData] = useState([])
  const [permissions, setPermissions] = useState({})
  const [roleName, setRoleName] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const colors = tokens(theme.palette.mode)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm()

  useEffect(() => {
    const fetchModuleData = async () => {
      
        
        const roleResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/role/${roleData.u_id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        setRoleName(roleResponse.data.data.roleName)
        setValue('roleName', roleResponse.data.data.roleName)
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



 

  const onSubmit = async () => {
    try {
      setFormSubmitted(true)
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
        roleName: roleName.trim() || roleName,
        permissions: permissionsPayload
      }

      if (roleName.trim() === '') {
       
        return
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
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-1'>
            <Form.Label htmlFor='role-name'>Role Name</Form.Label>
            <Form.Control
              id='role-name'
              label='Role Name'
              value={roleName}
              {...register('roleName', { required: 'Role name is required' })}
              defaultValue={roleName}
              onChange={e => setRoleName(e.target.value)}
            />
           {!formSubmitted && errors.roleName && (
    <span className='text-danger mt-3'>{errors.roleName.message}</span>
  )}
          </Form.Group>
          <div className='mt-2'>
            <input
              id='select-all'
              className='form-check-input'
              type='checkbox'
              checked={Object.values(permissions).every(module => module.selectAll)}
              style={{ marginLeft: '5px' }}
              onChange={e => handleGlobalSelectAllChange(e.target.checked, permissions, setPermissions ,moduleData)}
              data-testid='select-all-checkbox'
            />
            <label htmlFor='select-all' className='form-check-label'>
              Select All Permissions
            </label>
          </div>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow className='text-center font-weight-bold'>
                  <TableCell sx={{ width: '40%', fontWeight: 'bold' }}>Module Name</TableCell>
                  <TableCell sx={{ width: '20%', fontWeight: 'bold' }}>Select All</TableCell>
                  <TableCell sx={{ width: '10%', fontWeight: 'bold' }}>View</TableCell>
                  <TableCell sx={{ width: '10%', fontWeight: 'bold' }}>Add</TableCell>
                  <TableCell sx={{ width: '10%', fontWeight: 'bold' }}>Update</TableCell>
                  <TableCell sx={{ width: '10%', fontWeight: 'bold' }}>Delete</TableCell>
                  <TableCell sx={{ width: '10%', fontWeight: 'bold' }}>Notification</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
          <TableContainer className='overflow-auto' style={{ maxHeight: 400 }}>
            <Table>
              <TableBody>
                {moduleData.map(item => (
                  <TableRow key={item.u_id} className=''>
                    <TableCell>{item.module.alias_name}</TableCell>
                    <TableCell>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        checked={permissions[item.u_id]?.selectAll || false}
                        onChange={e =>
                          handlePermissionChange(permissions, setPermissions,{
                            module_u_id: item.u_id,
                            permissionType: 'selectAll',
                            value: e.target.checked
                          })
                        }
                        data-testid={`select-all-checkbox-${item.u_id}`}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        checked={permissions[item.u_id]?.view || false}
                        onChange={e =>
                          handlePermissionChange(permissions, setPermissions,{
                            module_u_id: item.u_id,
                            permissionType: 'view',
                            value: e.target.checked
                          })
                        }
                        data-testid={`view-checkbox-${item.u_id}`}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        checked={permissions[item.u_id]?.add || false}
                        onChange={e =>
                          handlePermissionChange(permissions, setPermissions,{
                            module_u_id: item.u_id,
                            permissionType: 'add',
                            value: e.target.checked
                          })
                        }
                        disabled={!permissions[item.u_id]?.view || permissions[item.u_id]?.selectAll}
                        data-testid={`add-checkbox-${item.u_id}`}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        checked={permissions[item.u_id]?.update || false}
                        onChange={e =>
                          handlePermissionChange(permissions, setPermissions,{
                            module_u_id: item.u_id,
                            permissionType: 'update',
                            value: e.target.checked
                          })
                        }
                        disabled={!permissions[item.u_id]?.view || permissions[item.u_id]?.selectAll}
                        data-testid={`update-checkbox-${item.u_id}`}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        checked={permissions[item.u_id]?.remove || false}
                        onChange={e =>
                          handlePermissionChange(permissions, setPermissions,{
                            module_u_id: item.u_id,
                            permissionType: 'remove',
                            value: e.target.checked
                          })
                        }
                        disabled={!permissions[item.u_id]?.view || permissions[item.u_id]?.selectAll}
                        data-testid={`remove-checkbox-${item.u_id}`}
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        checked={permissions[item.u_id]?.notification || false}
                        onChange={e =>
                          handlePermissionChange(permissions, setPermissions,{
                            module_u_id: item.u_id,
                            permissionType: 'notification',
                            value: e.target.checked
                          })
                        }
                        disabled={!permissions[item.u_id]?.view || permissions[item.u_id]?.selectAll}
                        data-testid={`notification-checkbox-${item.u_id}`}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            id='save-permissions'
            aria-label='Save'
            variant='contained'
            className='mt-4 w-100'
            color='primary'
            type='submit'
            data-testid="save-permissions"
          >
            Save Permissions
          </Button>
        </Form>
      </div>
      <ToastContainer draggable closeOnClick={true} position='top-right' autoClose={3000} />
    </>
  )
}


export default EditRole
