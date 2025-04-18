import { DateTime } from "luxon";

const API_KEY = '484c27409efc82d4ec46dc3f0e1d3350';
const BASE_URL = 'https://api.openweathermap.org/data';

// for key testing on browser 
// https://api.openweathermap.org/data/2.5/weather?q=London&appid=cbad3d63f8784ac9a4a832011d5a4efc&&unit=metric%27;  jitu
// http://api.openweathermap.org/data/2.5/air_pollution?lat=33.44&lon=93.04&appid=61e5897f21fe6d6a8d5c0349629c6824s working
// https://api.openweathermap.org/data/2.5/air_pollution/history?lat=33.44&lon=94.04&start=1606223802&end=1606482999&appid=61e5897f21fe6d6a8d5c0349629c6824
// https://api.openweathermap.org/data/2.5/weather?lat=33.44&lon=94.04&appid=61e5897f21fe6d6a8d5c0349629c6824
// https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=94.04&appid=61e5897f21fe6d6a8d5c0349629c6824


const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + "/" + infoType);
    url.search = new URLSearchParams({ ...searchParams, appid: API_KEY })
    // console.log(url)
    return fetch(url)
        .then((res) => res.json())
}


const formatCurrentWeather = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather, visibility,
        wind: { speed, deg }, description
    } = data

    const { main: details, icon } = weather[0]

    return { visibility, lat, lon, temp, temp_max, temp_min, feels_like, humidity, name, dt, country, sunrise, sunset, speed, deg, details, icon, description }
};



// to convert UTC timezone to country time and day 
const formatForecastWeather = (data) => {
    let { timezone, daily, hourly, lat, lon, current } = data;

    daily = daily.slice(1, 8).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'ccc'),
            temp_day: d.temp.day,
            temp_night: d.temp.night,
            temp_eve: d.temp.eve,
            temp_morn: d.temp.morn,
            rain: d.dew_point,
            icon: d.weather[0].icon,
            uvi: d.uvi,
            moonrise: d.moonrise,
            moonset: d.moonset,
        }
    });
    hourly = hourly.slice(1, 10).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.temp,
            wind_speed: d.wind_speed,
            wind_deg: d.wind_deg,
            humidity: d.humidity,
            dew_point: d.dew_point,
            icon: d.weather[0].icon,
            rain: d.rain,

        }
    });
    return { timezone, daily, hourly, latitude: lat, longitude: lon, current }
};


const formatAirQUality = (data) => {
    const { list } = data
    let components = list[0]
    let air = components.components
    // console.log('air:', air)
    return { air }
}


const getFormattedWeatherData = async (searchParams) => {
    // for normal current weather api param passing dynamically  
    const formattedCurrentWeather = await getWeatherData('/2.5/weather', searchParams)
        .then(formatCurrentWeather)

    // now we have to call onecall weather api
    let { lat, lon } = formattedCurrentWeather;
    const formattedForecastWeather = await getWeatherData('/3.0/onecall', { lat, lon, exclude: "minutely", units: searchParams.units })
        .then(formatForecastWeather)

    // http://api.openweathermap.org/data/2.5/air_pollution?lat=33.44&lon=93.04&appid=61e5897f21fe6d6a8d5c0349629c6824
    // to get air quality
    let { latitude, longitude } = formattedForecastWeather;
    const formattedAirQuality = await getWeatherData('/2.5/air_pollution', { lat: latitude, lon: longitude })
        .then(formatAirQUality)
    // console.log("formattedAirQuality", formattedAirQuality)


    // to return hourly and daily weather forecast we have to append em in formatedforecast weather
    return { ...formattedCurrentWeather, ...formattedForecastWeather, ...formattedAirQuality }
}


// to covert UTC time zone
const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy'    |    Local time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

export default getFormattedWeatherData;

export { formatToLocalTime };