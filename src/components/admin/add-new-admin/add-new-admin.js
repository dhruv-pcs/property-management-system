import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { Button, Form, Row, Col, Container } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

const schema = Yup.object({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email('Must be a valid email').required('Email is required'),
  phone: Yup.number()
    .typeError('Phone must be a number')
    .positive('Phone number must be positive')
    .integer('Phone number cannot include a decimal point')
    .required('Phone is required'),
  password: Yup.string().required('Password is required'),
  alternate_phone: Yup.number()
    .typeError('Alternate Phone must be a number')
    .positive('Alternate Phone number must be positive')
    .integer('Alternate Phone number cannot include a decimal point')
    .nullable(true),

  city: Yup.string(),
  state: Yup.string(),
  country: Yup.string(),
  pincode: Yup.number()
    .typeError('Pincode must be a number')
    .positive('Pincode must be positive')
    .integer('Pincode cannot include a decimal point'),
  language: Yup.string()
})

const AddNewAdmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    try {
      const formdata = { ...data, role_u_id: 'ADM1000000002' }

      console.log('user', formdata)

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin`,

        formdata,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      )
      console.log(response.data)
    } catch (error) {
      console.error('There was an error!', error)
      if (error.response && error.response.data) {
        console.error('Error details:', error.response.data)
      }
    }
  }

  return (
    <Container className='mt-5'>
      <h2>New Admin</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6} className='mb-3'>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type='text'
                {...register('first_name', { required: 'First name is required' })}
                isInvalid={!!errors.first_name}
              />
              <Form.Control.Feedback type='invalid'>{errors.first_name?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6} className='mb-3'>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type='text'
                {...register('last_name', { required: 'Last name is required' })}
                isInvalid={!!errors.last_name}
              />
              <Form.Control.Feedback type='invalid'>{errors.last_name?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6} className='mb-3'>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                {...register('email', { required: 'Email is required' })}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type='invalid'>{errors.email?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6} className='mb-3'>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control type='tel' {...register('phone')} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6} className='mb-3'>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                {...register('password', { required: 'Password is required' })}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type='invalid'>{errors.password?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6} className='mb-3'>
            <Form.Group>
              <Form.Label>Alternate Phone</Form.Label>
              <Form.Control type='tel' {...register('alternate_phone')} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={3} className='mb-3'>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control type='text' {...register('city')} />
            </Form.Group>
          </Col>
          <Col md={3} className='mb-3'>
            <Form.Group>
              <Form.Label>State</Form.Label>
              <Form.Control type='text' {...register('state')} />
            </Form.Group>
          </Col>
          <Col md={3} className='mb-3'>
            <Form.Group>
              <Form.Label>Country</Form.Label>
              <Form.Control type='text' {...register('country')} />
            </Form.Group>
          </Col>
          <Col md={3} className='mb-3'>
            <Form.Group>
              <Form.Label>Pincode</Form.Label>
              <Form.Control type='tel' {...register('pincode')} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6} className='mb-3'>
            <Form.Group>
              <Form.Label>Language</Form.Label>
              <Form.Control type='text' {...register('language')} />
            </Form.Group>
          </Col>
        </Row>

        <div className='d-grid gap-2 d-md-flex justify-content-md-start'>
          <Button variant='primary' type='submit'>
            Submit
          </Button>
          <Button variant='secondary' href='/'>
            Go Back
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default AddNewAdmin
