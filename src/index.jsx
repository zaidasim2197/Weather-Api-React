import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css";
import { useState, useEffect } from "react";
import axios from "axios";





function Hi() {


  const [data, setData] = useState(0);
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState({});



  const submitHandler = (e) => {
    e.preventDefault();

    console.log("city: " + cityName);

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e0f99c494c2ce394a18cc2fd3f100543&units=metric`)
      .then(function (response) {

        console.log("data: ", response.data);

        setWeather(response.data)

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  useEffect(() => {
    const getWeather = () => { 
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Karachi&appid=184cb559850b9f666116789fb4759502&units=metric`)
        .then(function (response) {

          console.log("data: ", response.data);
          setWeather(response.data)

        })
        .catch(function (error) {
          console.log(error);
        })
    }
    getWeather();
  }, [])



  return <div  className='whole'>

<div id='main'>
   
    <h1 id='header'>
     "Zaid's Weather App"
    </h1>

    <form onSubmit={submitHandler}>

      <input
        type="text"
        placeholder='Enter City Name'
        onChange={(e) => {
          setCityName(e.target.value)
        }}
      />

      <button type="submit" className='button'>Get Weather </button>

    </form>

    <br />

    {(weather?.name)?

<div id='temperture'>
        <div className='cityname'><b><u>Weather of {weather?.name} </u></b><br /><br /></div>
        <div>Current Temp: {weather?.main?.temp} <br /><br /> </div>
        <div>Humidity: {weather?.main?.humidity}<br /><br /> </div>
        <div>Feels Like: {weather?.main?.feels_like}</div><br />
      </div>
      :
      null
    }
 </div>
  </div>;
}

ReactDOM.render(<Hi />, document.querySelector('#root'));