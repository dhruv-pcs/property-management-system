import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import Customer from 'src/pages/customer'
import React from 'react'
import '@testing-library/jest-dom'
import axios from 'axios'
import ViewCustomer from '@components/customer/view-customer'
import EditCustomer from '@components/customer/edit-customer'
import AddCustomer from '@components/customer/add-customer'

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(false)
}))

const mockPermissions = [
  {
    module: {
      alias_name: 'Customer'
    },
    view: true,
    update: true,
    remove: true,
    add: true
  }
]

const mockCustomerData = [
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

describe('Customer Component', () => {
  beforeEach(async () => {
    localStorage.setItem('user', JSON.stringify(mockPermissions))
    axios.get = jest.fn().mockResolvedValue({ data: { data: { customerData: mockCustomerData } } })
    render(<Customer />)
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled()
    })
  })

  test('Customer List Rendering Test', async () => {
    const ownerList = await screen.findByTestId('customer-list')
    expect(ownerList).toBeInTheDocument()
  })

  test('renders customer list from API', async () => {
    await waitFor(() => {
      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('Phone')).toBeInTheDocument()
      expect(screen.getByText('Aadhar Card')).toBeInTheDocument()
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument()
      expect(screen.getByText('123456789012')).toBeInTheDocument()
      expect(screen.getByText('123456789012')).toBeInTheDocument()
    })
  })

  test('handles error when API request fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('API request failed'))

    render(<Customer />)

    await waitFor(() => {
      expect(screen.getByText('Error Fetching Data')).toBeInTheDocument()
    })
  })

  test('clicking Edit button opens edit modal', async () => {
    const edit = screen.getByTestId('edit-customer')
    expect(edit).toBeInTheDocument()
    fireEvent.click(edit)

    await waitFor(() => {
      expect(screen.getByTestId('edit-customer-modal')).toBeInTheDocument()
      expect(screen.getByText('Edit Customer')).toBeInTheDocument()
    })
  })

  test('clicking View button opens view modal', async () => {
    const view = screen.getByTestId('view-customer')
    expect(view).toBeInTheDocument()
    fireEvent.click(view)

    await waitFor(() => {
      expect(screen.getByTestId('view-customer-modal')).toBeInTheDocument()
      expect(screen.getByText('View Customer')).toBeInTheDocument()
    })
  })

  test('clicking Delete button opens delete modal', async () => {
    const deleteCustomer = screen.getByTestId('delete-customer')
    expect(deleteCustomer).toBeInTheDocument()
    fireEvent.click(deleteCustomer)

    await waitFor(() => {
      expect(screen.getByTestId('delete-customer-modal')).toBeInTheDocument()
      expect(screen.getByText('Delete Customer')).toBeInTheDocument()
    })
  })

  test('clicking Add button opens add modal', async () => {
    const add = screen.getByTestId('add-customer')
    expect(add).toBeInTheDocument()
    fireEvent.click(add)

    await waitFor(() => {
      expect(screen.getByTestId('add-customer-modal')).toBeInTheDocument()
      expect(screen.getByText('Add Customer')).toBeInTheDocument()
    })
  })

  test('clicking Delete button and then click confirm delete button to delete customer - Success', async () => {
    const mockResponseData = { data: { statusCode: 201 } }
    jest.spyOn(axios, 'delete').mockResolvedValue(mockResponseData)

    render(<Customer />)

    const deleteCustomer = screen.getByTestId('delete-customer')
    fireEvent.click(deleteCustomer)

    expect(screen.getByText('Delete Customer')).toBeInTheDocument()

    const confirmDelete = screen.getByTestId('confirm-delete')

    act(() => {
      fireEvent.click(confirmDelete)
    })

    await waitFor(() => {
      expect(screen.queryByText('Delete Customer')).not.toBeInTheDocument()
      expect(screen.queryAllByText('Customer Deleted Successfully')[0]).toBeInTheDocument()
    })
  })

  test('handles error when deleting customer', async () => {
    jest.spyOn(axios, 'delete').mockRejectedValueOnce(new Error('Delete request failed'))
    render(<Customer />)
    const deleteOwner = screen.getByTestId('delete-customer')
    fireEvent.click(deleteOwner)
    expect(screen.getByText('Delete Customer')).toBeInTheDocument()
    const confirmDelete = screen.getByTestId('confirm-delete')
    fireEvent.click(confirmDelete)

    await waitFor(() => {
      expect(screen.getByText('Error Deleting Customer')).toBeInTheDocument()
    })
  })

  test('renders specific content when is_verified and status are false', async () => {
    const mockCustomerDataFalse = [
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
    render(<ViewCustomer customer={mockCustomerDataFalse[0]} />)
  })

  test('renders specific content when is_verified and status are false', async () => {
    const mockCustomerDataFalse = [
      {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        aadhar_card_no: '123456789012',
        is_verified: false, // Set to false
        status: false // Set to false
      }
    ]

    axios.get = jest.fn().mockResolvedValue({ data: { data: { customerData: mockCustomerDataFalse } } })

    render(<Customer />)

    await waitFor(() => {
      expect(screen.getByTestId('not-verified')).toBeInTheDocument()
      expect(screen.getByTestId('not-active')).toBeInTheDocument()
    })
  })
})

describe('Edit Customer Component', () => {
  const customer = {
    id: 1,
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

  test('renders with customer data with status and is_verified true', () => {
    const { getByLabelText, getByTestId } = render(<EditCustomer customer={customer} />)

    expect(getByLabelText('First name')).toHaveValue(customer.first_name)
    expect(getByLabelText('Last name')).toHaveValue(customer.last_name)
    expect(getByLabelText('Email address')).toHaveValue(customer.email)
    expect(getByLabelText('Phone number')).toHaveValue(customer.phone)
    expect(getByLabelText('Alternative Phone No:')).toHaveValue(customer.alternate_phone)
    expect(getByLabelText('City')).toHaveValue(customer.city)
    expect(getByLabelText('State')).toHaveValue(customer.state)
    expect(getByLabelText('Country')).toHaveValue(customer.country)
    expect(getByLabelText('Pincode')).toHaveValue(customer.pincode)
    expect(getByLabelText('Aadhar Card No')).toHaveValue(customer.aadhar_card_no)
    expect(getByLabelText('Address')).toHaveValue(customer.address)
    expect(getByLabelText('GST No')).toHaveValue(customer.gst_no)
    expect(getByLabelText('Landmark')).toHaveValue(customer.landmark)
    expect(getByLabelText('Street')).toHaveValue(customer.street)
    expect(getByTestId('active')).toBeChecked()
    expect(getByTestId('verified')).toBeChecked()
  })

  test('renders with customer data with status and is_verified false', () => {
    const customerData = {
      ...customer,
      status: false,
      is_verified: false
    }
    const { getByLabelText, getByTestId } = render(<EditCustomer customer={customerData} />)

    expect(getByLabelText('First name')).toHaveValue(customer.first_name)
    expect(getByLabelText('Last name')).toHaveValue(customer.last_name)
    expect(getByLabelText('Email address')).toHaveValue(customer.email)
    expect(getByLabelText('Phone number')).toHaveValue(customer.phone)
    expect(getByLabelText('Alternative Phone No:')).toHaveValue(customer.alternate_phone)
    expect(getByLabelText('City')).toHaveValue(customer.city)
    expect(getByLabelText('State')).toHaveValue(customer.state)
    expect(getByLabelText('Country')).toHaveValue(customer.country)
    expect(getByLabelText('Pincode')).toHaveValue(customer.pincode)
    expect(getByLabelText('Aadhar Card No')).toHaveValue(customer.aadhar_card_no)
    expect(getByLabelText('Address')).toHaveValue(customer.address)
    expect(getByLabelText('GST No')).toHaveValue(customer.gst_no)
    expect(getByLabelText('Landmark')).toHaveValue(customer.landmark)
    expect(getByLabelText('Street')).toHaveValue(customer.street)
    expect(getByTestId('inactive')).toBeChecked()
    expect(getByTestId('not_verified')).toBeChecked()
  })

  test('Update Customer With out Empty Fields to get Validation Error', async () => {
    const onUpdate = jest.fn()
    const handelEditbutton = jest.fn()
    render(<EditCustomer customer={customer} onUpdate={onUpdate} handelEditbutton={handelEditbutton} />)

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
      expect(screen.getByText('Phone number is required')).toBeInTheDocument()
      expect(screen.getByText('GST No is required')).toBeInTheDocument()
      expect(screen.getByText('Address is required')).toBeInTheDocument()
      expect(screen.getByText('Street is required')).toBeInTheDocument()
      expect(screen.getByText('Landmark is required')).toBeInTheDocument()
      expect(screen.getByText('Aadhar Card No is required')).toBeInTheDocument()
    })
  })

  test('successfully updates customer upon form submission', async () => {
    const mockResponse = { status: 201 }
    axios.patch = jest.fn().mockResolvedValue(mockResponse)
    const onUpdate = jest.fn()
    const handelEditbutton = jest.fn()

    render(<EditCustomer customer={customer} onUpdate={onUpdate} handelEditbutton={handelEditbutton} />)

    const saveButton = screen.getByLabelText('save')

    act(() => {
      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalled()
      expect(handelEditbutton).toHaveBeenCalled()
      expect(screen.getByText('Customer updated successfully')).toBeInTheDocument()
    })
  })

  test('handles error when updating customer', async () => {
    const mockError = new Error('Update request failed')
    axios.patch = jest.fn().mockRejectedValue(mockError)
    const onUpdate = jest.fn()
    const handelEditbutton = jest.fn()

    render(<EditCustomer customer={customer} onUpdate={onUpdate} handelEditbutton={handelEditbutton} />)

    const saveButton = screen.getByLabelText('save')
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(onUpdate).not.toHaveBeenCalled()
      expect(handelEditbutton).not.toHaveBeenCalled()
      expect(screen.getByText('Customer cannot be updated')).toBeInTheDocument()
    })
  })
})

describe('Add Customer Component', () => {
  const customer = {
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

  test('Add New Customer', async () => {
    const mockResponse = { data: { statusCode: 201 } }
    axios.post = jest.fn().mockResolvedValue(mockResponse)
    const onUpdate = jest.fn()
    const handelAddbutton = jest.fn()

    const { getByLabelText } = render(<AddCustomer onUpdate={onUpdate} handelAddbutton={handelAddbutton} />)

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

    fireEvent.change(first_name, { target: { value: customer.first_name } })
    fireEvent.change(last_name, { target: { value: customer.last_name } })
    fireEvent.change(email, { target: { value: customer.email } })
    fireEvent.change(phone, { target: { value: customer.phone } })
    fireEvent.change(alternate_phone, { target: { value: customer.alternate_phone } })
    fireEvent.change(city, { target: { value: customer.city } })
    fireEvent.change(state, { target: { value: customer.state } })
    fireEvent.change(country, { target: { value: customer.country } })
    fireEvent.change(pincode, { target: { value: customer.pincode } })
    fireEvent.change(aadhar_card_no, { target: { value: customer.aadhar_card_no } })
    fireEvent.change(address, { target: { value: customer.address } })
    fireEvent.change(gst_no, { target: { value: customer.gst_no } })
    fireEvent.change(landmark, { target: { value: customer.landmark } })
    fireEvent.change(street, { target: { value: customer.street } })

    const saveButton = screen.getByTestId('submit')

    act(() => {
      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(onUpdate).toHaveBeenCalled()
      expect(handelAddbutton).toHaveBeenCalled()
      expect(screen.getByText('Customer added successfully')).toBeInTheDocument()
    })
  })

  test('Add New customer With Empty Fields to get Validation Error', async () => {
    const mockResponse = { data: { statusCode: 201 } }
    axios.post = jest.fn().mockResolvedValue(mockResponse)
    const onUpdate = jest.fn()
    const handelAddbutton = jest.fn()

    const { getByLabelText } = render(<AddCustomer onUpdate={onUpdate} handelAddbutton={handelAddbutton} />)

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

    const saveButton = screen.getByTestId('submit')

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
      expect(screen.getByText('Phone number is required')).toBeInTheDocument()
      expect(screen.getByText('Aadhar Card No is required')).toBeInTheDocument()
      expect(screen.getByText('City is required')).toBeInTheDocument()
      expect(screen.getByText('State is required')).toBeInTheDocument()
      expect(
        screen.getByText('pincode must be a `number` type, but the final value was: `NaN` (cast from the value `""`).')
      ).toBeInTheDocument()
    })
  })

  test('Add New customer', async () => {
    const mockError = new Error('Add request failed')
    axios.post = jest.fn().mockRejectedValue(mockError)
    const onUpdate = jest.fn()
    const handelAddbutton = jest.fn()

    const { getByLabelText } = render(<AddCustomer onUpdate={onUpdate} handelAddbutton={handelAddbutton} />)

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

    fireEvent.change(first_name, { target: { value: customer.first_name } })
    fireEvent.change(last_name, { target: { value: customer.last_name } })
    fireEvent.change(email, { target: { value: customer.email } })
    fireEvent.change(phone, { target: { value: customer.phone } })
    fireEvent.change(alternate_phone, { target: { value: customer.alternate_phone } })
    fireEvent.change(city, { target: { value: customer.city } })
    fireEvent.change(state, { target: { value: customer.state } })
    fireEvent.change(country, { target: { value: customer.country } })
    fireEvent.change(pincode, { target: { value: customer.pincode } })
    fireEvent.change(aadhar_card_no, { target: { value: customer.aadhar_card_no } })
    fireEvent.change(address, { target: { value: customer.address } })
    fireEvent.change(gst_no, { target: { value: customer.gst_no } })
    fireEvent.change(landmark, { target: { value: customer.landmark } })
    fireEvent.change(street, { target: { value: customer.street } })

    const saveButton = screen.getByTestId('submit')

    act(() => {
      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(onUpdate).not.toHaveBeenCalled()
      expect(handelAddbutton).not.toHaveBeenCalled()
      expect(screen.getByText('customer cannot be added')).toBeInTheDocument()
    })
  })
})
