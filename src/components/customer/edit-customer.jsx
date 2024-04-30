/* eslint-disable react-hooks/exhaustive-deps */
'use client'

//  ** React Imports **
import React from 'react'
import { useEffect } from 'react'

// ** API Imports **
import axios from 'axios'

// ** Third Party Imports **
import { useTheme, useMediaQuery } from '@mui/material'
import { tokens } from '@theme/theme'
import { Card, Col, Row, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { toast, ToastContainer } from 'react-toastify'

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
  alternate_phone: Yup.string().test(
    'len',
    'Phone number must be exactly 10 digits',
    val => val && val.toString().length === 10
  ),
  aadhar_card_no: Yup.string().required('Aadhar Card No is required'),
  address: Yup.string().required('Address is required'),
  gst_no: Yup.string().required('GST No is required'),
  landmark: Yup.string().required('Landmark is required'),
  street: Yup.string().required('Street is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  pincode: Yup.string().required('Pincode is required'),
  country: Yup.string().required('Country is required'),
  status: Yup.boolean().required('Admin status is required'),
  is_verified: Yup.boolean().required('Verification status is required')
})

const EditCustomer = ({ customer, onUpdate, handelEditbutton }) => {
  //** Vars */
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue
  } = useForm({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    setValue('first_name', customer.first_name)
    setValue('last_name', customer.last_name)
    setValue('email', customer.email)
    setValue('phone', customer.phone)
    setValue('alternate_phone', customer.alternate_phone)
    setValue('city', customer.city)
    setValue('country', customer.country)
    setValue('pincode', customer.pincode)
    setValue('state', customer.state)
    setValue('aadhar_card_no', customer.aadhar_card_no)
    setValue('address', customer.address)
    setValue('gst_no', customer.gst_no)
    setValue('landmark', customer.landmark)
    setValue('street', customer.street)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue])

  //** Edit Customer on update */
  const onSubmit = async data => {
    try {
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/customer/${customer.u_id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      if (response.status === 201) {
        handelEditButton()
        onUpdate()
        toast.success('Customer updated successfully')
      }
    } catch (error) {
      toast.error('Customer cannot be updated')
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
                        type='text'
                        id='first_name'
                        placeholder='Enter your first name'
                        {...register('first_name')}
                        data-testid='first_name'
                        defaultValue={customer?.first_name}
                      />
                      {errors.first_name && <span className='text-danger'>{errors.first_name.message}</span>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='last_name'>Last name</Form.Label>
                      <Form.Control
                        id='last_name'
                        type='text'
                        data-testid='last_name'
                        placeholder='Enter your last name'
                        {...register('last_name')}
                        defaultValue={customer?.last_name}
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
                        defaultValue={customer?.email}
                      />
                      {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='gst_no'>GST No</Form.Label>
                      <Form.Control
                        type='text'
                        id='gst_no'
                        data-testid='gst_no'
                        placeholder='Enter GST No'
                        {...register('gst_no')}
                        defaultValue={customer?.gst_no}
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
                        type='tel'
                        id='phone'
                        data-testid='phone'
                        placeholder='Enter your phone number'
                        {...register('phone')}
                        defaultValue={customer?.phone && Number(customer.phone)}
                      />
                      {errors.phone && <span className='text-danger'>{errors.phone.message}</span>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='alternate_phone'>Alternative Phone No:</Form.Label>
                      <Form.Control
                        type='tel'
                        id='alternate_phone'
                        data-testid='alternate_phone'
                        placeholder='Alternative phone number'
                        {...register('alternate_phone')}
                        defaultValue={customer?.alternate_phone}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='city'>City</Form.Label>
                      <Form.Control
                        type='text'
                        id='city'
                        data-testid='city'
                        defaultValue={customer?.city}
                        placeholder='Enter your city'
                        {...register('city')}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='state'>State</Form.Label>
                      <Form.Control
                        type='text'
                        id='state'
                        data-testid='state'
                        defaultValue={customer?.state}
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
                        type='text'
                        id='country'
                        data-testid='country'
                        defaultValue={customer?.country}
                        placeholder='Enter your country'
                        {...register('country')}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='pincode'>Pincode</Form.Label>
                      <Form.Control
                        type='text'
                        id='pincode'
                        data-testid='pincode'
                        defaultValue={customer?.pincode}
                        placeholder='Enter your pincode'
                        {...register('pincode')}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='aadhar_card_no'>Aadhar Card No</Form.Label>
                      <Form.Control
                        type='text'
                        id='aadhar_card_no'
                        data-testid='aadhar_card_no'
                        placeholder='Enter Aadhar Card No'
                        {...register('aadhar_card_no')}
                        defaultValue={customer?.aadhar_card_no}
                      />
                      {errors.aadhar_card_no && <span className='text-danger'>{errors.aadhar_card_no.message}</span>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='address'>Address</Form.Label>
                      <Form.Control
                        type='text'
                        id='address'
                        data-testid='address'
                        placeholder='Enter Address'
                        {...register('address')}
                        defaultValue={customer?.address}
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
                        type='text'
                        id='landmark'
                        data-testid='landmark'
                        placeholder='Enter Landmark'
                        {...register('landmark')}
                        defaultValue={customer?.landmark}
                      />
                      {errors.landmark && <span className='text-danger'>{errors.landmark.message}</span>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='street'>Street</Form.Label>
                      <Form.Control
                        type='text'
                        id='street'
                        data-testid='street'
                        placeholder='Enter Street'
                        {...register('street')}
                        defaultValue={customer?.street}
                      />
                      {errors.street && <span className='text-danger'>{errors.street.message}</span>}
                    </Form.Group>
                  </Col>
                </Row>

                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Status</Form.Label>
                      <div>
                        <Form.Check
                          inline
                          label='Active'
                          type='radio'
                          data-testid='active'
                          id='active'
                          {...register('status', { required: true })}
                          value={true}
                          defaultChecked={customer?.status === true && true}
                        />
                        <Form.Check
                          inline
                          label='Inactive'
                          type='radio'
                          data-testid='inactive'
                          id='inactive'
                          {...register('status', { required: true })}
                          value={false}
                          defaultChecked={customer?.status === false && true}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Verification</Form.Label>
                      <div>
                        <Form.Check
                          inline
                          label='Verified'
                          type='radio'
                          id='verified'
                          data-testid='verified'
                          {...register('is_verified', { required: true })}
                          value={true}
                          defaultChecked={customer?.is_verified === true && true}
                        />
                        <Form.Check
                          inline
                          label='Not Verified'
                          type='radio'
                          id='not_verified'
                          data-testid='not_verified'
                          {...register('is_verified', { required: true })}
                          value={false}
                          defaultChecked={customer?.is_verified === false && true}
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

export default EditCustomer
