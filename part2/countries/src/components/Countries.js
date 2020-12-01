import React, { useState } from 'react';
import SingleCountry from './SingleCountry';

const Country = ({ countries }) => {
  const [showCountry, setShowCountry] = useState('')
  const [showHide, setShowHide] = useState(true)
  if (showCountry) {
    return (
      <div>
        <button onClick={() => {setShowHide(!showHide); setShowCountry('');}}>{showHide ? 'show' : 'hide'}</button>
        <SingleCountry countryFilter={showCountry} />
      </div>
    )
  }
    return <ul className='country_list'>{countries.map(country => <li key={country.name}>{country.name} <button onClick={() => {setShowHide(!showHide); setShowCountry(country)}}>{showHide ? 'show' : 'hide'}</button></li>)}</ul>
};

const Countries = ({ country, filter }) => {
  const filtered = country.filter(value => value.name.toLowerCase().includes(filter.toLowerCase()))
  if (filtered.length > 10) {
    return "Too many matches, specify another filter"
  } else if (filtered.length === 1) {
    return <SingleCountry countryFilter={filtered[0]} />
  } else {
    return <Country countries={filtered} />
  };
};

export default Countries;