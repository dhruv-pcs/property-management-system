import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EditProperty from '@components/property/edit-property.js'
import AddProperty from '@components/property/add-property'
import ViewProperty from '@components/property/view-property'
import { Button, Dialog, DialogContent, DialogTitle, IconButton, useTheme } from '@mui/material'
import { Close, Delete, Edit, Visibility } from '@mui/icons-material'
import DataTable from 'react-data-table-component'
import { tokens } from '@theme/theme'

const Property = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [propertyData, setPropertyData] = useState([])
  const [openAdd, setOpenAdd] = useState(false)
  const [openView, setOpenView] = useState(false)
  const [selectedRow, setSelectedRow] = useState('121')
  const [openDelete, setOpenDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/property`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      console.log(response)
      setPropertyData(response.data.data.adminData)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handelAddbutton = () => {
    setOpenAdd(!openAdd)
  }

  const handelEditbutton = row => {
    setOpenEdit(!openEdit)
    setSelectedRow(row)
  }

  const handelViewbutton = row => {
    setOpenView(!openView)
    setSelectedRow(row)
  }

  const handlePropertyDataUpdate = async () => {
    await fetchData()
  }

  const handelDeletebutton = async row => {
    setOpenDelete(!openDelete)
    setSelectedRow(row)
  }

  const handelDeleteConfirmation = async selectedRow => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/property/${selectedRow.u_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (response.data.statusCode === 200) {
        setOpenDelete(!openDelete)
        handlePropertyDataUpdate()
      }
    } catch (error) {
      console.log('error', error)
    }
  }

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

  // Your tableCustomStyles remains unchanged
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
          data={propertyData}
          title='Property List'
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

              <Dialog
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
                  Add Property
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
                  <AddProperty handelAddbutton={handelAddbutton} onUpdate={handlePropertyDataUpdate} />
                </DialogContent>
              </Dialog>

              <Dialog onClose={handelEditbutton} aria-labelledby='customized-dialog-title' open={openEdit}>
                <DialogTitle
                  sx={{ m: 0, p: 2, backgroundColor: colors.primary[400], color: colors.grey[100] }}
                  className='fw-bold fs-3'
                  id='customized-dialog-title'
                >
                  Edit Property
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
                  <EditProperty
                    handelEditbutton={handelEditbutton}
                    property={selectedRow}
                    onUpdate={handlePropertyDataUpdate}
                  />
                </DialogContent>
              </Dialog>

              <Dialog onClose={handelViewbutton} aria-labelledby='customized-dialog-title' open={openView}>
                <DialogTitle
                  sx={{ m: 0, p: 2, backgroundColor: colors.primary[400], color: colors.grey[100] }}
                  className='fw-bold fs-3'
                  id='customized-dialog-title'
                >
                  View Property
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
                  <ViewProperty property={selectedRow} />
                </DialogContent>
              </Dialog>

              <Dialog onClose={handelDeletebutton} aria-labelledby='customized-dialog-title' open={openDelete}>
                <DialogTitle
                  sx={{ m: 0, p: 2, backgroundColor: colors.primary[400], color: colors.grey[100] }}
                  className='fw-bold fs-3'
                  id='customized-dialog-title'
                >
                  Delete Owner
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
          }
        />
      </div>
    </>
  )
}

export default Property
