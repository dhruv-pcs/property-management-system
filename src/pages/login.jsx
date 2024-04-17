import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { TextField, Button, FormControl, InputAdornment, IconButton, Typography } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import Head from 'next/head'
import AuthWrapper from '@components/auth/loginauth'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()
  // console.log('errors',errors);
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const onSubmit = async data => {
    try {
      console.log('12354', process.env.NEXT_PUBLIC_API_URL,data)
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, data)
      console.log('response', response)
      
      const userData = response.data.data
      console.log('userData', userData)
      router.push('/')
      localStorage.setItem('user', JSON.stringify(userData.permissionData))
      localStorage.setItem('token', userData.token)
      localStorage.setItem('Role', userData.roleID)
    } catch (error) {
      toast.error('Invalid Credentials')
    }
  }

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name='description' content='Login Page' />
      </Head>

      <div className='container d-flex justify-content-center align-items-center vh-100'>
        <div className='card w-lg-50'>
          <div className='card-header'>
            <h1 aria-label='Login' className='text-center'>
              Login
            </h1>
          </div>
          <div className='card-body'>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
              <Typography variant='h6' className='fw-light mb-3 pb-3'>
                Please sign in to your account and start the advanced!
              </Typography>
              <FormControl fullWidth margin='normal' error={!!errors.email}>
                <Controller
                  name='email'
                  control={control}
                  defaultValue=''
                  rules={{ required: 'Email address is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label='Email address'
                      variant='outlined'
                      className='bg-none'
                      inputProps={{ 'data-testid': 'email' }}
                    />
                  )}
                />
                {errors.email && (
                  <Typography variant='body2' color='error'>
                    {errors.email.message}
                  </Typography>
                )}
              </FormControl>
              <FormControl fullWidth margin='normal' error={!!errors.password}>
                <Controller
                  name='password'
                  control={control}
                  defaultValue=''
                  rules={{ required: 'Password is required' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      label='Password'
                      variant='outlined'
                      inputProps={{ 'data-testid': 'password' }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='Toggle password visibility'
                              onClick={togglePasswordVisibility}
                              edge='end'
                              data-testid='toggle-password'
                            >
                              {showPassword ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                />
                {errors.password && (
                  <Typography variant='body2' color='error'>
                    {errors.password.message}
                  </Typography>
                )}
              </FormControl>
              <Button
                name='Login'
                type='submit'
                variant='contained'
                className='bg-dark'
                fullWidth
                data-testid='login-button'
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer draggable closeOnClick={true} position='top-right' autoClose={3000} />
    </>
  )
}

export default AuthWrapper(Login)
