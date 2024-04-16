import React, { useEffect, useState } from 'react'
import Loading from '@components/loading/loading'
import { useRouter } from 'next/router'

const AuthWrapper = WrappedComponent => {
  const AuthenticatedComponent = props => {
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)
    const router = useRouter()

    useEffect(() => {
      const checkAuthentication = async () => {
        try {
          const token = localStorage.getItem('token')
          if (token) {
           
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

    // Redirect to home page if authenticated
    useEffect(() => {
      if (authenticated) {
        router.push('/')
      }
    }, [authenticated, router])

    // Show loading page while checking authentication
    if (loading) {
      return <Loading />
    }

    // Render the wrapped component if not authenticated
    return <WrappedComponent {...props} />
  }

  return AuthenticatedComponent
}

export default AuthWrapper
