import AddCustomer from '@components/customer/add-customer'
import EditCustomer from '@components/customer/edit-customer'
import ViewCustomer from '@components/customer/view-customer'
import { Close, Delete, Edit, Visibility } from '@mui/icons-material'
import { Button, Dialog, DialogContent, DialogTitle, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { tokens } from '@theme/theme'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

const Customer = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [customerData, setCustomerData] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedRow, setSelectedRow] = useState('121')
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/customer`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setCustomerData(response.data.data.customerData)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handelEditbutton = row => {
    setOpenEdit(!openEdit)
    setSelectedRow(row)
  }

  const handelViewbutton = row => {
    setOpenView(!openView)
    setSelectedRow(row)
  }

  const handelDeletebutton = async row => {
    setOpenDelete(!openDelete)
    setSelectedRow(row)
  }

  const handleCustomerDataUpdate = async () => {
    await fetchData()
  }

  const handelAddbutton = () => {
    setOpenAdd(!openAdd)
  }

  const handelDeleteConfirmation = async selectedRow => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/customer/${selectedRow.u_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (response.data.statusCode === 200) {
        setOpenDelete(!openDelete)
        handleCustomerDataUpdate()
      }
    } catch (error) {
      console.log('error', error)
    }
  }

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
              className=' text-center fw-bold py-1 px-2 rounded-pill'
              style={{ backgroundColor: colors.greenAccent[600] }}
            >
              Verified
            </div>
          </>
        ) : (
          <>
            <div
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
              className='text-center py-1 px-2 fw-bold rounded-pill'
              style={{ backgroundColor: colors.greenAccent[600] }}
            >
              Active
            </div>
          </>
        ) : (
          <>
            <div
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
          <button
            className='btn p-0 m-0 bg-none'
            style={{ color: colors.grey[100] }}
            onClick={() => handelViewbutton(row)}
          >
            <Visibility />
          </button>
          <button
            className='btn p-0 m-0 bg-none'
            style={{ color: colors.grey[100] }}
            onClick={() => handelEditbutton(row)}
          >
            <Edit />
          </button>
          <button
            className='btn p-0  m-0 bg-none'
            style={{ color: colors.redAccent[600] }}
            onClick={() => handelDeletebutton(row)}
          >
            <Delete />
          </button>
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
          data={customerData}
          title='Customer List'
          customStyles={tableCustomStyles}
          fixedHeader
          fixedHeaderScrollHeight='600px'
          className='scrollbar'
          subHeader
          paginationRowsPerPageOptions={[1, 2, 5, 100]}
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
            <>
              <Button
                onClick={handelAddbutton}
                className='btn fs-5 p-0 m-0'
                style={{ color: colors.grey[100], backgroundColor: colors.blueAccent[600] }}
              >
                Add
              </Button>
            </>
          }
        />
      </div>

      <Dialog
        fullScreen={isSmallScreen}
        onClose={handelEditbutton}
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
          <EditCustomer
            handelEditbutton={handelEditbutton}
            customer={selectedRow}
            onUpdate={handleCustomerDataUpdate}
          />
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
          View Customer
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
          <ViewCustomer customer={selectedRow} />
        </DialogContent>
      </Dialog>

      <Dialog
        fullScreen={isSmallScreen}
        className='z-3'
        onClose={handelAddbutton}
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
          onClick={handelAddbutton}
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
          sx={{ backgroundColor: colors.primary[400], color: colors.grey[100], maxHeight: '500px' }}
        >
          <AddCustomer handelAddbutton={handelAddbutton} onUpdate={handleCustomerDataUpdate} />
        </DialogContent>
      </Dialog>

      <Dialog onClose={handelDeletebutton} aria-labelledby='customized-dialog-title' open={openDelete}>
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: colors.primary[400], color: colors.grey[100] }}
          className='fw-bold fs-3'
          id='customized-dialog-title'
        >
          Delete customer
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
          <h4>Are you sure you want to delete this customer?</h4>

          <div className='d-flex justify-content-between mt-5'>
            <Button
              onClick={handelDeletebutton}
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
    </>
  )
}

export default Customer
