// import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme } from '@mui/material'
import { tokens } from '@theme/theme'
import { Card, Col, Row, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import axios from 'axios'

const schema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email().required('Email is required'),
  phone: Yup.number()
    .required('Phone number is required')
    .test('len', 'Phone number must be exactly 10 digits', val => val && val.toString().length === 10),
  alternate_phone: Yup.number().test(
    'len',
    'Phone number must be exactly 10 digits',
    val => val && val.toString().length === 10
  ),
  aadhar_card_no: Yup.number()
    .required('Aadhar Card No is required')
    .test('len', 'Phone number must be exactly 12 digits', val => val && val.toString().length === 12),
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
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    data.pincode = parseInt(data.pincode)
    data.aadhar_card_no = parseInt(data.aadhar_card_no)
    data.phone = parseInt(data.phone)
    data.alternate_phone = parseInt(data.alternate_phone)

    console.log('data', data)

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/customer`, data, {
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

  return (
    <>
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
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control type='email' placeholder='Enter your email address' {...register('email')} />
                      {errors.email && <span className='text-danger'>{errors.email.message}</span>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>GST No</Form.Label>
                      <Form.Control type='text' placeholder='Enter GST No' {...register('gst_no')} />
                      {errors.gst_no && <span className='text-danger'>{errors.gst_no.message}</span>}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Phone number</Form.Label>
                      <Form.Control type='tel' placeholder='Enter your phone number' {...register('phone')} />
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
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>City</Form.Label>
                      <Form.Control type='text' placeholder='Enter your city' {...register('city')} />
                      {errors.city && <span className='text-danger'>{errors.city.message}</span>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>State</Form.Label>
                      <Form.Control type='text' placeholder='Enter your state' {...register('state')} />
                      {errors.state && <span className='text-danger'>{errors.state.message}</span>}
                    </Form.Group>
                  </Col>
                </Row>

                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Country</Form.Label>
                      <Form.Control type='text' placeholder='Enter your country' {...register('country')} />
                      {errors.country && <span className='text-danger'>{errors.country.message}</span>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Pincode</Form.Label>
                      <Form.Control type='text' placeholder='Enter your pincode' {...register('pincode')} />
                      {errors.pincode && <span className='text-danger'>{errors.pincode.message}</span>}
                    </Form.Group>
                  </Col>
                </Row>

                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Aadhar Card No</Form.Label>
                      <Form.Control type='text' placeholder='Enter Aadhar Card No' {...register('aadhar_card_no')} />
                      {errors.aadhar_card_no && <span className='text-danger'>{errors.aadhar_card_no.message}</span>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Address</Form.Label>
                      <Form.Control type='text' placeholder='Enter Address' {...register('address')} />
                      {errors.address && <span className='text-danger'>{errors.address.message}</span>}
                    </Form.Group>
                  </Col>
                </Row>

                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Landmark</Form.Label>
                      <Form.Control type='text' placeholder='Enter Landmark' {...register('landmark')} />
                      {errors.landmark && <span className='text-danger'>{errors.landmark.message}</span>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Street</Form.Label>
                      <Form.Control type='text' placeholder='Enter Street' {...register('street')} />
                      {errors.street && <span className='text-danger'>{errors.street.message}</span>}
                    </Form.Group>
                  </Col>
                </Row>

                <div className='d-flex '>
                  <Button
                    type='submit'
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
    </>
  )
}

export default AddCustomer
