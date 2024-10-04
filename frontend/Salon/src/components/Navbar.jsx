import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import './Navbar.css'
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import MobileScreenShareRoundedIcon from '@mui/icons-material/MobileScreenShareRounded';

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
        <div className='brandContainer'>
            <img className='logo' src='../logo.png' />
        </div>
        {/* Conditional rendering for hamburger icon */}
        <div className="hamburgerIcon" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={menuOpen ? "open" : ""}>
          <NavLink className="navItem"  to="/home" onClick= {handleLink}>Home</NavLink> 
          <NavLink className="navItem" to="/services" onClick= {handleLink}>Services </NavLink>
          <NavLink className="navItem" to="/bookings" onClick= {handleLink}>
            <CalendarMonthRoundedIcon
              sx={{    
                height: '18px',
                verticalAlign: 'middle'
              }} 
            />
            Bookings 
          </NavLink>
          <NavLink className="navItem" to="/socials" onClick= {handleLink}>
            <MobileScreenShareRoundedIcon
            sx={{    
              height: '18px',
              verticalAlign: 'middle'
            }} 
            />
            Socials
          </NavLink>
        </div>

    </nav>
  )
}
export default Navbar