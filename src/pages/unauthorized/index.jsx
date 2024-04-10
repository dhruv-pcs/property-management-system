import { useTheme } from '@mui/material'
import { tokens } from '@theme/theme'
import Link from 'next/link'

export default function Unauthorized() {
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
        <Link href='/' className='btn btn-light' style={{ backgroundColor: colors.greenAccent[500] }}>
          Go to Dashboard
        </Link>
      </div>
    </>
  )
}
