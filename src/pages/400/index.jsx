// UnauthorizedPage.js

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material'
import { tokens } from '@theme/theme'

const UnauthorizedPage = () => {
  const router = useRouter()
  const [redirect, setRedirect] = useState(false)
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setRedirect(true)
  //   }, 5000)

  //   return () => clearTimeout(timer)
  // }, [])

  useEffect(() => {
    if (redirect) {
      router.back()
    }
  }, [redirect])

  const handleClick = () => {
    router.back()
  }

  return (
    <div
      className='d-flex flex-column align-items-center justify-content-center '
      style={{ height: '100vh', backgroundColor: colors.primary[500] }}
    >
      <h1>Unauthorized</h1>
      <p>You are not authorized to access this page.</p>
      <p>Redirecting to dashboard in 5 seconds...</p>
      <button className='btn btn-light' onClick={handleClick}>
        Go to Dashboard
      </button>
    </div>
  )
}

export default UnauthorizedPage
