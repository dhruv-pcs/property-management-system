import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import Owner from 'src/pages/owner'
import React from 'react'
import '@testing-library/jest-dom'
import axios from 'axios'
import EditOwner from '@components/owner/edit-owner'
import AddOwner from '@components/owner/add-owner'
import ViewOwner from '@components/owner/view-owner'

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(false)
}))

const mockPermissions = [
  {
    module: {
      alias_name: 'Owner'
    },
    view: true,
    update: true,
    remove: true,
    add: true
  }
]

const mockOwnerData = [
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    aadhar_card_no: '123456789012',
    is_verified: true,
    status: true
  }
]

Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockPermissions))

describe('Owner Component', () => {
  beforeEach(async () => {
    localStorage.setItem('user', JSON.stringify(mockPermissions))
    localStorage.setItem('token', "5645654545564564")
    axios.get = jest.fn().mockResolvedValue({ data: { data: { ownerData: mockOwnerData } } })
    render(<Owner />)
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled()
    })
  })

  test('Owner List Rendering Test', async () => {
    const ownerList = await screen.findByTestId('owner-list')
    expect(ownerList).toBeInTheDocument()
  })

  test('renders owner list from API', async () => {
    await waitFor(() => {
      expect(screen.getByTestId('name')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('Phone')).toBeInTheDocument()
      expect(screen.getByText('Aadhar Card')).toBeInTheDocument()
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument()
    })
  })

  test('handles error when API request fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('API request failed'))

    render(<Owner />)

    await waitFor(() => {
      expect(screen.getByText('Error Fetching Data')).toBeInTheDocument()
    })
  })

  test('clicking Edit button opens edit modal', async () => {
    const edit = screen.getByTestId('edit-owner')
    expect(edit).toBeInTheDocument()
    fireEvent.click(edit)

    await waitFor(() => {
      expect(screen.getByTestId('edit-owner-modal')).toBeInTheDocument()
      expect(screen.getByText('Edit Owner')).toBeInTheDocument()
    })
  })

  test('clicking View button opens view modal', async () => {
    const view = screen.getByTestId('view-owner')
    expect(view).toBeInTheDocument()
    fireEvent.click(view)

    await waitFor(() => {
      expect(screen.getByTestId('view-owner-modal')).toBeInTheDocument()
      expect(screen.getByText('View Owner')).toBeInTheDocument()
    })
  })

  test('clicking Delete button opens delete modal', async () => {
    const deleteOwner = screen.getByTestId('delete-owner')
    expect(deleteOwner).toBeInTheDocument()
    fireEvent.click(deleteOwner)

    await waitFor(() => {
      expect(screen.getByTestId('delete-owner-modal')).toBeInTheDocument()
      expect(screen.getByText('Delete Owner')).toBeInTheDocument()
    })
  })

  test('clicking Add button opens add modal', async () => {
    const add = screen.getByTestId('add-owner')
    expect(add).toBeInTheDocument()
    fireEvent.click(add)

    await waitFor(() => {
      expect(screen.getByTestId('add-owner-modal')).toBeInTheDocument()
      expect(screen.getByText('Add Owner')).toBeInTheDocument()
    })
  })

  test('clicking Delete button and then click confirm delete button to delete owner - Success', async () => {
    const mockResponseData = { data: { statusCode: 200 } }
    jest.spyOn(axios, 'delete').mockResolvedValue(mockResponseData)

    render(<Owner />)

    const deleteOwner = screen.getByTestId('delete-owner')
    fireEvent.click(deleteOwner)

    expect(screen.getByText('Delete Owner')).toBeInTheDocument()

    const confirmDelete = screen.getByTestId('confirm-delete')
    fireEvent.click(confirmDelete)

    await waitFor(() => {
      expect(screen.queryByText('Delete Owner')).not.toBeInTheDocument()
      expect(screen.queryAllByText('Owner Deleted Successfully')[0]).toBeInTheDocument()
    })
  })

  test('handles error when deleting owner', async () => {
    jest.spyOn(axios, 'delete').mockRejectedValueOnce(new Error('Delete request failed'))
    render(<Owner />)
    const deleteOwner = screen.getByTestId('delete-owner')
    fireEvent.click(deleteOwner)
    expect(screen.getByText('Delete Owner')).toBeInTheDocument()
    const confirmDelete = screen.getByTestId('confirm-delete')
    fireEvent.click(confirmDelete)

    await waitFor(() => {
      expect(screen.getByText('Failed to Delete Owner')).toBeInTheDocument()
    })
  })

  test('renders specific content when is_verified and status are false', async () => {
    const mockOwnerDataFalse = [
      {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        aadhar_card_no: '123456789012',
        is_verified: false,
        status: false 
      }
    ]

    axios.get = jest.fn().mockResolvedValue({ data: { data: { ownerData: mockOwnerDataFalse } } })

    render(<Owner />)

    await waitFor(() => {
      expect(screen.getByTestId('not-verified')).toBeInTheDocument()
      expect(screen.getByTestId('not-active')).toBeInTheDocument()
    })
  })

  test('renders View Componets specific content when is_verified and status are false', async () => {
    const mockOwnerDataFalse = [
      {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        aadhar_card_no: '123456789012',
        is_verified: false,
        status: false
      }
    ]

    axios.get = jest.fn().mockResolvedValue({ data: { data: { ownerData: mockOwnerDataFalse } } })

    render(<ViewOwner owner={mockOwnerDataFalse[0]}  />)
  })
})

describe('Owner Edit Component', () => {
  const owner = {
    u_id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    alternate_phone: '9876543210',
    aadhar_card_no: '123456789012',
    address: '123 Main St',
    gst_no: '123456789012345',
    landmark: 'Near Park',
    street: 'Main Street',
    city: 'City',
    state: 'State',
    pincode: '123456',
    country: 'Country',
    status: true,
    is_verified: true
  }

  test('renders with owner data with status and is_verified true', () => {
    const { getByLabelText, getByTestId } = render(<EditOwner owner={owner} />)

    expect(getByLabelText('First name')).toHaveValue(owner.first_name)
    expect(getByLabelText('Last name')).toHaveValue(owner.last_name)
    expect(getByLabelText('Email address')).toHaveValue(owner.email)
    expect(getByLabelText('Phone number')).toHaveValue(owner.phone)
    expect(getByLabelText('Alternative Phone No:')).toHaveValue(owner.alternate_phone)
    expect(getByLabelText('City')).toHaveValue(owner.city)
    expect(getByLabelText('State')).toHaveValue(owner.state)
    expect(getByLabelText('Country')).toHaveValue(owner.country)
    expect(getByLabelText('Pincode')).toHaveValue(owner.pincode)
    expect(getByLabelText('Aadhar Card No')).toHaveValue(owner.aadhar_card_no)
    expect(getByLabelText('Address')).toHaveValue(owner.address)
    expect(getByLabelText('GST No')).toHaveValue(owner.gst_no)
    expect(getByLabelText('Landmark')).toHaveValue(owner.landmark)
    expect(getByLabelText('Street')).toHaveValue(owner.street)
    expect(getByTestId('active')).toBeChecked()
    expect(getByTestId('verified')).toBeChecked()
  })

  test('renders with owner data with status and is_verified false', () => {
    const ownerData = {
      ...owner,
      status: false,
      is_verified: false
    }
    const { getByLabelText, getByTestId } = render(<EditOwner owner={ownerData} />)

    expect(getByLabelText('First name')).toHaveValue(owner.first_name)
    expect(getByLabelText('Last name')).toHaveValue(owner.last_name)
    expect(getByLabelText('Email address')).toHaveValue(owner.email)
    expect(getByLabelText('Phone number')).toHaveValue(owner.phone)
    expect(getByLabelText('Alternative Phone No:')).toHaveValue(owner.alternate_phone)
    expect(getByLabelText('City')).toHaveValue(owner.city)
    expect(getByLabelText('State')).toHaveValue(owner.state)
    expect(getByLabelText('Country')).toHaveValue(owner.country)
    expect(getByLabelText('Pincode')).toHaveValue(owner.pincode)
    expect(getByLabelText('Aadhar Card No')).toHaveValue(owner.aadhar_card_no)
    expect(getByLabelText('Address')).toHaveValue(owner.address)
    expect(getByLabelText('GST No')).toHaveValue(owner.gst_no)
    expect(getByLabelText('Landmark')).toHaveValue(owner.landmark)
    expect(getByLabelText('Street')).toHaveValue(owner.street)
    expect(getByTestId('inactive')).toBeChecked()
    expect(getByTestId('not_verified')).toBeChecked()
  })

  test('Update Owner With out Empty Fields to get Validation Error', async () => {
    const onUpdate = jest.fn()
    const handelEditbutton = jest.fn()
    render(<EditOwner owner={owner} onUpdate={onUpdate} handelEditbutton={handelEditbutton} />)

    const first_name = screen.getByTestId('first_name')
    const last_name = screen.getByTestId('last_name')
    const email = screen.getByTestId('email')
    const phone = screen.getByTestId('phone')
    const gst_no = screen.getByTestId('gst_no')
    const aadhar_card_no = screen.getByTestId('aadhar_card_no')
    const address = screen.getByTestId('address')
    const street = screen.getByTestId('street')
    const landmark = screen.getByTestId('landmark')

    fireEvent.change(first_name, { target: { value: '' } })
    fireEvent.change(last_name, { target: { value: '' } })
    fireEvent.change(email, { target: { value: '' } })
    fireEvent.change(phone, { target: { value: '' } })

    fireEvent.change(gst_no, { target: { value: '' } })
    fireEvent.change(address, { target: { value: '' } })
    fireEvent.change(aadhar_card_no, { target: { value: '' } })
    fireEvent.change(street, { target: { value: '' } })
    fireEvent.change(landmark, { target: { value: '' } })

    const saveButton = screen.getByTestId('save-changes')
    act(() => {
      fireEvent.click(saveButton)
    })
    await waitFor(() => {
      expect(screen.getByText('First name is required')).toBeInTheDocument()
      expect(screen.getByText('Last name is required')).toBeInTheDocument()
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(
        screen.getByText('phone must be a `number` type, but the final value was: `NaN` (cast from the value `""`).')
      ).toBeInTheDocument()

      expect(screen.getByText('GST No is required')).toBeInTheDocument()
      expect(screen.getByText('Address is required')).toBeInTheDocument()
      expect(screen.getByText('Street is required')).toBeInTheDocument()
      expect(screen.getByText('Landmark is required')).toBeInTheDocument()
      expect(screen.getByText('Aadhar Card No is required')).toBeInTheDocument()
    })
  })

  test('successfully updates owner upon form submission', async () => {
    const mockResponse = { status: 201 }
    axios.patch = jest.fn().mockResolvedValue(mockResponse)
    const onUpdate = jest.fn()
    const handelEditbutton = jest.fn()

    render(<EditOwner owner={owner} onUpdate={onUpdate} handelEditbutton={handelEditbutton} />)

    const saveButton = screen.getByLabelText('save')

    act(() => {
      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalled()
      expect(handelEditbutton).toHaveBeenCalled()
      expect(screen.getByText('Owner updated successfully')).toBeInTheDocument()
    })
  })

  test('handles error when updating owner', async () => {
    const mockError = new Error('Update request failed')
    axios.patch = jest.fn().mockRejectedValue(mockError)
    const onUpdate = jest.fn()
    const handelEditbutton = jest.fn()

    render(<EditOwner owner={owner} onUpdate={onUpdate} handelEditbutton={handelEditbutton} />)

    const saveButton = screen.getByLabelText('save')
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(onUpdate).not.toHaveBeenCalled()
      expect(handelEditbutton).not.toHaveBeenCalled()
      expect(screen.getByText('Error updating owner')).toBeInTheDocument()
    })
  })
})

describe('Owner Add Component', () => {
  const owner = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    alternate_phone: '9876543210',
    aadhar_card_no: '123456789012',
    address: '123 Main St',
    gst_no: '123456789012345',
    landmark: 'Near Park',
    street: 'Main Street',
    city: 'City',
    state: 'State',
    pincode: '123456',
    country: 'Country'
  }

  test('Add New Owner', async () => {
    const mockResponse = { data: { statusCode: 201 } }
    axios.post = jest.fn().mockResolvedValue(mockResponse)
    const onUpdate = jest.fn()
    const handelAddbutton = jest.fn()

    const { getByLabelText } = render(<AddOwner onUpdate={onUpdate} handelAddbutton={handelAddbutton} />)

    const first_name = getByLabelText('First name')
    const last_name = getByLabelText('Last name')
    const email = getByLabelText('Email address')
    const phone = getByLabelText('Phone number')
    const alternate_phone = getByLabelText('Alternative Phone No')
    const city = getByLabelText('City')
    const state = getByLabelText('State')
    const country = getByLabelText('Country')
    const pincode = getByLabelText('Pincode')
    const aadhar_card_no = getByLabelText('Aadhar Card No')
    const address = getByLabelText('Address')
    const gst_no = getByLabelText('GST No')
    const landmark = getByLabelText('Landmark')
    const street = getByLabelText('Street')

    fireEvent.change(first_name, { target: { value: owner.first_name } })
    fireEvent.change(last_name, { target: { value: owner.last_name } })
    fireEvent.change(email, { target: { value: owner.email } })
    fireEvent.change(phone, { target: { value: owner.phone } })
    fireEvent.change(alternate_phone, { target: { value: owner.alternate_phone } })
    fireEvent.change(city, { target: { value: owner.city } })
    fireEvent.change(state, { target: { value: owner.state } })
    fireEvent.change(country, { target: { value: owner.country } })
    fireEvent.change(pincode, { target: { value: owner.pincode } })
    fireEvent.change(aadhar_card_no, { target: { value: owner.aadhar_card_no } })
    fireEvent.change(address, { target: { value: owner.address } })
    fireEvent.change(gst_no, { target: { value: owner.gst_no } })
    fireEvent.change(landmark, { target: { value: owner.landmark } })
    fireEvent.change(street, { target: { value: owner.street } })

    const saveButton = screen.getByTestId('add-owner')

    act(() => {
      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalled()
      expect(handelAddbutton).toHaveBeenCalled()
      expect(screen.getByText('Owner added successfully')).toBeInTheDocument()
    })

    // expect(axios.post).toHaveBeenCalledWith(
    //   expect.any(String), // URL
    //   {
    //     first_name: 'John',
    //     last_name: 'Doe',
    //     email: 'john.doe@example.com',
    //     phone: '1234567890',
    //     alternate_phone: '9876543210',
    //     aadhar_card_no: '123456789012',
    //     address: '123 Main St',
    //     gst_no: '123456789012345',
    //     landmark: 'Near Park',
    //     street: 'Main Street',
    //     city: 'City',
    //     state: 'State',
    //     pincode: '123456',
    //     country: 'Country'
    //   },
    //   expect.any(Object)
    // )

    // expect(getByLabelText('Last name')).toBeInTheDocument();
    // expect(getByLabelText('Email address')).toBeInTheDocument();
    // expect(getByLabelText('Phone number')).toBeInTheDocument();
    // expect(getByLabelText('Alternative Phone No')).toBeInTheDocument();
    // expect(getByLabelText('City')).toBeInTheDocument();
    // expect(getByLabelText('State')).toBeInTheDocument();
    // expect(getByLabelText('Country')).toBeInTheDocument();
    // expect(getByLabelText('Pincode')).toBeInTheDocument();
    // expect(getByLabelText('Aadhar Card No')).toBeInTheDocument();
    // expect(getByLabelText('Address')).toBeInTheDocument();
    // expect(getByLabelText('GST No')).toBeInTheDocument();
    // expect(getByLabelText('Landmark')).toBeInTheDocument();
    // expect(getByLabelText('Street')).toBeInTheDocument();
  })

  test('Add New Owner With Empty Fields to get Validation Error', async () => {
    const mockResponse = { data: { statusCode: 201 } }
    axios.post = jest.fn().mockResolvedValue(mockResponse)
    const onUpdate = jest.fn()
    const handelAddbutton = jest.fn()

    const { getByLabelText } = render(<AddOwner onUpdate={onUpdate} handelAddbutton={handelAddbutton} />)

    const first_name = getByLabelText('First name')
    const last_name = getByLabelText('Last name')
    const email = getByLabelText('Email address')
    const phone = getByLabelText('Phone number')
    const alternate_phone = getByLabelText('Alternative Phone No')
    const city = getByLabelText('City')
    const state = getByLabelText('State')
    const country = getByLabelText('Country')
    const pincode = getByLabelText('Pincode')
    const aadhar_card_no = getByLabelText('Aadhar Card No')
    const address = getByLabelText('Address')
    const gst_no = getByLabelText('GST No')
    const landmark = getByLabelText('Landmark')
    const street = getByLabelText('Street')

    fireEvent.change(first_name, { target: { value: '' } })
    fireEvent.change(last_name, { target: { value: '' } })
    fireEvent.change(email, { target: { value: '' } })
    fireEvent.change(phone, { target: { value: '' } })
    fireEvent.change(alternate_phone, { target: { value: '' } })
    fireEvent.change(city, { target: { value: '' } })
    fireEvent.change(state, { target: { value: '' } })
    fireEvent.change(country, { target: { value: '' } })
    fireEvent.change(pincode, { target: { value: '' } })
    fireEvent.change(aadhar_card_no, { target: { value: '' } })
    fireEvent.change(address, { target: { value: '' } })
    fireEvent.change(gst_no, { target: { value: '' } })
    fireEvent.change(landmark, { target: { value: '' } })
    fireEvent.change(street, { target: { value: '' } })

    const saveButton = screen.getByTestId('add-owner')

    act(() => {
      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(screen.getByText('First name is required')).toBeInTheDocument()
      expect(screen.getByText('Last name is required')).toBeInTheDocument()
      expect(screen.getByText('Email is required')).toBeInTheDocument()
      expect(screen.getByText('Address is required')).toBeInTheDocument()
      expect(screen.getByText('GST No is required')).toBeInTheDocument()
      expect(screen.getByText('Landmark is required')).toBeInTheDocument()
      expect(screen.getByText('Street is required')).toBeInTheDocument()
      expect(
        screen.getByText('phone must be a `number` type, but the final value was: `NaN` (cast from the value `""`).')
      ).toBeInTheDocument()
      expect(
        screen.getByText(
          'aadhar_card_no must be a `number` type, but the final value was: `NaN` (cast from the value `""`).'
        )
      ).toBeInTheDocument()
      expect(screen.getByText('City is required')).toBeInTheDocument()
      expect(screen.getByText('State is required')).toBeInTheDocument()
      expect(
        screen.getByText('pincode must be a `number` type, but the final value was: `NaN` (cast from the value `""`).')
      ).toBeInTheDocument()
      expect( 
        screen.getByText(
          'alternate_phone must be a `number` type, but the final value was: `NaN` (cast from the value `""`).'
        )
      ).toBeInTheDocument()
    })
  })
  
  test('Add New Owner', async () => {
    const mockError = new Error('Add request failed')
    axios.post = jest.fn().mockRejectedValue(mockError)
    const onUpdate = jest.fn()
    const handelAddbutton = jest.fn()

    const { getByLabelText } = render(<AddOwner onUpdate={onUpdate} handelAddbutton={handelAddbutton} />)

    const first_name = getByLabelText('First name')
    const last_name = getByLabelText('Last name')
    const email = getByLabelText('Email address')
    const phone = getByLabelText('Phone number')
    const alternate_phone = getByLabelText('Alternative Phone No')
    const city = getByLabelText('City')
    const state = getByLabelText('State')
    const country = getByLabelText('Country')
    const pincode = getByLabelText('Pincode')
    const aadhar_card_no = getByLabelText('Aadhar Card No')
    const address = getByLabelText('Address')
    const gst_no = getByLabelText('GST No')
    const landmark = getByLabelText('Landmark')
    const street = getByLabelText('Street')

    fireEvent.change(first_name, { target: { value: owner.first_name } })
    fireEvent.change(last_name, { target: { value: owner.last_name } })
    fireEvent.change(email, { target: { value: owner.email } })
    fireEvent.change(phone, { target: { value: owner.phone } })
    fireEvent.change(alternate_phone, { target: { value: owner.alternate_phone } })
    fireEvent.change(city, { target: { value: owner.city } })
    fireEvent.change(state, { target: { value: owner.state } })
    fireEvent.change(country, { target: { value: owner.country } })
    fireEvent.change(pincode, { target: { value: owner.pincode } })
    fireEvent.change(aadhar_card_no, { target: { value: owner.aadhar_card_no } })
    fireEvent.change(address, { target: { value: owner.address } })
    fireEvent.change(gst_no, { target: { value: owner.gst_no } })
    fireEvent.change(landmark, { target: { value: owner.landmark } })
    fireEvent.change(street, { target: { value: owner.street } })

    const saveButton = screen.getByTestId('add-owner')

    act(() => {
      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(onUpdate).not.toHaveBeenCalled()
      expect(handelAddbutton).not.toHaveBeenCalled()
      expect(screen.getByText('Owner cannot be added')).toBeInTheDocument()
    })
  })
})
