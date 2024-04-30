import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Permission from 'src/pages/permission-list'
import axios from 'axios'
import { getRoleBackgroundColor } from 'src/pages/permission-list'

jest.mock('axios')

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useTheme: jest.fn().mockReturnValue({
    palette: {
      mode: 'light'
    }
  })
}))

// Mock Math.random() to return a fixed value for testing
jest.spyOn(Math, 'random').mockReturnValue(0.5) // Example: always return 0.5 for testing

// Mock Math.floor() to ensure consistent behavior in your test environment
const originalFloor = Math.floor
jest.spyOn(Math, 'floor').mockImplementation(originalFloor)

describe('Permission component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders permission list when data is fetched successfully', async () => {
    const permissionData = [
      { module: 'Module 1', role: ['Admin'] },
      { module: 'Module 2', role: ['Super-Admin'] }
    ]

    axios.get.mockResolvedValueOnce({ data: { data: { permissionData } } })

    render(<Permission />)

    await waitFor(() => {
      expect(screen.getByTestId('permission-list')).toBeInTheDocument()
      expect(screen.getByText('Module 1')).toBeInTheDocument()
      expect(screen.getByText('Admin')).toBeInTheDocument()
      expect(screen.getByText('Module 2')).toBeInTheDocument()
      expect(screen.getByText('Super-Admin')).toBeInTheDocument()
    })
  })

  test('renders error message when data fetching fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Error fetching data'))

    render(<Permission />)

    await waitFor(() => {
      expect(screen.getByText('Error Fetching Data')).toBeInTheDocument()
    })
  })

  test('renders no data message when permissionData is empty', async () => {
    axios.get.mockResolvedValueOnce({ data: { data: { permissionData: [] } } })

    render(<Permission />)

    await waitFor(() => {
      expect(screen.getByText('There is No Data Available')).toBeInTheDocument()
    })
  })

  test('returns green background color for "admin" role', () => {
    const colors = {
      greenAccent: {
        600: '#00FF00'
      }
    }
    const role = 'admin'
    const result = getRoleBackgroundColor(role, colors)
    expect(result).toEqual('#00FF00')
  })

  test('returns red background color for "super-admin" role', () => {
    const colors = {
      redAccent: {
        600: '#FF0000'
      }
    }
    const role = 'super-admin'
    const result = getRoleBackgroundColor(role, colors)
    expect(result).toEqual('#FF0000')
  })
  test('returns random background color for other roles', async () => {
    jest.spyOn(Math, 'random').mockReturnValueOnce(0.5)
    const parseIntSpy = jest.spyOn(global, 'parseInt')
    const role = 'manager'
    const result = getRoleBackgroundColor(role, null)

    await waitFor(() => {
      expect(parseIntSpy).toHaveBeenCalledWith('3da58a', 16)
      expect(parseIntSpy).toHaveBeenCalledWith('4cceac', 16)
      expect(/^#[0-9A-F]{6}$/i.test(result)).toBeTruthy()
      expect(result).toEqual('#453a1b')
    })
  })
})
