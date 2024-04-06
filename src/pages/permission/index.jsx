import { useTheme } from '@mui/material'
import { tokens } from '@theme/theme'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

const Permission = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [permissionData, setPermissionData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/permission`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        console.log('response', response.data.data.permissionData)
        setPermissionData(response.data.data.permissionData)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const columns = [
    {
      name: 'Name',
      selector: row => row.module
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
    <div className='p-2' style={{ backgroundColor: colors.primary[400] }}>
      <DataTable
        columns={columns}
        data={permissionData}
        title='Permission List'
        customStyles={tableCustomStyles}
        fixedHeader
        fixedHeaderScrollHeight='600px'
        className='scrollbar'
        subHeader
        paginationRowsPerPageOptions={[1, 2, 5, 100]}
        pagination
        subHeaderComponent={<input type='text' placeholder='Search' className='w-25 form-control mt-3' />}
        noDataComponent={
          <div className='d-flex justify-content-center mt-5'>
            <h5 style={{ color: colors.grey[100] }}>There is No Data Available</h5>
          </div>
        }
      />
    </div>
  )
}

export default Permission
