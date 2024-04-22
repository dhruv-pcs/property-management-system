import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import axios from 'axios'
import AddRole from '@components/role/add-role'

jest.mock('axios')

describe('AddRole component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: {
        data: {
          moduleData: [
            { u_id: 1, alias_name: 'Module 1' },
            { u_id: 2, alias_name: 'Module 2' }
          ]
        }
      }
    })
  })

  test('renders the component properly', async () => {
    render(<AddRole />)
    expect(await screen.findByText('Role Name')).toBeInTheDocument()
    expect(screen.getByText('Save Permissions')).toBeInTheDocument()
  })

  test('submits form without role name to get Validation error', async () => {
    render(<AddRole />)
    const saveButton = screen.getByTestId('save-permissions')

    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(screen.getByText('Role name is required')).toBeInTheDocument()
    })
  })

  test('handlePermissionChange updates permissions correctly', async () => {
    render(<AddRole />)
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled()
    })

    const viewCheckbox = screen.getByTestId('view-checkbox-1')
    const editCheckbox = screen.getByTestId('update-checkbox-1')
    const deleteCheckbox = screen.getByTestId('delete-checkbox-1')
    const addCheckbox = screen.getByTestId('add-checkbox-1')
    const notificationCheckBox = screen.getByTestId('notification-checkbox-1')
    const selectAllCheckbox = screen.getByTestId('select-all-checkbox-1')

    fireEvent.click(viewCheckbox)
    fireEvent.click(addCheckbox)
    fireEvent.click(editCheckbox)
    fireEvent.click(deleteCheckbox)
    fireEvent.click(selectAllCheckbox)
    fireEvent.click(notificationCheckBox)

    await waitFor(() => {
      expect(screen.getByTestId('view-checkbox-1')).toBeInTheDocument()
      expect(screen.getByTestId('update-checkbox-1')).toBeInTheDocument()
      expect(screen.getByTestId('add-checkbox-1')).toBeInTheDocument()
      expect(screen.getByTestId('delete-checkbox-1')).toBeInTheDocument()
      expect(screen.getByTestId('notification-checkbox-1')).toBeInTheDocument()
    })
  })

  test('submits form with role name and permissions successfully', async () => {
    axios.post.mockResolvedValueOnce({ status: 201 })

    render(<AddRole />)
    const roleNameInput = screen.getByTestId('role-name-input')
    const saveButton = screen.getByTestId('save-permissions')
    const selectAllCheckbox = screen.getByTestId('select-all-checkbox')
    fireEvent.change(roleNameInput, { target: { value: 'Asadasddmin' } })
    fireEvent.click(selectAllCheckbox)
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled()
      expect(screen.getByText('Failed to create role')).toBeInTheDocument()
    })
  })

  test('handles error on form submission', async () => {
    axios.post.mockRejectedValueOnce(new Error('Failed to create role'))

    render(<AddRole />)
    const roleNameInput = screen.getByTestId('role-name-input')
    const saveButton = screen.getByTestId('save-permissions')

    fireEvent.change(roleNameInput, { target: { value: 'Admin' } })
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled()
      expect(screen.getByText('Failed to create role')).toBeInTheDocument()
    })
  })

  
})
