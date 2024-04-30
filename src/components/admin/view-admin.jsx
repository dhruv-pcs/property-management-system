// ** React Imports **
import React from 'react'

// ** Custom Components **
import { tokens } from '@theme/theme'

// ** Third Party Imports **
import { Card, Col, Row, Form } from 'react-bootstrap'
import { useTheme, useMediaQuery } from '@mui/material'
import { useForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'

// ** Styles **
import 'react-toastify/dist/ReactToastify.css'

const ViewAdmin = ({ admin }) => {
  // ** Vars **
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const editable = false
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const { register, control } = useForm()

  return (
    <>
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
                        id='first_name'
                        type='text'
                        placeholder='Enter your first name'
                        {...register('first_name')}
                        defaultValue={admin?.first_name}
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
                        defaultValue={admin?.last_name}
                        readOnly={!editable}
                      />
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
                        defaultValue={admin?.email}
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
                        defaultValue={admin?.phone ? Number(admin.phone) : ''}
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
                        defaultValue={admin?.alternate_phone}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        id='city'
                        type='text'
                        defaultValue={admin?.city}
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
                        defaultValue={admin?.state}
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
                        defaultValue={admin?.country}
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
                        defaultValue={admin?.pincode}
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
                      <Form.Label>Admin</Form.Label>
                      <div>
                        <Form.Check
                          inline
                          label='Active'
                          type='radio'
                          id='active'
                          {...register('status', { required: true })}
                          value={true}
                          defaultChecked={admin?.status === true && true}
                          disabled={!editable}
                        />
                        <Form.Check
                          inline
                          label='Inactive'
                          type='radio'
                          id='inactive'
                          {...register('status', { required: true })}
                          value={false}
                          defaultChecked={admin?.status === false && true}
                          disabled={!editable}
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
      <ToastContainer draggable closeOnClick={true} position='top-right' autoClose={3000} />
    </>
  )
}

export default ViewAdmin
