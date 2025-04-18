import React from 'react'
import './Nav.css'

import logo from '../Assets/logos/logo_10.svg'
import { RxDashboard } from 'react-icons/rx'
import { GiRadarSweep } from 'react-icons/gi'
import { CiSettings, CiLocationOn, CiMap, CiCalendarDate } from 'react-icons/ci'


const Nav = () => {
    return (
        <>
            <div id='nav_container'>
                <div id='logo'>
                    <img src={logo} alt='logo' />
                </div>
                <hr style={{ color: "white", background: "grey", width: "60px", marginTop: "1rem", background: "#ffffff91" }} />
                <ul id='nav_buttons'>
                    <li><RxDashboard className='icons' /></li>
                    <li><CiMap className='icons' /> </li>
                    <li><CiLocationOn className='icons' />  </li>
                    <li><GiRadarSweep className='icons' /></li>
                    <li> <CiCalendarDate className='icons' /> </li>
                    <li><CiSettings className='icons' /></li>
                </ul>
            </div>
        </>
    )
}

export default Nav;