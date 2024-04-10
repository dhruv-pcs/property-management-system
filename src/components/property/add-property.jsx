import { useTheme, useMediaQuery } from '@mui/material'
import { tokens } from '@theme/theme'
import { Card, Col, Row, Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
  available_from: Yup.date().required('Available from is required'),
  bhk: Yup.string().required('BHK is required'),
  city: Yup.string().required('City is required'),
  country: Yup.string().required('Country is required'),
  description: Yup.string().required('Description is required'),
  district: Yup.string().required('District is required'),
  landmark: Yup.string().required('Landmark is required'),
  latitude: Yup.string().required('Latitude is required'),
  longitude: Yup.string().required('Longitude is required'),
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
  ready_to_move: Yup.boolean().required('This field is required'),
  district: Yup.string().required('District is required')
})

const AddProperty = ({ onUpdate, handelAddbutton }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async data => {
    data.pin_code = Number(data.pin_code)
    data.no_of_balconies = Number(data.no_of_balconies)
    data.no_of_bathrooms = Number(data.no_of_bathrooms)
    data.no_of_bedrooms = Number(data.no_of_bedrooms)
    data.no_of_rooms = Number(data.no_of_rooms)
    data.no_of_kitchen = Number(data.no_of_kitchen)
    data.property_age = Number(data.property_age)
    data.currency = '₹'

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/property`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (response.data.statusCode === 201) {
        onUpdate()
        handelAddbutton()
        toast.success('Property added successfully')
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log('error', error)
    }
  }

  return (
    <>
      <Row style={{ width: isSmallScreen ? '100%' : '550px' }}>
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
                      <Form.Label>Available From</Form.Label>
                      <Form.Control type='date' placeholder='Select Date' {...register('available_from')} />
                      {errors.available_from && <span className='text-danger'>{errors.available_from.message}</span>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Rent-Type</Form.Label>
                      <Form.Control type='text' placeholder=' Rent type' {...register('rent_type')} />
                      {errors.rent_type && <span className='text-danger'>{errors.rent_type.message}</span>}
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
                      <Form.Label>Landmark</Form.Label>
                      <Form.Control type='text' placeholder='Enter Landmark' {...register('landmark')} />
                      {errors.landmark && <span className='text-danger'>{errors.landmark.message}</span>}
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
                      <Form.Control
                        type='tel'
                        placeholder='Enter Number of Bathrooms'
                        {...register('no_of_bathrooms')}
                      />
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
                      <Form.Label>No. of Rooms</Form.Label>
                      <Form.Control type='tel' placeholder=' Number of Rooms' {...register('no_of_rooms')} />
                      {errors.no_of_rooms && <span className='text-danger'>{errors.no_of_rooms.message}</span>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>No. of Kitchen</Form.Label>
                      <Form.Control type='tel' placeholder=' Number of Kitchen' {...register('no_of_kitchen')} />
                      {errors.no_of_kitchen && <span className='text-danger'>{errors.no_of_kitchen.message}</span>}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>No. of Balconies</Form.Label>
                      <Form.Control type='tel' placeholder=' Number of Balconies' {...register('no_of_balconies')} />
                      {errors.no_of_balconies && <span className='text-danger'>{errors.no_of_balconies.message}</span>}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
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
                        <Form.Check
                          type='radio'
                          defaultChecked
                          label='False'
                          value='false'
                          {...register('ready_to_move')}
                        />
                      </div>
                      {errors.ready_to_move && <span className='text-danger'>{errors.ready_to_move.message}</span>}
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
                      <Form.Control
                        type='tel'
                        placeholder='Enter Property Age in Years'
                        {...register('property_age')}
                      />
                      {errors.property_age && <span className='text-danger'>{errors.property_age.message}</span>}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='gx-3 mb-3'>
                  <Col md={6}>
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

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>District</Form.Label>
                      <Form.Control type='text' placeholder='Enter District' {...register('district')} />
                      {errors.district && <span className='text-danger'>{errors.district.message}</span>}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='gx-3 mb-3'>
                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Latitude</Form.Label>
                      <Form.Control type='text' placeholder='Latitude' {...register('latitude')} />
                      {errors.latitude && <span className='text-danger'>{errors.latitude.message}</span>}
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Longitude</Form.Label>
                      <Form.Control type='text' placeholder='Longitude' {...register('longitude')} />
                      {errors.longitude && <span className='text-danger'>{errors.longitude.message}</span>}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className='gx-3 mb-3'>
                  <Col md={12}>
                    <Form.Group className='mb-1'>
                      <Form.Label>Description</Form.Label>
                      <Form.Control as='textarea' placeholder='Enter Description' {...register('description')} />
                      {errors.description && <span className='text-danger'>{errors.description.message}</span>}
                    </Form.Group>
                  </Col>
                </Row>
                <Button
                  type='submit'
                  style={{ color: colors.grey[100], backgroundColor: colors.blueAccent[600] }}
                  className='ms-2 mb-3 w-100 h-fit'
                >
                  Add
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

export default AddProperty
