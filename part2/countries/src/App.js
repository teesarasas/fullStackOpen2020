import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FindCountries from './components/FindCountries';
import Countries from './components/Countries';
import './index.css'


const App = () => {
  const [ countries, setCountries ] = useState([]);
  const [ newFilter, setNewFilter ] = useState('');

  useEffect(() => {
    console.log('effect')
    axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          console.log('promise fulfilled')
          setCountries(response.data)
        })
  }, [])
  console.log('render', countries.length, 'note');

  const handleCountryChange = event => {
    setNewFilter(event.target.value);
  }

  return (
    <div>
      <FindCountries countryFilter={newFilter} handleCountryChange={handleCountryChange} />
      <Countries country={countries} filter={newFilter}/> 
    </div>
  )
};

export default App;
