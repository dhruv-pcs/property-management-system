const navigation = () => {
  return [
    {
      title: 'Admin',
      icon: 'ri:admin-fill',
      path: '/admin',
      subject: 'Admin',
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

    // {
    //   title: 'Property Allocate',
    //   icon: 'mdi:location',
    //   path: '/property-allocate',
    //   subject: 'Property Allocate',
    //   action: 'read'
    // },
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
    }
  ]
}

export default navigation
