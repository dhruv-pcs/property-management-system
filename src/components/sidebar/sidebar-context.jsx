import React, { useState, createContext, useContext } from 'react'
import MyProSidebar from './sidebar'

const SidebarContext = createContext({})

export const MyProSidebarProvider = ({ children }) => {
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