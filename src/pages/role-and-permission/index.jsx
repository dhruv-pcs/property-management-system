import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { tokens } from '@theme/theme'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import { Button, Dialog, DialogContent, DialogTitle, IconButton, useTheme, useMediaQuery } from '@mui/material'
import { Close } from '@mui/icons-material'
import ViewRole from '@components/role/view-role'
import AddRole from '@components/role/add-role'
import EditRole from '@components/role/edit-role'
import Head from 'next/head'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Role_Permission = () => {
  const [role, setRole] = useState([])
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [selectedRow, setSelectedRow] = useState(null)
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const userPermissions = JSON.parse(localStorage.getItem('user'))

  const role_permission = userPermissions
    ?.filter(permission => permission.module.alias_name === 'Role And Permission')
    .map(permission => permission)

  const images = [
    '/images/user1.jpg',
    '/images/user2.jpg',
    '/images/user3.jpg',
    '/images/user4.jpg',
    '/images/user5.jpg',
    '/images/user6.jpg'
  ]

  const randomIndex = Math.floor(Math.random() * images.length)

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/role`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setRole(response.data.data)
    } catch (error) {
      toast.error('Error Fetching Data')
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleFetch = async () => {
    await fetchData()
  }

  const handleViewButton = Data => {
    setOpenView(!openView)
    setSelectedRow(Data)
  }

  const handleDeleteButton = Id => {
    setOpenDelete(!openDelete)
    setSelectedRow(Id)
  }

  const handleAddButton = () => {
    setOpenAdd(!openAdd)
  }

  const handleEditButton = Data => {
    setOpenEdit(!openEdit)
    setSelectedRow(Data)
  }

  const handelDeleteConfirmation = async Data => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/role/${Data.u_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      if (response.data.statusCode === 200) {
        setOpenDelete(!openDelete)
        handleFetch()
        toast.success('Role Deleted Successfully')
      }
    } catch (error) {
      toast.error('Error Deleting Role')
      console.error(error)
    }
  }

  return (
    <>
      <Head>
        <title>Role & Permission</title>
        <meta name='description' content='Role & Permission Page' />
      </Head>

      <div>
        <h1>Role & Permission</h1>
        <p>
          A role is provide access to predefine menus and features so that depending on assigned role an administrator
          can have access to what he read
        </p>

        <div className='container-fluid'>
          <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols g-2'>
            {role.map((item, index) => (
              <div key={item.id} className='col p-2'>
                <div style={{ backgroundColor: colors.blueAccent[1000], height: '150px' }} className='rounded-2  p-2'>
                  <div className='d-flex justify-content-between'>
                    <h4 className='text-capitalize'>{item.name}</h4>
                    <Image
                      src={images[(randomIndex * index) % images.length]}
                      alt=''
                      width='50'
                      height='50'
                      className='rounded-circle'
                    />
                  </div>

                  {item.u_id !== 'ROL1000000001' && (
                    <div className='mt-5 d-flex justify-content-between'>
                      {/* Edit */}
                      <button
                        onClick={() => handleEditButton(item)}
                        className='btn fs-5 p-0'
                        style={{ color: colors.grey[100], border: 'none' }}
                      >
                        <Icon icon='mdi:edit' style={{ width: '24px', height: '24px' }} />
                      </button>

                      <div className=''>
                        {/* Delete */}
                        {role_permission[0].remove && (
                          <button
                            onClick={() => handleDeleteButton(item)}
                            className='btn fs-5 p-0'
                            style={{ color: colors.grey[100], border: 'none', marginRight: '10px' }}
                          >
                            <Icon
                              icon='mdi:delete'
                              style={{ color: colors.redAccent[500], width: '24px', height: '24px' }}
                            />
                          </button>
                        )}

                        {/* View */}
                        {role_permission[0].view && (
                          <button
                            onClick={() => handleViewButton(item)}
                            className='btn fs-5 p-0'
                            style={{ color: colors.grey[100], border: 'none' }}
                          >
                            <Icon icon='mdi:eye' style={{ width: '24px', height: '24px' }} />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className='col p-2'>
              <div
                style={{ backgroundColor: colors.blueAccent[1000], height: '150px' }}
                className='rounded-2 p-2 d-flex justify-content-between'
              >
                <h3>Add Admin</h3>
                {role_permission[0].add && (
                  <Button
                    onClick={handleAddButton}
                    className='btn fs-5 p-0 '
                    style={{
                      color: colors.grey[100],
                      backgroundColor: colors.greenAccent[600],
                      border: 'none',
                      borderRadius: '5px',
                      width: 'fit-content',
                      height: 'fit-content'
                    }}
                  >
                    Add
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog onClose={handleDeleteButton} aria-labelledby='customized-dialog-title' open={openDelete}>
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: colors.primary[400], color: colors.grey[100] }}
          className='fw-bold fs-3'
          id='customized-dialog-title'
        >
          Delete Role
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleDeleteButton}
          sx={{
            position: 'absolute',
            right: 16,
            top: 20,
            color: colors.grey[100]
          }}
        >
          <Close />
        </IconButton>
        <DialogContent
          dividers
          className='d-flex flex-column'
          sx={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}
        >
          <h4>Are you sure you want to delete this Admin?</h4>

          <div className='d-flex justify-content-between mt-5'>
            <Button
              onClick={handleDeleteButton}
              className='btn fs-5 px-2 m-0'
              style={{ color: colors.grey[100], backgroundColor: colors.blueAccent[600] }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handelDeleteConfirmation(selectedRow)}
              className='btn fs-5 px-2 m-0'
              style={{ color: colors.grey[100], backgroundColor: colors.redAccent[600] }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        fullScreen={isSmallScreen}
        onClose={handleViewButton}
        aria-labelledby='customized-dialog-title'
        open={openView}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: colors.primary[400], color: colors.grey[100] }}
          className='fw-bold fs-3'
          id='customized-dialog-title'
        >
          View Role
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleViewButton}
          sx={{
            position: 'absolute',
            right: 16,
            top: 20,
            color: colors.grey[100]
          }}
        >
          <Close />
        </IconButton>
        <DialogContent dividers sx={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}>
          <ViewRole roleData={selectedRow} />
        </DialogContent>
      </Dialog>

      <Dialog
        fullScreen={isSmallScreen}
        onClose={handleAddButton}
        aria-labelledby='customized-dialog-title'
        open={openAdd}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: colors.primary[400], color: colors.grey[100] }}
          className='fw-bold fs-3'
          id='customized-dialog-title'
        >
          Add Role
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleAddButton}
          sx={{
            position: 'absolute',
            right: 16,
            top: 20,
            color: colors.grey[100]
          }}
        >
          <Close />
        </IconButton>
        <DialogContent
          dividers
          className='h-100'
          sx={{ backgroundColor: colors.primary[400], color: colors.grey[100], width: '100%', padding: '20px' }}
        >
          <AddRole onClose={handleAddButton} onUpdate={handleFetch} />
        </DialogContent>
      </Dialog>

      <Dialog
        fullScreen={isSmallScreen}
        onClose={handleEditButton}
        aria-labelledby='customized-dialog-title'
        open={openEdit}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: colors.primary[400], color: colors.grey[100] }}
          className='fw-bold fs-3'
          id='customized-dialog-title'
        >
          Edit Role
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleEditButton}
          sx={{
            position: 'absolute',
            right: 16,
            top: 20,
            color: colors.grey[100]
          }}
        >
          <Close />
        </IconButton>
        <DialogContent
          dividers
          className='h-100'
          sx={{ backgroundColor: colors.primary[400], color: colors.grey[100], width: '100%', padding: '20px' }}
        >
          <EditRole roleData={selectedRow} onClose={handleEditButton} onUpdate={handleFetch} />
        </DialogContent>
      </Dialog>

      <ToastContainer />
    </>
  )
}

export default Role_Permission
