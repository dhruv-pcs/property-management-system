import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material'
import { tokens } from '@theme/theme'
import axios from 'axios'
import Image from 'next/image'
import { Button, Card, Col, Row, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProfileImage from '../../../public/images/profile/Img1.png'

const schema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().matches(
    /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/,
    'Password must be at least 6 characters long and contain at least one uppercase letter, one special character, one digit, and one lowercase letter'
  ),
  phone: Yup.number()
    .required('Phone number is required')
    .test('len', 'Phone number must be exactly 10 digits', val => val && val.toString().length === 10),
  alternate_phone: Yup.number(),
  status: Yup.boolean().required('Admin status is required')
})

const Profile = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [userData, setUserData] = useState({})

  // const [showPassword, setShowPassword] = useState(false);
  const [editable, setEditable] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control
  } = useForm({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        setUserData(response.data.data.data)

        setValue('first_name', response.data.data.data.first_name)
        setValue('last_name', response.data.data.data.last_name)
        setValue('email', response.data.data.data.email)
        setValue('phone', response.data.data.data.phone)
        setValue('alternate_phone', response.data.data.data.alternate_phone)
        setValue('city', response.data.data.data.city)
        setValue('country', response.data.data.data.country)
        setValue('pincode', response.data.data.data.pincode)
        setValue('state', response.data.data.data.state)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchData()
  }, [setValue])

  useEffect(() => {}, [userData])

  const onSubmit = async data => {
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/${userData?.u_id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
    } catch (error) {
      toast.error('Error Fetching Data')
      console.log('error', error)
    }
  }

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name='description' content='Profile Page' />
      </Head>

      <Row>
        <Col xl={4}>
          <Card className='mb-4 mb-xl-0' style={{ backgroundColor: colors.primary[1100], color: colors.grey[100] }}>
            <Card.Header style={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}>
              Profile Picture
            </Card.Header>
            <Card.Body className=''>
              <div className='d-flex justify-content-center'>
                <Image
                  data-testid='profile-image'
                  className='img-account-profile rounded-circle mb-2 img-fluid'
                  src={ProfileImage}
                  alt=''
                  width={200}
                  height={200}
                />
              </div>

              {userData && (
                <>
                  <h5 data-testid='profile-name'>
                    Name: {userData?.first_name} {userData?.last_name}
                  </h5>
                  <h5 data-testid='profile-email'>Email: {userData?.email}</h5>
                  <h5 data-testid='profile-role'>Role: {userData?.role?.name}</h5>
                  <h5 data-testid='profile-status'>Status: {userData?.status ? 'Active' : 'Inactive'}</h5>
                  <h5 data-testid='profile-phone'>Contact Number: {userData?.phone}</h5>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col xl={8}>
          <Card className='mb-4' style={{ backgroundColor: colors.primary[1100], color: colors.grey[100] }}>
            <Card.Header style={{ backgroundColor: colors.primary[400], color: colors.grey[100] }}>
              Account Details
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)} control={control}>
                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        type='text'
                        name='first_name'
                        placeholder='Enter your first name'
                        {...register('first_name')}
                        defaultValue={userData?.first_name}
                        readOnly={!editable}
                      />
                      {errors.first_name && <span className='text-danger'>{errors.first_name.message}</span>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        type='text'
                        name='last_name'
                        placeholder='Enter your last name'
                        {...register('last_name')}
                        defaultValue={userData?.last_name}
                        readOnly={!editable}
                      />
                      {errors.last_name && <span className='text-danger'>{errors.last_name.message}</span>}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='gx-3 mb-3'>
                  <Col md={12}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type='email'
                        name='email'
                        placeholder='Enter your email address'
                        {...register('email')}
                        defaultValue={userData?.email}
                        readOnly={!editable}
                      />
                      {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                    </Form.Group>
                  </Col>

                  {/* <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Password</Form.Label>
                    <div className='input-group'>
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Password'
                        {...register('password')}
                        readOnly={!editable}
                      />
                      <Button variant='outline-secondary' onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </Button>
                    </div>
                    {errors.password && <span className='text-danger'>{errors.password.message}</span>}
                  </Form.Group>
                </Col> */}
                </Row>
                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Phone number</Form.Label>
                      <Form.Control
                        type='tel'
                        name='phone'
                        placeholder='Enter your phone number'
                        {...register('phone')}
                        readOnly={!editable}
                        defaultValue={userData?.phone ? Number(userData.phone) : ''}
                      />
                      {errors.phone && <span className='text-danger'>{errors.phone.message}</span>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Alternative Phone No:</Form.Label>
                      <Form.Control
                        type='tel'
                        name='alternate_phone'
                        placeholder='Alternative phone number'
                        {...register('alternate_phone')}
                        readOnly={!editable}
                        defaultValue={userData?.alternate_phone}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type='text'
                        name='city'
                        defaultValue={userData?.city}
                        placeholder='Enter your city'
                        {...register('city')}
                        readOnly={!editable}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type='text'
                        name='state'
                        defaultValue={userData?.state}
                        placeholder='Enter your state'
                        {...register('state')}
                        readOnly={!editable}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type='text'
                        name='country'
                        defaultValue={userData?.country}
                        placeholder='Enter your country'
                        {...register('country')}
                        readOnly={!editable}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Pincode</Form.Label>
                      <Form.Control
                        type='text'
                        name='pincode'
                        defaultValue={userData?.pincode}
                        placeholder='Enter your pincode'
                        {...register('pincode')}
                        readOnly={!editable}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {userData.role_u_id === 'ROL1000000001' ? (
                  <></>
                ) : (
                  <>
                    <div className='d-flex '>
                      {userData && (
                        <Button
                          style={{ color: colors.grey[100], backgroundColor: colors.blueAccent[600] }}
                          onClick={() => setEditable(!editable)}
                          className='mb-3'
                        >
                          {editable ? 'Cancel' : 'Edit'}
                        </Button>
                      )}

                      {editable && (
                        <Button
                          style={{ color: colors.grey[100], backgroundColor: colors.blueAccent[600] }}
                          className='ms-2 mb-3 h-fit'
                          type='submit'
                        >
                          Save changes
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ToastContainer draggable closeOnClick={true} position='top-right' autoClose={3000} />
    </>
  )
}

export default Profile
