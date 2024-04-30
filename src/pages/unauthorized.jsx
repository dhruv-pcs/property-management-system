// ** React Imports **
import React from 'react'
import Link from 'next/link'

// ** Custom Components **
import { tokens } from '@theme/theme'

// ** Third Party Imports **
import { useTheme } from '@mui/material'

export default function Unauthorized() {
  // ** Vars
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <>
      <div
        className='d-flex flex-column align-items-center justify-content-center '
        style={{ height: '100vh', backgroundColor: colors.primary[500] }}
      >
        <h1>Unauthorized</h1>
        <p>You are not authorized to access this page.</p>
        <Link
          aria-label='Dashboard'
          href='/'
          className='btn btn-light'
          style={{ backgroundColor: colors.greenAccent[500] }}
        >
          Go to Dashboard
        </Link>
      </div>
    </>
  )
}
