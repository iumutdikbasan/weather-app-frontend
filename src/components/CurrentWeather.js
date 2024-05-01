import '../components/CurrentWeather.css'
import React, { useState, useEffect } from 'react';
const CurrentWeather = ({data}) => {

    const {name, main, weather, wind} = data.data;
    const {temp, feels_like, humidity} = main;
    const {speed} = wind;
    const {description, icon} = weather[0];

    

    const [time, setTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const formattedTime = `${hours}:${minutes}`;

      setTime(formattedTime);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

    
    return(
        <div className="weather">
            <div className="top">
                <div>
                    <p className="city">{name}</p>
                    <p className="weather-description">{description}</p>
                </div>
                <img className="weather-icon" src={`icons/${icon}.png`} alt="weather icon"/>
            </div>
            <div className="bottom">
                <p className="temperature">{Math.floor(temp)}°C</p>
                <div className="details">
                    <div className='parameter-row'>
                        <span className='paramete-label'>Details</span>
                    </div>
                    <div className='parameter-row'>
                        <span className='parameter-label'>Feels like</span>
                        <span className='parameter-label'>{feels_like}°C</span>
                    </div>
                    <div className='parameter-row'>
                        <span className='parameter-label'>Wind</span>
                        <span className='parameter-label'>{speed}m/s</span>
                    </div>
                    <div className='parameter-row'>
                        <span className='parameter-label'>Humidity</span>
                        <span className='parameter-label'>{humidity}%</span>
                    </div>
                    
                    <div className='parameter-row' >
                        <span className='parameter-label' style={{ fontWeight:"bold" , fontSize: "15px" , color: "red"}}>Time</span>
                        <span className='parameter-label' style={{ fontWeight:"bold" , fontSize: "15px" , color: "red"}}>{time}</span>
                    </div>
                </div>
            </div>
        </div>
    ); 
}

export default CurrentWeather;