// ** React Imports **
import React, { useState, createContext, useContext } from 'react'

// ** Custom Components **
import MyProSidebar from './sidebar'

// ** Contexts **
const SidebarContext = createContext({})

export const MyProSidebarProvider = ({ children }) => {
  // ** States **
  const [sidebarBackgroundColor, setSidebarBackgroundColor] = useState(undefined)

  return (
    <SidebarContext.Provider
      value={{
        sidebarBackgroundColor,
        setSidebarBackgroundColor
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <MyProSidebar />
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

export const useSidebarContext = () => useContext(SidebarContext)
