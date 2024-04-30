import React from 'react'
import { FormControl, FormControlLabel, Radio, RadioGroup, useTheme, useMediaQuery } from '@mui/material'
import { tokens } from '@theme/theme'
import { Card, Col, Row, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

const ViewOwner = ({ owner }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const editable = false

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const { register, control } = useForm()

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
                      defaultValue={owner?.phone && Number(owner.phone)}
                    />
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
                    <Form.Label>PinCode</Form.Label>
                    <Form.Control
                      type='text'
                      defaultValue={owner?.PinCode}
                      placeholder='Enter your PinCode'
                      {...register('PinCode')}
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
                          control={<Radio data-testid='active' style={{ color: colors.greenAccent[600] }} />}
                          label='Active'
                        />
                        <FormControlLabel
                          value='not_active'
                          control={<Radio data-testid='not_active' style={{ color: colors.greenAccent[600] }} />}
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
                          control={<Radio data-testid='verified' style={{ color: colors.greenAccent[600] }} />}
                          label='Verified'
                        />
                        <FormControlLabel
                          value='not_verified'
                          control={<Radio data-testid='not_verified' style={{ color: colors.greenAccent[600] }} />}
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
