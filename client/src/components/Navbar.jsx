import React from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'
import { useAuth } from '../store/auth'

const Navbar = () => {

  const {isLoggedIn} = useAuth();
  return (
    <>
    <div className='container'>
    <p>MyLogo</p>

    <nav className='navbar'>
        <ul className='list'>

            <li> <NavLink to={"/"} > Home</NavLink> </li>
            <li> <NavLink to={"/about"} >About Us</NavLink> </li>
            <li> <NavLink to={"/service"} >Services</NavLink> </li>
            <li> <NavLink to={"/contact"} >Contact</NavLink> </li>

            { isLoggedIn ? <li> <NavLink to={"/logout"} > Logout</NavLink></li> :(<>
             <li> <NavLink to={"/login"} > Login</NavLink></li>
             <li><NavLink to={"/register"} > Register</NavLink> </li>
              </>)
              }            
        </ul>
    </nav>
    </div>
    </>
  )
}

export default Navbar
