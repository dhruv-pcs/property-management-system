import { useTheme } from '@mui/material'
import { tokens } from '@theme/theme'
import { Card, Col, Row, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import axios from 'axios'

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
  bhk: Yup.string().required('BHK is required'),
  city: Yup.string().required('City is required'),
  country: Yup.string().required('Country is required'),
  description: Yup.string().required('Description is required'),
  district: Yup.string().required('District is required'),
  landmark: Yup.string().required('Landmark is required'),
  latitude: Yup.number().required('Latitude is required'),
  longitude: Yup.number().required('Longitude is required'),
  no_of_balconies: Yup.number().required('Number of balconies is required'),
  no_of_bathrooms: Yup.number().required('Number of bathrooms is required'),
  no_of_bedrooms: Yup.number().required('Number of bedrooms is required'),
  no_of_kitchen: Yup.number().required('Number of kitchens is required'),
  no_of_rooms: Yup.number().required('Number of rooms is required'),
  pin_code: Yup.number().required('Pin code is required'),
  property_age: Yup.number().required('Property age is required'),
  property_area: Yup.string().required('Property area is required'),
  property_number: Yup.string().required('Property number is required'),
  property_type: Yup.string().required('Property type is required'),
  rent: Yup.number().required('Rent is required'),
  rent_type: Yup.string().required('Rent type is required'),
  state: Yup.string().required('State is required'),
  street: Yup.string().required('Street is required'),
  ready_to_move: Yup.boolean().required('This field is required')
})

const AddProperty = ({ onUpdate, handelAddbutton }) => {
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
    data.currency = '$'

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/property`, data, {
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
    <Row>
      <Col xl={18}>
        <Card className='mb-4' style={{ backgroundColor: colors.primary[1100], color: colors.grey[100] }}>
          <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)} control={control}>
              {' '}
              {/* Add control */}
              <Row className='gx-3 mb-3'>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter your Name' {...register('name')} />
                    {errors.name && <span className='text-danger'>{errors.name.message}</span>}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Rent</Form.Label>
                    <Form.Control type='tel' placeholder='Enter Rent' {...register('rent')} />
                    {errors.rent && <span className='text-danger'>{errors.rent.message}</span>}
                  </Form.Group>
                </Col>
              </Row>
              <Row className='gx-3 mb-3'>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Rent-Type</Form.Label>
                    <Form.Control type='text' placeholder=' Rent type' {...register('rent_type')} />
                    {errors.rent_type && <span className='text-danger'>{errors.rent_type.message}</span>}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Landmark</Form.Label>
                    <Form.Control type='text' placeholder='Enter Landmark' {...register('landmark')} />
                    {errors.landmark && <span className='text-danger'>{errors.landmark.message}</span>}
                  </Form.Group>
                </Col>
              </Row>
              <Row className='gx-3 mb-3'>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Location</Form.Label>
                    <Form.Control type='text' placeholder='Enter Location' {...register('location')} />
                    {errors.location && <span className='text-danger'>{errors.location.message}</span>}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type='text' placeholder='Enter Address' {...register('address')} />
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
                    <Form.Control type='text' placeholder='Enter your pincode' {...register('pin_code')} />
                  </Form.Group>
                </Col>
              </Row>
              <Row className='gx-3 mb-3'>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Street</Form.Label>
                    <Form.Control type='text' placeholder='Enter Street' {...register('street')} />
                    {errors.street && <span className='text-danger'>{errors.street.message}</span>}
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as='textarea' placeholder='Enter Description' {...register('description')} />
                    {errors.description && <span className='text-danger'>{errors.description.message}</span>}
                  </Form.Group>
                </Col>
              </Row>
              <Row className='gx-3 mb-3'>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Property Type</Form.Label>
                    <Form.Control type='text' placeholder='Enter Property Type' {...register('property_type')} />
                    {errors.property_type && <span className='text-danger'>{errors.property_type.message}</span>}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>BHK</Form.Label>
                    <Form.Control type='text' placeholder='Enter BHK' {...register('bhk')} />
                    {errors.bhk && <span className='text-danger'>{errors.bhk.message}</span>}
                  </Form.Group>
                </Col>
              </Row>
              <Row className='gx-3 mb-3'>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>No. of Bathrooms</Form.Label>
                    <Form.Control type='tel' placeholder='Enter Number of Bathrooms' {...register('no_of_bathrooms')} />
                    {errors.no_of_bathrooms && <span className='text-danger'>{errors.no_of_bathrooms.message}</span>}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>No. of Bedrooms</Form.Label>
                    <Form.Control type='tel' placeholder='Enter Number of Bedrooms' {...register('no_of_bedrooms')} />
                    {errors.no_of_bedrooms && <span className='text-danger'>{errors.no_of_bedrooms.message}</span>}
                  </Form.Group>
                </Col>
              </Row>
              <Row className='gx-3 mb-3'>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control type='tel' step='any' placeholder='Latitude' {...register('latitude')} />
                    {errors.latitude && <span className='text-danger'>{errors.latitude.message}</span>}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control type='tel' step='any' placeholder='Longitude' {...register('longitude')} />
                    {errors.longitude && <span className='text-danger'>{errors.longitude.message}</span>}
                  </Form.Group>
                </Col>
              </Row>
              <Row className='gx-3 mb-3'>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Property Number</Form.Label>
                    <Form.Control type='text' placeholder='Enter Property Number' {...register('property_number')} />
                    {errors.property_number && <span className='text-danger'>{errors.property_number.message}</span>}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Property Age</Form.Label>
                    <Form.Control type='tel' placeholder='Enter Property Age in Years' {...register('property_age')} />
                    {errors.property_age && <span className='text-danger'>{errors.property_age.message}</span>}
                  </Form.Group>
                </Col>
              </Row>
              <Row className='gx-3 mb-3'>
                <Col md={12}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Property Area</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Property Area (e.g., 5000 sq. ft.)'
                      {...register('property_area')}
                    />
                    {errors.property_area && <span className='text-danger'>{errors.property_area.message}</span>}
                  </Form.Group>
                </Col>
              </Row>
              <Row className='gx-3 mb-3'>
                <Col md={12}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Available From</Form.Label>
                    <Form.Control type='date' placeholder='Select Date' {...register('available_from')} />
                    {errors.available_from && <span className='text-danger'>{errors.available_from.message}</span>}
                  </Form.Group>
                </Col>
              </Row>
              <Row className='gx-3 mb-3'>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>Ready to Move</Form.Label>
                    <div className='d-flex align-items-center'>
                      <Form.Check
                        type='radio'
                        label='True'
                        value='true'
                        {...register('ready_to_move')}
                        className='me-2'
                      />
                      <Form.Check type='radio' label='False' value='false' {...register('ready_to_move')} />
                    </div>
                    {errors.ready_to_move && <span className='text-danger'>{errors.ready_to_move.message}</span>}
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
  )
}

export default AddProperty
