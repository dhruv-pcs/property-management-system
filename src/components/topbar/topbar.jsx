import React from 'react'
import { useContext } from 'react'
import { ColorModeContext, tokens } from '@theme/theme'
import { useTheme, Box, IconButton, InputBase } from '@mui/material'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import SearchIcon from '@mui/icons-material/Search'
import { useProSidebar } from 'react-pro-sidebar'
import Link from 'next/link'

const Topbar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const colorMode = useContext(ColorModeContext)
  const { toggleSidebar, broken } = useProSidebar()

  return (
    <header>
      <Box
        display='flex'
        justifyContent='space-between'
        p={1}
        position='sticky'
        top={0}
        zIndex={1000}
        backgroundColor={colors.primary[500]}
        boxShadow={'0 0 10px 0 rgba(0, 0, 0, 0.5)'}
      >
        <Box display='flex'>
          {broken && (
            <IconButton sx={{ margin: '0 6 0 2' }} onClick={() => toggleSidebar()}>
              <MenuOutlinedIcon />
            </IconButton>
          )}
          <Box display='flex' backgroundColor={colors.primary[400]} p={0.2} borderRadius={1}>
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder='Search' />
            <IconButton type='button'>
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
        <Box display='flex'>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
          </IconButton>
          <IconButton>
            <NotificationsOutlinedIcon />
          </IconButton>
          <IconButton>
            <SettingsOutlinedIcon />
          </IconButton>
          <Link href='/profile'>
            <IconButton>
              <PersonOutlinedIcon />
            </IconButton>
          </Link>
        </Box>
      </Box>
    </header>
  )
}

export default Topbar
