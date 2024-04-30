import React from 'react'
import { act, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Dashboard from 'src/pages/index'

describe('Dashboard Component', () => {
  it('should render dashboard component', async () => {
    const { container } = act(() => render(<Dashboard />))
    expect(container).toMatchSnapshot()
  })
})
