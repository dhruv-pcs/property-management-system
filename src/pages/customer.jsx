/* eslint-disable react-hooks/exhaustive-deps */
'use client'

// ** React Imports **
import React, { useEffect, useState } from 'react'
import Head from 'next/head'

// ** Custom Components **
import AddCustomer from '@components/customer/add-customer'
import EditCustomer from '@components/customer/edit-customer'
import ViewCustomer from '@components/customer/view-customer'
import { tokens } from '@theme/theme'

// ** Third Party Imports **
import { Close, Delete, Edit, Visibility } from '@mui/icons-material'
import { Button, Dialog, DialogContent, DialogTitle, IconButton, useMediaQuery, useTheme } from '@mui/material'
import DataTable from 'react-data-table-component'
import { ToastContainer, toast } from 'react-toastify'

// ** Redux Imports **
import { useDispatch } from 'react-redux'
import { setCustomer } from 'src/redux/features/customer-slice'

// ** API Imports **
import axios from 'axios'

// ** Styles **
import 'react-toastify/dist/ReactToastify.css'

const Customer = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [customerData, setCustomerData] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedRow, setSelectedRow] = useState('121')
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const userPermissions = JSON.parse(localStorage.getItem('user'))

  const customer_permission = userPermissions
    ?.filter(permission => permission.module.alias_name === 'Customer')
    .map(permission => permission)

  // ** Open Edit Modal **
  const handelEditButton = row => {
    setOpenEdit(!openEdit)
    setSelectedRow(row)
  }

  // ** Open View Modal **
  const handelViewButton = row => {
    setOpenView(!openView)
    setSelectedRow(row)
  }

  // ** Open Add Modal **
  const handelAddButton = () => {
    setOpenAdd(!openAdd)
  }

  // ** Open Delete Modal **
  const handelDeleteButton = async row => {
    setOpenDelete(!openDelete)
    setSelectedRow(row)
  }

  // ** Update Customer Data **
  const handleCustomerDataUpdate = async () => {
    await fetchData()
  }

  // ** Delete Customer **
  const handelDeleteConfirmation = async selectedRow => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/customer/${selectedRow.u_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      setOpenDelete(!openDelete)
      handleCustomerDataUpdate()
      toast.success('Customer Deleted Successfully')
    } catch (error) {
      toast.error('Error Deleting Customer')
    }
  }

  // ** Columns **
  const columns = [
    {
      name: 'Name',
      selector: row => row.first_name + ' ' + row.last_name
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
      name: 'Aadhar Card',
      selector: row => row.aadhar_card_no
    },
    {
      name: 'Verification',
      selector: row =>
        row.is_verified ? (
          <>
            <div
              data-testid='verified'
              className=' text-center fw-bold py-1 px-2 rounded-pill'
              style={{ backgroundColor: colors.greenAccent[600] }}
            >
              Verified
            </div>
          </>
        ) : (
          <>
            <div
              data-testid='not-verified'
              className='text-center fw-bold py-1 px-2 rounded-pill'
              style={{ backgroundColor: colors.redAccent[600] }}
            >
              Not Verified
            </div>
          </>
        )
    },
    {
      name: 'Status',
      selector: row =>
        row.status ? (
          <>
            <div
              data-testid='active'
              className='text-center py-1 px-2 fw-bold rounded-pill'
              style={{ backgroundColor: colors.greenAccent[600] }}
            >
              Active
            </div>
          </>
        ) : (
          <>
            <div
              data-testid='not-active'
              className=' text-center py-1 px-2 fw-bold rounded-pill'
              style={{ backgroundColor: colors.redAccent[600] }}
            >
              Not Active
            </div>
          </>
        )
    },
    {
      name: 'Action',
      cell: row => (
        <div className='d-flex gap-2'>
          {customer_permission[0]?.view && (
            <button
              data-testid='view-customer'
              aria-label='View'
              className='btn p-0 m-0 bg-none'
              style={{ color: colors.grey[100] }}
              onClick={() => handelViewButton(row)}
            >
              <Visibility />
            </button>
          )}
          {customer_permission[0]?.update && (
            <button
              data-testid='edit-customer'
              aria-label='Edit'
              className='btn p-0 m-0 bg-none'
              style={{ color: colors.grey[100] }}
              onClick={() => handelEditButton(row)}
            >
              <Edit />
            </button>
          )}
          {customer_permission[0]?.remove && (
            <button
              data-testid='delete-customer'
              aria-label='Delete'
              className='btn p-0  m-0 bg-none'
              style={{ color: colors.redAccent[600] }}
              onClick={() => handelDeleteButton(row)}
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

  // ** Fetch Data **
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/customer`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setCustomerData(response.data.data.customerData)
      dispatch(setCustomer(response.data.data.customerData))
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
        <title>Customer</title>
        <meta name='description' content='Customer Page' />
      </Head>

      <div data-testid='customer-list' className='p-2 rounded-2' style={{ backgroundColor: colors.primary[500] }}>
        <DataTable
          columns={columns}
          data={customerData}
          title='Customer List'
          customStyles={tableCustomStyles}
          fixedHeader
          fixedHeaderScrollHeight='600px'
          className='scrollbar'
          subHeader
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          pagination
          subHeaderComponent={<input type='text' placeholder='Search' className='w-25 form-control mt-3' />}
          noDataComponent={
            <>
              <div className='d-flex justify-content-center mt-5'>
                <h5 style={{ color: colors.grey[100] }}>There is No Data Available</h5>
              </div>
            </>
          }
          actions={
            customer_permission[0]?.add && (
              <Button
                data-testid='add-customer'
                aria-label='Add'
                onClick={handelAddButton}
                className='btn fs-5 p-0 m-0'
                style={{ color: colors.grey[100], backgroundColor: colors.blueAccent[600] }}
              >
                Add
              </Button>
            )
          }
        />
      </div>

      {/* Edit Customer Modal */}
      <Dialog
        data-testid='edit-customer-modal'
        fullScreen={isSmallScreen}
        onClose={handelEditButton}
        aria-labelledby='customized-dialog-title'
        open={openEdit}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: colors.primary[400], color: colors.grey[100] }}
          className='fw-bold fs-3'
          id='customized-dialog-title'
        >
          Edit Customer
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
          className='d-flex justify-content-center'
          sx={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}
        >
          <EditCustomer
            handelEditButton={handelEditButton}
            customer={selectedRow}
            onUpdate={handleCustomerDataUpdate}
          />
        </DialogContent>
      </Dialog>

      {/* View Customer Modal */}
      <Dialog
        data-testid='view-customer-modal'
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
          View Customer
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
          className='d-flex justify-content-center'
          sx={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}
        >
          <ViewCustomer customer={selectedRow} />
        </DialogContent>
      </Dialog>

      {/* Add Customer Modal */}
      <Dialog
        data-testid='add-customer-modal'
        fullScreen={isSmallScreen}
        className='z-3'
        onClose={handelAddButton}
        aria-labelledby='customized-dialog-title'
        open={openAdd}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: colors.primary[400], color: colors.grey[100] }}
          className='fw-bold fs-3'
          id='customized-dialog-title'
        >
          Add Customer
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handelAddButton}
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
          className='d-flex justify-content-center'
          sx={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}
        >
          <AddCustomer handelAddButton={handelAddButton} onUpdate={handleCustomerDataUpdate} />
        </DialogContent>
      </Dialog>

      {/* Delete Customer Modal */}
      <Dialog
        data-testid='delete-customer-modal'
        onClose={handelDeleteButton}
        aria-labelledby='customized-dialog-title'
        open={openDelete}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: colors.primary[400], color: colors.grey[100] }}
          className='fw-bold fs-3'
          id='customized-dialog-title'
        >
          Delete Customer
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
          <h4>Are you sure you want to delete this customer?</h4>

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
              onClick={() => handelDeleteConfirmation(selectedRow)}
              className='btn fs-5 px-2 m-0'
              style={{ color: colors.grey[100], backgroundColor: colors.redAccent[600] }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Toast */}
      <ToastContainer draggable closeOnClick={true} position='top-right' autoClose={3000} />
    </>
  )
}

export default Customer
