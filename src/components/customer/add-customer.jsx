/* eslint-disable react-hooks/exhaustive-deps */
'use client'

//  ** React Imports **
import React from 'react'

// ** API Imports **
import axios from 'axios'

// ** Third Party Imports **
import { useTheme, useMediaQuery } from '@mui/material'
import { tokens } from '@theme/theme'
import { Card, Col, Row, Form, Button } from 'react-bootstrap'
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
  phone: Yup.string()
    .required('Phone number is required')
    .test('len', 'Phone number must be exactly 10 digits', val => val && val.toString().length === 10),

  // alternate_phone: Yup.string().when('phone', {
  //   is: phone => phone && phone.length === 10,
  //   then: () =>
  //     Yup.string().test(
  //       'notEqualToPhone',
  //       'Alternate phone number cannot be the same as phone number',
  //       function (value) {
  //         const phoneValue = this.parent.phone

  //         return value !== phoneValue
  //       }
  //     )
  // }),
  aadhar_card_no: Yup.string().required('Aadhar Card No is required'),
  address: Yup.string().required('Address is required'),
  gst_no: Yup.string().required('GST No is required'),
  landmark: Yup.string().required('Landmark is required'),
  street: Yup.string().required('Street is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  pincode: Yup.number().required('Pincode is required'),
  country: Yup.string().required('Country is required')
})

const AddCustomer = ({ onUpdate, handelAddbutton }) => {
  //** Vars */
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(schema)
  })

  //** Add Customer */
  const onSubmit = async data => {
    data.otp = '123456'

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/customer`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (response.data.statusCode === 201) {
        onUpdate()
        handelAddbutton()
        toast.success('Customer added successfully')
      }
    } catch (error) {
      toast.error('customer cannot be added')
    }
  }

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
                        type='text'
                        data-testid='first_name'
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
                  <Col md={6}>
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
                      <Form.Label htmlFor='gst_no'>GST No</Form.Label>
                      <Form.Control
                        data-testid='gst_no'
                        id='gst_no'
                        type='text'
                        placeholder='Enter GST No'
                        {...register('gst_no')}
                      />
                      {errors.gst_no && <span className='text-danger'>{errors.gst_no.message}</span>}
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
                        type='tel'
                        placeholder='Enter your phone number'
                        {...register('phone')}
                      />
                      {errors.phone && <span className='text-danger'>{errors.phone.message}</span>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='alternate_phone'>Alternative Phone No</Form.Label>
                      <Form.Control
                        id='alternate_phone'
                        type='tel'
                        data-testid='alternate_phone'
                        placeholder='Enter your alternate phone number'
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
                        data-testid='city'
                        id='city'
                        type='text'
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
                        data-testid='state'
                        id='state'
                        type='text'
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
                      <Form.Label htmlFor='aadhar_card_no'>Aadhar Card No</Form.Label>
                      <Form.Control
                        data-testid='aadhar_card_no'
                        id='aadhar_card_no'
                        type='text'
                        placeholder='Enter Aadhar Card No'
                        {...register('aadhar_card_no')}
                      />
                      {errors.aadhar_card_no && <span className='text-danger'>{errors.aadhar_card_no.message}</span>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='address'>Address</Form.Label>
                      <Form.Control
                        data-testid='address'
                        id='address'
                        type='text'
                        placeholder='Enter Address'
                        {...register('address')}
                      />
                      {errors.address && <span className='text-danger'>{errors.address.message}</span>}
                    </Form.Group>
                  </Col>
                </Row>

                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='landmark'>Landmark</Form.Label>
                      <Form.Control
                        data-testid='landmark'
                        id='landmark'
                        type='text'
                        placeholder='Enter Landmark'
                        {...register('landmark')}
                      />
                      {errors.landmark && <span className='text-danger'>{errors.landmark.message}</span>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='street'>Street</Form.Label>
                      <Form.Control
                        data-testid='street'
                        id='street'
                        type='text'
                        placeholder='Enter Street'
                        {...register('street')}
                      />
                      {errors.street && <span className='text-danger'>{errors.street.message}</span>}
                    </Form.Group>
                  </Col>
                </Row>

                <div className='d-flex '>
                  <Button
                    aria-label='Add'
                    type='submit'
                    data-testid='submit'
                    className='w-100'
                    style={{ backgroundColor: colors.blueAccent[500], color: colors.grey[100] }}
                  >
                    Add
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer draggable closeOnClick={true} position='top-right' autoClose={3000} />
    </>
  )
}

export default AddCustomer
