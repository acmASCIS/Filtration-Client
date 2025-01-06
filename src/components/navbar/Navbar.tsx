import React from 'react'
import logo from '../../assets/acmLogo.jpg'
import { NavLink} from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
    return (
		<nav>
                <img src={logo} alt='logo'/>
                <h4 className='header'>acmASCIS Filtration App</h4>


        </nav>
    )
}
