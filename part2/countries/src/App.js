import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries'


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

  return (
    <div>
      Find Countries:
      &nbsp;
      <input 
        value={newFilter} 
        onChange={handleFilterChange}
      />
      <Countries countries={countries} countryFilter={newFilter} />
    </div>
  );
}

export default App;
