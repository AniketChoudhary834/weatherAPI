import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  
  return (
    <nav className='bg-teal-700 p-4 flex justify-between'>
        <h1 className='text-3xl text-white font-medium'>API CALL</h1>
        <ul className='flex gap-2 items-center text-white font-medium'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact-us">Contact Us</Link></li>
        </ul>
    </nav>
  )
}

export default NavBar
