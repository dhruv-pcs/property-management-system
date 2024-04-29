import React from 'react'
import { Box, useTheme, useMediaQuery } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import Head from 'next/head'
import EmailIcon from '@mui/icons-material/Email'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import AddHome from '@mui/icons-material/AddHome'
import Header from '@components/dashboard/header'
import StatBox from '@components/dashboard/stat-box'
import { tokens } from '@theme/theme'

const Dashboard = () => {
  const theme = useTheme()
  const smScreen = useMediaQuery(theme.breakpoints.up('sm'))
  const colors = tokens(theme.palette.mode)

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name='description' content='Dashboard' />
      </Head>
      <Box m='20px'>
        {/* HEADER */}

        <Box
          display={smScreen ? 'flex' : 'block'}
          flexDirection={smScreen ? 'row' : 'column'}
          justifyContent={smScreen ? 'space-between' : 'start'}
          alignItems={smScreen ? 'center' : 'start'}
          m='10px 0'
        >
          <Header title='DASHBOARD' subtitle='Welcome to your dashboard' />
        </Box>

        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={12} sm={12} md={6}>
            <Box
              width='100%'
              className='d-flex justify-content-center align-items-center rounded-2'
              backgroundColor={colors.primary[1100]}
              display='flex'
              alignItems='center'
              justifyContent='center'
              height='200px'
            >
              <StatBox
                title='1236'
                subtitle='Emails Sent'
                progress='0.75'
                increase='+14%'
                icon={<EmailIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
              />
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6}>
            <Box
              width='100%'
              className='d-flex justify-content-center align-items-center rounded-2'
              backgroundColor={colors.primary[1100]}
              display='flex'
              alignItems='center'
              justifyContent='center'
              height='200px'
            >
              <StatBox
                title='380'
                subtitle='Owner'
                progress='0.80'
                increase='+39%'
                icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
              />
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6}>
            <Box
              width='100%'
              className='d-flex justify-content-center align-items-center rounded-2'
              backgroundColor={colors.primary[1100]}
              display='flex'
              alignItems='center'
              height='200px'
              justifyContent='center'
            >
              <StatBox
                title='324'
                subtitle='Tenets'
                progress='0.30'
                increase='+5%'
                icon={<PersonAddIcon sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
              />
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6}>
            <Box
              width='100%'
              className='d-flex justify-content-center align-items-center rounded-2'
              backgroundColor={colors.primary[1100]}
              display='flex'
              alignItems='center'
              justifyContent='center'
              height='200px'
            >
              <StatBox
                title='400'
                subtitle='Properties'
                progress='0.80'
                increase='+43%'
                icon={<AddHome sx={{ color: colors.greenAccent[600], fontSize: '26px' }} />}
              />
            </Box>
          </Grid>

          {/* <Grid xs={12} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid xs={12} md={11}>
              <Box backgroundColor={colors.primary[400]}>
                <Box mt='25px' p='0 30px' display='flex' justifyContent='space-between' alignItems='center'>
                  <Box>
                    <Typography variant='h5' fontWeight='600' color={colors.grey[100]}>
                      Revenue Generated
                    </Typography>
                    <Typography variant='h5' fontWeight='600' color={colors.greenAccent[500]}>
                      $58,370
                    </Typography>
                  </Box>
                </Box>
                <Box height='250px' m='-20px 0 0 0'>
                  <LineChart isDashboard={true} />
                </Box>
              </Box>
            </Grid>
          </Grid> */}
        </Grid>
      </Box>
    </>
  )
}

export default Dashboard
