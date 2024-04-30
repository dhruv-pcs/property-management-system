/* eslint-disable react-hooks/exhaustive-deps */
'use client'

//  ** React Imports **
import React, { useEffect, useState } from 'react'
import Head from 'next/head'

// ** Custom Components **
import UpdateAdmin from '@components/admin/update-admin'
import AddAdmin from '@components/admin/add-admin'
import ViewAdmin from '@components/admin/view-admin'
import { tokens } from '@theme/theme'

// ** Third Party Imports **
import { Close, Delete, Edit, Visibility } from '@mui/icons-material'
import { Dialog, DialogTitle, DialogContent, IconButton, useTheme, Button, useMediaQuery } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import DataTable from 'react-data-table-component'

// ** Redux Imports **
import { useDispatch } from 'react-redux'
import { setAdmin } from 'src/redux/features/admin-slice'

// ** API Imports **
import axios from 'axios'

// ** Styles **
import 'react-toastify/dist/ReactToastify.css'

const Admin = () => {
  // ** Vars **
  const theme = useTheme()
  const dispatch = useDispatch()
  const colors = tokens(theme.palette.mode)
  const userPermissions = JSON.parse(localStorage.getItem('user'))

  const admin_permission = userPermissions
    ?.filter(permission => permission.module.alias_name === 'Admin')
    .map(permission => permission)

  // ** States **
  const [adminData, setAdminData] = useState([])
  const [selectedRow, setSelectedRow] = useState(null)
  const [openAdd, setOpenAdd] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  // ** Delete Admin **
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

  // ** Open Add Modal **
  const handelAddButton = () => {
    setOpenAdd(!openAdd)
  }

  //  ** Fetch Data After Update  **
  const handleAdminDataUpdate = async () => {
    await fetchData()
  }

  // ** Open View Modal **
  const handelViewButton = row => {
    setOpenView(!openView)
    setSelectedRow(row)
  }

  // ** Open Edit Modal **
  const handelEditButton = row => {
    setOpenEdit(!openEdit)
    setSelectedRow(row)
  }

  // ** Open Delete Modal **
  const handelDeleteButton = async row => {
    setOpenDelete(!openDelete)
    setSelectedRow(row)
  }

  // ** Columns **
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
              onClick={() => handelViewButton(row)}
            >
              <Visibility />
            </button>
          )}
          {admin_permission && admin_permission.length > 0 && !row.is_superadmin && admin_permission[0].update && (
            <button
              data-testid='edit-admin'
              className='btn p-0 m-0 bg-none'
              style={{ color: colors.grey[100], cursor: 'pointer' }}
              onClick={() => handelEditButton(row)}
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
              onClick={() => handelDeleteButton(row)}
              aria-label='Delete'
            >
              <Delete />
            </button>
          )}
        </div>
      )
    }
  ]

  // ** Table Custom Styles **
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

  // ** Fetch Data  **
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setAdminData(response.data.data.adminData)
      dispatch(setAdmin(response.data.data.adminData))
    } catch (error) {
      toast.error('Error Fetching Data')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

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
                onClick={handelAddButton}
                style={{ color: colors.grey[100], backgroundColor: colors.blueAccent[600] }}
              >
                ADD
              </button>
            )
          }
        />
      </div>

      {/* ** Add Admin Modal ** */}
      <Dialog data-testid='add-admin-modal' open={openAdd} onClose={handelAddButton}>
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: colors.primary[400], color: colors.grey[100] }}
          className='fw-bold fs-3'
          id='customized-dialog-title'
        >
          Add Admin
          <IconButton
            aria-label='close'
            onClick={handelAddButton}
            sx={{ position: 'absolute', right: 16, top: 20, color: colors.grey[100] }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}>
          <AddAdmin onUpdate={handleAdminDataUpdate} handelAddButton={handelAddButton} />
        </DialogContent>
      </Dialog>

      {/* ** View Admin Modal ** */}
      <Dialog
        data-testid='view-admin-modal'
        fullScreen={isSmallScreen}
        onClose={handelViewButton}
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
          onClick={handelViewButton}
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

      {/* ** Edit Admin Modal ** */}
      <Dialog
        data-testid='edit-admin-modal'
        onClose={handelEditButton}
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
          onClick={handelEditButton}
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
          <UpdateAdmin handelEditButton={handelEditButton} admin={selectedRow} onUpdate={handleAdminDataUpdate} />
        </DialogContent>
      </Dialog>

      {/* ** Delete Admin Modal ** */}
      <Dialog
        data-testid='delete-admin-modal'
        onClose={handelDeleteButton}
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
          onClick={handelDeleteButton}
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
              onClick={handelDeleteButton}
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

      {/* ** Toast ** */}
      <ToastContainer draggable closeOnClick={true} position='top-right' autoClose={3000} />
    </>
  )
}

export default Admin
