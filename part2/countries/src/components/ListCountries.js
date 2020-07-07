import React, { useState, useEffect } from 'react'
import axios from 'axios';

const ListCountries = (props) => {
    const filteredCountries = props.countries.filter(country => 
      country.name.toLowerCase().includes(props.countryFilter.toLowerCase())
    )
    
    if (filteredCountries.length > 10) {
      return (
        <div>More than 10 results, please refine your search</div>
      )
    } else if(filteredCountries.length === 1) {
        return (
          <SingleCountry country={filteredCountries[0]} />
        )
    } else {
        return (
          filteredCountries.map(country =>
            <Country country={country} key={country.name} buttonClick={props.buttonClick}/>)
        )
    }
  }

const SingleCountry = (props) => {
  
  const [ weather, setWeather ] = useState([])
  const [ weatherIcon, setWeatherIcon ] = useState('')

  const params = {
    access_key: process.env.REACT_APP_API_KEY,
    query: props.country.name
  }

  useEffect(() => {
    axios
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {
        setWeather(response.data.current)
        setWeatherIcon(response.data.current.weather_icons[0])
        console.log(response.data.current)
      })
  }, [])

  return (
    <div>
      <h1>{props.country.name}</h1>
      <p>Capital: {props.country.capital}</p>
      <p>Population: {props.country.population}</p>
      <h2>Languages</h2>
      <ul>
        {props.country.languages.map(language => 
          <Languages key={language.name} language={language} />)}
      </ul>
      <img src={props.country.flag} alt='Country Flag' width="400"></img>
      <h2>Weather in {props.country.capital}</h2>
      <p><strong>Temperature:</strong> {weather.temperature} Celsius</p>
      <img src={weatherIcon} alt='Weather Icon' width="100"></img>
      <p><strong>Wind:</strong> {weather.wind_speed} mph {weather.wind_dir}</p>
    </div>
  )
}

const Languages = (props) => <li>{props.language.name}</li>

const Country = (props) => {
  return (
    <div>
      {props.country.name}  <button onClick={props.buttonClick} country={props.country.name}>Show</button>
    </div>
  )  
}

export default ListCountries