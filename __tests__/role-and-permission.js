import React from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import RoleAndPermission from 'src/pages/role-and-permission'
import axios from 'axios'
import AddRole from '@components/role/add-role'
import { Provider } from 'react-redux'
import { store } from 'src/redux/store'

const mockPermissions = [
  {
    module: {
      alias_name: 'Role And Permission'
    },
    view: true,
    update: true,
    remove: true,
    add: true
  }
]

const mockRoleData = [
  {
    id: 1,
    u_id: 'ROL1000000005',
    name: 'super-admin'
  },
  {
    id: 2,
    u_id: 'ROL1000000002',
    name: 'admin'
  }
]

const mockModuleData = [
  {
    id: 1,
    u_id: 'MOD1000000001',
    name: 'Owner',
    alias_name: 'Owner',
    view: true,
    add: true,
    update: true,
    remove: true
  },
  {
    id: 2,
    u_id: 'MOD1000000002',
    name: 'Customer',
    alias_name: 'Customer',
    view: true,
    add: true,
    update: true,
    remove: true
  },
  {
    id: 3,
    u_id: 'MOD1000000003',
    name: 'Property',
    alias_name: 'Property',
    view: true,
    add: true,
    update: true,
    remove: true
  },
  {
    id: 4,
    u_id: 'MOD1000000004',
    name: 'Tenant',
    alias_name: 'Tenant',
    view: true,
    add: true,
    update: true,
    remove: true
  },
  {
    id: 5,
    u_id: 'MOD1000000005',
    name: 'Invoice',
    alias_name: 'Invoice',
    view: true,
    add: true,
    update: true,
    remove: true
  }
]

const mockPermissionsData = {
  roleName: 'super-admin',
  permissions: [
    {
      id: 1,
      u_id: 'PER1000000001',
      view: true,
      add: true,
      update: true,
      remove: true,
      notification: true,
      created_at: '2024-04-05T10:52:23.144Z',
      updated_at: '2024-04-05T10:52:23.144Z',
      module_u_id: 'MOD1000000001',
      role_u_id: 'ROL1000000005',
      module: {
        id: 1,
        u_id: 'MOD1000000001',
        name: 'role-and-permission',
        alias_name: 'Role And Permission',
        status: true,
        created_at: '2024-04-05T10:52:22.986Z',
        updated_at: '2024-04-05T10:52:22.986Z'
      }
    },
    {
      id: 2,
      u_id: 'PER1000000002',
      view: true,
      add: true,
      update: true,
      remove: true,
      notification: true,
      created_at: '2024-04-05T10:52:23.151Z',
      updated_at: '2024-04-05T10:52:23.151Z',
      module_u_id: 'MOD1000000002',
      role_u_id: 'ROL1000000005',
      module: {
        id: 2,
        u_id: 'MOD1000000002',
        name: 'permission-list',
        alias_name: 'Permission List',
        status: true,
        created_at: '2024-04-05T10:52:22.996Z',
        updated_at: '2024-04-05T10:52:22.996Z'
      }
    },
    {
      id: 3,
      u_id: 'PER1000000003',
      view: true,
      add: true,
      update: true,
      remove: true,
      notification: true,
      created_at: '2024-04-05T10:52:23.154Z',
      updated_at: '2024-04-05T10:52:23.154Z',
      module_u_id: 'MOD1000000003',
      role_u_id: 'ROL1000000005',
      module: {
        id: 3,
        u_id: 'MOD1000000003',
        name: 'admin',
        alias_name: 'Admin',
        status: true,
        created_at: '2024-04-05T10:52:23.001Z',
        updated_at: '2024-04-05T10:52:23.001Z'
      }
    },
    {
      id: 4,
      u_id: 'PER1000000004',
      view: true,
      add: true,
      update: true,
      remove: true,
      notification: true,
      created_at: '2024-04-05T10:52:23.159Z',
      updated_at: '2024-04-05T10:52:23.159Z',
      module_u_id: 'MOD1000000004',
      role_u_id: 'ROL1000000005',
      module: {
        id: 4,
        u_id: 'MOD1000000004',
        name: 'owner',
        alias_name: 'Owner',
        status: true,
        created_at: '2024-04-05T10:52:23.005Z',
        updated_at: '2024-04-05T10:52:23.005Z'
      }
    },
    {
      id: 5,
      u_id: 'PER1000000005',
      view: true,
      add: true,
      update: true,
      remove: true,
      notification: true,
      created_at: '2024-04-05T10:52:23.162Z',
      updated_at: '2024-04-05T10:52:23.162Z',
      module_u_id: 'MOD1000000005',
      role_u_id: 'ROL1000000005',
      module: {
        id: 5,
        u_id: 'MOD1000000005',
        name: 'property',
        alias_name: 'Property',
        status: true,
        created_at: '2024-04-05T10:52:23.010Z',
        updated_at: '2024-04-05T10:52:23.010Z'
      }
    },
    {
      id: 6,
      u_id: 'PER1000000006',
      view: true,
      add: true,
      update: true,
      remove: true,
      notification: true,
      created_at: '2024-04-05T10:52:23.166Z',
      updated_at: '2024-04-05T10:52:23.166Z',
      module_u_id: 'MOD1000000006',
      role_u_id: 'ROL1000000005',
      module: {
        id: 6,
        u_id: 'MOD1000000006',
        name: 'customer',
        alias_name: 'Customer',
        status: true,
        created_at: '2024-04-05T10:52:23.016Z',
        updated_at: '2024-04-05T10:52:23.016Z'
      }
    },
    {
      id: 7,
      u_id: 'PER1000000007',
      view: true,
      add: true,
      update: true,
      remove: true,
      notification: true,
      created_at: '2024-04-05T10:52:23.169Z',
      updated_at: '2024-04-05T10:52:23.169Z',
      module_u_id: 'MOD1000000007',
      role_u_id: 'ROL1000000005',
      module: {
        id: 7,
        u_id: 'MOD1000000007',
        name: 'property-allocate',
        alias_name: 'Property Allocate',
        status: true,
        created_at: '2024-04-05T10:52:23.021Z',
        updated_at: '2024-04-05T10:52:23.021Z'
      }
    }
  ]
}
describe('Role and Permission Component', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(mockPermissions))
    localStorage.setItem('token', '5645654545564564')
    axios.get = jest.fn().mockResolvedValue({ data: { data: mockRoleData } })
  })

  afterEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  test('should render role and permission component correctly', async () => {
    await act(() =>
      render(
        <Provider store={store}>
          <RoleAndPermission />
        </Provider>
      )
    )
    expect(screen.getByTestId('role')).toBeInTheDocument()
  })

  test('Should Not Render API and show error', async () => {
    axios.get.mockRejectedValueOnce(new Error('API request failed'))
    await act(() =>
      render(
        <Provider store={store}>
          <RoleAndPermission />
        </Provider>
      )
    )

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled()
    })
    expect(screen.getByText('Error Fetching Data')).toBeInTheDocument()
  })

  test('should open add modal when Add button is clicked', async () => {
    act(() =>
      render(
        <Provider store={store}>
          <RoleAndPermission />
        </Provider>
      )
    )

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled()
    })

    axios.get.mockResolvedValueOnce({ data: { data: { moduleData: mockModuleData } } })
    const add = screen.getByTestId('add-role')
    fireEvent.click(add)
    await waitFor(() => {
      expect(screen.getByTestId('add-role-modal')).toBeInTheDocument()
    })
  })

  test('should open edit modal when Edit button is clicked', async () => {
    act(() =>
      render(
        <Provider store={store}>
          <RoleAndPermission />
        </Provider>
      )
    )

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled()
    })
    axios.get.mockResolvedValueOnce({ data: { data: mockPermissionsData } })
    const edit = screen.getByTestId('edit-role-0')
    fireEvent.click(edit)
    await waitFor(() => {
      expect(screen.getByTestId('edit-role-modal')).toBeInTheDocument()
    })
  })

  test('should open view modal when View button is clicked', async () => {
    act(() =>
      render(
        <Provider store={store}>
          <RoleAndPermission />
        </Provider>
      )
    )

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled()
    })
    axios.get.mockResolvedValueOnce({ data: { data: mockPermissionsData } })
    const view = screen.getByTestId('view-role-0')
    fireEvent.click(view)
    await waitFor(() => {
      expect(screen.getByTestId('view-role-modal')).toBeInTheDocument()
    })
  })

  test('should open delete modal when Delete button is clicked', async () => {
    act(() =>
      render(
        <Provider store={store}>
          <RoleAndPermission />
        </Provider>
      )
    )

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled()
    })

    const deleteAdmin = screen.getByTestId('delete-role-0')

    fireEvent.click(deleteAdmin)
    await waitFor(() => {
      expect(screen.getByTestId('delete-role-modal')).toBeInTheDocument()
    })
  })

  test('should open delete modal when Delete button is clicked and Delete Admin', async () => {
    axios.delete = jest.fn().mockResolvedValue({ data: { statusCode: 200 } })

    act(() =>
      render(
        <Provider store={store}>
          <RoleAndPermission />
        </Provider>
      )
    )

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled()
    })

    const deleteAdmin = screen.getByTestId('delete-role-0')

    fireEvent.click(deleteAdmin)
    await waitFor(() => {
      expect(screen.getByTestId('delete-role-modal')).toBeInTheDocument()
    })

    const confirmDelete = screen.getByTestId('confirm-delete')
    fireEvent.click(confirmDelete)

    await waitFor(() => {
      expect(screen.getByText('Role Deleted Successfully')).toBeInTheDocument()
    })
  })

  test('Should Not Delete Role  and show error', async () => {
    axios.delete.mockRejectedValueOnce(new Error('API request failed'))
    act(() =>
      render(
        <Provider store={store}>
          <RoleAndPermission />
        </Provider>
      )
    )

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled()
    })

    const deleteAdmin = screen.getByTestId('delete-role-1')

    fireEvent.click(deleteAdmin)
    await waitFor(() => {
      expect(screen.getByTestId('delete-role-modal')).toBeInTheDocument()
    })

    const confirmDelete = screen.getByTestId('confirm-delete')
    fireEvent.click(confirmDelete)

    await waitFor(() => {
      expect(screen.getByText('Error Deleting Role')).toBeInTheDocument()
    })
  })
})

describe('Add Role and Permission Component', () => {
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
    await act(async () => render(<AddRole />))
    expect(await screen.findByText('Role Name')).toBeInTheDocument()
    expect(screen.getByText('Save Permissions')).toBeInTheDocument()
  })
})
