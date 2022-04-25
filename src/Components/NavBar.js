import React from 'react'
import '../CSS/Nav.css'
import logo from '../Assets/FaviconPNG.png';

function NavBar() {
  return (
    <div className='nav-bar'>
      <img src={logo} alt="logo" id='logo'></img>
    </div>
  )
}

export default NavBar