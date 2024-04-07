import { useTheme } from '@mui/material'
import { tokens } from '@theme/theme'
import axios from 'axios'
import { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Head from 'next/head'

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

  const getRoleBackgroundColor = role => {
    switch (role.toLowerCase()) {
      case 'admin':
        return colors.greenAccent[600]
      case 'super-admin':
        return colors.redAccent[600]
      default:
        return generateRandomColor()
    }
  }

  const generateRandomColor = () => {
    // Generate random hex color between #4cceac to #3da58a
    const min = parseInt('3da58a', 16)
    const max = parseInt('4cceac', 16)
    const randomColor = '#' + Math.floor(Math.random() * (max - min + 1) + min).toString(16)

    return randomColor
  }

  const columns = [
    {
      name: 'Name',
      selector: row => row.module
    },
    {
      name: 'Assign to',
      selector: row => row.role, // Assuming row.role is an array
      cell: row => (
        <div className='d-flex gap-2'>
          {row.role.map((role, index) => (
            <div
              className='fw-bold  d-flex jstify-content-center align-items-center  px-2 py-1 rounded-pill text-capitalize'
              key={index}
              style={{ backgroundColor: getRoleBackgroundColor(role) }}
            >
              {role}
            </div>
          ))}
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
        <title>Permission List Page</title>
        <meta name='description' content='Permission List Page' />
      </Head>
      <div className='p-2 rounded-2' style={{ backgroundColor: colors.primary[500] }}>
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
    </>
  )
}

export default Permission
