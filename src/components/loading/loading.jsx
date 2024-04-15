import { useTheme } from '@mui/material'
import { tokens } from '@theme/theme'
import React from 'react'

const Loading = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <div className='h-full w-full d-flex justify-content-center align-items-center'>
      <span className='spinner' style={{ backgroundColor: colors.primary[500] }}></span>
    </div>
  )
}

export default Loading
