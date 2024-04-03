'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Modal, Box, Typography, IconButton, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DataTable from 'react-data-table-component';
import UpdateAdmin from '../../../components/admin/update-admin/update-admin.js';
import AddNewAdmin from '../../../components/admin/add-new-admin/add-new-admin.js';
import CloseIcon from '@mui/icons-material/Close';
import * as Images from 'src/constants/image.js'

const modalStyle = {
  position: 'absolute',
  top: '60%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ViewAdmin = () => {
  const [users, setUsers] = useState([])
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
  
        const adminData = response.data.data.adminData;
        if (Array.isArray(adminData)) {
          setUsers(adminData);
        } else {
          console.error("Expected 'adminData' to be an array but received:", typeof adminData);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchAdminData();
  }, []); // Empty dependency array ensures this runs once on mount
  
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin`, {
  //       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  //     })
  //     .then(response => {
  //       const adminData = response.data.data.adminData
  //       console.log(response)
  //       if (Array.isArray(adminData)) {
  //         setUsers(adminData)
  //       } else {
  //         console.error("Expected 'adminData' to be an array but received:", typeof adminData)
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error fetching users:', error)
  //     })
  // }, [])

  const handleDelete = userId => {
    const deleteUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/${userId}`;
  
    axios.delete(deleteUrl)
      .then(response => {
        console.log('User deleted successfully:', response);
        
        setUsers(currentUsers => currentUsers.filter(user => user.u_id !== userId));
        setShowDeleteModal(false);
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };
  

  const fetchAdminDetails = async u_id => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/oneAdmin/${u_id}`
      )
      if (response.data && response.data.data && response.data.data.adminData) {
        setSelectedAdmin(response.data.data.adminData)
        setShowDetailsModal(true)
      } else {
        console.error('No admin data found for ID:', u_id)
      }
    } catch (error) {
      console.error('Error fetching admin details:', error)
    }
  }

  const fetchUserDetailsForEdit = async userId => {
    setShowEditModal(true)
    setSelectedRow(userId)
  }

  const columns = [
    {
      name: 'Name',
      selector: row => row.first_name,
      cell: row => (
        <div className='d-flex align-items-center'>
          <Image
           src={Images.Image.Img1}
            alt='avatar'
            width={40}
            height={40}
            className='rounded-circle me-2'
            unoptimized
          />
          {row.first_name}
        </div>
      ),
      sortable: true
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true
    },

    {
      name: 'Phone',
      selector: row => row.phone,
      sortable: true
    },

    {
      name: 'Alternate Phone',
      selector: row => row.alternate_phone,
      sortable: true
    },

    {
      name: 'Action',
      button: true,
      cell: row => (
        <div className='d-flex gap-2'>
          <EditIcon style={{ cursor: 'pointer' }} onClick={() => fetchUserDetailsForEdit(row.u_id)} />
          <VisibilityIcon style={{ cursor: 'pointer' }} onClick={() => fetchAdminDetails(row.u_id)} />
          {!row.is_superadmin && (
            <DeleteIcon
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setShowDeleteModal(true)
                setUserToDelete(row.u_id)
              }}
            />
          )}
        </div>
      )
    }
  ]

  return (
    <div className='container'>
      <div className='d-flex justify-content-end mb-3 mt-5'>
        <button onClick={() => setShowAddModal(true)} className='btn btn-primary'>
          Add Admin
        </button>
      </div>

      <DataTable columns={columns} data={users} defaultSortField='first_name' pagination />

      <Modal
  open={showAddModal}
  onClose={() => setShowAddModal(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={modalStyle}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Add New Admin
    </Typography>
    <IconButton
      aria-label="close"
      onClick={() => setShowAddModal(false)}
      style={{ position: 'absolute', right: 8, top: 8 }}
    >
      <CloseIcon />
    </IconButton>
    <Box id="modal-modal-description" sx={{ mt: 2 }}>
      <AddNewAdmin />
    </Box>
  </Box>
</Modal>


<Modal
  open={showEditModal}
  onClose={() => setShowEditModal(false)}
  aria-labelledby="edit-modal-title"
  aria-describedby="edit-modal-description"
>
  <Box sx={modalStyle}>
    <Typography id="edit-modal-title" variant="h6" component="h2">
      Edit User
    </Typography>
    <IconButton
      aria-label="close"
      onClick={() => setShowEditModal(false)}
      style={{ position: 'absolute', right: 8, top: 8 }}
    >
      <CloseIcon />
    </IconButton>
    <Box id="edit-modal-description" sx={{ mt: 2 }}>
      <UpdateAdmin user={selectedRow} isViewOnly={false} />
    </Box>
  </Box>
</Modal>
<Modal
  open={showDetailsModal}
  onClose={() => setShowDetailsModal(false)}
  aria-labelledby="admin-details-modal-title"
  aria-describedby="admin-details-modal-description"
>
<Box sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600, // You can adjust the width as needed
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    outline: 'none'}}>
    <Typography id="admin-details-modal-title" variant="h6" component="h2">
      Admin Details
    </Typography>
    <IconButton
      aria-label="close"
      onClick={() => setShowDetailsModal(false)}
      sx={{ position: 'absolute', right: 8, top: 8 }}
    >
      <CloseIcon />
    </IconButton>
    <Box id="admin-details-modal-description" sx={{ mt: 2 }}>
      <UpdateAdmin user={selectedAdmin} isViewOnly={true} />
    </Box>
  </Box>
</Modal>

<Modal
  open={showDeleteModal}
  onClose={() => setShowDeleteModal(false)}
  aria-labelledby="delete-modal-title"
  aria-describedby="delete-modal-description"
>
  <Box sx={modalStyle}>
    <Typography id="delete-modal-title" variant="h6" component="h2">
      Confirm Delete
    </Typography>
    <IconButton
      aria-label="close"
      onClick={() => setShowDeleteModal(false)}
      style={{ position: 'absolute', right: 8, top: 8 }}
    >
      <CloseIcon />
    </IconButton>
    <Box id="delete-modal-description" sx={{ mt: 2 }}>
      <Typography>Are you sure you want to delete this user?</Typography>
      <Typography>You won't be able to revert this!</Typography>
      <Box sx={{ mt: 2 }}>
        <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
        <Button onClick={() => handleDelete(userToDelete)} color="error">Yes, Delete it!</Button>
      </Box>
    </Box>
  </Box>
</Modal>

    </div>
  )
}

export default ViewAdmin
