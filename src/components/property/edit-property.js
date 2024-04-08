// import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme, Button } from '@mui/material'
import { tokens } from '@theme/theme'
import { Card, Col, Row, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import * as Yup from 'yup'
import axios from 'axios'

const schema = Yup.object().shape({
  name: Yup.string().required('First name is required'),
  rent: Yup.string().required('Rent is required'),
  address: Yup.string().required('Address is required'),
  is_verified: Yup.boolean().required('Verification status is required'),
  landmark: Yup.string().required('Landmark is required'),
  street: Yup.string().required('Street is required'),
  longitude: Yup.string().required('Rent is required'),
  latitude: Yup.string().required('Rent is required')
})

const EditProperty = ({ property, onUpdate, handelEditbutton }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue
  } = useForm({
    resolver: yupResolver(schema)
  })
  console.log('property', property)

  useEffect(() => {
    setValue('name', property.name)
    setValue('rent', property.rent)
    setValue('rent_type', property.rent_type)
    setValue('currency', property.currency)
    setValue('landmark', property.landmark)
    setValue('location', property.location)
    setValue('address', property.address)
    setValue('street', property.street)
    setValue('state', property.state)
    setValue('property_number', property.property_number)
    setValue('city', property.city)
    setValue('district', property.district)
    setValue('pincode', property.pincode)
    setValue('latitude', property.latitude)
    setValue('longitude', property.longitude)
    setValue('description', property.description)
    setValue('is_verified', property.is_verified)
    setValue('latitude', property.latitude)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue])

  const onSubmit = async data => {
    try {
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/property/${property.u_id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (response.status === 201) {
        handelEditbutton()
        onUpdate()
      }
      console.log('response', response.data)
    } catch (error) {
      console.log('error', error.response ? error.response.data : error)
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
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter your Name'
                      {...register('name')}
                      defaultValue={property?.name}
                    />
                    {errors.name && <span className='text-danger'>{errors.name.message}</span>}
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Rent</Form.Label>
                    <Form.Control
                      type='tel'
                      placeholder='Enter Rent'
                      {...register('rent')}
                      defaultValue={property?.rent}
                    />
                    {errors.rent && <span className='text-danger'>{errors.rent.message}</span>}
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Rent-Type</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder=' Rent type'
                      {...register('rent_type')}
                      defaultValue={property?.rent_type}
                    />
                    {errors.rent_type && <span className='text-danger'>{errors.rent_type.message}</span>}
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
                      defaultValue={property?.landmark}
                    />
                    {errors.landmark && <span className='text-danger'>{errors.landmark.message}</span>}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Location'
                      {...register('location')}
                      defaultValue={property?.location}
                    />
                    {errors.location && <span className='text-danger'>{errors.location.message}</span>}
                  </Form.Group>
                </Col>
              </Row>
              <Row className='gx-3 mb-3'>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Address'
                      {...register('address')}
                      defaultValue={property?.address}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                      type='text'
                      defaultValue={property?.street}
                      placeholder='Enter your street'
                      {...register('street')}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className='gx-3 mb-3'>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Property Number</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Landmark'
                      {...register('property_number')}
                      defaultValue={property?.property_number}
                    />
                    {errors.property_number && <span className='text-danger'>{errors.property_number.message}</span>}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type='text'
                      defaultValue={property?.city}
                      placeholder='Enter your city'
                      {...register('city')}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className='gx-3 mb-3'>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>District</Form.Label>
                    <Form.Control
                      type='text'
                      defaultValue={property?.district}
                      placeholder='Enter your district'
                      {...register('district')}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type='text'
                      defaultValue={property?.state}
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
                      defaultValue={property?.country}
                      placeholder='Enter your country'
                      {...register('country')}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control
                      type='tel'
                      placeholder='Enter Pincode'
                      {...register('pin_code')}
                      defaultValue={property?.pin_code}
                    />
                    {errors.pin_code && <span className='text-danger'>{errors.pin_code.message}</span>}
                  </Form.Group>
                </Col>
              </Row>
              <Row className='gx-3 mb-3'>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Latitue</Form.Label>
                    <Form.Control
                      type='tel'
                      placeholder='Enter Latitude'
                      {...register('latitude')}
                      defaultValue={property?.latitude}
                    />
                    {errors.latitude && <span className='text-danger'>{errors.latitude.message}</span>}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control
                      type='tel'
                      placeholder='Enter Longitude'
                      {...register('longitude')}
                      defaultValue={property?.longitude}
                    />
                    {errors.longitude && <span className='text-danger'>{errors.longitude.message}</span>}
                  </Form.Group>
                </Col>
              </Row>
              <Row className='gx-3 mb-3'>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Is Property Verified??</Form.Label>
                    <div>
                      <Form.Check
                        inline
                        label='Verified'
                        type='radio'
                        id='verified'
                        {...register('is_verified', { required: true })}
                        value={true}
                        defaultChecked={property?.is_verified === true && true}
                      />
                      <Form.Check
                        inline
                        label='Not Verified'
                        type='radio'
                        id='not_verified'
                        {...register('is_verified', { required: true })}
                        value={false}
                        defaultChecked={property?.is_verified === false && true}
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
  )
}

export default EditProperty
