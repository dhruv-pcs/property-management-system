import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Card, Col, Row, Form } from 'react-bootstrap'
import { tokens } from '@theme/theme'
import { useTheme } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

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
  alternate_phone: Yup.number(),
  status: Yup.boolean().required('Admin status is required')
})

const UpdateAdmin = ({ admin, isViewOnly, onUpdate, handleAdminDataUpdate }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

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
    console.log(admin)
    setValue('first_name', admin.first_name)
    setValue('last_name', admin.last_name)
    setValue('email', admin.email)
    setValue('phone', admin.phone)
    setValue('alternate_phone', admin.alternate_phone)
    setValue('city', admin.city)
    setValue('country', admin.country)
    setValue('pincode', admin.pincode)
    setValue('state', admin.state)
  }, [setValue, admin])

  // const onSubmit = async data => {
  //   setEditable(false)

  //   const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/${admin?.u_id}`, data, {
  //     headers: {
  //       Authorization: `Bearer  ${localStorage.getItem('token')}`
  //     }
  //   })
  //   console.log('response', response)
  // }

  const onSubmit = async data => {
    setEditable(false)
    try {
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/${admin?.u_id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      if (response.status === 201) {
        handleAdminDataUpdate()
        onUpdate()
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <Row>
      <Col xl={12}>
        <Card className='mb-4' style={{ backgroundColor: colors.primary[1100], color: colors.grey[100] }}>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)} control={control}>
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
                      defaultValue={admin?.first_name}
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
                      defaultValue={admin?.last_name}
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
                      defaultValue={admin?.email}
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
                      defaultValue={admin?.phone ? Number(admin.phone) : ''}
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
              {admin?.role_u_id === 'ROL1000000001' ? (
                <></>
              ) : (
                <>
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
                            defaultChecked={admin?.status === true ? true : false}
                            readOnly={!editable}
                          />
                          <Form.Check
                            inline
                            label='Inactive'
                            type='radio'
                            id='inactive'
                            {...register('status', { required: true })}
                            value={false}
                            defaultChecked={admin?.status === false ? false : true}
                            readOnly={!editable}
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                </>
              )}
              {admin?.role_u_id === 'ROL1000000001' ? (
                <></>
              ) : (
                <>
                  {!isViewOnly && (
                    <div className='d-flex'>
                      <Button onClick={() => setEditable(!editable)} className='mb-3'>
                        {editable ? 'Cancel' : 'Edit'}
                      </Button>

                      <Button className='ms-2 mb-3 h-fit' type='submit'>
                        Save changes
                      </Button>
                    </div>
                  )}
                </>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default UpdateAdmin
