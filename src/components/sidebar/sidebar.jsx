import { useState, useEffect } from 'react'
import { Menu, MenuItem, Sidebar, useProSidebar } from 'react-pro-sidebar'
import { Link } from 'next/link'
import { tokens } from '@theme/theme'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import axios from 'axios'
import { usePathname, useRouter } from 'next/navigation'
import {
  AccountBalanceWallet,
  AccountBalanceWalletTwoTone,
  Favorite,
  FmdGood,
  HomeWork,
  NaturePeople,
  Policy,
  PrivacyTip,
  RequestPageTwoTone,
  RequestQuote
} from '@mui/icons-material'

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
  // eslint-disable-next-line no-unused-vars
  const [apiData, setApiData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/module`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        setApiData(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

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

          <Box paddingLeft={collapsed ? undefined : '0%'} sx={{ '& ul': { padding: '0px' } }}>
            <Item title='Dashboard' to='/' icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />

            <Typography variant='h6' color={colors.grey[300]} sx={{ m: '15px 20px 5px 20px' }}>
              User, Roles and permission
            </Typography>
            <Item
              title='Admin'
              to='/admin'
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Role'
              to='/role'
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Permission'
              to='/permission'
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Role Permission'
              to='/rolepermission'
              icon={<PrivacyTip />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Permission List'
              to='/permissionlist'
              icon={<Policy />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography variant='h6' color={colors.grey[300]} sx={{ m: '15px 20px 5px 20px' }}>
              Property, Owner, Customer
            </Typography>
            <Item title='Property' to='/property' icon={<HomeWork />} selected={selected} setSelected={setSelected} />
            <Item
              title='Property Allocate'
              to='/propertyallocate'
              icon={<FmdGood />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Owner'
              to='/owner'
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Customer'
              to='/customer'
              icon={<NaturePeople />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography variant='h6' color={colors.grey[300]} sx={{ m: '15px 20px 5px 20px' }}>
              Wallet
            </Typography>
            <Item
              title='Customer Wishlist'
              to='/customerwishlist'
              icon={<Favorite />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Customer Wallet'
              to='/customerwallet'
              icon={<AccountBalanceWallet />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Owner Wallet'
              to='/ownerwallet'
              icon={<AccountBalanceWalletTwoTone />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Customer Wallet Transection'
              to='/customerwallettransection'
              icon={<RequestQuote />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title='Owner Wallet Transection'
              to='/ownerwallettransection'
              icon={<RequestPageTwoTone />}
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
