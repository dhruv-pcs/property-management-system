// import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTheme, Button } from '@mui/material'
import { tokens } from '@theme/theme'
import { Card, Col, Row, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
 
const schema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  email: Yup.string().email().required('Email is required'),
  password: Yup.string().matches(
    /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/,
    'Password must be at least 6 characters long and contain at least one uppercase letter, one special character, one digit, and one lowercase letter'
  ),  
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  alternate_phone: Yup.string(),
  status: Yup.boolean().required('Admin status is required'),
  aadhar_card_no: Yup.string().required('Aadhar Card No is required'),
  address: Yup.string().required('Address is required'),
  gst_no: Yup.string().required('GST No is required'),
  is_verified: Yup.boolean().required('Verification status is required'),
  landmark: Yup.string().required('Landmark is required'),
  street: Yup.string().required('Street is required')
})
  
const EditProperty = ({ property }) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const editable = false
 
  const {
    register,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(schema)
  })
  console.log('property', property)

  
  return (  
    <Row>
      <Col xl={12}>
        <Card className='mb-4' style={{ backgroundColor: colors.primary[1100], color: colors.grey[100] }}>
          <Card.Body>
            <Form control={control}>
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
                      readOnly={!editable}
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
                      readOnly={!editable}
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
                      readOnly={!editable}
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
                      readOnly={!editable}
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
                      readOnly={!editable}
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
                      readOnly={!editable}
                      defaultValue={property?.address}
                    />
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
                      readOnly={!editable}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className='gx-3 mb-3'>
                <Col md={4}>
                  <Form.Group className='mb-1'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type='text'
                      defaultValue={property?.city}
                      placeholder='Enter your city'
                      {...register('city')}
                      readOnly={!editable}
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group className='mb-1'>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type='text'
                      defaultValue={property?.state}
                      placeholder='Enter your state'
                      {...register('state')}
                      readOnly={!editable}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type='text'
                      defaultValue={property?.country}
                      placeholder='Enter your country'
                      {...register('country')}
                      readOnly={!editable}
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
                      readOnly={!editable}
                    />
                    {errors.property_number && <span className='text-danger'>{errors.property_number.message}</span>}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Currency</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Currency'
                      {...register('currency')}
                      defaultValue={property?.currency}
                      readOnly={!editable}
                    />
                    {errors.currency && <span className='text-danger'>{errors.currency.message}</span>}
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
