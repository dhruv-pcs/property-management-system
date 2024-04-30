/* eslint-disable react-hooks/exhaustive-deps */
'use client'

//  ** React Imports **
import React, { useEffect } from 'react'

// ** API Imports **
import axios from 'axios'

// ** Third Party Imports **
import { Button, Card, Col, Row, Form } from 'react-bootstrap'
import { tokens } from '@theme/theme'
import { useTheme, useMediaQuery } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'

//** Styles */
import 'react-toastify/dist/ReactToastify.css'

//** Validations */
const schema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email().required('Email is required'),

  // password: Yup.string().matches(
  //   /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/,
  //   'Password must be at least 6 characters long and contain at least one uppercase letter, one special character, one digit, and one lowercase letter'
  // ),

  phone: Yup.number()
    .required('Phone number is required')
    .test('len', 'Phone number must be exactly 10 digits', val => val && val.toString().length === 10),
  alternate_phone: Yup.number().required('Alternate_Phone number is required'),
  status: Yup.boolean().required('Admin status is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  pincode: Yup.string().required('Pincode is required'),
  country: Yup.string().required('Country is required')
})

const UpdateAdmin = ({ admin, onUpdate, handelEditbutton }) => {
  //** Vars */
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

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
    {
      setValue('first_name', admin.first_name)
      setValue('last_name', admin.last_name)
      setValue('email', admin.email)
      setValue('phone', admin.phone)
      setValue('alternate_phone', admin.alternate_phone)
      setValue('city', admin.city)
      setValue('country', admin.country)
      setValue('pincode', admin.pincode)
      setValue('state', admin.state)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue])

  //** Edit Admin on update */
  const onSubmit = async data => {
    try {
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/${admin?.u_id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      if (response.status === 201) {
        handelEditButton()
        onUpdate()
        toast.success('Admin updated successfully')
      }
    } catch (error) {
      toast.error('Error updating admin')
    }
  }

  return (
    <>
      <Row style={{ width: isSmallScreen ? '100%' : '550px' }}>
        <Col xl={12}>
          <Card className='mb-4' style={{ backgroundColor: colors.primary[1100], color: colors.grey[100] }}>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)} control={control}>
                {' '}
                {/* Add control */}
                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='first_name'>First name</Form.Label>
                      <Form.Control
                        id='first_name'
                        data-testid='first_name'
                        type='text'
                        placeholder='Enter your first name'
                        {...register('first_name')}
                        defaultValue={admin?.first_name}
                      />
                      {errors.first_name && <span className='text-danger'>{errors.first_name.message}</span>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='last_name'>Last name</Form.Label>
                      <Form.Control
                        id='last_name'
                        data-testid='last_name'
                        type='text'
                        placeholder='Enter your last name'
                        {...register('last_name')}
                        defaultValue={admin?.last_name}
                      />
                      {errors.last_name && <span className='text-danger'>{errors.last_name.message}</span>}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='gx-3 mb-3'>
                  <Col md={12}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='email'>Email address</Form.Label>
                      <Form.Control
                        id='email'
                        data-testid='email'
                        type='email'
                        placeholder='Enter your email address'
                        {...register('email')}
                        defaultValue={admin?.email}
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
                      <Form.Label htmlFor='phone'>Phone number</Form.Label>
                      <Form.Control
                        id='phone'
                        data-testid='phone'
                        type='tel'
                        placeholder='Enter your phone number'
                        {...register('phone')}
                        defaultValue={admin?.phone ? Number(admin.phone) : ''}
                      />
                      {errors.phone && <span className='text-danger'>{errors.phone.message}</span>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='alternate_phone'>Alternative Phone No:</Form.Label>
                      <Form.Control
                        id='alternate_phone'
                        data-testid='alternate_phone'
                        type='tel'
                        placeholder='Alternative phone number'
                        {...register('alternate_phone')}
                        defaultValue={admin?.alternate_phone}
                      />
                      {errors.alternate_phone && <span className='text-danger'>{errors.alternate_phone.message}</span>}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='city'>City</Form.Label>
                      <Form.Control
                        id='city'
                        data-testid='city'
                        type='text'
                        defaultValue={admin?.city}
                        placeholder='Enter your city'
                        {...register('city')}
                      />
                      {errors.city && <span className='text-danger'>{errors.city.message}</span>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='state'>State</Form.Label>
                      <Form.Control
                        id='state'
                        data-testid='state'
                        type='text'
                        defaultValue={admin?.state}
                        placeholder='Enter your state'
                        {...register('state')}
                      />
                      {errors.state && <span className='text-danger'>{errors.state.message}</span>}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='country'>Country</Form.Label>
                      <Form.Control
                        id='country'
                        data-testid='country'
                        type='text'
                        defaultValue={admin?.country}
                        placeholder='Enter your country'
                        {...register('country')}
                      />
                      {errors.country && <span className='text-danger'>{errors.country.message}</span>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='pincode'>Pincode</Form.Label>
                      <Form.Control
                        id='pincode'
                        data-testid='pincode'
                        type='text'
                        defaultValue={admin?.pincode}
                        placeholder='Enter your pincode'
                        {...register('pincode')}
                      />
                      {errors.pincode && <span className='text-danger'>{errors.pincode.message}</span>}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='status'>Admin</Form.Label>
                      <div>
                        <Form.Check
                          inline
                          label='Active'
                          type='radio'
                          id='active'
                          data-testid='active'
                          {...register('status', { required: true })}
                          value={true}
                          defaultChecked={admin?.status === true && true}
                        />
                        <Form.Check
                          inline
                          label='Inactive'
                          type='radio'
                          id='inactive'
                          data-testid='inactive'
                          {...register('status', { required: true })}
                          value={false}
                          defaultChecked={admin?.status === false && true}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Button
                  aria-label='save'
                  type='submit'
                  data-testid='save-changes'
                  style={{ backgroundColor: colors.blueAccent[600] }}
                  className='ms-2 mb-3 h-fit'
                >
                  Save changes
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer draggable closeOnClick={true} position='top-right' autoClose={3000} />
    </>
  )
}

export default UpdateAdmin
