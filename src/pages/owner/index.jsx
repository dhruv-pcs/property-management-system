import ViewOwner from '@components/owner/view-owner'
import { Close, Delete, Edit, Visibility } from '@mui/icons-material'
import { Dialog, DialogContent, DialogTitle, IconButton, useTheme } from '@mui/material'
import { tokens } from '@theme/theme'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

const Owner = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [ownerData, setOwnerData] = useState([])
  const [open, setOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/owner`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })

        setOwnerData(response.data.data.ownerData)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const handelEditbutton = row => {
    setOpen(!open)
    setSelectedRow(row)
  }

  const handelViewbutton = row => {
    setOpen(!open)
    setSelectedRow(row)
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
            onClick={() => handelEditbutton(row)}
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
      <div className='p-2' style={{ backgroundColor: colors.primary[400] }}>
        <DataTable
          columns={columns}
          data={ownerData}
          title='Owner List'
          customStyles={tableCustomStyles}
          fixedHeader
          fixedHeaderScrollHeight='600px'
          className='scrollbar'
          subHeader
          paginationRowsPerPageOptions={[1, 2, 5, 100]}
          pagination
          subHeaderComponent={<input type='text' placeholder='Search' className='w-25 form-control mt-3' />}
        />
      </div>

      <Dialog onClose={handelViewbutton} aria-labelledby='customized-dialog-title' open={open}>
        <DialogTitle
          sx={{ m: 0, p: 2, backgroundColor: colors.primary[400], color: colors.grey[100] }}
          className='fw-bold fs-3'
          id='customized-dialog-title'
        >
          View Owner
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
          <ViewOwner owner={selectedRow} />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Owner
