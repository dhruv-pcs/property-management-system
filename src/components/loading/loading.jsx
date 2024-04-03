import { useTheme } from "@mui/material"

const Loading = () => {
  const theme= useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div className='h-full w-full d-flex justify-content-center align-items-center'>
      <span className='spinner'></span>
    </div>
  )
}

export default Loading
