// import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FormControl, FormControlLabel, Radio, RadioGroup, useTheme } from '@mui/material'
import { tokens } from '@theme/theme'
import { Card, Col, Row, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  address: Yup.string().required('Address is required'),
  landmark: Yup.string().required('Landmark is required'),
  street: Yup.string().required('Street is required')
})

const AddProperty = ({ owner }) => {
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
  console.log('owner', owner)

  return (
    <Row>
      <Col xl={18}>
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
                      defaultValue={owner?.name}
                      readOnly={!editable}
                    />
                    {errors.name && <span className='text-danger'>{errors.name.message}</span>}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Rent</Form.Label>
                    <Form.Control
                      type='tel'
                      placeholder='Enter Rent'
                      {...register('rent')}
                      defaultValue={owner?.rent}
                      readOnly={!editable}
                    />
                    {errors.rent && <span className='text-danger'>{errors.rent.message}</span>}
                  </Form.Group>
                </Col>
              </Row>
              <Row className='gx-3 mb-3'>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Rent-Type</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder=' Rent type'
                      {...register('email')}
                      defaultValue={owner?.rent_type}
                      readOnly={!editable}
                    />
                    {errors.rent_type && <span className='text-danger'>{errors.rent_type.message}</span>}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Landmark</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter Landmark'
                      {...register('gst_no')}
                      defaultValue={owner?.landmark}
                      readOnly={!editable}
                    />
                    {errors.landmark && <span className='text-danger'>{errors.landmark.message}</span>}
                  </Form.Group>
                </Col>
              </Row>
              <Row className='gx-3 mb-3'>
                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type='tel'
                      placeholder='Enter Location'
                      {...register('phone')}
                      readOnly={!editable}
                      defaultValue={owner?.location ? Number(owner.location) : ''}
                    />
                    {errors.location && <span className='text-danger'>{errors.location.message}</span>}
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className='mb-1'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type='tel'
                      placeholder='Enter Address'
                      {...register('address')}
                      readOnly={!editable}
                      defaultValue={owner?.address}
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
                      readOnly={!editable}
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
                      defaultValue={owner?.country}
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
                      defaultValue={owner?.pincode}
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
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control
                      type='text'
                      defaultValue={owner?.pincode}
                      placeholder='Enter your pincode'
                      {...register('pincode')}
                      readOnly={!editable}
                    />
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
                      defaultValue={owner?.landmark}
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
                      defaultValue={owner?.street}
                      readOnly={!editable}
                    />
                    {errors.street && <span className='text-danger'>{errors.street.message}</span>}
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default AddProperty
