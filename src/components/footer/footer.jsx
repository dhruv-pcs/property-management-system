import { Facebook, Instagram, LinkedIn } from '@mui/icons-material'
import { Box, useTheme } from '@mui/material'
import { tokens } from '@theme/theme'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <footer>
      <Box
        style={{ backgroundColor: colors.primary[500] }}
        className='p-2 d-lg-flex justify-content-center align-content-center justify-content-lg-between '
      >
        <Box>
          <div className='d-flex  justify-content-center'>
            <Link
              className='ms-1 text-decoration-none'
              style={{ color: colors.grey[100] }}
              href={'https://www.codenticsoftware.com/'}
            >
              Copyright ©2024 & All rights reserved by Codentic Software
            </Link>
          </div>
        </Box>
        <Box className='d-flex justify-content-center'>
          <Link href='https://www.facebook.com/codentic.software'>
            <Facebook style={{ color: colors.grey[100] }} />
          </Link>
          &nbsp;
          <Link href='https://www.linkedin.com/company/codentic-software'>
            <LinkedIn style={{ color: colors.grey[100] }} />
          </Link>
          &nbsp;
          <Link href='https://www.instagram.com/codentic.software/'>
            <Instagram style={{ color: colors.grey[100] }} />
          </Link>
          &nbsp;
        </Box>
      </Box>
    </footer>
  )
}

export default Footer
