import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListCountries from './components/ListCountries'

function App() {

  const [ newFilter, setNewFilter ] = useState('')
  const [ countries, setCountries ] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const buttonClick =(event) => {
    setNewFilter(event.target.attributes.country.value)
  }

  return (
    <div>
      Find Countries:
      &nbsp;
      <input 
        value={newFilter}
        onChange={handleFilterChange}
      />
      <ListCountries countries={countries} countryFilter={newFilter} buttonClick={buttonClick} />
    </div>
  );
}

export default App;

// test
