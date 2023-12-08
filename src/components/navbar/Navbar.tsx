import React from 'react'
import logo from '../../assets/acmLogo.jpg'
import { NavLink} from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
    return (
		<nav>
            <div className='imgPart'>
                <img src={logo} alt='logo'/>
                <h4 className='header'>AcmAscis Filteration App</h4>
            </div>

          
        </nav>
    )
}
