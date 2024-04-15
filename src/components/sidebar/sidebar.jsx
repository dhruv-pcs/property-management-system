import { useState } from 'react'
import { Menu, MenuItem, Sidebar, useProSidebar } from 'react-pro-sidebar'
import { tokens } from '@theme/theme'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import { usePathname, useRouter } from 'next/navigation'
import navigation from './sidebarItem'
import { Icon } from '@iconify/react'
import React from 'react'


const Item = ({ title, to, icon, setSelected }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const router = useRouter()
  const path = usePathname()

  const handleItemClick = () => {
    setSelected(title)
    router.push(to)
  }

  return (
    <MenuItem
      active={to === path}
      style={{
        color: to === path ? colors.greenAccent[500] : colors.grey[100],
        backgroundColor: 'transparent'
      }}
      onClick={handleItemClick}
      icon={<Icon icon={icon} style={{ width: '24px', height: '24px' }} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  )
}

const MyProSidebar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [selected, setSelected] = useState('')
  const { collapseSidebar, toggleSidebar, broken } = useProSidebar()
  const navItem = navigation()
  const LocalData = localStorage.getItem('user')
  const Local = JSON.parse(LocalData)

  return (
    <Box
      className=''
      sx={{
        position: 'sticky',
        display: 'flex',
        height: '100vh',
        top: 0,
        bottom: 0,
        zIndex: 2,
        '& .sidebar': {
          border: 'none'
        },
        '& .menu-icon': {
          backgroundColor: 'transparent !important'
        },
        '& .menu-item': {
          backgroundColor: 'transparent !important'
        },
        '& .menu-anchor': {
          color: 'inherit !important',
          backgroundColor: 'transparent !important'
        },
        '& .menu-item:hover': {
          color: `${colors.blueAccent[500]} !important`,
          backgroundColor: 'transparent !important'
        },
        '& .menu-item.active': {
          color: `${colors.greenAccent[500]} !important`,
          backgroundColor: 'transparent !important'
        }
      }}
    >
      <Sidebar breakPoint='md' backgroundColor={colors.primary[400]}>
        <Menu iconshape='square'>
          <MenuItem
            icon={<MenuOutlinedIcon onClick={() => collapseSidebar()} />}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
              backgroundColor: colors.primary[400]
            }}
          >
            <Box display='flex' justifyContent='space-between' alignItems='center' ml='15px'>
              <Typography variant='h3' color={colors.grey[100]}>
                EstateEase
              </Typography>
              <IconButton aria-label='close' onClick={broken ? () => toggleSidebar() : () => collapseSidebar()}>
                <CloseOutlinedIcon />
              </IconButton>
            </Box>
          </MenuItem>

          <Box paddingLeft={broken ? undefined : '0%'} sx={{ '& ul': { padding: '0px' } }}>
            <Item
              title='Dashboard'
              to='/'
              icon={'mdi:home-outline'}
              selected={selected}
              setSelected={setSelected}
              key='dashboard'
            />
            {navItem.map((item, index) => {
              return (
                <div key={index}>
                  {Local?.map(local => {
                    if (local.view && item.subject === local.module.alias_name) {
                      return (
                        <Item
                          key={local.id}
                          title={item.title}
                          to={item.path}
                          icon={item.icon}
                          selected={selected}
                          setSelected={setSelected}
                        />
                      )
                    } else {
                      return null
                    }
                  })}
                </div>
              )
            })}
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  )
}

export default MyProSidebar
