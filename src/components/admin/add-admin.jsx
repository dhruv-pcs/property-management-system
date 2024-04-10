import { Button, Card, Col, Row, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { tokens } from '@theme/theme'
import axios from 'axios'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useTheme } from '@mui/material'

const schema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email().required('Email is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .test('len', 'Phone number must be exactly 10 digits', val => val && val.toString().length === 10),
  alternate_phone: Yup.string().when('phone', {
    is: phone => phone && phone.length === 10,
    then: () =>
      Yup.string().test(
        'notEqualToPhone',
        'Alternate phone number cannot be the same as phone number',
        function (value) {
          const phoneValue = this.parent.phone

          return value !== phoneValue
        }
      )
  }),
  pincode: Yup.number(),
  role_u_id: Yup.string().required('Role is required')
})

const AddAdmin = ({ onUpdate, handelAddbutton }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const [showPassword, setShowPassword] = useState(false)
  const [roles, setRoles] = useState([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    data.language = 'English'
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (response.data.statusCode === 201) {
        onUpdate()
        handelAddbutton()
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/role`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        const filteredRoles = response.data.data.filter(role => role.name !== 'super-admin')
        setRoles(filteredRoles)
      } catch (error) {
        console.log('Failed to fetch roles', error)
      }
    }

    fetchRoles()
  }, [])

  return (
    <Row>
      <Col xl={12}>
        <Card className='mb-4' style={{ backgroundColor: colors.primary[1100], color: colors.grey[100] }}>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)} control={control}>
              <Row className='gx-3 mb-3'>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>First name</Form.Label>
                    <Form.Control type='text' placeholder='Enter your first name' {...register('first_name')} />
                    {errors.first_name && <span className='text-danger'>{errors.first_name.message}</span>}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control type='text' placeholder='Enter your last name' {...register('last_name')} />
                    {errors.last_name && <span className='text-danger'>{errors.last_name.message}</span>}
                  </Form.Group>
                </Col>
              </Row>
              <Row className='gx-3 mb-3'>
                <Col md={12}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type='email' placeholder='Enter your email address' {...register('email')} />
                    {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                  </Form.Group>
                </Col>

                <Col md={6}>
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
                </Col>
                <Col md={6}>
                  <Form.Group className='mb-3'>
                    <Form.Label>Role</Form.Label>
                    <Form.Select {...register('role_u_id')}>
                      <option value=''>Select a role</option>
                      {roles.map(role => (
                        <option key={role.u_id} value={role.u_id}>
                          {role.name}
                        </option>
                      ))}
                    </Form.Select>
                    {errors.role && <span className='text-danger'>{errors.role.message}</span>}
                  </Form.Group>
                </Col>
              </Row>
              <Row className='gx-3 mb-3'>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control type='text' placeholder='Enter your phone number' {...register('phone')} />
                    {errors.phone && <span className='text-danger'>{errors.phone.message}</span>}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Alternative Phone No:</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Alternative phone number'
                      {...register('alternate_phone', {
                        validate: value => (value && value.length === 10 ? Yup.ref('phone') !== value : true)
                      })}
                    />
                    {errors.alternate_phone && <span className='text-danger'>{errors.alternate_phone.message}</span>}
                  </Form.Group>
                </Col>
              </Row>
              <Row className='gx-3 mb-3'>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='text' placeholder='Enter your city' {...register('city')} />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>State</Form.Label>
                    <Form.Control type='text' placeholder='Enter your state' {...register('state')} />
                  </Form.Group>
                </Col>
              </Row>
              <Row className='gx-3 mb-3'>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type='text' placeholder='Enter your country' {...register('country')} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control type='text' placeholder='Enter your pincode' {...register('pincode')} />
                  </Form.Group>
                </Col>
              </Row>
              <Button
                variant='primary'
                type='submit'
                style={{ color: colors.grey[100], backgroundColor: colors.blueAccent[600] }}
              >
                Add Admin
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default AddAdmin
