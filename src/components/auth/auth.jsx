import Loading from '@components/loading/loading'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const withAuth = WrappedComponent => {
  const AuthComponent = props => {
    const router = useRouter()
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
      const token = localStorage.getItem('token')
      if (token) {
        setAuthenticated(true)
      } else {
        router.push('/login')
      }
    }, [router])

    if (!authenticated) {
      return <Loading />
    }

    return <WrappedComponent {...props} />
  }

  return AuthComponent
}

export default withAuth
