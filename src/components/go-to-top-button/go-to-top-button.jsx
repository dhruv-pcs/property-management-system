import React, { useState, useEffect } from 'react'
import { ArrowUpward } from '@mui/icons-material'

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      data-testid='go-to-top-button'
      aria-label='Go to top'
      className={`go-top-btn d-flex justify-content-center align-items-center rounded-circle ${isVisible ? 'show' : ''}`}
      onClick={scrollToTop}
    >
      <ArrowUpward />
    </button>
  )
}

export default GoToTopButton
