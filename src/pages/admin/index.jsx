import UpdateAdmin from '../../components/admin/update-admin.js'
import AddAdmin from '../../components/admin/add-admin.js'

import { Close, Delete, Edit, Visibility } from '@mui/icons-material'
import { Dialog, DialogTitle, DialogContent, IconButton, useTheme, Typography, Button, Box } from '@mui/material'

import { tokens } from '@theme/theme'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

const Admin = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const [adminData, setAdminData] = useState([])
  const [selectedRow, setSelectedRow] = useState(null)
  const [selectedAdmin, setSelectedAdmin] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        console.log('response', response.data.data.adminData)
        setAdminData(response.data.data.adminData)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const fetchAdminDetails = async u_id => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/oneAdmin/${u_id}`)
      if (response.data && response.data.data && response.data.data.adminData) {
        setSelectedAdmin(response.data.data.adminData)
        setShowDetailsModal(true)
      } else {
        console.error('No admin data found for ID:', u_id)
      }
    } catch (error) {
      console.error('Error fetching admin details:', error)
    }
  }

  const handleDelete = async userId => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      setAdminData(current => current.filter(user => user.u_id !== userId))
      setShowDeleteModal(false)
      setUserToDelete(null)
      console.log('User deleted successfully')
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }

  const handleAddButton = () => {
    showAddModal(true)
  }

  const handleAdminDataUpdate = async () => {
    await fetchData()
  }

  const handleViewButton = row => {
    fetchAdminDetails(row.u_id)
    setShowDetailsModal(!showDetailsModal)
  }

  const handleEditButton = row => {
    setSelectedRow(row)
    setShowEditModal(true)
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false)
  }

  const handleAddAdmin = () => {
    setShowAddModal(true)
  }

  const handleCloseAddModal = () => {
    setShowAddModal(false)
  }

  const columns = [
    {
      name: 'Name',
      selector: row => `${row.first_name} ${row.last_name}`
    },
    {
      name: 'Email',
      selector: row => row.email
    },
    {
      name: 'Phone',
      selector: row => row.phone
    },
    {
      name: 'Alternate Phone',
      selector: row => row.alternate_phone
    },
    {
      name: 'Status',
      selector: row =>
        row.status ? (
          <div
            className='text-center py-1 px-2 fw-bold rounded-pill'
            style={{ backgroundColor: colors.greenAccent[600] }}
          >
            Active
          </div>
        ) : (
          <div
            className=' text-center py-1 px-2 fw-bold rounded-pill'
            style={{ backgroundColor: colors.redAccent[600] }}
          >
            Inactive
          </div>
        )
    },
    {
      name: 'Action',
      cell: row => (
        <div className='d-flex gap-2'>
          {!row.is_superadmin && (
            <button
              className='btn p-0 m-0 bg-none'
              style={{ color: colors.grey[100], cursor: 'pointer' }}
              onClick={() => handleEditButton(row)}
              aria-label='Edit'
            >
              <Edit />
            </button>
          )}

          <button
            className='btn p-0 m-0 bg-none'
            style={{ color: colors.grey[100], cursor: 'pointer' }}
            onClick={() => handleViewButton(row)}
            aria-label='View'
          >
            <Visibility />
          </button>

          {!row.is_superadmin && (
            <button
              className='btn p-0 m-0 bg-none'
              style={{ color: colors.grey[100], cursor: 'pointer' }}
              onClick={() => {
                setShowDeleteModal(true)
                setUserToDelete(row.u_id)
              }}
              aria-label='Delete'
            >
              <Delete />
            </button>
          )}
        </div>
      )
    }
  ]

  const tableCustomStyles = {
    head: {
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        paddingLeft: '0 8px',
        backgroundColor: colors.primary[500],
        color: colors.grey[100]
      }
    },
    headRow: {
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        paddingLeft: '0 8px',
        backgroundColor: colors.primary[500],
        color: colors.grey[100]
      }
    },

    headCells: {
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        paddingLeft: '0 8px',
        backgroundColor: colors.primary[500],
        color: colors.grey[100]
      }
    },
    subHeader: {
      style: {
        backgroundColor: colors.primary[500],
        color: colors.grey[100]
      }
    },
    cells: {
      style: {
        paddingLeft: '0 8px',
        justifyContent: 'start',
        fontSize: '16px',
        fontWeight: '400',
        backgroundColor: colors.primary[500],
        color: colors.grey[100]
      }
    },
    header: {
      style: {
        fontSize: '30px',
        fontWeight: 700,
        paddingLeft: '0px 8px',
        backgroundColor: colors.primary[500],
        color: colors.grey[100]
      }
    },
    rows: {
      style: {
        backgroundColor: colors.primary[500],
        color: colors.grey[100]
      }
    },
    noData: {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.grey[100],
        backgroundColor: colors.primary[500]
      }
    },
    pagination: {
      style: {
        backgroundColor: colors.primary[500],
        color: colors.grey[100]
      },
      pageButtonsStyle: {
        borderRadius: '50%',
        height: '40px',
        width: '40px',
        padding: '8px',
        margin: 'px',
        cursor: 'pointer',
        transition: '0.4s',
        color: colors.grey[100],
        fill: colors.grey[100],
        backgroundColor: 'transparent',
        '&:disabled': {
          cursor: 'unset',
          color: colors.grey[100],
          fill: colors.grey[100]
        }
      }
    }
  }

  return (
    <>
      <div className='p-2 rounded-2' style={{ backgroundColor: colors.primary[500] }}>
        <DataTable
          columns={columns}
          data={adminData}
          title='Admin List'
          customStyles={tableCustomStyles}
          fixedHeader
          fixedHeaderScrollHeight='600px'
          className='scrollbar'
          subHeader
          paginationRowsPerPageOptions={[1, 2, 5, 100]}
          pagination
          subHeaderComponent={
            <Button
              onClick={handleAddAdmin}
              className='btn fs-5 p-0 m-0'
              style={{ color: colors.grey[100], backgroundColor: colors.blueAccent[600] }}
            >
              Add
            </Button>
          }
        />
      </div>

      <Dialog open={showAddModal} onClose={handleCloseAddModal}>
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: colors.primary[400], color: colors.grey[100] }}
          className='fw-bold fs-3'
          id='customized-dialog-title'
        >
          Add Admin
          <IconButton
            aria-label='close'
            onClick={handleCloseAddModal}
            sx={{ position: 'absolute', right: 16, top: 20, color: colors.grey[100] }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}>
          <AddAdmin handelAddbutton={handleAddButton} onUpdate={handleAdminDataUpdate} onClose={handleCloseAddModal} />
        </DialogContent>
      </Dialog>

      <Dialog open={showDetailsModal} onClose={handleCloseEditModal}>
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: colors.primary[400], color: colors.grey[100] }}
          className='fw-bold fs-3'
          id='customized-dialog-title'
        >
          View Admin
          <IconButton
            aria-label='close'
            onClick={handleCloseEditModal}
            sx={{ position: 'absolute', right: 16, top: 20, color: colors.grey[100] }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}>
          <UpdateAdmin
            admin={selectedAdmin}
            isViewOnly={true}
            onClose={handleCloseEditModal}
            onUpdate={handleAdminDataUpdate}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showEditModal} onClose={handleCloseEditModal}>
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: colors.primary[400], color: colors.grey[100] }}
          className='fw-bold fs-3'
          id='customized-dialog-title'
        >
          Edit Admin
          <IconButton
            aria-label='close'
            onClick={handleCloseEditModal}
            sx={{ position: 'absolute', right: 16, top: 20, color: colors.grey[100] }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}>
          <UpdateAdmin
            admin={selectedRow}
            onClose={handleCloseEditModal}
            isViewOnly={false}
            onUpdate={handleAdminDataUpdate}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        onClose={() => setShowDeleteModal(false)}
        open={showDeleteModal}
        aria-labelledby='delete-dialog-title'
        aria-describedby='delete-dialog-description'
      >
        <DialogTitle id='delete-dialog-title' sx={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}>
          Confirm Delete
          <IconButton
            aria-label='close'
            onClick={() => {
              setShowDeleteModal(true)
              setUserToDelete(row.u_id)
            }}
            sx={{ position: 'absolute', right: 8, top: 8, color: colors.grey[100] }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}
          id='delete-dialog-description'
        >
          <Typography>Are you sure you want to delete this user?</Typography>
          <Typography>You won't be able to revert this!</Typography>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={() => setShowDeleteModal(false)} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button onClick={() => handleDelete(userToDelete)} color='error'>
              Yes, Delete it!
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Admin
