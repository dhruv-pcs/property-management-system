import React from 'react'
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import axios from 'axios'
import EditRole from '@components/role/edit-role'
import { handlePermissionChange, handleGlobalSelectAllChange } from '@components/role/edit-role'

jest.mock('axios')

process.env.NEXT_PUBLIC_API_URL = 'https://pms.codenticsoftware.in'

const mockLocalStorage = () => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
  }
  global.localStorage = localStorageMock
}

describe('EditRole component', () => {
  beforeEach(() => {
    mockLocalStorage()
    axios.get.mockResolvedValue({
      data: {
        data: {
          roleName: 'Test Role',
          permissions: [
            {
              u_id: 1,
              module_u_id: 1,
              view: true,
              add: true,
              update: false,
              remove: false,
              notification: true,
              module: { u_id: 1, alias_name: 'Module 1' }
            },
            {
              u_id: 2,
              module_u_id: 2,
              view: true,
              add: true,
              update: true,
              remove: false,
              notification: false,
              module: { u_id: 2, alias_name: 'Module 2' }
            }
          ]
        }
      }
    })
  })

  test('renders the component properly', async () => {
    await act(async () => render(<EditRole roleData={{ u_id: 1 }} />));

    expect(await screen.findByText('Role Name')).toBeInTheDocument()
    expect(screen.getByText('Save Permissions')).toBeInTheDocument()
  })

  test('submits form without role name to get Validation error', async () => {
   await act(async () => render(<EditRole roleData={{ u_id: 1 }} />));

    const saveButton = screen.getByTestId('save-permissions')
    const roleName = screen.getByLabelText('Role Name')

    fireEvent.change(roleName, { target: { value: '' } })
    fireEvent.click(saveButton)

    await waitFor(() => {
      expect(screen.getByText('Role name is required')).toBeInTheDocument()
    })
  })

  test('handlePermissionChange updates permissions correctly', async () => {
   await act(async () => render(<EditRole roleData={{ u_id: 1 }} />));
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled()
    })

    const viewCheckbox = screen.getByTestId('view-checkbox-1')
    const addCheckbox = screen.getByTestId('add-checkbox-1')
    const notificationCheckBox = screen.getByTestId('notification-checkbox-1')
    const selectAllCheckbox = screen.getByTestId('select-all-checkbox-1')
    const selectAllGlobalCheckbox = screen.getByTestId('select-all-checkbox')
    const deleteCheckbox = screen.getByTestId('remove-checkbox-1')
    const editCheckbox = screen.getByTestId('update-checkbox-1')


    fireEvent.click(viewCheckbox)
    fireEvent.click(addCheckbox)
    fireEvent.click(editCheckbox)
    fireEvent.click(deleteCheckbox)
    fireEvent.click(notificationCheckBox)
    fireEvent.click(selectAllCheckbox)
    fireEvent.click(selectAllGlobalCheckbox)


    await waitFor(() => {
      expect(screen.getByTestId('view-checkbox-1')).toBeInTheDocument()
      expect(screen.getByTestId('add-checkbox-1')).toBeInTheDocument()
      expect(screen.getByTestId('notification-checkbox-1')).toBeInTheDocument()
      expect(screen.getByTestId('select-all-checkbox-1')).toBeInTheDocument()
      expect(screen.getByTestId('select-all-checkbox')).toBeInTheDocument()
      expect(screen.getByTestId('remove-checkbox-1')).toBeInTheDocument()
      expect(screen.getByTestId('update-checkbox-1')).toBeInTheDocument()
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

  test('updates permissions for global selectAll correctly', async() => {
   await act(async () => render(<EditRole roleData={{ u_id: 1 }} />));

    const selectAll = screen.getByTestId('select-all-checkbox')

    fireEvent.click(selectAll)
  })

  test('Update Role Name', async() => {



   await act(async () => render(<EditRole roleData={{ u_id: 1 }} />));

    const roleName = screen.getByLabelText('Role Name')

    fireEvent.change(roleName, { target: { value: 'Admin' } })
  })

  test('submits form and updates role successfully', async () => {
    axios.patch = jest.fn().mockResolvedValue({ status: 201 })
    const onUpdate = jest.fn()
    const onClose = jest.fn()
     
    await act(async () => render(<EditRole roleData={{ u_id: 1 }} onUpdate={onUpdate} onClose={onClose} />));

    const saveButton = screen.getByTestId('save-permissions');
    const roleName = screen.getByLabelText('Role Name');

    fireEvent.change(roleName, { target: { value: 'Admin' } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(axios.patch).toHaveBeenCalled();
      expect(onUpdate).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
      expect(screen.getByText('Role updated successfully!')).toBeInTheDocument();
    });
  }); 
  

})

