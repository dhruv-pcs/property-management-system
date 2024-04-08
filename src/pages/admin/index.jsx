import UpdateAdmin from '@components/admin/update-admin'
import AddAdmin from '@components/admin/add-admin'
import { Close, Delete, Edit, Visibility } from '@mui/icons-material'
import { Dialog, DialogTitle, DialogContent, IconButton, useTheme, Button, useMediaQuery } from '@mui/material'
import { tokens } from '@theme/theme'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Head from 'next/head'

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

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setAdminData(response.data.data.adminData)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async row => {
    console.log('row', row);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/${row.u_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      setOpenDelete(!openDelete)
      handleAdminDataUpdate()
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
          {!row.is_superadmin && (
            <button
              className='btn p-0 m-0 bg-none'
              style={{ color: colors.grey[100], cursor: 'pointer' }}
              onClick={() => handelEditbutton(row)}
              aria-label='Edit'
            >
              <Edit />
            </button>
          )}
          {!row.is_superadmin && (
            <button
              className='btn p-0 m-0 bg-none'
              style={{ color: colors.grey[100], cursor: 'pointer' }}
              onClick={() => handelViewbutton(row)}
              aria-label='View'
            >
              <Visibility />
            </button>
          )}
          {!row.is_superadmin && (
            <button
              className='btn p-0  m-0 bg-none'
              style={{ color: colors.redAccent[600] }}
              onClick={() => handelDeletebutton(row)}
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
      <div className='p-2' style={{ backgroundColor: colors.primary[400] }}>
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
            <button
              type='button'
              className='btn btn-primary'
              onClick={handleAddAdmin}
              style={{ color: colors.grey[100], backgroundColor: colors.blueAccent[600] }}
            >
              ADD
            </button>
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
      <Dialog
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
          <UpdateAdmin admin={selectedRow} isViewOnly={true} />
        </DialogContent>
      </Dialog>
      <Dialog onClose={handelEditbutton} aria-labelledby='customized-dialog-title' open={openEdit}>
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
          <UpdateAdmin
            handelEditbutton={handelEditbutton}
            admin={selectedRow}
            isViewOnly={false}
            onUpdate={handleAdminDataUpdate}
          />
        </DialogContent>
      </Dialog>
      <Dialog onClose={handelDeletebutton} aria-labelledby='customized-dialog-title' open={openDelete}>
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
          <h4>Are you sure you want to delete this Owner?</h4>
          <div className='d-flex justify-content-between mt-5'>
            <Button
              onClick={handelDeletebutton}
              className='btn fs-5 px-2 m-0'
              style={{ color: colors.grey[100], backgroundColor: colors.blueAccent[600] }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleDelete(selectedRow)}
              className='btn fs-5 px-2 m-0'
              style={{ color: colors.grey[100], backgroundColor: colors.redAccent[600] }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Admin














