/* eslint-disable react-hooks/rules-of-hooks */
// import { useContext } from 'react'
// import { AuthContext } from 'src/context/auth-context'

const navigation = () => {
  // ** Hook
  // const userPermissions = useContext(AuthContext)

  // // ** Filter modules subject
  // let filterModules = userPermissions?.permissionData?.filter(item => {
  //   if (item?.view === true) {
  //     return item?.module?.alias_name
  //   }
  // })

  // let filterModuleName = filterModules.map(item => item?.module?.alias_name)

  return [
    {
      title: 'Dashboard',
      icon: 'mdi:home-outline',
      path: '/',
      id: 'dashboard',
      subject: 'dashboard',
      action: 'read'
    },
    {
      title: 'Admin',
      icon: 'ri:admin-fill',
      path: '/admin',
      subject: 'Admin',
      action: 'read'
    },
    {
      title: 'Role',
      icon: 'oui:app-users-roles',
      path: '/role',
      subject: 'Role',
      action: 'read'
    },
    {
      title: 'Permission',
      icon: 'arcticons:permissionsmanager',
      path: '/permission',
      subject: 'Permission',
      action: 'read'
    },
    {
      title: 'Role And Permission',
      icon: 'mdi:shield-star',
      path: '/role-and-permission',
      subject: 'Role And Permission',
      action: 'read'
    },
    {
      title: 'Permission List',
      icon: 'tabler:shield-search',
      path: '/permission-list',
      subject: 'Permission List',
      action: 'read'
    },
    {
      title: 'Property',
      icon: 'material-symbols:home-work',
      path: '/property',
      subject: 'Property',
      action: 'read'
    },
    {
      title: 'Property Allocate',
      icon: 'mdi:location',
      path: '/property-allocate',
      subject: 'Property Allocate',
      action: 'read'
    },
    {
      title: 'Owner',
      path: '/owner',
      icon: 'mdi:user-outline',
      subject: 'Owner',
      action: 'read'
    },
    {
      title: 'Customer',
      path: '/customer',
      icon: 'mdi:nature-people',
      subject: 'Owner',
      action: 'read'
    },

    {
      title: 'Customer Wishlist',
      path: '/customer-wishlist',
      icon: 'mdi:heart',
      subject: 'Customer Wishlist',
      action: 'read'
    },
    {
      title: 'Owner Wallet',
      path: '/owner-wallet',
      icon: 'mdi:account-balance-wallet-outline',
      subject: 'Customer Wallet',
      action: 'read'
    },

    {
      title: 'Customer Wallet',
      path: '/customer-wallet',
      icon: 'mdi:account-balance-wallet',
      subject: 'Customer Wallet',
      action: 'read'
    },
    {
      title: 'Owner Transaction',
      path: '/owner-wallet-transection',
      icon: 'ic:baseline-request-page',
      subject: 'Customer Wallet Transection',
      action: 'read'
    },
    {
      title: 'Customer Transaction',
      path: '/customer-wallet-transection',
      icon: 'ic:twotone-request-page',
      subject: 'Customer Wallet Transection',
      action: 'read'
    }
  ]
}

export default navigation
