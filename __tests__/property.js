import { fireEvent, render, screen, waitFor, act } from '@testing-library/react'
import Property from 'src/pages/property'
import React from 'react'
import '@testing-library/jest-dom'
import axios from 'axios'
import EditProperty from '@components/property/edit-property'
import AddProperty from '@components/property/add-property'
import { Provider } from 'react-redux'
import { store } from 'src/redux/store'

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest
    .fn()
    .mockReturnValueOnce(true) // Return true for the first call
    .mockReturnValueOnce(false)
}))

// Mocked permissions and owner data
const mockPermissions = [
  {
    module: {
      alias_name: 'Property'
    },
    view: true,
    update: true,
    remove: true,
    add: true
  }
]

const mockPropertyData = [
  {
    id: 1,
    name: 'Vista Apartment',
    rent: 1200,
    location: 'Downtown',
    address: '123 Main St',
    district: 'Central'
  }
]

// Mocking localStorage.getItem
Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockPermissions))

describe('Property Component', () => {
  beforeEach(async () => {
    localStorage.setItem('user', JSON.stringify(mockPermissions))
    axios.get = jest.fn().mockResolvedValue({ data: { data: { adminData: mockPropertyData } } })
    render(
      <Provider store={store}>
        <Property />
      </Provider>
    )
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled()
    })
  })

  test('Property List Rendering Test', async () => {
    const propertyList = await screen.findByTestId('property-list')
    expect(propertyList).toBeInTheDocument()
  })

  test('renders property list from API', async () => {
    await waitFor(() => {
      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('Rent')).toBeInTheDocument()
      expect(screen.getByText('Location')).toBeInTheDocument()
      expect(screen.getByText('Address')).toBeInTheDocument()
      expect(screen.getByText('District')).toBeInTheDocument()
      expect(screen.getByText('Action')).toBeInTheDocument()
    })
  })

  test('handles error when API request fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('API request failed'))

    render(
      <Provider store={store}>
        <Property />
      </Provider>
    )

    await waitFor(() => {
      expect(screen.getByText('Error Fetching Data')).toBeInTheDocument()
    })
  })

  test('clicking Edit button opens edit modal', async () => {
    const edit = screen.getByTestId('edit-property')
    expect(edit).toBeInTheDocument()
    fireEvent.click(edit)

    await waitFor(() => {
      expect(screen.getByTestId('edit-property-modal')).toBeInTheDocument()
      expect(screen.getByText('Edit Property')).toBeInTheDocument()
    })
  })

  test('clicking View button opens view modal', async () => {
    const view = screen.getByTestId('view-property')
    expect(view).toBeInTheDocument()
    fireEvent.click(view)

    await waitFor(() => {
      expect(screen.getByTestId('view-property-modal')).toBeInTheDocument()
      expect(screen.getByText('View Property')).toBeInTheDocument()
    })
  })

  test('clicking Delete button opens delete modal', async () => {
    const deleteProperty = screen.getByTestId('delete-property')
    expect(deleteProperty).toBeInTheDocument()
    fireEvent.click(deleteProperty)

    await waitFor(() => {
      expect(screen.getByTestId('delete-property-modal')).toBeInTheDocument()
      expect(screen.getByText('Delete Property')).toBeInTheDocument()
    })
  })

  test('clicking Add button opens add modal', async () => {
    const add = screen.getByTestId('add-property')
    expect(add).toBeInTheDocument()
    fireEvent.click(add)

    await waitFor(() => {
      expect(screen.getByTestId('add-property-modal')).toBeInTheDocument()
      expect(screen.getByText('Add Property')).toBeInTheDocument()
    })
  })

  test('clicking Delete button and then click confirm delete button to delete owner - Success', async () => {
    const mockResponseData = { data: { statusCode: 200 } }
    jest.spyOn(axios, 'delete').mockResolvedValue(mockResponseData)

    render(
      <Provider store={store}>
        <Property />
      </Provider>
    )

    const deleteProperty = screen.getByTestId('delete-property')
    fireEvent.click(deleteProperty)

    expect(screen.getByText('Delete Property')).toBeInTheDocument()

    const confirmDelete = screen.getByTestId('confirm-delete')
    fireEvent.click(confirmDelete)

    await waitFor(() => {
      expect(screen.queryByText('Delete property')).not.toBeInTheDocument()
      expect(screen.queryAllByText('Property deleted successfully!')[0]).toBeInTheDocument()
    })
  })

  test('handles error when deleting property', async () => {
    jest.spyOn(axios, 'delete').mockRejectedValueOnce(new Error('Delete request failed'))
    render(
      <Provider store={store}>
        <Property />
      </Provider>
    )
    const deleteProperty = screen.getByTestId('delete-property')
    fireEvent.click(deleteProperty)
    expect(screen.getByText('Delete Property')).toBeInTheDocument()
    const confirmDelete = screen.getByTestId('confirm-delete')
    fireEvent.click(confirmDelete)

    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    })
  })
})

describe('EditProperty Component', () => {
  const property = {
    name: 'Sunset Villa',
    rent: 1200,
    rent_type: 'monthly',
    landmark: 'Near Central Park',
    location: 'Westside',
    address: '1234 Sunset Blvd',
    street: 'Sunset Blvd',
    state: 'California',
    property_number: '1234',
    city: 'Los Angeles',
    district: 'Westside',
    pin_code: '90026',
    latitude: 34.0522,
    longitude: -118.2437,
    is_verified: true
  }

  test('renders property details with correct values', () => {
    const { getByLabelText, getByTestId } = render(<EditProperty property={property} />)

    expect(getByLabelText('Name')).toHaveValue(property.name)
    expect(getByLabelText('Rent')).toHaveValue(property.rent.toString())
    expect(getByLabelText('Rent-Type')).toHaveValue(property.rent_type)
    expect(getByLabelText('Landmark')).toHaveValue(property.landmark)
    expect(getByLabelText('Location')).toHaveValue(property.location)
    expect(getByLabelText('Address')).toHaveValue(property.address)
    expect(getByLabelText('Street')).toHaveValue(property.street)
    expect(getByLabelText('State')).toHaveValue(property.state)
    expect(getByLabelText('Property Number')).toHaveValue(property.property_number)
    expect(getByLabelText('City')).toHaveValue(property.city)
    expect(getByLabelText('District')).toHaveValue(property.district)
    expect(getByLabelText('PinCode')).toHaveValue(property.pin_code)
    expect(getByLabelText('Latitude')).toHaveValue(property.latitude.toString())
    expect(getByLabelText('Longitude')).toHaveValue(property.longitude.toString())
    expect(getByTestId('verified')).toBeChecked()
  })

  test('renders with property data with status and is_verified false', () => {
    const propertyData = {
      ...property,
      is_verified: false
    }
    const { getByLabelText, getByTestId } = render(<EditProperty property={propertyData} />)
    expect(getByLabelText('Name')).toHaveValue(property.name)
    expect(getByLabelText('Rent')).toHaveValue(property.rent.toString())
    expect(getByLabelText('Rent-Type')).toHaveValue(property.rent_type)
    expect(getByLabelText('Landmark')).toHaveValue(property.landmark)
    expect(getByLabelText('Location')).toHaveValue(property.location)
    expect(getByLabelText('Address')).toHaveValue(property.address)
    expect(getByLabelText('Street')).toHaveValue(property.street)
    expect(getByLabelText('State')).toHaveValue(property.state)
    expect(getByLabelText('Property Number')).toHaveValue(property.property_number)
    expect(getByLabelText('City')).toHaveValue(property.city)
    expect(getByLabelText('District')).toHaveValue(property.district)
    expect(getByLabelText('PinCode')).toHaveValue(property.pin_code)
    expect(getByLabelText('Latitude')).toHaveValue(property.latitude.toString())
    expect(getByLabelText('Longitude')).toHaveValue(property.longitude.toString())
    expect(getByTestId('not_verified')).toBeChecked()
  })

  test('Update Property With Empty Fields to Get Validation Error', async () => {
    const onUpdate = jest.fn()
    const handleEditButton = jest.fn()
    render(<EditProperty property={property} onUpdate={onUpdate} handleEditButton={handleEditButton} />)

    const name = screen.getByTestId('name')
    const rent = screen.getByTestId('rent')
    const address = screen.getByTestId('address')
    const landmark = screen.getByTestId('landmark')
    const state = screen.getByTestId('state')
    const city = screen.getByTestId('city')

    // Simulate clearing input fields
    fireEvent.change(name, { target: { value: '' } })
    fireEvent.change(rent, { target: { value: '' } })
    fireEvent.change(address, { target: { value: '' } })
    fireEvent.change(landmark, { target: { value: '' } })
    fireEvent.change(state, { target: { value: '' } })
    fireEvent.change(city, { target: { value: '' } })

    const saveButton = screen.getByTestId('save-changes')
    act(() => {
      fireEvent.click(saveButton)
    })

    // Assertions for validation messages
    await waitFor(() => {
      expect(screen.getByText('First name is required')).toBeInTheDocument()
      expect(screen.getByText('Rent is required')).toBeInTheDocument()
      expect(screen.getByText('Address is required')).toBeInTheDocument()
      expect(screen.getByText('Landmark is required')).toBeInTheDocument()
      expect(screen.getByText('State is required')).toBeInTheDocument()
      expect(screen.getByText('City is required')).toBeInTheDocument()
    })
  })

  test('successfully updates property upon form submission', async () => {
    const mockResponse = { status: 201 }
    axios.patch = jest.fn().mockResolvedValue(mockResponse)
    const onUpdate = jest.fn()
    const handelEditButton = jest.fn()

    render(<EditProperty property={property} onUpdate={onUpdate} handelEditButton={handelEditButton} />)

    const saveButton = screen.getByLabelText('Save changes')

    act(() => {
      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalled()
      expect(handelEditButton).toHaveBeenCalled()
      expect(screen.getByText('Property updated successfully')).toBeInTheDocument()
    })
  })

  test('handles error when updating owner', async () => {
    const mockError = new Error('Update request failed')
    axios.patch = jest.fn().mockRejectedValue(mockError)
    const onUpdate = jest.fn()
    const handelEditButton = jest.fn()

    render(<EditProperty property={property} onUpdate={onUpdate} handelEditButton={handelEditButton} />)

    const saveButton = screen.getByLabelText('Save changes')
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(onUpdate).not.toHaveBeenCalled()
      expect(handelEditButton).not.toHaveBeenCalled()
      expect(screen.getByText('Error updating property')).toBeInTheDocument()
    })
  })
})

describe('Property Add Component', () => {
  const property = {
    name: 'Sunset Villa',
    address: '123 Ocean St',
    available_from: '2022-04-01',
    bhk: '2BHK',
    city: 'Seaside',
    country: 'Wonderland',
    description: 'A beautiful seaside property.',
    district: 'Coastal District',
    location: 'Lighthouse',
    landmark: 'Near Lighthouse',
    latitude: '34.0201613',
    longitude: '-118.6919206',
    no_of_balconies: 2,
    no_of_bathrooms: 1,
    no_of_bedrooms: 2,
    no_of_kitchen: 1,
    no_of_rooms: 5,
    pin_code: '98765',
    property_age: 5,
    property_area: '1500 sq ft',
    property_number: 'SV101',
    property_type: 'Residential',
    rent: 2500,
    rent_type: 'Monthly',
    state: 'State',
    street: 'Beachside Lane',
    ready_to_move: true
  }

  test('renders with property data and handles submission', async () => {
    const mockResponse = { data: { statusCode: 201 } }
    axios.post = jest.fn().mockResolvedValue(mockResponse)
    const onUpdate = jest.fn()
    const handelAddButton = jest.fn()

    const { getByLabelText } = render(<AddProperty onUpdate={onUpdate} handelAddButton={handelAddButton} />)

    const name = getByLabelText('Name')
    const address = getByLabelText('Address')
    const available_from = getByLabelText('Available From')
    const bhk = getByLabelText('BHK')
    const city = getByLabelText('City')
    const country = getByLabelText('Country')
    const description = getByLabelText('Description')
    const district = getByLabelText('District')
    const location = getByLabelText('Location')
    const landmark = getByLabelText('Landmark')
    const latitude = getByLabelText('Latitude')
    const longitude = getByLabelText('Longitude')
    const no_of_balconies = getByLabelText('No. of Balconies')
    const no_of_bathrooms = getByLabelText('No. of Bathrooms')
    const no_of_bedrooms = getByLabelText('No. of Bedrooms')
    const no_of_kitchen = getByLabelText('No. of Kitchen')
    const no_of_rooms = getByLabelText('No. of Rooms')
    const pin_code = getByLabelText('PinCode')
    const property_age = getByLabelText('Property Age')
    const property_area = getByLabelText('Property Area')
    const property_number = getByLabelText('Property Number')
    const property_type = getByLabelText('Property Type')
    const rent = getByLabelText('Rent')
    const rent_type = getByLabelText('Rent-Type')
    const state = getByLabelText('State')
    const street = getByLabelText('Street')
    const ready_to_move = getByLabelText('Ready to Move')

    fireEvent.change(name, { target: { value: property.name } })
    fireEvent.change(address, { target: { value: property.address } })
    fireEvent.change(available_from, { target: { value: property.available_from } })
    fireEvent.change(bhk, { target: { value: property.bhk } })
    fireEvent.change(city, { target: { value: property.city } })
    fireEvent.change(country, { target: { value: property.country } })
    fireEvent.change(description, { target: { value: property.description } })
    fireEvent.change(district, { target: { value: property.district } })
    fireEvent.change(location, { target: { value: property.location } })
    fireEvent.change(landmark, { target: { value: property.landmark } })
    fireEvent.change(latitude, { target: { value: property.latitude } })
    fireEvent.change(longitude, { target: { value: property.longitude } })
    fireEvent.change(no_of_balconies, { target: { value: property.no_of_balconies } })
    fireEvent.change(no_of_bathrooms, { target: { value: property.no_of_bathrooms } })
    fireEvent.change(no_of_bedrooms, { target: { value: property.no_of_bedrooms } })
    fireEvent.change(no_of_kitchen, { target: { value: property.no_of_kitchen } })
    fireEvent.change(no_of_rooms, { target: { value: property.no_of_rooms } })
    fireEvent.change(pin_code, { target: { value: property.pin_code } })
    fireEvent.change(property_age, { target: { value: property.property_age } })
    fireEvent.change(property_area, { target: { value: property.property_area } })
    fireEvent.change(property_number, { target: { value: property.property_number } })
    fireEvent.change(property_type, { target: { value: property.property_type } })
    fireEvent.change(rent, { target: { value: property.rent } })
    fireEvent.change(rent_type, { target: { value: property.rent_type } })
    fireEvent.change(state, { target: { value: property.state } })
    fireEvent.change(street, { target: { value: property.street } })
    fireEvent.change(ready_to_move, { target: { value: property.ready_to_move } })

    const saveButton = screen.getByTestId('add-property-button')

    act(() => {
      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalled()
      expect(handelAddButton).toHaveBeenCalled()
      expect(screen.getByText('Property added successfully')).toBeInTheDocument()
    })
  })

  test('Add New Property With Empty Fields to get Validation Error', async () => {
    const mockResponse = { data: { statusCode: 201 } }
    axios.post = jest.fn().mockResolvedValue(mockResponse)

    const onUpdate = jest.fn()
    const handleAddButton = jest.fn()

    render(<AddProperty onUpdate={onUpdate} handleAddButton={handleAddButton} />)

    const saveButton = screen.getByTestId('add-property-button')
    fireEvent.click(saveButton)

    await waitFor(() => {
      const expectedErrors = [
        'Description is required',
        'Longitude is required',
        'Latitude is required',
        'Property area is required',
        'Property number is required',
        'Property type is required',
        'BHK is required',
        'Name is required',
        'Address is required',
        'Landmark is required',
        'Location is required',
        'Street is required',
        'Country is required',
        'City is required',
        'State is required',
        'Rent type is required',
        'rent must be a `number` type, but the final value was: `NaN` (cast from the value `""`).',
        'available_from must be a `date` type, but the final value was: `Invalid Date` (cast from the value `""`).',
        'pin_code must be a `number` type, but the final value was: `NaN` (cast from the value `""`).',
        'no_of_bathrooms must be a `number` type, but the final value was: `NaN` (cast from the value `""`).',
        'no_of_balconies must be a `number` type, but the final value was: `NaN` (cast from the value `""`).',
        'no_of_rooms must be a `number` type, but the final value was: `NaN` (cast from the value `""`).',
        'no_of_kitchen must be a `number` type, but the final value was: `NaN` (cast from the value `""`).',
        'no_of_bedrooms must be a `number` type, but the final value was: `NaN` (cast from the value `""`).',
        'property_age must be a `number` type, but the final value was: `NaN` (cast from the value `""`).'
      ]

      expectedErrors.forEach(error => {
        expect(screen.getByText(error)).toBeInTheDocument()
      })
    })
  })

  test('Add New Property', async () => {
    const mockError = new Error('Add request failed')
    axios.post = jest.fn().mockRejectedValue(mockError)
    const onUpdate = jest.fn()
    const handelAddButton = jest.fn()

    const { getByLabelText } = render(<AddProperty onUpdate={onUpdate} handelAddButton={handelAddButton} />)

    const name = getByLabelText('Name')
    const address = getByLabelText('Address')
    const available_from = getByLabelText('Available From')
    const bhk = getByLabelText('BHK')
    const city = getByLabelText('City')
    const country = getByLabelText('Country')
    const description = getByLabelText('Description')
    const district = getByLabelText('District')
    const landmark = getByLabelText('Landmark')
    const location = getByLabelText('Location')
    const latitude = getByLabelText('Latitude')
    const longitude = getByLabelText('Longitude')
    const no_of_balconies = getByLabelText('No. of Balconies')
    const no_of_bathrooms = getByLabelText('No. of Bathrooms')
    const no_of_bedrooms = getByLabelText('No. of Bedrooms')
    const no_of_kitchen = getByLabelText('No. of Kitchen')
    const no_of_rooms = getByLabelText('No. of Rooms')
    const pin_code = getByLabelText('PinCode')
    const property_age = getByLabelText('Property Age')
    const property_area = getByLabelText('Property Area')
    const property_number = getByLabelText('Property Number')
    const property_type = getByLabelText('Property Type')
    const rent = getByLabelText('Rent')
    const rent_type = getByLabelText('Rent-Type')
    const state = getByLabelText('State')
    const street = getByLabelText('Street')
    const ready_to_move = getByLabelText('Ready to Move')

    fireEvent.change(name, { target: { value: property.name } })
    fireEvent.change(address, { target: { value: property.address } })
    fireEvent.change(available_from, { target: { value: property.available_from } })
    fireEvent.change(bhk, { target: { value: property.bhk } })
    fireEvent.change(city, { target: { value: property.city } })
    fireEvent.change(country, { target: { value: property.country } })
    fireEvent.change(description, { target: { value: property.description } })
    fireEvent.change(district, { target: { value: property.district } })
    fireEvent.change(landmark, { target: { value: property.landmark } })
    fireEvent.change(location, { target: { value: property.location } })
    fireEvent.change(latitude, { target: { value: property.latitude } })
    fireEvent.change(longitude, { target: { value: property.longitude } })
    fireEvent.change(no_of_balconies, { target: { value: property.no_of_balconies } })
    fireEvent.change(no_of_bathrooms, { target: { value: property.no_of_bathrooms } })
    fireEvent.change(no_of_bedrooms, { target: { value: property.no_of_bedrooms } })
    fireEvent.change(no_of_kitchen, { target: { value: property.no_of_kitchen } })
    fireEvent.change(no_of_rooms, { target: { value: property.no_of_rooms } })
    fireEvent.change(pin_code, { target: { value: property.pin_code } })
    fireEvent.change(property_age, { target: { value: property.property_age } })
    fireEvent.change(property_area, { target: { value: property.property_area } })
    fireEvent.change(property_number, { target: { value: property.property_number } })
    fireEvent.change(property_type, { target: { value: property.property_type } })
    fireEvent.change(rent, { target: { value: property.rent } })
    fireEvent.change(rent_type, { target: { value: property.rent_type } })
    fireEvent.change(state, { target: { value: property.state } })
    fireEvent.change(street, { target: { value: property.street } })
    fireEvent.change(ready_to_move, { target: { value: property.ready_to_move } })

    const saveButton = screen.getByTestId('add-property-button')

    act(() => {
      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(onUpdate).not.toHaveBeenCalled()
      expect(handelAddButton).not.toHaveBeenCalled()
      expect(screen.getByText('Error adding property')).toBeInTheDocument()
    })
  })
})

// test('Add New Property With Empty Fields to get Validation Error', async () => {
//   const mockResponse = { data: { statusCode: 201 } }
//   axios.post = jest.fn().mockResolvedValue(mockResponse)
//   const onUpdate = jest.fn()
//   const handelAddButton = jest.fn()

//   const { getByLabelText } = render(<AddProperty onUpdate={onUpdate} handelAddButton={handelAddButton} />)

//   const name = getByLabelText('Name');
//   const address = getByLabelText('Address');
//   const available_from = getByLabelText('Available From');
//   const bhk = getByLabelText('BHK');
//   const city = getByLabelText('City');
//   const country = getByLabelText('Country');
//   const description = getByLabelText('Description');
//   const district = getByLabelText('District');
//   const location = getByLabelText('Location');
//   const landmark = getByLabelText('Landmark');
//   const latitude = getByLabelText('Latitude');
//   const longitude = getByLabelText('Longitude');
//   const no_of_balconies = getByLabelText('No. of Balconies');
//   const no_of_bathrooms = getByLabelText('No. of Bathrooms');
//   const no_of_bedrooms = getByLabelText('No. of Bedrooms');
//   const no_of_kitchen = getByLabelText('No. of Kitchen');
//   const no_of_rooms = getByLabelText('No. of Rooms');
//   const pin_code = getByLabelText('PinCode');
//   const property_age = getByLabelText('Property Age');
//   const property_area = getByLabelText('Property Area');
//   const property_number = getByLabelText('Property Number');
//   const property_type = getByLabelText('Property Type');
//   const rent = getByLabelText('Rent');
//   const rent_type = getByLabelText('Rent-Type');
//   const state = getByLabelText('State');
//   const street = getByLabelText('Street');
//   const ready_to_move = getByLabelText('Ready to Move');

//   fireEvent.change(name, { target: { value: '' } });
//   fireEvent.change(address, { target: { value: '' } });
//   fireEvent.change(available_from, { target: { value: '' } });
//   fireEvent.change(bhk, { target: { value: ''} });
//   fireEvent.change(city, { target: {value: '' } });
//   fireEvent.change(country, { target: { value: '' } });
//   fireEvent.change(description, { target: { value: ''} });
//   fireEvent.change(district, { target: { value: '' } });
//   fireEvent.change(location, { target: { value:''} });
//   fireEvent.change(landmark, { target: { value: ''} });
//   fireEvent.change(latitude, { target: { value: ''} });
//   fireEvent.change(longitude, { target: { value: '' } });
//   fireEvent.change(no_of_balconies, { target: { value: '' } });
//   fireEvent.change(no_of_bathrooms, { target: { value: ''} });
//   fireEvent.change(no_of_bedrooms, { target: { value: '' } });
//   fireEvent.change(no_of_kitchen, { target: { value: ''} });
//   fireEvent.change(no_of_rooms, { target: { value: '' } });
//   fireEvent.change(pin_code, { target: {value: '' } });
//   fireEvent.change(property_age, { target: { value: '' } });
//   fireEvent.change(property_area, { target: { value: ''} });
//   fireEvent.change(property_number, { target: { value: '' } });
//   fireEvent.change(property_type, { target: { value:'' } });
//   fireEvent.change(rent, { target: { value:  ''} });
//   fireEvent.change(rent_type, { target: { value:  '' } });
//   fireEvent.change(state, { target: { value: '' } });
//   fireEvent.change(street, { target: { value: '' } });
//   fireEvent.change(ready_to_move, { target: { value: '' } });

//   const saveButton = screen.getByTestId('add-property-button')

//     act(() => {
//       fireEvent.click(saveButton)
//     })

//     await waitFor(() => {
//       expect(screen.getByText('Name is required')).toBeInTheDocument();
//       expect(screen.getByText(/rent must be a `number` type, but the final value was: `NaN`/)).toBeInTheDocument();
//       expect(screen.getByText('Address is required')).toBeInTheDocument();
//       expect(screen.getByText('Landmark is required')).toBeInTheDocument();
//       expect(screen.getByText('State is required')).toBeInTheDocument();
//       expect(screen.getByText('City is required')).toBeInTheDocument();
//       expect(screen.getByText('BHK is required')).toBeInTheDocument();
//       expect(screen.getByText('Country is required')).toBeInTheDocument();
//       expect(screen.getByText('Description is required')).toBeInTheDocument();
//       expect(screen.getByText('District is required')).toBeInTheDocument();
//       expect(screen.getByText('Latitude is required')).toBeInTheDocument();
//       expect(screen.getByText('Longitude is required')).toBeInTheDocument();
//       expect(screen.getByText('Location is required')).toBeInTheDocument();
//       expect(screen.getByText('no_of_balconies must be a `number` type, but the final value was: `NaN` (cast from the value `""`).')).toBeInTheDocument();
//       expect(screen.getByText('no_of_bathrooms must be a `number` type, but the final value was: `NaN` (cast from the value `""`).')).toBeInTheDocument();
//       expect(screen.getByText('no_of_kitchen must be a `number` type, but the final value was: `NaN` (cast from the value `""`).')).toBeInTheDocument();
//       expect(screen.getByText('no_of_bedrooms must be a `number` type, but the final value was: `NaN` (cast from the value `""`).')).toBeInTheDocument();
//       expect(screen.getByText('no_of_rooms must be a `number` type, but the final value was: `NaN` (cast from the value `""`).')).toBeInTheDocument();
//       expect(screen.getByText('property_age must be a `number` type, but the final value was: `NaN` (cast from the value `""`).')).toBeInTheDocument();
//       expect(screen.getByText('Property area is required')).toBeInTheDocument();
//       expect(screen.getByText('Property number is required')).toBeInTheDocument();
//       expect(screen.getByText('Property type is required')).toBeInTheDocument();
//       expect(screen.getByText('State is required')).toBeInTheDocument();
//       expect(screen.getByText('Street is required')).toBeInTheDocument();
//       expect(screen.getByText('District is required')).toBeInTheDocument();
//       expect(screen.getByText('Rent type is required')).toBeInTheDocument();
//       expect(screen.getByText('available_from must be a `date` type, but the final value was: `Invalid Date` (cast from the value `""`).')).toBeInTheDocument();
//   })
// });
