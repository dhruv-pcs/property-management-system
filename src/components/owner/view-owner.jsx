// import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, FormControlLabel, Radio, RadioGroup, useTheme, useMediaQuery } from '@mui/material'
import { tokens } from '@theme/theme'
import { Card, Col, Row, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import React from 'react'

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

const ViewOwner = ({ owner }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const editable = false

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const {
    register,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(schema)
  })

  return (
    <Row style={{ width: isSmallScreen ? '100%' : '550px' }}>
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
                <Col md={6}>
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
              <Row className='gx-3 mb-3'>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Active Status</Form.Label>
                    <FormControl component='fieldset'>
                      <RadioGroup
                        row
                        aria-label='status'
                        className='pointer-events-none'
                        defaultValue={owner?.status === true ? 'active' : 'not_active'}
                        {...register('status', { required: true })}
                      >
                        <FormControlLabel
                          value='active'
                          control={<Radio style={{ color: colors.greenAccent[600] }} />}
                          label='Active'
                        />
                        <FormControlLabel
                          value='not_active'
                          control={<Radio style={{ color: colors.greenAccent[600] }} />}
                          label='Not Active'
                        />
                      </RadioGroup>
                    </FormControl>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Verification Status</Form.Label>
                    <FormControl component='fieldset'>
                      <RadioGroup
                        row
                        aria-label='verification_status'
                        className='pointer-events-none'
                        defaultValue={owner?.is_verified === true ? 'verified' : 'not_verified'}
                        {...register('is_verified', { required: true })}
                      >
                        <FormControlLabel
                          value='verified'
                          control={<Radio style={{ color: colors.greenAccent[600] }} />}
                          label='Verified'
                        />
                        <FormControlLabel
                          value='not_verified'
                          control={<Radio style={{ color: colors.greenAccent[600] }} />}
                          label='Not Verified'
                        />
                      </RadioGroup>
                    </FormControl>
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
