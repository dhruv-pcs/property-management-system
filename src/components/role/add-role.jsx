// ** React Imports **
import React, { useEffect, useState } from 'react'

// ** Custom Components **
import { tokens } from '@theme/theme'

// ** Third Party Imports **
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
import { ToastContainer, toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { Form } from 'react-bootstrap'

// ** API Imports **
import axios from 'axios'

// ** Styles **
import 'react-toastify/dist/ReactToastify.css'

// ** handlePermissionChange function **
export const handlePermissionChange = (permissions, setPermissions, moduleName, permissionType, value) => {
  if (permissionType === 'view' && !value) {
    const updatedPermissions = {
      ...permissions,
      [moduleName]: {
        ...permissions[moduleName],
        [permissionType]: value
      }
    }
    setPermissions(updatedPermissions)
  } else {
    setPermissions(prevPermissions => ({
      ...prevPermissions,
      [moduleName]: {
        ...prevPermissions[moduleName],
        [permissionType]: value
      }
    }))
  }
}

// ** handleGlobalSelectAllChange function **
export const handleGlobalSelectAllChange = (permissions, setPermissions, setSelectAll, value) => {
  setSelectAll(value)

  const updatedPermissions = {}
  Object.keys(permissions).forEach(moduleName => {
    updatedPermissions[moduleName] = {
      ...permissions[moduleName],
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

const AddRole = ({ onUpdate, onClose }) => {
  // ** Vars **
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const colors = tokens(theme.palette.mode)

  // ** States **
  const [data, setData] = useState([])
  const [permissions, setPermissions] = useState({})
  const [selectAll, setSelectAll] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  // ** Function to fetch data **
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/module`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setData(response.data.data.moduleData)
      const initialPermissions = {}
      response.data.data.moduleData.forEach(module => {
        initialPermissions[module.u_id] = {
          u_id: module.u_id,
          selectAll: false,
          view: false,
          add: false,
          update: false,
          remove: false,
          notification: false
        }
      })
      setPermissions(initialPermissions)
    } catch (error) {
      toast.error('Error Fetching Data')
    }
  }

  // ** Function to Select All Permissions **
  const handleSelectAllChange = (moduleName, value) => {
    setPermissions(prevPermissions => ({
      ...prevPermissions,
      [moduleName]: {
        ...prevPermissions[moduleName],
        selectAll: value,
        view: value,
        add: value,
        update: value,
        remove: value,
        notification: value
      }
    }))
  }

  // ** Function to Submit Form **
  const onSubmit = async data => {
    try {
      setFormSubmitted(true)
      const permissionsPayload = []

      Object.keys(permissions).forEach(moduleId => {
        const moduleData = permissions[moduleId]

        const selectedPermissions = Object.keys(moduleData)
          .filter(permission => permission !== 'selectAll')
          .map(permission => ({
            [permission]: moduleData[permission]
          }))

        const modulePayload = {
          u_id: moduleId,
          ...Object.assign({}, ...selectedPermissions)
        }
        permissionsPayload.push(modulePayload)
      })

      const payload = {
        roleName: data.roleName,
        modules: permissionsPayload
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/role`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (response.status === 201) {
        onUpdate()
        onClose()
        toast.success('Role created successfully')
      }
    } catch (error) {
      toast.error('Failed to create role')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div style={{ width: isSmallScreen ? '100%' : '550px', backgroundColor: colors.primary[400] }}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className='mb-1'>
            <Form.Label htmlFor='role-name'>Role Name</Form.Label>
            <Form.Control
              id='role-name'
              type='text'
              data-testid='role-name-input' // Test id for the input field
              placeholder='Enter your Role Name'
              name='roleName'
              {...register('roleName', { required: 'Role name is required' })}
            />
            {!formSubmitted && errors.roleName && <span className='text-danger mt-3'>{errors.roleName.message}</span>}
          </Form.Group>
          <div className='mt-2'>
            <input
              id='select-all'
              className='form-check-input'
              type='checkbox'
              checked={selectAll}
              style={{ marginLeft: '5px' }}
              onChange={e => handleGlobalSelectAllChange(permissions, setPermissions, setSelectAll, e.target.checked)}
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
                {data.map((item, index) => (
                  <TableRow key={index} className=''>
                    <TableCell>{item.alias_name}</TableCell>
                    <TableCell>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        checked={permissions[item.u_id]?.selectAll || false}
                        disabled={selectAll}
                        onChange={e => handleSelectAllChange(item.u_id, e.target.checked)}
                        data-testid={`select-all-checkbox-${item.u_id}`} // Test id for select all checkbox of each module
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        checked={permissions[item.u_id]?.view || false}
                        disabled={selectAll}
                        onChange={e =>
                          handlePermissionChange(permissions, setPermissions, item.u_id, 'view', e.target.checked)
                        }
                        data-testid={`view-checkbox-${item.u_id}`} // Test id for view checkbox of each module
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        checked={permissions[item.u_id]?.add || false}
                        onChange={e =>
                          handlePermissionChange(permissions, setPermissions, item.u_id, 'add', e.target.checked)
                        }
                        disabled={!permissions[item.u_id]?.view || selectAll}
                        data-testid={`add-checkbox-${item.u_id}`} // Test id for add checkbox of each module
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        checked={permissions[item.u_id]?.update || false}
                        onChange={e =>
                          handlePermissionChange(permissions, setPermissions, item.u_id, 'update', e.target.checked)
                        }
                        disabled={!permissions[item.u_id]?.view || selectAll}
                        data-testid={`update-checkbox-${item.u_id}`} // Test id for update checkbox of each module
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        checked={permissions[item.u_id]?.remove || false}
                        onChange={e =>
                          handlePermissionChange(permissions, setPermissions, item.u_id, 'delete', e.target.checked)
                        }
                        disabled={!permissions[item.u_id]?.view || selectAll}
                        data-testid={`delete-checkbox-${item.u_id}`} // Test id for delete checkbox of each module
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        checked={permissions[item.u_id]?.notification || false}
                        onChange={e =>
                          handlePermissionChange(
                            permissions,
                            setPermissions,
                            item.u_id,
                            'notification',
                            e.target.checked
                          )
                        }
                        disabled={!permissions[item.u_id]?.view || selectAll}
                        data-testid={`notification-checkbox-${item.u_id}`} // Test id for notification checkbox of each module
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            data-testid='save-permissions'
            id='save-permissions'
            variant='contained'
            className='mt-4 w-100'
            color='primary'
            type='submit'
          >
            Save Permissions
          </Button>
        </Form>
      </div>
      <ToastContainer draggable closeOnClick={true} position='top-right' autoClose={3000} />
    </>
  )
}

export default AddRole
