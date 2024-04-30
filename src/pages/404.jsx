'use client'

// ** React Imports
import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

// ** Custom Components **
import Layout from 'src/layout/blank-layout'
import { tokens } from '@theme/theme'

// ** Third Party Imports **
import { useTheme } from '@mui/material'

const Notfound = () => {
  // ** Vars **
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Layout>
      <Head>
        <title>Page Not Found</title>
        <meta name='description' content='Page Not Found' />
      </Head>
      <div data-testid='notfound' className='position-absolute top-50 start-50 translate-middle'>
        <h1 className=''>Page Not Found</h1>
        <Link
          name='return to dashboard'
          aria-label='Dashboard'
          href='/'
          className='text-decoration-none d-flex justify-content-center'
          style={{ color: colors.grey[100] }}
        >
          Return to Dashboard
        </Link>
      </div>
    </Layout>
  )
}

export default Notfound
