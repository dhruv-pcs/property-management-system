/* eslint-disable react-hooks/exhaustive-deps */
'use client'

//  ** React Imports **
import React, { useEffect, useState } from 'react'
import Head from 'next/head'

// ** Custom Components **
import EditProperty from '@components/property/edit-property'
import AddProperty from '@components/property/add-property'
import ViewProperty from '@components/property/view-property'
import { tokens } from '@theme/theme'

// ** Third Party Imports **
import { Button, Dialog, DialogContent, DialogTitle, IconButton, useTheme } from '@mui/material'
import { Close, Delete, Edit, Visibility } from '@mui/icons-material'
import DataTable from 'react-data-table-component'
import { ToastContainer, toast } from 'react-toastify'

// ** Redux Imports **
import { useDispatch } from 'react-redux'

// ** API Imports **
import axios from 'axios'

// ** Styles **
import 'react-toastify/dist/ReactToastify.css'
import { setProperties } from 'src/redux/features/property-slice'

const Property = () => {
  // ** Vars **
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const userPermissions = JSON.parse(localStorage.getItem('user'))
  const dispatch = useDispatch()

  const property_permission = userPermissions
    ?.filter(permission => permission.module.alias_name === 'Property')
    .map(permission => permission)

  // ** States **
  const [propertyData, setPropertyData] = useState([])
  const [openAdd, setOpenAdd] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [selectedRow, setSelectedRow] = useState('121')
  const [openDelete, setOpenDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  //** Open Add Modal */
  const handelAddButton = () => {
    setOpenAdd(!openAdd)
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

  // ** Delete Property **
  const handelDeleteConfirmation = async selectedRow => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/property/${selectedRow.u_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (response.data.statusCode === 200) {
        setOpenDelete(!openDelete)
        handlePropertyDataUpdate()
        toast.success('Property deleted successfully!')
      }
    } catch (error) {
      setOpenDelete(!openDelete)
      toast.error('Something went wrong')
    }
  }

  // ** Columns **
  const columns = [
    {
      name: 'Name',
      selector: row => row.name
    },
    {
      name: 'Rent',
      selector: row => row.rent
    },
    {
      name: 'Location',
      selector: row => row.location
    },
    {
      name: 'Address',
      selector: row => row.address
    },
    {
      name: 'District',
      selector: row => row.district
    },
    {
      name: 'Action',
      cell: row => (
        <div className='d-flex gap-2'>
          {property_permission[0].view && (
            <button
              data-testid='view-property'
              className='btn p-0 m-0 bg-none'
              style={{ color: colors.grey[100] }}
              onClick={() => handelViewButton(row)}
            >
              <Visibility />
            </button>
          )}
          {property_permission[0].update && (
            <button
              data-testid='edit-property'
              className='btn p-0 m-0 bg-none'
              style={{ color: colors.grey[100] }}
              onClick={() => handelEditButton(row)}
            >
              <Edit />
            </button>
          )}
          {property_permission[0].remove && (
            <button
              data-testid='delete-property'
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

  // ** Fetch Data  **
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/property`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      setPropertyData(response.data.data.adminData)
      dispatch(setProperties(response.data.data.adminData))
    } catch (error) {
      toast.error('Error Fetching Data')
    }
  }

  // ** Handle Property Data Update **
  const handlePropertyDataUpdate = () => {
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Head>
        <title>Property</title>
        <meta name='description' content='Property Page' />
      </Head>

      <div data-testid='property-list' className='p-2 rounded-2' style={{ backgroundColor: colors.primary[500] }}>
        <DataTable
          columns={columns}
          data={propertyData}
          title='Property List'
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
            property_permission[0].add && (
              <Button
                data-testid='add-property'
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
      {/* ** Add Property Modal ** */}
      <Dialog
        data-testid='add-property-modal'
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
          Add Property
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
          <AddProperty handelAddButton={handelAddButton} onUpdate={handlePropertyDataUpdate} />
        </DialogContent>
      </Dialog>

      {/* ** Edit Property Modal ** */}
      <Dialog
        data-testid='edit-property-modal'
        onClose={handelEditButton}
        aria-labelledby='customized-dialog-title'
        open={openEdit}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: colors.primary[400], color: colors.grey[100] }}
          className='fw-bold fs-3'
          id='customized-dialog-title'
        >
          Edit Property
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
          <EditProperty
            handelEditButton={handelEditButton}
            property={selectedRow}
            onUpdate={handlePropertyDataUpdate}
          />
        </DialogContent>
      </Dialog>

      {/* ** View Property Modal ** */}
      <Dialog
        data-testid='view-property-modal'
        onClose={handelViewButton}
        aria-labelledby='customized-dialog-title'
        open={openView}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: colors.primary[400], color: colors.grey[100] }}
          className='fw-bold fs-3'
          id='customized-dialog-title'
        >
          View Property
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
          <ViewProperty property={selectedRow} />
        </DialogContent>
      </Dialog>

      {/* ** Delete Property Modal ** */}
      <Dialog
        data-testid='delete-property-modal'
        onClose={handelDeleteButton}
        aria-labelledby='customized-dialog-title'
        open={openDelete}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: colors.primary[400], color: colors.grey[100] }}
          className='fw-bold fs-3'
          id='customized-dialog-title'
        >
          Delete Property
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
          <h4>Are you sure you want to delete this Property?</h4>

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

      {/* ** Toast ** */}
      <ToastContainer draggable closeOnClick={true} position='top-right' autoClose={3000} />
    </>
  )
}

export default Property
