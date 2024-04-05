import React from 'react'
import { Grid, Box, Typography, useTheme } from '@mui/material'
import Head from 'next/head'
import { tokens } from '@theme/theme'

const Index = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <>
      <Head>
        <title>Example Page</title>
        <meta name='description' content='This is an example page description.' />
      </Head>

      <div className='mt-3 mb-5'>
        <h1>Dashboard </h1>
      </div>

      <Grid container spacing={5}>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ backgroundColor: colors.primary[500] }} p={2}>
            <Typography variant='h6' color='textSecondary'>
              Admin
            </Typography>
            <Typography>
              Welcome to the Admin, Where the Admin can view, add,update and delete the property. It can be verify the
              property{' '}
            </Typography>
            <Typography>
              Welcome to the Admin, Where the Admin can view, add,update and delete the property. It can be verify the
              property{' '}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ backgroundColor: colors.primary[500] }} p={2}>
            <Typography variant='h6' color='textSecondary'>
              Owner
            </Typography>
            <Typography>Welcome to the Owner, Where the owner can Buy and Sell the property. </Typography>
            <Typography>Welcome to the Owner, Where the owner can Buy and Sell the property. </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ backgroundColor: colors.primary[500] }} p={2}>
            <Typography variant='h6' color='textSecondary'>
              Tenants
            </Typography>
            <Typography>
              Welcome to the tenants, Where the tenants can Buy the property. The Tenants can be check the property
              views.{' '}
            </Typography>
            <Typography>
              Welcome to the tenants, Where the tenants can Buy the property. The Tenants can be check the property
              views.{' '}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ backgroundColor: colors.primary[500] }} p={2}>
            <Typography variant='h6' color='textSecondary'>
              Property
            </Typography>
            <Typography>
              Welcome to the Property, Where the Property could Buy and Sell by the owner and tenants. The property will
              be verify by the Admin{' '}
            </Typography>
            <Typography>
              Welcome to the Property, Where the Property could Buy and Sell by the owner and tenants. The property will
              be verify by the Admin{' '}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ backgroundColor: colors.primary[500] }} p={2}>
            <Typography variant='h6' color='textSecondary'>
              About
            </Typography>
            <Typography>
              Welcome to the Property, Where the Property could Buy and Sell by the owner and tenants. The property will
              be verify by the Admin{' '}
            </Typography>
            <Typography>
              Welcome to the Property, Where the Property could Buy and Sell by the owner and tenants. The property will
              be verify by the Admin{' '}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Index
