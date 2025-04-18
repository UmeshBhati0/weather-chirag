import React, { useState } from 'react'
import './SideSection.css'


import { CiLocationOn, CiCalendarDate, CiSearch } from 'react-icons/ci'
import { BsSunrise, BsSunset } from 'react-icons/bs'
import { WiMoonrise, WiMoonset } from 'react-icons/wi'
import { formatToLocalTime } from '../services/weatherService';


const SideSection = ({ weatherData: { dt, timezone, name, country, sunrise, sunset, temp, details, daily, icon }, setQuery, setUnits, units }) => {
    // search function

    const [city, setCity] = useState('');
    const handleInput = (e) => {
        setQuery({ q: city });
    }
    const hitEnter = (e) => {
        if (e.keyCode === 13) {
            handleInput();
        }
    }

    return (
        <div className='main'>
            <div id='groove'>
                <div id='search_bar'>
                    <div class="searchBox">
                        <input type="search" placeholder="Search" value={city} onChange={(e) => setCity(e.target.value)} onKeyDown={hitEnter} />
                        <CiSearch id='search_icon' onClick={handleInput} style={{ fontWeight: "900" }} />
                    </div>
                </div>
                <div id='logo_feelLike'>
                    <img src={`/icons/${icon}.png`} />
                    <span>{Math.floor(temp)}° <span style={{ fontSize: "0.5em" }}>{units === 'metric' ? 'C' : 'F'}</span></span>
                    <div id='feels_like'>
                        <img src={`/icons/${icon}.png`} style={{ width: '1.5rem', height: "1.5rem" }} />
                        <span>{details}</span>
                    </div>
                </div>

                <hr className='hr_current' />

                <div id='curr_location_day'>
                    <div id='location'>
                        <CiLocationOn style={{ color: "#fff", height: '1.5rem' }} />
                        <span>{`${name}, ${country}`}</span>
                    </div>
                    <div id='day_time'>
                        <CiCalendarDate style={{ color: " #fff" }} />
                        <span>{formatToLocalTime(dt, timezone)}</span>
                    </div>
                </div>
            </div>


            <div id='groove_2'>
                <div id='sun'>
                    <div className='rise'>
                        <span>Sunrise</span>
                        <BsSunrise style={{ color: "#fff", fontSize: "2rem", margin: "0.5rem" }} />
                        <span>{formatToLocalTime(sunrise, timezone, "hh:mm a")}</span>
                    </div>
                    <div className='rise'>
                        <span>Sunset</span>
                        <BsSunset style={{ color: "#fff", fontSize: "2rem", margin: "0.5rem" }} />
                        <span>{formatToLocalTime(sunset, timezone, "hh:mm a")}</span>
                    </div>

                </div>

                <div id='moon'>
                    <div className='rise'>
                        <span>Moonrise</span>
                        <WiMoonrise style={{ color: "#fff", fontSize: "2.5rem", margin: "0.1rem" }} />
                        <span>{formatToLocalTime((daily[0].moonrise), timezone, "hh:mm a")}</span>
                    </div>
                    <div className='rise'>
                        <span>Moonset</span>
                        <WiMoonset style={{ color: "#fff", fontSize: "2.5rem", margin: "0.1rem" }} />
                        <span>{formatToLocalTime((daily[0].moonset), timezone, "hh:mm a")}</span>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default SideSection;