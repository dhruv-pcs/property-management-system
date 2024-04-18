import React from 'react'
import { render} from '@testing-library/react'
import '@testing-library/jest-dom'
import Dashboard from 'src/pages/index'

describe('Unauthorized Component', () => {

    it('should render unauthorized component', async () => {
        const { container } = render(<Dashboard />)
        expect(container).toMatchSnapshot()
    })
})