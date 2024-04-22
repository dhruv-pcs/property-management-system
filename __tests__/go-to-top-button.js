import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import GoToTopButton from 'src/components/go-to-top-button/go-to-top-button'

describe('GoToTopButton Component', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn()
  })

 

  test('should become visible when scrolled down', () => {
    Object.defineProperty(window, 'pageYOffset', { value: 400, writable: true })
    const { getByTestId } = render(<GoToTopButton />)
    expect(getByTestId('go-to-top-button')).toBeInTheDocument()
  })

  test('should scroll to top when clicked', () => {
    Object.defineProperty(window, 'pageYOffset', { value: 400, writable: true })
    const { getByTestId } = render(<GoToTopButton />)
    fireEvent.click(getByTestId('go-to-top-button'))
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' })
  })

})
