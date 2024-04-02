/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import Loading from '@components/loading/loading'
import { useRouter } from 'next/router'

const AuthWrapper = WrappedComponent => {
  return props => {
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)
    const router = useRouter()

    useEffect(() => {
      const checkAuthentication = async () => {
        try {
          const token = localStorage.getItem('token')
          if (token) {
            // Token exists, user is authenticated
            setAuthenticated(true)
          } else {
            // Token does not exist, user is not authenticated
            setAuthenticated(false)
          }
        } catch (error) {
          console.error('Error checking authentication:', error)
          setAuthenticated(false)
        } finally {
          setLoading(false) // Set loading to false after authentication check
        }
      }

      checkAuthentication()
    }, [])

    // Show loading page while checking authentication
    if (loading) {
      return <Loading />
    }

    // Redirect to home page if authenticated
    if (authenticated) {
      router.push('/')

      return null
    }

    // Render the wrapped component if not authenticated
    return <WrappedComponent {...props} />
  }
}

export default AuthWrapper
