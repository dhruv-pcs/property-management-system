import React from 'react'
import { useTheme, useMediaQuery } from '@mui/material'
import { tokens } from '@theme/theme'
import { Card, Col, Row, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

const EditCustomer = ({ customer }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const {
    register,

    formState: { errors },
    control,
    setValue
  } = useForm({})

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

  return (
    <>
      <Row style={{ width: isSmallScreen ? '100%' : '550px' }}>
        <Col xl={12}>
          <Card className='mb-4' style={{ backgroundColor: colors.primary[1100], color: colors.grey[100] }}>
            <Card.Body>
              <Form control={control}>
                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter your first name'
                        {...register('first_name')}
                        defaultValue={customer?.first_name}
                        readOnly
                      />
                      {errors.first_name && <span className='text-danger'>{errors.first_name.message}</span>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter your last name'
                        {...register('last_name')}
                        defaultValue={customer?.last_name}
                        readOnly
                      />
                      {errors.last_name && <span className='text-danger'>{errors.last_name.message}</span>}
                    </Form.Group>
                  </Col>
                </Row>

                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type='email'
                        placeholder='Enter your email address'
                        {...register('email')}
                        defaultValue={customer?.email}
                        readOnly
                      />
                      {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>GST No</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter GST No'
                        {...register('gst_no')}
                        defaultValue={customer?.gst_no}
                        readOnly
                      />
                      {errors.gst_no && <span className='text-danger'>{errors.gst_no.message}</span>}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Phone number</Form.Label>
                      <Form.Control
                        type='tel'
                        placeholder='Enter your phone number'
                        {...register('phone')}
                        defaultValue={customer?.phone ? Number(customer.phone) : ''}
                        readOnly
                      />
                      {errors.phone && <span className='text-danger'>{errors.phone.message}</span>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Alternative Phone No:</Form.Label>
                      <Form.Control
                        type='tel'
                        placeholder='Alternative phone number'
                        {...register('alternate_phone')}
                        defaultValue={customer?.alternate_phone}
                        readOnly
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
                        defaultValue={customer?.city}
                        placeholder='Enter your city'
                        {...register('city')}
                        readOnly
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        type='text'
                        defaultValue={customer?.state}
                        placeholder='Enter your state'
                        {...register('state')}
                        readOnly
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
                        defaultValue={customer?.country}
                        placeholder='Enter your country'
                        {...register('country')}
                        readOnly
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Pincode</Form.Label>
                      <Form.Control
                        type='text'
                        defaultValue={customer?.pincode}
                        placeholder='Enter your pincode'
                        {...register('pincode')}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Aadhar Card No</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter Aadhar Card No'
                        {...register('aadhar_card_no')}
                        defaultValue={customer?.aadhar_card_no}
                        readOnly
                      />
                      {errors.aadhar_card_no && <span className='text-danger'>{errors.aadhar_card_no.message}</span>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter Address'
                        {...register('address')}
                        defaultValue={customer?.address}
                        readOnly
                      />
                      {errors.address && <span className='text-danger'>{errors.address.message}</span>}
                    </Form.Group>
                  </Col>
                </Row>

                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Landmark</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter Landmark'
                        {...register('landmark')}
                        defaultValue={customer?.landmark}
                        readOnly
                      />
                      {errors.landmark && <span className='text-danger'>{errors.landmark.message}</span>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Street</Form.Label>
                      <Form.Control
                        type='text'
                        placeholder='Enter Street'
                        {...register('street')}
                        defaultValue={customer?.street}
                        readOnly
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
                          id='active'
                          className='pointer-events-none'
                          {...register('status', { required: true })}
                          value={true}
                          defaultChecked={customer?.status === true && true}
                        />
                        <Form.Check
                          inline
                          label='Inactive'
                          type='radio'
                          className='pointer-events-none'
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
                      <Form.Label>Status</Form.Label>
                      <div>
                        <Form.Check
                          inline
                          label='Verified'
                          type='radio'
                          id='verified'
                          className='pointer-events-none'
                          {...register('is_verified', { required: true })}
                          value={true}
                          defaultChecked={customer?.is_verified === true && true}
                        />
                        <Form.Check
                          inline
                          label='Not Verified'
                          type='radio'
                          className='pointer-events-none'
                          id='not_verified'
                          {...register('is_verified', { required: true })}
                          value={false}
                          defaultChecked={customer?.is_verified === false && true}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default EditCustomer
