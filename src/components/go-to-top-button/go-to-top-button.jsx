// GoToTopButton.js
import { ArrowUpward } from '@mui/icons-material'
import React, { useState, useEffect } from 'react'

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
      aria-label='Go to top'
      className={`go-top-btn d-flex justify-content-center align-items-center rounded-circle ${isVisible ? 'show' : ''}`}
      onClick={scrollToTop}
    >
      <ArrowUpward />
    </button>
  )
}

export default GoToTopButton
