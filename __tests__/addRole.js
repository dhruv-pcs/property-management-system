import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import axios from 'axios'
import AddRole, { handleGlobalSelectAllChange, handlePermissionChange } from '@components/role/add-role'

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

  test('renders with crashing', async () => {
    axios.get = jest.fn().mockRejectedValue(new Error('Error fetching data'))

    await act(async () => render(<AddRole />));

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled()
      expect(screen.getByText('Error Fetching Data')).toBeInTheDocument()
    })

  })

  test('renders the component properly', async () => {
  await act(async () => render(<AddRole />));
    expect(await screen.findByText('Role Name')).toBeInTheDocument()
    expect(screen.getByText('Save Permissions')).toBeInTheDocument()
  })

  test('submits form without role name to get Validation error', async () => {
  await act(async () => render(<AddRole />));
    const saveButton = screen.getByTestId('save-permissions')

    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(screen.getByText('Role name is required')).toBeInTheDocument()
    })
  })

  test('handlePermissionChange updates permissions correctly', async () => {
  await act(async () => render(<AddRole />));
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled()
    })

    const viewCheckbox = screen.getByTestId('view-checkbox-1')
    const editCheckbox = screen.getByTestId('update-checkbox-1')
    const deleteCheckbox = screen.getByTestId('delete-checkbox-1')
    const addCheckbox = screen.getByTestId('add-checkbox-1')
    const notificationCheckBox = screen.getByTestId('notification-checkbox-1')
    const selectAllCheckbox = screen.getByTestId('select-all-checkbox-1')
    const selectAllGlobalCheckbox = screen.getByTestId('select-all-checkbox')

    fireEvent.click(viewCheckbox)
    fireEvent.click(addCheckbox)
    fireEvent.click(editCheckbox)
    fireEvent.click(deleteCheckbox)
    fireEvent.click(selectAllCheckbox)
    fireEvent.click(notificationCheckBox)
    fireEvent.click(selectAllGlobalCheckbox)

    await waitFor(() => {
      expect(screen.getByTestId('view-checkbox-1')).toBeInTheDocument()
      expect(screen.getByTestId('update-checkbox-1')).toBeInTheDocument()
      expect(screen.getByTestId('add-checkbox-1')).toBeInTheDocument()
      expect(screen.getByTestId('delete-checkbox-1')).toBeInTheDocument()
      expect(screen.getByTestId('notification-checkbox-1')).toBeInTheDocument()
      expect(screen.getByTestId('select-all-checkbox-1')).toBeInTheDocument()
      expect(screen.getByTestId('select-all-checkbox')).toBeInTheDocument()
    })
  })

   test('submits form and updates role successfully', async () => {
    axios.post = jest.fn().mockResolvedValue({ status: 201 })
    const onUpdate = jest.fn()
    const onClose = jest.fn()
     
    await act(async () => render(<AddRole onUpdate={onUpdate} onClose={onClose} />));

    const saveButton = screen.getByTestId('save-permissions');
    const roleName = screen.getByLabelText('Role Name');

    fireEvent.change(roleName, { target: { value: 'Admin' } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(onUpdate).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
      expect(screen.getByText('Role created successfully')).toBeInTheDocument();
    });
  }); 

  test('handles error on form submission', async () => {
    axios.post.mockRejectedValueOnce(new Error('Failed to create role'))

  await act(async () => render(<AddRole />));
    const roleNameInput = screen.getByTestId('role-name-input')
    const saveButton = screen.getByTestId('save-permissions')

    fireEvent.change(roleNameInput, { target: { value: 'Admin' } })
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled()
      expect(screen.getByText('Failed to create role')).toBeInTheDocument()
    })
  })

  test('updates selectAll permission correctly', () => {
    const setPermissionsMock = jest.fn()

    handlePermissionChange(
      {
        1: {
          module_u_id: 1,
          selectAll: false,
          view: false,
          add: false,
          update: false,
          remove: false,
          notification: false
        }
      },
      setPermissionsMock,
      {
        module_u_id: 1,
        permissionType: 'selectAll',
        value: true
      }
    )

    expect(setPermissionsMock).toHaveBeenCalledWith({
      1: { module_u_id: 1, selectAll: true, view: true, add: true, update: true, remove: true, notification: true }
    })
  })

  test('updates view permission correctly', () => {
    const setPermissionsMock = jest.fn()

    handlePermissionChange(
      {
        1: {
          module_u_id: 1,
          selectAll: false,
          view: false,
          add: false,
          update: false,
          remove: false,
          notification: false
        }
      },
      setPermissionsMock,
      {
        module_u_id: 1,
        permissionType: 'view',
        value: true
      }
    )

    expect(setPermissionsMock).toHaveBeenCalledWith({
      1: { module_u_id: 1, selectAll: false, view: true, add: false, update: false, remove: false, notification: false }
    })
  })

  test('updates permissions for global selectAll correctly', async() => {
    const setPermissionsMock = jest.fn()

    const moduleData = [
      { u_id: 1, alias_name: 'Module 1' },
      { u_id: 2, alias_name: 'Module 2' }
    ]

    const permissions = {
      1: { view: false, add: false, update: false, remove: false, notification: false },
      2: { view: false, add: false, update: false, remove: false, notification: false }
    }

    handleGlobalSelectAllChange(true, permissions, setPermissionsMock, moduleData)

    const expectedPermissions = {
      1: { selectAll: true, view: true, add: true, update: true, remove: true, notification: true },
      2: { selectAll: true, view: true, add: true, update: true, remove: true, notification: true }
    }

    expect(setPermissionsMock).toHaveBeenCalledWith(expectedPermissions)
  })



})

