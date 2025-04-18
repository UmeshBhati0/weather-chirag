import React, { useEffect } from 'react'
import './main.css'
import { useState } from 'react';
import { BsFillDropletFill, BsFillEyeFill, BsFillCalendarWeekFill, BsHourglassBottom } from 'react-icons/bs'
import { MdOutlineAir } from 'react-icons/md'
import { GiPaperWindmill } from 'react-icons/gi'
import { WiNightCloudyGusts } from 'react-icons/wi'
import { TiLocationArrowOutline } from 'react-icons/ti'



// ===============================
import ReactApexChart from 'react-apexcharts';
import Chart from 'react-apexcharts';
// =================================
import model from '../Assets/icon/model.svg'


const Main = ({ weatherData: { humidity, visibility, air, current, speed, deg, hourly, daily, items, title, icon }, setUnits, setQuery, units }) => {

    // units change button 
    const [city, setCity] = useState('')
    const handleUnitsChange = (e) => {
        const selectedUnit = e.currentTarget.name
        if (city !== selectedUnit) setUnits(selectedUnit)
    }
    console.log("units:", units)
    const [active, setActive] = useState("weakly")



    // humidity descrption changing cases
    let humidtyDesc;
    if (humidity >= 0 && humidity <= 55) {
        humidtyDesc = 'Dry & Comfortable 😃';
    } else if (humidity > 55 && humidity <= 65) {
        humidtyDesc = 'Sticky 🫥';
    } else if (humidity > 65) {
        humidtyDesc = 'lot of moisture 🫠';
    }
    // =============================humidty chart
    const HumidityChart = () => {
        const [humidityData, setHumidityData] = useState([]);
        useEffect(() => {
            const humidityValue = [];
            for (let i = 0; i < daily.length; i++) {
                humidityValue.push(daily[i].rain);
            }
            setHumidityData(humidityValue)
        }, []);

        const options = {
            chart: {
                id: 'fb',
                toolbar: {
                    show: false
                }, type: 'line',
                height: 160
            },
            stroke: {
                width: 1.5,
                curve: "smooth",
                lineCap: 'butt',
                lineJoin: 'rounds',
                dashArray: 0,
            },
            grid: {
                show: false
            },

            dataLabels: {
                enabled: false,
                style: {
                    colors: ['rgba(255, 255, 255, 0)'],
                    fontSize: '0.2px',
                    fontWeight: '4px',
                }, background: {
                    enabled: true,
                    colors: 'rgba(255, 255, 255, 0)',
                    foreColor: 'rgba(255, 255, 255, 0)',
                    padding: 1,
                    margin: 2,
                    borderColor: '#fff',
                    borderRadius: 50
                },
            },
            colors: ['rgba(255, 255, 255, 0.634)'],
            xaxis: {
                labels: {
                    show: false
                },
                axisBorder: {
                    show: false
                }
            },
            tooltip: {
                enabled: false,
                shared: false,
                followCursor: true,
                style: {
                    colors: [`#000`],
                    fontSize: '8px',
                    background: {
                        enabled: true,
                        colors: '#000',
                        foreColor: 'rgba(255, 255, 255, 0)',
                    },
                },
            },
            yaxis: {
                labels: {
                    show: false
                },
                axisBorder: {
                    show: false
                }
            },
        };

        const series = [{
            name: '',
            data: humidityData,
        }];


        return (
            <div id='humidity_graph_container'>
                <Chart options={options} series={series} type="line" height={120} width={360} />
            </div>
        );
    }

    // ===========================================

    // AqI calculation & cases for changing description
    const aqi = air.o3 + air.no2 * 4
    let airDesc;
    if (aqi >= 0 && aqi <= 50) {
        airDesc = 'Good 😃';
    } else if (aqi > 51 && aqi <= 100) {
        airDesc = 'Moderate 😊';
    } else if (aqi > 101 && aqi <= 150) {
        airDesc = 'Unhealthy for Sensitive 😷';
    } else if (aqi > 151 && aqi <= 200) {
        airDesc = 'Unhealthy 😐';
    } else if (aqi > 201 && aqi <= 300) {
        airDesc = 'Very Unhealthy 🫤';
    } else if (aqi > 301) {
        airDesc = 'Hazardous 🥵';
    }


    // cases for changing Visibility description 
    let visi = visibility / 1000
    let visibilityDesc;
    if (visi >= 0 && visi <= 5) {
        visibilityDesc = 'Low🤏';
    } else if (visi > 5 && visi <= 41) {
        visibilityDesc = 'Normal 👍';
    } else if (visi > 41 && visi <= 60) {
        visibilityDesc = 'Good✌️';
    } else if (visi > 61) {
        visibilityDesc = 'High🤙';
    }
    // ==========================================
    const AirQualityChart = () => {

        const options = {
            chart: {
                id: 'column-chart',
                toolbar: {
                    show: false
                },
                height: 100
            },
            xaxis: {
                categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5']
                , labels: {
                    show: false
                },
                axisBorder: {
                    show: false
                }
            },
            yaxis: {
                labels: {
                    show: false
                },
                axisBorder: {
                    show: false
                }
            },
            colors: ['#00000040', 'rgba(255, 255, 255, 0.634)'],
            grid: {
                show: false
            },
            dataLabels: {
                enabled: false
            },
            tooltip: {
                enabled: false
            },
            legend: {
                show: false
            },
            plotOptions: {
                bar: {
                    columnWidth: '25',
                    distributed: true,
                    borderRadius: '6'
                }
            },
        };

        const series = [{
            name: 'Series 1',
            data: [air.no, air.pm2_5, air.so2, air.nh3, air.no2, air.pm10, air.o3]
        }];

        return (
            <div id='air_quality_graph_container'>
                <Chart options={options} series={series} type="bar" height={170} />
            </div>
        );
    }
    // ====================================
    const MixedChart = () => {
        const [dewData, setDewData] = useState([]);
        const [tempData, setTempData] = useState([]);
        const [humidityData, setHumidityData] = useState([]);
        const [titleData, setTitleData] = useState([]);

        useEffect(() => {
            const dewValue = [];
            const tempValue = [];
            const humidityValue = [];
            const titleValue = [];

            for (let i = 0; i < hourly.length; i++) {
                dewValue.push(hourly[i].dew_point);
                tempValue.push(hourly[i].temp);
                humidityValue.push(hourly[i].humidity);
                titleValue.push(hourly[i].title);
            }
            setDewData(dewValue)
            setTempData(tempValue)
            setHumidityData(humidityValue)
            setTitleData(titleValue)
        }, []);


        const chartOptions = {
            chart: {
                type: 'line',
                id: 'column-chart',
                toolbar: {
                    show: false
                },
            },
            title: {
                enabled: false,
            },
            series: [
                {
                    type: 'column',
                    name: 'Precipitation',
                    data: dewData,
                },
                {
                    type: 'area',
                    name: 'Temprature',
                    data: tempData,
                },
                {
                    type: 'line',
                    name: 'Humidity',
                    data: humidityData,
                },
            ],
            xaxis: {
                categories: titleData,
                color: '#e8d8d8ce',
                axisTicks: {
                    show: false
                },
                labels: {
                    style: {
                        fontSize: '10px',
                        height: 100,
                        width: 2,
                        fontWeight: 'bold',
                        colors: '#e8d8d8ce',
                    },
                    axisBorder: {
                        show: false
                    },
                },
            },
            yaxis: {
                title: false,
                show: true,
                tickAmount: 1,
                labels: {
                    style: {
                        fontSize: '10px',
                        height: 100,
                        width: 2,
                        fontWeight: 'bold',
                        colors: '#e8d8d8ce',
                    },
                    axisBorder: {
                        show: false
                    },
                },
            },
            stroke: {
                width: [0, 0, 1],
                curve: ['smooth', 'smooth', 'stepline'],
                dashArray: [0, 0, 0]
            },
            plotOptions: {
                bar: {
                    columnWidth: '40',
                    distributed: false,
                    borderRadius: ['2'],
                }
            },
            colors: ['rgba(0, 26, 255, 0.615)', 'rgba(255, 251, 0, 0.500)', 'rgba(255, 255, 255, 10)'],
            dataLabels: {
                enabled: false,
            },
            legend: {
                show: true,
                position: 'top',
                horizontalAlign: 'right',
                offsetY: -4,
                markers: {
                    show: false,
                    enabled: false,
                },
                labels: {
                    colors: '#e8d8d8ce',
                    fontSize: '3px',
                    useSeriesColors: false
                },

            },
            grid: {
                borderColor: '#a1a1a1aa',
                opacity: 0.5,
            },
            tooltip: {
                enabled: false
            },

        };

        return (
            <div id='average_chart_container' >
                <ReactApexChart options={chartOptions} series={chartOptions.series} type="line" height={205} />
            </div>
        )
    };
    // =====================================
    const RainChance = () => {
        const [rainData, setRainData] = useState([]);
        const [raintime, setRaintime] = useState([]);

        useEffect(() => {
            const rainValue = [];
            const rainTime = [];

            for (let i = 0; i < daily.length; i++) {
                rainValue.push(daily[i].rain);
                rainTime.push(daily[i].title);
            }
            setRainData(rainValue)
            setRaintime(rainTime)
        }, []);
        const options = {
            chart: {
                id: 'column-chart',
                toolbar: {
                    show: false,
                },
            },
            colors: ['#00000040', 'rgba(255, 255, 255, 0.634)'],
            xaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                categories: raintime,
                labels: {
                    style: {
                        fontSize: '10px',
                        height: 100,
                        width: 2,
                        fontWeight: 'bold',
                        colors: '#e8d8d8ce',
                    },
                    axisBorder: {
                        show: false
                    },
                },
            },
            yaxis: {
                labels: {
                    show: false
                },
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },
            grid: {
                show: false,
            },
            dataLabels: {
                enabled: false
            },
            tooltip: {
                enabled: true,
                shared: false,
                followCursor: true,
                style: {
                    fontSize: '8px',
                },
            },
            legend: {
                show: false
            },
            plotOptions: {
                bar: {
                    columnWidth: '10',
                    distributed: true,
                    borderRadius: ['3.5'],
                }
            },
        };


        const series = [{
            name: '',
            data: rainData,
        }];

        return (
            <div id='rain_chance_grph_container' >
                <Chart options={options} series={series} type="bar" height={160} />
            </div >
        );
    }

    // =====================================
    return (
        <div id='main_parent'>
            <div id='header'>
                <span>Weather</span>
                <div className='c_f_icon'>
                    <button onClick={handleUnitsChange} name='metric'>°C</button>
                    <button onClick={handleUnitsChange} name='imperial'>°F</button>
                </div>
            </div>
            <div id='section_1'>
                <div id='humidity'>
                    <div className='analytical_data'>
                        <div id='icon_1'><BsFillDropletFill style={{ fontSize: "1rem" }} /></div>
                        <div className='title'>Humidity</div>
                        <div className='num'>{humidity}<sup style={{ fontSize: "0.8rem", paddingLeft: "0.2rem", fontFamily: 'Poppins' }}>%</sup></div>
                        <div className='desc'>{humidtyDesc}</div>
                        <HumidityChart />
                    </div>
                </div>
                <div id='air_quality'>
                    <div className='analytical_data'>
                        <div id='icon_2'><MdOutlineAir style={{ fontSize: "1.25rem" }} /></div>
                        <div className='title'>Air Quality</div>
                        <div className='num'>{Math.round(aqi)}<sup style={{ fontSize: "0.8rem", paddingLeft: "0.2rem", fontFamily: 'Poppins' }}>AQI</sup></div>
                        <div className='desc'>{airDesc}</div>
                    </div>
                    <AirQualityChart />
                </div>
                <div id='visibility'>
                    <div className='analytical_data'>
                        <div id='icon_3'><BsFillEyeFill style={{ fontSize: "1.2rem" }} /></div>
                        <div className='title'>Visibility</div>
                        <div className='num'>{visibility / 1000}<sup style={{ fontSize: "0.8rem", paddingLeft: "0.2rem", fontFamily: 'Poppins' }}>Km</sup></div>
                        <div className='desc'>{visibilityDesc}</div>
                    </div>

                    <div id='visibility_container'>
                        <div className='progress_line'>
                            <div className="progress " style={{ width: `${visibility / 100}px` }}></div>

                        </div>
                    </div>
                </div>


            </div>
            <div id='section_2'>
                <div id='average_graph'>
                    <div className='title' style={{ margin: "0.5rem 1rem 0  1rem" }}>Average Weather</div>
                    <div style={{ display: "flex" }} >
                        <img src={model} style={{ height: '12.5rem', zIndex: '1', padding: '0 1.5rem 0 36.6rem', }} alt='model' />
                        <MixedChart />
                    </div>
                </div>
                <div id='wind_status'>
                    <div className='title' style={{ padding: "1rem 3rem 0.6rem 0" }}>
                        <GiPaperWindmill style={{ width: "2.2rem", }} /><span style={{ paddingRight: "2.8rem" }} >Wind Status</span>
                    </div>
                    <div id='data_1'>
                        <div id='wind_speed'>
                            <span>{speed}</span><sub style={{ fontSize: "1rem", fontWeight: "600", fontStyle: "italic" }}>km/h</sub>
                        </div>
                    </div>
                    <div id='data_2'>
                        <div>
                            <WiNightCloudyGusts style={{ fontSize: "2rem", padding: "0.2rem" }} />
                            <span>{Math.round(current.wind_speed) + 20} m/h</span>
                        </div>
                        <div>
                            <TiLocationArrowOutline style={{ fontSize: "1.8rem", padding: "0.2rem" }} />
                            <span>{deg}°</span>
                        </div>
                    </div>
                </div>
            </div>
            <div id='section_3'>
                <div id='rain_chance'>
                    <span className='title'>Chance of rain</span>
                    <div id='rain_div'>
                        <div className='rain_bg'>
                            <span>Sunny</span>
                            <span>Rainy</span>
                            <span>Heavy</span>
                        </div>
                        <div id='rain_graph'>
                            <RainChance />
                        </div>
                    </div>
                </div>


                <div id='forecast'>
                    <div className="today_weakly-switch">
                        <span className='title' style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", paddingRight: "23rem" }}>Forecast</span>
                        <input type="radio" name="today_weakly-switch1" id="today" onClick={() => setActive("today")} />
                        <label htmlFor="today"><BsHourglassBottom /></label>
                        <input type="radio" name="today_weakly-switch1" id="weakly" onClick={() => setActive("weakly")} />
                        <label htmlFor="weakly"><BsFillCalendarWeekFill /></label>
                    </div>

                    <div id='forecast_switch'>
                        {active === "today" && <div>
                            {<div id='cards'>
                                {hourly.map((item) => (
                                    <div class="card">
                                        <span>{item.title}</span>
                                        <img src={`/icons/${icon}.png`} style={{ height: "2.5rem" }} alt='icon' />
                                        <span>{`${item.humidity.toFixed()}°`}<span style={{ fontSize: "0.7em" }}>{units === 'metric' ? 'C' : 'F'}</span></span>
                                    </div>
                                ))}
                            </div>}
                        </div>}

                        {active === "weakly" && <div>
                            {<div id='cards'>
                                {daily.map((item) => (
                                    <div class="card">
                                        <span>{item.title}</span>
                                        <img src={`/icons/${icon}.png`} style={{ height: "2.5rem" }} alt='icon' />
                                        <span>{`${item.temp_day.toFixed()}°`}<span style={{ fontSize: "0.7em" }}>{units === 'metric' ? 'C' : 'F'}</span></span>
                                    </div>
                                ))}
                            </div>}
                        </div>}
                    </div>

                </div>
            </div>
        </div >

    )
}

export default Main;