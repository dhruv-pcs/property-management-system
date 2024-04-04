import { FormControl, FormControlLabel, Radio, RadioGroup, useTheme } from '@mui/material'
import { tokens } from '@theme/theme'
import { Card, Col, Row, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useEffect } from 'react'

const schema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email().required('Email is required'),
  phone: Yup.number()
    .required('Phone number is required')
    .test('len', 'Phone number must be exactly 10 digits', val => val && val.toString().length === 10),
  alternate_phone: Yup.number()
    .required('Phone number is required')
    .test('len', 'Phone number must be exactly 10 digits', val => val && val.toString().length === 10),
  aadhar_card_no: Yup.number().required('Aadhar Card No is required'),
  address: Yup.string().required('Address is required'),
  gst_no: Yup.string().required('GST No is required'),
  landmark: Yup.string().required('Landmark is required'),
  street: Yup.string().required('Street is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  pincode: Yup.string().required('Pincode is required'),
  country: Yup.string().required('Country is required'),
  status: Yup.boolean().required('Admin status is required'),
  is_verified: Yup.boolean().required('Verification status is required'),
  
})

const EditCustomer = ({ customer, onUpdate }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const editable = true

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
  }, [
    customer.aadhar_card_no,
    customer.address,
    customer.alternate_phone,
    customer.city,
    customer.country,
    customer.email,
    customer.first_name,
    customer.gst_no,
    customer.landmark,
    customer.last_name,
    customer.phone,
    customer.pincode,
    customer.state,
    customer.street,
    setValue
  ])

  const onSubmit = async data => {
    console.log('data', data);
    try {
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/customer/${customer.u_id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (response.data.statusCode === 200) {
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
              <Row className='gx-3 mb-3'>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter your first name'
                      {...register('first_name')}
                      defaultValue={customer?.first_name}
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
                      defaultValue={customer?.last_name}
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
                      defaultValue={customer?.email}
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
                      defaultValue={customer?.gst_no}
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
                      defaultValue={customer?.phone ? Number(customer.phone) : ''}
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
                      defaultValue={customer?.alternate_phone}
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
                      readOnly={!editable}
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
                      defaultValue={customer?.country}
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
                      defaultValue={customer?.pincode}
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
                      defaultValue={customer?.aadhar_card_no}
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
                      defaultValue={customer?.address}
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
                      defaultValue={customer?.landmark}
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
                      defaultValue={customer?.street}
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
                        defaultValue={customer?.status === true ? 'active' : 'not_active'}
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
                        defaultValue={customer?.is_verified === true ? 'verified' : 'not_verified'}
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

            
                  <Button type="submit"  style={{ backgroundColor: colors.blueAccent[600] }} className='ms-2 mb-3 h-fit' >
                    Save changes
                  </Button>
              
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default EditCustomer