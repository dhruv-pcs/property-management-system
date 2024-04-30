import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Unauthorized from 'src/pages/unauthorized'

describe('Unauthorized Component', () => {
  it('should render unauthorized component', async () => {
    const { container } = render(<Unauthorized />)
    expect(container).toMatchSnapshot()
  })
})
