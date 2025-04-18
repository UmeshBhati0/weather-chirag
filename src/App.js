import { useEffect, useState } from 'react';
import './App.css';
import Nav from './components/Nav'
import SideSection from './components/SideSection';
import Main from './components/Main'
import getFormattedWeatherData from './services/weatherService';
function App() {
  const [query, setQuery] = useState({ q: 'chirag' })
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getFormattedWeatherData(
        { ...query, units }).then((data) => {
          setWeather(data)
          // console.log(data);
        });
    };
    fetchWeather();
  }, [query, units])

  return (
    <>
      <div id='bg'>
        {weather && (
          <div id='parent'>
            <nav id='nav'><Nav /></nav>
            <div id='content'>
              <main><Main weatherData={weather} setUnits={setUnits} setQuery={setQuery} units={units} /></main>
              <section><SideSection weatherData={weather} setQuery={setQuery} setUnits={setUnits} units={units} /></section>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
