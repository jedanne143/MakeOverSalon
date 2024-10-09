import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    //function to handle toggling of hamburger icon
    const handleLink = () => {
      if (menuOpen){
        setMenuOpen(false)
      }
    }
  return (
    <nav className="navbar">
        <div className='navbar__brand'>
        <NavLink to="/home" onClick= {handleLink}>
          <img className='navbar__logo' src='../logo.png' />
        </NavLink> 
        </div>
        {/* Conditional rendering for hamburger icon */}
        <div className="navbar__hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className='hamburgerLine'></span>
          <span className='hamburgerLine'></span>
          <span className='hamburgerLine'></span>
        </div>

        <div className={menuOpen ? "open navbar__navs" : "navbar__navs"}>
          <NavLink className="navbar__item"  to="/home" onClick= {handleLink}>Home</NavLink> 
          <NavLink className="navbar__item" to="/services" onClick= {handleLink}>Services </NavLink>
          <NavLink className="navbar__item" to="/bookings" onClick= {handleLink}>
            <img className='calendarIcon' src='/calendar.png' />
            Bookings 
          </NavLink>
          <NavLink className="navbar__item" to="/about" onClick= {handleLink}>
            About Us
          </NavLink>
        </div>

    </nav>
  )
}
export default Navbar