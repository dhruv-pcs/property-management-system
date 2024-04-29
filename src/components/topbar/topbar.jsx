import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ColorModeContext, tokens } from '@theme/theme'
import { useTheme, Box, IconButton } from '@mui/material'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import { useProSidebar } from 'react-pro-sidebar'
import Link from 'next/link'
import LogoutIcon from '@mui/icons-material/Logout'
import axios from 'axios'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Topbar = () => {
  const [isMounted, setIsMounted] = useState(false)
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const colorMode = useContext(ColorModeContext)
  const { toggleSidebar, broken } = useProSidebar()
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)

    return () => {
      setIsMounted(false)
    }
  }, [])

  if (!isMounted) {
    return null
  }

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (response.data.statusCode === 200) {
        router.push('/login')

        const cookies = document.cookie.split(';')

        cookies.forEach(cookie => {
          const cookieParts = cookie.split('=')
          const cookieName = cookieParts[0].trim()

          document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        })
      }
    } catch (error) {
      toast.error('Error Logging Out')
    }
  }

  return (
    <>
      <header>
        <Box
          data-testid='topbar'
          display='flex'
          justifyContent='space-between'
          p={1}
          position='sticky'
          top={0}
          zIndex={1}
          backgroundColor={colors.primary[500]}
          boxShadow={'0 0 10px 0 rgba(0, 0, 0, 0.5)'}
        >
          <Box display='flex'>
            {broken && (
              <IconButton
                data-testid='menu'
                aria-label='Menu'
                sx={{ margin: '0 6 0 2' }}
                onClick={() => toggleSidebar()}
              >
                <MenuOutlinedIcon />
              </IconButton>
            )}
          </Box>
          <Box display='flex'>
            <IconButton aria-label='Mode' onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
            </IconButton>
            <Link aria-label='Profile' href='/profile' data-testid='profile-icon'>
              <IconButton>
                <PersonOutlinedIcon />
              </IconButton>
            </Link>

            <IconButton data-testid='logout' aria-label='Logout' onClick={() => handleLogout()}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Box>
      </header>
      <ToastContainer draggable closeOnClick={true} position='top-right' autoClose={3000} />
    </>
  )
}

export default Topbar
