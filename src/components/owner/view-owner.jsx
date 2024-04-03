// import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material'
import { tokens } from '@theme/theme'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

const schema = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().matches(
      /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/,
      'Password must be at least 6 characters long and contain at least one uppercase letter, one special character, one digit, and one lowercase letter'
    ),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
    alternate_phone: Yup.string(),
    status: Yup.boolean().required('Admin status is required'),
    aadhar_card_no: Yup.string().required('Aadhar Card No is required'),
    address: Yup.string().required('Address is required'),
    gst_no: Yup.string().required('GST No is required'),
    is_verified: Yup.boolean().required('Verification status is required'),
    landmark: Yup.string().required('Landmark is required'),
    street: Yup.string().required('Street is required')
  })
  

const ViewOwner = ({owner}) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const editable = false

  const {
    register,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(schema)
  })
  console.log('owner', owner);

  return (
    <Row>
     
      <Col xl={12}>
        <Card className='mb-4' style={{ backgroundColor: colors.primary[1100], color: colors.grey[100] }}>
      
          <Card.Body>
            <Form control={control}>
              {' '}
              {/* Add control */}
              <Row className='gx-3 mb-3'>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter your first name'
                      {...register('first_name')}
                      defaultValue={owner?.first_name}
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
                      placeholder='Enter your last name'
                      {...register('last_name')}
                      defaultValue={owner?.last_name}
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
                      placeholder='Enter your email address'
                      {...register('email')}
                      defaultValue={owner?.email}
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
                      placeholder='Enter your phone number'
                      {...register('phone')}
                      readOnly={!editable}
                      defaultValue={owner?.phone ? Number(owner.phone) : ''}
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
                      readOnly={!editable}
                      defaultValue={owner?.alternate_phone}
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
                      defaultValue={owner?.city}
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
                      defaultValue={owner?.state}
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
                      defaultValue={owner?.country}
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
                      defaultValue={owner?.pincode}
                      placeholder='Enter your pincode'
                      {...register('pincode')}
                      readOnly={!editable}
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
        defaultValue={owner?.aadhar_card_no}
        readOnly={!editable}
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
        defaultValue={owner?.address}
        readOnly={!editable}
      />
      {errors.address && <span className='text-danger'>{errors.address.message}</span>}
    </Form.Group>
  </Col>
</Row>
<Row className='gx-3 mb-3'>
  <Col md={6}>
    <Form.Group className='mb-1'>
      <Form.Label>GST No</Form.Label>
      <Form.Control
        type='text'
        placeholder='Enter GST No'
        {...register('gst_no')}
        defaultValue={owner?.gst_no}
        readOnly={!editable}
      />
      {errors.gst_no && <span className='text-danger'>{errors.gst_no.message}</span>}
    </Form.Group>
  </Col>

  <Col md={6}>
    <Form.Group className='mb-1'>
      <Form.Label>Verification Status</Form.Label>
      <div>
        <Form.Check
          inline
          label='Verified'
          type='radio'
          id='verified'
          {...register('is_verified', { required: true })}
          value={true}
          defaultChecked={owner?.is_verified === true & true }
          className='pointer-events-none'
        />
        <Form.Check
          inline
          label='Not Verified'
          type='radio'
          id='not_verified'
          {...register('is_verified', { required: true })}
          value={false}
          defaultChecked={owner?.is_verified === false && true }
          
          className='pointer-events-none'
        />
      </div>
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
        defaultValue={owner?.landmark}
        readOnly={!editable}
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
        defaultValue={owner?.street}
        readOnly={!editable}
      />
      {errors.street && <span className='text-danger'>{errors.street.message}</span>}
    </Form.Group>
  </Col>
</Row>

        

            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default ViewOwner
