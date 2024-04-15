import { useTheme } from '@mui/material'
import { tokens } from '@theme/theme'
import Link from 'next/link'
import Head from 'next/head'
import React from 'react'

const Notfound = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <>
      <Head>
        <title>Page Not Found</title>
        <meta name='description' content='Page Not Found' />
      </Head>
      <div className='position-absolute top-50 start-50 translate-middle'>
        <h1 className=''>Page Not Found</h1>
        <Link
          aria-label='Dashboard'
          href='/'
          className='text-decoration-none d-flex justify-content-center'
          style={{ color: colors.grey[100] }}
        >
          Return to Dashboard
        </Link>
      </div>
    </>
  )
}

export default Notfound
