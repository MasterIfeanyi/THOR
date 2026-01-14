import React from 'react'
import Navbar from './Navbar'

const NavbarLayout = ({children}) => {

  return (
    <>
        <Navbar />
        {children}
    </>
  )
}

export default NavbarLayout