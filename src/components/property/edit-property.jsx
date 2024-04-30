/* eslint-disable react-hooks/exhaustive-deps */
'use client'

//  ** React Imports **
import React from 'react'

// ** API Imports **
import axios from 'axios'

// ** Third Party Imports **
import { useTheme, Button, useMediaQuery } from '@mui/material'
import { tokens } from '@theme/theme'
import { Card, Col, Row, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'

//** Styles */
import 'react-toastify/dist/ReactToastify.css'

//** Validations */
const schema = Yup.object().shape({
  name: Yup.string().required('First name is required'),
  rent: Yup.string().required('Rent is required'),
  address: Yup.string().required('Address is required'),
  is_verified: Yup.boolean().required('Verification status is required'),
  landmark: Yup.string().required('Landmark is required'),
  street: Yup.string().required('Street is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  longitude: Yup.string().required('Rent is required'),
  latitude: Yup.string().required('Rent is required')
})

const EditProperty = ({ property, onUpdate, handelEditbutton }) => {
  //** Vars */
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
    setValue('pincode', property.pin_code)
    setValue('latitude', property.latitude)
    setValue('longitude', property.longitude)
    setValue('description', property.description)
    setValue('latitude', property.latitude)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue])

  //** Edit Property on update */
  const onSubmit = async data => {
    try {
      const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/api/property/${property.u_id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })

      if (response.status === 201) {
        handelEditbutton()
        onUpdate()
        toast.success('Property updated successfully')
      }
    } catch (error) {
      toast.error('Error updating property')
    }
  }

  return (
    <>
      <Row style={{ width: isSmallScreen ? '100%' : '550px' }}>
        <Col xl={12}>
          <Card className='mb-4' style={{ backgroundColor: colors.primary[1100], color: colors.grey[100] }}>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)} control={control}>
                {' '}
                {/* Add control */}
                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='name'>Name</Form.Label>
                      <Form.Control
                        id='name'
                        data-testid='name'
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
                      <Form.Label htmlFor='rent'>Rent</Form.Label>
                      <Form.Control
                        id='rent'
                        data-testid='rent'
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
                      <Form.Label htmlFor='rent_type'>Rent-Type</Form.Label>
                      <Form.Control
                        id='rent_type'
                        data-testid='rent_type'
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
                      <Form.Label htmlFor='landmark'>Landmark</Form.Label>
                      <Form.Control
                        id='landmark'
                        data-testid='landmark'
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
                      <Form.Label htmlFor='location'>Location</Form.Label>
                      <Form.Control
                        id='location'
                        data-testid='location'
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
                      <Form.Label htmlFor='address'>Address</Form.Label>
                      <Form.Control
                        id='address'
                        data-testid='address'
                        type='text'
                        placeholder='Enter Address'
                        {...register('address')}
                        defaultValue={property?.address}
                      />
                      {errors.address && <span className='text-danger'>{errors.address.message}</span>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='street'>Street</Form.Label>
                      <Form.Control
                        id='street'
                        data-testid='street'
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
                      <Form.Label htmlFor='property_number'>Property Number</Form.Label>
                      <Form.Control
                        id='property_number'
                        data-testid='property_number'
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
                      <Form.Label htmlFor='city'>City</Form.Label>
                      <Form.Control
                        id='city'
                        data-testid='city'
                        type='text'
                        defaultValue={property?.city}
                        placeholder='Enter your city'
                        {...register('city')}
                      />
                      {errors.city && <span className='text-danger'>{errors.city.message}</span>}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='district'>District</Form.Label>
                      <Form.Control
                        id='district'
                        data-testid='district'
                        type='text'
                        defaultValue={property?.district}
                        placeholder='Enter your district'
                        {...register('district')}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='state'>State</Form.Label>
                      <Form.Control
                        id='state'
                        data-testid='state'
                        type='text'
                        defaultValue={property?.state}
                        placeholder='Enter your state'
                        {...register('state')}
                      />
                      {errors.state && <span className='text-danger'>{errors.state.message}</span>}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='country'>Country</Form.Label>
                      <Form.Control
                        id='country'
                        data-testid='country'
                        type='text'
                        defaultValue={property?.country}
                        placeholder='Enter your country'
                        {...register('country')}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label htmlFor='pin_code'>Pincode</Form.Label>
                      <Form.Control
                        id='pin_code'
                        data-testid='pin_code'
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
                      <Form.Label htmlFor='latitude'>Latitude</Form.Label>
                      <Form.Control
                        id='latitude'
                        data-testid='latitude'
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
                      <Form.Label htmlFor='longitude'>Longitude</Form.Label>
                      <Form.Control
                        id='longitude'
                        data-testid='longitude'
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
                          data-testid='verified'
                          {...register('is_verified', { required: true })}
                          value={true}
                          defaultChecked={property?.is_verified === true && true}
                        />
                        <Form.Check
                          inline
                          label='Not Verified'
                          type='radio'
                          id='not_verified'
                          data-testid='not_verified'
                          {...register('is_verified', { required: true })}
                          value={false}
                          defaultChecked={property?.is_verified === false && true}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Button
                  aria-label='Save changes'
                  type='submit'
                  data-testid='save-changes'
                  style={{ color: colors.grey[100], backgroundColor: colors.blueAccent[600] }}
                  className='ms-2 mb-3 fs-6 h-fit'
                >
                  Save changes
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ToastContainer draggable closeOnClick={true} position='top-right' autoClose={3000} />
    </>
  )
}

export default EditProperty
