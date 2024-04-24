import React from 'react';
import { Box} from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0px',
        height: '100vh',
        width: '100vw', // Full height of the viewport
        backgroundColor: '#f0f0f0', // Background color for the login page
      }}
    >
      
        <Box
          sx={{
            height: '100vh',
            width: '100vw',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '32px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', 
          }}
        >
          {children}
        </Box>
   
    </Box>
  );
};

export default Layout;
