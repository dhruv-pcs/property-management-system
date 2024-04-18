import {fireEvent, render, screen, waitFor, act } from '@testing-library/react'
import Property from 'src/pages/property'
import React from 'react'
import '@testing-library/jest-dom'
import axios from 'axios'
import EditProperty from '@components/property/edit-property'
import AddProperty from '@components/property/add-property'

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
        name: "Vista Apartment",
        rent: 1200,
        location: "Downtown",
        address: "123 Main St",
        district: "Central",
      },
]

// Mocking localStorage.getItem
Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockPermissions))

describe('Property Component', () => {
  beforeEach(async () => {
    localStorage.setItem('user', JSON.stringify(mockPermissions))
    axios.get = jest.fn().mockResolvedValue({ data: { data: { adminData: mockPropertyData } } })
    render(<Property />)
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

    render(<Property />)

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

    render(<Property />)

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
    render(<Property />)
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
    };

    test('renders property details with correct values', () => {
      const { getByLabelText, getByTestId } =  render(<EditProperty property={property} />);
    
      
  expect(getByLabelText('Name')).toHaveValue(property.name)
  expect(getByLabelText('Rent')).toHaveValue(property.rent.toString());
  expect(getByLabelText('Rent-Type')).toHaveValue(property.rent_type);
  expect(getByLabelText('Landmark')).toHaveValue(property.landmark);
  expect(getByLabelText('Location')).toHaveValue(property.location);
  expect(getByLabelText('Address')).toHaveValue(property.address);
  expect(getByLabelText('Street')).toHaveValue(property.street);
  expect(getByLabelText('State')).toHaveValue(property.state);
  expect(getByLabelText('Property Number')).toHaveValue(property.property_number);
  expect(getByLabelText('City')).toHaveValue(property.city);
  expect(getByLabelText('District')).toHaveValue(property.district);
  expect(getByLabelText('Pincode')).toHaveValue(property.pin_code);
  expect(getByLabelText('Latitude')).toHaveValue(property.latitude.toString());
  expect(getByLabelText('Longitude')).toHaveValue(property.longitude.toString());
  expect(getByTestId('verified')).toBeChecked();
     
    });

    test('renders with property data with status and is_verified false', () => {
      const propertyData = {
        ...property,
        is_verified: false
      }
      const { getByLabelText, getByTestId } = render(<EditProperty property={propertyData} />)
      expect(getByLabelText('Name')).toHaveValue(property.name)
  expect(getByLabelText('Rent')).toHaveValue(property.rent.toString());
  expect(getByLabelText('Rent-Type')).toHaveValue(property.rent_type);
  expect(getByLabelText('Landmark')).toHaveValue(property.landmark);
  expect(getByLabelText('Location')).toHaveValue(property.location);
  expect(getByLabelText('Address')).toHaveValue(property.address);
  expect(getByLabelText('Street')).toHaveValue(property.street);
  expect(getByLabelText('State')).toHaveValue(property.state);
  expect(getByLabelText('Property Number')).toHaveValue(property.property_number);
  expect(getByLabelText('City')).toHaveValue(property.city);
  expect(getByLabelText('District')).toHaveValue(property.district);
  expect(getByLabelText('Pincode')).toHaveValue(property.pin_code);
  expect(getByLabelText('Latitude')).toHaveValue(property.latitude.toString());
  expect(getByLabelText('Longitude')).toHaveValue(property.longitude.toString());
  expect(getByTestId('not_verified')).toBeChecked();
})

test('Update Property With Empty Fields to Get Validation Error', async () => {
  const onUpdate = jest.fn();
  const handleEditButton = jest.fn();
  render(<EditProperty property={property} onUpdate={onUpdate} handleEditButton={handleEditButton} />);

  const name = screen.getByTestId('name');
  const rent = screen.getByTestId('rent');
  const address = screen.getByTestId('address');
  const landmark = screen.getByTestId('landmark');
  const state = screen.getByTestId('state');
  const city = screen.getByTestId('city');
 

  // Simulate clearing input fields
  fireEvent.change(name, { target: { value: '' } });
  fireEvent.change(rent, { target: { value: '' } });
  fireEvent.change(address, { target: { value: '' } });
  fireEvent.change(landmark, { target: { value: '' } });
  fireEvent.change(state, { target: { value: '' } });
  fireEvent.change(city, { target: { value: '' } });
  

  const saveButton = screen.getByTestId('save-changes');
  act(() => {
    fireEvent.click(saveButton);
  });

  // Assertions for validation messages
  await waitFor(() => {
    expect(screen.getByText('First name is required')).toBeInTheDocument();
    expect(screen.getByText('Rent is required')).toBeInTheDocument();
    expect(screen.getByText('Address is required')).toBeInTheDocument();
    expect(screen.getByText('Landmark is required')).toBeInTheDocument();
    expect(screen.getByText('State is required')).toBeInTheDocument();
    expect(screen.getByText('City is required')).toBeInTheDocument();
  });
});

test('successfully updates property upon form submission', async () => {
  const mockResponse = { status: 201 }
  axios.patch = jest.fn().mockResolvedValue(mockResponse)
  const onUpdate = jest.fn()
  const handelEditbutton = jest.fn()

  render(<EditProperty property={property} onUpdate={onUpdate} handelEditbutton={handelEditbutton} />)

  const saveButton = screen.getByLabelText('Save changes')

  act(() => {
    fireEvent.click(saveButton)
  })

  await waitFor(() => {
    expect(onUpdate).toHaveBeenCalled()
    expect(handelEditbutton).toHaveBeenCalled()
    expect(screen.getByText('Property updated successfully')).toBeInTheDocument()
  })
})

describe('AddProperty Component', () => {
  const property = {
    name: 'Sunset Villa',
    address: '123 Ocean St',
    available_from: '2022-04-01',
    bhk: '2BHK',
    city: 'Seaside',
    country: 'Wonderland',
    description: 'A beautiful seaside property.',
    district: 'Coastal District',
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
    property_rent: 2500,
    rent_type: 'Monthly',
    state: 'State',
    street: 'Beachside Lane',
    ready_to_move: true
  };

  test('renders with property data and handles submission', async () => {
    const mockResponse = { data: { statusCode: 201 } };
    axios.post = jest.fn().mockResolvedValue(mockResponse);
    const onUpdate = jest.fn();
    const handleAddButton = jest.fn();

    render(<AddProperty onUpdate={onUpdate} handleAddButton={handleAddButton} />);

    Object.keys(property).forEach(key => {
      fireEvent.change(screen.getByTestId(new RegExp(key, 'i')), 
      { target: { value: property[key] } });

    });

    const saveButton = screen.getByTestId('add-property-button');
    act(() => {
      fireEvent.click(saveButton);
    });

    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalled();
      expect(handleAddButton).toHaveBeenCalled();
      expect(axios.post).toHaveBeenCalled();
      expect(screen.getByText('Property added successfully')).toBeInTheDocument();
    });
  });
});
})