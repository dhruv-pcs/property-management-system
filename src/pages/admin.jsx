'use client'

import React, { useEffect, useState } from 'react'
import UpdateAdmin from '@components/admin/update-admin'
import AddAdmin from '@components/admin/add-admin'
import ViewAdmin from '@components/admin/view-admin'
import { Close, Delete, Edit, Visibility } from '@mui/icons-material'
import { Dialog, DialogTitle, DialogContent, IconButton, useTheme, Button, useMediaQuery } from '@mui/material'
import { tokens } from '@theme/theme'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Admin = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [adminData, setAdminData] = useState([])
  const [selectedRow, setSelectedRow] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const userPermissions = JSON.parse(localStorage.getItem('user'))

  const admin_permission = userPermissions
    ?.filter(permission => permission.module.alias_name === 'Admin')
    .map(permission => permission)

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setAdminData(response.data.data.adminData)
    } catch (error) {
      toast.error('Error Fetching Data')
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async row => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/${row.u_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      setOpenDelete(!openDelete)
      handleAdminDataUpdate()
      toast.success('User deleted successfully!')
    } catch (error) {
      setOpenDelete(!openDelete)
      toast.error('Error deleting Admin', error)
    }
  }

  const handleAdminDataUpdate = async () => {
    await fetchData()
  }

  const handelViewbutton = row => {
    setOpenView(!openView)
    setSelectedRow(row)
  }

  const handelEditbutton = row => {
    setOpenEdit(!openEdit)
    setSelectedRow(row)
  }

  const handleAddAdmin = () => {
    setShowAddModal(true)
  }

  const handleCloseAddModal = () => {
    setShowAddModal(false)
  }

  const handelDeletebutton = async row => {
    setOpenDelete(!openDelete)
    setSelectedRow(row)
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
          {admin_permission && admin_permission.length > 0 && !row.is_superadmin && admin_permission[0].view && (
            <button
              data-testid='view-admin'
              aria-label='View'
              className='btn p-0 m-0 bg-none'
              style={{ color: colors.grey[100], cursor: 'pointer' }}
              onClick={() => handelViewbutton(row)}
            >
              <Visibility />
            </button>
          )}
          {admin_permission && admin_permission.length > 0 && !row.is_superadmin && admin_permission[0].update && (
            <button
              data-testid='edit-admin'
              className='btn p-0 m-0 bg-none'
              style={{ color: colors.grey[100], cursor: 'pointer' }}
              onClick={() => handelEditbutton(row)}
              aria-label='Edit'
            >
              <Edit />
            </button>
          )}
          {admin_permission && admin_permission.length > 0 && !row.is_superadmin && admin_permission[0].remove && (
            <button
              data-testid='delete-admin'
              className='btn p-0  m-0 bg-none'
              style={{ color: colors.redAccent[600] }}
              onClick={() => handelDeletebutton(row)}
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
        backgroundColor: colors.primary[400],
        color: colors.grey[100]
      }
    },
    headRow: {
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        paddingLeft: '0 8px',
        backgroundColor: colors.primary[400],
        color: colors.grey[100]
      }
    },
    headCells: {
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
        paddingLeft: '0 8px',
        backgroundColor: colors.primary[400],
        color: colors.grey[100]
      }
    },
    subHeader: {
      style: {
        backgroundColor: colors.primary[400],
        color: colors.grey[100]
      }
    },
    cells: {
      style: {
        paddingLeft: '0 8px',
        justifyContent: 'start',
        fontSize: '16px',
        fontWeight: '400',
        backgroundColor: colors.primary[400],
        color: colors.grey[100]
      }
    },
    header: {
      style: {
        fontSize: '30px',
        fontWeight: 700,
        paddingLeft: '0px 8px',
        backgroundColor: colors.primary[400],
        color: colors.grey[100]
      }
    },
    rows: {
      style: {
        backgroundColor: colors.primary[400],
        color: colors.grey[100]
      }
    },
    noData: {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.grey[100],
        backgroundColor: colors.primary[400]
      }
    },
    pagination: {
      style: {
        backgroundColor: colors.primary[400],
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
      <Head>
        <title>Admin</title>
        <meta name='description' content='Admin Page' />
      </Head>
      <div data-testid='admin-list' className='p-2 rounded-1' style={{ backgroundColor: colors.primary[400] }}>
        <DataTable
          columns={columns}
          data={adminData}
          title='Admin List'
          customStyles={tableCustomStyles}
          fixedHeader
          fixedHeaderScrollHeight='600px'
          className='scrollbar'
          subHeader
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          pagination
          subHeaderComponent={
            admin_permission &&
            admin_permission.length > 0 &&
            admin_permission[0].add && (
              <button
                data-testid='add-admin'
                type='button'
                className='btn btn-primary'
                onClick={handleAddAdmin}
                style={{ color: colors.grey[100], backgroundColor: colors.blueAccent[600] }}
              >
                ADD
              </button>
            )
          }
        />
      </div>
      <Dialog data-testid='add-admin-modal' open={showAddModal} onClose={handleCloseAddModal}>
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
          <AddAdmin onUpdate={handleAdminDataUpdate} onClose={handleCloseAddModal} />
        </DialogContent>
      </Dialog>
      <Dialog
        data-testid='view-admin-modal'
        fullScreen={isSmallScreen}
        onClose={handelViewbutton}
        aria-labelledby='customized-dialog-title'
        open={openView}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: colors.primary[400], color: colors.grey[100] }}
          className='fw-bold fs-3'
          id='customized-dialog-title'
        >
          View Admin
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handelViewbutton}
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
          sx={{ backgroundColor: colors.primary[400], color: colors.grey[100], maxHeight: '500px' }}
        >
          <ViewAdmin admin={selectedRow} />
        </DialogContent>
      </Dialog>
      <Dialog
        data-testid='edit-admin-modal'
        onClose={handelEditbutton}
        aria-labelledby='customized-dialog-title'
        open={openEdit}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: colors.primary[400], color: colors.grey[100] }}
          className='fw-bold fs-3'
          id='customized-dialog-title'
        >
          Edit Admin
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handelEditbutton}
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
          className=''
          sx={{ backgroundColor: colors.primary[400], color: colors.grey[100], maxHeight: '500px' }}
        >
          <UpdateAdmin handelEditbutton={handelEditbutton} admin={selectedRow} onUpdate={handleAdminDataUpdate} />
        </DialogContent>
      </Dialog>
      <Dialog
        data-testid='delete-admin-modal'
        onClose={handelDeletebutton}
        aria-labelledby='customized-dialog-title'
        open={openDelete}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: colors.primary[400], color: colors.grey[100] }}
          className='fw-bold fs-3'
          id='customized-dialog-title'
        >
          Delete Admin
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handelDeletebutton}
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
              onClick={handelDeletebutton}
              className='btn fs-5 px-2 m-0'
              style={{ color: colors.grey[100], backgroundColor: colors.blueAccent[600] }}
            >
              Cancel
            </Button>
            <Button
              data-testid='confirm-delete'
              onClick={() => handleDelete(selectedRow)}
              className='btn fs-5 px-2 m-0'
              style={{ color: colors.grey[100], backgroundColor: colors.redAccent[600] }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <ToastContainer draggable closeOnClick={true} position='top-right' autoClose={3000} />
    </>
  )
}

export default Admin
