import { useState } from 'react'
import { Menu, Sidebar, MenuItem } from 'react-pro-sidebar'
import { useProSidebar } from 'react-pro-sidebar'
import { Link } from 'next/link'
import { tokens } from '@theme/theme'
import { useTheme, Box, Typography, IconButton } from '@mui/material'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined'
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import { usePathname, useRouter } from 'next/navigation'

const Item = ({ title, to, icon, setSelected }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [hovered, setHovered] = useState(false)
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
        ...(hovered && {
          color: to === path ? colors.greenAccent[500] : colors.blueAccent[500],
          backgroundColor: 'transparent !important'
        })
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleItemClick}
      icon={icon}
      containerElement={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  )
}

const MyProSidebar = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [selected, setSelected] = useState('')
  const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar()

  return (
    <Box
    className=''
      sx={{
        position: 'sticky',
        display: 'flex',
        height: '100vh',
        top: 0,
        bottom: 0,
        zIndex: 10000,
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
            icon={collapsed && <MenuOutlinedIcon onClick={() => collapseSidebar()} />}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
              backgroundColor: colors.primary[400]
            }}
          >
            {!collapsed && (
              <Box display='flex' justifyContent='space-between' alignItems='center' ml='15px'>
                <Typography variant='h3' color={colors.grey[100]}>
                  EstateEase
                </Typography>
                <IconButton onClick={broken ? () => toggleSidebar() : () => collapseSidebar()}>
                  <CloseOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={collapsed ? undefined : '0%' } sx={{ "& ul": { padding: "0px" } }}>
            <Item title='Dashboard' to='/' icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />

            <Typography variant='h6' color={colors.grey[300]} sx={{ m: '15px 20px 5px 20px' }}>
              Data
            </Typography>
            <Item
              title='Manage Team'
              to='/team'
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Contacts Information'
              to='/contacts'
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Invoices Balances'
              to='/invoices'
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography variant='h6' color={colors.grey[300]} sx={{ m: '15px 20px 5px 20px' }}>
              Pages
            </Typography>
            <Item
              title='Profile Form'
              to='/form'
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Calendar'
              to='/calendar'
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='FAQ Page'
              to='/faq'
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography variant='h6' color={colors.grey[300]} sx={{ m: '15px 20px 5px 20px' }}>
              Charts
            </Typography>
            <Item
              title='Bar Chart'
              to='/bar'
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Pie Chart'
              to='/pie'
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Line Chart'
              to='/line'
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Geography Chart'
              to='/geography'
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  )
}

export default MyProSidebar
