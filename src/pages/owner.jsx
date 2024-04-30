import AddOwner from '@components/owner/add-owner'
import EditOwner from '@components/owner/edit-owner'
import ViewOwner from '@components/owner/view-owner'
import { Close, Delete, Edit, Visibility } from '@mui/icons-material'
import { Button, Dialog, DialogContent, DialogTitle, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { tokens } from '@theme/theme'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { setOwner } from 'src/redux/features/ownerSlice'

const Owner = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [ownerData, setOwnerData] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [openAdd, setOpenAdd] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedRow, setSelectedRow] = useState('121')
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const userPermissions = JSON.parse(localStorage.getItem('user'))

  const owner_permission = userPermissions
    ?.filter(permission => permission.module.alias_name === 'Owner')
    .map(permission => permission)

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/owner`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      setOwnerData(response.data.data.ownerData)

      dispatch(setOwner(response.data.data.ownerData))
    } catch (error) {
      toast.error('Error Fetching Data')
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handelEditButton = row => {
    setOpenEdit(!openEdit)
    setSelectedRow(row)
  }

  const handelViewButton = row => {
    setOpenView(!openView)
    setSelectedRow(row)
  }

  const handelDeleteButton = async row => {
    setOpenDelete(!openDelete)
    setSelectedRow(row)
  }

  const handleOwnerDataUpdate = async () => {
    await fetchData()
  }

  const handelAddButton = () => {
    setOpenAdd(!openAdd)
  }

  const handelDeleteConfirmation = async selectedRow => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/owner/${selectedRow.u_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setOpenDelete(!openDelete)
      handleOwnerDataUpdate()
      toast.success('Owner Deleted Successfully')
    } catch (error) {
      setOpenDelete(!openDelete)
      toast.error('Failed to Delete Owner')
    }
  }

  // const handlePageChange = page => {
  //   setCurrentPage(page)
  // }

  // const handlePerRowsChange = async (newPerPage, page) => {
  //   setPerPage(newPerPage)
  //   setCurrentPage(page)
  // }

  const columns = [
    {
      name: 'Name',
      selector: row => <span data-testid='name'>{row.first_name + ' ' + row.last_name}</span>
    },
    {
      name: 'Email',
      selector: row => <span data-testid='email'>{row.email}</span>
    },
    {
      name: 'Phone',
      selector: row => <span data-testid='phone'>{row.phone}</span>
    },
    {
      name: 'Aadhar Card',
      selector: row => <span data-testid='aadhar_card_no'>{row.aadhar_card_no}</span>
    },
    {
      name: 'Verification',
      selector: row =>
        row.is_verified ? (
          <>
            <div
              className=' text-center fw-bold py-1 px-2 rounded-pill'
              style={{ backgroundColor: colors.greenAccent[600] }}
              data-testid='verified'
            >
              Verified
            </div>
          </>
        ) : (
          <>
            <div
              className='text-center fw-bold py-1 px-2 rounded-pill'
              style={{ backgroundColor: colors.redAccent[600] }}
              data-testid='not-verified'
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
              data-testid='active'
            >
              Active
            </div>
          </>
        ) : (
          <>
            <div
              className=' text-center py-1 px-2 fw-bold rounded-pill'
              style={{ backgroundColor: colors.redAccent[600] }}
              data-testid='not-active'
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
          {owner_permission[0].view && (
            <button
              data-testid='view-owner'
              aria-label='View'
              className='btn p-0 m-0 bg-none'
              style={{ color: colors.grey[100] }}
              onClick={() => handelViewButton(row)}
            >
              <Visibility />
            </button>
          )}
          {owner_permission[0].update && (
            <button
              data-testid='edit-owner'
              aria-label='Edit'
              className='btn p-0 m-0 bg-none'
              style={{ color: colors.grey[100] }}
              onClick={() => handelEditButton(row)}
            >
              <Edit />
            </button>
          )}
          {owner_permission[0].remove && (
            <button
              data-testid='delete-owner'
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
      <Head>
        <title>Owner</title>
        <meta name='description' content='Owner Page' />
      </Head>

      <div data-testid='owner-list' className='p-3 rounded-2' style={{ backgroundColor: colors.primary[500] }}>
        <DataTable
          columns={columns}
          data={ownerData}
          title='Owner List'
          customStyles={tableCustomStyles}
          fixedHeader
          fixedHeaderScrollHeight='600px'
          pagination
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          className='scrollbar'
          subHeader
          subHeaderComponent={<input type='text' placeholder='Search' className='w-25 form-control mt-3' />}
          noDataComponent={
            <>
              <div className='d-flex justify-content-center mt-5'>
                <h5 style={{ color: colors.grey[100] }}>There is No Data Available</h5>
              </div>
            </>
          }
          actions={
            owner_permission[0].add && (
              <Button
                data-testid='add-owner'
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

      <Dialog
        data-testid='edit-owner-modal'
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
          Edit Owner
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
          <EditOwner handelEditButton={handelEditButton} owner={selectedRow} onUpdate={handleOwnerDataUpdate} />
        </DialogContent>
      </Dialog>

      <Dialog
        data-testid='view-owner-modal'
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
          View Owner
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
          <ViewOwner owner={selectedRow} />
        </DialogContent>
      </Dialog>

      <Dialog
        data-testid='add-owner-modal'
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
          Add Owner
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
          <AddOwner handelAddButton={handelAddButton} onUpdate={handleOwnerDataUpdate} />
        </DialogContent>
      </Dialog>

      <Dialog
        data-testid='delete-owner-modal'
        onClose={handelDeleteButton}
        aria-labelledby='customized-dialog-title'
        open={openDelete}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: colors.primary[400], color: colors.grey[100] }}
          className='fw-bold fs-3'
          id='customized-dialog-title'
        >
          Delete Owner
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
          <h4>Are you sure you want to delete this Owner?</h4>

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
      <ToastContainer draggable closeOnClick={true} position='top-right' autoClose={3000} />
    </>
  )
}

export default Owner
