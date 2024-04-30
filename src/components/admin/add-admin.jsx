/* eslint-disable react-hooks/exhaustive-deps */
'use client'

//  ** React Imports **
import React, { useState, useEffect } from 'react'

// ** API Imports **
import axios from 'axios'

// ** Third Party Imports **
import { Button, Card, Col, Row, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { tokens } from '@theme/theme'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useTheme, useMediaQuery } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'

//** Styles */
import 'react-toastify/dist/ReactToastify.css'

//** Validations */
const schema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email().required('Email is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .test('len', 'Phone number must be exactly 10 digits', val => val && val.toString().length === 10),
  pincode: Yup.number()
})

const AddAdmin = ({ onUpdate, handelAddButton }) => {
  //** Vars */
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [showPassword, setShowPassword] = useState(false)
  const [roles, setRoles] = useState([])

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(schema)
  })

  //** Add Admin */
  const onSubmit = async data => {
    data.language = 'English'
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (response.data.statusCode === 201) {
        onUpdate()
        handelAddButton()
        toast.success('Admin added successfully')
      }
    } catch (error) {
      toast.error('Admin cannot be created')
    }
  }

  //** Fetch roles for Role Field */
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/role`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        const filteredRoles = response.data.data.filter(role => role.name !== 'super-admin')
        setRoles(filteredRoles)
      } catch (error) {
        toast.error('Error Fetching Data')
      }
    }
    fetchRoles()
  }, [])

  return (
    <>
      <Row style={{ width: isSmallScreen ? '100%' : '550px' }}>
        <Col xl={12}>
          <Card className='mb-4' style={{ backgroundColor: colors.primary[1100], color: colors.grey[100] }}>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)} control={control}>
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
                      />
                      {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='password'>Password</Form.Label>
                      <div className='input-group'>
                        <Form.Control
                          id='password'
                          data-testid='password'
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Password'
                          {...register('password')}
                        />
                        <Button
                          aria-label='Show password'
                          variant='outline-secondary'
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <VisibilityOff data-testid='visibility-off-icon' />
                          ) : (
                            <Visibility data-testid='visibility-icon' />
                          )}
                        </Button>
                      </div>
                      {errors.password && <span className='text-danger'>{errors.password.message}</span>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className='mb-3'>
                      <Form.Label htmlFor='role_u_id'>Role</Form.Label>
                      <Form.Select id='role_u_id' data-testid='role_u_id' {...register('role_u_id')}>
                        <option value=''>Select a role</option>
                        {roles.map(role => (
                          <option key={role.u_id} value={role.u_id}>
                            {role.name}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='phone'>Phone number</Form.Label>
                      <Form.Control
                        id='phone'
                        data-testid='phone'
                        type='text'
                        placeholder='Enter your phone number'
                        {...register('phone')}
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
                        type='text'
                        placeholder='Alternative phone number'
                        {...register('alternate_phone')}
                      />
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
                        placeholder='Enter your city'
                        {...register('city')}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='state'>State</Form.Label>
                      <Form.Control
                        id='state'
                        data-testid='state'
                        type='text'
                        placeholder='Enter your state'
                        {...register('state')}
                      />
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
                        placeholder='Enter your country'
                        {...register('country')}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='pincode'>Pincode</Form.Label>
                      <Form.Control
                        id='pincode'
                        data-testid='pincode'
                        type='text'
                        placeholder='Enter your pincode'
                        {...register('pincode')}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button
                  data-testid='add-admin-button'
                  type='submit'
                  aria-label='Add Admin'
                  variant='primary'
                  style={{ color: colors.grey[100], backgroundColor: colors.blueAccent[600] }}
                >
                  Add Admin
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

export default AddAdmin
