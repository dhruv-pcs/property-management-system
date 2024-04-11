import { useTheme, useMediaQuery } from '@mui/material'
import { tokens } from '@theme/theme'
import { Card, Col, Row, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
  aadhar_card_no: Yup.string().required('Aadhar Card No is required'),
  address: Yup.string().required('Address is required'),
  gst_no: Yup.string().required('GST No is required'),
  landmark: Yup.string().required('Landmark is required'),
  street: Yup.string().required('Street is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  pincode: Yup.string().required('Pincode is required'),
  country: Yup.string().required('Country is required'),
  status: Yup.boolean().required('Admin status is required'),
  is_verified: Yup.boolean().required('Verification status is required')
})

const EditOwner = ({ owner, onUpdate, handelEditbutton }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

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
    setValue('first_name', owner.first_name)
    setValue('last_name', owner.last_name)
    setValue('email', owner.email)
    setValue('phone', owner.phone)
    setValue('alternate_phone', owner.alternate_phone)
    setValue('city', owner.city)
    setValue('country', owner.country)
    setValue('pincode', owner.pincode)
    setValue('state', owner.state)
    setValue('aadhar_card_no', owner.aadhar_card_no)
    setValue('address', owner.address)
    setValue('gst_no', owner.gst_no)
    setValue('landmark', owner.landmark)
    setValue('street', owner.street)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue])

  const onSubmit = async data => {
    try {
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/update/${owner.u_id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (response.status === 201) {
        handelEditbutton()
        onUpdate()
        toast.success('Owner updated successfully')
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log('error', error)
    }
  }

  return (
    <>
      <Row style={{ width: isSmallScreen ? '100%' : '550px' }}>
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
                        defaultValue={owner?.first_name}
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
                          {...register('status', { required: true })}
                          value={true}
                          defaultChecked={owner?.status === true && true}
                        />
                        <Form.Check
                          inline
                          label='Inactive'
                          type='radio'
                          id='inactive'
                          {...register('status', { required: true })}
                          value={false}
                          defaultChecked={owner?.status === false && true}
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
                          {...register('is_verified', { required: true })}
                          value={true}
                          defaultChecked={owner?.is_verified === true && true}
                        />
                        <Form.Check
                          inline
                          label='Not Verified'
                          type='radio'
                          id='not_verified'
                          {...register('is_verified', { required: true })}
                          value={false}
                          defaultChecked={owner?.is_verified === false && true}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <Button type='submit' style={{ backgroundColor: colors.blueAccent[600] }} className='ms-2 mb-3 h-fit'>
                  Save changes
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </>
  )
}

export default EditOwner
