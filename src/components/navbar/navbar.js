import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import Logout from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  }; 

  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="container-fluid">
      <form className="d-none d-md-flex my-2 my-lg-0">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
        <div className="d-flex ms-auto">
          <IconButton color="inherit" aria-label="notifications" size="large">
            <NotificationsIcon />  
            </IconButton>    
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="profile-menu"
            aria-haspopup="true" 
            onClick={handleProfileMenuOpen}
            color="inherit"
            size="large"
          >
            <img src="url_of_user_profile_image.jpg" alt="User Profile" className="rounded-circle" style={{ width: '30px', height: '30px' }} />
          </IconButton>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleMenuClose}><PermIdentityIcon fontSize="small" style={{ marginRight: '10px' }} /> Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}><Logout fontSize="small" style={{ marginRight: '10px' }} /> Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
